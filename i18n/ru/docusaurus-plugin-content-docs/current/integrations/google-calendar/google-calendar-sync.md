---
title: "Двусторонняя синхронизация с Google Calendar (Node.js)"
sidebar_label: "Cинхронизация с Google Calendar"
description: "Реализуйте интеграцию Node.js + Express, которая синхронизирует события DHTMLX Scheduler с Google Calendar с использованием OAuth 2.0 и Google Calendar API v3."
---

# DHTMLX Scheduler: Двусторонняя синхронизация с Google Calendar (Node.js)

В этом руководстве вы реализуете **двустороннюю синхронизацию** между **DHTMLX Scheduler** и **Google Calendar** в небольшом приложении на Node.js:

- Загрузка календарей и событий из Google Calendar в Scheduler
- Отправка операций создания/обновления/удаления Scheduler обратно в Google Calendar

:::note
Этот подход реализует **двустороннюю синхронизацию через вызовы API** (Scheduler → backend → Google Calendar). Он не реализует обновления в реальном времени Google → Scheduler (webhooks). Если вы напрямую изменяете события в Google Calendar, обновите приложение (или обновите диапазон дат), чтобы увидеть обновлённые данные в Scheduler.
:::

Вы создадите:

- бэкенд на Node.js + Express с Google OAuth 2.0 ([Passport](https://www.npmjs.com/package/passport)) и небольшим REST API для Scheduler
- слой сопоставления событий (Google ↔ Scheduler), включая базовую обработку повторяющихся событий/исключений
- клиента Scheduler, подключённого к бэкенду через `scheduler.createDataProcessor()`

:::note
Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-google-calendar-demo).
:::

## Требования

- Node.js 18+
- Учётная запись Google с доступом к Google Cloud Console
- Базовые знания TypeScript и Express
- Доступ к пакетам DHTMLX Scheduler (в примере используется `@dhx/trial-scheduler`)

## Демонстрационный репозиторий

Полный рабочий проект, соответствующий данному руководству, доступен на GitHub:
- https://github.com/dhtmlx/scheduler-google-auth-demo

Руководство объясняет ключевые шаги и демонстрирует важный код интеграции. Репозиторий является «полной рабочей ссылкой».

## Настройка проекта

В этом разделе вы подготовите учетные данные Google OAuth, сконфигурируете проект и запустите приложение локально.

### 1) Получение кода проекта

Выполните одно из следующих действий:

- Клонировать репозиторий:

~~~bash title="Terminal"
git clone https://github.com/dhtmlx/scheduler-google-auth-demo.git
cd scheduler-google-auth-demo
~~~

Если ваш проект устанавливает пакеты `@dhx/*` из частного реестра, настройте npm:

~~~bash title="Terminal"
npm config set @dhx:registry https://npm.dhtmlx.com
~~~

### 2) Настройка Google Cloud (OAuth 2.0)

На этом шаге вы создадите учётные данные OAuth, которые бэкенд будет использовать для доступа к Google Calendar от имени пользователя.

> Руководство использует OAuth в режиме тестирования (рекомендуется для разработки). В этом режиме авторизовать приложение могут только пользователи, перечисленные как тестовые.

#### 2.1 Создать или выбрать проект Google Cloud

1. Открыть [Google Cloud Console](https://console.cloud.google.com/).
2. Выбрать существующий проект или создать новый.

#### 2.2 Включить Google Calendar API

1. Перейти в **APIs & Services → Library**.
2. Найти **Google Calendar API**.
3. Нажать **Enable**.

#### 2.3 Настроить экран согласия OAuth

1. Перейти в **APIs & Services → OAuth consent screen**.
2. Выбрать **External** (типично для потребительских учётных записей Google), затем нажать **Create**.
3. Заполнить обязательные поля:
   - **App name**
   - **User support email**
   - **Developer contact email**
4. Установить **Publishing status** в **Testing**.
5. Добавить **Test users**:
   - Добавить учётные записи Google, которыми вы будете входить при разработке/тестировании.

:::note
Если пропустить тестовых пользователей в режиме **Testing**, Google заблокирует авторизацию для учётных записей, не включённых явно в список.
:::

#### 2.4 Создать OAuth-клиентские креденциалы

1. Перейти в **APIs & Services → Credentials**.
2. Нажать **Create credentials → OAuth client ID**.
3. Тип приложения: **Web application**.
4. Добавить этот **Authorized JavaScript origin**:

~~~text title="JavaScript origin"
http://localhost:3000
~~~

5. Добавить этот **Authorized redirect URI**:

~~~text title="Redirect URI"
http://localhost:3000/auth/google/callback
~~~

6. Сохранить и скопировать:
   - **Client ID**
   - **Client Secret**

#### 2.5 Область доступа, используемая этой интеграцией

Бэкенд запрашивает доступ к Google Calendar через:

- `https://www.googleapis.com/auth/calendar`

Эта область доступа достаточна для перечисления календарей и выполнения операций CRUD над событиями.

### 3) Настройка переменных окружения

На этом этапе вы предоставите креденциалы OAuth и настройки сессий бэкенду.

Скопируйте `.env.example` в `.env`, затем заполните значения:

~~~ini title=".env"
GOOGLE_CLIENT_ID=<Client ID из предыдущих шагов>
GOOGLE_CLIENT_SECRET=<Client Secret из предыдущих шагов>
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
SESSION_SECRET=some-long-random-string
PORT=3000
~~~

### 4) Установка зависимостей и запуск

~~~bash title="Terminal"
npm install
npm run start
~~~

Откройте:

~~~text title="App URL"
http://localhost:3000
~~~

На этом этапе вы сможете нажать **Add Google Calendars**, войти в систему и увидеть Scheduler, заполненный событиями.

---

## Реализация

Оставшаяся часть руководства объясняет, как именно собирается интеграция. Если вы адаптируете это к уже существующему приложению, считайте каждый раздел ниже как этап реализации.

## Шаг 1 - Разделение обязанностей (backend vs client)

На этом шаге вы разделите ответственности, чтобы Scheduler оставался UI‑компонентом, а бэкенд владел OAuth + вызовами Google API.

Типичная структура:

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

- **server/**: OAuth, хранение токенов в сессии, вызовы Google Calendar API и REST‑концевые точки для Scheduler
- **client/**: инициализация Scheduler + загрузка, и [DataProcessor](guides/server-integration.md) для перенаправления CRUD‑действий на сервер

## Шаг 2 - Реализация Google OAuth (Express session + Passport)

На этом шаге вы сделаете бэкенд способным аутентифицировать пользователя и хранить токены доступа/обновления Google.

### 2.1 Подключение сервера (сессии + passport)

Обновите `server/index.ts`, чтобы включить сессии и passport, затем примонтируйте маршруты.

Ниже приведено ядро подключения (показываются только релевантные части):

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

Inline‑middleware на `/events` гарантирует, что неавторизованные запросы получают ответ `401`, вместо того чтобы падать сервер при попытке привести `req` к `AuthenticatedRequest`.

### 2.2 Настройка стратегии Google

Обновите `server/config/passport.ts`, чтобы зарегистрировать `passport-google-oauth20`.

Ключевая идея: хранить `accessToken` и `refreshToken` в объекте пользователя, сохраняемом в сессии:

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
Обычно продакшн‑приложения сохраняют токены по пользователю в базе данных и реализуют обновление/ревокацию refresh‑токенов. В этом примере токены хранятся в сессии, чтобы упростить процесс.
:::

### 2.3 Добавить маршруты OAuth

Обновите `server/routes/auth.route.ts`, чтобы открыть точку входа OAuth, коллбек и выход из системы:

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

На этом этапе вы должны суметь открыть `/auth/google`, пройти консент‑экран Google и вернуться к `/` с авторизованной сессией.

### Создать сервис Google Calendar

Создайте `server/services/googleService.ts` для обёртывания CRUD‑методов Google Calendar API v3. Он создаёт OAuth2‑клиента по токенам сессии и предоставляет помощники для перечисления календарей, перечисления событий и создания/обновления/удаления событий:

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

## Шаг 3 - Экспорт REST API для CRUD Scheduler

На этом шаге вы реализуете контракт API, который использует Scheduler:

- `GET /events` — загрузить календари + события
- `POST /events` — создать
- `PUT /events/:eventId` — обновить
- `DELETE /events/:eventId` — удалить

### 3.1 Загрузка календарей + событий (GET /events)

Обновите `server/routes/events.route.ts`, чтобы возвращать:


- `data` с событиями в формате Scheduler
- `collections.calendars` с списком календарей, который будет [доступен на клиенте](guides/loading-data.md#collections)

Ниже приведён рабочий обработчик:

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

Связанные документы: [Loading data](guides/loading-data.md#collections).

### 3.2 Перенаправление CRUD‑операций в Google Calendar

Обновите тот же модуль маршрутов, чтобы обрабатывать создание/обновление/удаление.

Создание:

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

Обновление:

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

Удаление:

~~~ts title="server/routes/events.route.ts"
router.delete("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  // Если это исключение повторного события (id содержит "_"), удалить на стороне Google ничего не нужно.
  // Google Calendar удаляетOccurrence при удалении основного повторяющегося события.
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

На данный момент Scheduler может загружать `/events`, а базовые операции CRUD можно реализовать на клиенте.

## Шаг 4 - Соответствие Google‑событий событиям Scheduler (и обратно)

На этом шаге вы реализуете маппер, который преобразует между:

- полями Google‑события (`start.dateTime` / `start.date`, `recurrence`, и т. д.)
- полями события Scheduler (`start_date`, `end_date`, `rrule`, и т. д.)

### Основные различия, которые нужно учесть

1) **Целодневные vs события с указанием времени**
- Google: целодневные используют `start.date` / `end.date`
- Google: события с временем используют `start.dateTime` / `end.dateTime` и могут содержать `timeZone`
- Scheduler: использует `start_date` / `end_date` (объекты Date)

2) **Правила повторения**
- Google хранит повторение в виде массива строк с префиксом `RRULE:`
- Scheduler использует `rrule` без префикса

3) **Конец серии повторений**
- Scheduler ожидает `end_date` для повторяющихся серий.
- Google может использовать `UNTIL=` в RRULE, или вовсе не указывать UNTIL (бесконечная серия).

Связанные документы: [Recurring events](guides/recurring-events.md).

### Google → Scheduler

Обновите `server/mappers/eventMapper.ts`, чтобы преобразовать форму события Google в форму события Scheduler (см. фрагмент ниже; сохраняйте вспомогательные функции, такие как `calculateEndDate()`, в том же модуле):

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

  // Исключения: исходное время начала
  if (gEvent.originalStartTime?.dateTime) {
    ev.original_start = new Date(gEvent.originalStartTime.dateTime);
  }

  return ev;
}
~~~

### helper calculateEndDate()

Извлекает дату UNTIL из правила повторения Google или возвращает дату далеко в будущем для бесконечных серий. Scheduler ожидает end_date у повторяющихся событий, поэтому этот хелпер возвращает её:

~~~ts title="server/mappers/eventMapper.ts"
// convert UNTIL=20260129T205959Z -> '2026-01-29T20:59:59Z' если существует
// если UNTIL нет -> повторение бесконечно -> вернуть '9999-02-01T00:00:00Z'
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

Обновите сопоставитель, чтобы преобразовать поля Scheduler обратно в схему Google:

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

    // Поддержка исключений повторяющихся событий
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

## Шаг 5 - Подключение Scheduler к бэкенду (загрузка + CRUD)

На этом шаге вы инициализируете Scheduler, загрузите данные через `GET /events` и отправляете операции CRUD на бэкенд через DataProcessor.

### 5.1 Отображение другого UI для "авторизован/не авторизован"

Обновите `client/index.ejs`, чтобы передать клиенту флаг авторизации:

~~~html title="client/index.ejs"
<script>
  const GOOGLE_AUTHORIZED = <%= !!googleAuth %>;
</script>
~~~

### 5.2 Инициализация Scheduler и загрузка событий

Обновите `client/main.ts`, чтобы инициализировать Scheduler и загрузить данные после авторизации пользователя.

Только релевантная часть:

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

### 5.3 Включение двусторонней синхронизации через DataProcessor

Обновите `client/main.ts`, чтобы пересылать CRUD‑действия Scheduler на сервер.

~~~ts title="client/main.ts"
scheduler.createDataProcessor(async (entity, action, data, id) => {
  const calendars = scheduler.serverList("calendars") as MappedCalendar[];

  // Упрощение демо: отправляем всё в первый доступный календарь.
  // В реальном приложении позвольте пользователю выбрать целевой календарь.
  data.calendarId = calendars[0]?.id;

  // Предоставьте клиентский часовой пояс, чтобы сервер мог корректно генерировать значения dateTime.
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

Связанные документы: [DataProcessor](guides/server-integration.md#technique).

На данный момент:

- события из Google Calendar должны появиться в Scheduler после авторизации
- создание/обновление/удаление в Scheduler должно обновлять Google Calendar

---

## Устранение неполадок

### "Error 400: redirect_uri_mismatch"
- Причина: перенаправляющий URI в учетных данных Google Cloud не совпадает с данным URL‑адресом вашего приложения.
- Исправление: убедитесь, что Authorized redirect URI EXACTLY такой же:
  - `http://localhost:3000/auth/google/callback`

### "Access blocked: app has not completed the Google verification process"
- Причина: экран согласия не в режиме Testing или вы не добавлены в список тестовых пользователей.
- Исправление: установите Publishing status в **Testing** и добавьте вашу учётную запись в **Test users**.

### "No refresh token returned"
- Причина: Google может вернуть refresh token только при первом согласии пользователя для данного client ID.
- Исправление: убедитесь, что ваш запрос аутентификации включает `accessType: "offline"` и `prompt: "consent"`. Если вы уже авторизованы ранее, отзовите доступ в настройках разрешений Google Account и повторно авторизуйтесь.

## Резюме

Вы реализовали двустороннюю синхронизацию между Scheduler и Google Calendar:

- Бэкенд аутентифицирует пользователей через Google OAuth 2.0 и хранит токены в сессии
- Scheduler загружает календари и события через `GET /events`
- CRUD‑операции Scheduler пересылаются в Google Calendar через `POST/PUT/DELETE /events`
- Сопоставитель конвертируетTimed/целодневные и повторяющиеся события между Google Calendar и Scheduler

## Ссылка на демонстрационный репозиторий

Полный рабочий исходник:

- https://github.com/DHTMLX/scheduler-google-calendar-demo