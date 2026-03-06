---
title: "Two-way sync with Google Calendar (Node.js)"
sidebar_label: "Two-way sync (Node.js)"
description: "Implement a Node.js + Express integration that syncs DHTMLX Scheduler events with Google Calendar using OAuth 2.0 and Google Calendar API v3."
---

# DHTMLX Scheduler: Two-way sync with Google Calendar (Node.js)

In this guide, you will implement **two-way sync** between **DHTMLX Scheduler** and **Google Calendar** in a small Node.js app:

- Load calendars and events from Google Calendar into Scheduler
- Push Scheduler create/update/delete operations back to Google Calendar

:::note
This approach implements **two-way sync via API calls** (Scheduler → backend → Google Calendar). It does **not** implement real-time Google → Scheduler push updates (webhooks). If you change events directly in Google Calendar, reload the app (or reload a date range) to see the updated data in Scheduler.
:::

You will build:

- a Node.js + Express backend with Google OAuth 2.0 ([Passport](https://www.npmjs.com/package/passport)) and a small REST API for Scheduler
- an event mapping layer (Google ↔ Scheduler), including basic recurring events/exceptions handling
- a Scheduler client wired to the backend via `scheduler.createDataProcessor()`

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-google-calendar-demo).
:::

## Prerequisites

- Node.js 18+
- A Google account with access to Google Cloud Console
- Basic familiarity with TypeScript and Express
- Access to DHTMLX Scheduler packages (the example uses `@dhx/trial-scheduler`)

## Demo repository

A complete working project that matches this guide is available on GitHub:
- https://github.com/dhtmlx/scheduler-google-auth-demo

The guide explains the key steps and shows the integration code that matters. The repository is the "full runnable reference".

## Project setup

In this section you will prepare Google OAuth credentials, configure the project, and run the app locally.

### 1) Get the project code

Do one of the following:

- Clone the repository:

~~~bash title="Terminal"
git clone https://github.com/dhtmlx/scheduler-google-auth-demo.git
cd scheduler-google-auth-demo
~~~

If your project installs `@dhx/*` packages from the private registry, configure npm:

~~~bash title="Terminal"
npm config set @dhx:registry https://npm.dhtmlx.com
~~~

### 2) Configure Google Cloud (OAuth 2.0)

In this step you will create OAuth credentials that the backend uses to access Google Calendar on behalf of a user.

> The guide uses OAuth in **Testing** mode (recommended for development). In this mode, only users listed as **Test users** can authorize the app.

#### 2.1 Create or select a Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Select an existing project or create a new one.

#### 2.2 Enable Google Calendar API

1. Go to **APIs & Services → Library**.
2. Search for **Google Calendar API**.
3. Click **Enable**.

#### 2.3 Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**.
2. Choose **External** (typical for consumer Google accounts), then click **Create**.
3. Fill in the required fields:
   - **App name**
   - **User support email**
   - **Developer contact email**
4. Set **Publishing status** to **Testing**.
5. Add **Test users**:
   - Add the Google accounts you will use to sign in while developing/testing.

:::note
If you skip test users in **Testing** mode, Google will block authorization for accounts that are not explicitly added.
:::

#### 2.4 Create OAuth client credentials

1. Go to **APIs & Services → Credentials**.
2. Click **Create credentials → OAuth client ID**.
3. Application type: **Web application**.
4. Add this **Authorized JavaScript origin**:

~~~text title="JavaScript origin"
http://localhost:3000
~~~

5. Add this **Authorized redirect URI**:

~~~text title="Redirect URI"
http://localhost:3000/auth/google/callback
~~~

6. Save and copy:
   - **Client ID**
   - **Client Secret**

#### 2.5 Scope used by this integration

The backend requests Google Calendar access via:

- `https://www.googleapis.com/auth/calendar`

This scope is sufficient for listing calendars and performing event CRUD operations.

### 3) Configure environment variables

In this step you will provide OAuth credentials and session settings to the backend.

Copy `.env.example` to `.env`, then fill in the values:

~~~ini title=".env"
GOOGLE_CLIENT_ID=<Client ID from the previous steps>
GOOGLE_CLIENT_SECRET=<Client Secret from the previous steps>
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
SESSION_SECRET=some-long-random-string
PORT=3000
~~~

### 4) Install dependencies and run

~~~bash title="Terminal"
npm install
npm run start
~~~

Open:

~~~text title="App URL"
http://localhost:3000
~~~

At this point you should be able to click **Add Google Calendars**, sign in, and see Scheduler populated with events.

---

## Implementation

The rest of the guide explains how the integration is put together. If you are adapting this to an existing app, treat each section below as an implementation milestone.

## Step 1 - Split responsibilities (backend vs client)

In this step you will separate responsibilities so Scheduler stays a UI component and the backend owns OAuth + Google API calls.

A typical structure:

~~~text title="Project structure"
scheduler-google-auth-demo/
  client/
    index.ejs
    main.ts
    styles.css
  server/
    config/
      index.ts
      passport.ts
    routes/
      auth.route.ts
      events.route.ts
    services/
      googleService.ts
    mappers/
      eventMapper.ts
  rollup.config.js
  package.json
  .env.example
~~~

- **server/**: OAuth, token storage (in session), Google Calendar API calls, and REST endpoints for Scheduler
- **client/**: Scheduler init + loading, and [DataProcessor](guides/server-integration.md) that forwards CRUD actions to the server

## Step 2 - Implement Google OAuth (Express session + Passport)

In this step you will make the backend able to authenticate a user and store Google access/refresh tokens.

### 2.1 Bootstrap the server (sessions + passport)

Update `server/index.ts` to enable sessions and passport, then mount your routes.

Below is the core wiring (only the relevant parts are shown):

~~~ts title="server/index.ts"
app.use(
  session({
    secret: config.SESSION_SECRET || "fallback-secret-for-dev",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/events", (req, res, next) => {
  req.isAuthenticated() ? next() : res.status(401).json({ error: "Not authenticated" });
}, eventsRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.render("index", { googleAuth: req.isAuthenticated() });
});
~~~

The inline middleware on `/events` ensures unauthenticated requests receive a `401` response instead of crashing the server when route handlers cast `req` to `AuthenticatedRequest`.

### 2.2 Configure the Google strategy

Update `server/config/passport.ts` to register `passport-google-oauth20`.

The key idea: keep `accessToken` and `refreshToken` on the user object stored in the session:

~~~ts title="server/config/passport.ts"
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID || "",
      clientSecret: config.GOOGLE_CLIENT_SECRET || "",
      callbackURL: config.GOOGLE_REDIRECT_URI || "",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        tokens: { accessToken, refreshToken },
      };
      done(null, user as unknown as Express.User);
    }
  )
);
~~~

:::note
Production apps usually persist tokens per user in a database and implement refresh token rotation/revocation. This example keeps tokens in-session to keep the flow easy to follow.
:::

### 2.3 Add OAuth routes

Update `server/routes/auth.route.ts` to expose the OAuth entry point, callback, and logout:

~~~ts title="server/routes/auth.route.ts"
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_req, res) => res.redirect("/")
);

router.get("/google/logout", (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect("/")));
});
~~~

At this point you should be able to hit `/auth/google`, complete the Google consent screen, and return to `/` with an authenticated session.

### Create the Google Calendar service layer

Create `server/services/googleService.ts` to wrap Google Calendar API v3 CRUD methods. It creates an OAuth2 client from the session tokens and exposes helpers for listing calendars, listing events, and creating/updating/deleting events:

~~~ts title="server/services/googleService.ts"
import { google, calendar_v3 } from "googleapis";
import type { GoogleOAuthTokens } from "../types/auth.types.ts";
import config from "../config/index.ts";

const calendarClient = google.calendar("v3");

function oauthClient(tokens: GoogleOAuthTokens) {
  const client = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    config.GOOGLE_REDIRECT_URI
  );
  client.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });
  return client;
}

/* ------ CRUD helpers ------- */

export async function listCalendars(tokens: GoogleOAuthTokens): Promise<calendar_v3.Schema$CalendarListEntry[]> {
  const { data } = await calendarClient.calendarList.list({ auth: oauthClient(tokens) });
  return data.items ?? [];
}

export async function listEvents(
  tokens: GoogleOAuthTokens,
  opts: calendar_v3.Params$Resource$Events$List
): Promise<calendar_v3.Schema$Event[]> {
  const { data } = await calendarClient.events.list({
    auth: oauthClient(tokens),
    ...opts,
  });
  return data.items ?? [];
}

export async function createEvent(
  tokens: GoogleOAuthTokens,
  calendarId: string | undefined,
  gEvent: calendar_v3.Schema$Event
): Promise<calendar_v3.Schema$Event> {
  const { data } = await calendarClient.events.insert({
    auth: oauthClient(tokens),
    calendarId: calendarId || "primary",
    requestBody: gEvent,
    conferenceDataVersion: 1,
  });
  return data;
}

export async function updateEvent(
  tokens: GoogleOAuthTokens,
  calendarId: string | undefined,
  eventId: string,
  gPatch: calendar_v3.Schema$Event
): Promise<calendar_v3.Schema$Event> {
  const { data } = await calendarClient.events.patch({
    auth: oauthClient(tokens),
    calendarId: calendarId || "primary",
    eventId,
    requestBody: gPatch,
  });
  return data;
}

export async function deleteEvent(
  tokens: GoogleOAuthTokens,
  calendarId: string | undefined,
  eventId: string
): Promise<void> {
  await calendarClient.events.delete({
    auth: oauthClient(tokens),
    calendarId: calendarId || "primary",
    eventId,
  });
}
~~~

## Step 3 - Expose a REST API for Scheduler CRUD

In this step you will implement the API contract Scheduler uses:

- `GET /events` - load calendars + events
- `POST /events` - create
- `PUT /events/:eventId` - update
- `DELETE /events/:eventId` - delete

### 3.1 Load calendars + events (GET /events)

Update `server/routes/events.route.ts` to return:


- `data` containing Scheduler-style events
- `collections.calendars` containing list of calendars that will be [available on the client](guides/loading-data.md#collections)

Below is a working example handler:

~~~ts title="server/routes/events.route.ts"
router.get("/", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;

  try {
    const calendars = await googleService.listCalendars(authedReq.user.tokens);

    const mappedCals = calendars
      .filter((calendar) => Boolean(calendar.id))
      .map((calendar) => ({
        id: calendar.id as string,
        key: calendar.id as string,
        label: calendar.summary ?? "",
        backgroundColor: calendar.backgroundColor ?? undefined,
      }));

    const fromQuery = typeof req.query.from === "string" ? req.query.from : undefined;
    const toQuery = typeof req.query.to === "string" ? req.query.to : undefined;

    const minDate = fromQuery ? new Date(fromQuery).toISOString() : new Date().toISOString();
    const maxDate = toQuery ? new Date(toQuery).toISOString() : undefined;

    const googleEvents = await Promise.all(
      mappedCals.map(async (calendar) => {
        const params: calendar_v3.Params$Resource$Events$List = { calendarId: calendar.id, timeMin: minDate };
        if (maxDate) params.timeMax = maxDate;

        const calendarEventsResponse = await googleService.listEvents(authedReq.user.tokens, params);

        return (calendarEventsResponse as Array<Record<string, unknown>>).map((event) =>
          toDhxEvent(event as calendar_v3.Schema$Event, calendar)
        );
      })
    );

    res.json({
      success: true,
      data: googleEvents.flat(),
      collections: { calendars: mappedCals },
    });
  } catch (error) {
    next(error);
  }
});
~~~

Related docs: [Loading data](guides/loading-data.md#collections).

### 3.2 Forward CRUD operations to Google Calendar

Update the same route module to handle create/update/delete.

Create:

~~~ts title="server/routes/events.route.ts"
router.post("/", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  try {
    const gEvent = await googleService.createEvent(
      authedReq.user.tokens,
      calendarId,
      toGoogleEventPayload(req.body)
    );

    res.status(201).json({ action: "inserted", tid: gEvent.id });
  } catch (error) {
    next(error);
  }
});
~~~

Update:

~~~ts title="server/routes/events.route.ts"
router.put("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  try {
    const gEvent = await googleService.updateEvent(
      authedReq.user.tokens,
      calendarId,
      req.params.eventId as string,
      toGoogleEventPayload(req.body)
    );

    res.json({ action: "updated", tid: gEvent.id });
  } catch (error) {
    next(error);
  }
});
~~~

