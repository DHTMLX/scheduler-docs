---
title: Installing Vue Scheduler
sidebar_label: Installation
description: "How to install the evaluation or professional version of Vue Scheduler via npm or yarn."
---

# Installing Vue Scheduler

Vue Scheduler is available in two distributions:

1. **Evaluation version** publicly available on npm, includes a trial watermark, and can optionally be paired with a free evaluation period that grants access to technical support.
2. **Professional (commercial) version** available from the private DHTMLX npm repository and intended for production use.

Both packages contain the same API.

## Prerequisites

- Vue 3 project (or a project where you plan to add Vue 3)
- Node.js installed
- npm or Yarn available
- DHTMLX private npm access (professional package only)

## Install The Evaluation Package (Public npm)

The evaluation build is available on npm as [@dhtmlx/trial-vue-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-vue-scheduler):

~~~bash
npm install @dhtmlx/trial-vue-scheduler
~~~

or with Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-scheduler
~~~

This build is fully functional, but shows a message indicating that the library is running in evaluation mode.

### Optional: Start a full evaluation period (recommended)

Although the trial package installs without restrictions, you may also start an official evaluation through the website at
[https://dhtmlx.com/docs/products/dhtmlxScheduler-for-Vuejs/download.shtml](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-Vuejs/download.shtml).

Starting a formal evaluation gives you free technical support during the trial period.

**Downloading offline examples (zip)**

The evaluation form also includes downloadable ZIP containing offline-ready examples.

You can also explore additional examples and demo projects on the official GitHub by checking [Vue Scheduler Demos on GitHub](https://github.com/DHTMLX/?q=vue-scheduler&type=all&language=&sort=).

## Install The Professional Package (Private npm)

The Professional version is used for production applications and includes commercial licensing and full access to technical support.

Once you obtain a commercial license, generate private npm credentials in the [Client's Area](https://dhtmlx.com/clients/).

Configure npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Then install the Professional package:

~~~bash
npm install @dhx/vue-scheduler
~~~

or with Yarn:

~~~bash
yarn add @dhx/vue-scheduler
~~~

## Use The Matching Imports

Use imports that match the package you installed.

| Package | Component import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-vue-scheduler` | `import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";` | `import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";` |
| `@dhx/vue-scheduler` | `import { VueScheduler } from "@dhx/vue-scheduler";` | `import "@dhx/vue-scheduler/dist/vue-scheduler.css";` |

## Check Version Requirements

Wrapper peer dependency:

- `vue >= 3.2.25`

## Moving From The Trial Package To The Commercial One

Most projects start on the trial package and switch later, once the prototype is approved and a commercial license is in place. Both packages share the same API, so the move is mostly mechanical: swap the package name, swap the CSS import, and reinstall.

After you've configured the private registry as shown above, update every import in the code:

~~~ts
// before
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

// after
import { VueScheduler } from "@dhx/vue-scheduler";
import "@dhx/vue-scheduler/dist/vue-scheduler.css";
~~~

Search your project for any remaining mentions of `@dhtmlx/trial-vue-scheduler`, including the CSS import path. Replace the dependency in `package.json`, then reinstall and run the app.

### Using The Registry From CI Or Shared Build Environments

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

- [Quick Start with Vue Scheduler](integrations/vue/quick-start.md)
- [Vue Scheduler Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
