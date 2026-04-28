--- 
sidebar_label: addEvent
title: "addEvent 方法"
description: "添加一个新事件"
---

# addEvent

### Description

@short: 添加一个新事件

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (必填) *object* - 事件对象

### Returns
- `id` - (string) - 事件的 ID

### Example

~~~jsx
scheduler.addEvent({
    start_date: "2027-06-16 09:00",
    end_date: "2027-06-16 12:00",
    text: "Meeting",
    holder: "John", // userdata
    room: "5" // userdata
});
~~~

### Related samples
- [验证 lightbox 字段](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [自定义事件框](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

该方法会触发 [onEventAdded](api/event/oneventadded.md) 或 [onEventChanged](api/event/oneventchanged.md) 事件
 
:::

事件对象可以包含以下属性:

- `start_date` - (*Date,string*) 事件开始计划的日期。若属性以字符串形式指定，请使用 "%d-%m-%Y %H:%i" 格式（若要修改默认格式，请使用 [`api_date`](api/config/api_date.md) 选项）。对于 [循环事件](guides/recurring-events.md) ，`start_date` 属性的值必须为 Date 类型。
- `end_date` - (*Date,string*) 事件结束计划的日期。若属性以字符串形式指定，请使用 "%d-%m-%Y %H:%i" 格式（若要修改默认格式，请使用 [`api_date`](api/config/api_date.md) 选项）。对于 [循环事件](guides/recurring-events.md) ，`end_date` 属性的值必须为 Date 类型。
- `text` - (*string*) 事件文本。
- `id` - (*string*) 事件的 ID。如果未指定，将自动为该事件生成 ID。
- `userdata` - (*hash*) 以 '键值对' 形式呈现的一组自定义属性。

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)