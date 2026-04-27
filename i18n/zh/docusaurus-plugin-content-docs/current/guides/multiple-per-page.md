---
title: "在页面上创建多个调度器"
sidebar_label: "在页面上创建多个调度器"
---

# 在页面上创建多个调度器

:::info
此功能仅在 Scheduler PRO 版本（商业版自 2021 年 10 月 6 日起、Enterprise 和 Ultimate 许可）中可用。
:::

正如您在开始使用库时可能已经注意到的那样，dhtmlxScheduler 是一个静态对象，即页面上只能存在一个 dhtmlxScheduler 实例。

现在，对于 PRO 版本，我们应将该表述改为：页面上可以存在 _多个实例_ 的 dhtmlxScheduler。您仍然有一个默认的调度器实例，可以通过全局 **scheduler** 对象访问，但您也可以创建新的调度器对象。

## Scheduler 实例配置

要创建一个新的 dhtmlxScheduler 实例，请使用 **Scheduler.getSchedulerInstance()** 方法：

~~~js
// 注意，命令中的 'Scheduler' 首字母需要大写
const scheduler = Scheduler.getSchedulerInstance();
~~~

该方法可以接受一个配置对象作为参数：

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true,
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id:1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

配置对象可以包含以下属性：

- **container** - (*string|HTMLElement*) 一个 HTML 容器（或其 id），Scheduler 将在其中显示。如果未指定，Scheduler 将在没有容器的情况下初始化。

- **config** - (*object*) 含有 Scheduler 配置设置的对象

- **xy** - (*object*) 含有 [调度器元素尺寸](api/other/xy.md) 的对象

- **templates** - (*object*) 含有模板的对象

- **events** - (*object*) 含有事件处理程序的对象。

在为新实例指定事件处理程序时，请使用以下格式：

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            const task = scheduler.getEvent(id);
            task.owner = null;
            return true;
        },
        onClick: function(id, e){
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- **data** - (*object|string*) 一个包含要加载的数据的对象，或用于加载数据的 URL

- **plugins** - (*object*) 需要激活的扩展

- **locale** - (*string|object*) 两字母语言代码，或需要激活的 locale 对象

注：如果在调用 **Scheduler.getSchedulerInstance()** 时不带参数，将返回具有默认配置设置的调度器对象。因此，您需要像往常一样配置新实例、初始化它并填充数据。

让我们举一个简单的例子：2 个调度器，一个在另一个之下：

~~~js
window.addEventListener("DOMContentLoaded", function(){
    const scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2027,5,30),"week");
    scheduler1.load("/data/events")
    
    const scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2027,5,30),"month");
    scheduler2.load("/data/events")    
)};

<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>    
</body>
~~~

## Scheduler 与 DataProcessor 实例的析构

从版本 6.0 起，dhtmlxScheduler 对象提供了一个 [destructor](api/method/destructor.md)，可用于销毁不再需要的 Scheduler 实例。

调度器实例的析构函数的使用方式如下：

~~~js
const myScheduler = Scheduler.getSchedulerInstance();
 
// 销毁一个调度器实例
myScheduler.destructor();
~~~

析构函数将执行以下任务：

- 清除加载到调度器实例中的数据
- 销毁 dataProcessor（如果已附加到调度器）
- 将调度器从 DOM 中分离
- 分离通过 [scheduler.event()](api/method/event.md) 方法附加的所有 DOM 事件

### 在 Angular 中使用析构函数

以下是在使用 Angular 框架时，使用析构函数来处置调度器实例的示例：

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // 配置并初始化
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### 分离 dataProcessor

调用 data processor 的析构函数会清除 dataProcessor 实例并将其从调度器中分离。例如：

~~~js
const scheduler = Scheduler.getSchedulerInstance();
const dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// 销毁 data processor 并将其从调度器中分离
dp.destructor();
~~~

:::note
如果你使用的包版本不允许创建调度器对象的多个实例（GPL 或商业版），调用调度器的析构函数将使调度器在页面重新加载前无法访问。
:::