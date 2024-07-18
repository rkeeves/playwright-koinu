import { isEven } from './ints';

export const sorted = <A>(xs: A[], f: (a: A, b: A) => number) => [...xs].sort(f);

export const withIndex = <A>(xs: ReadonlyArray<A>): ReadonlyArray<[number, A]> => xs.map((x, i) => [i, x]);

export const ints = (from: number, toExclusive: number) => {
  const xs = [];
  for (let i = from; i < toExclusive; i++) {
    xs.push(i);
  }
  return xs;
};

export const partition = <A>(isA: (_: A, i: number) => boolean, xs: ReadonlyArray<A>): [A[], A[]] =>
  xs.reduce(
    (a, x, i) => {
      (isA(x, i) ? a[0] : a[1]).push(x);
      return a;
    },
    [[], []] as [A[], A[]],
  );

export const halves = <A>(xs: ReadonlyArray<A>) => partition((_: A, i) => isEven(i), xs);
