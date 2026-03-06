---
sidebar_label: "addEventNow"
title: "addEventNow method"
description: "创建一个新的事件并打开lightbox进行确认"
---

# addEventNow

### Description

@short: 创建一个新的事件并打开lightbox进行确认

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *object* - 事件详情对象

### Returns
- ` id` - (string) - 事件的唯一标识符

### Example

~~~jsx
scheduler.addEventNow();
//或者
scheduler.addEventNow({
    start_date: new Date(2013,0,10,8,30),
    end_date:     new Date(2013,0,10,10,30),
    text:    "Meeting",
    holder:    "John", //userdata
    room:    "5"     //userdata
});
~~~

### Related samples
- [Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)

### Details

事件对象支持以下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) 事件的开始日期和时间。默认值为当前日期和时间。<br><br>如果以字符串形式提供，应遵循 '%d-%m-%Y %H:%i' 格式
  （此格式可通过 [api_date](api/config/api_date.md) 选项进行更改）</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) 事件的结束日期和时间。默认值为当前日期加上 [time_step](api/config/time_step.md) 中定义的时间步长。<br><br>如果以字符串形式提供，
  应遵循 '%d-%m-%Y %H:%i' 格式（可通过 [api_date](api/config/api_date.md) 选项修改）</td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) 事件的标题或描述</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) 事件的唯一标识符。如果省略，将自动生成id</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) 以键值对形式表示的一组自定义属性</td>
  </tr>
  </tbody>
</table>

<br>

### Related API
- [api_date](api/config/api_date.md)
- [time_step](api/config/time_step.md)
- [addEvent](api/method/addevent.md)

### Related Guides
- [이벤트 추가/삭제](guides/adding-events.md)
