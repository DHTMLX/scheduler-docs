---
title: "Angular Scheduler"
sidebar_label: Angular Scheduler
description: "Install, configure, and use DHTMLX Scheduler in Angular with the official wrapper."
image: /img/frameworks/angular.png
---

Angular Scheduler is the official Angular wrapper for DHTMLX Scheduler. It gives you a standalone Angular component API while preserving access to the full Scheduler engine.

## What You Get With The Wrapper

- Declarative inputs for `events`, `date`, `view`, `config`, `templates`, `plugins`, `theme`, `locale`, `markers`, `views`, `xy`, and `filter`.
- Controlled event synchronization through the `events` input.
- Optional Scheduler-owned loading through `data.load`.
- Change handling through `data.save` and `data.batchSave`.
- Scheduler event wiring through `on<EventName>` inputs.
- Angular lifecycle access through `(ready)` and component instance access through `@ViewChild`.
- Angular component rendering in templates and event boxes through `templateComponent(...)`.
- Angular custom lightbox and modal hooks for event editing and confirmations.

~~~ts
import { Component } from "@angular/core";
import { DhxSchedulerComponent, type Event } from "@dhx/angular-scheduler";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DhxSchedulerComponent],
  template: `
    <div style="height: 600px;">
      <dhx-scheduler [events]="events" view="week"></dhx-scheduler>
    </div>
  `,
})
export class AppComponent {
  events: Event[] = [
    {
      id: 1,
      text: "Planning",
      start_date: new Date("2026-05-18T09:00:00"),
      end_date: new Date("2026-05-18T10:30:00"),
    },
  ];
}
~~~

If you want the architecture and capability map first, read [Angular Scheduler Overview](integrations/angular/overview.md).

## Recommended Learning Path

Follow this order if you are new to the wrapper:

1. [Installation](integrations/angular/installation.md) for package channel selection and imports.
2. [Quick Start](integrations/angular/quick-start.md) to render your first Scheduler.
3. [Configuration Reference](integrations/angular/configuration-props.md) for inputs, events, templates, and data callback details.
4. [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) to choose a data ownership model.
5. [RxJS Integration Tutorial](integrations/angular/state/rxjs.md) implement a store-driven pattern with `BehaviorSubject` and `AsyncPipe`.

## Wrapper Vs Low-Level JS Integration

Pick the integration path based on how much Angular lifecycle and synchronization logic you want to manage yourself.

- Use the **official wrapper** (`@dhtmlx/trial-angular-scheduler` or `@dhx/angular-scheduler`) for Angular inputs, lifecycle integration, wrapper-managed synchronization.
- Use **low-level JS integration** only when you want direct control over instance lifecycle, markup, and manual API orchestration.

For the low-level path, use [dhtmlxScheduler with Angular](integrations/angular/js-scheduler-angular.md).

## Data And State Management Entry Point

Start with the state section if you already know you need store or backend synchronization:

- [Data & State Management](integrations/angular/state.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Using Angular Scheduler with RxJS](integrations/angular/state/rxjs.md)

## Examples and evaluation resources

Browse the public Angular Scheduler examples for runnable demos of the wrapper:

- [Live demo](https://dhtmlx.github.io/angular-scheduler-examples/)
- [GitHub repository](https://github.com/DHTMLX/angular-scheduler-examples)

If you're evaluating Angular Scheduler, the evaluation page provides access to technical support during the evaluation period. See [Installation](integrations/angular/installation.md).
