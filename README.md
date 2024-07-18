# playwright-koinu

These are just some Playwright scripts targeting [Saucelab's Saucedemo React app](https://www.saucedemo.com/).

## TLDR

We are going to try taking advantage of chainable `Locator`s.

## Run

clone install, then run:

```shell
npx playwright test
```

Or run with a problematic user (just configures the username that the tests use):

```shell
SAUCEDEMO_USERNAME="problem_user" npx playwright test
```

## Details

Page Objects are problematic:

- instantiating them makes things stateful
- sometimes they restrict you from writing tricky scenarios
- injecting/fixturing them becomes a nightmare
- eventually you'll encounter a circular reference if you use ctor injection
- sometimes you just need that ONE thing from it, but you need to instantiate the whole thingy

If you start injecting them, or adding them to fixtures eventually y

So, why not make things less stateful?

```typescript
// login.ts
import { $ } from 'pw';

export const $username = $.getByTestId('username');
export const $password = $.getByTestId('password');
export const $loginButton = $.getByText(/Login/);

// use case

import * as LoginPage from 'login';

test('x', ({ page: Page }) => {
  await LoginPage.$username(page).fill('a');
  await LoginPage.$password(page).fill('a');
  await LoginPage.$loginButton(page).click();
})
```

As with all things in life, this has its own downsides too...

but at least it makes things more flexible.

You can also chain it too or whatever:

```typescript
const x = $.locator('div').locator('div').locator('div').locator('div');
```

If you really want to search under a specific other locator, you can do that too:

```typescript
const x = $.getByTestId('container');

const y = x.getByText('jeez')
```

But of course we can lump them together too:

```typescript
// data-table.ts

const $row = $.getByTestId('jeez').locator('tr').as($ => ({
  row: $,
  name: $.getByTestId('td').nth(0),
  age: $.getByTestId('td').nth(1),
  // type is inferred
}));

// use case

import * as DataTable from 'bódata-table.ts';

test('', async ({ page }) => {
  const { name, age } = DataTable.$row(page).nth(42);
  const a = await name.textContent();
  const b = await age.textContent();

  const allRows = await DataTable.$row(page).all();
  const c = await allRows[42].name.textContent();
  const d = await allRows[42].age.textContent();
})
```

I might be dumb but this thing reminds me of covariant and contravariant functors. I mean it is sort of like a Reader etc...

Anyways, welcome to the [repo](https://youtu.be/o3QYFzgu4AQ?t=102).
