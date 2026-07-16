---
title: React Scheduler und Starhive-Integration
sidebar_label: Starhive Schnellstart
description: "DHTMLX React Scheduler mit einem Starhive NoSQL-Backend über Next.js API-Routen verbinden."
---

# React Scheduler und Starhive-Integration

Diese Anleitung verbindet **React Scheduler** mit einem **Starhive** NoSQL-Backend über Next.js Route-Handler. Starhive bietet ein typisiertes Schema und einen generierten TypeScript-Client, sodass die API-Schicht minimal bleibt: ein Endpunkt lädt Ereignisse und Ressourcen, ein anderer erledigt Create / Update / Delete.

Sie werden Folgendes erstellen:

- eine Next.js-Seite, die den Scheduler in einer Client-Komponente hostet
- `/api/load` – lädt beim ersten Rendern Ereignisse und Ressourcen von Starhive
- `/api/event` (POST) und `/api/event/[id]` (PUT, DELETE) – Schreibpfade, die vom Scheduler `dataBridge` verwendet werden

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/react-scheduler-starhive-demo).
:::

## Voraussetzungen

- Grundlagen zu Next.js + React + TypeScript
- Node.js 18+
- Ein [Starhive](https://starhive.com/) Konto (die 30-tägige Testversion reicht aus)

## Schritt 1. Projekt erstellen

```bash
npx create-next-app@latest react-scheduler-starhive-demo
cd react-scheduler-starhive-demo
```

Installieren Sie den React Scheduler wie im [Installationsleitfaden für den React Scheduler](integrations/react/installation.md) beschrieben. Zur Evaluation:

```bash
npm install @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in Befehlen und Imports.

Außerdem benötigen Sie `axios` – es ist eine Peer-Abhängigkeit des generierten Starhive TypeScript-Clients. 

```bash
npm install axios
```

## Schritt 2. Starhive Space einrichten

Nach dem Anmelden klicken Sie rechts oben auf **+ Create** und benennen den Space mit `Scheduler`.

Im Space erstellen Sie zwei Typen: `Resources` und `Events`. Resources halten die Zeilen der Timeline (Teams, Personen, Räume usw.). Events beziehen sich jeweils auf eine Resource.

Fügen Sie die folgenden Attribute über die Schaltfläche **+ Attribute** hinzu. Starhive erzeugt automatisch die `id` für jeden Eintrag, daher müssen Sie sie nicht deklarieren.

**Resources type**

| Feld   | Typ |
| ------- | ---- |
| `label` | Text |

**Events type**

| Feld         | Typ                       |
| ------------- | -------------------------- |
| `text`        | Text                       |
| `start_date`  | Datum & Uhrzeit            |
| `end_date`    | Datum & Uhrzeit            |
| `resource_id` | Referenz → Resources         |

## Schritt 3. Beispieldaten importieren

Erstellen Sie `scheduler_resources.csv`:

```csv
label
"Frontend Team"
"Backend Team"
"QA Team"
"DevOps"
"Security Team"
```

Und `scheduler_events.csv`:

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

Im Starhive UI öffnen Sie den Typ und klicken Sie für jeden Datei den CSV-Import.  

## Schritt 4. Schema generieren und kopieren

Gehen Sie zu **Settings → API Connectors**. Wählen Sie den Space `Scheduler`, setzen Sie die Sprache auf TypeScript, klicken Sie auf **Generate**, dann **Download**.

Entpacken Sie das Archiv, lokalisieren Sie den Ordner `starhive` unter `project/src/io/` und kopieren Sie ihn nach `lib/starhive/` in Ihr Next.js-Projekt. Die generierten Dateien enthalten arbeitsbereichsspezifische UUIDs, daher führen Sie diesen Schritt jedes Mal erneut aus, wenn sich das Schema ändert oder Sie zwischen Arbeitsbereichen wechseln.

:::note
Zum Zeitpunkt des Verfassens erzeugt der Starhive TypeScript-Generator eine Ausgabe, die kein strenges TypeScript erfüllt: ein fehlender `Sla.ts`-Verweis, eine fehlende Implementierung von `visitSlaAttribute` im Inline-`AttributeVisitor`-Literal und ein `client.request<T>`-Aufruf gegen ein Feld vom Typ `any` (TS2347). Das Begleit-Demo-Repo enthält drei minimale Patches, die diese Probleme umgehen; siehe [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) für die Diffs. Wenden Sie dieselben Patches erneut an, wenn Sie das Schema regenerieren, bis Starhive einen Fix liefert.
:::

## Schritt 5. Starhive-Client konfigurieren

Erstellen Sie `lib/starhiveClient.ts`:

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

Die Funktion cacht den Client im Modul-Scope, sodass Route-Handler eine einzige Instanz teilen.

Fügen Sie `.env.local` (oder `.env`) im Projektstamm hinzu:

```env title=".env.local"
STARHIVE_API_TOKEN=your-api-token
STARHIVE_WORKSPACE_ID=your-workspace-id
```

Generieren Sie den API-Token unter **Settings → Personal access tokens**. Die Workspace-ID ist der Pfadabschnitt in `https://app.starhive.com/workspace/<workspace-id>/home`.

## Schritt 6. Ereignisse und Ressourcen laden

Erstellen Sie `app/api/load/route.ts`:

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

`normalizeEvents` wandelt jedes Starhive-Objekt in die Form um, die der React Scheduler erwartet: `{ id, text, start_date, end_date, resource_id }`. Ressourcen werden zu `{ key, label }` zusammengefasst, was von der Timeline-Ansicht als `y_unit` konsumiert wird.

Rufen Sie nach dem Starten des Entwicklungsservers die URL `http://localhost:3000/api/load` auf, um die JSON-Form zu überprüfen.

## Schritt 7. Scheduler rendern und Ereignisse laden

Erstellen Sie `app/page.tsx`:

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

Ein `loading`-Flag ist vorzuziehen gegenüber dem Prüfen von `events.length` oder `resources.length`: Ein Workspace, der tatsächlich zero Events hat, sollte dennoch den leeren Scheduler rendern statt in der Ladeanzeige hängen zu bleiben.

Führen Sie `npm run dev` aus – die Timeline erscheint mit den importierten Ereignissen, gruppiert nach Ressource.

## Schritt 8. Die CRUD-Endpunkte implementieren

Die Scheduler-`dataBridge` ruft drei Endpunkte auf – POST für Create, PUT für Update, DELETE für Delete – und erwartet bestimmte Antwortformen:

| HTTP-Methode | Endpoint                  | Antwort                          |
| ----------- | ------------------------- | --------------------------------- |
| `GET`       | `/api/load`               | `{ events, resources }`           |
| `POST`      | `/api/event`              | `{ action: "inserted", tid: id }` |
| `PUT`       | `/api/event/{event_id}`   | `{ action: "updated" }`           |
| `DELETE`    | `/api/event/{event_id}`   | `{ action: "deleted" }`           |

Erstellen Sie den POST-Handler unter `app/api/event/route.ts`:

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

Und die dynamischen PUT/DELETE-Handler unter `app/api/event/[id]/route.ts`:

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
In Next.js 15+ ist das `params`-Argument dynamischer Routen-Handler ein `Promise`. Typisieren Sie es immer als `Promise<{...}>` und warten Sie darauf, bevor Sie die Segmentwerte lesen – das Weglassen der `Promise<>`-Umhüllung kompiliert in einigen Setups, schlägt aber im Strict-Modus fehlt.
:::

## Schritt 9. Den dataBridge anschließen

Erstellen Sie eine kleine client-seitige Hilfsfunktion unter `services/scheduler.ts`:

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

Schließen Sie den `dataBridge` an die Seite an. Aktualisieren Sie `app/page.tsx` mit den Imports und einer `data`-Eigenschaft auf `<ReactScheduler>`:

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

// an ReactScheduler übergeben:
<ReactScheduler
  events={events}
  data={dataBridge}
  date={new Date("2026-04-01T00:00:00Z")}
  views={views}
  view={"timeline"}
/>
```

## Testen

```bash
npm run dev
```

Öffnen Sie `http://localhost:3000`, ziehen Sie ein Ereignis in eine neue Zeitspanne, bearbeiten Sie dessen Text und löschen Sie eines. Jede Änderung sollte sofort in der Starhive-Oberfläche unter dem Typ `Events` erscheinen.

## Hinweise zur Starhive-Integration

- **Nur serverseitige Anmeldeinformationen.** `STARHIVE_API_TOKEN` und `STARHIVE_WORKSPACE_ID` werden in Route-Handlern (`getStarhiveClient`) gelesen; sie gelangen nie in das Browser-Bundle. Verschieben Sie den Starhive-Client nicht in eine Client-Komponente oder geben Sie das Token nicht über eine `NEXT_PUBLIC_*`-Variable weiter.
- **Schema-Neugenerierung.** Wann immer Sie Attribute in Starhive hinzufügen oder umbenennen, regenerieren Sie das TypeScript-Schema und ersetzen Sie `lib/starhive/`. Wenden Sie ggf. die Patches in [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) erneut an, falls `next build` dieselben upstream-Probleme meldet.
- **Kein Echtzeit-Sync.** Im Gegensatz zur Firebase-Integration sendet Starhive keine Änderungen sofort an verbundene Clients. Mehrere Benutzer, die denselben Scheduler bearbeiten, überschreiben gegenseitig ihre Änderungen. Für Mehrbenutzer-Szenarien fügen Sie auf dem Client Polling hinzu – oder verbinden Sie Starhive-Webhooks mit SSE/WebSockets, um Invalidation-Ereignisse auszulösen und den `events`-Zustand bei entfernten Änderungen zu aktualisieren.
- **Dynamisches Laden großer Datensätze.** Die `/api/load`-Route lädt alle Ereignisse im Workspace. Für die Produktion akzeptieren Sie `from` / `to`-Abfrageparameter im GET-Handler, filtern Sie nach `start_date` / `end_date` und rufen Sie `scheduler.setLoadMode("day")` auf dem Client auf, damit nur der sichtbare Bereich abgerufen wird.
- **Referenzattribute tragen Arrays.** `Events.getResourceId()` gibt `string[] | undefined` zurück, da Starhives Referenzattribute mehrfach vorkommen können. Das Demo-Beispiel flatten dies über `?.[0] || null`. Wenn Sie Ereignisse mehreren Ressourcen zuordnen lassen, passen Sie die Auflösung des Timeline-View-`y_property` sowie die Normalize-/Builder-Aufrufe entsprechend an.

## Verwandte Seiten

- [Datenbindung & Grundlagen der Zustandsverwaltung](integrations/react/state/state-management-basics.md)
- [React Scheduler Überblick](integrations/react/overview.md#bindingdata)
- [Server-Integration](guides/server-integration.md)
- [React Scheduler und Firebase-Integration] (integrations/react/firebase-integration.md) – sibling pattern with realtime sync