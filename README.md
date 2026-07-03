# SauceDemo E2E Test Suite

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com),
built with Playwright Test, TypeScript, and the Page Object Model.

## Tech stack

- **Playwright Test** — test runner and web-first assertions
- **TypeScript** — type-safe test and page-object code
- **Page Object Model** — page interactions encapsulated in reusable classes
- **Custom fixtures** — shared setup (e.g. logged-in state) without duplication
- **GitHub Actions** — tests run automatically on every push and pull request

## Project structure

    fixtures/       Custom test fixtures (page objects, logged-in state)
    pages/          Page Object classes (Login, Inventory, Cart, Checkout)
    tests/          Test specs
    test-data/      Externalized test data for data-driven tests
    .github/        GitHub Actions workflow

## Getting started

    npm ci
    npx playwright install

## Running tests

    # All browsers
    npx playwright test

    # Single browser
    npx playwright test --project=chromium

    # A single file
    npx playwright test tests/login.spec.ts

    # Headed / debug
    npx playwright test --headed
    npx playwright test --debug

## Viewing the report

    npx playwright show-report

On CI, the HTML report is uploaded as a downloadable artifact on each run.

## Test coverage

- **Login** — valid login plus locked-out, wrong-password, and empty-field errors
- **Inventory** — product sorting (name and price, both directions)
- **Cart** — add/remove items with cart-badge verification
- **Checkout** — full purchase flow and form-validation errors
- **Logout** — returns to the login page

## CI Integration

GitHub Actions automatically:

- Installs dependencies
- Installs Playwright browsers
- Executes the complete test suite
- Uploads the Playwright HTML report as a build artifact

The workflow runs on every push and pull request.
