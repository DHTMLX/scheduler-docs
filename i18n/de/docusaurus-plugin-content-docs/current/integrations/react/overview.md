---
title: "React Scheduler"
sidebar_label: "Überblick"
description: "Überblick über den React Scheduler Wrapper, Datenbindungsmodi, Anpassungsoptionen und Framework-Kompatibilität."
---

# React Scheduler

:::note
React Scheduler ist erhältlich unter [kommerziellen, Unternehmens- und Ultimate-Lizenzen](https://dhtmlx.com/docs/products/licenses.shtml).
Wenn Sie die Einzel- oder GPL-Ausgaben des Scheduler verwenden, verwenden Sie [dhtmlxScheduler with React](integrations/react/js-scheduler-react.md).
:::

## Überblick

DHTMLX React Scheduler ist der offizielle React-Wrapper für DHTMLX Scheduler. Es bietet eine deklarative API zum Rendern und Konfigurieren des Schedulers, während gleichzeitig die zugrunde liegende Scheduler-Instanz verfügbar bleibt, wenn Sie eine erweiterte Kontrolle benötigen.

Hauptmerkmale:

- übergeben Sie `events`, `view` und `date` als Props
- Verhalten anpassen mit `config` und `templates`
- Benutzeränderungen über `data.save` oder `data.batchSave` behandeln
- verwenden Sie `ref`, um Scheduler-API-Methoden direkt aufzurufen

Wenn Sie neu bei DHTMLX Scheduler sind, sehen Sie sich die DHTMLX Scheduler-Dokumentation an (/guides/) für einen Überblick über seine Funktionen.

## Installation und npm-Zugriff

Für Evaluierungs- und professionelle Paketinstallationen siehe:

- [Installation](integrations/react/installation.md)

## Versionsanforderungen

- React `18+`

## Grundlegende Verwendung

```tsx
import { useMemo, useRef } from "react";
import ReactScheduler, {
  type Event,
  type ReactSchedulerRef,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Product Strategy Hike",
    classname: "blue",
    start_date: new Date("2025-12-08T02:00:00Z"),
    end_date: new Date("2025-12-08T10:20:00Z"),
  },
];

export default function BasicSchedulerDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (_start, _end, event) => event.classname || "",
    }),
    []
  );

  const config: SchedulerConfig = useMemo(
    () => ({
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        ref={schedulerRef}
        events={events}
        view="week"
        date={new Date("2025-12-08T00:00:00Z")}
        templates={templates}
        config={config}
      />
    </div>
  );
}
```

## Datenbindung {#bindingdata}

Der React Scheduler unterstützt zwei Datenbindungs-Modelle.

### React-Zustand als Quelle der Wahrheit (empfohlen)

In diesem Modell besitzt React (oder ein State-Manager) die Ereignisdaten:

- Scheduler liest Ereignisse aus Props
- Benutzeränderungen rufen Ihren `data.save`-Callback auf
- Callback aktualisiert den React-Zustand
- React rendert den Scheduler mit aktualisierten Props neu

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function ReactDrivenExample({ seedEvents }: { seedEvents: Event[] }) {
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

  return <ReactScheduler events={events} data={data} />;
}
```

Dieses Modell eignet sich am besten, wenn andere React-UI-Komponenten mit Scheduler-Daten synchronisiert bleiben müssen.

### Scheduler als Quelle der Wahrheit

In diesem Modell verwaltet der Scheduler seinen internen Zustand und leitet Bearbeitungen an Ihr Backend weiter.

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

Dieses Modell ist nützlich, wenn React nicht jede Aktualisierung sofort spiegeln muss.

### Daten laden

Sie können Daten entweder über Props oder über `data.load` laden:

```tsx
// Prop-basierte Datenladung
<ReactScheduler events={eventsFromState} />

// Transport-basierte Datenladung
<ReactScheduler data={{ load: "/api/scheduler/load" }} />
```

Für Anforderungen an das Datenformat siehe [Laden von Daten](guides/loading-data.md).

### Änderungen speichern

`data.save` kann eine URL oder ein Callback sein.

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

Für Details zum Backend-Verhalten siehe [Server Integration](guides/server-integration.md).

## Ersetzen des Lightbox

Scheduler enthält einen integrierten Ereigniseditor namens [Lightbox](guides/lightbox-editors.md).

Sie können ihn ersetzen, indem Sie `customLightbox` verwenden:

```tsx
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data?: any;
  onSave?: (event: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {

  let updatedEventText = data.text || "";

  const handleSaveClick = () => {
    if(onSave)
      onSave({ ...data, text: updatedEventText });
  };

  function PaperComponent(props: any) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef"
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"], input,textarea'}
      >
        <Paper {...props} ref={nodeRef}/>
      </Draggable>
    );
  }


  function TextComponent() {
    const [description, setDescription] = useState<string>(data.text || '');

    return (
      <TextField
        id="event_text"
        hiddenLabel
        multiline
        value="{description}"
        autoFocus
        onChange="{(e)" => {
          updatedEventText = e.target.value;
          setDescription(e.target.value)
        }}
        sx="{{" width: '100%', padding: '8px', marginTop: '10px' }}
      />
    )
  }


  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="lightbox"
      onClose={onCancel}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Edit Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Description
        </DialogContentText>

        <TextComponent />

        <DialogActions className='buttons'>
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          <Button variant="contained" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={onDelete}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>

  );
};

