---
title: Quick Start with React Scheduler
sidebar_label: Quick Start
description: 'Step-by-step guide to using the React Scheduler component'
---

# Quick Start with React Scheduler

:::note
This tutorial covers the React wrapper included in the **Commercial, Enterprise, and Ultimate** editions of DHTMLX Scheduler.
If you are using the **Individual** or **GPL** edition, follow the alternative guide:
[How to Start with React](integrations/react/js-scheduler-react.md).
:::

The **React Scheduler** component is the official wrapper for **DHTMLX Scheduler**.
This guide walks you through creating a small React application and rendering a basic Scheduler using the trial package.

If you're new to React, start with the official [React documentation](https://react.dev/learn). Check [a complete working project that follows this tutorial on GitHub](https://github.com/dhtmlx/react-scheduler-quick-start).

## Version requirements

- React **18 or newer**

## Creating a new React project

To create a React project and go to the project directory, run the following commands:

~~~bash
npm create vite@latest react-scheduler-quick-start -- --template react-ts
cd react-scheduler-quick-start
~~~

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

## Adding demo data

We'll use static data for this example. Create a file named `src/demoData.ts`:

~~~ts
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
  // ....
];
~~~

## Creating a Scheduler component

To add a Scheduler component, create an `src/components/Scheduler/Scheduler.tsx` file with the following content:

~~~tsx
import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';
import './styles.css';

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

Finally, the CSS classes (`.violet`, `.green`, `.yellow`) are applied through the `event_class` template to customize the visual appearance of the events:

~~~css
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


## Rendering Scheduler in the App

To display Scheduler, replace the code of `src/App.tsx` with the following one:

~~~tsx
import './App.css';
import Scheduler from './components/Scheduler/Scheduler';
import { events } from './demoData';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}

export default App;
~~~

After that, run the app using the command below:

~~~bash
npm run dev
~~~

At this point, you have a **fully working React + DHTMLX Scheduler application**.

This setup represents the **minimum configuration** needed to:

- render a Scheduler
- display events
- apply a basic scale configuration
- attach the Scheduler instance via a React ref
- receive events through the `data.save` callback

This is the same minimal example used in the [GitHub demo project](https://github.com/dhtmlx/react-scheduler-quick-start).

From here, you can continue by adding more advanced features:

- syncing data with React state
- loading/saving data from your backend
- adding templates and custom renderers
- adding filtering
- replacing the Lightbox with a custom component

The next sections introduce these capabilities one by one.

## Using React state as the source of truth

_(recommended for most React apps)_

In real applications events usually come from the React state.
Below is a complete example where Scheduler **sends changes back to React** via the `data.save` callback.

~~~tsx
import { useState } from 'react';
import ReactScheduler, { Event } from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';
import { events as initialEvents } from './demoData';

export default function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const data = {
    save: (entity, action, item, id) => {
      if (entity === 'event') {
        if (action === 'create') setEvents((prev) => [...prev, item]);
        if (action === 'update') setEvents((prev) => prev.map((x) => (x.id === id ? item : x)));
        if (action === 'delete') setEvents((prev) => prev.filter((x) => x.id !== id));
      }
    },
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactScheduler
        events={events}
        data={data}
        // ...other props
      />
    </div>
  );
}
~~~

### Why choose this mode

- React always sees the same data as the Scheduler UI
- Works perfectly with Redux / Zustand / Jotai / MobX
- Easy to sync with backend APIs

## Alternative Mode: Scheduler as the source of truth

_(useful for very large datasets)_

In this mode React does not own events.

~~~tsx
<ReactScheduler
  data={{
    load: '/api/data', // scheduler loads initial events from here
    save: '/api/data', // scheduler sends updates back here
  }}
/>
~~~

### When to prefer this mode

- Tens of thousands of events
- Frequent user interactions and updates
- You want minimal React rendering overhead

## Using Templates

_(return React elements from template functions)_

Templates allow customizing almost every part of the scheduler.

~~~tsx
import ReactScheduler, { SchedulerTemplates } from '@dhtmlx/trial-react-scheduler';
import { useMemo } from 'react';
import EventTextBox from './components/EventTextBox';

const templates: SchedulerTemplates = useMemo(
  () => ({
    event_class: (start, end, event) => {
      return 'templates-' + event.classname || '';
    },
    event_text: (start, end, event) => {
      return <EventTextBox event={event} />;
    },
  }),
  []
);

<ReactScheduler templates={templates} />;
~~~

### More details

See the full section here: [React Scheduler Templates Documentation](integrations/react/configuration-props.md).

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-scheduler-quick-start).

## Next steps

- Study all the available [React Scheduler props](integrations/react/configuration-props.md)
- Explore advanced Scheduler features in the [Guides](/guides/)
