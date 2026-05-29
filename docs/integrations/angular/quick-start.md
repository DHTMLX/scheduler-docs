---
title: Quick Start with Angular Scheduler
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Angular Scheduler wrapper in a standalone Angular app."
---

# Quick Start with Angular Scheduler

This guide renders a working Angular Scheduler in a standalone Angular application. It creates Scheduler inside a dedicated Angular component and mounts that component in the app shell.

## 1. Create An Angular Project

Create a standalone Angular app (Angular CLI):

~~~bash
ng new angular-scheduler-quick-start --standalone --routing=false --style=css
cd angular-scheduler-quick-start
~~~

If Angular CLI is not installed yet, install it first (`npm install -g @angular/cli`).

## 2. Install Angular Scheduler

Install Angular Scheduler as described in the [installation guide](integrations/angular/installation.md).

In this tutorial we use the evaluation package:

~~~bash
npm install @dhtmlx/trial-angular-scheduler
~~~

or

~~~bash
yarn add @dhtmlx/trial-angular-scheduler
~~~

If you already use the Professional package, replace `@dhtmlx/trial-angular-scheduler` with `@dhx/angular-scheduler` in the commands and imports.

## 3. Add Global Styles

Open `src/styles.css` and add the Scheduler styles:

~~~css title="src/styles.css"
@import "@dhtmlx/trial-angular-scheduler/dist/angular-scheduler.css";

html,
body {
  height: 100%;
  margin: 0;
}

app-root {
  display: block;
  height: 100vh;
}
~~~

This quick start uses a global CSS import, so you do not need `ViewEncapsulation.None` in the Scheduler component.

If you later move the Scheduler CSS import or overrides for internal Scheduler classes into a component stylesheet, Angular's default style encapsulation may scope those selectors. In that case, set `encapsulation: ViewEncapsulation.None` on that component, or keep the styles global.

## 4. Add Demo Data

Create `src/app/demo-data.ts`:

~~~ts title="src/app/demo-data.ts"
import type { Event } from "@dhx/angular-scheduler";

export const mainDate = new Date("2026-05-18T00:00:00");

export const schedulerEvents: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2026-05-18T09:00:00"),
    end_date: new Date("2026-05-18T10:30:00"),
  },
  {
    id: 2,
    text: "Design review",
    start_date: new Date("2026-05-18T12:00:00"),
    end_date: new Date("2026-05-18T13:00:00"),
  },
  {
    id: 3,
    text: "Implementation",
    start_date: new Date("2026-05-19T14:00:00"),
    end_date: new Date("2026-05-19T15:30:00"),
  },
];
~~~

## 5. Create A Scheduler Component

Create `src/app/scheduler.component.ts`:

~~~ts title="src/app/scheduler.component.ts"
import { Component } from "@angular/core";
import {
  DhxSchedulerComponent,
  type AngularSchedulerDataConfig,
  type Event,
  type SchedulerConfig,
} from "@dhx/angular-scheduler";
import { mainDate, schedulerEvents } from "./demo-data";

@Component({
  selector: "app-scheduler",
  standalone: true,
  imports: [DhxSchedulerComponent],
  host: { style: "display:block;height:100%;" },
  template: `
    <dhx-scheduler
      [events]="events"
      [date]="date"
      [config]="config"
      [data]="dataConfig"
      view="week">
    </dhx-scheduler>
  `,
})
export class SchedulerComponent {
  events: Event[] = schedulerEvents;
  date = mainDate;

  config: SchedulerConfig = {
    first_hour: 6,
    last_hour: 22,
  };

  dataConfig: AngularSchedulerDataConfig = {
    save: (entity, action, data, id) => {
      console.log("[data.save]", entity, action, data, id);
    },
  };
}
~~~

## 6. Render Scheduler In The App Shell

Replace `src/app/app.ts`:

~~~ts title="src/app/app.ts"
import { Component } from "@angular/core";
import { SchedulerComponent } from "./scheduler.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SchedulerComponent],
  template: `<app-scheduler></app-scheduler>`,
})
export class App {}
~~~

If your Angular project uses `app.component.ts` instead of `app.ts`, apply the same component code there and keep the class name expected by your `main.ts`.

## 7. Start The App

~~~bash
ng serve
~~~

Open `http://localhost:4200`. You should see Scheduler rendered in week view with the demo events. Edits will be logged through `data.save`.

If you are adding Scheduler to an existing app, keep your current app shell and place `<app-scheduler>` in the target page or route component. Make sure the parent layout provides a height to the Scheduler area.

## Optional: Minimal Local Save Handling

As a next step, replace logging with local array synchronization:

~~~ts title="src/app/scheduler.component.ts"
dataConfig: AngularSchedulerDataConfig = {
  save: (entity, action, item, id) => {
    if (entity !== "event") return;

    if (action === "create") {
      this.events = [...this.events, item as Event];
      return;
    }

    if (action === "update") {
      this.events = this.events.map(event =>
        String(event.id) === String(id) ? { ...(item as Event) } : event
      );
      return;
    }

    if (action === "delete") {
      this.events = this.events.filter(event => String(event.id) !== String(id));
    }
  },
};
~~~

For grouped updates, prefer `data.batchSave` and handle all changes in one state transaction.

## Continue With

- [Angular Scheduler Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
