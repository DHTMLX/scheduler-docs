React Scheduler
==================

{{note React Scheduler is available under [Commercial, Enterprise and Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
If you're using Individual or GPL editions of Scheduler, please refer to the [How to Start](howtostart_react.md) article for React. }}

Overview
--------------------

DHTMLX Scheduler is a pure JS component that can work in any browser environment. The Commercial and higher editions of Scheduler include a **React Scheduler** component that encapsulates DHTMLX Scheduler and allows you to use it natively with React.

The wrapper lets you create a fully functional Scheduler chart in your React applications using the familiar props/state model. Under the hood, it manages a standard DHTMLX Scheduler instance, translating your React props (such as events or config) into the corresponding Scheduler initialization and data structures.

**Key features**

- Declarative data handling: Pass an array of events, views, markers, etc. as props.
- Configurable: Map React props to the underlying *scheduler.config*, *scheduler.templates*, *scheduler.plugins*, etc.
- Access to the full Scheduler API: Use a ref to call methods like api/scheduler_addevent.md, api/scheduler_updateevent.md, or api/scheduler_deleteevent.md.
- Easy customization: Use React components for templates, lightbox forms, or markers.

If you're new to DHTMLX Scheduler, see the [DHTMLX Scheduler documentation](guides.md) for an overview of its features.

Installation and NPM Access
-------------------

**Installing the Trial version of React Scheduler component**

{{note If you want to use the trial version of React Scheduler, [download the trial DHTMLX Scheduler package](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) and follow 
the steps mentioned in the README file. The React Scheduler samples are included into this package as well.
Note that the trial React Scheduler component is available for 30 days only.}}

**Installing the PRO version of React Scheduler component**

{{note
You can access the DHTMLX private npm directly in the [Client's Area](https://dhtmlx.com/clients/) by generating your login and password for npm. 
To install the React Scheduler package, follow the instructions provided in the README file. 
Please note that access to the private npm is available only while your proprietary Scheduler license is active.
}}

Version Requirements
--------------------

- React `v18.0.0` or newer

Basic Usage
-------------------

Here is a minimal snippet showing how to import and render the Scheduler chart:

~~~js
import React, { useEffect, useRef, useState } from 'react';
import ReactScheduler, { Event, SchedulerConfig, SchedulerTemplates } from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";
import "./styles.css";
import { initialData } from "./DemoData";


export default function SchedulerTemplatesDemo() {
  const config: SchedulerConfig = {
    first_hour: 8,
    last_hour: 20,
    time_step: 15
  };

  const templates: SchedulerTemplates = {
    event_class: (start, end, event) => {
      return event.classname || '' ;
    }
  };
  


  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactScheduler
        events={initialData.events}
        date={new Date("2025-08-15T00:00:00Z")}
        view={"week"}
        templates={templates}
        config={config}
      />
    </div>
  );
};
~~~

Where **demoData** has the following [format](loading_data.md):

~~~
const initialData: { events: Event[] } = {
  events:  [
    { id:1, classname:"blue", start_date: new Date("2025-08-11T02:00:00Z"), 
      end_date: new Date("2025-08-11T10:20:00Z"), text:"Product Strategy Hike" },
    { id:2, classname:"blue", start_date: new Date("2025-08-11T12:00:00Z"), 
      end_date: new Date("2025-08-11T16:00:00Z"), text:"Agile Meditation and Release" },
    { id:3, classname:"violet", start_date: new Date("2025-08-12T06:00:00Z"), 
      end_date: new Date("2025-08-12T11:00:00Z"), text:"Tranquil Tea Time" },
    { id:4, classname:"green", start_date: new Date("2025-08-12T11:30:00Z"), 
      end_date: new Date("2025-08-12T19:00:00Z"), text:"Sprint Review and Retreat" },
    { id:5, classname:"violet", start_date: new Date("2025-08-13T01:00:00Z"), 
      end_date: new Date("2025-08-13T03:00:00Z"), text:"Kayaking Workshop" },
    { id:6, classname:"yellow", start_date: new Date("2025-08-13T06:00:00Z"), 
      end_date: new Date("2025-08-13T08:00:00Z"), text:"Stakeholder Sunset Yoga Session" }
  ]
};
export demoData;
~~~

Binding Data
--------------------

The **ReactScheduler** wrapper offers flexible ways of loading and saving data. Conceptually, there are two primary approaches to manage changes in your Scheduler data:

1. React state as the source of truth
2. Scheduler as the source of truth

Either approach is valid, but you should pick one and follow it consistently to avoid unexpected behavior.

### React state as the source of truth

In this pattern, the **ReactScheduler** reads all events from your React state. Whenever the user modifies events inside the Scheduler (for example, by creating or deleting one), the Scheduler triggers a callback. In this callback, you update your React state with the new or removed data. Once the state is updated, React re-renders the **ReactScheduler** component, which in turn re-initializes the Scheduler data from the latest state.

~~~js
function MySchedulerApp() {
  const [events, setEvents] = useState<Task[]>(initialEvents);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'event') {
        if (action === 'create') {
          setEvents((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactScheduler
      events={events}
      data={data}
      // ...other props
    />
  );
}
~~~

In this example, **ReactScheduler** calls the **save** callback when a new event is created, and the React state is updated accordingly. When the state changes, ReactScheduler re-initializes the Scheduler data.

This approach makes your React state a single source of truth for both UI and server updates and works naturally with other React logic or Redux-based state.

However, it will require more frequent re-parsing or re-rendering of the Scheduler.

### Scheduler as the source of truth

In this approach, changes happen directly inside the Scheduler instance without necessarily being mirrored into a React state variable. You can still initialize or load events (through props or via the Scheduler's built-in data processor), but once the Scheduler is running, it handles data internally. If you configure an update callback or use built-in transport, Scheduler will forward changes to a server endpoint or a custom function, but it will not automatically overwrite or revert from a React state after modifications.

~~~js
<ReactScheduler
  data={ {
    load: "/api/data",     // scheduler loads initial events from here
    save: "/api/data"      // scheduler sends updates back here
  } }
/>
~~~

Here, Scheduler handles fetching/sending data on its own. The local Scheduler instance remains the primary holder of the current data.

This approach reduces the overhead of constantly updating React state when Scheduler data changes and simplifies large-batch operations (like auto-scheduling) without repeated re-renders.

On the other side, you lose the direct synchronization between Scheduler data and your React state. And if you do store events in a React state,
you need to be sure not to unintentionally overwrite Scheduler's internal state.

### Loading data

When the data is available in the code, it can be passed to Scheduler using state variables and appropriate props:

~~~js
export default function SchedulerTemplatesDemo() {
  const [events, setEvents] = useState(projectData.events);

  return (
    <div style={ {height: '100vh'} }>
      <ReactScheduler
        events={events}
      />
    </div>
  );
};
~~~

### Loading data using built-in transport

You can provide a URL from which Scheduler will load data and another URL to which Scheduler will send updates:

~~~js
import React from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactScheduler ...{props} />
  );
}
~~~

Internally, the **load** URL is passed to the api/scheduler_load.md method. The endpoint must return data in the format described in the loading_data.md article.

### Saving changes

The **save** URL receives updates in the format described in this [article](server_integration.md#technique:~:text=Request%20and%20response%20details).

You can also pass a function callback to the **save** property of the **data**. This function will be called each time Scheduler data changes and serves as a routing function for the internal [DataProcessor](server_integration.md):

~~~js
import React from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactScheduler ...{props} />
  );
}
~~~

Replacing the Lightbox
------------------

DHTMLX Scheduler comes with a built-in configurable task editor called [Lightbox](lightbox_editors.md).

If needed, you can replace it with a React-based modal or any other component in one of the following ways:

### By providing a custom component via the `customLightbox` prop

To do so, pass a component through the **customLightbox** prop:

~~~js
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
        nodeRef={nodeRef}
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
        value={description}
        autoFocus
        onChange={(e) => {
          updatedEventText = e.target.value;
          setDescription(e.target.value)
        }}
        sx={{ width: '100%', padding: '8px', marginTop: '10px' }}
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
~~~

After that, you can use the added component in the following way:

~~~js
import { useEffect, useRef } from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const schedulerRef = useRef(null);


  const events = [...];


  return (
    <div className="demo-container">
      <title>DHTMLX React Scheduler | Custom Edit Form</title>
      <ReactScheduler 
        ref={schedulerRef}
        events={events}
        date={new Date("2025-08-15T00:00:00Z")}
        customLightbox={<CustomLightbox />} />
    </div>
  );
}
~~~

### By using onBeforeLightbox event prop

For more complex scenarios, you can capture the [onBeforeLightbox](api/scheduler_onbeforelightbox_event.md) event (fired when the Lightbox is invoked) and override the default behavior:

~~~js
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
~~~

### By using JS Scheduler API

Please refer to custom_details_form.md for further details on overriding or extending the built-in Lightbox.

Replacing built-in Modals
------------------

The default UI includes one modal popup:

- the confirm dialog that appears before deleting an event

Both can be overridden using the `modals` prop of ReactScheduler:

~~~js
<ReactScheduler
  ...
  modals={ {
    onBeforeEventDelete: ({
      event,
      callback,
      schedulerInstance,
    }: {
      event: event;
      callback: () => void;
      schedulerInstance: SchedulerStatic;
    }) => void
  } }
  ...
/>

~~~

You can use these props to activate your custom modals whenever a confirmation dialog is called by Scheduler.
Calling the `callback()` provided in the arguments will finalize the deletion of the appropriate task or link. To cancel the deletion, simply close the modal without calling the callback.

Filtering
-----------------

Use the `filter` prop to specify a filter for the tasks that should be displayed:


~~~js
const [query, setQuery] = useState("");
const filterFn = useCallback(
  (event: any) => {
    if (!query.trim()) {
    return true
  }
    return event.text.toLowerCase().includes(query.trim().toLowerCase());
  },
  [query],
);
return (<>
  <TextField
    size="small"
    placeholder="Search events…"
    value={query}
    onChange={e => setQuery(e.target.value)}
    sx={{ ml: 2, minWidth: 180 }}
  />
  <ReactScheduler
    ref={schedulerRef}
    events={events}

    filter={filterFn}

    config={config}
    templates={templates}
  />

</>
);

~~~

Accessing the Underlying Scheduler API
------------------

In most cases, ReactScheduler props are enough to configure your chart. However, sometimes you'll need direct access to the DHTMLX Scheduler API for advanced operations.

### Using a Ref

For the cases when declarative props and built-in hooks are not enough, the wrapper allows accessing the internal Scheduler instance using `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactScheduler, { ReactSchedulerRef } from '@dhx/react-scheduler';

export function DirectRefExample({ tasks, links }) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    // here you can call ANY Scheduler API method
    console.log('All events:', scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return (
    <ReactScheduler
      ref={schedulerRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~


See the DHTMLX Scheduler [API Reference](api/refs/scheduler_methods.md) for the full list of methods.

#### Avoid conflicts with React props

- If you manually call `scheduler.parse({ events })` or `scheduler.addEvent()` from your code, be aware you may need to keep the React props in sync. Otherwise, the next time React re-renders, it may overwrite your manual changes.
- The recommended approach is to rely on the wrapper's props for events, or manage them in your React state. Then let the wrapper handle re-parsing.



Compatibility with SSR Frameworks (Next.js, Remix)
--------------

{{note The ReactScheduler is SSR-ready. You can import it in Next.js or Remix without turning SSR off. }}

{{note During the server rendering, the component outputs only a placeholder `<div>`, the actual Scheduler markup is created during the browser-side hydration phase.}}

#### Next.js


The wrapper already contains a top-level "use client" directive, so you do **not** need dynamic import and can import ReactScheduler directly:

~~~js
import "@dhx/react-scheduler/dist/react-scheduler.css";
import ReactScheduler from '@dhx/react-scheduler';

export default function SchedulerPage() {
  return (
    <div style={ { height: '100vh' } }>
      <ReactScheduler events={/* ... */} />
    </div>
  );
}
~~~


#### Remix

No `<ClientOnly>` wrapper is required for the library in Remix env:

~~~js

import "@dhx/react-scheduler/dist/react-scheduler.css";
import ReactScheduler from '@dhx/react-scheduler';

export default function SchedulerPage() {
  return (
    <div style={ { height: '100vh' } }>
      <ReactScheduler events={/* ... */} />
    </div>
  );
}
~~~

Next Steps
-------------------

- For advanced use see [DHTMLX Scheduler documentation](guides.md) 