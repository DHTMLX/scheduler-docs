---
title: React Scheduler 与 Firebase 集成
sidebar_label: Firebase 快速入门
description: "通过 Firebase Firestore 实时同步构建一个协作的 React Scheduler。"
---

# React Scheduler 与 Firebase 集成

本教程展示如何将 **React Scheduler** 连接到 **Firebase Firestore**，实现实时多用户同步。

您将构建：

- 一个基于 React 状态（`events`）的 Scheduler 页面
- 用于实时更新的 Firestore 监听器
- 一个用于创建/更新/删除的 `data.save` 桥接

## 步骤 1。创建项目

```bash
npm create vite@latest react-scheduler-firebase -- --template react-ts
cd react-scheduler-firebase
npm install firebase
```

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的说明安装 React Scheduler。

对于评估版：

```bash
npm install @dhtmlx/trial-react-scheduler
```

对于专业版，请将 trial 的导入替换为 `@dhx/react-scheduler`。

## 步骤 2。配置 Firebase

在 Firebase 控制台：

1. 创建一个项目。
2. 启用 **Firestore 数据库**。
3. 注册一个 Web 应用并复制 Firebase 配置。

添加 `.env`：

```env
VITE_FIREBASE_CONFIGURATION={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_AUTH_DOMAIN","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_STORAGE_BUCKET","messagingSenderId":"YOUR_MESSAGING_SENDER_ID","appId":"YOUR_APP_ID"}
```

创建 `src/firebase.ts`：

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

## 步骤 3。准备种子数据和类型

创建 `src/seed/data.ts`：

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

## 步骤 4。渲染 Scheduler 并加载事件

创建 `src/components/Scheduler.tsx`：

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

## 步骤 5。将其挂载到应用中

替换 `src/App.tsx`：

```tsx
import SchedulerWithFirebase from "./components/Scheduler";

export default function App() {
  return <SchedulerWithFirebase />;
}
```

## 同步说明

- Firestore `onSnapshot` 会让所有已连接的客户端保持同步。
- 在 `data.save` 返回 `{ id: created.id }` 时，确保 Scheduler 将临时 ID 替换为 Firestore 文档 ID。
- 正式部署前，请确保安全规则设置严格。

## 相关页面

- [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)
- [React Scheduler 概览](integrations/react/overview.md#bindingdata)
- [服务器端集成](guides/server-integration.md)