---
sidebar_label: "all_timed"
title: "all_timed config"
description: "以'短格式'显示多天事件（类似于单天事件的显示方式）"
---

# all_timed

### Description

@short: 以"短格式"显示多天事件（类似于单天事件的显示方式）

@signature: all_timed: boolean | string


**Default value:** 'short'

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

:::note
 该属性需要启用 [all_timed](guides/extensions-list.md#all-timed) 插件。 
:::

作为字符串时，该参数仅接受一个值--*'short'*。

<br>

该参数有三种可能的取值:

- **'short'**  - 仅以常规格式显示持续时间少于24小时（跨天开始和结束）的多天事件
- **true** - 以常规格式显示所有多天事件
- **false** - 以线条形式显示所有多天事件，位于调度器顶部（多天事件的默认显示模式）

如果你想更精细地控制哪些事件显示在多天区域，哪些显示在日视图列中，
可以通过重写模块的 `isMainAreaEvent` 方法来实现，代码如下:

~~~js
const { isMainAreaEvent } = scheduler.ext.allTimed;
scheduler.ext.allTimed.isMainAreaEvent = function(event) {
    if(event.multidaySection){
        return false;
    }else{
        return isMainAreaEvent(event);
    }
};
~~~

### Change log
- 该插件自版本7.2起默认启用
