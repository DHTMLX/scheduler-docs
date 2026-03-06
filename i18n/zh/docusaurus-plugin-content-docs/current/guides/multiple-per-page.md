---
title: "在页面上创建多个调度器"
sidebar_label: "在页面上创建多个调度器"
---

# 在页面上创建多个调度器

:::info
此功能仅在 Scheduler PRO 版本中可用（自 2021 年 10 月 6 日起为商业版、企业版和旗舰版许可）。
:::

最初在使用该库时，您可能注意到 dhtmlxScheduler 是一个静态对象，意味着在页面上_只能存在一个_ dhtmlxScheduler 实例。

然而，在 PRO 版本中，这一限制被打破:现在_可以在同一页面上共存多个_ dhtmlxScheduler 实例。全局的 **scheduler** 对象仍然可以访问默认的调度器实例，但您也可以创建额外的调度器对象。

## 调度器实例的配置 {#schedulerinstanceconfiguration}

要创建新的 dhtmlxScheduler 实例，请使用 **Scheduler.getSchedulerInstance()** 方法:

~~~js
// 注意 'Scheduler' 首字母大写
const scheduler = Scheduler.getSchedulerInstance();
~~~

此方法可以接收一个配置对象作为参数:

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
            { id:1, start_date: "2022-04-18 09:00", end_date: "2022-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2022-04-20 10:00", end_date: "2022-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2022-04-21 10:00", end_date: "2022-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2022-04-23 16:00", end_date: "2022-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2022-04-22 09:00", end_date: "2022-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

配置对象可以包含以下属性:

- **container** - (*string|HTMLElement*) Scheduler 渲染的 HTML 容器或其 id。如果省略，将在没有容器的情况下初始化 Scheduler。
- **config** - (*object*) Scheduler 的配置设置
- **xy** - (*object*) 调度器元素的尺寸，详见 [](api/other/xy.md)
- **templates** - (*object*) 模板配置
- **events** - (*object*) 事件处理函数。


为新调度器实例指定事件处理函数时，使用如下格式:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            var task = scheduler.getEvent(id);
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

- **data** - (*object|string*) 要加载的数据或用于获取数据的 URL
- **plugins** - (*object*) 要激活的扩展
- **locale** - (*string|object*) 两位语言代码或要激活的本地化对象

**注意**:调用 **Scheduler.getSchedulerInstance()** 不带参数时，将返回一个带有默认设置的调度器对象。您仍然需要像往常一样对新实例进行配置、初始化并加载数据。

下面是一个简单示例，演示了两个调度器上下堆叠显示:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
    scheduler1.load("/data/events");
    
    var scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
    scheduler2.load("/data/events");    
});

<body>
    <div id="scheduler_here"></div>
    <div id="scheduler_here_2"></div>    
</body>
~~~

## Scheduler 和 DataProcessor 实例的析构函数 {#destructorofscheduleranddataprocessorinstances}

从 6.0 版本开始，dhtmlxScheduler 提供了 [destructor](api/method/destructor.md)，用于销毁不再需要的 Scheduler 实例。

可以按如下方式使用调度器实例的析构函数:

~~~js
var myScheduler = Scheduler.getSchedulerInstance();
 
// 销毁 scheduler 实例
myScheduler.destructor();
~~~

析构函数会执行以下操作:

- 清除加载到调度器实例中的数据
- 如果已附加，则销毁 dataProcessor
- 将调度器从 DOM 中分离
- 移除通过 [scheduler.event()](api/method/event.md) 方法附加的所有 DOM 事件

### 在 Angular 中使用析构函数

以下是在 Angular 中使用析构函数清理调度器实例的示例:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // 配置和初始化
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### 分离 dataProcessor

调用 dataProcessor 的析构函数会清理该实例并将其从调度器中分离。例如:

~~~js
var scheduler = Scheduler.getSchedulerInstance();
var dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// 销毁 dataProcessor 并从 scheduler 中分离
dp.destructor();
~~~

:::note
如果您使用的包不支持多个调度器实例（如 GPL 或 Commercial 版本），调用 scheduler 的析构函数后，调度器将不可用，直到页面重新加载。
:::

## 相关文章


- [dhtmlxLayout와의 통합](integrations/other/dhxlayout-integration.md)
