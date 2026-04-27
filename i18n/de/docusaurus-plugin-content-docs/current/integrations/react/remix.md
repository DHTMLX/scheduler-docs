---
title: React Scheduler mit Remix
sidebar_label: Remix
description: Erfahren Sie, wie Sie den DHTMLX React Scheduler mit Remix (React Router v7) integrieren, einschließlich der Einrichtung von Client-Komponenten und Beispieldaten.
---

# React Scheduler mit Remix

Dieses Tutorial zeigt, wie man eine einfache **Remix**-Anwendung erstellt und einen **DHTMLX React Scheduler** auf einer Seite rendert.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/dhtmlx/react-scheduler-remix-starter).
:::

## Voraussetzungen

- Node.js (LTS wird empfohlen)
- Grundlagen zu React + TypeScript
- Grundlagen zu Remix / React Router. Falls Sie Auffrischung brauchen, siehe die Remix-Dokumentation: https://remix.run/docs

## Schnellstart - Projekt erstellen

Da Remix jetzt als Teil von **React Router v7** ausgeliefert wird, ist der empfohlene Weg, ein Projekt zu scaffolden:

~~~bash
npx create-react-router@latest
~~~

Wenn Sie dazu aufgefordert werden, wählen Sie:

- Project name: **react-scheduler-remix-quick-start**
- Verwenden Sie die Standardvorlage (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Ja

Nach der Installation wechseln Sie in das Projektverzeichnis:

```bash
cd react-scheduler-remix-quick-start
```

### Installing React Scheduler

Installieren Sie den React Scheduler wie im [React Scheduler-Installationsleitfaden](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Falls Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Imports.

## Vorbereitung der Demo-Daten

Erstellen Sie einen Ordner `data/` im Projektstamm. Legen Sie darin eine Datei `demoData.ts` an, die die anfänglichen Daten für den Scheduler enthält:

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
Die Begleit-Demo enthält zusätzliche Ereignisse für eine visuell reichhaltigere Darstellung.
:::

## Erstellung der Scheduler-Komponente

Remix ermöglicht die Nutzung von Client-Seiten-Komponenten über die Standard-React-Architektur. Der Scheduler sollte in den meisten praktischen Fällen innerhalb einer Client-Komponente gerendert werden.

Dies ist erforderlich, wenn Sie:

- `ref` verwenden, um die Scheduler-Instanz zuzugreifen
- Callback-Funktionen (events, templates, Daten-Handler) übergeben
- ReactScheduler-`hooks` verwenden
- dynamische Config oder React-Elemente bereitstellen

Daher beginnt unsere Scheduler-Komponente mit `"use client"`.

Erstellen Sie eine neue Datei unter `components/Scheduler/Scheduler.tsx`:

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

Diese Komponente initialisiert den Scheduler und stellt ihm eine Konfiguration, anfängliche Daten und einen `ref` für zukünftige API-Aufrufe bereit. Das `config`-Objekt steuert das Layout der Timeline, während die `events`-Prop dem Scheduler seinen Datensatz liefert. Wir übergeben außerdem `activeView` und `activeDate` als Props, damit die Elternebene steuert, was der Scheduler anzeigt.

Die `save`-Funktion innerhalb der `data`-Prop dient dazu, Aktualisierungen der Ereignisse im Scheduler nachzuverfolgen. In diesem Tutorial fügen wir einen einfachen Platzhalter-Handler hinzu, um Änderungen nachzuverfolgen. Wenn Sie Updates an ein Backend senden oder sie an React-Zustand binden möchten, können Sie dem offiziellen [guide](integrations/react/overview.md#bindingdata) folgen.

## Hinzufügen von Farbstilen für Ereignisse

Die CSS-Klassen (`.blue`, `.violet`, `.green`, `.yellow`) werden über das `event_class`-Template angewendet, um das visuelle Erscheinungsbild der Ereignisse anzupassen. Fügen Sie Folgendes zu `app/app.css` hinzu:

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
Damit der Scheduler die gesamte Seite sauber ausfüllt, stellen Sie sicher, dass der Body keinen zusätzlichen Rand hat:

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## Rendering des Scheduler auf einer Route

Öffnen Sie die Hauptseiten-Route — `app/routes/home.tsx`. Ersetzen Sie deren Inhalt durch Folgendes:

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

Jetzt wird der Scheduler unter der Route `/` angezeigt.

## Anwendung starten

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

Öffnen Sie anschließend `http://localhost:5173` in Ihrem Browser. Sie sollten nun einen funktionsfähigen Scheduler mit den anfänglichen Daten innerhalb einer Remix-Anwendung sehen.

## Zusammenfassung

Sie haben jetzt ein minimales Remix-Projekt mit DHTMLX React Scheduler:

- Scheduler wird als Client-Komponente (`"use client"`) innerhalb von Remix / React Router v7 gerendert
- Demo-Daten werden aus einer separaten Datei geladen und als Props übergeben
- das `event_class`-Template wendet benutzerdefinierte Farbverläufe auf Ereignisse an
- der `data.save`-Callback protokolliert Bearbeitungen in der Konsole (bereit, an ein Backend angeschlossen zu werden)

## Ausblick

- [Datenfluss, der von React gesteuert wird](integrations/react/overview.md#bindingdata)
- [Dokumentation der React Scheduler-Templates](integrations/react/configuration-props.md)
- Erkundung von State-Management-Integrationen:
  - [Verwendung des React Scheduler mit Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Verwendung des React Scheduler mit MobX](integrations/react/state/mobx.md)
  - [Verwendung des React Scheduler mit Zustand](integrations/react/state/zustand.md)