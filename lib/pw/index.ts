import { Page, Locator } from '@playwright/test';

type LocatorParams = Parameters<Page['locator']>;
type GetByAltTextParams = Parameters<Page['getByAltText']>;
type GetByLabelParams = Parameters<Page['getByLabel']>;
type GetByPlaceholderParams = Parameters<Page['getByPlaceholder']>;
type GetByRoleParams = Parameters<Page['getByRole']>;
type GetByTestIdParams = Parameters<Page['getByTestId']>;
type GetByTextParams = Parameters<Page['getByText']>;
type GetByTitleParams = Parameters<Page['getByTitle']>;

export type Loc = {
  (_: Page | Locator): Locator;
  fmap(f: (_: Locator) => Locator): Loc;
  as<A>(f: (_: Locator) => A): (_: Page | Locator) => As<A>;
  eff<A>(f: (_: Locator) => Promise<A>): (_: Page | Locator) => Eff<A>;
  locator(..._: LocatorParams): Loc;
  getByAltText(..._: GetByAltTextParams): Loc;
  getByLabel(..._: GetByLabelParams): Loc;
  getByPlaceholder(..._: GetByPlaceholderParams): Loc;
  getByRole(..._: GetByRoleParams): Loc;
  getByTestId(..._: GetByTestIdParams): Loc;
  getByText(..._: GetByTextParams): Loc;
  getByTitle(..._: GetByTitleParams): Loc;
};

export type As<A> = {
  one: () => A;
  first: () => A;
  last: () => A;
  nth: (_: number) => A;
  all: () => Promise<A[]>;
};

export type Eff<A> = {
  one: () => Promise<A>;
  first: () => Promise<A>;
  last: () => Promise<A>;
  nth: (_: number) => Promise<A>;
  all: () => Promise<A[]>;
};

const loc = (f: (_: Page | Locator) => Locator): Loc => {
  const $ = (x: Page | Locator) => f(x);
  $.fmap = (g: (_: Locator) => Locator) => loc(x => g(f(x)));
  $.locator = (...o: LocatorParams) => loc((x: Page | Locator) => x.locator(...o));
  $.getByAltText = (...o: GetByAltTextParams) => loc((x: Page | Locator) => x.getByAltText(...o));
  $.getByLabel = (...o: GetByLabelParams) => loc((x: Page | Locator) => x.getByLabel(...o));
  $.getByPlaceholder = (...o: GetByPlaceholderParams) => loc((x: Page | Locator) => x.getByPlaceholder(...o));
  $.getByRole = (...o: GetByRoleParams) => loc((x: Page | Locator) => x.getByRole(...o));
  $.getByTestId = (...o: GetByTestIdParams) => loc((x: Page | Locator) => x.getByTestId(...o));
  $.getByText = (...o: GetByTextParams) => loc((x: Page | Locator) => x.getByText(...o));
  $.getByTitle = (...o: GetByTitleParams) => loc((x: Page | Locator) => x.getByTitle(...o));
  $.as =
    <A>(g: (_: Locator) => A) =>
    (x: Page | Locator): As<A> => ({
      one: () => g(f(x)),
      first: () => g(f(x).first()),
      last: () => g(f(x).last()),
      nth: n => g(f(x).nth(n)),
      all: async () => {
        const ys = [];
        for (const one of await f(x).all()) {
          ys.push(g(one));
        }
        return ys;
      },
    });
  $.eff =
    <A>(g: (_: Locator) => Promise<A>) =>
    (x: Page | Locator): Eff<A> => ({
      one: async () => g(f(x)),
      first: async () => g(f(x).first()),
      last: async () => g(f(x).last()),
      nth: async n => g(f(x).nth(n)),
      all: async () => {
        const ys = [];
        for (const one of await f(x).all()) {
          ys.push(await g(one));
        }
        return ys;
      },
    });
  return $;
};

export const $ = {
  locator: (...o: LocatorParams) => loc((x: Page | Locator) => x.locator(...o)),
  getByAltText: (...o: GetByAltTextParams) => loc((x: Page | Locator) => x.getByAltText(...o)),
  getByLabel: (...o: GetByLabelParams) => loc((x: Page | Locator) => x.getByLabel(...o)),
  getByPlaceholder: (...o: GetByPlaceholderParams) => loc((x: Page | Locator) => x.getByPlaceholder(...o)),
  getByRole: (...o: GetByRoleParams) => loc((x: Page | Locator) => x.getByRole(...o)),
  getByTestId: (...o: GetByTestIdParams) => loc((x: Page | Locator) => x.getByTestId(...o)),
  getByText: (...o: GetByTextParams) => loc((x: Page | Locator) => x.getByText(...o)),
  getByTitle: (...o: GetByTitleParams) => loc((x: Page | Locator) => x.getByTitle(...o)),
};