Delete:

~~~ts title="server/routes/events.route.ts"
router.delete("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  // If this is an exception occurrence (id contains "_"), there is nothing to delete on Google side.
  // Google Calendar removes occurrences when deleting the main recurring event.
  const dhxId = req.body?.id as string | undefined;
  if (typeof dhxId === "string" && dhxId.indexOf("_") > -1) {
    res.json({ action: "deleted" });
    return;
  }

  try {
    await googleService.deleteEvent(authedReq.user.tokens, calendarId, req.params.eventId as string);
    res.json({ action: "deleted" });
  } catch (error) {
    next(error);
  }
});
~~~

At this point Scheduler can load `/events`, and basic CRUD can be wired on the client.

## Step 4 - Map Google events to Scheduler events (and back)

In this step you will implement a mapper that converts between:

- Google event fields (`start.dateTime` / `start.date`, `recurrence`, etc.)
- Scheduler event fields (`start_date`, `end_date`, `rrule`, etc.)

### Key differences you must handle

1) **All-day vs timed events**
- Google: all-day uses `start.date` / `end.date`
- Google: timed uses `start.dateTime` / `end.dateTime` and may include `timeZone`
- Scheduler: uses `start_date` / `end_date` (Date objects)

2) **Recurrence rules**
- Google stores recurrence as array strings with `RRULE:` prefix
- Scheduler uses `rrule` without the prefix

