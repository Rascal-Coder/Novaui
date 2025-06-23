import { Suspense, lazy } from 'react';
import { Link, Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router';

// 动态导入所有示例组件
const exampleModules = import.meta.glob('./examples/*/index.tsx');

// 创建懒加载组件映射
const lazyComponents = Object.entries(exampleModules).reduce(
  (acc, [path, moduleLoader]) => {
    // 从路径中提取组件名称 './examples/button/index.tsx' -> 'button'
    const componentName = path.split('/')[2];
    if (componentName) {
      acc[componentName] = lazy(moduleLoader as () => Promise<{ default: React.ComponentType }>);
    }
    return acc;
  },
  {} as Record<string, React.LazyExoticComponent<React.ComponentType>>
);

// 获取所有示例名称并排序
const exampleNames = Object.keys(lazyComponents).sort();

// 首字母大写函数
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// 布局组件
function Layout() {
  return (
    <div>
      <nav className="border-b bg-gray-100 p-4">
        <div className="flex items-center gap-4">
          <Link
            className="text-lg text-blue-600 font-bold hover:text-blue-800"
            to="/"
          >
            NovaUI
          </Link>
          {exampleNames.map(name => (
            <Link
              className="text-gray-600 hover:text-gray-800"
              key={name}
              to={`/${name}`}
            >
              {capitalize(name)}
            </Link>
          ))}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// 加载中组件
function Loading() {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );
}

// 动态生成路由配置
const dynamicRoutes = exampleNames
  .map(name => {
    const Component = lazyComponents[name];
    if (!Component) {
      return null;
    }
    return {
      path: name,
      element: (
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold">{capitalize(name)} Component Examples</h2>
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        </div>
      )
    };
  })
  .filter((route): route is NonNullable<typeof route> => route !== null);

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            replace
            to={`/${exampleNames[0] || 'button'}`}
          />
        )
      },
      ...dynamicRoutes
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
