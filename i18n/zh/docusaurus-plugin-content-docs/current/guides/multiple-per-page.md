---
title: "在页面上创建多个 Scheduler"
sidebar_label: "在页面上创建多个 Scheduler"
---

# 在页面上创建多个 Scheduler

:::info
此功能仅在 Scheduler PRO 版本（商业许可自 2021 年 10 月 6 日起、Enterprise 和 Ultimate 许可）中提供。
:::

正如您在开始使用该库时很可能已经注意到的，dhtmlxScheduler 是一个静态对象，即同一页面上只能存在一个 dhtmlxScheduler 实例。

现在，对于 PRO 版本，我们应将该说法改写为：在页面上可以存在 _多个实例_ 的 dhtmlxScheduler。您仍然拥有一个默认的 Scheduler 实例，可以通过全局 **scheduler** 对象访问，但您也可以创建新的 Scheduler 对象。

## Scheduler 实例配置

要创建一个新的 dhtmlxScheduler 实例，请使用 `Scheduler.getSchedulerInstance()` 方法：

~~~js
// 注意，命令中的 'Scheduler' 的首字母要大写
const scheduler = Scheduler.getSchedulerInstance();
~~~

该方法可以将一个配置对象作为参数：

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id: 1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", text: "English lesson", subject: 'english' },
            { id: 2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", text: "Math exam", subject: 'math' },
            { id: 3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", text: "Science lesson", subject: 'science' },
            { id: 4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", text: "English lesson", subject: 'english' },
            { id: 5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", text: "Usual event" }
        ]
    }
});
~~~

配置对象可以包含以下属性：

- `container` - (*string|HTMLElement*) 一个 HTML 容器（或其 id），Scheduler 将在其中显示。如果未指定，Scheduler 将在没有容器的情况下初始化
- `config` - (*object*) 一个包含 Scheduler 配置设置的对象
- `xy` - (*object*) 一个包含 [调度器元素尺寸](api/other/xy.md) 的对象
- `templates` - (*object*) 一个包含模板的对象
- `events` - (*object*) 一个包含事件处理程序的对象

在为新的 Scheduler 实例指定事件处理程序时，您需要使用以下格式：

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: (id) => {
            const createdEvent = scheduler.getEvent(id);
            createdEvent.owner = null;
            return true;
        },
        onClick: (id) => {
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) 一个包含要加载的数据的对象，或用于加载数据的 URL
- `plugins` - (*object*) 需要激活的扩展
- `locale` - (*string|object*) 两字母语言代码，或需要激活的区域设置对象

**注**，不带参数调用 `Scheduler.getSchedulerInstance()` 方法将返回具有默认配置的 Scheduler 对象。因此，您需要按常规配置您的新实例、初始化它并像往常一样用数据填充它。

让我们看一个简单的示例：2 个 Scheduler，一个在另一个之下：

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstScheduler = Scheduler.getSchedulerInstance();
    firstScheduler.init("scheduler_here", new Date(2027, 5, 30), "week");
    firstScheduler.load("/data/events");

    const secondScheduler = Scheduler.getSchedulerInstance();
    secondScheduler.init("scheduler_here_2", new Date(2027, 5, 30), "month");
    secondScheduler.load("/data/events");
});
~~~

~~~html
<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Scheduler 与 DataProcessor 实例的 destructor

从版本 6.0 开始，dhtmlxScheduler 对象具备 [`destructor()`](api/method/destructor.md) 方法，可用于销毁不再需要的 Scheduler 实例。

Scheduler 实例的 destructor 可以按如下方式使用：

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();

// 销毁一个 Scheduler 实例
schedulerInstance.destructor();
~~~

destructor 将实现以下任务：

- 清除分配给 Scheduler 实例的数据
- 销毁 dataProcessor（如果已附加到 Scheduler）
- 将 Scheduler 从 DOM 中分离
- 分离通过 [scheduler.event()](api/method/event.md) 方法附加的所有 DOM 事件

### 在 Angular 中使用 destructor

以下是在使用 Angular 框架时，利用 destructor 处置 Scheduler 实例的示例：

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
    ngOnInit() {
        this.$scheduler = Scheduler.getSchedulerInstance();

        // 配置并初始化
    }

    ngOnDestroy() {
        this.$scheduler.destructor();
        this.$scheduler = null;
    }
}
~~~

### 分离 dataProcessor

调用 dataProcessor 的 destructor 将清除 dataProcessor 实例并将其从 Scheduler 中分离。例如：

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();
const dataProcessor = schedulerInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// 销毁 dataProcessor 并从 Scheduler 分离
dataProcessor.destructor();
~~~

:::note
如果你使用的包不允许创建 Scheduler 对象的多个实例（GPL 或 Commercial 版），调用 destructor 将使 Scheduler 在页面重新加载前不可访问。
:::