3) **Recurring series end date**
- Scheduler expects an `end_date` for recurring series.
- Google may use `UNTIL=` in RRULE, or no UNTIL (infinite series).

Related docs: [Recurring events](guides/recurring-events.md).

### Google → Scheduler

Update `server/mappers/eventMapper.ts` to map the Google event shape into Scheduler's event shape (excerpt below; keep helper functions like `calculateEndDate()` in the same module):

~~~ts title="server/mappers/eventMapper.ts"
import moment from "moment-timezone";
import type { DhxEvent, MappedCalendar } from "../types/types.ts";
import type { calendar_v3 } from "googleapis";

export function toDhxEvent(gEvent: calendar_v3.Schema$Event, calendar: MappedCalendar): DhxEvent {
  const ev: DhxEvent = {
    id: gEvent.id as string,
    text: gEvent.summary ?? "",
    details: gEvent.description ?? "",
    calendarId: calendar.id,
    calendarLabel: calendar.label,
    timeZone: gEvent.start?.timeZone,
    recurring_event_id: gEvent.recurringEventId,
    status: gEvent.status,
    deleted: gEvent.status === "cancelled",
  };

  const start = gEvent.start;
  const end = gEvent.end;

  // Non-recurring
  if (start?.dateTime && end?.dateTime && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.dateTime);
    ev.end_date = new Date(end.dateTime);
  } else if (start?.date && end?.date && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.date + "T00:00:00");
    ev.end_date = new Date(end.date + "T00:00:00");
  }

  // Recurring
  if (gEvent.recurrence?.length) {
    ev.rrule = String(gEvent.recurrence[0]).replace("RRULE:", "");

    if (start?.dateTime && end?.dateTime) {
      ev.start_date = new Date(start.dateTime);
      ev.duration = (new Date(end.dateTime).getTime() - ev.start_date.getTime()) / 1000;
    } else if (start?.date && end?.date) {
      ev.start_date = new Date(start.date + "T00:00:00");
      ev.duration = (new Date(end.date).getTime() - ev.start_date.getTime()) / 1000;
    }

    ev.end_date = calculateEndDate(gEvent);
  }

  // Exceptions: original start time
  if (gEvent.originalStartTime?.dateTime) {
    ev.original_start = new Date(gEvent.originalStartTime.dateTime);
  }

  return ev;
}
~~~

