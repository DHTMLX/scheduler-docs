---
title: Datenbindung & Zustandsverwaltung im React Scheduler
sidebar_label: Grundlagen
description: "Überblick über die beiden Datenbindungsmodelle im React Scheduler und Basismuster für React-Zustand und Zustand-Manager."
---

# Datenbindung & Zustandsverwaltung im React Scheduler

Der React Scheduler unterstützt zwei Muster der Datenbindung:

1. **React-Zustand als Quelle der Wahrheit** (empfohlen für die meisten React-Apps)
2. **Scheduler als Quelle der Wahrheit** (nützlich für spezialisierte, Hochdurchsatz-Fälle)

Beide Modelle sind gültig. Wählen Sie pro Bildschirm ein Modell und halten Sie es konsistent.

Wenn Sie noch kein einfaches Diagramm gerendert haben, beginnen Sie mit dem [Schneller Einstieg](integrations/react/quick-start.md).

## Datenmodelle

### React-Zustand als Quelle der Wahrheit (empfohlen)

In diesem Modell:

- speichern Sie `events` (und oft `view` / `date`) im React-Zustand oder in einem Zustand-Manager
- übergeben Sie diesen Zustand als Props an `<ReactScheduler />`
- Scheduler ruft `data.save` / `data.batchSave` auf, wenn Benutzer Daten bearbeiten
- Sie aktualisieren den Zustand, und React rendert den Scheduler erneut mit den neuen Props

Verwenden Sie dies, wenn andere React-Komponenten mit Scheduler-Daten synchronisiert bleiben müssen.

### Scheduler als Quelle der Wahrheit

In diesem Modell:

- Scheduler lädt und ändert Daten intern
- Sie geben Bearbeitungen optional an Backend-Endpunkte weiter
- React spiegelt nicht jedes Ereignis-Update im Zustand wider

Verwenden Sie dieses Modell, wenn React nicht jedes einzelne Scheduler-Update sofort widerspiegeln muss.

## React-Zustand als Quelle der Wahrheit {#reactstateasthesourceoftruth}

### Minimalbeispiel

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import { seedEvents } from "./seed/data";

