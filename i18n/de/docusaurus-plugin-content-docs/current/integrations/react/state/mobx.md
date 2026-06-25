---
title: React Scheduler mit MobX verwenden
sidebar_label: MobX
description: "Rendern Sie den React Scheduler aus einem beobachtbaren MobX-Zustand und bearbeiten Sie Erstellen/Aktualisieren/Löschen über data.save mit snapshot-basierter Rückgängig-/Wiederherstellungsfunktion."
---

# React Scheduler - MobX Tutorial

Dieses Tutorial zeigt, wie man **DHTMLX React Scheduler** in einer Vite + React + TypeScript-App rendert und von einem **MobX**-Store steuert.
Am Ende haben Sie einen funktionsfähigen Scheduler, der **Erstellen/Aktualisieren/Löschen**, **Ansicht + Datumnavigation**, **snapshot-basierte Rückgängig-/Wiederherstellungsfunktion** für Änderungen an Ereignissen sowie einen **Nur-Lese**-Schalter unterstützt.

:::note
Der komplette Quellcode ist [auf GitHub](https://github.com/DHTMLX/react-scheduler-mobx-starter) verfügbar.
:::

Sie werden Folgendes erstellen:

- einen MobX-Store, der `events`, die aktuelle `view` und `date` besitzt
- eine `data.save`-Brücke, die Scheduler-Bearbeitungen in Store-Aktionen umwandelt
- eine einfache Toolbar (Ansichten, Navigation, Undo/Redo, Read-only-Umschalter), die über dem Scheduler liegt

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und MobX
- Empfohlen: lesen Sie [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md), um das Datenbindungskonzept und den `data.save` Callback zu verstehen, auf dem dieses Tutorial aufbaut.

## Schnellstart – Projekt erstellen

In diesem Schritt erstellen wir ein Vite-Projekt, installieren Abhängigkeiten und überprüfen, ob die App läuft.

Aktionen:

- Erstellen Sie ein Vite React + TypeScript-Projekt
- Installieren Sie MobX + UI-Abhängigkeiten
- Installieren Sie React Scheduler (Evaluierungspaket)
- Entfernen Sie die Standard-`App.css`-Stile von Vite, damit der Scheduler den gesamten Ansichtsbereich ausfüllt

Bevor Sie beginnen, installieren Sie [Node.js](https://nodejs.org/en/).

Erstellen Sie ein Vite React + TypeScript-Projekt:

~~~bash
npm create vite@latest react-scheduler-mobx-demo -- --template react-ts
cd react-scheduler-mobx-demo
~~~

Nun installieren Sie die benötigten Abhängigkeiten.

* Für **npm**:

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Für **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installing React Scheduler

Installieren Sie React Scheduler gemäß dem [Installationsleitfaden für React Scheduler](integrations/react/installation.md).

In diesem Tutorial verwenden wir das Evaluierungspaket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Imports.

Jetzt können Sie den Entwicklungsserver starten:

~~~bash
npm run dev
~~~

Ihr React-Projekt sollte nun unter `http://localhost:5173` laufen.

:::note
Um den Scheduler den gesamten Seitenbereich ausfüllen zu lassen, entfernen Sie die Standard-Vite-Stile aus `src/App.css`.

Aktualisieren Sie `src/App.css` auf Folgendes.
:::

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Festlegung von Beispieldaten

In diesem Schritt erstellen wir deterministische Seed-Daten für den Scheduler, damit das Demo bei jedem Durchlauf gleich aussieht.

Aktionen:

- Erstellen Sie `src/seed/data.ts` mit einer kleinen Menge von Ereignissen
- Exportieren Sie eine anfängliche `view` und `date`, damit der Scheduler in einem vorhersehbaren Zustand startet

Erstellen Sie `src/seed/data.ts`:

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";

export interface SeedEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
}

export const seedEvents: SeedEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export const seedView: SchedulerView = "week";
~~~

:::note
Die begleitende Demo enthält zusätzliche Ereignisse für eine reichere visuelle Darstellung.
:::

## Aufbau der Toolbar-Komponente

In diesem Schritt erstellen wir eine einfache wiederverwendbare Toolbar, die die Scheduler-Navigation und die Historie steuert.

Aktionen:

- Erstellen Sie `src/components/Toolbar.tsx`
- Fügen Sie Schaltflächen für **Tag / Woche / Monat** hinzu
- Fügen Sie **Prev / Today / Next**-Navigationsschaltflächen hinzu
- Fügen Sie **Undo / Redo**-Schaltflächen hinzu, die an Callback-Funktionen gebunden sind
- Fügen Sie einen **Read-only**-Umschalter hinzu

Erstellen Sie `src/components/Toolbar.tsx`:

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

export interface ToolbarProps {
  currentView: string;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: "day" | "week" | "month") => void;
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
        {(["day", "week", "month"] as const).map((label) => (
          <Button
            key={label}
            variant={currentView === label ? "contained" : "outlined"}
            onClick={() => setView(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}

        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={canUndo === false}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={canRedo === false}>
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
        {new Date(currentDate).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Typography>

      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>&nbsp;&lt;&nbsp;</Button>
        <Button onClick={() => onNavigate?.("today")}>Today</Button>
        <Button onClick={() => onNavigate?.("next")}>&nbsp;&gt;&nbsp;</Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Einrichtung des MobX-Stores

In diesem Schritt erstellen wir einen MobX-Store, der Scheduler-Zustand besitzt und snapshot-basierte Undo/Redo implementiert.

Aktionen:

- Erstellen Sie `src/store.ts`
- Speichern Sie `events`, `view`, `currentDate` und `config` als beobachtbaren Zustand
- Implementieren Sie `createEvent`, `updateEvent`, `deleteEvent`-Methoden
- Fügen Sie `updateConfig` für das Umschalten von Read-only hinzu
- Fügen Sie `past`/`future`-Historienstapel sowie `undo`/`redo`-Operationen hinzu

Erstellen Sie `src/store.ts`:

~~~ts title="src/store.ts"
import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SeedEvent, type SchedulerView } from "./seed/data";

export interface SchedulerEvent extends SeedEvent {
  /**
   * Extra Scheduler fields are allowed.
   * The demo only relies on id/start_date/end_date/text.
   */
  [key: string]: unknown;
}

interface Snapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

class SchedulerStore {
  events: SchedulerEvent[] = seedEvents as SchedulerEvent[];
  view: SchedulerView = seedView;
  currentDate: number = seedDate;
  config: SchedulerConfig = {};

  past: Snapshot[] = [];
  future: Snapshot[] = [];
  maxHistory = 50;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  private generateId(): string {
    return `id_${Date.now().toString()}`;
  }

  private snapshot(): Snapshot {
    return {
      events: cloneJson(this.events),
      config: cloneJson(this.config),
    };
  }

  private saveToHistory(): void {
    this.past.push(this.snapshot());
    if (this.past.length > this.maxHistory) {
      this.past.shift();
    }
    this.future = [];
  }

  private restore(snapshot: Snapshot): void {
    this.events = snapshot.events;
    this.config = snapshot.config;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setCurrentDate(date: number): void {
    this.currentDate = date;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setView(view: SchedulerView): void {
    this.view = view;
  }

  updateConfig(partial: Partial<SchedulerConfig>): void {
    this.saveToHistory();
    this.config = { ...this.config, ...partial };
  }

  /**
   * Called by Scheduler's data processor (data.save) on event creation.
   *
   * Important: we return the created event with a final id (simulating a backend-generated id),
   * so Scheduler can replace its temporary id and keep subsequent updates working correctly.
   */
  createEvent(eventDraft: Partial<SchedulerEvent>): SchedulerEvent {
    this.saveToHistory();

    const id = this.generateId();
    const newEvent: SchedulerEvent = {
      ...eventDraft,
      id,
      start_date: String(eventDraft.start_date ?? new Date().toISOString()),
      end_date: String(eventDraft.end_date ?? new Date().toISOString()),
      text: String(eventDraft.text ?? "(no title)"),
    };

    this.events = [...this.events, newEvent];
    return newEvent;
  }

  updateEvent(updatedEvent: Partial<SchedulerEvent> & { id: string | number }): void {
    this.saveToHistory();
    this.events = this.events.map((event) => {
      if (String(event.id) === String(updatedEvent.id)) {
        return { ...event, ...updatedEvent };
      }
      return event;
    });
  }

  deleteEvent(id: string | number): void {
    this.saveToHistory();
    this.events = this.events.filter((event) => String(event.id) !== String(id));
  }

  undo(): void {
    if (this.past.length === 0) {
      return;
    }

    const previous = this.past.pop();
    if (!previous) {
      return;
    }

    this.future.unshift(this.snapshot());
    this.restore(previous);
  }

  redo(): void {
    if (this.future.length === 0) {
      return;
    }

    const next = this.future.shift();
    if (!next) {
      return;
    }

    this.past.push(this.snapshot());
    this.restore(next);
  }
}

const schedulerStore = new SchedulerStore();
export default schedulerStore;
~~~

## Erstellung der Haupt-Scheduler-Komponente

In diesem Schritt rendern wir den React Scheduler und verbinden ihn mit dem MobX-Store.

Aktionen:

- Erstellen Sie `src/components/Scheduler.tsx`
- Umgeben Sie die Komponente mit `observer`, damit sie neu rendert, wenn sich der Store ändert
- Erstellen Sie eine `data.save`-Bridge, die Store-Aktionen für create/update/delete aufruft
- Fügen Sie einen `onViewChange`-Handler hinzu, um interne Scheduler-View-Änderungen mit dem Zustand zu synchronisieren
- Binden Sie den Read-only-Schalter über `updateConfig` ein
- Verstecken Sie die integrierte Navigationsleiste des Schedulers und verwenden Sie stattdessen die Toolbar

Erstellen Sie `src/components/Scheduler.tsx`:

~~~tsx title="src/components/Scheduler.tsx"
import { observer } from "mobx-react-lite";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "./Toolbar";
import schedulerStore, { type SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";
import { useCallback, useMemo } from "react";

const DemoMobxScheduler = observer(() => {
  const {
    events,
    view,
    currentDate,
    config,
    canUndo,
    canRedo,
    setView,
    setCurrentDate,
    updateConfig,
    createEvent,
    updateEvent,
    deleteEvent,
    undo,
    redo,
  } = schedulerStore;

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
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
    },
    [currentDate, view, setCurrentDate]
  );

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView =
        mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => updateConfig({ readonly: value }),
    [updateConfig]
  );

  type DataAction = "create" | "update" | "delete";

  const dataBridge = useMemo(
    () => ({
      save: (entity: string, action: string, payload: unknown, id: string | number) => {
        if (entity !== "event") {
          return;
        }

        const safeAction = action as DataAction;

        if (safeAction === "update") {
          return updateEvent(payload as Partial<SchedulerEvent> & { id: string | number });
        }

        if (safeAction === "create") {
          // Wichtig: Rückgabe des erstellten Events mit der endgültigen id.
          // Das simuliert eine Backend-generierte id und hält anschließende Aktualisierungen funktionsfähig.
          return createEvent(payload as Partial<SchedulerEvent>);
        }

        if (safeAction === "delete") {
          return deleteEvent(id);
        }

        console.warn(`Unknown data.save action: ${action}`);
        return;
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);

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
        setView={setView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY}
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
});

export default DemoMobxScheduler;
~~~

Schließlich aktualisieren Sie `src/App.tsx`, um die Scheduler-Komponente zu rendern:

~~~tsx title="src/App.tsx"
import { useEffect } from "react";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler - MobX Demo";
  }, []);

  return <Scheduler />;
}

export default App;
~~~

An diesem Punkt sollte Ihre App den Scheduler mit einer benutzerdefinierten Toolbar darüber rendern.

## Anwendung ausführen

In diesem Schritt führen wir das Demo-Beispiel aus und überprüfen das Bearbeiten und den Verlauf.

Aktionen:

- Starten Sie den Entwicklungsserver (falls er nicht läuft)
- Erstellen/Bearbeiten/Anordnen von Ereignissen und bestätigen Sie, dass der Store über `data.save` aktualisiert wird
- Verwenden Sie Undo/Redo, um Änderungen an Ereignissen rückgängig zu machen bzw. anzuwenden
- Umschalten Sie den Read-only-Modus, um den Scheduler vor Bearbeitungen zu schützen

Ausführen:

~~~bash
npm run dev
~~~

Probieren Sie Folgendes aus:

- Erstellen Sie ein Ereignis (Doppelklick im Kalender oder über die integrierte Editor-UI)
- Bearbeiten Sie das Ereignis (Text/Zeit ändern)
- Ziehen Sie ein Ereignis in einen neuen Zeitslot
- Verwenden Sie **Undo** / **Redo** in der Toolbar
- Schalten Sie **Read-only** ein, um Scheduler vor Bearbeitungen zu sperren

## Zusammenfassung

In diesem Tutorial haben Sie:

- ein Vite + React-Projekt erstellt
- React Scheduler hinzugefügt und an einen MobX-Store angebunden
- snapshot-basierte Undo/Redo mit `past`/`future`-Historienarrays implementiert
- Ereignisse, Ansicht/Datum und Konfiguration aus dem beobachtbaren MobX-Zustand gesteuert
- den `data.save`-Callback verwendet, sodass jede Scheduler-Änderung zu einer Store-Aktion wird
- einen Read-only-Konfigurations-Umschalter, der Sie den Scheduler vor Bearbeitungen schützen lässt

Dies hält die Scheduler-Komponente vollständig deklarativ, während Mutationlogik und Verlaufseinpeicherung vollständig im MobX-Zustand gekapselt sind.

## Was kommt als Nächstes

Um fortzufahren:

- Überprüfen Sie erneut die Konzepte hinter diesem Beispiel in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Erkunden Sie die Konfigurations- und Template-Optionen von Scheduler in [React Scheduler overview](integrations/react/overview.md)
- Probieren Sie dasselbe Muster mit anderen Zustands-Managern aus:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)