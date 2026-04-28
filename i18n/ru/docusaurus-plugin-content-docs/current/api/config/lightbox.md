---
sidebar_label: lightbox
title: "lightbox config"
description: "определяет объект lightbox"
---

# lightbox

### Description

@short: Определяет объект lightbox

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections = [
    { name: "description", height: 50, type: "textarea", map_to: "text", focus: true },
    { name: "location", height: 43, type: "textarea", map_to: "event_location" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
...
scheduler.init('scheduler_here', new Date(2027, 2, 1), "week");
~~~

### Related samples
- [Чекбокс в lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Радио-кнопка в lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

Объект lightbox включает одно основное свойство:

- `sections` - (*array*) задаёт секции lightbox

~~~js
// default definition
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

Каждый элемент массива **sections** может иметь следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя секции, которое планировщик использует для получения метки секции из коллекции <i>locale.labels</i>. Например, метка для секции <b>'time'</b> находится как <b>scheduler.locale.labels.section_time</b>.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' или string</i>) имя свойства данных, связанного с секцией (подробнее ниже)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления, используемого в секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) определяет порядок элементов даты и времени в секции 'Time Period'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) если установлено в <i>true</i>, эта секция получит фокус при открытии lightbox</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) значение по умолчанию элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) задаёт функцию-обработчик события 'onChange' для элемента управления секции (<b>только для управления 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора элемента управления (<b>для контролов 'select', 'multiselect', 'radio', 'combo'</b>).<br> Каждый объект в массиве задаёт одну опцию и имеет следующие свойства:<ul><li><b>key</b> - (<i>string</i>) идентификатор опции. Это свойство сравнивается со свойством данных события, чтобы назначить варианты выбора для событий</li><li><b>label</b> - (<i>string</i>) ярлык опции</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) задаёт, должны ли радио-кнопки располагаться вертикально(<i>true</i>) или горизонтально (<i>false</i>) (<b>для управления 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) значение флажка в состоянии отмеченного. Необязательно. По умолчанию <i>true</i> (<b>для управления 'checkbox'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) значение флажка в состоянии снятого. Необязательно. По умолчанию <i>false</i> (<b>для управления 'checkbox'</b>)</td>
  </tr>
  </tbody>
</table>

## Что означает 'map_to:"auto"'?

Когда свойство 'map_to' установлено в 'auto':

- Контрол не будет возвращать значение и будет напрямую изменять значения связанных свойств события в соответствии с методом `set_value()` ([Custom Lightbox Control](guides/custom-lightbox-editor.md)).
- В общем случае, значение `"auto"` используется для сложных контролов, которые работают с несколькими свойствами события

### Related Guides
- [Полностью настраиваемый лайтбокс](guides/custom-details-form.md)
