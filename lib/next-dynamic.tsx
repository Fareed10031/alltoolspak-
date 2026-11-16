import React, { Component, ComponentType, lazy, ReactNode, Suspense } from 'react';

export interface DynamicOptions {
  ssr?: boolean;
  loading?: () => React.ReactNode;
}

class ChunkErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Dynamic tool module recovered from load issue:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Tool Connection Interrupted</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The connection was briefly interrupted while loading this tool.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
          >
            Reload Tool
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

async function retryImport<T>(loader: () => Promise<T>, retries = 2): Promise<T> {
  try {
    return await loader();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((resolve) => setTimeout(resolve, 400));
    return retryImport(loader, retries - 1);
  }
}

export function dynamic<P extends object>(
  dynamicOptions: () => Promise<{ default: ComponentType<P> } | ComponentType<P> | any>,
  options?: DynamicOptions
): ComponentType<P> {
  const LazyComponent = lazy(async () => {
    const mod = await retryImport(dynamicOptions);
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
      <ChunkErrorBoundary>
        <Suspense fallback={<Loading />}>
          <LazyComponent {...props} />
        </Suspense>
      </ChunkErrorBoundary>
    );
  };
}

export default dynamic;

