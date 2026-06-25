--- 
title: React Scheduler – Zustand Tutorial
sidebar_label: Zustand
description: Lernen Sie, wie Sie den DHTMLX React Scheduler mit Zustand integrieren, einschließlich Event-CRUD, View/Date/Config-Synchronisierung und Undo/Redo.
---

# React Scheduler – Zustand Tutorial

Dieses Tutorial zeigt, wie Sie **DHTMLX React Scheduler** mit einem **Zustand**-Store verbinden. Sie speichern Ereignisse und UI-State (view/date/config) in Zustand, leiten Scheduler-Bearbeitungen über `data.save` weiter und fügen **Undo/Redo** mittels einer snapshot-basierten Historie hinzu.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/react-scheduler-zustand-starter).
:::

## Voraussetzungen

- Node.js (LTS empfohlen)
- Grundlagen von React + TypeScript
- Vertrautheit mit Zustand-Hooks und Selektoren. Falls Sie eine Auffrischung benötigen, siehe die Zustand-Dokumentation: https://zustand.docs.pmnd.rs/

## Schnellsetup - Projekt erstellen

Erstellen Sie ein Vite + React + TS-Projekt:

~~~bash
npm create vite@latest scheduler-zustand-demo -- --template react-ts
cd scheduler-zustand-demo
npm install
~~~

Zustand installieren:

~~~bash
npm install zustand
~~~

Material UI installieren (wird für die Demo-Toolbar verwendet):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installation des React Scheduler

Installieren Sie React Scheduler wie im [Installationsleitfaden für React Scheduler](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Imports.

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

:::note
Um Scheduler die ganze Seite auszufüllen, entfernen Sie die Standardstile aus `src/App.css` und fügen Sie Folgendes hinzu:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}
~~~
:::

## Gemeinsame Typen definieren

Erstellen Sie `src/types.ts`. Diese Typen werden store- und komponentenübergreifend verwendet:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler kann zur Laufzeit zusätzliche Felder anhängen. Die Demo bleibt permissive.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
}
~~~

- `SchedulerEvent` verwendet eine Index-Signatur, damit Scheduler zur Laufzeit zusätzliche Felder anhängen kann.
- `SchedulerSnapshot` erfasst die für Undo/redo benötigten Daten (Events).

## Beispiel-Daten einrichten

Erstellen Sie `src/seed/data.ts` mit einigen Ereignissen und initialem UI-Zustand. Beachten Sie, dass `currentDate` als **Nummer** (Zeitstempel) gespeichert wird, damit der Store-Status serialisierbar bleibt.

~~~ts
export const seedEvents = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView = "week";
~~~

:::note
Die begleitende Demo enthält zusätzliche Ereignisse für eine reichhaltigere visuelle Darstellung.
:::

## Zustand-Store erstellen

Erstellen Sie `src/store.ts`. Dieser Store hält:

- `events` (Scheduler-Daten)
- `currentDate` (als Zeitstempel)
- `view` (`day | week | month`)
- `config` (Scheduler-Konfiguration)
- `past` / `future` (Snapshot-Arrays für Undo/Redo)

Undo/redo ist direkt in den Store integriert und verwendet Snapshots. Bevor jede datenverändernde Aktion ausgeführt wird, speichert `pushHistory` einen Snapshot der aktuellen Ereignisse. Die `undo`- und `redo`-Aktionen tauschen den aktuellen Zustand gegen einen Snapshot aus der Historie aus.

~~~ts
import { create } from "zustand";

import { seedDate, seedEvents, seedView } from "./seed/data";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

export interface SchedulerStoreState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;

  setCurrentDate: (date: number) => void;
  setView: (view: SchedulerView) => void;

  createEvent: (event: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>) => SchedulerEvent;
  updateEvent: (event: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => void;
  deleteEvent: (id: SchedulerEvent["id"]) => void;

  undo: () => void;
  redo: () => void;
}

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (events: SchedulerEvent[]): SchedulerSnapshot => ({
  events: deepCopy(events),
});

// Simuliere das Empfangen einer ID von einem Backend.
const generateId = () => `id_${Date.now().toString()}`;

export const useSchedulerStore = create<SchedulerStoreState>((set, get) => {
  const pushHistory = () => {
    const { events, past, maxHistory } = get();
    const snapshot = createSnapshot(events);

    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  };

  return {
    events: seedEvents as unknown as SchedulerEvent[],
    currentDate: seedDate,
    view: seedView as SchedulerView,
    config: {},

    past: [],
    future: [],
    maxHistory: 50,

    setCurrentDate: (date) => set({ currentDate: date })),
    setView: (view) => set({ view }),

    createEvent: (event) => {
      pushHistory();

      const id = event.id != null ? event.id : generateId();
      const newEvent: SchedulerEvent = { ...event, id } as SchedulerEvent;

      set({ events: [...get().events, newEvent] });
      return newEvent;
    },

    updateEvent: (event) => {
      const events = get().events;
      const index = events.findIndex((e) => String(e.id) === String(event.id));
      if (index === -1) return;

      pushHistory();
      set({
        events: [...events.slice(0, index), { ...events[index], ...event }, ...events.slice(index + 1)],
      });
    },

    deleteEvent: (id) => {
      const events = get().events;
      const exists = events.some((e) => String(e.id) === String(id));
      if (!exists) return;

      pushHistory();
      set({ events: events.filter((e) => String(e.id) !== String(id)) });
    },

    undo: () => {
      const { past, future, events } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set({
        events: previous.events,
        past: past.slice(0, -1),
        future: [createSnapshot(events), ...future],
      });
    },

    redo: () => {
      const { past, future, events } = get();
      if (future.length === 0) return;

      const next = future[0];
      set({
        events: next.events,
        past: [...past, createSnapshot(events)],
        future: future.slice(1),
      });
    },
  };
});
~~~

