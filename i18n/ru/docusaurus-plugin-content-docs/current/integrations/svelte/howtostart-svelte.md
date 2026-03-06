---
title: "dhtmlxScheduler с Svelte"
sidebar_label: "dhtmlxScheduler с Svelte"
---

# dhtmlxScheduler с Svelte

Это руководство предполагает, что вы знакомы с основными концепциями и паттернами Svelte. Если нет, ознакомьтесь с [документацией Svelte](https://svelte.dev/), где есть полезный вводный туториал.

DHTMLX Scheduler хорошо работает с Svelte. Вы можете посмотреть рабочий пример на GitHub: [DHTMLX Scheduler with Svelte Demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## Создание проекта

Перед созданием нового проекта убедитесь, что у вас установлены [Vite](https://vite.dev/) (необязательно) и [Node.js](https://nodejs.org/en/).

Чтобы создать проект Svelte с помощью Vite, выполните команду:

~~~
npm create vite@latest
~~~

Подробнее смотрите в [соответствующей статье](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).

### Установка зависимостей

Далее перейдите в директорию вашего приложения. Назовём проект **scheduler-svelte** и выберите опцию **svelte**. Затем выполните:

~~~
cd scheduler-svelte
~~~

После этого установите зависимости и запустите приложение с помощью вашего менеджера пакетов:

- Для **yarn** выполните:

~~~
yarn install
yarn dev
~~~

- Для **npm** выполните:

~~~
npm install
npm run dev
~~~

Теперь ваш проект Svelte должен быть доступен по адресу [http://localhost:5173](http://localhost:5173).

![Scheduler Svelte app running](/img/scheduler_svelte_app_run.png)

## Создание Gantt

Чтобы добавить DHTMLX Scheduler, сначала остановите приложение, нажав **Ctrl+C** в терминале. Затем установите пакет Scheduler.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions) для получения доступа.

После получения Evaluation-версии установите её с помощью:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Кроме того, так как zip-пакет библиотеки структурирован как модуль **npm**, вы можете 
[установить его из локальной папки](guides/installation.md).

## Шаг 2. Создание компонента

Создайте новый компонент Svelte для добавления Scheduler в ваше приложение. В директории ***src/*** создайте файл ***Scheduler.svelte***.

### Импорт исходных файлов

Откройте ***Scheduler.svelte*** и импортируйте файлы Scheduler. В зависимости от способа установки:

- Если установлен из локальной папки, импорты будут такими:

~~~js title="Scheduler.svelte"
import { Scheduler } from "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- Если используется trial-версия, импорты должны быть такими:

~~~js title="Scheduler.svelte"
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

В этом руководстве используется **trial**-версия.

### Задание контейнера и добавление Scheduler

Чтобы отобразить Scheduler, определите элемент-контейнер, в котором он будет отображаться. Пример кода ниже:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.init(container, new Date(2023, 9, 6), "week");

        return () => scheduler.destructor();
    });
</script>

<div bind:this="{container}"></div>
~~~

Чтобы контейнер Scheduler занимал всю область body, удалите стандартные стили из ***app.css*** в ***src/*** и добавьте:

~~~js title="src/app.css"
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Шаг 3. Добавление Scheduler в приложение

Далее подключите компонент Scheduler в ваше приложение. Откройте ***src/App.svelte*** и замените содержимое на:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
</script>

<Scheduler/>
~~~

После запуска приложения на странице должен появиться пустой Scheduler:

![Scheduler Svelte init](/img/scheduler_init.png)

## Шаг 4. Добавление данных

Чтобы отобразить события, передайте данные в Scheduler. Создайте файл ***data.js*** в ***src/*** и добавьте пример данных:

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

Затем передайте эти данные как prop в компонент Scheduler в ***App.svelte***:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
  import { getData } from "./data.js";
</script>

<Scheduler data="{getData()}" />
~~~

Внутри ***Scheduler.svelte*** используйте prop с помощью **scheduler.parse()**:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css"
    export let data; /*!*/

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace"
        scheduler.init(container, new Date(2024, 5, 10), "week");

        return () => scheduler.destructor();
    });

    $: scheduler?.parse(data); /*!*/
</script>

<div bind:this="{container}"></div>
~~~

После перезагрузки приложения Scheduler будет заполнен событиями:

![Scheduler Svelte events](/img/scheduler_events.png)

## Шаг 5. Сохранение данных

Чтобы обрабатывать изменения, сделанные в Scheduler, используйте обработчик [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html), который обеспечивает связь с сервером. Обработчик может быть функцией или объектом router. dhtmlxScheduler поддерживает ответы в виде Promise, поэтому он корректно ожидает завершения действий.

Создайте **DataProcessor** с помощью **createDataProcessor()** и обрабатывайте изменения так:

~~~js
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Если ваш backend изменяет идентификаторы событий при создании новых записей (что часто бывает), убедитесь, что ваш Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**, чтобы Scheduler мог обновить событие. Подробнее смотрите в разделе [интеграция с сервером](guides/server-integration.md).

На этом настройка Svelte Scheduler завершена. Вы можете ознакомиться с полной демо-версией на GitHub: [svelte-scheduler-demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## XSS, CSRF и SQL Injection атаки

Обратите внимание, что Scheduler сам по себе не защищает от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Защита приложения лежит на ответственности backend-разработчиков.

Ознакомьтесь со статьёй [Безопасность приложения](guides/app-security.md), чтобы узнать о потенциальных уязвимостях компонента и рекомендуемых мерах безопасности.
