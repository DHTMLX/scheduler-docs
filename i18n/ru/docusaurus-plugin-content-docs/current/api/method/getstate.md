---
sidebar_label: "getState"
title: "getState method"
description: "получает текущее состояние scheduler'а"
---

# getState

### Description

@short: Получает текущее состояние scheduler'а

@signature: getState: () =\> any

### Returns
- `state` - (object) - объект состояния

### Example

~~~jsx
var mode = scheduler.getState().mode;
if(mode == "day"){
    // кастомная логика здесь
}
else {
    // кастомная логика здесь
}
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

Объект состояния представляет внутреннюю конфигурацию UI scheduler'а и включает следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>mode</b></td>
  <td>(<i>string</i>) текущий активный вид</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>date</b></td>
  <td>(<i>Date</i>) выбранная дата</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>min_date</b></td>
  <td>(<i>Date</i>) дата начала, с которой показываются события в текущем виде</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>max_date</b></td>
  <td>(<i>Date</i>) дата окончания, до которой показываются события в текущем виде</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>editor_id</b></td>
  <td>(<i>string</i>) ID события, которое в данный момент редактируется inline. Будет 'undefined' или 'null', если никакое событие не редактируется inline.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>lightbox_id</b></td>
  <td>(<i>string</i>) ID события, которое открыто в lightbox. Будет 'undefined' или 'null', если никакое событие не открыто в lightbox.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>new_event</b></td>
  <td>(<i>Date</i>) указывает, создаётся ли в данный момент новое событие. Содержит текущую дату, если создаётся новое событие, иначе 'undefined' или 'null'.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select_id</b></td>
  <td>(<i>string</i>) ID текущего выбранного события. Будет 'undefined' или 'null', если событие не выбрано.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>expanded</b></td>
  <td>(<i>boolean</i>) true, если scheduler развернут. Будет 'undefined' или 'null', если scheduler находится в обычном размере или если расширение [expand](guides/extensions-list.md#expand) не включено.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_id</b></td>
  <td>(<i>string</i>) ID события, которое в данный момент перетаскивается. Будет 'undefined' или 'null', если событие не перетаскивается.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>drag_mode</b></td>
  <td>(<i>'move','resize','create', 'new-size'</i>) текущий режим drag. Будет 'undefined' или 'null', если событие не перетаскивается.</td>
  </tr>
  </tbody>
</table>

:::note

Обратите внимание, изменение этого объекта не повлияет на поведение scheduler'а.
 
:::
