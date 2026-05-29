---
title: Installing Angular Scheduler
sidebar_label: Installation
description: "How to install the evaluation or professional version of Angular Scheduler via npm or yarn."
---

# Installing Angular Scheduler

Angular Scheduler is available in two distributions:

1. **Evaluation version** publicly available on npm, includes a trial watermark, and can optionally be paired with a free evaluation period that grants access to technical support.
2. **Professional (commercial) version** available from the private DHTMLX npm repository and intended for production use.

Both packages contain the same wrapper API.

## Install The Evaluation Package (Public npm)

The evaluation build is available on npm as [@dhtmlx/trial-angular-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-angular-scheduler):

~~~bash
npm install @dhtmlx/trial-angular-scheduler
~~~

or with Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-scheduler
~~~

This build is fully functional, but shows a message indicating that the library is running in evaluation mode.

## Install The Professional Package (Private npm)

The professional version is used for production applications and includes commercial licensing and full access to technical support.

Once you obtain a commercial license, you can generate your private npm credentials in the [Client's Area](https://dhtmlx.com/clients/).

After generating your login/password, configure npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Then install the professional package:

~~~bash
npm install @dhx/angular-scheduler
~~~

or with Yarn:

~~~bash
yarn add @dhx/angular-scheduler
~~~

## Angular Project Requirements

Wrapper peer dependencies currently require:

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`


## Import Matrix

Use imports that match the package channel you installed.

| Package | Component import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-scheduler` | `import { DhxSchedulerComponent } from "@dhtmlx/trial-angular-scheduler";` | `@import "@dhtmlx/trial-angular-scheduler/dist/angular-scheduler.css";` |
| `@dhx/angular-scheduler` | `import { DhxSchedulerComponent } from "@dhx/angular-scheduler";` | `@import "@dhx/angular-scheduler/dist/angular-scheduler.css";` |

Add the CSS import in your global Angular styles (for example `src/styles.css`).

This is the recommended default for Angular apps because Scheduler styles are library-wide styles and do not need Angular component scoping.

## Global vs Component CSS Import

- **Global import:** import the wrapper CSS path from the matrix above in `src/styles.css` (or register it in `angular.json` `styles`). No special component encapsulation settings are required.
- **Component stylesheet import:** you can import the same CSS in a component `styleUrl`, but then Angular's default `ViewEncapsulation.Emulated` may scope selectors and prevent Scheduler internal `.dhx-*` styles/overrides from applying as expected.

If you import Scheduler CSS in a component stylesheet or define overrides for internal Scheduler classes (for example `.dhx-scheduler-root`) in that stylesheet, set:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class SchedulerPageComponent {}
~~~

Use the component import pattern mainly for self-contained demos/examples. For production apps, prefer the global import.

## Moving From The Trial Package To The Professional One

Most projects start on the trial package and switch later, once the prototype is approved and a commercial license is in place. Both packages share the same API, so the move is mostly mechanical: swap the package name, swap the CSS import, and reinstall.

After you've configured the private registry as shown above, update every import in the code:


~~~ts
// before
import { DhxSchedulerComponent } from "@dhtmlx/trial-angular-scheduler";
~~~

~~~css
@import "@dhtmlx/trial-angular-scheduler/dist/angular-scheduler.css";
~~~

~~~ts
// after
import { DhxSchedulerComponent } from "@dhx/angular-scheduler";
~~~

~~~css
@import "@dhx/angular-scheduler/dist/angular-scheduler.css";
~~~

Search the project for any remaining mentions of `@dhtmlx/trial-angular-gantt`, including the CSS import path - that one is the easiest to forget. Replace the dependency in `package.json`, then `npm install` and run the app. If the watermark is gone and the rest of the UI behaves identically, the swap is done.

## Using The Registry From CI Or Shared Build Environments

`npm login` works fine on a developer machine, but CI runners and other shared build environments typically can't run an interactive login. For those, generate a non-interactive access token from a logged-in machine:


~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

The token is printed once in the terminal output - copy it before closing the session, since it cannot be retrieved later. Then expose it through an `.npmrc` file that the build can read:


~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Set `DHTMLX_NPM_TOKEN` as a secret in the CI provider (GitHub Actions, GitLab, etc.) so the token never gets committed. The same pattern works for Docker builds - inject the token at build time rather than baking it into the image.

If `npm install` fails on CI with a 401 or 403 against `npm.dhtmlx.com`, the secret is either missing, expired, or the `.npmrc` file isn't where npm expects it (the project root is the safest location).


## What To Read Next

- [Quick Start with Angular Scheduler](integrations/angular/quick-start.md)
- [Angular Scheduler Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
