---
title: "dhtmlxScheduler 与 Angular 集成指南"
sidebar_label: "dhtmlxScheduler 与 Angular 集成指南"
---

# dhtmlxScheduler 与 Angular 集成指南

本指南假设你已经具备 Angular 的基础知识和开发模式。如果你是初学者，建议先阅读 [Angular 文档](https://angular.io/docs) 以获取入门教程。

DHTMLX Scheduler 能够顺利地与 Angular 集成。你可以在 GitHub 上找到一个实际示例:[DHTMLX Scheduler with Angular Demo](https://github.com/DHTMLX/angular-scheduler-demo)。

## 创建项目

在开始新项目之前，请确保你已经安装了 [Angular CLI](https://angular.io/cli) 和 [Node.js](https://nodejs.org/en/)。然后运行以下命令:

~~~
ng new my-angular-scheduler-app
~~~

该命令会为你配置好所需的工具和依赖，无需额外步骤。

### 安装依赖

接下来，进入应用目录:

~~~
cd my-angular-scheduler-app
~~~

使用以下任一命令启动应用:

~~~
yarn start
~~~

或

~~~
npm start
~~~

现在你可以通过 [http://localhost:4200](http://localhost:4200) 访问应用。

![Scheduler with Angular](/img/scheduler_angular_front.png)

## 创建 Scheduler

要添加 DHTMLX Scheduler，首先请在终端使用 **Ctrl+C** 停止正在运行的应用。然后继续安装 Scheduler 包。

## 步骤 1. 安装包

库的 PRO 版本可通过 **npm/yarn** 从我们的私有仓库获取。请参阅
[此说明](guides/installation.md#npmevaluationandproversions) 以获取访问权限。

获得 Evaluation 版本后，使用以下命令安装:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

另外，由于库的 zip 包结构为 **npm** 模块，你也可以
[从本地文件夹安装](guides/installation.md#install-from-local-folder)。

## 步骤 2. 创建组件

创建一个新组件以集成 Scheduler。在 ***src/app/*** 目录下，新建 ***scheduler*** 文件夹并添加以下文件:***scheduler.component.ts***、***scheduler.component.css*** 和 ***scheduler.component.html***。

在 ***scheduler.component.html*** 中，为 scheduler 添加如下模板:

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

将 scheduler 的样式单独声明在 ***scheduler.component.css***。以下是一个基础示例:

~~~js title="scheduler/scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
:host {
   display: block;
   position: relative;
   height: 100%;
   width: 100%;
}
~~~

为了确保 Scheduler 容器填满整个页面，在 ***src*** 文件夹下的 ***styles.css*** 中添加如下样式:

~~~js title="src/styles.css"
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

### 导入源文件

打开 ***scheduler.component.ts*** 和 ***scheduler.component.css***，导入 Scheduler 源文件。根据你的安装方式:

- 如果从本地文件夹安装，导入方式如下:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- 如果使用 trial 版本，导入方式如下:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

本教程采用 **trial** 版本。

### 设置容器并添加 Scheduler

为了在页面上显示 Scheduler，需要设置其渲染的容器。代码如下:

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
      new Date(2024, 9, 7),
      "week", 
    );
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

这里，**ngOnInit()** 生命周期钩子用于初始化 Scheduler，**ngOnDestroy()** 在组件销毁时调用 [**scheduler.destructor()**](api/method/destructor.md) 进行清理。

## 步骤 3. 将 Scheduler 添加到应用中

接下来，用 Scheduler 组件替换默认内容。打开 ***src/app/app.component.ts***，并更新如下:

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

在 ***src/app/*** 下创建 ***app.module.ts***，并按如下方式引入 *SchedulerComponent*:

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

最后，更新 ***src/main.ts***，替换其内容为:

~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

再次启动应用后，页面上会显示一个空的 Scheduler。

![Adding Scheduler into an app](/img/scheduler_angular_init.png)

## 步骤 4. 提供数据

要在 Angular Scheduler 中加载数据，需要添加事件服务。在此之前，需定义事件模型。

使用以下命令创建事件模型:

~~~
ng generate class models/event --skip-tests
~~~

在 ***models*** 文件夹中新建的 ***event.ts*** 文件中，添加如下代码:

~~~js title="models/event.ts"
export class Event {
    id!:  number;
    start_date!: string;
    end_date!: string;
    text!: string;
}
~~~

接下来，创建事件服务。该服务类负责管理特定事件。在 Angular 中，服务可以通过依赖注入进行注入。服务可包含应用所需的数据、函数或特性。这里我们创建一个数据服务，为 scheduler 提供事件。

生成事件服务的命令如下:

~~~
ng generate service services/event --flat --skip-tests
~~~

在 ***services*** 文件夹中新建的 ***event.service.ts*** 文件中，加入如下代码:

~~~js title="services/event.service.ts"
import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2023-05-16 09:00", end_date: "2023-05-16 13:00", 
                text: "Event 1" },
            { id: 2, start_date: "2023-05-18 10:00", end_date: "2023-05-18 14:00", 
                text: "Event 2" },
        ]);
    }
}
~~~

**@Injectable()** 装饰器标记该服务可用于注入。稍后会将此服务注入到组件中。

目前，**get()** 方法返回一个包含硬编码事件的已解析 Promise。当然也可以从服务器加载数据并返回 Promise。scheduler 组件将使用 **EventService** 获取事件。为此，首先在 ***scheduler.component.ts*** 中引入 **EventService**:

~~~js title="scheduler.component.ts"
import {EventService} from "../services/event.service";
~~~

然后，在 **@Component** 装饰器中将 **EventService** 指定为 provider:

~~~js title="scheduler.component.ts"
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})
~~~

这样，每次创建 *SchedulerComponent* 时都会提供一个新的服务实例。要将服务注入到组件中，在 **SchedulerComponent** 类中添加如下构造函数:

~~~js title="scheduler.component.ts"
constructor(private eventService: EventService){}
~~~

将 **ngOnInit()** 方法更新为:

- 设置事件加载的数据格式（此处采用 XML 格式）
- 调用服务获取事件，并在获取数据后传递给 scheduler

~~~js title="scheduler.component.ts"
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 9, 7));
this.eventService.get()
    .then((data) => {
         scheduler.parse(data);
    });
~~~

完整的 ***scheduler.component.ts*** 文件如下:

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
      new Date(2024, 9, 7),
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

重新打开应用页面后，Scheduler 应会显示事件数据。

![Scheduler with Angular events](/img/scheduler_angular_events.png)


## 第5步:保存数据

为了跟踪在 Scheduler 中所做的更改，可以使用 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 处理器与后端进行通信。该处理器可以定义为一个函数或路由对象。dhtmlxScheduler 支持处理器返回 Promise，从而确保对操作的正确处理。

可以使用 **createDataProcessor()** API 方法创建 **DataProcessor**，以捕获更改，如下所示:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

如果服务在创建新记录后修改了事件 ID（这很常见），Promise 应返回包含 **(id: databaseId)** 或 **(tid: databaseId)** 的对象。这样 Scheduler 就能用新的数据库 ID 更新记录。

关于服务端集成的更多细节，请参阅[这里](guides/server-integration.md)。

现在 Angular Scheduler 已经配置完成。欢迎[在 GitHub 上查看完整演示](https://github.com/DHTMLX/angular-scheduler-demo)。

## XSS、CSRF 和 SQL 注入攻击

请注意，Scheduler 本身并不提供对 SQL 注入、XSS 或 CSRF 等威胁的防护。确保应用安全是后端开发人员的责任。

有关潜在安全漏洞和推荐的安全做法的更多信息，请参见 [Application Security](guides/app-security.md) 文章。
