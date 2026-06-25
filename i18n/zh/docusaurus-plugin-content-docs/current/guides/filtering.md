--- 
title: "筛选事件"
sidebar_label: "筛选事件"
---

# 筛选事件

对于任何指定的视图，您可以设置一个过滤函数，该函数将定义在 Scheduler 中应显示哪些事件以及哪些不应显示。

~~~js
scheduler.filter_week = (id, event) => {
    if (event.name === 'New event') {
        return false; // 该事件将被过滤（不会渲染）
    }

    return true; // 该事件将被渲染
};
~~~

在此，`"week"` 是 `scheduler.filter_week` 中视图的名称。

`filter_(viewName)` 方法接收两个参数：

- `id` - 事件的 id
- `event` - 事件对象

请记住，您可以为不同的视图设置不同的过滤函数：

~~~js
scheduler.filter_day = scheduler.filter_week = (id, event) => {
    // some code
};
...
scheduler.filter_timeline = (id, event) => {
    // some other code
};

~~~

### 相关示例
- [筛选事件](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)