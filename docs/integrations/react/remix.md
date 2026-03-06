---
title: React Scheduler with Remix
sidebar_label: Remix
description: Learn how to integrate DHTMLX React Scheduler with Remix (React Router v7), including client component setup and demo data.
---

# React Scheduler with Remix

This tutorial shows how to create a simple **Remix** application and render a **DHTMLX React Scheduler** on a page.

:::note
The complete source code is [available on GitHub](https://github.com/dhtmlx/react-scheduler-remix-starter).
:::

## Prerequisites

- Node.js (LTS recommended)
- React + TypeScript basics
- Remix / React Router fundamentals. If you need a refresher, see the Remix docs: https://remix.run/docs

## Quick setup - create the project

Since Remix now ships as part of **React Router v7**, the recommended way to scaffold a project is:

~~~bash
npx create-react-router@latest
~~~

When prompted, choose:

- Project name: **react-scheduler-remix-quick-start**
- Use the default template (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Yes

After installation, navigate into the project directory:

```bash
cd react-scheduler-remix-quick-start
```

### Installing React Scheduler

Install React Scheduler as described in the [React Scheduler installation guide](integrations/react/installation.md).

In this tutorial we use the evaluation package:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

or

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

If you already use the Professional package, replace `@dhtmlx/trial-react-scheduler` with `@dhx/react-scheduler` in the commands and imports.

## Preparing demo data

Create a `data/` folder at the project root. Inside it, add a `demoData.ts` file containing the initial data for the Scheduler:

~~~ts title="data/demoData.ts"
import type { Event } from '@dhtmlx/trial-react-scheduler';

export const events: Event[] = [
  {
    id: 1,
    classname: 'blue',
    start_date: new Date('2025-12-08T02:00:00Z'),
    end_date: new Date('2025-12-08T10:20:00Z'),
    text: 'Product Strategy Hike',
  },
  {
    id: 2,
    classname: 'blue',
    start_date: new Date('2025-12-08T12:00:00Z'),
    end_date: new Date('2025-12-08T16:00:00Z'),
    text: 'Agile Meditation and Release',
  },
  {
    id: 3,
    classname: 'violet',
    start_date: new Date('2025-12-09T06:00:00Z'),
    end_date: new Date('2025-12-09T11:00:00Z'),
    text: 'Tranquil Tea Time',
  },
  {
    id: 4,
    classname: 'green',
    start_date: new Date('2025-12-09T11:30:00Z'),
    end_date: new Date('2025-12-09T19:00:00Z'),
    text: 'Sprint Review and Retreat',
  },
  {
    id: 5,
    classname: 'yellow',
    start_date: new Date('2025-12-10T06:00:00Z'),
    end_date: new Date('2025-12-10T08:00:00Z'),
    text: 'Stakeholder Sunset Yoga Session',
  },
];
~~~

:::note
The companion demo includes additional events for a richer visual.
:::

## Creating the Scheduler component

Remix allows using client-side components via the standard React architecture. React Scheduler should be rendered inside a Client Component in most practical cases.

This is required whenever you:

- use `ref` to access the Scheduler instance
- pass callbacks (events, templates, data handlers)
- use ReactScheduler `hooks`
- provide dynamic config or React elements

Therefore, our Scheduler component will begin with `"use client"`.

Create a new file at `components/Scheduler/Scheduler.tsx`:

~~~tsx title="components/Scheduler/Scheduler.tsx"
'use client';

import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';

export interface ReactSchedulerProps {
  events: Event[];
  activeView?: string;
  activeDate?: Date;
}

export default function Scheduler({
  events,
  activeView = 'week',
  activeDate = new Date('2025-12-08T00:00:00Z'),
}: ReactSchedulerProps) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (start: Date, end: Date, event: Event) => {
        return event.classname || '';
      },
    }),
    []
  );

  const config: SchedulerConfig = useMemo(() => {
    return {
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    };
  }, []);

  return (
    <ReactScheduler
      ref={schedulerRef}
      events={events}
      view={activeView}
      date={activeDate}
      templates={templates}
      config={config}
      data={{
        save: (entity: string, action: string, data: Event, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~

This component initializes the Scheduler and provides it with configuration, initial data, and a `ref` for future API calls. The `config` object controls the layout of the timeline, while `events` props supply the Scheduler with its dataset. We also pass `activeView` and `activeDate` as props so the parent component controls what the Scheduler displays.

The `save` function inside the `data` prop is used to track updates made to events inside the Scheduler. In this tutorial we add a simple placeholder handler for tracking changes. If you want to send updates to a backend or bind them to React state, you can follow the official data-binding [guide](integrations/react/overview.md#bindingdata).

## Adding event color styles

The CSS classes (`.blue`, `.violet`, `.green`, `.yellow`) are applied through the `event_class` template to customize the visual appearance of the events. Add the following to `app/app.css`:

~~~css title="app/app.css"
.blue {
  --dhx-scheduler-event-background: linear-gradient(180deg, #0e8af0 0%, #0ec1f0 100%);
}
.violet {
  --dhx-scheduler-event-background: linear-gradient(180deg, #d071ef 0%, #ee71d5 100%);
}
.green {
  --dhx-scheduler-event-background: linear-gradient(180deg, #12d979 0%, #1ecdeb 100%);
}
.yellow {
  --dhx-scheduler-event-background: linear-gradient(180deg, #ffb725 0%, #ffbb25 31.25%, #faea27 100%);
}
~~~

:::note
To make the Scheduler occupy the whole page cleanly, ensure the body has no extra margin:

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## Rendering Scheduler on a route

Open the main page route — `app/routes/home.tsx`. Replace its content with the following:

~~~tsx title="app/routes/home.tsx"
import { events } from '../../data/demoData';
import type { Route } from './+types/home';
import Scheduler from 'components/Scheduler/Scheduler';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
  ];
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

Now the Scheduler will be displayed at the `/` route.

## Starting the application

Run the development server:

~~~bash
npm run dev
~~~

Then open `http://localhost:5173` in your browser. You should now see a working Scheduler with the initial data inside a Remix application.

## Summary

You now have a minimal Remix project with DHTMLX React Scheduler:

- Scheduler is rendered as a Client Component (`"use client"`) inside Remix / React Router v7
- demo data is loaded from a separate file and passed as props
- the `event_class` template applies custom color gradients to events
- the `data.save` callback logs edits to the console (ready to be wired to a backend)

## What's next

- [React-driven data flow](integrations/react/overview.md#bindingdata)
- [React Scheduler Templates Documentation](integrations/react/configuration-props.md)
- Explore state management integrations:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
