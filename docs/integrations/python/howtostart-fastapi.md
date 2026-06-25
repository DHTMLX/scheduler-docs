---
title: "dhtmlxScheduler with FastAPI"
sidebar_label: "FastAPI"
---

# dhtmlxScheduler with FastAPI

The current tutorial is intended for creating Scheduler with a Python/FastAPI backend and a React frontend.
If you use some other technology, check the list of available integration variants below:

- [dhtmlxScheduler with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler with PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler with PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler with SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler with Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler with dhtmlxConnector](integrations/other/howtostart-connector.md)

The implementation is built around a REST API exposed by [FastAPI](https://fastapi.tiangolo.com/), with [SQLAlchemy](https://www.sqlalchemy.org/) as the ORM and SQLite as the data store. The frontend is a Vite + React + TypeScript app that uses the [DHTMLX React Scheduler](integrations/react/installation.md) wrapper.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-fastapi-demo).
:::

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm or yarn

The tutorial assumes the project is split into two folders:

~~~
project/
├── backend/    # FastAPI app
└── frontend/   # Vite + React app
~~~

## Step 1. Initializing the backend

Create a `backend` folder, set up a virtual environment, and install the Python dependencies:

~~~
$ mkdir backend
$ cd backend
$ python -m venv venv
# macOS / Linux:
$ source venv/bin/activate
# Windows (PowerShell):
$ venv\Scripts\Activate.ps1
$ pip install fastapi "uvicorn[standard]" "sqlalchemy>=2" "pydantic>=2"
~~~

For a reproducible install, drop those dependencies into a `backend/requirements.txt`:

~~~ title="backend/requirements.txt"
fastapi>=0.110,<1.0
uvicorn[standard]>=0.27,<1.0
sqlalchemy>=2.0,<3.0
pydantic>=2.5,<3.0
~~~

Then create the application package:

~~~
$ mkdir app
$ touch app/__init__.py app/main.py app/models.py app/schemas.py app/database.py
~~~

## Step 2. Database model

Define a single `Event` table that holds both standalone and recurring events. The recurring fields (`rrule`, `duration`, `recurring_event_id`, `original_start`, `deleted`) follow the [scheduler recurring events server protocol](guides/recurring-events.md):

~~~python title="backend/app/models.py"
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    rrule = Column(String)
    duration = Column(Integer)
    recurring_event_id = Column(Integer)
    original_start = Column(DateTime)
    deleted = Column(Boolean, default=False)
~~~

## Step 3. Pydantic schemas

Pydantic v2 models validate incoming JSON and serialize responses. `EventBase` carries the shared field set; `EventCreate` and `EventUpdate` are used for request bodies; `EventResponse` is the response shape:

~~~python title="backend/app/schemas.py"
from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class EventBase(BaseModel):
    text: str
    start_date: datetime
    end_date: datetime
    rrule: Optional[str] = None
    duration: Optional[int] = None
    recurring_event_id: Optional[int] = None
    original_start: Optional[datetime] = None
    deleted: Optional[bool] = False


class EventCreate(EventBase):
    pass


class EventUpdate(EventBase):
    pass


class Event(EventBase):
    id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class EventResponse(Event):
    id: int
~~~

## Step 4. Database setup

Configure the engine, session factory, and a `get_db` dependency that yields a scoped session per request. SQLite is a no-setup default - switch the URL to PostgreSQL or MySQL once you outgrow it:

~~~python title="backend/app/database.py"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./events.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
~~~

## Step 5. FastAPI app and CRUD endpoints

The `lifespan` context manager runs `Base.metadata.create_all(...)` once on startup, so the SQLite file is created automatically the first time you start the server. CORS is opened only for the Vite dev server.

The endpoints map directly onto Scheduler's DataProcessor protocol - the response shapes (`{"action": "inserted", "tid": id}` etc.) are what the client expects:

~~~python title="backend/app/main.py"
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from contextlib import asynccontextmanager

from .database import get_db
from .models import Event as EventModel
from .schemas import EventCreate, EventUpdate, EventResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    from .database import engine
    from .models import Base
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="DHX Scheduler API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/events", response_model=List[EventResponse])
async def load_events(db: Session = Depends(get_db)):
    return db.query(EventModel).all()


@app.post("/api/events")
async def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = EventModel(**event.model_dump(exclude={"id"}))
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return {"action": "inserted", "tid": db_event.id}


@app.put("/api/events/{event_id}")
async def update_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db)):
    db_event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    for field, value in event.model_dump(exclude_unset=True).items():
        setattr(db_event, field, value)

    db.commit()
    return {"action": "updated"}


@app.delete("/api/events/{event_id}")
async def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(db_event)
    db.commit()
    return {"action": "deleted"}
~~~

The endpoints in summary:

| HTTP method | Endpoint                 | Purpose                | Response                              |
| ----------- | ------------------------ | ---------------------- | ------------------------------------- |
| `GET`       | `/api/events`            | Load all events        | `List[EventResponse]`                 |
| `POST`      | `/api/events`            | Create a new event     | `{"action": "inserted", "tid": id}`   |
| `PUT`       | `/api/events/{event_id}` | Update an event        | `{"action": "updated"}`               |
| `DELETE`    | `/api/events/{event_id}` | Delete an event        | `{"action": "deleted"}`               |

