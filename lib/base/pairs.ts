export const fst = <A, B>([a, _]: Readonly<[A, B]>) => a;

export const snd = <A, B>([_, b]: Readonly<[A, B]>) => b;
