---
title: "多用户"
sidebar_label: "多用户"
---

# 多用户

虽然调度器本身不支持独立的日历，但你可以通过将多个数据源加载到同一个调度器实例中来模拟这一功能。

~~~js
// 加载两个数据源
scheduler.load("events_shared.php?user="1"");
scheduler.load("events_shared.php?user="2"");
scheduler.config.readonly = true;
~~~

在服务器端，你可以这样处理:

~~~php
$scheduler->render_sql("select * from events_shared where event_type="1" AND 
userId = ".$user_id,"event_id","start_date,end_date,text,event_type,userId");
~~~

这种方法允许同时显示来自多个来源的数据。示例中的 **userId** 只是一个占位符--实际应用中，你可以根据需求应用任何规则。

这种方式还可以扩展到更高级的场景，例如用户可以查看所有事件，但只能编辑自己的事件:

~~~js
//为第一个数据源启用保存功能
var dp =  scheduler.createDataProcessor("events.php?user");
dp.init(scheduler);
        
//只允许对自己的事件进行编辑操作
function allow_own(id){
    var ev = this.getEvent(id);
    return ev.userId == 1;
}
scheduler.attachEvent("onClick",allow_own);
scheduler.attachEvent("onDblClick",allow_own);

//新建事件的默认属性
scheduler.attachEvent("onEventCreated",function(id){
    const ev = this.getEvent(id);
    // userId 会通过 DataProcessor 发送到后端，
    // 请务必进行校验
    ev.userId = CURRENT_USER_ID; 
});
~~~
