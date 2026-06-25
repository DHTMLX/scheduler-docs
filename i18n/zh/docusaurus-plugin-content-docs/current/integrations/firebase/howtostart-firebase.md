---
title: "Firebase 集成"
sidebar_label: "Firebase 集成"
---

# Firebase 集成

在本教程中，您将学习如何通过将 DHTMLX Scheduler 与 [Firebase Firestore](https://firebase.google.com/products/firestore) 集成来构建一个实时事件调度器。这种集成实现了 Scheduler UI 与 Firestore 数据库之间的事件数据无缝同步：所有更新都将在所有已连接的客户端上实时发生。

您可以在 GitHub 上查看对应的示例：[DHTMLX Scheduler with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-scheduler-demo)。

## Step 1: Project setup

让我们从创建一个新的项目目录开始，并使用 [Vite](https://vite.dev/) 初始化一个全新的前端项目：

~~~js
mkdir scheduler-firebase-demo
cd scheduler-firebase-demo
npm create vite@latest . -- --template vanilla
~~~

Vite 设置好项目后，清空 `src` 文件夹以重新开始：

~~~js
rm -rf src/*
~~~

现在，安装所需的依赖项：

~~~js
npm i dhtmlx-scheduler firebase
~~~

## Step 2: Create and configure Firebase project

首先，通过以下步骤创建一个 Firebase 项目：

- 打开 Firebase 控制台
- 点击 **Create a project**
- 输入项目名称（例如 `scheduler-firebase-demo`），并按照向导完成设置


然后通过以下步骤设置 Firestore：

- 进入 Firebase 项目仪表板中的 **Firestore Database**
- 点击 **Create database**
- 选择首选位置
- 由于开发阶段方便，选择以**测试模式**开启（生产环境请记得在上线前配置安全规则）
- 点击 **Create**


接着，以如下方式注册您的网页应用：

- 在 Firebase 控制台侧边栏选择 **Project Overview**
- 点击网页应用图标 `</>` 注册一个新网页应用
- 提供应用昵称（例如 `scheduler-firebase-demo`）
- 启用 Firebase Hosting
- 点击 **Register app**
- 复制生成的 Firebase 配置（后续将用于项目中）

最后，按照下述步骤在项目中配置 Firebase：

- 创建新文件 `src/firebase.js`，粘贴您的 Firebase 配置，初始化 Firebase 和 Firestore：

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
請將所有佔位符值（例如 `YOUR_API_KEY` 等）替換為您的實際 Firebase 項目憑證。
:::

- 全局安装 Firebase CLI（用于部署与本地模拟）如下：

~~~js
npm i -g firebase-tools
~~~

## Step 3: Integrate DHTMLX Scheduler with Firestore

首先，准备您的 HTML 容器。将 `index.html` 的内容替换为以下内容：

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

然后，通过创建 `src/main.js` 文件并使用下面提供的代码来指定主要的 JavaScript 逻辑。它将 Scheduler UI 与 Firestore 连接，并处理实时更新。

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

本代码将 DHTMLX Scheduler 库与 Firebase Firestore 集成，用于在 JavaScript 应用中创建一个实时、交互式的事件日历。它在 Scheduler UI 与 Firestore 数据库之间同步事件数据，确保两者中的更改能够在另一方中立即反映。代码支持事件创建、更新、删除与周期性事件，利用 Firestore 的实时能力。

### 关键函数摘要

- **scheduler.createDataProcessor**：通过与 Firestore 同步来处理 Scheduler 事件的 CRUD 操作：

  - 当执行 "create" 时，在 "events" 集合中新增一个文档。
  - 当执行 "update" 时，更新相应的 Firestore 文档。
  - 当执行 "delete" 时，从 Firestore 中删除文档。

- **processEvent(docSnapshot)**：将 Firestore 文档快照转换为 Scheduler 事件对象，并附上文档的 ID。

- **(...)() IIFE**：初始数据加载。在页面加载时从 Firestore 将所有现有事件加载到 Scheduler，然后开始监听实时更新。

- **watchRealtime**：使用 Firestore 的 `onSnapshot` 监听发生在 events 集合中的变化，并实时更新 Scheduler UI。关键点是：

  - 忽略初始快照（已加载）
  - 仅处理服务器端更改（忽略本地、未提交的写入）
  - 通过调用 Scheduler 的 `remoteUpdates` 处理新增、修改和删除事件

- **onSnapshot(q, callback)**：实时监听 Firestore 的 "events" 集合中的变化，按文本降序排序，并对新增、修改或删除的事件应用相应的实时更新到 Scheduler UI，使用 `remoteUpdates.events`。

## Step 4: Initialize and deploy the project

现在需要初始化 Firebase Hosting 和 Firestore。为此，您应该：

1. 从项目根目录，运行以下命令：

~~~js
firebase init
~~~

然后执行以下步骤：

- 使用空格键选择 **Firestore** 与 **Hosting** 功能
- 选择 **Use an existing project** 并选择您的 Firebase 项目
- 对 Firestore 规则、索引和公共目录，接受默认设置
- 将公共目录设置为 `dist`（Vite 构建输出）
- 除非你想配置它，否则跳过 GitHub 部署设置

2. 通过以下命令构建您的项目：

~~~js
npm run build
~~~

3. 使用以下命令部署到 Firebase Hosting：

~~~js
firebase deploy
~~~

部署完成后，控制台会显示您的托管 URL。