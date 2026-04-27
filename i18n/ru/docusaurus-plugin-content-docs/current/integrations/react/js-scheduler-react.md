---
title: "dhtmlxScheduler с React"
sidebar_label: "dhtmlxScheduler с React"
---

# dhtmlxScheduler с React

Вам следует быть знакомым с базовыми концепциями и шаблонами [React](https://react.dev/), чтобы пользоваться этой документацией.  
Если нет, ознакомьтесь с [React документацией](https://react.dev/learn) для введения в работу.

DHTMLX Scheduler совместим с React. Вы можете увидеть соответствующий пример на GitHub: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## Создание проекта

Перед началом убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/).

Вы можете создать базовый проект React с помощью следующей команды:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### Установка зависимостей

Далее перейдите в директорию приложения. Назовём наш проект **my-react-scheduler-app** и запустим:

~~~
cd my-react-scheduler-app
~~~

После этого нужно установить зависимости и запустить dev-сервер. Для этого используйте менеджер пакетов:

- если вы используете yarn, выполните следующие команды:

~~~
yarn install
yarn dev
~~~

- если же вы пользуетесь npm, выполните следующие команды:

~~~
npm install
npm run dev
~~~

Теперь ваше приложение на React должно работать на **http://localhost:5173**.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Создание Scheduler

Теперь нужно получить код DHTMLX Scheduler. Сначала остановим приложение, нажав **Ctrl+C** в командной строке. Затем можно приступить к установке пакета Scheduler.

### Шаг 1. Установка пакета

ПРО-версии библиотеки доступны для установки через **npm/yarn** из нашего приватного репозитория, пожалуйста, следуйте  
[данной инструкции](guides/installation.md#npm---evaluation-and-pro-versions) чтобы получить доступ к нему.

После того как вы получите Evaluation-версию Scheduler, вы можете установить её следующими командами:

- для npm:

~~~
npm install @dhx/trial-scheduler
~~~

- для yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Либо, поскольку zip-пакет библиотеки структурирован как модуль **npm**, вы можете [установить его из локальной папки](guides/installation.md#installing-the-package-from-a-local-folder).

## Шаг 2. Создание компонента

Теперь нужно создать React-компонент, чтобы добавить Scheduler в приложение. Давайте создадим папку ***src/components/Scheduler***.  
Здесь мы создадим файлы ***Scheduler.jsx***, ***Scheduler.css*** и ***index.js***.

Необходимо создать файл ***Scheduler.css*** и добавить стили для *scheduler-container*:


~~~css title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Чтобы Scheduler занимал всё пространство body, нужно убрать стандартные стили из файла ***App.css***, который расположен в папке ***src***, и добавить следующие:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

И добавить файл ***index.js*** со следующим содержимым:

~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Импорт исходников

Откройте только что созданный файл ***Scheduler.jsx*** и импортируйте исходники Scheduler. Обратите внимание, что:

- если вы установили пакет Scheduler из локальной папки, ваши пути импорта будут выглядеть так:

~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- если вы выбрали установить пробную версию, пути импорта должны быть как в примере:

~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

В этом руководстве мы будем использовать пробную версию Scheduler.

### Установка контейнера и добавление Scheduler

Чтобы отобразить Scheduler на странице, нужно задать контейнер, в который будет отрисовываться компонент. Создайте файл ***Scheduler.jsx*** со следующим кодом:

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

Теперь пора добавить компонент в наше приложение. Откройте ***src/App.jsx*** и используйте компонент *Scheduler* вместо стандартного содержимого, вставив код ниже:

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

После этого, при запуске приложения, вы увидите пустой Scheduler на странице:

![Scheduler React init](/img/scheduler_init.png)

## Шаг 4. Предоставление данных

Чтобы добавить данные в Scheduler, необходимо предоставить набор данных. Давайте создадим файл ***data.js*** в директории ***src/*** и добавим в него данные:


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

И следует [передать props (наши данные)](https://react.dev/learn/passing-props-to-a-component) в компонент Scheduler в ***App.jsx***:

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

И используйте props в методе **scheduler.parse()** внутри Scheduler-компонтента:

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

Теперь, если вы снова откроете страницу приложения, вы увидите Scheduler с событиями:

![Scheduler React events](/img/scheduler_events.png)

## Шаг 5. Сохранение данных

Чтобы зафиксировать изменения, внесённые в Scheduler, можно использовать обработчик [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html), который позволяет «общаться» с серверной частью. Обработчик можно объявлять либо как функцию, либо как router-объект.  
dhtmlxScheduler принимает ответ Promise от обработчика, поэтому ваш Scheduler корректно обработает завершение действия. 

Вы можете создать **DataProcessor** через API-метод **createDataProcessor()** и зафиксировать изменения вот так:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Если ваш сервис изменяет id события после создания новой записи (что обычно так и происходит), убедитесь, что ваш Promise возвращает объект вида **(id: databaseId)** или **(tid: databaseId)** в качестве результата, чтобы Scheduler мог применить новый идентификатор базы данных к запиcи. Узнать [более подробную информацию о серверной стороне](guides/server-integration.md).

Итак, React Scheduler готов, добро пожаловать посмотреть полную демонстрацию на GitHub: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что Scheduler не предоставляет средств для предотвращения угроз в приложении, таких как инъекции SQL или атаки XSS и CSRF. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих backend.

Ознакомьтесь со статьёй [Application Security](guides/app-security.md), чтобы узнать наиболее уязвимые точки компонента и меры по улучшению безопасности вашего приложения.