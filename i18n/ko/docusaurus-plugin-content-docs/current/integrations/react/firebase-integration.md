---
title: 리액트 스케줄러와 Firebase 통합
sidebar_label: Firebase 빠른 시작
description: "Firebase Firestore로 실시간 협업이 가능하도록 실시간 동기화되는 리액트 스케줄러를 구축합니다."
---

# 리액트 스케줄러와 Firebase 통합

본 튜토리얼은 **리액트 스케줄러**를 **Firebase Firestore**에 연결하여 실시간 다중 사용자 동기화를 구현하는 방법을 보여줍니다.

다음과 같은 요소를 구축합니다:

- React 상태(`events`)로 뒷받침되는 Scheduler 페이지
- 실시간 업데이트를 위한 Firestore 리스너
- 생성/수정/삭제를 위한 `data.save` 브리지

## 1단계. 프로젝트 생성

```bash
npm create vite@latest react-scheduler-firebase -- --template react-ts
cd react-scheduler-firebase
npm install firebase
```

다음 문서의 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 React Scheduler를 설치합니다.

평가용:

```bash
npm install @dhtmlx/trial-react-scheduler
```

전문 패키지의 경우 trial 임포트를 `@dhx/react-scheduler`로 교체합니다.

## 2단계. Firebase 구성

Firebase 콘솔에서:

1. 프로젝트를 생성합니다.
2. **Firestore 데이터베이스**를 활성화합니다.
3. 웹 앱을 등록하고 Firebase 구성을 복사합니다.

.env 파일 추가:

```env
VITE_FIREBASE_CONFIGURATION={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_AUTH_DOMAIN","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_STORAGE_BUCKET","messagingSenderId":"YOUR_MESSAGING_SENDER_ID","appId":"YOUR_APP_ID"}
```

`src/firebase.ts` 생성:

```ts
import { initializeApp } from "firebase/app";
import { collection, getFirestore, query } from "firebase/firestore";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIGURATION);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const eventsCollection = collection(db, "events");
const eventsQuery = query(eventsCollection);

export { db, eventsCollection, eventsQuery };
```

## 3단계. 시드 및 타입 준비

`src/seed/data.ts` 생성:

```ts
import type { Event as SchedulerEvent } from "@dhtmlx/trial-react-scheduler";

export const seedEvents: SchedulerEvent[] = [
  {
    id: "event_1",
    text: " Planning",
    start_date: "2025-12-08T09:00:00Z",
    end_date: "2025-12-08T10:00:00Z",
  },
  {
    id: "event_2",
    text: "Client call",
    start_date: "2025-12-08T11:00:00Z",
    end_date: "2025-12-08T12:00:00Z",
  },
];
```

## 4단계. Scheduler 렌더링 및 이벤트 로드

`src/components/Scheduler.tsx` 생성:

```tsx
import { useEffect, useMemo, useState } from "react";
import ReactScheduler, { type Event as SchedulerEvent } from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore";

import { db, eventsCollection, eventsQuery } from "../firebase";

const mapDoc = (snap: QueryDocumentSnapshot): SchedulerEvent => {
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
  } as SchedulerEvent;
};

export default function SchedulerWithFirebase() {
  const [events, setEvents] = useState<SchedulerEvent[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const initial = await getDocs(eventsQuery);
      if (!mounted) return;
      setEvents(initial.docs.map(mapDoc));
    })();

    const unsubscribe = onSnapshot(eventsQuery, (snapshot: QuerySnapshot) => {
      const nextEvents = snapshot.docs.map(mapDoc);
      setEvents(nextEvents);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const data = useMemo(
    () => ({
      save: async (
        entity: string,
        action: string,
        raw: SchedulerEvent,
        id: string | number
      ) => {
        if (entity !== "event") return;

        if (action === "create") {
          const created = await addDoc(eventsCollection, {
            ...raw,
            id: undefined,
          });

          return { id: created.id };
        }

        const targetId = String(raw?.id ?? id);
        const targetRef = doc(db, "events", targetId);

        if (action === "update") {
          await updateDoc(targetRef, { ...raw });
          return;
        }

        if (action === "delete") {
          await deleteDoc(targetRef);
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        events={events}
        data={data}
      />
    </div>
  );
}
```

## 5단계. 앱에 마운트

`src/App.tsx`를 교체합니다:

```tsx
import SchedulerWithFirebase from "./components/Scheduler";

export default function App() {
  return <SchedulerWithFirebase />;
}
```

## 동기화에 대한 참고사항

- Firestore `onSnapshot`은 연결된 모든 클라이언트를 실시간으로 동기화합니다.
- `data.save`에서 `{ id: created.id }`를 반환하면 Scheduler가 임시 ID를 Firestore 문서 ID로 교체합니다.
- 생산 배포 전 보안 규칙을 엄격하게 유지하십시오.

## 관련 페이지

- [데이터 바인딩 및 상태 관리 기본](integrations/react/state/state-management-basics.md)
- [리액트 스케줄러 개요](integrations/react/overview.md#bindingdata)
- [서버 통합](guides/server-integration.md)