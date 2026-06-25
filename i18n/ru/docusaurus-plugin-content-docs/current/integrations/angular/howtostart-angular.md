---
title: "dhtmlxScheduler с Angular"
sidebar_label: "dhtmlxScheduler с Angular"
---

# dhtmlxScheduler с Angular

Данное руководство предполагает, что вы обладаете базовыми знаниями концепций и паттернов Angular. Если это не так, рекомендуем ознакомиться с [документацией Angular](https://angular.io/docs) и пройти обучающий курс для начинающих.

DHTMLX Scheduler отлично работает с Angular. Практический пример можно найти на GitHub: [DHTMLX Scheduler with Angular Demo](https://github.com/DHTMLX/angular-scheduler-demo).

## Создание проекта

Перед началом убедитесь, что у вас установлены [Angular CLI](https://angular.io/cli) и [Node.js](https://nodejs.org/en/). Затем выполните команду:

~~~
ng new my-angular-scheduler-app
~~~

Эта команда подготовит все необходимые инструменты и зависимости, никаких дополнительных шагов не потребуется.

### Установка зависимостей

Далее перейдите в папку приложения:

~~~
cd my-angular-scheduler-app
~~~

Запустите приложение одной из следующих команд:

~~~
yarn start
~~~

или

~~~
npm start
~~~

Теперь приложение будет доступно по адресу [http://localhost:4200](http://localhost:4200).

![Scheduler with Angular](/img/scheduler_angular_front.png)

## Создание Scheduler

Чтобы добавить DHTMLX Scheduler, сначала остановите запущенное приложение, нажав **Ctrl+C** в терминале. Затем установите пакет Scheduler.

## Шаг 1. Установка пакета

PRO-версии библиотеки доступны через **npm/yarn** из нашего приватного репозитория. Следуйте 
[этой инструкции](guides/installation.md#npmevaluationandproversions), чтобы получить доступ.

После получения Evaluation-версии установите её с помощью:

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

Создайте новый компонент для интеграции Scheduler. Внутри директории ***src/app/*** создайте папку ***scheduler*** и добавьте в неё файлы: ***scheduler.component.ts***, ***scheduler.component.css*** и ***scheduler.component.html***.

В ***scheduler.component.html*** добавьте следующий шаблон для Scheduler:

~~~js title="scheduler/scheduler.component.html"
<div #scheduler_here class="dhx_cal_container">
   <div class="dhx_cal_navline">
       <div class="dhx_cal_prev_button"></div>
       <div class="dhx_cal_next_button"></div>
       <div class="dhx_cal_today_button"></div>
       <div class="dhx_cal_date"></div>
       <div class="dhx_cal_tab" data-tab="day"></div>
       <div class="dhx_cal_tab" data-tab="week"></div>
       <div class="dhx_cal_tab" data-tab="month"></div>
   </div>
   <div class="dhx_cal_header"></div>
   <div class="dhx_cal_data"></div>
</div>
~~~

Стили для Scheduler объявите отдельно в ***scheduler.component.css***. Пример базовых стилей:

~~~js title="scheduler/scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
:host {
   display: block;
   position: relative;
   height: 100%;
   width: 100%;
}
~~~

Чтобы контейнер Scheduler занимал всю область body, добавьте эти стили в ***styles.css*** в папке ***src***:

~~~js title="src/styles.css"
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

### Импорт исходных файлов

Откройте ***scheduler.component.ts*** и ***scheduler.component.css*** для импорта исходных файлов Scheduler. В зависимости от способа установки:

- Если установлен из локальной папки, импорты выглядят так:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- Если используется trial-версия, импорты должны быть следующими:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

В данном руководстве используется **trial**-версия.

### Указание контейнера и добавление Scheduler

Чтобы отобразить Scheduler на странице, необходимо указать контейнер для его рендера. Пример кода:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2027, 9, 7),
      "week", 
    );
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

Здесь хук жизненного цикла **ngOnInit()** инициализирует Scheduler, а **ngOnDestroy()** вызывает [**scheduler.destructor()**](api/method/destructor.md) для очистки при уничтожении компонента.

## Шаг 3. Добавление Scheduler в приложение

Далее замените содержимое по умолчанию на компонент Scheduler. Откройте ***src/app/app.component.ts*** и обновите его следующим образом:

~~~js title="src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<scheduler></scheduler>`,
})
export class AppComponent {
  name = '';
}
~~~

Создайте ***app.module.ts*** в ***src/app/*** и подключите *SchedulerComponent* следующим образом:

~~~js title="src/app/app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
 
@NgModule({
  declarations: [AppComponent, SchedulerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

Наконец, обновите ***src/main.ts***, заменив его содержимое на:

~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

После повторного запуска приложения на странице появится пустой Scheduler.

![Adding Scheduler into an app](/img/scheduler_angular_init.png)

## Шаг 4. Подключение данных

Чтобы загрузка данных в Scheduler для Angular работала, необходимо добавить сервис для событий. Перед этим нужно определить модель события.

Для создания модели события используйте команду:

~~~
ng generate class models/event --skip-tests
~~~

В новом файле ***event.ts*** в папке ***models*** добавьте следующий код:

~~~js title="models/event.ts"
export class Event {
    id!:  number;
    start_date!: string;
    end_date!: string;
    text!: string;
}
~~~

Далее создайте сервис событий. Это класс, который отвечает за управление определёнными событиями. В Angular сервисы могут внедряться с помощью Dependency Injection. Они могут содержать данные, функции или функциональность, необходимую приложению. Здесь будет создан сервис данных для передачи событий Scheduler.

Для генерации сервиса выполните:

~~~
ng generate service services/event --flat --skip-tests
~~~

В новом файле ***event.service.ts*** в папке ***services*** добавьте следующий код:

~~~js title="services/event.service.ts"
import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2027-05-16 09:00", end_date: "2027-05-16 13:00", 
                text: "Event 1" },
            { id: 2, start_date: "2027-05-18 10:00", end_date: "2027-05-18 14:00", 
                text: "Event 2" },
        ]);
    }
}
~~~

Декоратор **@Injectable()** помечает сервис как доступный для внедрения. В дальнейшем этот сервис будет внедрён в компонент.

В данный момент метод **get()** возвращает промис с жёстко заданными событиями. Также можно загружать данные с сервера и возвращать промис. Компонент Scheduler будет использовать **EventService** для получения событий. Для этого импортируйте **EventService** в ***scheduler.component.ts***:

~~~js title="scheduler.component.ts"
import {EventService} from "../services/event.service";
~~~

Затем укажите **EventService** как provider в декораторе **@Component**:

~~~js title="scheduler.component.ts"
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})
~~~

Это гарантирует, что для каждого *SchedulerComponent* будет создан новый экземпляр сервиса. Для внедрения сервиса в компонент добавьте следующий конструктор в класс **SchedulerComponent**:

~~~js title="scheduler.component.ts"
constructor(private eventService: EventService){}
~~~

Обновите метод **ngOnInit()** чтобы:

- задать формат даты для загрузки событий (здесь используется XML-формат)
- вызвать сервис для получения событий и дождаться данных перед передачей их в Scheduler

~~~js title="scheduler.component.ts"
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement, new Date(2027, 9, 7));
this.eventService.get()
    .then((data) => {
         scheduler.parse(data);
    });
~~~

Полный файл ***scheduler.component.ts*** будет выглядеть так:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";
import {EventService} from "../services/event.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2027, 9, 7),
      "week", 
    );
    this.eventService.get().then((data) => {scheduler.parse(data);});
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

После перезагрузки страницы приложения Scheduler отобразит события.

![Scheduler with Angular events](/img/scheduler_angular_events.png)

## Шаг 5. Сохранение данных

Для отслеживания изменений, внесённых в Gantt, можно использовать обработчик [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) для взаимодействия с серверной частью. Этот обработчик может быть определён как функция или объект router. dhtmlxScheduler поддерживает ответы от обработчика в виде Promise, что обеспечивает корректную обработку действий.

**DataProcessor** можно создать с помощью метода API **createDataProcessor()** для отслеживания изменений следующим образом:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Если сервис изменяет идентификатор события после создания новой записи (что является распространённой практикой), Promise должен возвращать объект, содержащий **(id: databaseId)** или **(tid: databaseId)**. Это позволяет Scheduler обновить запись с новым идентификатором из базы данных.

Подробнее об интеграции с серверной частью читайте [здесь](guides/server-integration.md).

Теперь Angular Scheduler настроен. Вы можете [посмотреть полный демо-проект на GitHub](https://github.com/DHTMLX/angular-scheduler-demo).

## XSS, CSRF и SQL-инъекции

Обратите внимание, что сам Scheduler не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения лежит на ответственности backend-разработчиков.

Больше информации о возможных уязвимостях и рекомендуемых мерах безопасности вы найдёте в статье [Application Security](guides/app-security.md).
