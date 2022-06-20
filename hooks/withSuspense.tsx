import React, {Suspense, PropsWithChildren, ReactNode} from 'react';

export function withSuspense<T>(
  Element: (props: PropsWithChildren<T>) => JSX.Element,
  fallback: NonNullable<ReactNode> | null,
) {
  return function (props: PropsWithChildren<T>) {
    return <Suspense fallback={fallback}>{Element(props)}</Suspense>;
  };
}