export default function ReactStateScheduler() {
  const [events, setEvents] = useState<Event[]>(seedEvents);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: Event, id: string | number) => {
        if (entity !== "event") return;

        if (action === "create") {
          setEvents((prev) => [...prev, item]);
          return;
        }

        if (action === "update") {
          setEvents((prev) => prev.map((e) => (e.id === id ? item : e)));
          return;
        }

        if (action === "delete") {
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler events={events} data={data} />
    </div>
  );
}
```

Dieses Muster macht React zum zentralen Eigentümer der Ereignisdaten.

## Behandlung von Aktualisierungen mit `data.save` {#handlingchangeswithdatasave}

`data.save` wird bei jeder Benutzeränderung aufgerufen:

```ts
(entity: string, action: string, item: any, id: string | number) => void | Promise<any>
```

Für Scheduler-Ereignis-CRUD:

- `entity` ist `"event"`
- `action` ist `"create" | "update" | "delete"`
- `item` ist das erstellte/aktualisierte/gelöschte Ereignis
- `id` ist die betroffene Ereignis-ID

### Backend-orientiertes Beispiel

```tsx
const data = {
  save: async (entity: string, action: string, item: any, id: string | number) => {
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
      return;
    }

    if (action === "delete") {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
    }
  },
};
```

Wenn Ihr Backend temporäre IDs bei der Erstellung ersetzt, geben Sie `{ id: realId }` zurück, damit Scheduler Client- und Server-IDs abgleichen kann.

## Massenaktualisierungen mit `data.batchSave`

`data.batchSave` ist sinnvoll, wenn viele Änderungen in kurzer Zeit auftreten (zum Beispiel bei dichten Bearbeitungssitzungen).

Verwenden Sie es, wenn Sie möchten:

- Anfragenanzahl reduzieren, indem gruppierte Änderungen gesendet werden
- Aktualisierungen in einer einzigen Reduzer-/Store-Transaktion verarbeiten

```tsx
<ReactScheduler
  events={events}
  data={{
    batchSave: async (changes) => {
      await fetch("/api/events/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
    },
  }}
/>
```

Verwenden Sie `save` für einfache Änderungslogik pro Änderung und `batchSave` für gruppierte Synchronisierung.

## Laden von Daten in den React-Zustand

Im vom React getriebenen Modell bezieht Scheduler Daten aus dem React-Zustand. Häufige Quellen:

- lokaler Komponenten-Zustand
- globaler Zustand-Manager (Redux Toolkit, Zustand, MobX, XState, Jotai, Valtio)
- API-Aufrufe

### Lokaler Zustandsquelle

```tsx
import { useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate } from "./seed/data";

export default function LocalStateExample() {
  const [events] = useState<Event[]>(seedEvents);

  return (
    <ReactScheduler
      events={events}
      view={seedView}
      date={seedDate}
    />
  );
}
```

### Zustand-Manager-Quelle

Jede Bibliothek folgt dem gleichen Ablauf:

- Selektor/Hook liest den Zustand
- Props füttern den Scheduler
- `data.save` löst Aktionen/Store-Mutationen aus

```tsx
const events = useSchedulerStore((s) => s.events);
const onSave = useSchedulerStore((s) => s.handleSave);

<ReactScheduler events={events} data={{ save: onSave }} />;
```

Zustand-Manager-Tutorials:

- [Verwendung des React Scheduler mit Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Verwendung des React Scheduler mit Zustand](integrations/react/state/zustand.md)
- [Verwendung des React Scheduler mit MobX](integrations/react/state/mobx.md)
- [Verwendung des React Scheduler mit XState](integrations/react/state/xstate.md)
- [Verwendung des React Scheduler mit Jotai](integrations/react/state/jotai.md)
- [Verwendung des React Scheduler mit Valtio](integrations/react/state/valtio.md)

### API-Ladequelle

```tsx
import { useEffect, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function SchedulerWithApi() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    let disposed = false;

    (async () => {
      const response = await fetch("/api/events");
      const payload = await response.json();
      if (!disposed) setEvents(payload.events || []);
    })();

    return () => {
      disposed = true;
    };
  }, []);

  if (!events) return <div>Loading Scheduler...</div>;

  return <ReactScheduler events={events} />;
}
```

## Scheduler als Quelle der Wahrheit {#schedulerasthesourceoftruth}

In diesem Modus rendert React die Komponente, hält jedoch keinen kanonischen Ereigniszustand.

### URL-Transportbeispiel

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Callback-Transportbeispiel

```tsx
<ReactScheduler
  data={{
    load: async () => {
      const response = await fetch("/api/scheduler/load");
      return response.json();
    },
    save: async (entity, action, item, id) => {
      await fetch("/api/scheduler/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity, action, item, id }),
      });
    },
  }}
/>
```

Verwenden Sie diesen Ansatz, wenn Scheduler den primären Laufzeitspeicher bleiben kann und React nicht jedes einzelne Update rendern muss.

## Das richtige Modell auswählen

Verwenden Sie das **von React getriebene** Modell, wenn:

- mehrere React-Komponenten von Scheduler-Daten abhängen
- Sie eine vorhersehbare globale Zustandsintegration benötigen
- Sie eine klare Undo/Redo-Funktion im App-Zustand wünschen

Verwenden Sie das **vom Scheduler getriebene** Modell, wenn:

- React größtenteils als Shell/Layout fungiert
- Sie bevorzugen Scheduler-gesteuerte Laufzeitmutationen
- der Server-Transport der primäre Synchronisationsmechanismus ist

## Was kommt als Nächstes

- [Überblick über React Scheduler](integrations/react/overview.md#bindingdata)
- [React Scheduler Konfiguration](integrations/react/configuration-props.md)
- [Server-Integration](guides/server-integration.md)