---
title: "Полностью настраиваемый Lightbox"
sidebar_label: "Полностью настраиваемый Lightbox"
---

# Полностью настраиваемый Lightbox

Чтобы задать полностью настраиваемый Lightbox для планировщика, переопределите метод [`showLightbox()`](api/method/showlightbox.md):

~~~js
scheduler.showLightbox = (id) => {
    // id - id события
    ... код для отображения любой пользовательской формы ...
};
~~~

Существует 2 вспомогательных метода, которые можно использовать для упрощения реализации:

- [`startLightbox()`](api/method/startlightbox.md) - отображает настраиваемый lightbox в указанном HTML-контейнере, по центру экрана
- [`endLightbox()`](api/method/endlightbox.md) - закрывает lightbox

Предположим, что на странице где-то имеется HTML-контейнер `#custom_form`. Тогда можно реализовать настраиваемый Lightbox следующим образом:

~~~js
const customForm = document.getElementById("custom_form");

scheduler.showLightbox = (id) => {
    const event = scheduler.getEvent(id);
    scheduler.startLightbox(id, customForm);
    ...'здесь необходимо установить значения в форме'...
    // document.getElementById("some_input").value = event.text;
};

// должна быть связана с кнопкой 'save'
const saveForm = () => {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    ...'здесь необходимо получить значения из формы'...
    // event.text = document.getElementById("some_input").value;
    scheduler.endLightbox(true, customForm);
};

// должна быть связана с кнопкой 'cancel'
const closeForm = () => {
    scheduler.endLightbox(false, customForm);
};
~~~

### Related samples

- [Полностью настраиваемый Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)