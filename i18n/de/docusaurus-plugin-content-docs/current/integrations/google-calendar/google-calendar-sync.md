---
title: "Zweiseitige Synchronisierung mit Google Calendar (Node.js)"
sidebar_label: "Google Kalender"
description: "Implementieren Sie eine Node.js + Express-Integration, die DHTMLX Scheduler-Ereignisse mit dem Google Calendar unter Verwendung von OAuth 2.0 und Google Calendar API v3 synchronisiert."
---

# DHTMLX Scheduler: Zweiseitige Synchronisierung mit Google Calendar (Node.js)

In diesem Leitfaden implementieren Sie eine **zweiseitige Synchronisierung** zwischen dem **DHTMLX Scheduler** und **Google Calendar** in einer kleinen Node.js-Anwendung:

- Kalender und Ereignisse aus Google Calendar in Scheduler laden
- Scheduler-Erstellungs-/Update-/Lösch-Operationen zurück an Google Calendar senden

:::note
Dieser Ansatz implementiert eine **Zweiseitige Synchronisierung über API-Aufrufe** (Scheduler → Backend → Google Calendar). Er implementiert **keine Echtzeit-Updates von Google → Scheduler per Push (Webhooks)**. Wenn Sie Ereignisse direkt in Google Calendar ändern, laden Sie die App neu (oder laden Sie einen Datumsbereich neu), um die aktualisierten Daten in Scheduler zu sehen.
:::

Sie werden Folgendes erstellen:

