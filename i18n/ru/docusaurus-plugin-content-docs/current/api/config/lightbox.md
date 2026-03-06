---
sidebar_label: "lightbox"
title: "lightbox config"
description: "определяет объект lightbox"
---

# lightbox

### Description

@short: Определяет объект lightbox

@signature: lightbox: any

### Example

~~~jsx
scheduler.config.lightbox.sections=[    
    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
    { name:"location",    height:43, type:"textarea", map_to:"event_location"},
    { name:"time",           height:72, type:"time",     map_to:"auto"}    
];
...            
scheduler.init('scheduler_here',new Date(2013,2,1),"week");
~~~

### Related samples
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)
- [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

### Details

Объект lightbox включает одно основное свойство:

- **sections** - (*массив*) определяет секции, отображаемые в lightbox

~~~js
//определение по умолчанию
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
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
  <td>(<i>any</i>) значение по умолчанию для элемента управления в секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) обработчик события 'onChange' для элемента управления (<b>только для 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>массив объектов</i>) определяет варианты выбора для элементов управления типа <b>'select', 'multiselect', 'radio', 'combo'</b>.<br> Каждый объект в этом массиве представляет вариант и имеет следующие свойства:<ul><li><b>key</b> - (<i>string</i>) id варианта, используется для сопоставления с данными события</li><li><b>label</b> - (<i>string</i>) отображаемая метка варианта</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) определяет, располагаются ли радио-кнопки вертикально (<i>true</i>) или горизонтально (<i>false</i>) (<b>только для 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) значение, присваиваемое при отмеченном checkbox. Необязательно, по умолчанию <i>true</i> (<b>только для 'checkbox'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) значение, присваиваемое при снятом checkbox. Необязательно, по умолчанию <i>false</i> (<b>только для 'checkbox'</b>)</td>
  </tr>
  </tbody>
</table>

## Что означает 'map_to:"auto"'?

Когда свойство 'map_to' установлено в 'auto':

- Сам элемент управления не возвращает значение, а напрямую обновляет свойства события через метод 'set_value()' (см. [Пользовательский контрол Lightbox](guides/custom-lightbox-editor.md)).
- Обычно используется для сложных элементов управления, которые обрабатывают сразу несколько свойств события.

### Related Guides
- [Полностью настраиваемый лайтбокс](guides/custom-details-form.md)
