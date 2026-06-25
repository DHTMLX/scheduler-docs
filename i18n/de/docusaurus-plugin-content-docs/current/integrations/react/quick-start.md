--- 
title: Schneller Einstieg mit React Scheduler
sidebar_label: Schneller Einstieg
description: 'Schritt-für-Schritt-Anleitung zur Verwendung der React Scheduler-Komponente'
---

# Schneller Einstieg mit React Scheduler

:::note
Dieses Tutorial behandelt den in den **Commercial, Enterprise, and Ultimate**-Editionen von DHTMLX Scheduler enthaltenen React-Wrapper.
Wenn Sie die **Individual**- oder **GPL**-Edition verwenden, folgen Sie der alternativen Anleitung:
[Wie man mit React beginnt](integrations/react/js-scheduler-react.md).
:::

Der **React Scheduler**-Komponenten ist der offizielle Wrapper für **DHTMLX Scheduler**.
Diese Anleitung führt Sie durch die Erstellung einer kleinen React-Anwendung und das Rendern eines Basis-Schedulers mit dem Trial-Paket.

Wenn Sie neu bei React sind, beginnen Sie mit der offiziellen [React-Dokumentation](https://react.dev/learn). Prüfen Sie [ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt auf GitHub](https://github.com/dhtmlx/react-scheduler-quick-start).

## Versionsanforderungen

- React **18 oder neuer**

## Erstellung eines neuen React-Projekts

Um ein React-Projekt zu erstellen und in das Projektverzeichnis zu wechseln, führen Sie die folgenden Befehle aus:

~~~bash
npm create vite@latest react-scheduler-quick-start -- --template react-ts
cd react-scheduler-quick-start
~~~

### Installation von React Scheduler

Installieren Sie React Scheduler gemäß dem [Installationsleitfaden für React Scheduler](integrations/react/installation.md).

In diesem Tutorial verwenden wir das Evaluationspaket:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` in den Befehlen und Importen durch `@dhx/react-scheduler`.

## Demo-Daten hinzufügen

Wir verwenden in diesem Beispiel statische Daten. Erstellen Sie eine Datei mit dem Namen `src/demoData.ts`:

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

## Erstellung einer Scheduler-Komponente

Um eine Scheduler-Komponente hinzuzufügen, erstellen Sie eine Datei `src/components/Scheduler/Scheduler.tsx` mit folgendem Inhalt:

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

Schließlich werden die CSS-Klassen (`.violet`, `.green`, `.yellow`) über das `event_class`-Template angewendet, um das visuelle Erscheinungsbild der Ereignisse anzupassen:

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


## Scheduler in der App rendern

Um Scheduler anzuzeigen, ersetzen Sie den Code von `src/App.tsx` durch den folgenden Code:

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

Führen Sie die App anschließend mit dem untenstehenden Befehl aus:

~~~bash
npm run dev
~~~

Damit haben Sie eine **voll funktionsfähige React + DHTMLX Scheduler-Anwendung**.

Dieses Setup repräsentiert die **minimale Konfiguration**, die benötigt wird, um:

- einen Scheduler zu rendern
- Ereignisse anzuzeigen
- eine grundlegende Skalenkonfiguration anzuwenden
- die Scheduler-Instanz über ein React-Ref zu attachen
- Ereignisse über den `data.save`-Callback zu empfangen

Dies ist dasselbe minimale Beispiel, das im [GitHub-Demo-Projekt](https://github.com/dhtmlx/react-scheduler-quick-start) verwendet wird.

Von hier aus können Sie mit weiteren fortgeschrittenen Funktionen fortfahren:

- Synchronisierung von Daten mit dem React-Zustand
- Laden/Speichern von Daten aus Ihrem Backend
- Hinzufügen von Vorlagen und benutzerdefinierten Renderern
- Hinzufügen von Filtern
- Ersetzen des Lightbox durch eine benutzerdefinierte Komponente

Die nächsten Abschnitte führen diese Fähigkeiten der Reihe nach ein.

## Verwendung des React-Zustands als zentrale Quelle der Daten

_(empfohlen für die meisten React-Apps)_

In echten Anwendungen stammen Ereignisse normalerweise aus dem React-Zustand.
Nachfolgend ein vollständiges Beispiel, bei dem der Scheduler Änderungen über den `data.save`-Callback an React zurücksendet.

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
        // ...andere Props
      />
    </div>
  );
}
~~~

### Warum diesen Modus wählen

- React sieht immer dieselben Daten wie die Scheduler-Benutzeroberfläche
- Funktioniert perfekt mit Redux / Zustand / Jotai / MobX
- Einfach mit Backend-APIs zu synchronisieren

## Alternativer Modus: Scheduler als Quelle der Wahrheit

_(nützlich für sehr große Datensätze)_

In diesem Modus besitzt React keine Ereignisse.

~~~tsx
<ReactScheduler
  data={{
    load: '/api/data', // Scheduler lädt anfängliche Ereignisse von hier
    save: '/api/data', // Scheduler sendet Updates hierher zurück
  }}
/>
~~~

### Wann man diesen Modus bevorzugt

- Zehntausende von Ereignissen
- Häufige Benutzerinteraktionen und Aktualisierungen
- Sie möchten minimalen React-Renderaufwand

## Vorlagen verwenden

_(React-Elemente aus Vorlagenfunktionen zurückgeben)_

Vorlagen ermöglichen es, fast jeden Teil des Schedulers anzupassen.

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

### Weitere Details

Siehe den vollständigen Abschnitt hier: [React Scheduler Templates Documentation](integrations/react/configuration-props.md).

## GitHub-Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieser Anleitung folgt, ist [auf GitHub verfügbar](https://github.com/dhtmlx/react-scheduler-quick-start).

## Nächste Schritte

- Studieren Sie alle verfügbaren [React Scheduler-Eigenschaften](integrations/react/configuration-props.md)
- Erkunden Sie fortgeschrittene Scheduler-Funktionen in den [Guides](/guides/)