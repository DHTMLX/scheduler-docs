---
title: React Scheduler and Starhive Integration
sidebar_label: Starhive Quick Start
description: "Connect DHTMLX React Scheduler to a Starhive NoSQL backend via Next.js API routes."
---

# React Scheduler and Starhive Integration

This tutorial connects **React Scheduler** to a **Starhive** NoSQL backend through Next.js Route Handlers. Starhive provides a typed schema and a generated TypeScript client, so the API layer stays minimal: one endpoint loads events and resources, another handles create / update / delete.

You will build:

- a Next.js page that hosts the Scheduler in a Client Component
- `/api/load` - fetches events and resources from Starhive on first render
- `/api/event` (POST) and `/api/event/[id]` (PUT, DELETE) - write paths used by the Scheduler `dataBridge`

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-starhive-demo).
:::

## Prerequisites

- Next.js + React + TypeScript basics
- Node.js 18+
- A [Starhive](https://starhive.com/) account (the 30-day trial is sufficient)

## Step 1. Create the project

```bash
npx create-next-app@latest react-scheduler-starhive-demo
cd react-scheduler-starhive-demo
```

Install React Scheduler as described in the [React Scheduler installation guide](integrations/react/installation.md). For evaluation:

```bash
npm install @dhtmlx/trial-react-scheduler
```

If you already use the Professional package, replace `@dhtmlx/trial-react-scheduler` with `@dhx/react-scheduler` in commands and imports.

You also need `axios` - it's a peer dependency of the generated Starhive TypeScript client. 

```bash
npm install axios
```

## Step 2. Set up the Starhive space

After signing in, click **+ Create** in the top right corner and name the space `Scheduler`.

Inside the space, create two types: `Resources` and `Events`. Resources hold the rows of the timeline (teams, people, rooms, etc.). Events reference one Resource each.

Add the following attributes via the **+ Attribute** button. Starhive autogenerates the `id` for each item, so you don't need to declare it.

**Resources type**

| Field   | Type |
| ------- | ---- |
| `label` | Text |

**Events type**

| Field         | Type                       |
| ------------- | -------------------------- |
| `text`        | Text                       |
| `start_date`  | Date & Time                |
| `end_date`    | Date & Time                |
| `resource_id` | Reference → Resources      |

## Step 3. Import sample data

Create `scheduler_resources.csv`:

```csv
label
"Frontend Team"
"Backend Team"
"QA Team"
"DevOps"
"Security Team"
```

And `scheduler_events.csv`:

```csv
text,start_date,end_date,resource_id
"Development","2026-04-01T08:00:00","2026-04-01T10:30:00","Frontend Team"
"Code Review","2026-04-01T09:00:00","2026-04-01T11:30:00","Backend Team"
"QA Testing","2026-04-01T10:00:00","2026-04-01T13:00:00","QA Team"
"Deployment","2026-04-01T11:00:00","2026-04-01T13:30:00","DevOps"
"Incident Response","2026-04-01T12:00:00","2026-04-01T15:00:00","DevOps"
"Maintenance Window","2026-04-01T08:30:00","2026-04-01T11:00:00","Backend Team"
"Security Scan","2026-04-01T13:00:00","2026-04-01T15:30:00","Security Team"
```

In the Starhive UI, open the type and click **CSV import** for each file.

## Step 4. Generate and copy the schema

Go to **Settings → API Connectors**. Select the `Scheduler` space, set the language to TypeScript, click **Generate**, then **Download**.

Extract the zip, locate the `starhive` folder under `project/src/io/`, and copy it into `lib/starhive/` in your Next.js project. The generated files contain workspace-specific UUIDs, so you'll repeat this step whenever the schema changes or you switch workspaces.

:::note
At the time of writing, the Starhive TypeScript generator produces output that does not pass strict TypeScript: a missing `Sla.ts` reference, a missing `visitSlaAttribute` implementation in the inline `AttributeVisitor` literal, and a `client.request<T>` call against an `any`-typed field (TS2347). The companion demo repo ships three minimal patches that work around these; see [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/PATCHES.md) for the diffs. Re-apply the same patches whenever you regenerate the schema, until Starhive ships a fix.
:::

## Step 5. Configure the Starhive client

Create `lib/starhiveClient.ts`:

```ts title="lib/starhiveClient.ts"
import { StarhiveClient } from "./starhive/client/StarhiveClient";
import { JSON_DECODERS } from "./starhive/schema/JsonDecoders";

let starhiveClient: StarhiveClient | null = null;

export function getStarhiveClient() {
  if (starhiveClient) return starhiveClient;

  const workspaceId = process.env.STARHIVE_WORKSPACE_ID;
  const apiKey = process.env.STARHIVE_API_TOKEN;

  if (!workspaceId || !apiKey) {
    throw new Error("Missing Starhive configuration (workspaceId or API token)");
  }

  starhiveClient = new StarhiveClient(apiKey, workspaceId, JSON_DECODERS);
  return starhiveClient;
}
```

The function caches the client at module scope so route handlers share a single instance.

Add `.env.local` (or `.env`) at the project root:

```env title=".env.local"
STARHIVE_API_TOKEN=your-api-token
STARHIVE_WORKSPACE_ID=your-workspace-id
```

Generate the API token under **Settings → Personal access tokens**. The workspace ID is the path segment in `https://app.starhive.com/workspace/<workspace-id>/home`.

## Step 6. Load events and resources

Create `app/api/load/route.ts`:

```ts title="app/api/load/route.ts"
import { NextResponse } from 'next/server';
import { getStarhiveClient } from '@/lib/starhiveClient';
import { Events } from '@/lib/starhive/schema/Events';
import { Resources } from '@/lib/starhive/schema/Resources';

function normalizeEvents(events: Events[]) {
  return events.map(ev => ({
    id: ev.getId() || '',
    text: ev.getText(),
    start_date: ev.getStartDate(),
    end_date: ev.getEndDate(),
    resource_id: ev.getResourceId()?.[0] || null,
  }));
}

export async function GET() {
  try {
    const client = getStarhiveClient();
    const [events, resources] = await Promise.all([
      client.search<Events>(Events.TYPE_ID, ""),
      client.search<Resources>(Resources.TYPE_ID, "")
    ]);

    return NextResponse.json({
      events: normalizeEvents(events.result),
      resources: resources.result.map((r) => ({
        key: r.getId(),
        label: r.getLabel(),
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
```

`normalizeEvents` flattens each Starhive object into the shape the React Scheduler expects: `{ id, text, start_date, end_date, resource_id }`. Resources collapse to `{ key, label }`, which is what a timeline view's `y_unit` consumes.

Visit `http://localhost:3000/api/load` after starting the dev server to confirm the JSON shape.

## Step 7. Render Scheduler and load events

Create `app/page.tsx`:

```tsx title="app/page.tsx"
'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactScheduler, {
  type Event,
  type SchedulerViewsProp,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';

type Resource = { key: string; label: string };

export default function Scheduler() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/load')
      .then((response) => response.json())
      .then((data) => {
        setResources(data.resources);
        setEvents(data.events);
      })
      .catch((error) => {
        console.error('Failed to load resources data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const views: SchedulerViewsProp = useMemo(
    () => ({
      timeline: [
        {
          name: "timeline",
          x_unit: "hour",
          x_date: "%H:%i",
          x_step: 1,
          x_start: 8,
          x_size: 13,
          x_length: 13,
          event_dy: 50,
          event_min_dy: 50,
          y_property: "resource_id",
          render: "bar",
          y_unit: resources,
        },
      ],
    }),
    [resources]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        events={events}
        date={new Date("2026-04-01T00:00:00Z")}
        views={views}
        view={"timeline"}
      />
    </div>
  );
}
```

A `loading` flag is preferable to checking `events.length` or `resources.length`: a workspace that legitimately has zero events should still render the empty Scheduler instead of being stuck on the loader.

Run `npm run dev` and the timeline appears with the imported events grouped by resource.

## Step 8. Implement the CRUD endpoints

The Scheduler `dataBridge` calls into three endpoints - POST for create, PUT for update, DELETE for delete - and expects specific response shapes:

| HTTP method | Endpoint                  | Response                          |
| ----------- | ------------------------- | --------------------------------- |
| `GET`       | `/api/load`               | `{ events, resources }`           |
| `POST`      | `/api/event`              | `{ action: "inserted", tid: id }` |
| `PUT`       | `/api/event/{event_id}`   | `{ action: "updated" }`           |
| `DELETE`    | `/api/event/{event_id}`   | `{ action: "deleted" }`           |

Create the POST handler at `app/api/event/route.ts`:

```ts title="app/api/event/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { getStarhiveClient } from '@/lib/starhiveClient';
import { Events } from '@/lib/starhive/schema/Events';

export async function POST(req: NextRequest) {
  try {
    const { text, start_date, end_date, resource_id } = await req.json();
    const client = getStarhiveClient();

    const event = Events.builder()
      .text(text)
      .startDate(new Date(start_date))
      .endDate(new Date(end_date))
      .resourceId([resource_id])
      .build();

    const result = await client.createObject(event);
    return NextResponse.json({ action: 'inserted', tid: result.getId() });
  } catch (error) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
```

And the dynamic PUT/DELETE handlers at `app/api/event/[id]/route.ts`:

```ts title="app/api/event/[id]/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { Events } from "@/lib/starhive/schema/Events";
import { getStarhiveClient } from "@/lib/starhiveClient";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const client = getStarhiveClient();

    const existingEvent = await client.getObject(id, Events.TYPE_ID);
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const updatedEvent = Events.builder()
      .id(id)
      .text(body.text)
      .startDate(new Date(body.start_date))
      .endDate(new Date(body.end_date))
      .resourceId([body.resource_id])
      .build();

    await client.updateObject(updatedEvent);
    return NextResponse.json({ action: 'updated' });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Update failed', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const client = getStarhiveClient();
    await client.deleteObjectsInBulk([id]);

    return NextResponse.json({ action: 'deleted' });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error.message },
      { status: 500 }
    );
  }
}
```

:::note
In Next.js 15+ the `params` argument of dynamic route handlers is a `Promise`. Always type it as `Promise<{...}>` and `await` it before reading the segment values - omitting the `Promise<>` wrapper compiles in some setups but fails strict mode.
:::

## Step 9. Wire the dataBridge

Create a small client-side helper at `services/scheduler.ts`:

```ts title="services/scheduler.ts"
import type { Event } from '@dhtmlx/trial-react-scheduler';

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function createEvent(event: Event) {
  return request('/api/event', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function updateEvent(event: Event) {
  return request(`/api/event/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function deleteEvent(id: string | number) {
  return request(`/api/event/${id}`, {
    method: 'DELETE',
  });
}
```

Then wire the `dataBridge` into the page. Update `app/page.tsx` with the imports and a `data` prop on `<ReactScheduler>`:

```tsx title="app/page.tsx"
import { createEvent, deleteEvent, updateEvent } from '@/services/scheduler';

// inside the Scheduler component:
const dataBridge = useMemo(() => ({
  save: (entity: string, action: string, payload: Event, id: string | number) => {
    if (entity !== "event") return;

    switch (action) {
      case "update":
        return updateEvent(payload);
      case "create":
        return createEvent(payload);
      case "delete":
        return deleteEvent(id);
      default:
        console.warn(`Unknown action: ${action}`);
        return;
    }
  },
}), []);

// pass it to the component:
<ReactScheduler
  events={events}
  data={dataBridge}
  date={new Date("2026-04-01T00:00:00Z")}
  views={views}
  view={"timeline"}
/>
```

## Test it

```bash
npm run dev
```

Open `http://localhost:3000`, drag an event to a new time, edit its text, and delete one. Each change should appear in the Starhive UI under the `Events` type immediately.

## Notes on Starhive integration

- **Server-side credentials only.** `STARHIVE_API_TOKEN` and `STARHIVE_WORKSPACE_ID` are read inside Route Handlers (`getStarhiveClient`); they never reach the browser bundle. Don't move the Starhive client into a Client Component or expose the token via a `NEXT_PUBLIC_*` variable.
- **Schema regeneration.** Whenever you add or rename attributes in Starhive, regenerate the TypeScript schema and replace `lib/starhive/`. Re-apply the patches in [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/PATCHES.md) if `next build` complains about the same upstream issues.
- **No realtime sync.** Unlike the Firebase integration, Starhive doesn't push changes to connected clients. Multiple users editing the same Scheduler will overwrite each other's changes. For multi-user scenarios, add polling on the client - or wire up Starhive webhooks to push invalidation events through SSE / WebSockets and refresh `events` state on remote changes.
- **Dynamic loading for larger datasets.** The `/api/load` route loads every event in the workspace. For production, accept `from` / `to` query parameters in the GET handler, filter on `start_date` / `end_date`, and call `scheduler.setLoadMode("day")` on the client so only the visible range is fetched.
- **Reference attributes carry arrays.** `Events.getResourceId()` returns `string[] | undefined` because Starhive's reference attributes are multi-valued. The demo flattens via `?.[0] || null`. If you allow events to belong to multiple resources, change the timeline view's `y_property` resolution and the normalize / builder calls accordingly.

## Related pages

- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [React Scheduler Overview](integrations/react/overview.md#bindingdata)
- [Server Integration](guides/server-integration.md)
- [React Scheduler and Firebase Integration](integrations/react/firebase-integration.md) - sibling pattern with realtime sync
