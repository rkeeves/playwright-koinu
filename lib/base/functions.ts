export type Fn<A, B> = (_: A) => B;

export type Fn2<A, B, C> = (_: A, __: B) => C;

export const curry =
  <A, B, C>(f: Fn2<A, B, C>) =>
  (a: A) =>
  (b: B) =>
    f(a, b);
