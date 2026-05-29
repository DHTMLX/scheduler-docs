---
title: Using Angular Scheduler with RxJS
sidebar_label: RxJS
description: "Step-by-step guide to integrating Angular Scheduler with an RxJS state service using BehaviorSubject and data.batchSave."
---

# Angular Scheduler + RxJS Tutorial

This tutorial shows a practical Angular pattern for state-driven Scheduler management using an injectable RxJS service.

The result:

- a `BehaviorSubject` holds events, active date, active view, and history,
- the shell component exposes a view model with `AsyncPipe`,
- Scheduler edits flow into the store through `data.batchSave`,
- undo/redo and toolbar navigation are handled in the same service.

A complete working project that follows this tutorial is on GitHub: [angular-scheduler-rxjs-starter](https://github.com/DHTMLX/angular-scheduler-rxjs-starter).

## Prerequisites

- Angular app with Angular Scheduler installed (see [Installation](integrations/angular/installation.md)).
- Working wrapper render (see [Quick Start](integrations/angular/quick-start.md)).
- Basic Angular dependency injection and RxJS knowledge.

## Project Layout

The starter splits the feature into a small set of files:

~~~text
src/app/
  scheduler-demo.component.*        <-- feature shell and DHTMLX Scheduler host
  scheduler-demo.store.ts           <-- RxJS state, batch flow, history
  scheduler-demo.data.ts            <-- initial events
  components/
    scheduler/
      scheduler-view.component.ts
      scheduler-view.component.html
    toolbar/
      toolbar.component.ts
      toolbar.component.html
~~~

`SchedulerStore` is provided by `SchedulerDemoComponent`, so each rendered demo shell gets isolated events and undo/redo history.

## 1. Define Seed Data

Create `src/app/scheduler-demo.data.ts`:

~~~ts title="src/app/scheduler-demo.data.ts"
import type { Event } from "@dhtmlx/trial-angular-scheduler";

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

## 2. Build The Store

Create `src/app/scheduler-demo.store.ts`:

~~~ts title="src/app/scheduler-demo.store.ts"
import { Injectable } from "@angular/core";
import type { AngularSchedulerDataConfig, BatchChanges, Event } from "@dhx/angular-scheduler";
import { BehaviorSubject, map } from "rxjs";
import { mainDate, schedulerEvents } from "./scheduler-demo.data";

export type SchedulerView = "day" | "week" | "month";

interface Snapshot {
  events: Event[];
  date: Date;
  view: SchedulerView;
}

interface SchedulerStoreState {
  events: Event[];
  date: Date;
  view: SchedulerView;
  past: Snapshot[];
  future: Snapshot[];
}

export interface SchedulerViewModel {
  events: Event[];
  date: Date;
  view: SchedulerView;
  formattedDate: string;
  canUndo: boolean;
  canRedo: boolean;
}

const cloneDate = (value: unknown): Date | undefined => {
  if (value instanceof Date) return new Date(value.getTime());
  if (typeof value === "string") return new Date(value);
  return undefined;
};

const cloneEvent = (event: Event): Event => ({
  ...event,
  start_date: cloneDate(event.start_date),
  end_date: cloneDate(event.end_date),
});

@Injectable()
export class SchedulerStore {
  private readonly maxHistory = 50;
  private readonly stateSubject = new BehaviorSubject<SchedulerStoreState>(this.createInitialState());
  private readonly state$ = this.stateSubject.asObservable();

  readonly vm$ = this.state$.pipe(map(state => this.createViewModel(state)));

  readonly dataConfig: AngularSchedulerDataConfig = {
    batchSave: changes => this.applyBatch(changes),
  };

  setView(view: SchedulerView): void {
    const state = this.stateSubject.value;
    if (state.view === view) return;

    const withHistory = this.pushHistory(state);
    this.stateSubject.next({ ...withHistory, view });
  }

  setDate(date: Date): void {
    const state = this.stateSubject.value;
    if (state.date.getTime() === date.getTime()) return;

    const withHistory = this.pushHistory(state);
    this.stateSubject.next({ ...withHistory, date: new Date(date) });
  }

  addDate(step: number): void {
    const state = this.stateSubject.value;
    const next = new Date(state.date);

    if (state.view === "day") next.setDate(next.getDate() + step);
    else if (state.view === "week") next.setDate(next.getDate() + step * 7);
    else next.setMonth(next.getMonth() + step);

    this.setDate(next);
  }

  undo(): void {
    const state = this.stateSubject.value;
    if (state.past.length === 0) return;

    const previous = state.past[state.past.length - 1];
    const current = this.createSnapshot(state);
    const restored = this.restoreSnapshot(previous);

    this.stateSubject.next({
      ...state,
      ...restored,
      past: state.past.slice(0, -1),
      future: [current, ...state.future],
    });
  }

  redo(): void {
    const state = this.stateSubject.value;
    if (state.future.length === 0) return;

    const next = state.future[0];
    const current = this.createSnapshot(state);
    const restored = this.restoreSnapshot(next);

    this.stateSubject.next({
      ...state,
      ...restored,
      past: this.trimPast([...state.past, current]),
      future: state.future.slice(1),
    });
  }

  applyBatch(changes: BatchChanges): void {
    const updates = changes.events ?? [];
    if (updates.length === 0) return;

    const state = this.stateSubject.value;
    const withHistory = this.pushHistory(state);
    let events = withHistory.events;

    updates.forEach(change => {
      if (change.action === "delete") {
        events = events.filter(event => String(event.id) !== String(change.id));
        return;
      }

      const nextEvent = cloneEvent(change.data as Event);
      events = events.some(event => String(event.id) === String(change.id))
        ? events.map(event => (String(event.id) === String(change.id) ? nextEvent : event))
        : [...events, nextEvent];
    });

    this.stateSubject.next({ ...withHistory, events });
  }

  private createInitialState(): SchedulerStoreState {
    return {
      events: schedulerEvents.map(cloneEvent),
      date: new Date(mainDate),
      view: "week",
      past: [],
      future: [],
    };
  }

  private createViewModel(state: SchedulerStoreState): SchedulerViewModel {
    return {
      events: state.events.map(cloneEvent),
      date: new Date(state.date),
      view: state.view,
      formattedDate: state.date.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
    };
  }

  private pushHistory(state: SchedulerStoreState): SchedulerStoreState {
    return {
      ...state,
      past: this.trimPast([...state.past, this.createSnapshot(state)]),
      future: [],
    };
  }

  private createSnapshot(state: SchedulerStoreState): Snapshot {
    return {
      events: state.events.map(cloneEvent),
      date: new Date(state.date),
      view: state.view,
    };
  }

  private restoreSnapshot(snapshot: Snapshot): Pick<SchedulerStoreState, "events" | "date" | "view"> {
    return {
      events: snapshot.events.map(cloneEvent),
      date: new Date(snapshot.date),
      view: snapshot.view,
    };
  }

  private trimPast(past: Snapshot[]): Snapshot[] {
    return past.length <= this.maxHistory ? past : past.slice(past.length - this.maxHistory);
  }
}
~~~

Why this shape works:

- The store clones event dates when exposing state, so Scheduler edits cannot mutate history snapshots by reference.
- `dataConfig.batchSave` is stable and delegates all grouped changes to the store.
- `pushHistory()` makes event edits, date changes, and view changes undoable.
- ID comparisons use `String()` because Scheduler event IDs can be strings or numbers.

## 3. Create The Scheduler View Component

Create `src/app/components/scheduler/scheduler-view.component.ts`:

~~~ts title="src/app/components/scheduler/scheduler-view.component.ts"
import { Component, Input } from "@angular/core";
import {
  DhxSchedulerComponent,
  type AngularSchedulerDataConfig,
  type Event,
  type SchedulerXY,
} from "@dhx/angular-scheduler";
import type { SchedulerView } from "../../scheduler-demo.store";

@Component({
  selector: "app-scheduler-view",
  standalone: true,
  imports: [DhxSchedulerComponent],
  templateUrl: "./scheduler-view.component.html",
})
export class SchedulerViewComponent {
  @Input() events: Event[] = [];
  @Input() date = new Date();
  @Input() view: SchedulerView = "week";
  @Input() data: AngularSchedulerDataConfig | null = null;
  @Input() xy: SchedulerXY = {};
}
~~~

Create `src/app/components/scheduler/scheduler-view.component.html`:

~~~html title="src/app/components/scheduler/scheduler-view.component.html"
<dhx-scheduler
  [events]="events"
  [date]="date"
  [view]="view"
  [data]="data"
  [xy]="xy">
</dhx-scheduler>
~~~

The view component is deliberately thin. It knows only how to pass inputs to the wrapper.

## 4. Build a custom toolbar component

`src/app/components/toolbar/toolbar.component.ts` is a presentation-only component: inputs for the current state, outputs for the user's intent. It does not know about the store.

```ts title="src/app/components/toolbar/toolbar.component.ts"
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { SchedulerView } from '../../scheduler-demo.store';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() canUndo = false;
  @Input() canRedo = false;
  @Input() view: SchedulerView = 'week';
  @Input() formattedDate = '';

  @Output() undoClick = new EventEmitter<void>();
  @Output() redoClick = new EventEmitter<void>();
  @Output() viewChange = new EventEmitter<SchedulerView>();
  @Output() dateStep = new EventEmitter<number>();
  @Output() dateChange = new EventEmitter<Date>();

  today(): void {
    this.dateChange.emit(new Date());
  }
}
```

```html title="src/app/components/toolbar/toolbar.component.html"
<div class="demo-toolbar timeline-toolbar">
  <button type="button" [disabled]="!canUndo" (click)="undoClick.emit()">
    Undo
  </button>
  <button type="button" [disabled]="!canRedo" (click)="redoClick.emit()">
    Redo
  </button>
  <button
    type="button"
    [class.active]="view === 'day'"
    (click)="viewChange.emit('day')"
  >
    Day
  </button>
  <button
    type="button"
    [class.active]="view === 'week'"
    (click)="viewChange.emit('week')"
  >
    Week
  </button>
  <button
    type="button"
    [class.active]="view === 'month'"
    (click)="viewChange.emit('month')"
  >
    Month
  </button>
  <span class="toolbar-spacer"></span>
  <span class="toolbar-date">{{ formattedDate }}</span>
  <span class="toolbar-spacer"></span>
  <button type="button" (click)="dateStep.emit(-1)">&lt;</button>
  <button type="button" (click)="today()">Today</button>
  <button type="button" (click)="dateStep.emit(1)">&gt;</button>
</div>
```
Keeping the toolbar dumb means the shell can change how state is sourced (different store, different input names) without touching the toolbar.

## 4. Compose The Shell

Create `src/app/scheduler-demo.component.ts`:

~~~ts title="src/app/scheduler-demo.component.ts"
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { type SchedulerXY } from "@dhx/angular-scheduler";
import { SchedulerViewComponent } from "./components/scheduler/scheduler-view.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SchedulerStore, type SchedulerView } from "./scheduler-demo.store";

@Component({
  selector: "app-scheduler-demo",
  standalone: true,
  imports: [AsyncPipe, ToolbarComponent, SchedulerViewComponent],
  providers: [SchedulerStore],
  templateUrl: "./scheduler-demo.component.html",
  styleUrl: "./scheduler-demo.component.css"
})

export class SchedulerDemoComponent {
  private readonly store = inject(SchedulerStore);

  readonly vm$ = this.store.vm$;
  readonly dataConfig = this.store.dataConfig;
  
  xy: SchedulerXY = { nav_height: 0 };
  
  setView(view: SchedulerView): void {
    this.store.setView(view);
  }

  setDate(date: Date): void {
    this.store.setDate(date);
  }

  addDate(step: number): void {
    this.store.addDate(step);
  }

  undo(): void {
    this.store.undo();
  }

  redo(): void {
    this.store.redo();
  }
}
~~~

Create `src/app/scheduler-demo.component.html`:

~~~html title="src/app/scheduler-demo.component.html"
@if (vm$ | async; as vm) {
  <section class="demo-panel" data-cy="state-management-demo" data-sample="state-management">
    <app-toolbar
      [canUndo]="vm.canUndo"
      [canRedo]="vm.canRedo"
      [view]="vm.view"
      [formattedDate]="vm.formattedDate"
      (undoClick)="undo()"
      (redoClick)="redo()"
      (viewChange)="setView($event)"
      (dateChange)="setDate($event)"
      (dateStep)="addDate($event)"
    ></app-toolbar>

    <app-scheduler-view
      [events]="vm.events"
      [date]="vm.date"
      [view]="vm.view"
      [data]="dataConfig"
      [xy]="xy"
    ></app-scheduler-view>
  </section>
}

~~~

The toolbar markup can be split into its own component, as in the starter project. Keep it presentation-only: inputs for current state, outputs for user intent.

## 5. Wire It Into The App

Mount the shell as the root view or as a route target:

~~~ts title="src/app/app.ts"
import { Component } from '@angular/core';
import { SchedulerDemoComponent } from './scheduler-demo.component';

@Component({
  selector: 'app-root',
  imports: [SchedulerDemoComponent],
  standalone: true,
  template: `<app-scheduler-demo></app-scheduler-demo>`,
})

export class App {}
~~~

## 6. Data Flow And Rationale

For a typical edit, such as dragging an event:

1. User edits an event in Scheduler.
2. Scheduler emits low-level changes.
3. The wrapper batches them and calls `data.batchSave(changes)`.
4. The shell forwards the stable callback to `SchedulerStore.applyBatch(changes)`.
5. The store applies all event changes in one transaction.
6. The store pushes a snapshot to `past`, clears `future`, and emits the new state.
7. `vm$` emits a fresh view model, and Angular rebinds the changed `<dhx-scheduler>` inputs.

This keeps Angular state as the source of truth and still handles high-volume Scheduler actions efficiently.

## Common Pitfalls

- **Using `data.save` when one user action can create many low-level changes.** `data.batchSave` collapses grouped edits into one store update.
- **Mutating `vm.events` directly in a component.** Mutating view-model arrays in place can corrupt current state and history.
- **Reusing snapshot arrays without cloning.** Undo/redo should restore independent copies.
- **Mixing imperative `instance` mutations with controlled `events`.** If you add or delete events through the instance, update the store too.

## Continue With

- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Scheduler Overview](integrations/angular/overview.md)
