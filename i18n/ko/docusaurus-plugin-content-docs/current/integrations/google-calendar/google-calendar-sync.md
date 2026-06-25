---
title: "Google Calendar와의 양방향 동기화 (Node.js)"
sidebar_label: "Google Calendar"
description: "OAuth 2.0 및 Google Calendar API v3를 사용하는 Node.js + Express 통합을 구현하여 DHTMLX Scheduler의 이벤트를 Google Calendar와 동기화합니다."
---

# DHTMLX Scheduler: Google Calendar와의 양방향 동기화 (Node.js)

이 가이드에서는 소규모 Node.js 앱에서 **DHTMLX Scheduler**와 **Google Calendar** 사이에 **양방향 동기화**를 구현합니다:

- Google Calendar에서 Scheduler로 달력 및 이벤트를 로드
- Scheduler의 생성/수정/삭제 작업을 Google Calendar로 다시 전송

:::note
이 접근 방식은 **API 호출을 통한 양방향 동기화**를 구현합니다(Scheduler → 백엔드 → Google Calendar). 실시간 Google → Scheduler 푸시 업데이트(webhook)는 구현하지 않습니다. Google Calendar에서 직접 이벤트를 변경하면 업데이트된 데이터를 Scheduler에서 보려면 앱을 새로고침하거나 날짜 범위를 다시 로드해야 합니다.
:::

다음 구성을 구축합니다.

