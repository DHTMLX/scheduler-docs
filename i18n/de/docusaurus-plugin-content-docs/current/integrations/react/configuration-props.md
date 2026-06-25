---
title: Verwendung der DHTMLX Scheduler-Eigenschaften in ReactScheduler
sidebar_label: Konfiguration
description: "Vollständige Referenz der Wrapper-Props, die auf Scheduler-Konfiguration, Vorlagen, Ereignisse und Daten-Callbacks abgebildet sind."
---

# Verwendung der DHTMLX Scheduler-Eigenschaften in ReactScheduler

Diese Seite beschreibt die von **React Scheduler** akzeptierten Props und wie sie auf die APIs von DHTMLX Scheduler abgebildet werden.

## Verfügbare Props

| Eigenschaft | Typ | Beschreibung |
|---|---|---|
| `events` | `Event[]` | Zu rendernde Scheduler-Ereignisse. |
| `view` | `"day" \| "week" \| "month" \| "year" \| ...` | Aktive Scheduler-Ansicht. |
| `date` | `Date` | Aktives Datum, das verwendet wird, um die ausgewählte Ansicht zu rendern. |
| `templates` | `SchedulerTemplates` | Ordnet Scheduler-Vorlagen zu (z. B. Ereignis-Stil/ Text-Darstellung). |
| `config` | `SchedulerConfig` | Ordnet Scheduler-Konfigurationsoptionen zu. |
| `xy` | `Record<string, number>` | UI-Größeneinstellungen (z. B. Ausblenden der eingebauten Navigation mit `nav_height: 0`). |
| `data` | `{ load?: string \| (() => Promise<any>); save?: string \| SaveHandler; batchSave?: BatchSaveHandler }` | Datenlade- und Änderungs-Callback/URLs. |
| `customLightbox` | `ReactElement \| null` | Ersetzt die integrierte Lightbox durch Ihre React-Komponente. |
| `modals` | `SchedulerModals` | Überschreibt integrierte Bestätigungsdialoge (z. B. Bestätigung der Ereignislöschung). |
| `filter` | `(event: Event) => boolean` | Filtert in Scheduler angezeigte Ereignisse. |
| `on<EventName>` Props | `(...args) => any` | Event-Handler, die den Scheduler-Ereignissen zugeordnet sind (`onViewChange`, `onBeforeLightbox`, etc.). |

## Basisbeispiel

```tsx
import ReactScheduler, {
  type Event,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2025-12-08T09:00:00Z"),
    end_date: new Date("2025-12-08T10:00:00Z"),
  },
];

const templates: SchedulerTemplates = {
  event_class: (_start, _end, event) => event.classname || "",
};

const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22,
  hour_size_px: 60,
};

export default function Demo() {
  return (
    <ReactScheduler
      events={events}
      view="week"
      date={new Date("2025-12-08T00:00:00Z")}
      templates={templates}
      config={config}
    />
  );
}
```

## Data-Prop (`load`, `save`, `batchSave`)

Verwenden Sie die `data`-Prop, um Scheduler mit Ihrem Backend oder mit dem von React verwalteten Zustand zu verbinden.

### Verwendung von Backend-URLs

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Verwendung von Callback-Handlern

```tsx
<ReactScheduler
  data={{
    save: async (entity, action, item, id) => {
      if (entity !== "event") return;

      if (action === "create") {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        const created = await response.json();
        return { id: created.id };
      }

      if (action === "update") {
        await fetch(`/api/events/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }

      if (action === "delete") {
        await fetch(`/api/events/${id}`, { method: "DELETE" });
      }
    },
  }}
/>
```

## Mapping von Vorlagen und Konfiguration

`templates` ordnet Scheduler-Template-Funktionen zu, während `config` Scheduler-Konfigurationsoptionen zuordnet.

```tsx
<ReactScheduler
  templates={{
    event_class: (_start, _end, event) =>
      event.classname === "important" ? "event-important" : "",
  }}
  config={{
    first_hour: 7,
    last_hour: 21,
    time_step: 15,
  }}
/>
```

## Event-Eigenschaften

Sie können Scheduler-Ereignisse als React-Props übergeben.

```tsx
<ReactScheduler
  onViewChange={(mode, date) => {
    console.log("View changed:", mode, date);
  }}
  onBeforeLightbox={(eventId) => {
    console.log("Opening editor for", eventId);
    return true;
  }}
/>
```

Für die vollständige Liste der unterstützten Ereignisse und Callbacks siehe:

- [Scheduler events overview](api/overview/events_overview.md)
- [Scheduler methods overview](api/overview/methods_overview.md)
- [Scheduler properties overview](api/overview/properties_overview.md)

## `customLightbox` und `modals`

Verwenden Sie `customLightbox`, wenn Sie den eingebauten Ereignis-Editor durch Ihre eigene React-Komponente ersetzen möchten.
Verwenden Sie `modals`, wenn Sie benutzerdefinierte Bestätigungsdialoge wünschen.

```tsx
<ReactScheduler
  customLightbox={<MyLightbox />}
  modals={{
    onBeforeEventDelete: ({ event, callback }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback();
      }
    },
  }}
/>
```

## Ereignisse filtern

```tsx
<ReactScheduler
  events={events}
  filter={(event) => event.text.toLowerCase().includes(search.toLowerCase())}
}
/>
```

## Direkter API-Zugriff über `ref`

Wenn ein Anwendungsfall nicht durch Props abgedeckt ist, verwenden Sie ein `ref`, um die zugrunde liegende Scheduler-Instanz abzurufen.

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export default function DirectApiDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log(scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={[]} />;
}
```

## Verwandte Seiten

- [React Scheduler Overview](integrations/react/overview.md)
- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [Quick Start with React Scheduler](integrations/react/quick-start.md)