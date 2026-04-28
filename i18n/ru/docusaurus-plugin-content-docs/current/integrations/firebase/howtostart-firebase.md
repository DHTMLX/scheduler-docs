---
title: "Интеграция Firebase"
sidebar_label: "Интеграция Firebase"
---

# Интеграция Firebase

В этом руководстве вы узнаете, как построить планировщик событий в реальном времени, интегрируя DHTMLX Scheduler с [Firebase Firestore](https://firebase.google.com/products/firestore). Эта интеграция обеспечивает бесшовную синхронизацию данных обイベント между интерфейсом Scheduler и базой Firestore: все обновления происходят в реальном времени на всех подключённых клиентах.

Вы можете посмотреть соответствующий пример на GitHub: [Демо DHTMLX Scheduler с Firebase Firestore](https://github.com/DHTMLX/firebase-scheduler-demo).

## Шаг 1: Настройка проекта

Начнём с создания нового каталога проекта и инициализации свежего фронтенд-проекта с использованием [Vite](https://vite.dev/):

~~~js
mkdir scheduler-firebase-demo
cd scheduler-firebase-demo
npm create vite@latest . -- --template vanilla
~~~

После того как Vite настроит проект, очистите папку `src`, чтобы начать с нуля:

~~~js
rm -rf src/*
~~~

Теперь установите необходимые зависимости:

~~~js
npm i dhtmlx-scheduler firebase
~~~

## Шаг 2: Создание и настройка проекта Firebase

Сначала создайте проект Firebase, выполнив следующие шаги:

- перейдите в консоль Firebase
- нажмите **Создать проект**
- введите имя проекта (например, `scheduler-firebase-demo`) и следуйте подсказкам мастера настройки

Затем настройте Firestore, выполнив шаги ниже:

- перейдите в **Firestore Database** на панели управления вашего проекта Firebase
- нажмите **Создать базу данных**
- выберите желаемое расположение
- начните в режиме **test** для упрощения разработки (не забудьте настроить правила безопасности перед продакшном)
- нажмите **Создать**


После этого зарегистрируйте ваше веб-приложение следующим образом:

- выберите **Обзор проекта** в боковой панели Firebase Console
- нажмите значок веб-приложения `</>` для регистрации нового веб-приложения
- укажите псевдоним приложения (например, `scheduler-firebase-demo`)
- включите Firebase Hosting
- нажмите **Register app**
- скопируйте сгенерированную конфигурацию Firebase (вы будете использовать её в вашем проекте)

Наконец, настройте Firebase в вашем проекте следующим образом:

- создайте новый файл `src/firebase.js` и вставьте вашу конфигурацию Firebase, инициализируя Firebase и Firestore:

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
Замените все значения-заполнители (такие как `YOUR_API_KEY`, и т. п.) на реальные учетные данные вашего проекта Firebase.
:::

- установите Firebase CLI глобально (для развёртывания и локального эмулятора) следующим образом:

~~~js
npm i -g firebase-tools
~~~

## Шаг 3: Интеграция DHTMLX Scheduler с Firestore

Для начала подготовьте HTML‑контейнер. Замените содержимое вашего `index.html` следующим образом:

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

Затем укажите основную логику JavaScript, создав файл `src/main.js` с приведённым ниже кодом. Он связывает Scheduler UI с Firestore и обрабатывает обновления в реальном времени.

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

// без этого вызов не появился бы onSnapshot
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
      // первый снимок возвращает текущее состояние
      // мы уже загрузили его на предыдущем шаге
      EventsLoaded = true;
      return;
    }
    querySnapshot.docChanges().forEach((change) => {
      // обрабатываются только серверные изменения
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

Этот код интегрирует библиотеку DHTMLX Scheduler с Firebase Firestore, чтобы создать интерактивный календарь событий в приложении на JavaScript в реальном времени. Он синхронизирует данные об событиях между интерфейсом Scheduler и базой Firestore, обеспечивая мгновенное отражение изменений, сделанных в любой из частей, в другой части. Код поддерживает создание, обновление, удаление и повторяющиеся события, используя возможности Firestore в реальном времени.

### Краткое резюме основных функций

- **scheduler.createDataProcessor**: обрабатывает операции CRUD для событий Scheduler, синхронизируя их с Firestore:

    - При "create" добавляет новый документ в коллекцию "events".
    - При "update" обновляет соответствующий документ Firestore.
    - При "delete" удаляет документ из Firestore.

- **processEvent(docSnapshot)**: преобразует снимок документа Firestore в объект события Scheduler, прикрепляя идентификатор документа.

- **(...)() IIFE** : начальная загрузка данных. Загружает все существующие события из Firestore в Scheduler при загрузке страницы, затем начинает слушать обновления в реальном времени.

- **watchRealtime**: использует `onSnapshot` Firestore для прослушивания изменений в коллекции events и обновления интерфейса Scheduler в реальном времени. Ключевые моменты:

    - игнорирует начальный снимок (уже загружен)
    - обрабатывает только серверные изменения (игнорирует локальные записи, ещё не подтверждённые на сервере)
    - обрабатывает добавленные, изменённые и удалённые события вызовом Scheduler через `remoteUpdates`

- **onSnapshot(q, callback)**: в реальном времени слушает изменения в коллекции Firestore "events", упорядочивая по полю "text" убыванию, и применяет соответствующие живые обновления к Scheduler UI с использованием `remoteUpdates.events` для добавленных, изменённых или удалённых событий.

## Шаг 4: Инициализация и развёртывание проекта

Теперь нужно инициализировать Firebase Hosting и Firestore. Для этого следует:

1. Из корня проекта выполните следующую команду:

~~~js
firebase init
~~~

Затем выполните шаги ниже:

- используйте пробел, чтобы выбрать функции Firestore и Hosting
- выберите **Use an existing project** и выберите ваш проект Firebase
- для правил Firestore, индексов и публичного каталога примите значения по умолчанию
- **установите публичный каталог в `dist` (вывод сборки Vite)**
- пропустите настройку развёртывания на GitHub, если вы не хотите её настраивать

2. Соберите проект, выполнив следующую команду:

~~~js
npm run build
~~~

3. Разверните на Firebase Hosting следующей командой:

~~~js
firebase deploy
~~~

После завершения развёртывания URL хоста будет выведен в консоли.