- Google OAuth 2.0을 사용하는 Node.js + Express 백엔드([Passport](https://www.npmjs.com/package/passport) 포함)와 Scheduler용 간단한 REST API
- Google ↔ Scheduler 간 매핑 계층(기본 반복 이벤트/예외 처리 포함)
- 백엔드를 통해 프런트엔드에 연결된 Scheduler 클라이언트(`scheduler.createDataProcessor()` 사용)

:::note
전체 소스 코드는 [GitHub에서 확인 가능](https://github.com/DHTMLX/scheduler-google-calendar-demo).
:::

## 전제 조건

- Node.js 18+
- Google Cloud Console에 접근 권한이 있는 Google 계정
- TypeScript 및 Express에 대한 기본 지식
- DHTMLX Scheduler 패키지 접근 권한(예: `@dhx/trial-scheduler` 사용 예시)

## 데모 저장소

이 가이드와 일치하는 완전한 작동 프로젝트는 GitHub에서 확인할 수 있습니다:
- https://github.com/dhtmlx/scheduler-google-auth-demo

가이드는 핵심 단계와 중요한 통합 코드를 설명합니다. 저장소는 “실행 가능한 전체 참조”입니다.

## 프로젝트 구성

이 섹션에서는 Google OAuth 자격 증명을 준비하고 프로젝트를 구성한 뒤 로컬에서 앱을 실행하는 방법을 다룹니다.

### 1) 프로젝트 코드 가져오기

다음 중 하나를 수행합니다:

- 저장소를 클론합니다:

~~~bash title="Terminal"
git clone https://github.com/dhtmlx/scheduler-google-auth-demo.git
cd scheduler-google-auth-demo
~~~

프로젝트가 private 레지스트리에서 `@dhx/*` 패키지를 설치한다면 npm을 구성하십시오:

~~~bash title="Terminal"
npm config set @dhx:registry https://npm.dhtmlx.com
~~~

### 2) Google Cloud(OAuth 2.0) 구성

이 단계에서 백엔드가 사용자를 대신해 Google Calendar에 접근할 수 있도록 OAuth 자격 증명을 생성합니다.

> 이 가이드는 개발에 적합한 권장 모드로 OAuth를 사용합니다. 이 모드에서는 명시적으로 등록된 테스트 사용자만 앱에 인증할 수 있습니다.

#### 2.1 Google Cloud 프로젝트 생성 또는 선택

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속합니다.  
2. 기존 프로젝트를 선택하거나 새 프로젝트를 생성합니다.

#### 2.2 Google Calendar API 활성화

1. APIs & Services → Library로 이동합니다.  
2. Google Calendar API를 검색합니다.  
3. Enable(활성화) 버튼을 클릭합니다.

#### 2.3 OAuth 동의 화면 구성

1. APIs & Services → OAuth consent screen으로 이동합니다.  
2. External를 선택한 다음 Create를 클릭합니다.  
3. 필수 필드를 입력합니다:
   - App name(앱 이름)
   - User support email(사용자 지원 이메일)
   - Developer contact email(개발자 연락 이메일)
4. Publishing status를 Testing으로 설정합니다.  
5. Test users에 다음을 추가합니다:
   - 개발/테스트 중에 로그인에 사용할 Google 계정을 추가합니다.

:::note
Testing 모드에서 테스트 사용자를 건너뛰면 Google이 명시적으로 추가된 계정이 아니면 인증을 차단합니다.
:::

#### 2.4 OAuth 클라이언트 자격 증명 생성

1. APIs & Services → Credentials로 이동합니다.  
2. Create credentials → OAuth client ID를 클릭합니다.  
3. Application type: Web application으로 설정합니다.  
4. Authorized JavaScript origin에 아래 값을 추가합니다:

~~~text title="JavaScript origin"
http://localhost:3000
~~~

5. Authorized redirect URI에 아래 값을 추가합니다:

~~~text title="Redirect URI"
http://localhost:3000/auth/google/callback
~~~

6. 저장 후 다음 정보를 복사합니다:
   - Client ID
   - Client Secret

#### 2.5 이 통합에서 사용하는 범위

백엔드는 Google Calendar 액세스를 다음을 통해 요청합니다:

- https://www.googleapis.com/auth/calendar

이 범위는 달력 목록 조회 및 이벤트 CRUD 작업에 충분합니다.

### 3) 환경 변수 구성

이 단계에서 백엔드에 OAuth 자격 증명 및 세션 설정을 제공합니다.

`.env.example`을 `.env`로 복사한 뒤 값을 채웁니다:

~~~ini title=".env"
GOOGLE_CLIENT_ID=<이전 단계에서 얻은 Client ID>
GOOGLE_CLIENT_SECRET=<이전 단계에서 얻은 Client Secret>
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
SESSION_SECRET=일부 길고 임의의 문자열
PORT=3000
~~~

### 4) 의존성 설치 및 실행

~~~bash title="Terminal"
npm install
npm run start
~~~

다음 주소를 열어 확인합니다:

~~~text title="App URL"
http://localhost:3000
~~~

이 시점에서 **Add Google Calendars**를 클릭하고 로그인하면 Scheduler에 이벤트가 채워진 것을 볼 수 있습니다.

---

## 구현

이 섹션에서는 통합이 어떻게 구성되는지 설명합니다. 기존 앱에 적용하는 경우 아래 각 섹션을 구현 마일스톤으로 간주하십시오.

## 1단계 - 책임 분리(백엔드 vs 클라이언트)

이 단계에서는 Scheduler를 UI 컴포넌트로 두고 백엔드가 OAuth + Google API 호출을 담당하도록 책임을 분리합니다.

일반적인 구조:

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

- **server/**: OAuth, 토큰 저장(세션), Google Calendar API 호출 및 Scheduler용 REST 엔드포인트
- **client/**: Scheduler 초기화 및 로딩, 백엔드로 CRUD를 전달하는 [DataProcessor](guides/server-integration.md) 설정

## 2단계 - Google OAuth 구현(Express 세션 + Passport)

이 단계에서 백엔드가 사용자 인증을 수행하고 Google 접근/갱신 토큰을 저장할 수 있도록 만듭니다.

### 2.1 서버 부트스트랩(세션 + passport)

세션과 passport를 활성화하고 라우트를 마운트하도록 `server/index.ts`를 업데이트합니다.

다음은 핵심 연결 코드의 발췌입니다(관련 부분만 보여줌):

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

`/events`의 인라인 미들웨어는 인증되지 않은 요청이 라우트 핸들러가 `AuthenticatedRequest`로 타입 캐스팅되었을 때 서버가 크래시 나는 것을 방지합니다.

### 2.2 Google 전략 구성

`server/config/passport.ts`를 업데이트하여 `passport-google-oauth20`를 등록합니다.

핵심 아이디어는 세션에 저장된 사용자 객체에서 `accessToken`과 `refreshToken`을 유지하는 것입니다:

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
프로덕션 앱은 일반적으로 토큰을 사용자별 데이터베이스에 저장하고 토큰 갱신/폐기 정책을 구현합니다. 이 예제는 흐름의 이해를 돕기 위해 토큰을 세션에 보관합니다.
:::

### 2.3 OAuth 라우트 추가

`server/routes/auth.route.ts`를 업데이트하여 OAuth 진입점, 콜백, 로그아웃 엔드포인트를 노출합니다:

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

이 시점에서 `/auth/google`에 접속하고 Google 동의 화면을 완료한 후 인증 세션으로 `/`로 돌아올 수 있습니다.

### Google Calendar 서비스 계층 생성

`server/services/googleService.ts`를 생성하여 Google Calendar API v3 CRUD 메서드를 래핑합니다. 세션 토큰에서 OAuth2 클라이언트를 생성하고 달력 목록 조회/이벤트 조회 및 생성/수정/삭제를 위한 헬퍼를 노출합니다:

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

## 3단계 - Scheduler CRUD를 위한 REST API 노출

이 단계에서 Scheduler가 사용하는 API 계약을 구현합니다:

- GET /events — 달력 + 이벤트 로드
- POST /events — 생성
- PUT /events/:eventId — 수정
- DELETE /events/:eventId — 삭제

### 3.1 달력 + 이벤트 로드(GET /events)

`server/routes/events.route.ts`를 업데이트하여 아래를 반환합니다:

- Scheduler 스타일의 이벤트를 담은 `data`
- [클라이언트에서 사용 가능한] 목록 달력의 CALENDARS를 담은 `collections.calendars`

다음은 작동하는 핸들러의 예시입니다:

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

관련 문서: [데이터 로딩](guides/loading-data.md#collections).

### 3.2 CRUD를 Google Calendar로 전달

동일한 라우트 모듈을 업데이트하여 생성/수정/삭제를 처리합니다.

생성:

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

수정:

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

삭제:

~~~ts title="server/routes/events.route.ts"
router.delete("/:eventId", async (req, res, next) => {
  const authedReq = req as AuthenticatedRequest;
  const calendarId = (req.body as DhxEvent)?.calendarId as string | undefined;

  // 예외 발생(아이디에 "_"가 있는 경우)인 경우 Google 쪽에서 삭제할 대상이 없음
  // Google Calendar는 주기적 이벤트를 삭제하면 발생 항목을 삭제합니다.
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

이제 Scheduler가 `/events`를 로드할 수 있고, 클라이언트에서 기본 CRUD를 백엔드로 연결할 수 있습니다.

## 4단계 - Google 이벤트를 Scheduler 이벤트로 매핑(그리고 그 반대)

이 단계에서는 Google 이벤트 필드(`start.dateTime`/`start.date`, `recurrence` 등)와 Scheduler 이벤트 필드(`start_date`, `end_date`, `rrule` 등) 간의 변환을 담당하는 매퍼를 구현합니다.

### 다루어야 할 주요 차이점

1) 모든 날(All-day) 이벤트 vs 시간 기반 이벤트
- Google: 모든 날 이벤트는 `start.date` / `end.date`를 사용
- Google: 시간 기반 이벤트는 `start.dateTime` / `end.dateTime`을 사용하며 `timeZone`을 포함할 수 있음
- Scheduler: `start_date` / `end_date`를 사용(날짜 객체)

2) 반복 규칙
- Google은 반복을 배열 문자열로 `RRULE:` 접두사와 함께 저장
- Scheduler는 접두사 없이 `rrule`을 사용

3) 반복 시퀀스 종료일
- Scheduler는 반복 시퀀스의 종료일인 `end_date`를 기대합니다.
- Google은 RRULE에서 `UNTIL=`를 사용하거나 무한 반복일 수 있습니다.

관련 문서: [Recurring events](guides/recurring-events.md).

### Google → Scheduler

`server/mappers/eventMapper.ts`를 업데이트하여 Google 이벤트 형태를 Scheduler의 이벤트 형태로 매핑합니다(아래 발췌; `calculateEndDate()`와 같은 헬퍼 함수는 같은 모듈에 유지합니다):

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

  // 비반복
  if (start?.dateTime && end?.dateTime && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.dateTime);
    ev.end_date = new Date(end.dateTime);
  } else if (start?.date && end?.date && !gEvent.recurrence?.length) {
    ev.start_date = new Date(start.date + "T00:00:00");
    ev.end_date = new Date(end.date + "T00:00:00");
  }

  // 반복
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

  // 예외: 원래 시작 시간
  if (gEvent.originalStartTime?.dateTime) {
    ev.original_start = new Date(gEvent.originalStartTime.dateTime);
  }

  return ev;
}
~~~

### `calculateEndDate()` 헬퍼

Google의 반복 규칙에서 UNTIL 날짜를 추출하거나 무한 반복의 경우 먼 미래의 날짜를 반환합니다. 반복되는 이벤트의 종료일을 Scheduler가 기대하므로 이를 제공합니다:

~~~ts title="server/mappers/eventMapper.ts"
// UNTIL=20260129T205959Z를 'YYYY-MM-DDTHH:mm:ssZ' 형식으로 변환
// UNTIL이 없으면 -> 이벤트가 무한 반복 -> '9999-02-01T00:00:00Z' 반환
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

Scheduler 이벤트 필드를 Google의 스키마로 되돌리기 위한 매퍼 업데이트:

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

    // 반복
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
      // 비반복
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

    // 반복 예외 지원
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

## 5단계 - Scheduler를 백엔드와 연결(로드 + CRUD)

이 단계에서는 Scheduler를 초기화하고 `/events`에서 데이터를 로드하며 DataProcessor를 통해 CRUD를 백엔드로 보냅니다.

### 5.1 권한 부여된 상태와 그렇지 않은 상태의 UI 구분 렌더링

클라이언트에 권한 부여 여부 플래그를 노출하도록 `client/index.ejs`를 업데이트합니다:

~~~html title="client/index.ejs"
<script>
  const GOOGLE_AUTHORIZED = <%= !!googleAuth %>;
</script>
~~~

### 5.2 Scheduler 초기화 및 이벤트 로드

데이터를 로드하도록 `client/main.ts`를 업데이트합니다. 사용자가 인증된 경우에만 데이터를 로드합니다.

다음은 관련 부분만 발췌한 예시입니다:

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

### 5.3 DataProcessor로 Scheduler의 양방향 동기화 활성화

`client/main.ts`를 업데이트하여 Scheduler의 CRUD를 백엔드로 전달합니다.

~~~ts title="client/main.ts"
scheduler.createDataProcessor(async (entity, action, data, id) => {
  const calendars = scheduler.serverList("calendars") as MappedCalendar[];

  // 데모 단순화: 모든 데이터를 첫 번째 사용 가능한 캘린더로 전송합니다.
  // 실제 앱에서는 사용자가 대상 캘린더를 선택하도록 합니다.
  data.calendarId = calendars[0]?.id;

  // 서버가 올바른 dateTime 값을 생성할 수 있도록 클라이언트의 타임존을 제공합니다.
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

관련 문서: [DataProcessor](guides/server-integration.md#technique).

지금까지의 상태로:

- Google Calendar의 이벤트가 권한 부여 후 Scheduler에 나타나야 합니다
- Scheduler에서 생성/수정/삭제가 Google Calendar를 업데이트해야 합니다

---

## Troubleshooting(문제 해결)

### "Error 400: redirect_uri_mismatch"
- 원인: Google Cloud 자격 증명의 Redirect URI가 앱의 콜백 URL과 일치하지 않음
- 해결: Authorized redirect URI가 정확히 아래와 같도록 설정
  - http://localhost:3000/auth/google/callback

### "Access blocked: app has not completed the Google verification process"
- 원인: Consent 화면이 Testing 모드가 아니거나 테스트 사용자로 목록에 없음
- 해결: Publishing status를 Testing으로 설정하고 계정을 **Test users**에 추가

### "No refresh token returned"
- 원인: 특정 클라이언트 ID에 대해 사용자가 최초로 동의할 때만 갱신 토큰이 반환될 수 있음
- 해결: auth 요청에 `accessType: "offline"` 및 `prompt: "consent"`를 포함했는지 확인. 이미 인증한 경우 Google 계정 권한에서 액세스를 취소하고 다시 인증하십시오.

## 요약

다음과 같은 방식으로 Scheduler와 Google Calendar 간의 양방향 동기화를 구현했습니다:

- 백엔드가 Google OAuth 2.0으로 사용자를 인증하고 세션에 토큰을 저장합니다
- Scheduler는 `GET /events`를 통해 달력과 이벤트를 로드합니다
- Scheduler의 CRUD 작업은 `POST/PUT/DELETE /events`를 통해 Google Calendar로 전달됩니다
- Google Calendar와 Scheduler 간의 시간 기반/모든 날 이벤트 및 반복 이벤트를 매핑하는 매퍼를 통해 두 스키마 간의 변환이 이루어집니다

## 데모 저장소 링크

전체 작동 소스:

- https://github.com/DHTMLX/scheduler-google-calendar-demo