## Aufbau der Control-Toolbar-Komponente

Erstellen Sie `src/components/Toolbar.tsx`. Dies ist eine kleine MUI-Toolbar, die Folgendes ermöglicht:

- Ansicht wechseln (day/week/month)
- vorherige/Heute/nächste navigieren
- Undo/Redo

~~~tsx
import { ButtonGroup, Button, Typography, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  setView,
}: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map((l) => (
          <Button key={l} variant={currentView === l ? "contained" : "outlined"} onClick={() => setView(l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={!canUndo}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={!canRedo}>
            <RedoIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {new Date(currentDate)?.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>
          &nbsp;&lt;&nbsp;
        </Button>
        <Button onClick={() => onNavigate?.("today")}>
          Today
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Scheduler mit Zustand verbinden

Erstellen Sie `src/components/Scheduler.tsx`. Diese Komponente:

- liest `events/view/currentDate/config` aus dem ZustandStore mittels Selektoren
- bietet einen `data.save` Callback, der Store-Aktionen aufruft
- gibt erstellte/aktualisierte Entitäten aus `save` zurück, damit Scheduler seine interne Buchführung synchron halten kann
- verbindet Undo/Redo
- versteckt die integrierte Navbar und nutzt stattdessen die benutzerdefinierte Toolbar

~~~tsx
import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { useSchedulerStore } from "../store";
import type { SchedulerEvent, SchedulerView } from "../types";

export default function DemoZustandScheduler() {
  const events = useSchedulerStore((s) => s.events);
  const view = useSchedulerStore((s) => s.view);
  const currentDate = useSchedulerStore((s) => s.currentDate);
  const config = useSchedulerStore((s) => s.config);

  const setView = useSchedulerStore((s) => s.setView);
  const setCurrentDate = useSchedulerStore((s) => s.setCurrentDate);
  const createEvent = useSchedulerStore((s) => s.createEvent);
  const updateEvent = useSchedulerStore((s) => s.updateEvent);
  const deleteEvent = useSchedulerStore((s) => s.deleteEvent);
  const undo = useSchedulerStore((s) => s.undo);
  const redo = useSchedulerStore((s) => s.redo);

  const canUndo = useSchedulerStore((s) => s.past.length > 0);
  const canRedo = useSchedulerStore((s) => s.future.length > 0);

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      setCurrentDate(Date.now());
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(currentDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    setCurrentDate(date.getTime());
  }, [currentDate, view, setCurrentDate]);

  // Scheduler <-> Zustand Datenbrücke (Mappt Scheduler CRUD-Ereignisse auf Store-Aktionen)
  const dataBridge = useMemo(() => ({
    save: (entity: string, action: string, payload: unknown, id: unknown) => {
      if (entity !== "event") return;

      switch (action) {
        case "update": {
          const eventData = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
          const eventId = (eventData as Record<string, unknown>).id ?? id;
          if (eventId == null) {
            console.warn("Update called without an id", { payload, id });
            return;
          }
          return updateEvent({ ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">);
        }
        case "create":
          return createEvent(payload as Omit<SchedulerEvent, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return deleteEvent(deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [updateEvent, createEvent, deleteEvent]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => setView(nextView), [setView]);

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

Beachten Sie, dass im Gegensatz zu Redux Toolkit Zustand keinen `Provider`-Wrapper benötigt. Der Hook `useSchedulerStore` liest direkt aus dem Store.

## Scheduler in der App rendern

Aktualisieren Sie `src/App.tsx`:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Zusammenfassung

Sie haben nun den React Scheduler vollständig über Zustand getrieben:

- Zustand verwaltet `events`, `view`, `currentDate` und `config` als einzige Quelle der Wahrheit
- Benutzereingaben werden über `data.save` → Store-Aktionen geroutet
- Die UI bleibt synchron, weil Scheduler aktualisierte `events` als Props erhält
- Undo/Redo ist über eine snapshot-basierte Historie mit einem begrenzten History-Stack implementiert

## Was kommt als Nächstes

- Überprüfen Sie die Konzepte hinter diesem Beispiel in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Erkunden Sie Scheduler-Konfigurations- und Template-Optionen in [React Scheduler Überblick](integrations/react/overview.md)
- Persistenz hinzufügen (Ereignisse von einer API laden/speichern) indem Sie eine Zustand-Aktion verwenden und den Store aktualisieren
- Dasselbe Muster mit anderen State-Management-Lösungen weiter erforschen:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)