### `calculateEndDate()` helper

Extracts the `UNTIL` date from a Google recurrence rule, or returns a far-future date for infinite series. Scheduler expects an `end_date` on recurring events, so this helper provides one:

~~~ts title="server/mappers/eventMapper.ts"
// convert UNTIL=20260129T205959Z -> '2026-01-29T20:59:59Z' if it exists
// if there is no UNTIL -> event repeat infinitely -> return '9999-02-01T00:00:00Z'
function calculateEndDate(gEvent: calendar_v3.Schema$Event): Date {
  const until = String(gEvent.recurrence?.[0] ?? "").match(/RRULE:.*?UNTIL=([^;]+)/)?.[1];

  return until
    ? new Date(
        until.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})Z$/, "$1-$2-$3T$4:$5:$6Z")
      )
    : new Date(9999, 1, 1);
}
~~~

### Scheduler → Google

Update the mapper to convert Scheduler event fields back into Google's schema:

~~~ts title="server/mappers/eventMapper.ts"
export function toGoogleEventPayload(dhx: DhxEvent): calendar_v3.Schema$Event {
  const gEvent: calendar_v3.Schema$Event = {
    summary: dhx.text,
    description: dhx.details ?? "",
  };

  const tz = dhx.timeZone || "UTC";

  if (dhx.start_date && dhx.end_date) {
    const isAllDay =
      dhx.duration === 24 * 60 * 60 ||
      new Date(dhx.end_date).getTime() - new Date(dhx.start_date).getTime() === 24 * 60 * 60 * 1000;

    // Recurring
    if (dhx.rrule && dhx.duration) {
      gEvent.recurrence = ["RRULE:" + dhx.rrule];

      if (isAllDay) {
        gEvent.start = { date: moment(dhx.start_date).format("YYYY-MM-DD") };
        gEvent.end = { date: moment(dhx.start_date).add(1, "day").format("YYYY-MM-DD") };
      } else {
        gEvent.start = {
          dateTime: moment(new Date(dhx.start_date).toISOString()).tz(tz).format("YYYY-MM-DDTHH:mm:ssZZ"),
          timeZone: tz,
        };

        const endDate = new Date(new Date(dhx.start_date).getTime() + dhx.duration * 1000).toISOString();
        gEvent.end = {
          dateTime: moment(endDate).tz(tz).format("YYYY-MM-DDTHH:mm:ssZZ"),
          timeZone: tz,
        };
      }
    } else {
      // Non-recurring
      if (isAllDay) {
        gEvent.start = { date: moment(dhx.start_date).format("YYYY-MM-DD") };
        gEvent.end = { date: moment(dhx.start_date).add(1, "day").format("YYYY-MM-DD") };
      } else {
        gEvent.start = {
          dateTime: moment(new Date(dhx.start_date).toISOString()).tz(tz).format("YYYY-MM-DDTHH:mm:ssZZ"),
          timeZone: tz,
        };
        gEvent.end = {
          dateTime: moment(new Date(dhx.end_date).toISOString()).tz(tz).format("YYYY-MM-DDTHH:mm:ssZZ"),
          timeZone: tz,
        };
      }
    }

    // Recurring exceptions support
    if (dhx.recurring_event_id) {
      gEvent.recurringEventId = dhx.recurring_event_id.toString();
    }
    if (dhx.original_start) {
      gEvent.originalStartTime = {
        dateTime: moment(new Date(dhx.original_start).toISOString()).tz(tz).format("YYYY-MM-DDTHH:mm:ssZZ"),
        timeZone: tz,
      };
    }
    if (dhx.deleted) {
      gEvent.status = "cancelled";
    }
  }

  return gEvent;
}
~~~