## Step 6. Running the backend

With the virtual environment activated:

~~~
$ python -m uvicorn app.main:app --reload --port 8000
~~~

The API listens on `http://localhost:8000`. The interactive OpenAPI UI is at `http://localhost:8000/docs` - handy for poking at the endpoints before the frontend exists.

## Step 7. Initializing the frontend

Scaffold a Vite + React + TypeScript project alongside the backend folder:

~~~
$ npx create-vite@latest frontend --template react-ts
$ cd frontend
$ npm install
~~~

Install the React Scheduler. This tutorial uses the evaluation package; for a full walkthrough including the Professional package see the [installation guide](integrations/react/installation.md):

~~~
$ npm install @dhtmlx/trial-react-scheduler
~~~

Configure the Vite dev server to proxy `/api` to FastAPI so requests stay same-origin during development:

~~~ts title="frontend/vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
~~~

## Step 8. Scheduler component

Create a `Scheduler` component that points the wrapper's `data` prop at the proxied `/api/events` endpoint. The same URL is used for both load (`GET`) and saves (`POST`/`PUT`/`DELETE` via DataProcessor) - the wrapper takes care of the verb selection:

~~~tsx title="frontend/src/components/Scheduler.tsx"
import { useMemo } from "react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

function Scheduler() {
  const config = useMemo(() => ({
    first_hour: 6,
    last_hour: 22,
  }), []);

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        data={{
          load: "/api/events",
          save: "/api/events",
        }}
        view="week"
        date={new Date()}
        config={config}
      />
    </div>
  );
}

export default Scheduler;
~~~

Wire it into `App.tsx`:

~~~tsx title="frontend/src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

So the Scheduler container fills the viewport, replace the Vite scaffold's `App.css` with:

~~~css title="frontend/src/App.css"
#root,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Step 9. Running the demo

In one terminal, run the backend (from `backend/`, with the venv active):

~~~
$ python -m uvicorn app.main:app --reload --port 8000
~~~

In another, the frontend (from `frontend/`):

~~~
$ npm run dev
~~~

Open the printed URL - by default `http://localhost:5173`. Create, drag, resize, and delete events; reload the page to confirm they round-trip through SQLite.

## Step 10. Recurring events (optional)

Recurring events ("repeat daily", "repeat weekly until…") are an opt-in [scheduler plugin](guides/recurring-events.md). The model in Step 2 already includes the recurring columns, so enabling it is mostly a frontend toggle plus three additional cases in the CRUD handlers.

### Enable the plugin on the frontend

~~~tsx title="frontend/src/components/Scheduler.tsx"
const plugins = useMemo(() => ({
  recurring: true,
}), []);

// ...
<ReactScheduler
  plugins={plugins}
  // ...other props
/>
~~~

### Adjust `create_event`

Deleting a single occurrence of a recurring series isn't a `DELETE` - the client calls `POST` with `deleted: true` to insert a "shadow" exception row. Surface that as the `deleted` action so DataProcessor reconciles correctly:

~~~python title="backend/app/main.py"
@app.post("/api/events")
async def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = EventModel(**event.model_dump(exclude={"id"}))
    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    action = "deleted" if event.deleted else "inserted"
    return {"action": action, "tid": db_event.id}
~~~

### Adjust `update_event`

When the parent series is edited (it has an `rrule` and no `recurring_event_id`), discard any modified-occurrence rows that pointed at the old series - they're stale relative to the new schedule:

~~~python title="backend/app/main.py"
@app.put("/api/events/{event_id}")
async def update_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db)):
    db_event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.rrule and not event.recurring_event_id:
        db.query(EventModel).filter(EventModel.recurring_event_id == event_id).delete()

    for field, value in event.model_dump(exclude_unset=True).items():
        setattr(db_event, field, value)

    db.commit()
    return {"action": "updated"}
~~~

### Adjust `delete_event`

Two special cases here:

- Deleting a *modified* occurrence (it has a `recurring_event_id`) shouldn't remove the row - flip its `deleted` flag so the scheduler skips it.
- Deleting a *whole series* should also wipe any modified occurrences attached to that series.

~~~python title="backend/app/main.py"
@app.delete("/api/events/{event_id}")
async def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")

    if db_event.recurring_event_id:
        db_event.deleted = True
    else:
        if db_event.rrule:
            db.query(EventModel).filter(EventModel.recurring_event_id == event_id).delete()
        db.delete(db_event)

    db.commit()
    return {"action": "deleted"}
~~~

## Trouble shooting

If the Scheduler renders but events don't appear, walk through the [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) guide - most issues come down to URL/proxy mismatches or response shape.

## What's next

You now have a working DHTMLX React Scheduler talking to a FastAPI backend. The full code is on [GitHub](https://github.com/DHTMLX/react-scheduler-fastapi-demo).

You can also explore [scheduler feature guides](/guides/) or tutorials on [other backend frameworks](integrations/howtostart-guides.md).
