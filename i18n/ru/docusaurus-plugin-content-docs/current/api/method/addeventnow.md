---
sidebar_label: addEventNow
title: "addEventNow method"
description: "создаёт новое событие и открывает лайтбокс для подтверждения"
---

# addEventNow

### Description

@short: Добавляет новое событие и открывает lightbox для подтверждения

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *объект* - объект события

### Returns
- ` id` - (string) - идентификатор события

### Example

~~~jsx
scheduler.addEventNow();
//или
scheduler.addEventNow({
    start_date: new Date(2027,0,10,8,30),
    end_date:     new Date(2027,0,10,10,30),
    text:    "Meeting",
    holder:    "John", //userdata
    room:    "5"     //userdata
});
~~~

### Related samples
- [Значения по умолчанию для lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)
- [Обработка подсветки указателя](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Скин Material](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)

### Details

Объект события может иметь следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) дата, когда событие запланировано начать. По умолчанию используется текущая дата. <br> <br> Если свойство указано как строка, следует использовать формат '%d-%m-%Y %H:%i' (чтобы изменить формат по умолчанию, используйте опцию [api_date](api/config/api_date.md))</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) дата, когда событие запланировано завершиться. По умолчанию текущая дата + значение [time_step](api/config/time_step.md). <br> <br> Если свойство указано как строка, следует использовать формат '%d-%m-%Y %H:%i' (чтобы изменить формат по умолчанию, используйте опцию [api_date](api/config/api_date.md))</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) текст события</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) идентификатор события. Если не указан, идентификатор для события будет сгенерирован автоматически</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) набор пользовательских свойств, представленных как пары 'ключ-значение' </td>
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