## Step 5 - Wire Scheduler to the backend (load + CRUD)

In this step you will initialize Scheduler, load data from `GET /events`, and send CRUD operations to the backend via DataProcessor.

### 5.1 Render a different UI for "authorized vs not authorized"

Update `client/index.ejs` to expose an authorization flag to the client:

~~~html title="client/index.ejs"
<script>
  const GOOGLE_AUTHORIZED = <%= !!googleAuth %>;
</script>
~~~

### 5.2 Initialize Scheduler and load events

Update `client/main.ts` to initialize Scheduler and load data once the user is authorized.

Only the relevant part is shown:

~~~ts title="client/main.ts"
scheduler.plugins({ recurring: true });
scheduler.config.header = ["day", "week", "month", "date", "prev", "today", "next"];

scheduler.init("scheduler_here", new Date(), "week");
scheduler.setLoadMode("week");

if (GOOGLE_AUTHORIZED) {
  scheduler.load("/events");
} else {
  window.alert("You must authorize Google Calendar to use this app.");
}
~~~

### 5.3 Enable two-way sync with DataProcessor

Update `client/main.ts` to forward Scheduler CRUD actions to the server.

~~~ts title="client/main.ts"
scheduler.createDataProcessor(async (entity, action, data, id) => {
  const calendars = scheduler.serverList("calendars") as MappedCalendar[];

  // Demo simplification: send everything into the first available calendar.
  // In a real app, let users choose a target calendar.
  data.calendarId = calendars[0]?.id;

  // Provide client timezone so the server can generate correct dateTime values.
  data.timeZone = momentTz.tz.guess();

  return fetchEvent(action, data, id);
});

