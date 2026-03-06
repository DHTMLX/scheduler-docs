---
title: "Полностью настраиваемый лайтбокс"
sidebar_label: "Полностью настраиваемый лайтбокс"
---

# Полностью настраиваемый лайтбокс

Чтобы создать полностью настраиваемый лайтбокс для планировщика, необходимо переопределить метод @scheduler_showlightbox:

~~~js
scheduler.showLightbox = function(id){
    // id - id события
    ... код для отображения любой пользовательской формы ...
}
~~~

Существует два вспомогательных метода, которые могут упростить эту задачу:

- [startLightbox](api/method/startlightbox.md) - отображает пользовательский лайтбокс внутри указанного HTML-контейнера, центрируя его на экране.
- [endLightbox](api/method/endlightbox.md) - закрывает лайтбокс

Предположим, что у вас есть HTML-контейнер с идентификатором **#custom_form** где-то на странице. Чтобы реализовать пользовательский лайтбокс, вы можете сделать следующее:

~~~js
var custom_form = document.getElementById("custom_form");

scheduler.showLightbox = function(id){
    var ev = scheduler.getEvent(id);
    scheduler.startLightbox(id, custom_form );
    ...'здесь необходимо установить значения в форме'...
    //document.getElementById("some_input").value = ev.text;
}
// должна быть связана с кнопкой 'save'
function save_form() {
    var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'здесь необходимо получить значения из формы'...
    //ev.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, custom_form);
}
// должна быть связана с кнопкой 'cancel'
function close_form(argument) {
    scheduler.endLightbox(false, custom_form);
}
~~~


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
