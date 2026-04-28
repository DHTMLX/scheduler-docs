---
title: "Firebase 통합"
sidebar_label: "Firebase 통합"
---

# Firebase 통합

이 튜토리얼에서는 DHTMLX Scheduler를 [Firebase Firestore](https://firebase.google.com/products/firestore)와 통합하여 실시간 이벤트 일정 관리자를 구축하는 방법을 배웁니다. 이 통합은 Scheduler UI와 Firestore 데이터베이스 간의 이벤트 데이터 동기화를 원활하게 제공합니다: 모든 업데이트가 연결된 모든 클라이언트에서 실시간으로 일어납니다.

GitHub에서 해당 예제를 확인할 수 있습니다: [DHTMLX Scheduler with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-scheduler-demo).

## 1단계: 프로젝트 설정

새 프로젝트 디렉터리를 만들고 [Vite](https://vite.dev/)를 사용해 새로운 프런트엔드 프로젝트를 초기화하는 것부터 시작합니다:

~~~js
mkdir scheduler-firebase-demo
cd scheduler-firebase-demo
npm create vite@latest . -- --template vanilla
~~~

Vite가 프로젝트를 설정한 후, 새로 시작하기 위해 `src` 폴더를 비웁니다:

~~~js
rm -rf src/*
~~~

이제 필요한 의존성을 설치합니다:

~~~js
npm i dhtmlx-scheduler firebase
~~~

## 2단계: Firebase 프로젝트 생성 및 구성

먼저 아래 단계를 수행하여 Firebase 프로젝트를 만듭니다:

- Firebase 콘솔로 이동
- **프로젝트 만들기**를 클릭
- 프로젝트 이름을 입력하고(예: `scheduler-firebase-demo`) 설정 프롬프트를 따라 진행

다음으로 아래의 단계에 따라 Firestore를 설정합니다:

- Firebase 프로젝트 대시보드에서 **Firestore 데이터베이스**로 이동
- **데이터베이스 만들기**를 클릭
- 선호하는 위치를 선택
- 개발 중 편의를 위해 **테스트 모드**로 시작(프로덕션 전에 보안 규칙을 구성해야 함을 기억)
- **생성** 클릭

그 다음에는 아래와 같이 웹 앱을 등록합니다:

- Firebase 콘솔 사이드바에서 **프로젝트 개요**를 선택
- 새 웹 앱을 등록하려면 웹 앱 아이콘 `</>`를 클릭
- 앱의 닉네임을 입력(예: `scheduler-firebase-demo`)
- Firebase Hosting 활성화
- **앱 등록** 클릭
- 생성된 Firebase 구성 정보를 복사해 프로젝트에서 사용할 수 있도록 합니다

마지막으로 아래와 같이 Firebase를 프로젝트에 구성합니다:

- 새 파일 `src/firebase.js`를 만들고 Firebase 구성 정보를 붙여넣어 Firebase와 Firestore를 초기화합니다:

~~~js title="src/firebase.js"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "scheduler-firebase-demo.firebaseapp.com",
  projectId: "scheduler-firebase-demo",
  storageBucket: "scheduler-firebase-demo.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
~~~

:::note
Placeholder 값(YOUR_API_KEY 등)을 실제 Firebase 프로젝트 자격 증명으로 바꿉니다.
:::

- 배포 및 로컬 에뮬레이션을 위해 Firebase CLI를 전역으로 설치합니다:

~~~js
npm i -g firebase-tools
~~~

## 3단계: DHTMLX Scheduler를 Firestore와 통합

먼저 HTML 컨테이너를 준비합니다. 아래 내용으로 `index.html`의 내용을 교체합니다:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width="device-width," initial-scale="1.0"" />
    <title>Scheduler Firebase demo</title>
  </head>
  <body>
    <div id="scheduler_here" class="dhx_cal_container" 
      style='width:100%; height: 800px;'></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
~~~

그런 다음 아래에 제공된 코드를 사용해 `src/main.js` 파일을 만들어 메인 자바스크립트 로직을 작성합니다. 이 코드는 Scheduler UI를 Firestore와 연결하고 실시간 업데이트를 처리합니다.

~~~js title="src/main.js"
import { scheduler } from "dhtmlx-scheduler";
import { db } from "./firebase.js";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  orderBy,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";

const { remoteUpdates } = scheduler.ext.liveUpdates;

scheduler.plugins({
  recurring: true,
});

scheduler.config.header = [
  "day",
  "week",
  "month",
  "date",
  "prev",
  "today",
  "next",
];

scheduler.init("scheduler_here", new Date(2025, 3, 20), "week");

const eventsRef = collection(db, "events");

scheduler.createDataProcessor(async function (entity, action, ev, id) {
  switch (action) {
    case "create":
      {
        const createdDoc = await addDoc(eventsRef, ev);
        if (createdDoc.id) {
          return { action: "inserted", tid: createdDoc.id };
        }
      }
      break;
    case "update":
      {
        return updateDoc(doc(db, "events", id), ev);
      }
      break;
    case "delete":
      {
        const deletedDoc = await deleteDoc(doc(db, "events", id));
        if (deletedDoc) {
          return { action: "deleted" };
        }
      }
      break;
  }
});

// helper functions to process event data
const processEvent = (docSnapshot) => {
  const event = docSnapshot.data();
  event.id = docSnapshot.id;
  return event;
};

// without it collection wouldn't call onSnapshot
const eventsQuery = query(eventsRef, orderBy("text", "desc")); 

(async () => {
  const EventsSnap = await getDocs(eventsQuery);
  const bulkEvents = EventsSnap.docs.map((ev) => processEvent(ev));
  scheduler.parse(bulkEvents);
  watchRealtime();
})();

const watchRealtime = () => {
  let EventsLoaded = false;

  onSnapshot(eventsQuery, (querySnapshot) => {
    if (!EventsLoaded) {
      // first snapshot sends the current state
      // we have already loaded it at the previous step
      EventsLoaded = true;
      return;
    }
    querySnapshot.docChanges().forEach((change) => {
      // processes only the server-side changes
      if (change.doc.metadata.hasPendingWrites) return;

      const event = processEvent(change.doc);

      switch (change.type) {
        case "added":
          remoteUpdates.events({ type: "add-event", event });
          break;
        case "modified":
          remoteUpdates.events({ type: "update-event", event });
          break;
        case "removed":
          remoteUpdates.events({ type: "delete-event", event });
          break;
      }
    });
  });
};
~~~

이 코드는 DHTMLX Scheduler 라이브러리와 Firebase Firestore를 통합하여 JavaScript 애플리케이션에서 실시간 인터랙티브한 이벤트 달력을 생성합니다. Scheduler UI와 Firestore 데이터베이스 간의 이벤트 데이터를 동기화하여 어느 한 쪽에서 변경된 내용이 다른 쪽에 즉시 반영되도록 합니다. 이 코드는 이벤트 생성, 업데이트, 삭제 및 반복 이벤트를 지원하며 Firestore의 실시간 기능을 활용합니다.

### 주요 함수 요약

- **scheduler.createDataProcessor**: Firestore와 동기화하여 Scheduler 이벤트의 CRUD 작업을 처리합니다:

    - "create"일 때, "events" 컬렉션에 새 문서를 추가합니다.
    - "update"일 때, 해당 Firestore 문서를 업데이트합니다.
    - "delete"일 때, Firestore에서 문서를 제거합니다.

- **processEvent(docSnapshot)**: Firestore 문서 스냅샷을 Scheduler 이벤트 객체로 변환하고 문서의 ID를 연결합니다.

- **(...)() IIFE** : 초기 데이터 로딩. 페이지 로드 시 Firestore에서 기존 이벤트를 모두 불러와 Scheduler로 로드한 뒤 실시간 업데이트를 수신하기 시작합니다.

- **watchRealtime**: Firestore의 `onSnapshot`을 사용해 이벤트 컬렉션의 변경 사항을 실시간으로 듣고 Scheduler UI를 실시간으로 업데이트합니다. 핵심 포인트는 다음과 같습니다:

    - 초기 스냅샷은 무시합니다(이미 로드됨)
    - 서버 측 변경만 처리합니다(로컬, 커밋되지 않은 쓰기는 무시)
    - 추가, 수정, 삭제 이벤트를 Scheduler의 `remoteUpdates`를 호출하여 처리합니다.

- **onSnapshot(q, callback)**: 실시간으로 Firestore의 "events" 컬렉션의 변경 사항을 듣고, "text"를 내림차순으로 정렬하며 추가/수정/삭제 이벤트에 대해 Scheduler UI에 대응하는 실시간 업데이트를 `remoteUpdates.events`를 사용해 적용합니다.

## 4단계: 프로젝트 초기화 및 배포

이제 Firebase Hosting과 Firestore를 초기화해야 합니다. 아래를 따라 진행합니다:

1. 프로젝트 루트에서 다음 명령어를 실행합니다:

~~~js
firebase init
~~~

그러고 나서 아래의 단계들을 수행합니다:

- **Firestore**와 **Hosting** 기능을 선택하려면 스페이스바를 사용합니다
- **Use an existing project**를 선택하고 Firebase 프로젝트를 고릅니다
- Firestore 규칙, 인덱스, 공개 디렉토리에 대해 기본값을 사용합니다
- 공개 디렉토리를 `dist`로 설정합니다( Vite 빌드 출력물)
- GitHub 배포 설정은 필요하지 않으면 건너뜁니다

2. 아래 명령으로 프로젝트를 빌드합니다:

~~~js
npm run build
~~~

3. 아래 명령으로 Firebase Hosting에 배포합니다:

~~~js
firebase deploy
~~~

배포가 완료되면 콘솔에 호스팅 URL이 표시됩니다.