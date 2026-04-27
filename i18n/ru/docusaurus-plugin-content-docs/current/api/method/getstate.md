---
sidebar_label: getState
title: "getState метод"
description: "получает текущее состояние планировщика"
---

# getState

### Description

@short: Получает текущее состояние планировщика

@signature: getState: () =\> any

### Returns
- `state` - (object) - объект состояния

### Example

~~~jsx
const mode = scheduler.getState().mode;
if(mode == "day"){
    // кастомная логика здесь
}
else {
    // кастомная логика здесь
}
~~~

### Related samples
- [Полностью настраиваемый lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Удаление лишних часов из временной шкалы](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

Объект состояния отражает внутреннюю конфигурацию пользовательского интерфейса планировщика и имеет следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>mode</b></td>
  <td>(<i>string</i>) текущее открытое представление</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>Date</i>) активная дата</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>min_date</b></td>
  <td>(<i>Date</i>) дата начала отображения событий в текущем открытом представлении</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>max_date</b></td>
  <td>(<i>Date</i>) дата окончания отображения событий в текущем открытом представлении</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>editor_id</b></td>
  <td>(<i>string</i>) идентификатор события, которое в данный момент редактируется во встроенном редакторе. 'Undefined' или 'null', если никакие события не редактируются во встроенном редакторе.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>lightbox_id</b></td>
  <td>(<i>string</i>) идентификатор события, которое в данный момент открыто в lightbox. 'Undefined' или 'null', если ни одно событие не открыто в lightbox.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>new_event</b></td>
  <td>(<i>Date</i>) флаг, указывающий на то, что в данный момент создаётся новое событие. Текущая дата, если новое событие создаётся в планировщике. 'Undefined' или 'null', если новые события не создаются в планировщике.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select_id</b></td>
  <td>(<i>string</i>) идентификатор текущего выбранного события. 'Undefined' или 'null', если в планировщике не выбрано ни одно событие.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>expanded</b></td>
  <td>(<i>boolean</i>) возвращает <i>true</i>, когда планировщик развернут. 'Undefined' или 'null', если планировщик имеет обычный размер или расширение [expand](guides/extensions-list.md#expand) не включено в приложении.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_id</b></td>
  <td>(<i>string</i>) идентификатор события, которое в данный момент перетаскивается пользователем в планировщике. 'Undefined' или 'null', если никакие задачи не перетаскиваются.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_mode</b></td>
  <td>(<i>'move','resize','create', 'new-size'</i>) режим перетаскивания. 'Underfined' или 'null', если в планировщике не перетаскиваются события.</td>
  </tr>
  </tbody>
</table>

:::note

Примечание: поведение планировщика нельзя изменить путём модификации этого объекта.

:::