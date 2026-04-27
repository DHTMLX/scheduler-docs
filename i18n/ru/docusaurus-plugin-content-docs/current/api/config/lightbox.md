---
sidebar_label: lightbox
title: "конфигурация lightbox"
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

Объект lightbox имеет 1 свойство:

- **sections** - (*array*) задаёт секции lightbox

~~~js
//определение по умолчанию
scheduler.config.lightbox.sections=[
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
]
~~~

Каждый объект в массиве **sections** может иметь следующие свойства:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя секции (по этому имени планировщик возьмет метку секции из набора <i>locale.labels</i>). Например, для секции <b>'time'</b> планировщик возьмет метку, сохранённую как <b>scheduler.locale.labels.section_time</b>.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>'auto' or string</i>) имя свойства данных, которое будет сопоставлено секции (см. детали ниже)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции (редактор)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>time_format</b></td>
  <td>(<i>string</i>) задаёт порядок элементов управления датой-временем в разделе 'Time Period'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>focus</b></td>
  <td>(<i>boolean</i>) если значение установлено в <i>true</i>, секция получит фокус при открытии lightbox</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>default_value</b></td>
  <td>(<i>any</i>) значение по умолчанию элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) задаёт обработчик события 'onChange' для элемента управления секции (<b>только для контроля 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора элемента управления (<b>для контролей 'select', 'multiselect', 'radio', 'combo'</b>).<br> Каждый объект массива задаёт один вариант и имеет следующие свойства:<ul><li><b>key</b> - (<i>string</i>) идентификатор варианта. Это свойство сравнивается со свойством данных события для сопоставления вариантов выбора с событиями</li><li><b>label</b> - (<i>string</i>) подпись варианта</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) определяет, будут ли радиокнопки расположены вертикально (<i>true</i>) или горизонтально (<i>false</i>) (<b>только для контроля 'select'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) значение флажка в состоянии отмечено. Опционально. По умолчанию <i>true</i> (<b>для контроля 'checkbox'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) значение флажка в состоянии снято. Опционально. По умолчанию <i>false</i> (<b>для контроля 'checkbox'</b>)</td>
  </tr>
  </tbody>
</table>

## Значение 'map_to':'auto'

Свойство 'map_to' может принимать значение 'auto'. Значение 'auto' относится к следующему:

- Контроль не возвращает значения и напрямую изменяет значение связанных свойств события в соответствии с методом 'set_value()' ([Custom Lightbox Control](guides/custom-lightbox-editor.md)).
- Обычно значение 'auto' используется для сложных контролов, которые работают с несколькими свойствами события

### Related Guides
- [Полностью настраиваемый Lightbox](guides/custom-details-form.md)