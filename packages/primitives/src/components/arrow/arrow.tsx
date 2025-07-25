import * as React from 'react';

import { Primitive } from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * Arrow
 * ----------------------------------------------------------------------------------------------- */

const NAME = 'Arrow';

type ArrowElement = React.ComponentRef<typeof Primitive.svg>;
type PrimitiveSvgProps = React.ComponentPropsWithoutRef<typeof Primitive.svg>;
interface ArrowProps extends PrimitiveSvgProps {}

const Arrow = React.forwardRef<ArrowElement, ArrowProps>((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return (
    <Primitive.svg
      {...arrowProps}
      height={height}
      preserveAspectRatio="none"
      ref={forwardedRef}
      viewBox="0 0 30 10"
      width={width}
    >
      {/* We use their children if they're slotting to replace the whole svg */}
      {props.asChild ? children : <polygon points="0,0 30,0 15,10" />}
    </Primitive.svg>
  );
});

Arrow.displayName = NAME;

/* ----------------------------------------------------------------------------------------------- */

const Root = Arrow;

export {
  Arrow,
  //
  Root as ArrowRoot
};
export type { ArrowProps };
