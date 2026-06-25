---
title: "Template"
sidebar_label: "Template"
---

# Template 

Контейнер с некоторым HTML‑контентом внутри.

![template_editor](/img/template_editor.png)


~~~js
scheduler.locale.labels.section_template = 'Details';// задаёт название секции

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true},
    { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
scheduler.attachEvent("onEventCreated", function(id, e) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
});
~~~

## Инициализация

Чтобы добавить управление Template в lightbox, выполните следующие шаги:
1. <b>Добавьте секцию в конфигурацию lightbox:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"text", ... },
       { name:"template", height: 40, type:"template", map_to:"my_template"},
    { name:"time", ...}
];
~~~
2. <b>Установите метку для секции:</b>
~~~js
scheduler.locale.labels.section_template = 'Details';
~~~
3. <b>Установите содержимое управления с помощью какого-либо события, например события [onBeforeLightbox](api/event/onbeforelightbox.md):</b>
~~~js
scheduler.attachEvent("onBeforeLightbox", function(id) {
    const ev = scheduler.getEvent(id);
    ev.my_template = "<b>Holder:</b>"+ ev.holder+"

<b>Room:</b>"+ ev.room;
    return true;
});
~~~


## Свойства

Следующие свойства в основном важны и обычно устанавливаются для управления 'template' (см. полный список здесь [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>имя</b></td>
  <td>(<i>string</i>) имя секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>высота</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) имя свойства данных, которое будет сопоставлено с секцией</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции</td>
  </tr>
  </tbody>
</table>