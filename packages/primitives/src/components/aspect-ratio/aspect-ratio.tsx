import * as React from 'react';

import { Primitive } from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * AspectRatio
 * ----------------------------------------------------------------------------------------------- */

const NAME = 'AspectRatio';

type AspectRatioElement = React.ComponentRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AspectRatioProps extends PrimitiveDivProps {
  ratio?: number;
}

const AspectRatio = React.forwardRef<AspectRatioElement, AspectRatioProps>((props, forwardedRef) => {
  const { ratio = 1 / 1, style, ...aspectRatioProps } = props;
  return (
    <div
      data-novaui-aspect-ratio-wrapper=""
      style={{
        // ensures inner element is contained
        position: 'relative',
        // ensures padding bottom trick maths works
        width: '100%',
        paddingBottom: `${100 / ratio}%`
      }}
    >
      <Primitive.div
        {...aspectRatioProps}
        ref={forwardedRef}
        style={{
          ...style,
          // ensures children expand in ratio
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      />
    </div>
  );
});

AspectRatio.displayName = NAME;

/* ----------------------------------------------------------------------------------------------- */

const Root = AspectRatio;

export {
  AspectRatio,
  //
  Root as AspectRatioRoot
};
export type { AspectRatioProps };