async function fetchEvent(action, data, id) {
  const requestConfigs = {
    create: ["POST", "events/", data],
    update: ["PUT", `events/${id}`, data],
    delete: ["DELETE", `events/${id}`, data],
  };

  const [method, url, payload] = requestConfigs[action];

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return response.json();
}
~~~

Related docs: [DataProcessor](guides/server-integration.md#technique).

At this point:

- events from Google Calendar should appear in Scheduler after authorization
- creating/updating/deleting in Scheduler should update Google Calendar

---

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- **Cause:** The redirect URI in Google Cloud credentials does not match your app callback URL.
- **Fix:** Ensure the Authorized redirect URI is exactly:
  - `http://localhost:3000/auth/google/callback`

### "Access blocked: app has not completed the Google verification process"
- **Cause:** Consent screen is not in Testing mode or you are not listed as a test user.
- **Fix:** Set Publishing status to **Testing** and add your account in **Test users**.

### "No refresh token returned"
- **Cause:** Google may return a refresh token only the first time the user consents for a given client ID.
- **Fix:** Ensure your auth request includes `accessType: "offline"` and `prompt: "consent"`. If you already authorized before, revoke access in Google Account permissions and authorize again.

## Summary

You implemented two-way sync between Scheduler and Google Calendar:

- The backend authenticates users via Google OAuth 2.0 and stores tokens in the session
- Scheduler loads calendars and events through `GET /events`
- Scheduler CRUD operations are forwarded to Google Calendar via `POST/PUT/DELETE /events`
- A mapper converts timed/all-day and recurring events between Google Calendar and Scheduler

## Demo repository link

Full working source:

- https://github.com/DHTMLX/scheduler-google-calendar-demo