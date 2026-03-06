---
sidebar_label: "addEventNow"
title: "addEventNow method"
description: "создаёт новое событие и открывает лайтбокс для подтверждения"
---

# addEventNow

### Description

@short: Создаёт новое событие и открывает лайтбокс для подтверждения

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *object* - объект с деталями события

### Returns
- ` id` - (string) - уникальный идентификатор события

### Example

~~~jsx
scheduler.addEventNow();
//или
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

Объект события поддерживает следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) дата и время начала события. По умолчанию текущие дата и время. <br> <br> Если передано в виде строки, должно соответствовать формату '%d-%m-%Y %H:%i' 
  (этот формат можно изменить через опцию [api_date](api/config/api_date.md))</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) дата и время окончания события. По умолчанию текущая дата плюс значение из [time_step](api/config/time_step.md). <br> <br> Если передано в виде строки, должно соответствовать формату '%d-%m-%Y %H:%i' (можно изменить через опцию [api_date](api/config/api_date.md))</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) заголовок или описание события</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) уникальный идентификатор события. Если не указан, id будет сгенерирован автоматически</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) набор пользовательских свойств в формате ключ-значение </td>
  </tr>
  </tbody>
</table>

<br>

### Related API
- [api_date](api/config/api_date.md)
- [time_step](api/config/time_step.md)
- [addEvent](api/method/addevent.md)

### Related Guides
- [Добавление/Удаление событий](guides/adding-events.md)
