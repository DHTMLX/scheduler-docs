--- 
title: Интеграция React Scheduler и Firebase
sidebar_label: Быстрый старт с Firebase
description: "Создайте совместную работу в реальном времени в React Scheduler, синхронизированную через Firebase Firestore."
---

# Интеграция React Scheduler и Firebase

Это руководство показывает, как подключить **React Scheduler** к **Firebase Firestore** для синхронизации между несколькими пользователями в реальном времени.

Вы создадите:

- страницу Scheduler, управляемую состоянием React (`events`)
- слушатели Firestore для обновлений в реальном времени
- мост `data.save` для создания/обновления/удаления

## Шаг 1. Создание проекта

```bash
npm create vite@latest react-scheduler-firebase -- --template react-ts
cd react-scheduler-firebase
npm install firebase
```

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

Для оценки:

```bash
npm install @dhtmlx/trial-react-scheduler
```

Для профессионального пакета замените импорт из trial на `@dhx/react-scheduler`.

## Шаг 2. Настройка Firebase

В консоли Firebase:

1. Создайте проект.
2. Включите **Firestore Database**.
3. Зарегистрируйте веб-приложение и скопируйте конфигурацию Firebase.

Добавьте `.env`:

```env
VITE_FIREBASE_CONFIGURATION={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_AUTH_DOMAIN","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_STORAGE_BUCKET","messagingSenderId":"YOUR_MESSAGING_SENDER_ID","appId":"YOUR_APP_ID"}
```

Создайте `src/firebase.ts`:

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

## Шаг 3. Подготовка сидов и типов

Создайте `src/seed/data.ts`:

```ts
import type { Event as SchedulerEvent } from "@dhtmlx/trial-react-scheduler";

export const seedEvents: SchedulerEvent[] = [
  {
    id: "event_1",
    text: "Planning",
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

## Шаг 4. Рендеринг Scheduler и загрузка событий

Создайте `src/components/Scheduler.tsx`:

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

## Шаг 5. Подключение к приложению

Замените `src/App.tsx`:

```tsx
import SchedulerWithFirebase from "./components/Scheduler";

export default function App() {
  return <SchedulerWithFirebase />;
}
```

## Примечания по синхронизации

- Firestore `onSnapshot` обеспечивает синхронизацию всех подключённых клиентов.
- Возврат `{ id: created.id }` в `data.save` обеспечивает замену временных идентификаторов на идентификаторы документов Firestore.
- Держите правила безопасности строгими перед развёртыванием в продакшн.

## Связанные страницы

- [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- [Обзор React Scheduler](integrations/react/overview.md#bindingdata)
- [Интеграция с сервером](guides/server-integration.md)