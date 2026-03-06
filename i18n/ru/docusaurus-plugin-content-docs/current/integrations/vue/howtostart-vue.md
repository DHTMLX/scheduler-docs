---
title: "dhtmlxScheduler с Vue.js"
sidebar_label: "dhtmlxScheduler с Vue.js"
---

# dhtmlxScheduler с Vue.js

Это руководство предполагает, что вы обладаете базовыми знаниями [Vue](https://vuejs.org/) и его паттернов. Если вам нужно освежить память, ознакомьтесь с [документацией Vue 3](https://vuejs.org/guide/introduction.html#getting-started), где есть полезный вводный туториал.

DHTMLX Scheduler отлично работает с Vue. Ознакомьтесь с соответствующим примером на GitHub: [DHTMLX Scheduler with Vue Demo](https://github.com/DHTMLX/vue-scheduler-demo).

## Создание проекта

Перед началом убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/).

Для создания проекта на Vue выполните команду:

~~~
npm create vue@latest
~~~

Эта команда установит и запустит **create-vue** - официальный инструмент для создания проектов на Vue. Подробнее можно узнать в [быстром старте Vue.js](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Установка зависимостей

Далее перейдите в директорию приложения. В этом примере проект будет называться **scheduler-vue**:

~~~
cd scheduler-vue
~~~

Затем установите зависимости и запустите сервер разработки с помощью пакетного менеджера:

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

Теперь ваш проект на Vue будет доступен по адресу [http://localhost:5173](http://localhost:5173).

![Scheduler Vue.js app running](/img/scheduler_vue_app_run.png)

## Создание Scheduler

Перед добавлением Scheduler остановите запущенное приложение, нажав **Ctrl+C** в терминале. После этого установите пакет Scheduler.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Следуйте
[этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ.

После получения Evaluation-версии Scheduler установите её с помощью:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Также, поскольку zip-пакет библиотеки структурирован как модуль **npm**, вы можете
[установить его из локальной папки](guides/installation.md).

## Шаг 2. Создание компонента

Создайте компонент Vue для интеграции Scheduler в ваше приложение. Добавьте новый файл ***Scheduler.vue*** в директорию ***src/components/***.

### Импорт исходных файлов

Откройте ***Scheduler.vue*** и импортируйте исходные файлы Scheduler. В зависимости от способа установки:

- При установке из локальной папки импорты будут такими:

~~~js title="Scheduler.vue"
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- Для trial-версии импорты должны быть следующими:

~~~js title="Scheduler.vue"
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

В этом руководстве используется **trial**-версия Scheduler.

### Задание контейнера и добавление Scheduler

Для отображения Scheduler на странице задайте элемент-контейнер. Пример кода:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 9, 6), "week");
    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

Чтобы контейнер Scheduler занимал всю область body, удалите стандартные стили из ***main.css*** в папке ***src/assets*** и замените их на:

~~~js title="src/assets/main.css"
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Шаг 3. Добавление Scheduler в приложение

Добавьте компонент Scheduler в приложение. Откройте ***src/App.vue*** и замените содержимое на:

~~~js title="src/App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  components: { Scheduler },
};
</script>

<template>
  <Scheduler/>
</template>
~~~

После запуска приложения на странице появится пустой Scheduler:

![Scheduler Vue init](/img/scheduler_init.png)

## Шаг 4. Передача данных

Чтобы отображать события в Scheduler, необходимо передать данные. Создайте файл ***data.js*** в директории ***src/*** и добавьте туда пример событий:

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

Передайте эти данные как props в компонент Scheduler в ***App.vue***:

~~~js title="App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";
import { getData } from "./data";

export default {
  components: { Scheduler },
  data() {
    return {
      events: getData(),
    };
  },
};
</script>

<template>
  <Scheduler :events="events" />
</template>
~~~

Далее используйте props в методе **scheduler.parse()** внутри компонента Scheduler:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  props: ["events"],
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 5, 10), "week");
    scheduler.parse(this.events);

    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

После перезагрузки страницы приложения Scheduler отобразит события:

![Scheduler Vue events](/img/scheduler_events.png)

## Шаг 5. Сохранение данных

Для отслеживания изменений, внесённых в Scheduler, используйте обработчик [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html), который обеспечивает взаимодействие с сервером. Обработчик может быть функцией или объектом-роутером. dhtmlxScheduler поддерживает ответы в виде Promise, что гарантирует корректную обработку завершения действий.

Создайте **DataProcessor** с помощью метода **createDataProcessor()** и отслеживайте изменения следующим образом:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Если ваш backend изменяет id события после создания новой записи (что часто бывает), убедитесь, что ваш Promise возвращает объект с **(id: databaseId)** или **(tid: databaseId)**. Это позволит Scheduler обновить запись с новым id из базы данных. Подробнее см. в разделе [интеграция с сервером](guides/server-integration.md).

На этом настройка Scheduler для Vue завершена. Ознакомьтесь с полной демонстрацией на GitHub: [https://github.com/DHTMLX/vue-scheduler-demo](https://github.com/DHTMLX/vue-scheduler-demo).

## XSS, CSRF и SQL Injection атаки

Обратите внимание, что сам Scheduler не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Безопасность приложения - это ответственность разработчиков, особенно при реализации backend.

Ознакомьтесь со статьёй [Безопасность приложения](guides/app-security.md), чтобы понять уязвимые места компонента и узнать, как повысить безопасность вашего приложения.