- ein Node.js + Express-Backend mit Google OAuth 2.0 ([Passport](https://www.npmjs.com/package/passport)) und einer kleinen REST-API für Scheduler
- eine Ereignis-Mapping-Schicht (Google ↔ Scheduler), einschließlich grundlegender Verarbeitung von wiederkehrenden Ereignissen/Ausnahmen
- einen Scheduler-Client, der über `scheduler.createDataProcessor()` mit dem Backend verbunden ist

:::note
Der vollständige Quellcode ist auf GitHub verfügbar: [https://github.com/DHTMLX/scheduler-google-calendar-demo](https://github.com/DHTMLX/scheduler-google-calendar-demo)
:::

## Voraussetzungen

- Node.js 18+
- Ein Google-Konto mit Zugriff zur Google Cloud Console
- Grundkenntnisse in TypeScript und Express
- Zugriff auf DHTMLX Scheduler-Pakete (das Beispiel verwendet `@dhx/trial-scheduler`)

## Demo-Repository

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung entspricht, ist auf GitHub verfügbar:
- https://github.com/dhtmlx/scheduler-google-auth-demo

Die Anleitung erläutert die wichtigsten Schritte und zeigt den relevanten Integrationscode. Das Repository ist die „voll funktionsfähige Referenz“.

## Projektsetup

In diesem Abschnitt bereiten Sie Google OAuth-Zugangsdaten vor, konfigurieren das Projekt und führen die App lokal aus.

### 1) Projektcode beziehen

Führen Sie eine der folgenden Optionen aus:

- Das Repository klonen:

~~~bash title="Terminal"
git clone https://github.com/dhtmlx/scheduler-google-auth-demo.git
cd scheduler-google-auth-demo
~~~

Wenn Ihr Projekt `@dhx/*`-Pakete aus dem privaten Registry installiert, konfigurieren Sie npm:

~~~bash title="Terminal"
npm config set @dhx:registry https://npm.dhtmlx.com
~~~

### 2) Google Cloud (OAuth 2.0) konfigurieren

In diesem Schritt erstellen Sie OAuth-Anmeldeinformationen, die das Backend verwenden kann, um im Namen eines Benutzers auf Google Calendar zuzugreifen.

> Die Anleitung verwendet OAuth im **Testing**-Modus (empfohlen für die Entwicklung). In diesem Modus können sich nur Benutzer autorisieren, die als **Testnutzer** aufgeführt sind.

#### 2.1 Google Cloud-Projekt erstellen oder auswählen

1. Öffnen Sie [Google Cloud Console](https://console.cloud.google.com/).
2. Wählen Sie ein vorhandenes Projekt aus oder erstellen Sie ein neues.

#### 2.2 Google Calendar API aktivieren

1. Gehen Sie zu **APIs & Services → Library**.
2. Suchen Sie nach **Google Calendar API**.
3. Klicken Sie auf **Enable**.

#### 2.3 OAuth-Einwilligungskscreen konfigurieren

1. Gehen Sie zu **APIs & Services → OAuth consent screen**.
2. Wählen Sie **External** (typisch für Verbraucher-Google-Konten) und klicken Sie auf **Create**.
3. Füllen Sie die erforderlichen Felder aus:
   - **App name**
   - **User support email**
   - **Developer contact email**
4. Setzen Sie **Publishing status** auf **Testing**.
5. Fügen Sie **Test users** hinzu:
   - Fügen Sie die Google-Konten hinzu, die Sie zum Sign-in während der Entwicklung/Tests verwenden werden.

:::note
Wenn Sie Testnutzer im **Testing**-Modus überspringen, blockiert Google die Autorisierung für Konten, die nicht explizit hinzugefügt wurden.
:::

#### 2.4 OAuth-Client-Anmeldeinformationen erstellen

1. Gehen Sie zu **APIs & Services → Credentials**.
2. Klicken Sie auf **Create credentials → OAuth client ID**.
3. Anwendungstyp: **Web application**.
4. Fügen Sie diesen **Authorized JavaScript origin** hinzu:

~~~text title="JavaScript origin"
http://localhost:3000
~~~

5. Fügen Sie diese **Authorized redirect URI** hinzu:

~~~text title="Redirect URI"
http://localhost:3000/auth/google/callback
~~~

6. Speichern und kopieren Sie:
   - **Client ID**
   - **Client Secret**

#### 2.5 Von dieser Integration verwendeter Bereich (Scope)

Der Backend verlangt Zugriff auf Google Calendar über:

- `https://www.googleapis.com/auth/calendar`

Dieser Bereich ist ausreichend zum Auflisten von Kalendern und zur Durchführung von CRUD-Operationen für Ereignisse.

### 3) Umgebungsvariablen konfigurieren

In diesem Schritt geben Sie OAuth-Anmeldeinformationen und Session-Einstellungen an das Backend weiter.

Kopieren Sie `.env.example` nach `.env` und füllen Sie die Werte aus:

~~~ini title=".env"
GOOGLE_CLIENT_ID=<Client ID aus den vorherigen Schritten>
GOOGLE_CLIENT_SECRET=<Client Secret aus den vorherigen Schritten>
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
SESSION_SECRET=ein-lang-wertvoller-zufälliger-string
PORT=3000
~~~

### 4) Abhängigkeiten installieren und starten

~~~bash title="Terminal"
npm install
npm run start
~~~

Öffnen Sie:

~~~text title="App URL"
http://localhost:3000
~~~

Zu diesem Zeitpunkt sollten Sie in der Lage sein, **Add Google Calendars** zu klicken, sich anzumelden und Scheduler mit Ereignissen gefüllt zu sehen.

---

## Implementierung

Der Rest des Leitfadens erläutert, wie die Integration zusammengesetzt wird. Wenn Sie dies auf eine vorhandene App anwenden, behandeln Sie jeden Abschnitt unten als Implementierungsmeilenstein.

## Schritt 1 - Verantwortlichkeiten trennen (Backend vs. Client)

In diesem Schritt trennen Sie die Verantwortlichkeiten, sodass Scheduler eine UI-Komponente bleibt und das Backend OAuth + Google-API-Aufrufe übernimmt.

Eine typische Struktur:

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

- **server/**: OAuth, Token-Speicherung (in der Session), Google Calendar API-Aufrufe und REST-Endpunkte für Scheduler
- **client/**: Scheduler-Initialisierung + Laden der Daten und [DataProcessor](guides/server-integration.md) zur Weiterleitung von CRUD-Aktionen an den Server

## Schritt 2 - Google OAuth (Express-Session + Passport) implementieren

In diesem Schritt machen Sie das Backend in der Lage, einen Benutzer zu authentifizieren und Google Access/Refresh Tokens zu speichern.

### 2.1 Server bootstrapen (Sessions + Passport)

Aktualisieren Sie `server/index.ts`, um Sessions und Passport zu aktivieren, und montieren Sie dann Ihre Routen.

Unten der zentrale Wiring-Ausschnitt (nur relevante Teile gezeigt):

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

Das Inline-Middleware auf `/events` stellt sicher, dass nicht-authentifizierte Anfragen eine `401`-Antwort erhalten statt den Server abstürzen zu lassen, wenn Route-Handler `req` in `AuthenticatedRequest` casten.

### 2.2 Google-Strategie konfigurieren

Aktualisieren Sie `server/config/passport.ts`, um `passport-google-oauth20` zu registrieren.

Wichtig: Bewahren Sie `accessToken` und `refreshToken` im User-Objekt, das in der Session gespeichert wird:

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
Produktionsanwendungen speichern Tokens typischerweise pro Benutzer in einer Datenbank und implementieren Token-Rotation/Revocation. Dieses Beispiel hält Tokens in der Session, um den Ablauf leicht nachvollziehbar zu halten.
:::

### 2.3 OAuth-Routen hinzufügen

Aktualisieren Sie `server/routes/auth.route.ts`, um den OAuth-Einstiegspunkt, Callback und Logout bereitzustellen:

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

An diesem Punkt sollten Sie in der Lage sein, `/auth/google` zu erreichen, das Google-Einwilligungsfenster abzuschließen und zu `/` mit einer authentifizierten Sitzung zurückzukehren.

###  Google Calendar-Service-Schicht erstellen

Erstellen Sie `server/services/googleService.ts`, um Google Calendar API v3 CRUD-Methoden zu kapseln. Es wird ein OAuth2-Client aus den Sitzungs-Tokens erstellt und Hilfsfunktionen zum Auflisten von Kalendern, Auflisten von Ereignissen sowie Erstellen/Aktualisieren/Löschen von Ereignissen bereitgestellt:

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

/* ------ CRUD-Helper ------- */

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

## Schritt 3 - REST-API für Scheduler CRUD freischalten

In diesem Schritt implementieren Sie den API-Vertrag, den Scheduler verwendet:

- `GET /events` – Kalender + Ereignisse laden
- `POST /events` – Erstellen
- `PUT /events/:eventId` – Aktualisieren
- `DELETE /events/:eventId` – Löschen

### 3.1 Kalender + Ereignisse laden (GET /events)

Aktualisieren Sie `server/routes/events.route.ts`, um Folgendes zurückzugeben:

- `data` mit Scheduler-ähnlichen Ereignissen
- `collections.calendars` mit der Liste der Kalender, die dem Client zur Verfügung stehen werden (siehe [Loading data](guides/loading-data.md#collections))

Unten ein funktionsfähiges Handler-Beispiel:

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

Verwandte Dokumente: [Loading data](guides/loading-data.md#collections).

### 3.2 Forward CRUD-Operationen an Google Calendar

Aktualisieren Sie dieselbe Route-Modul, um Create/Update/Delete abzuwickeln.

Erstellen:

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

Aktualisieren:

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

Löschen:

~~~ts title="server/routes/events.route.ts"
router.delete("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  // Falls dies ein Ausnahme-Ereignis (ID enthält "_") ist, gibt es nichts zu löschen auf Google-Seite.
  // Google Calendar entfernt Vorkommen, wenn das Haupt-Wiederholungsereignis gelöscht wird.
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

An diesem Punkt kann Scheduler `/events` laden, und grundlegende CRUD-Operationen können im Client verbunden werden.

## Schritt 4 - Google-Ereignisse zu Scheduler-Ereignissen (und zurück) mappen

In diesem Schritt implementieren Sie einen Mapper, der zwischen Folgendem konvertiert:

- Google-Ereignisfelder (`start.dateTime` / `start.date`, `recurrence`, etc.)
- Scheduler-Ereignisfelder (`start_date`, `end_date`, `rrule`, etc.)

### Zentrale Unterschiede, die Sie berücksichtigen müssen

1) **All-Day- vs. zeitgebundene Ereignisse**
- Google: All-Day verwendet `start.date` / `end.date`
- Google: Zeitgebunden verwendet `start.dateTime` / `end.dateTime` und kann `timeZone` enthalten
- Scheduler: verwendet `start_date` / `end_date` (Date-Objekte)

2) **Wiederholungsregeln**
- Google speichert Wiederholung als Array-Strings mit dem Präfix `RRULE:`
- Scheduler verwendet `rrule` ohne Präfix

3) **Enddatum der Wiederholungsserie**
- Scheduler erwartet ein `end_date` für wiederkehrende Serien.
- Google kann `UNTIL=` in der RRULE verwenden oder keine UNTIL (unendliche Serie).

Verwandte Dokumente: [Recurring events](guides/recurring-events.md).

### Google → Scheduler

Aktualisieren Sie `server/mappers/eventMapper.ts`, um die Google-Ereignisstruktur in die Scheduler-Ereignisstruktur zu mappen (auszugweise unten; behalten Sie Hilfsfunktionen wie `calculateEndDate()` im selben Modul):

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

  // Nicht wiederkehrend
  if (start?.dateTime && end?.dateTime && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.dateTime);
    ev.end_date = new Date(end.dateTime);
  } else if (start?.date && end?.date && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.date + "T00:00:00");
    ev.end_date = new Date(end.date + "T00:00:00");
  }

  // Wiederkehrend
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

  // Ausnahmen: ursprüngliche Startzeit
  if (gEvent.originalStartTime?.dateTime) {
    ev.original_start = new Date(gEvent.originalStartTime.dateTime);
  }

  return ev;
}
~~~

### `calculateEndDate()` Hilfsfunktion

Extrahiert das UNTIL-Datum aus einer Google-Wiederholungsregel oder gibt ein weit in der Zukunft liegendes Datum zurück, falls die Serie unendlich ist. Scheduler erwartet ein `end_date` für wiederkehrende Ereignisse, daher liefert diese Hilfsfunktion eines:

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

Aktualisieren Sie den Mapper, um Scheduler-Ereignisse wieder in Googles Schema zu konvertieren:

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

    // Rekurrent
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
      // Nicht wiederkehrend
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

    // Unterstützung für Ausnahmen bei wiederkehrenden Terminen
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

## Schritt 5 - Scheduler an das Backend anbinden (laden + CRUD)

In diesem Schritt initialisieren Sie Scheduler, laden Daten von `GET /events` und senden CRUD-Operationen über DataProcessor an das Backend.

### 5.1 Unterschiedliche UI für „autorisiert vs. nicht autorisiert“ rendern

Aktualisieren Sie `client/index.ejs`, um dem Client eine Autorisierungs-Flagge zu übergeben:

~~~html title="client/index.ejs"
<script>
  const GOOGLE_AUTHORIZED = <%= !!googleAuth %>;
</script>
~~~

### 5.2 Scheduler initialisieren und Ereignisse laden

Aktualisieren Sie `client/main.ts`, um Scheduler zu initialisieren und Daten zu laden, sobald der Benutzer autorisiert ist.

Nur der relevante Teil ist gezeigt:

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

### 5.3 Zwei-Wege-Synchronisierung aktivieren mit DataProcessor

Aktualisieren Sie `client/main.ts`, um Scheduler CRUD-Aktionen an den Server weiterzuleiten.

~~~ts title="client/main.ts"
scheduler.createDataProcessor(async (entity, action, data, id) => {
  const calendars = scheduler.serverList("calendars") as MappedCalendar[];

  // Demo-Vereinfachung: Senden Sie alles in den ersten verfügbaren Kalender.
  // In einer echten App sollten Benutzer einen Zielkalender auswählen.
  data.calendarId = calendars[0]?.id;

  // Geben Sie dem Client-Zeitzone an, damit der Server korrekte dateTime-Werte erzeugen kann.
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

Verwandte Dokumente: [DataProcessor](guides/server-integration.md#technique).

Zu diesem Zeitpunkt:

- Ereignisse aus Google Calendar sollten nach der Autorisierung in Scheduler erscheinen
- Erstellen/Ändern/Llöschen in Scheduler sollten Google Calendar aktualisieren

---

## Fehlerbehebung

### "Error 400: redirect_uri_mismatch"
- Ursache: Die Redirect-URI in den Google Cloud-Anmeldeinformationen stimmt nicht mit der Callback-URL Ihrer App überein.
- Lösung: Stellen Sie sicher, dass die autorisierte Redirect-URI exakt lautet:
  - `http://localhost:3000/auth/google/callback`

### "Access blocked: app has not completed the Google verification process"
- Ursache: Die Zustimmungsseite befindet sich nicht im Testing-Modus oder Sie sind nicht als Testbenutzer aufgeführt.
- Lösung: Setzen Sie den Veröffentlichungsstatus auf **Testing** und fügen Sie Ihr Konto unter **Test Users** hinzu.

### "No refresh token returned"
- Ursache: Google gibt möglicherweise nur beim ersten Zustimmungsvorgang eines Clients ein Refresh-Token zurück.
- Lösung: Stellen Sie sicher, dass Ihre Auth-Anforderung `accessType: "offline"` und `prompt: "consent"` enthält. Wenn Sie zuvor bereits autorisiert waren, widerrufen Sie die Berechtigungen in Ihrem Google-Konto und autorisieren Sie erneut.

## Zusammenfassung

Sie haben eine zweib Diagramm-Synchronisierung zwischen Scheduler und Google Kalender implementiert:

- Das Backend authentifiziert Benutzer über Google OAuth 2.0 und speichert Tokens in der Session
- Scheduler lädt Kalender und Ereignisse über `GET /events`
- Scheduler CRUD-Operationen werden über `POST/PUT/DELETE /events` an Google Calendar weitergeleitet
- Ein Mapper konvertiert zeitgesteuerte/all-day und wiederkehrende Ereignisse zwischen Google Calendar und Scheduler

## Demo-Repository-Link

Vollständige funktionsfähige Quelle:

- https://github.com/DHTMLX/scheduler-google-calendar-demo