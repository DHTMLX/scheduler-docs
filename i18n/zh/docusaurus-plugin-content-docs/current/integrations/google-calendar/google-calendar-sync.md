---
title: "与 Google 日历的双向同步（Node.js）"
sidebar_label: "Google 日历"
description: "实现一个 Node.js + Express 集成，将 DHTMLX Scheduler 事件通过 OAuth 2.0 与 Google 日历 API v3 同步。"
---

# DHTMLX Scheduler: 与 Google 日历的双向同步（Node.js）

在本指南中，你将实现 **DHTMLX Scheduler** 与 **Google 日历** 之间的 **双向同步**，在一个小型 Node.js 应用中：

- 从 Google 日历加载日历和事件到 Scheduler
- 将 Scheduler 的创建/更新/删除操作推送回 Google 日历

:::note
此方法实现的是通过 API 调用的 **双向同步**（Scheduler → 后端 → Google 日历）。它不实现 Google → Scheduler 的实时推送更新（webhook）。如果你直接在 Google 日历中修改事件，请重新加载应用（或重新加载一个日期范围）以在 Scheduler 中看到更新的数据。
:::

你将构建：

- 一个包含 Google OAuth 2.0 的 Node.js + Express 后端（[Passport](https://www.npmjs.com/package/passport)）以及一个用于 Scheduler 的小型 REST API
- 一个事件映射层（Google ↔ Scheduler），包括基本的计划内事件/例外处理
- 一个通过 `scheduler.createDataProcessor()` 连接到后端的 Scheduler 客户端

:::note
完整的源代码可在 GitHub 上获取：[https://github.com/DHTMLX/scheduler-google-calendar-demo](https://github.com/DHTMLX/scheduler-google-calendar-demo)。
:::

## 前提条件

- Node.js 18+
- 拥有 Google Cloud Console 访问权限的 Google 账号
- 对 TypeScript 和 Express 的基本熟悉
- 访问 DHTMLX Scheduler 包（示例使用 `@dhx/trial-scheduler`）

## 演示仓库

与本指南匹配的完整可运行项目可在 GitHub 上获取：
- https://github.com/dhtmlx/scheduler-google-auth-demo

该指南解释了关键步骤并展示了重要的集成代码。仓库是“完整可运行的参考实现”。

## 项目设置

在本节中，你将准备 Google OAuth 凭据、配置项目并在本地运行应用。

### 1) 获取项目代码

执行以下任意一种操作：

- 克隆仓库：
~~~bash title="Terminal"
git clone https://github.com/dhtmlx/scheduler-google-auth-demo.git
cd scheduler-google-auth-demo
~~~

如果你的项目需要从私有注册表安装 `@dhx/*` 包，请配置 npm：
~~~bash title="Terminal"
npm config set @dhx:registry https://npm.dhtmlx.com
~~~

### 2) 配置 Google Cloud（OAuth 2.0）

在此步骤中，你将创建后端用于以用户身份访问 Google 日历的 OAuth 凭据。

> 本指南在 **Testing** 模式下使用 OAuth（开发推荐）。在该模式下，只有被列为测试用户的用户才可以授权应用。

#### 2.1 创建或选择 Google Cloud 项目

1. 打开 [Google Cloud Console](https://console.cloud.google.com/)。
2. 选择一个已有项目或创建一个新项目。

#### 2.2 启用 Google 日历 API

1. 转到 **APIs & Services → Library**。
2. 搜索 **Google Calendar API**。
3. 点击 **Enable**（启用）。

#### 2.3 配置 OAuth 同意屏幕

1. 转到 **APIs & Services → OAuth consent screen**。
2. 选择 **External**（对于消费型 Google 账户常见），然后点击 **Create**。
3. 填写必填字段：
   - **App name**（应用名称）
   - **User support email**（用户支持邮箱）
   - **Developer contact email**（开发者联系邮箱）
4. 将 **Publishing status** 设置为 **Testing**。
5. 添加 **Test users**：
   - 添加你在开发/测试时将用于登录的 Google 账号。

:::note
如果在 **Testing** 模式下跳过测试用户，Google 将阻止未明确添加的账户授权。
:::

#### 2.4 创建 OAuth 客户端凭据

1. 转到 **APIs & Services → Credentials**。
2. 点击 **Create credentials → OAuth client ID**。
3. 应用类型：**Web application**。
4. 添加以下 **Authorized JavaScript origin**：
~~~text title="JavaScript origin"
http://localhost:3000
~~~

5. 添加以下 **Authorized redirect URI**：
~~~text title="Redirect URI"
http://localhost:3000/auth/google/callback
~~~

6. 保存并复制：
   - **Client ID**
   - **Client Secret**

#### 2.5 本集成使用的作用域

后端通过以下方式请求 Google 日历访问权限：

- `https://www.googleapis.com/auth/calendar`

此作用域足以列出日历并执行事件的 CRUD 操作。

### 3) 配置环境变量

在此步骤中，你将向后端提供 OAuth 凭据和会话设置。

把 `.env.example` 复制为 `.env`，然后填写值：

~~~ini title=".env"
GOOGLE_CLIENT_ID=<上一步中的 Client ID>
GOOGLE_CLIENT_SECRET=<上一步中的 Client Secret>
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
SESSION_SECRET=some-long-random-string
PORT=3000
~~~

### 4) 安装依赖并运行

~~~bash title="Terminal"
npm install
npm run start
~~~

打开：

~~~text title="App URL"
http://localhost:3000
~~~

此时你应该能够点击 **Add Google Calendars**、完成登录，并在 Scheduler 中看到加载的日历与事件。

---

## 实现

本节后续内容将解释如何把集成组合在一起。如果你是在将本指南应用于现有应用，请将下面每个小节视为一个实现里程碑。

## 步骤 1 - 职责分离（后端 vs 客户端）

在此步骤中，你将分离职责，让 Scheduler 保持为 UI 组件，后端负责 OAuth 和 Google API 调用。

一个典型的结构是：

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

- **server/**：OAuth、会话中的令牌存储、Google Calendar API 调用，以及 Scheduler 的 REST 端点
- **client/**：Scheduler 初始化和加载，以及 [DataProcessor](guides/server-integration.md) 将 CRUD 操作转发到服务器

## 步骤 2 - 实现 Google OAuth（Express 会话 + Passport）

在此步骤中，你将使后端能够对用户进行认证并在会话中存储 Google 的访问令牌/刷新令牌。

### 2.1 引导服务器（会话 + passport）

更新 `server/index.ts` 以启用会话和 passport，然后挂载路由。

以下是核心连接（仅展示相关部分）：

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

在 `/events` 上的行内中间件确保未认证的请求在路由处理程序将 `req` 转换为 `AuthenticatedRequest` 时不会导致服务器崩溃，而是返回 `401` 响应。

### 2.2 配置 Google 策略

更新 `server/config/passport.ts`，注册 `passport-google-oauth20`。核心思路是：在会话中存储的用户对象上保留 `accessToken` 和 `refreshToken`：

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
生产环境中通常会把令牌持久化到数据库，并实现刷新令牌的轮换/撤销。本示例将令牌保存在会话中，以便于理解。
:::

### 2.3 添加 OAuth 路由

更新 `server/routes/auth.route.ts`，暴露 OAuth 入口、回调和登出：

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

到此，你应能够访问 `/auth/google`，完成 Google 同意屏幕并带着已认证的会话返回到 `/`。

### 创建 Google 日历服务层

创建 `server/services/googleService.ts`，封装 Google Calendar API v3 的 CRUD 方法。它从会话令牌中创建 OAuth2 客户端，并暴露列出日历、列出事件、以及创建/更新/删除事件的帮助函数：

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

## 步骤 3 - 为 Scheduler CRUD 暴露 REST API

在此步骤中，你将实现 Scheduler 使用的 API 合同：

- `GET /events` - 加载日历 + 事件
- `POST /events` - 创建
- `PUT /events/:eventId` - 更新
- `DELETE /events/:eventId` - 删除

### 3.1 加载日历 + 事件（GET /events）

更新 `server/routes/events.route.ts`，返回：

- `data`：包含 Scheduler 风格的事件
- `collections.calendars`：包含日历列表，客户端将可用该列表（详见 [加载数据](guides/loading-data.md#collections)）

以下为一个工作示例处理程序：

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

相关文档： [加载数据](guides/loading-data.md#collections)。

### 3.2 将 CRUD 操作转发到 Google Calendar

更新同一路由模块以处理创建/更新/删除。

创建：

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

更新：

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

删除：

~~~ts title="server/routes/events.route.ts"
router.delete("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  // 如果这是一个异常发生（id 包含 "_"），则 Google 端暂无需要删除的项。
  // Google 日历在删除主循环事件时会删除发生的全部实例
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

至此，Scheduler 可以加载 `/events`，客户端也可以完成基本的 CRUD 逻辑并与 Google Calendar 对接。

## 步骤 4 - 将 Google 事件映射为 Scheduler 事件（以及相反）

在此步骤中，你将实现一个映射器，用于在以下字段之间进行转换：

- Google 事件字段（`start.dateTime` / `start.date`、`recurrence` 等）
- Scheduler 事件字段（`start_date`、`end_date`、`rrule` 等）

### 你必须处理的关键差异

1) **全天事件 vs 有时段的事件**
- Google：全天事件使用 `start.date` / `end.date`
- Google：有时段的事件使用 `start.dateTime` / `end.dateTime`，可能包含 `timeZone`
- Scheduler：使用 `start_date` / `end_date`（Date 对象）

2) **重复规则**
- Google 将重复存储为带有 `RRULE:` 前缀的数组字符串
- Scheduler 使用无前缀的 `rrule`

3) **重复系列的结束日期**
- Scheduler 期望重复事件有一个 `end_date`
- Google 的 RRULE 可能包含 `UNTIL=`，也可能没有 UNTIL（无限重复）

相关文档： [Recurring events](guides/recurring-events.md)。

### Google → Scheduler

更新 `server/mappers/eventMapper.ts`，将 Google 事件的形状映射到 Scheduler 的事件形状（摘录如下；请保持 `calculateEndDate()` 等辅助函数在同一模块中）：

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

  // 非重复
  if (start?.dateTime && end?.dateTime && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.dateTime);
    ev.end_date = new Date(end.dateTime);
  } else if (start?.date && end?.date && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.date + "T00:00:00");
    ev.end_date = new Date(end.date + "T00:00:00");
  }

  // 递归
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

  // 异常：原始开始时间
  if (gEvent.originalStartTime?.dateTime) {
    ev.original_start = new Date(gEvent.originalStartTime.dateTime);
  }

  return ev;
}
~~~

### `calculateEndDate()` 助手函数

从 Google 的重复规则中提取 UNTIL 日期，若不存在 UNTIL，则为无限系列返回一个很远的未来日期。Scheduler 期望在重复事件上有 `end_date`，因此此助手提供一个值：

~~~ts title="server/mappers/eventMapper.ts"
// 将 UNTIL=20260129T205959Z 转换为 '2026-01-29T20:59:59Z'（如果存在）
// 如果不存在 UNTIL -> 事件无限重复 -> 返回 '9999-02-01T00:00:00Z'
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

更新映射器，将 Scheduler 的事件字段再转换为 Google 的模式：

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

    // 递归
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
      // 非重复
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

    // 递归异常支持
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

## 步骤 5 - 将 Scheduler 与后端连接（加载 + CRUD）

在此步骤中，你将初始化 Scheduler、从 `GET /events` 加载数据，并通过 DataProcessor 将 CRUD 操作发送到后端。

### 5.1 为“已授权 vs 未授权”呈现不同的 UI

更新 `client/index.ejs`，向客户端暴露授权标志：

~~~html title="client/index.ejs"
<script>
  const GOOGLE_AUTHORIZED = <%= !!googleAuth %>;
</script>
~~~

### 5.2 初始化 Scheduler 并加载事件

更新 `client/main.ts`，初始化 Scheduler 并在用户授权后加载数据。仅展示相关部分：

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

### 5.3 使用 DataProcessor 启用双向同步

更新 `client/main.ts`，将 Scheduler 的 CRUD 操作转发到服务器。

~~~ts title="client/main.ts"
scheduler.createDataProcessor(async (entity, action, data, id) => {
  const calendars = scheduler.serverList("calendars") as MappedCalendar[];

  // 演示简化：将所有内容发送到第一个可用日历。
  // 实际应用中让用户选择目标日历。
  data.calendarId = calendars[0]?.id;

  // 提供客户端时区，以便服务器生成正确的 dateTime 值。
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

相关文档： [DataProcessor](guides/server-integration.md#technique)。

至此：

- 授权后，Google Calendar 的事件应会显示在 Scheduler 中
- Scheduler 中的创建/更新/删除应当同步回 Google Calendar

---

## 故障排除

### "Error 400: redirect_uri_mismatch"
- 原因：Google Cloud 凭据中的回调 URI 与应用回调 URL 不匹配。
- 解决：确保授权的重定向 URI 与下面完全一致：
  - `http://localhost:3000/auth/google/callback`

### "Access blocked: app has not completed the Google verification process"
- 原因：同意屏幕未处于 Testing 模式，或你不在测试用户列表中。
- 解决：将 Publishing status 设置为 **Testing**，并在 **Test users** 中添加你的账户。

### "No refresh token returned"
- 原因：Google 可能只有在用户对给定客户端 ID 第一次同意时才返回刷新令牌。
- 解决：确保你的授权请求包含 `accessType: "offline"` 和 `prompt: "consent"`。如果你之前已经授权，请在 Google 账户权限中撤销授权并重新授权。

## 总结

你已经实现了 Scheduler 与 Google 日历之间的双向同步：

- 后端通过 Google OAuth 2.0 进行用户认证，并将令牌存储在会话中
- Scheduler 通过 `GET /events` 加载日历和事件
- Scheduler 的 CRUD 操作通过 `POST/PUT/DELETE /events` 转发到 Google Calendar
- 映射器在 Google 日历和 Scheduler 之间转换有时段/全天以及重复事件

## 演示仓库链接

完整可运行的源代码：

- https://github.com/DHTMLX/scheduler-google-calendar-demo