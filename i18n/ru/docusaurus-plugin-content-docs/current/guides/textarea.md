---
title: "Textarea"
sidebar_label: "Textarea"
---

# Textarea

Многострочное поле для ввода текста.

![textarea_editor](/img/textarea_editor.png)

~~~js
scheduler.locale.labels.section_text = 'Text';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Инициализация

По умолчанию в lightbox уже присутствует один контрол Textarea. Чтобы добавить дополнительное поле, выполните следующие шаги:
1. Добавьте новую секцию в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"location", height:50, map_to:"location", type:"textarea"},
    { name:"time", ...}
];
~~~
2. Задайте метку для новой секции:
~~~js
scheduler.locale.labels.section_location = "Location";
~~~

  


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Свойства

Ниже приведены основные свойства, которые часто используются с контролом 'textarea' (полный список смотрите [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) имя свойства данных, связанного с этой секцией</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип контрола секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>placeholder</b></td>
  <td>(<i>string</i>) текст-подсказка, отображаемый, когда textarea пуста</td>
  </tr>
  </tbody>
</table>
