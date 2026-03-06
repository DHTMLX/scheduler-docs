---
title: "与 dhtmlxDataStore 的集成"
sidebar_label: "与 dhtmlxDataStore 的集成"
---

# 与 dhtmlxDataStore 的集成

本文介绍如何使用 [dhtmlXDataStore](https://docs.dhtmlx.com/datastore__index.html) 对象来同步[多个调度器](guides/multiple-per-page.md)。这些调度器都从同一个数据存储获取数据，因此在一个调度器中更改的事件会自动更新到其他调度器中。

:::note
温馨提示:dhtmlxDataStore 是 [dhtmlxSuite5](https://dhtmlx.com/docs/products/dhtmlxSuite5/) 套件的一部分，并不包含在 dhtmlxScheduler 中。不过，即使没有 dhtmlxSuite 许可证，您依然可以免费将 dhtmlxDataStore 与 dhtmlxScheduler 一起使用。请按照下方步骤在您的应用中进行设置。
:::

- [下载 dhtmlxDataStore 包](https://files.dhtmlx.com/30d/33230caa09f4b5030ea5bfe374ef6d57/dhtmlxDataStore.zip)
- 在页面加载 dhtmlxscheduler.js 之后，添加 *dhtmlxcommon.js* 和 *datastore.js*。请确保加载顺序如下:

~~~js
<script src="dhtmlxscheduler.js"></script>
<script src="datastore/dhtmlxCommon/codebase/dhtmlxcommon.js"></script>
<script src="datastore/datastore.js"></script>
~~~

通过 DataStore 同步调度器的典型方式如下:

~~~js
function init() {
    var data = new dhtmlXDataStore({
        url:"data/data.json",
        scheme:{
            $init:function(obj){
                if (typeof obj.start_date == "string"){
                    obj.start_date = scheduler.templates.parse_date(obj.start_date);
                    obj.end_date = scheduler.templates.parse_date(obj.end_date);
                }
            }
        }
    });

    scheduler1 = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,05,12),"week");
    scheduler1.sync(data, { copy:true });
    

    scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_too',new Date(2019,05,12),"month");
    scheduler2.sync(data, { copy:true });
}
~~~

上述代码的主要流程如下:

1. 首先，按照常规方式初始化 dhtmlXDataStore（详情可参考 [Initialization](https://docs.dhtmlx.com/datastore__initialization.html) 和 [Data scheme](https://docs.dhtmlx.com/datastore__data_scheme.html) 章节，以及 [dhtmlXDataStore 文档](https://docs.dhtmlx.com/datastore__index.html)）。
2. 然后，创建两个调度器。与普通用法类似，不同之处在于我们使用 [sync](https://docs.dhtmlx.com/api__datastore_sync.html) 方法将它们连接到 DataStore。

[sync](https://docs.dhtmlx.com/api__datastore_sync.html) 方法用于将调度器与 DataStore 关联，它接受两个参数:

+ **data** - （必填）为调度器提供数据的 dhtmlXDataStore 实例。
+ **(copy:true)** -  （必填）指示调度器创建 DataStore 数据的副本。

第二个参数需要特别注意，因为它是 dhtmlxScheduler 特有的，在主 dhtmlXDataStore 文档中没有介绍。

此选项指示 DataStore 为每个调度器创建独立的数据副本。因此，在上面的例子中，_DataStore_、_scheduler1_ 和 _scheduler2_ 都各自维护着自己的数据集。但您无需手动同步这些数据集--这一切都会自动完成。当您在某个调度器中做出更改时，更新会传递到 DataStore，进而同步到其他调度器的数据集中。

您可能会疑惑，如果最终效果看起来一样，为什么还需要这个额外的步骤？

原因如下:除了主要的事件属性之外，每个事件还包含一系列由 Scheduler 在运行时分配的内部属性。这些内部属性会根据当前选择的视图而变化。例如，如果同一事件在两个调度器中都被打开，但显示在不同的视图中，这些内部属性的值可能会不同步，导致事件显示异常。

此时，使用参数（**(copy:true)**）可以避免此类问题，确保数据正确处理。此外，数据副本在其他场景下也很有用。

例如，如果页面上有两个调度器显示相同事件，但位于不同时区（如莫斯科和伦敦），共用同一数据集就不合适。为每个调度器维护独立的数据集，可以确保在两个时区都能正确显示事件。


[Integration with dhtmlXDataStore](https://docs.dhtmlx.com/scheduler/samples/10_integration/04_datastore.html)
