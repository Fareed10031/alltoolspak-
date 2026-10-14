import React, { ComponentType, lazy, Suspense } from 'react';

export interface DynamicOptions {
  ssr?: boolean;
  loading?: () => React.ReactNode;
}

export function dynamic<P extends object>(
  dynamicOptions: () => Promise<{ default: ComponentType<P> } | ComponentType<P> | any>,
  options?: DynamicOptions
): ComponentType<P> {
  const LazyComponent = lazy(async () => {
    const mod = await dynamicOptions();
    if (mod && typeof mod === 'object' && 'default' in mod) {
      return { default: mod.default };
    }
    return { default: mod as ComponentType<P> };
  });

  const Loading = options?.loading || (() => (
    <div className="w-full min-h-[200px] flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-medium">
        <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <span>Loading tool...</span>
      </div>
    </div>
  ));

  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={<Loading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default dynamic;
