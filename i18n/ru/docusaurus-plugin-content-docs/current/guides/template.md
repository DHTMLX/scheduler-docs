---
title: "Template"
sidebar_label: "Template"
---

# Template 

Контейнер, который содержит некоторый HTML-контент внутри.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// задаёт название секции

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~


## Инициализация

Чтобы включить элемент Template в lightbox, выполните следующие шаги:
1. Добавьте секцию в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. Задайте метку для секции:
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. Передайте содержимое для элемента управления через событие, например, событие @[onBeforeLightbox](api/event/onbeforelightbox.md):
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    var ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~

  


## Свойства

Ниже приведены основные свойства, которые часто используются для элемента 'template' (полный список доступен [здесь](api/config/lightbox.md)):

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
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления, используемого в секции</td>
  </tr>
  </tbody>
</table>
