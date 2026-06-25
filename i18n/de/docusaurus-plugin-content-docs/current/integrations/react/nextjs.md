---
title: React Scheduler mit Next.js
sidebar_label: Next.js
description: Erfahren Sie, wie Sie den DHTMLX React Scheduler mit Next.js unter Verwendung des App Router integrieren, einschließlich Client-Komponenten-Setup und Demodaten.
---

# React Scheduler mit Next.js

Diese Anleitung zeigt, wie man eine einfache **Next.js**-Anwendung erstellt und einen **DHTMLX React Scheduler** auf einer Seite rendert.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/dhtmlx/react-scheduler-nextjs-starter).
:::

## Voraussetzungen

- Node.js (LTS empfohlen)
- Grundkenntnisse in React + TypeScript
- Grundlagen von Next.js (App Router, Server-/Client-Komponenten). Falls Sie eine Auffrischung benötigen, siehe die Next.js-Dokumentation: https://nextjs.org/docs

## Schnellstart – Projekt erstellen

Um eine Next.js-Anwendung zu scaffolden, führen Sie Folgendes aus:

~~~bash
npx create-next-app@latest
~~~

Bei Aufforderung wählen Sie:

- Project name: **react-scheduler-nextjs-quick-start**
- Verwenden Sie die Standardvorlage (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js erstellt die Projektstruktur und installiert die grundlegenden Abhängigkeiten.

Nach der Installation wechseln Sie in das Projektverzeichnis:

```bash
cd react-scheduler-nextjs-quick-start
```

### Installation des React Scheduler

Installieren Sie den React Scheduler wie im [Installationsleitfaden für den React Scheduler](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in Befehlen und Imports.

## Vorbereiten der Demodaten

Erstellen Sie einen Ordner `data/` im Projektstamm. Fügen Sie darin eine Datei `demoData.ts` mit den anfänglichen Daten für den Scheduler hinzu:

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
Die Begleit-Demo enthält zusätzliche Ereignisse für eine aussagekräftigere Visualisierung.
:::

## Erstellung der Scheduler-Komponente

Next.js verwendet standardmäßig Server-Komponenten, aber der React Scheduler sollte in den meisten praktischen Fällen in einer Client-Komponente gerendert werden.

Dies ist erforderlich, wann immer Sie:

- `ref` verwenden, um auf die Scheduler-Instanz zuzugreifen
- Callback-Funktionen (Events, Templates, Daten-Handler) übergeben
- ReactScheduler `hooks` verwenden
- dynamische Konfiguration oder React-Elemente bereitstellen

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

Diese Komponente initialisiert den Scheduler und übergibt ihm Konfiguration, ursprüngliche Daten und eine `ref` für zukünftige API-Aufrufe. Das `config`-Objekt steuert das Layout der Timeline, während die Props `events` dem Scheduler seinen Datensatz bereitstellen. Wir übergeben auch `activeView` und `activeDate` als Props, damit die Elternkomponente steuert, was der Scheduler anzeigt.

Die `save`-Funktion im `data`-Prop dient dazu, Aktualisierungen von Ereignissen im Scheduler nachzuverfolgen. In diesem Tutorial fügen wir einen einfachen Platzhalter-Handler hinzu, um Änderungen nachzuvollziehen. Wenn Sie Updates an ein Backend senden oder an React-State binden möchten, können Sie der offiziellen Data-Binding-Dokumentation folgen: [Guide](integrations/react/overview.md#bindingdata).

## Farbstile der Ereignisse hinzufügen

Die CSS-Klassen (`.blue`, `.violet`, `.green`, `.yellow`) werden über das Template `event_class` angewendet, um das visuelle Erscheinungsbild der Ereignisse anzupassen. Fügen Sie Folgendes zu `app/globals.css` hinzu:

~~~css title="app/globals.css"
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
Damit der Scheduler die gesamte Seite sauber ausfüllt, entfernen Sie die Standard-Dark-Mode-Theme-Variablen aus `app/globals.css` und stellen Sie sicher, dass der Body keinen zusätzlichen Rand hat:

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## Scheduler zur Seite hinzufügen

Öffnen Sie `app/page.tsx` und rendern Sie den Scheduler auf der Hauptseite:

~~~tsx title="app/page.tsx"
import Scheduler from '../components/Scheduler/Scheduler';
import { events } from '../data/demoData';

export default function HomePage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

Jetzt zeigt die Seite einen Vollbild-Scheduler.

## Anwendung starten

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

Öffnen Sie dann `http://localhost:3000` in Ihrem Browser. Sie sollten nun einen funktionsfähigen Scheduler mit den anfänglichen Daten innerhalb einer Next.js-Anwendung sehen.

## Zusammenfassung

Sie haben nun ein minimales Next.js-Projekt mit dem DHTMLX React Scheduler:

- Der Scheduler wird als Client-Komponente (`"use client"`) im Next.js App Router gerendert
- Demo-Daten werden aus einer separaten Datei geladen und als Props übergeben
- Das `event_class`-Template wendet benutzerdefinierte Farbverläufe auf Ereignisse an
- Der `data.save`-Callback protokolliert Bearbeitungen in der Konsole (bereit, an ein Backend angeschlossen zu werden)

## Was kommt als Nächstes

- [React-gesteuerte Datenfluss](integrations/react/overview.md#bindingdata)
- [Dokumentation zu React Scheduler Templates](integrations/react/configuration-props.md)
- Erkundung von State-Management-Integrationen:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)