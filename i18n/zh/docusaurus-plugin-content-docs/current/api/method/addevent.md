---
sidebar_label: "addEvent"
title: "addEvent method"
description: "添加一个新事件"
---

# addEvent

### Description

@short: 添加一个新事件

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - 事件对象

### Returns
- ` id` - (string) - 事件的id

### Example

~~~jsx
scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:    "16-06-2013 12:00",
    text:    "Meeting",
    holder:    "John", // userdata
    room:    "5"     // userdata
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

该方法会触发 [onEventAdded](api/event/oneventadded.md) 或 [onEventChanged](api/event/oneventchanged.md) 事件
 
:::

事件对象可以包含以下属性:

- **start_date** - (*Date,string*) 事件开始的日期。如果以字符串形式提供，应遵循 "%d-%m-%Y %H:%i" 格式（如需调整默认格式，请参阅 [api_date](api/config/api_date.md) 选项）。对于[重复事件](guides/recurring-events.md)，**start_date** 必须是 Date 类型。
- **end_date** - (*Date,string*) 事件预期结束的日期。如果以字符串形式提供，应使用 "%d-%m-%Y %H:%i" 格式（如需修改默认格式，参见 [api_date](api/config/api_date.md) 选项）。对于[重复事件](guides/recurring-events.md)，**end_date** 必须是 Date 类型。
- **text** - (*string*) 事件描述。
- **id** - (*string*) 事件标识符。如果省略，将自动生成一个id。
- **userdata** - (*hash*) 一组自定义属性，以"键-值"对形式表示。

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [이벤트 추가/삭제](guides/adding-events.md)
