---
title: "dhtmlxScheduler с React"
sidebar_label: "dhtmlxScheduler с React"
---

# dhtmlxScheduler с React

Это руководство предполагает, что вы знакомы с основами [React](https://react.dev/) и его концепциями. Если вы только начинаете работать с React, рекомендуем ознакомиться с [официальной документацией](https://legacy.reactjs.org/docs/getting-started.html).

DHTMLX Scheduler отлично работает с React. Пример интеграции можно найти на GitHub: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## Создание проекта

Перед началом убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/).

Для создания простого проекта на React выполните команду:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### Установка зависимостей

Перейдите в директорию вашего приложения. В данном примере используется **my-react-scheduler-app**:

~~~
cd my-react-scheduler-app
~~~

Далее установите зависимости и запустите сервер разработки с помощью вашего пакетного менеджера:

- Для yarn выполните:

~~~
yarn install
yarn dev
~~~

- Для npm выполните:

~~~
npm install
npm run dev
~~~

Ваш React-проект будет доступен по адресу **http://localhost:5173**.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Создание Scheduler

Чтобы добавить DHTMLX Scheduler, сначала остановите приложение, нажав **Ctrl+C** в командной строке. После этого установите пакет Scheduler.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Пожалуйста, следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

Когда у вас будет Evaluation-версия Scheduler, установите её одной из команд:

- Через npm:

~~~
npm install @dhx/trial-scheduler
~~~

- Через yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Также, так как zip-пакет библиотеки структурирован как **npm**-модуль, вы можете 
[установить его из локальной папки](guides/installation.md).

## Шаг 2. Создание компонента

Создайте React-компонент для добавления Scheduler в приложение. Создайте папку ***src/components/Scheduler*** и в ней файлы: ***Scheduler.jsx***, ***Scheduler.css*** и ***index.js***.

Начните с создания ***Scheduler.css*** со стилями для *scheduler-container*:

~~~js title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Чтобы контейнер Scheduler занимал всю область body, удалите стандартные стили из ***App.css*** в папке ***src*** и добавьте:

~~~
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

Добавьте файл ***index.js*** со следующим содержимым:

~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Импорт исходных файлов

Откройте ***Scheduler.jsx*** и импортируйте исходные файлы Scheduler. В зависимости от способа установки пакета, импорты будут такими:

- Если установлен из локальной папки:

~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- При использовании trial-версии:

~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

В данном руководстве используется **trial**-версия.

### Настройка контейнера и добавление Scheduler

Чтобы отобразить Scheduler на странице, создайте контейнер. Создайте ***Scheduler.jsx*** со следующим кодом:

~~~js title="src/components/Scheduler/Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView( ) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

## Шаг 3. Добавление Scheduler в приложение

Теперь добавьте компонент Scheduler в приложение. Откройте ***src/App.jsx*** и замените содержимое на:

~~~js title="src/App.jsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
            <Scheduler/>
        </div>
    );
}
export default App;
~~~

После запуска приложения на странице появится пустой Scheduler:

![Scheduler React init](/img/scheduler_init.png)

## Шаг 4. Передача данных

Чтобы отобразить события в Scheduler, передайте набор данных. Создайте файл ***data.js*** в директории ***src*** и добавьте события:

~~~js title="src/data.js"
export function getData() {
    const data = [
        {
            start_date: "2024-06-10 6:00",
            end_date: "2024-06-10 8:00",
            text: "Event 1",
            id: 1,
        },
        {
            start_date: "2024-06-13 10:00",
            end_date: "2024-06-13 18:00",
            text: "Event 2",
            id: 2,
        },
    ];
    return data;
}
~~~

Передайте эти данные как props для компонента Scheduler в ***App.jsx***:

~~~js title="App.jsx"
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
               <Scheduler events="{getData()}/">
        </div>
    );
}
export default App;
~~~

Используйте props в методе **scheduler.parse()** внутри компонента Scheduler:

~~~js title="Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView({events}) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        scheduler.parse(events);
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

После перезагрузки страницы приложения вы увидите Scheduler с загруженными событиями:

![Scheduler React events](/img/scheduler_events.png)

## Шаг 5. Сохранение данных

Чтобы обрабатывать изменения, внесённые в Scheduler, используйте обработчик [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html). Это позволит связаться с сервером. Обработчик может быть функцией или объектом router. dhtmlxScheduler поддерживает ответы Promise от обработчика, корректно обрабатывая завершение действия.

Создайте **DataProcessor** с помощью **createDataProcessor()** и отслеживайте изменения следующим образом:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Если ваш backend изменяет id события после создания новой записи (что встречается часто), убедитесь, что Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**. Это позволит Scheduler обновить запись с новым id из базы данных. Подробнее см. в разделе [server side integration](guides/server-integration.md).

На этом настройка React Scheduler завершена. Ознакомьтесь с полной демонстрацией на GitHub: [DHTMLX react-scheduler-demo](https://github.com/DHTMLX/react-scheduler-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что сам Scheduler не защищает от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Ответственность за защиту приложения от этих рисков лежит на разработчиках backend.

Обратитесь к статье [Application Security](guides/app-security.md), чтобы узнать о распространённых уязвимостях и способах повышения безопасности вашего приложения.