export default CustomLightbox;
```

Sie können außerdem das Öffnen des Editors mit `onBeforeLightbox` abfangen:

```tsx
import { useEffect, useRef } from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const schedulerRef = useRef<any>(null);

  const { events, handleSaveEvent, handleDeleteEvent, createEvent } 
    = useOutletContext<SchedulerEditorContext>();
  const navigate = useNavigate();

  const handleEventEdit = (id: any) => {
    const schedulerInstance = schedulerRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: schedulerInstance.getTask(id) } });
  };

  return (
    <ReactScheduler 
      ref={schedulerRef}
      tasks={events}
      onBeforeLightbox={handleEventEdit} />
  );
}
```

Referenz: [onBeforeLightbox](api/event/onbeforelightbox.md)

## Ersetzen integrierter Modale

Der Löschbestätigungsdialog kann über `modals` überschrieben werden.

```tsx
<ReactScheduler
  modals={{
    onBeforeEventDelete: ({ event, callback, schedulerInstance }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback(); // Aufruf des Callbacks löst das Löschen des Events aus
      }
    },
  }}
/>
```

### Anpassen des Bestätigungsdialogs für Wiederholungen {#customizingtherecurrenceconfirmationmodal}

Wenn ein Benutzer einen wiederkehrenden Termin bearbeitet oder verschiebt, fragt ein Bestätigungsdialog, ob nur dieses Vorkommnis, dieses und folgende Ereignisse oder die gesamte Serie geändert werden soll. Sie können diesen integrierten Dialog durch Ihren eigenen Dialog ersetzen, indem Sie `modals.onRecurrenceConfirm` verwenden.

Die Callback-Funktion erhält ein Kontextobjekt und muss eine Entscheidung zurückgeben (oder ein Promise, das zu einer Entscheidung auflöst):

| Feld | Typ | Beschreibung |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Ob die Aktion vom Lightbox-Editor oder Drag-and-Drop ausgelöst wurde |
| `occurrence` | `any` | Das spezifische Vorkommnis, das bearbeitet wird |
| `series` | `any` | Die übergeordnete wiederkehrende Ereignisserie |
| `labels` | `object` | Lokalisierte Beschriftungen: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Verfügbare Optionen, z. B. `["occurrence", "following", "series"]` |

Rückgabewert (`RecurrenceDecision`): `"occurrence"`, `"following"`, `"series"`, oder `null` zum Abbrechen.

Beispiel:

```tsx
import { useState, useCallback } from "react";

function App() {
  const [recurrencePrompt, setRecurrencePrompt] = useState(null);

  const onRecurrenceConfirm = useCallback((context) => {
    return new Promise((resolve) => {
      setRecurrencePrompt({ context, resolve });
    });
  }, []);

  return (
    <>
      <ReactScheduler
        modals={{ onRecurrenceConfirm }}
      />
      {recurrencePrompt && (
        <MyRecurrenceDialog
          options={recurrencePrompt.context.options}
          labels={recurrencePrompt.context.labels}
          onSelect={(choice) => {
            recurrencePrompt.resolve(choice);
            setRecurrencePrompt(null);
          }}
          onCancel={() => {
            recurrencePrompt.resolve(null);
            setRecurrencePrompt(null);
          }}
        />
      )}
    </>
  );
}
```

## Filtern

Verwenden Sie die `filter`-Eigenschaft, um zu steuern, welche Ereignisse angezeigt werden:

```tsx
import { useCallback, useState } from "react";

function FilteredScheduler({ events }: { events: any[] }) {
  const [query, setQuery] = useState("");

  const filterFn = useCallback(
    (event: any) => {
      if (!query.trim()) return true;
      return event.text?.toLowerCase().includes(query.trim().toLowerCase());
    },
    [query]
  );

  return (
    <>
      <input
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ReactScheduler events={events} filter={filterFn} />
    </>
  );
}
```

## Zugriff auf die zugrunde liegende Scheduler-API

Wenn Props nicht ausreichen, greifen Sie über `ref` auf die Scheduler-Instanz zu:

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export function DirectRefExample({ events }: { events: any[] }) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log("Events:", scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={events} />;
}
```

Wenn Sie Scheduler direkt verändern, halten Sie React-Props synchron, um Zustandsabdrift zu vermeiden.

Siehe [Scheduler Methods Overview](api/overview/methods_overview.md) für verfügbare Methoden.

#### Konflikte mit React-Props vermeiden

- Wenn Sie manuell `scheduler.parse(( events ))` oder `scheduler.addEvent()` aus Ihrem Code aufrufen, beachten Sie, dass Sie möglicherweise die React-Props synchron halten müssen. Andernfalls könnte bei der nächsten React-Neudarstellung Ihre manuelle Änderung überschrieben werden.
- Die empfohlene Vorgehensweise besteht darin, sich auf die Wrapper-Props für `events` zu verlassen oder sie in Ihrem React-State zu verwalten. Dann lässt der Wrapper das Neparsen durchführen.

## Kompatibilität mit SSR-Frameworks (Next.js, Remix)

:::note
Der React Scheduler ist SSR-freundlich. Während des Server-Renderings wird ein Platzhalter-Container ausgegeben und anschließend auf dem Client hydratisiert.
:::

Verwenden Sie framework-spezifische Guides für Details:

- [React Scheduler with Next.js](integrations/react/nextjs.md)
- [React Scheduler with Remix](integrations/react/remix.md)

## Nächste Schritte

- [Configuration](integrations/react/configuration-props.md)
- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [Quick Start](integrations/react/quick-start.md)