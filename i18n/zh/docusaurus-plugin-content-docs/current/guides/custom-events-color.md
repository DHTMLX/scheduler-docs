--- 
title: "自定义事件的颜色"
sidebar_label: "自定义事件的颜色"
---

# 自定义事件的颜色

有三种方式可以为事件指定自定义颜色：

1. [在事件对象的属性中设置颜色值](guides/custom-events-color.md#specifying-colors-in-properties-of-the-event-object);
2. [为事件附加额外的 CSS 类](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event).
2. [从数据生成样式](guides/custom-events-color.md#loading-colors-with-data).

![自定义事件颜色](/img/custom_event_color.png)

## 在事件对象的属性中指定颜色

要为事件指定自定义颜色，只需在数据对象中添加 2 个额外属性（或仅添加其中一个）：

- **textColor** - 指定事件的文本颜色；
- **color** - 指定事件的背景颜色。

![自定义颜色模型](/img/custom_color_model.png)

在数据对象中设置事件的颜色：
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-21",end_date:"2027-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2027-06-02",end_date:"2027-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

请注意，这些是特殊属性。默认情况下，调度程序总是检查事件是否具有这些属性；如果有，它会将相关值应用到事件的容器和文本。否则，调度程序将对该事件使用预定义的颜色。

这些属性可以具有任意有效的 CSS 颜色值，例如以下表示法均有效：

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~

## 为事件附加额外的 CSS 类

第二种为事件着色的方法是为其应用额外的 CSS 类。

### 技术要点

要为事件应用一个 CSS 类，请使用 [event_class](api/template/event_class.md) 模板。

模板的默认实现是：

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*该函数返回将添加到事件类中的字符串。因此，你可以根据事件的状态返回不同的类。*

[为事件着色](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

### 示例
假设你希望将分配给管理者和员工的事件用不同颜色表示：管理者为绿色，员工为橙色。在这种情况下，你需要做两件事：

1. 为该集合定义一个命名的 serverList，例如命名为 'people'，并将其用于数据源：

 ![扩展数据模型](/img/extended_data_model.png)
2. 为这些类型指定相关的 CSS 类，例如命名为 'manager_event' 和 'employee_event'。对于这样的名称，CSS 定义将如下所示：

[重新定义默认的 CSS 类](Redefining the default CSS classes)

~~~html

    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }

~~~

对于较老版本的 Scheduler（v6.0 及更早版本），不支持 CSS 变量，可以使用以下样式对事件进行着色：

~~~html

    /* day 或 week 视图中的事件 */
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event.employee_event div{
        background-color: #FF9933 !important;
        color: black !important;
    }
 
    /* 月视图中的多日事件 */
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event_line.employee_event{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /* 月视图中時間固定的事件 */
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
    .dhx_cal_event_clear.employee_event{
        color: black !important;
    }

~~~
3. 并且，最终覆盖 [event_class](api/template/event_class.md) 模板

[应用额外的 CSS 类到事件:](Applying additional CSS classes to events:)
~~~js
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~

[为事件着色](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

[使用模板来样式化事件](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

## 使用数据加载颜色

若颜色来自后端，请使用事件组，而不是生成样式表。组集合可描述人员、阶段、资源或任何其他事件类别。

~~~js
[
    {"key":1, "label":"John", "color":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "color":"#f57730", "textColor":"#FFF"}
]
~~~

只需配置一次集合和事件属性。可将 JSON 中收到的集合传给 `parse()`，后续更新使用 `updateCollection()`。

~~~js
scheduler.config.event_groups = { list: "people", property: "owner_id" };
scheduler.init("scheduler_here");
scheduler.parse({
    data: [{ id: 1, text: "Task", start_date: "2027-05-21 09:00", end_date: "2027-05-21 10:00", owner_id: 1 }],
    collections: { people: [{ key: 1, label: "John", color: "#03A9F4", textColor: "#FFF" }] }
});

// Replaces colors and labels from a later server response.
scheduler.updateCollection("people", [
    { key: 1, label: "John", color: "#1565c0", textColor: "#fff" }
]);
~~~

Scheduler 独立解析背景色和文本颜色。事件的 `color` 或 `textColor` 优先，其次是设置相关事件变量的 CSS 规则，然后是事件组颜色，最后是活动主题。如果样式不仅取决于集合值，请保留 `event_class` CSS 规则。