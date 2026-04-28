---
title: React Scheduler – Redux Toolkit Tutorial
sidebar_label: Redux Toolkit
description: Erfahren Sie, wie Sie den DHTMLX React Scheduler mit Redux Toolkit integrieren, einschließlich Ereignis-CRUD, Synchronisierung von Ansicht/Datum und Undo/Redo.
---

# React Scheduler – Redux Toolkit Tutorial

Dieses Tutorial zeigt, wie der **DHTMLX React Scheduler** an einen **Redux Toolkit** Store angebunden wird. Sie speichern Ereignisse und UI-Zustand (view/date/config) in Redux, routen Scheduler-Bearbeitungen über `data.save`, und fügen **Undo/Redo** mit snapshot-basiertem Verlauf sowie einen **Read-only**-Schalter hinzu.

:::note
Die vollständige Quelldatei ist [auf GitHub verfügbar](https://github.com/DHTMLX/react-scheduler-redux-starter).
:::

## Voraussetzungen

- Node.js (LTS-Version empfohlen)
- Grundkenntnisse in React + TypeScript
- Grundlegende Redux-Konstrukte (Aktionen, Reducer, Store). Falls Sie Auffrischung benötigen, siehe die Redux-Dokumentation: https://redux.js.org/

## Schnellstart – Projekt erstellen

Erstellen Sie ein Vite + React + TS-Projekt:

~~~bash
npm create vite@latest scheduler-redux-demo -- --template react-ts
cd scheduler-redux-demo
npm install
~~~

Installieren Sie Redux Toolkit + React Redux:

~~~bash
npm install @reduxjs/toolkit react-redux
~~~

Installieren Sie Material UI (verwendet im Demo-Toolbar):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installation des React Scheduler

Installieren Sie React Scheduler wie im [React Scheduler Installationsleitfaden](integrations/react/installation.md).

In diesem Tutorial verwenden wir das Evaluationspaket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Imports.

Starten Sie den Dev-Server:

~~~bash
npm run dev
~~~

:::note
Damit Scheduler die komplette Seite einnimmt, entfernen Sie die Standard-Stile aus `src/App.css` und fügen Sie Folgendes hinzu:

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

## Redux-Store konfigurieren

Erstellen Sie `src/redux/store.ts`. Dieser verbindet den `scheduler`-Reducer mit dem Redux-Store:

~~~ts
import { configureStore } from "@reduxjs/toolkit";
import schedulerReducer from "./schedulerSlice";

export const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
~~~

## Gemeinsame Typen definieren

Erstellen Sie `src/redux/types.ts`. Diese Typen werden in Slice, Aktionen und Komponenten gemeinsam genutzt:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler kann zusätzliche Felder anfügen (z. B. benutzerdefinierte Props). Demo bleibt permissiv.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent` verwendet eine Index-Signatur, damit Scheduler zur Laufzeit zusätzliche Felder anhängen kann.
- `SchedulerSnapshot` erfasst die für Undo/Redo benötigten Daten (Ereignisse + config).

## Beispieldaten einrichten

Erstellen Sie `src/seed/data.ts` mit einigen Ereignissen und initialem UI-Zustand. Beachten Sie, dass `currentDate` als **Zahl** (Zeitstempel) gespeichert wird, damit der Redux-Status serialisierbar bleibt.

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
Die Begleit-Demo enthält zusätzliche Ereignisse für eine reichhaltigere visuelle Darstellung.
:::

## Scheduler-Aktionen definieren (create/update/delete)

Scheduler-Bearbeitungen werden durch Redux-Aktionen gesteuert. Erstellen Sie `src/redux/actions.ts`.

Die `createEvent`-Aktion verwendet eine "prepare"-Callback-Funktion, damit eine stabile ID generiert werden kann (Simulation einer backend-generierten ID). Wir fügen außerdem einen kleinen Hilfs-Helper (`dispatchAction`) hinzu, der die dispatchte Payload konsistent zurückgibt – das ist nützlich, weil Scheduler's `data.save` das erzeugte/aktualisierte Objekt zurückgeben kann.

~~~ts
import { createAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import type { SchedulerEvent } from "./types";

// Simuliere den Empfang einer ID aus dem Backend.
const generateId = () => `id_${Date.now().toString()}`;

export const createEvent = createAction(
  "schedulerDomain/createEvent",
  (eventData: Omit<Partial<SchedulerEvent>, "id">) => {
    const newEvent: SchedulerEvent = {
      ...(eventData as Omit<SchedulerEvent, "id">),
      id: generateId(),
    };
    return { payload: newEvent };
  }
);

export const deleteEvent = createAction(
  "schedulerDomain/deleteEvent",
  (id: SchedulerEvent["id"]) => ({ payload: id })
);

export const updateEvent = createAction(
  "schedulerDomain/updateEvent",
  (eventData: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => ({ payload: eventData })
);

// Hilfsfunktion, um eine Aktion zu dispatchen und konsistent deren Payload zurückzugeben
export function dispatchAction<Arg, Payload>(
  dispatch: Dispatch,
  actionCreator: (arg: Arg) => { type: string; payload: Payload },
  arg: Arg
): Payload {
  return dispatch(actionCreator(arg)).payload;
}
~~~

## Die Redux-Slice erstellen

Erstellen Sie nun `src/redux/schedulerSlice.ts`. Dieser Slice speichert:

- `events` (Scheduler-Daten)
- `currentDate` (als Zeitstempel)
- `view` (`day | week | month`)
- `config` (Scheduler-Konfiguration, einschließlich `readonly`)
- `past` / `future` (Snapshot-Arrays für Undo/Redo)

Undo/Redo ist direkt in den Slice integriert, mithilfe von Snapshots. Vor jeder datenverändernden Aktion speichert `pushHistory` einen Snapshot der aktuellen Ereignisse und der Konfiguration. Die Reducer `undo` und `redo` tauschen den aktuellen Zustand gegen einen Snapshot aus der Historie aus.

~~~ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { seedEvents, seedDate, seedView } from "../seed/data";
import { createEvent, deleteEvent, updateEvent } from "./actions";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

const deepCopy = <T,>(value: T): T => {
  // JSON-Clone reicht hier aus:
  // - Ereignisse/Config sind einfache Objekte
  // - Wir benötigen unveränderliche Snapshots für Undo/Redo
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

const pushHistory = (state: SchedulerState) => {
  state.past.push(createSnapshot(state));

  if (state.maxHistory > 0 && state.past.length > state.maxHistory) {
    state.past.shift();
  }

  state.future = [];
};

const initialState: SchedulerState = {
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView as SchedulerView,
  config: {},

  past: [],
  future: [],
  maxHistory: 50,
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    undo(state) {
      if (state.past.length === 0) return;

      const previous = state.past[state.past.length - 1];
      const newFuture = createSnapshot(state as SchedulerState);

      state.events = previous.events;
      state.config = previous.config;
      state.past = state.past.slice(0, -1);
      state.future = [newFuture, ...state.future];
    },
    redo(state) {
      if (state.future.length === 0) return;

      const next = state.future[0];
      const newPast = createSnapshot(state as SchedulerState);

      state.events = next.events;
      state.config = next.config;
      state.future = state.future.slice(1);
      state.past = [...state.past, newPast];
    },

    // Navigation ist in diesem Demo-Beispiel keine undobare Benutzeraktion.
    setCurrentDate(state, { payload }: PayloadAction<number>) {
      state.currentDate = payload;
    },
    setView(state, { payload }: PayloadAction<SchedulerView>) {
      state.view = payload;
    },

    updateConfig(state, { payload }: PayloadAction<Partial<SchedulerConfig>>) {
      pushHistory(state as SchedulerState);
      state.config = { ...state.config, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events.push(action.payload);
      })
      .addCase(deleteEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events = state.events.filter((e) => String(e.id) !== String(action.payload));
      })
      .addCase(updateEvent, (state, action) => {
        pushHistory(state as SchedulerState);

        const index = state.events.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      });
  },
});

export const { undo, redo, setCurrentDate, setView, updateConfig } = schedulerSlice.actions;
export default schedulerSlice.reducer;
~~~

## Die Steuerungstoolbar-Komponente bauen

Erstellen Sie `src/components/Toolbar.tsx`. Das ist eine kleine MUI-Toolbar, die Folgendes ermöglicht:

- Ansicht wechseln (day/week/month)
- vorherige/heute/naechste navigieren
- Undo/Redo
- Read-only-Modus umschalten

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../redux/types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  isReadOnly,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  onReadOnlyChange,
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

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(e) => onReadOnlyChange?.(e.target.checked)}
              inputProps={{ "aria-label": "Toggle read-only" }}
            />
          }
        />
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

## Scheduler mit Redux verbinden

Erstellen Sie `src/components/Scheduler.tsx`. Diese Komponente:

- liest `events/view/currentDate/config` aus dem flachen Redux-State
- bietet einen `data.save`-Callback, der Redux-Aktionen dispatcht
- gibt erstellte/aktualisierte Entitäten von `save` zurück, damit Scheduler seine interne Buchführung synchronisieren kann
- verbindet `undo/redo` und den `readonly`-Config-Schalter
- versteckt die eingebauten Navbar und verwendet stattdessen die benutzerdefinierte Toolbar

~~~tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Trial-Import:
// import ReactScheduler from "@dhtmlx/trial-react-scheduler";
// import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro-Import:
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { redo, setCurrentDate, setView, undo, updateConfig } from "../redux/schedulerSlice";
import { createEvent, updateEvent, deleteEvent, dispatchAction } from "../redux/actions";
import type { AppDispatch, RootState } from "../redux/store";
import type { SchedulerEvent, SchedulerView } from "../redux/types";

export default function ReactSchedulerReduxDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { past, future, events, view, currentDate, config } = useSelector((s: RootState) => s.scheduler);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      dispatch(setCurrentDate(Date.now()));
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(activeDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, view, dispatch]);

  // Scheduler <-> Redux Datenbrücke
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

          const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
          return dispatchAction(dispatch, updateEvent, eventWithId);
        }
        case "create":
          return dispatchAction(dispatch, createEvent, payload as Omit<Partial<SchedulerEvent>, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return dispatchAction(dispatch, deleteEvent, deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [dispatch]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      dispatch(setView(nextView));
      dispatch(setCurrentDate(date.getTime()));
    },
    [dispatch]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => dispatch(setView(nextView)), [dispatch]);

  const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
  const handleRedo = useCallback(() => dispatch(redo()), [dispatch]);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => dispatch(updateConfig({ readonly: value })),
    [dispatch]
  );
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* verstecke die built-in Navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Redux-Provider integrieren

Schließen Sie Ihre App schließlich mit dem Redux-`Provider` ein. Aktualisieren Sie `src/App.tsx`:

~~~tsx
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Scheduler />
    </Provider>
  );
}

export default App;
~~~

## Zusammenfassung

Sie haben den React Scheduler nun vollständig über Redux Toolkit gesteuert:

- Scheduler liest `events`, `view`, `currentDate` und `config` aus Redux
- Benutzerbearbeitungen werden über `data.save` -> Redux-Aktionen geroutet
- Die UI bleibt synchron, da Scheduler aktualisierte `events` über Props erhält
- Undo/Redo ist über snapshot-basierte History direkt in den Slice integriert
- Ein Read-only-Konfigurationsschalter lässt Sie den Scheduler vor Bearbeitungen sperren

## Was kommt als Nächstes

- Vertiefen Sie die Konzepte hinter diesem Beispiel in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Erkunden Sie Scheduler-Konfigurationen und Template-Optionen in [React Scheduler overview](integrations/react/overview.md)
- Persistenz hinzufügen (Ereignisse von einer API laden/ speichern), indem Sie asynchrone Thunks dispatchen und den Slice entsprechend aktualisieren
- Dasselbe Muster mit anderen State-Management-Libraries einsetzen:
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)