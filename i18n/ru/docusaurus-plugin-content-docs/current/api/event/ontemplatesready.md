---
sidebar_label: "onTemplatesReady"
title: "onTemplatesReady event"
description: "срабатывает, когда шаблоны scheduler'а инициализированы"
---

# onTemplatesReady

### Description

@short: Срабатывает, когда шаблоны scheduler'а инициализированы

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    //место для вашей логики
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

Это событие сигнализирует, что шаблоны scheduler'а полностью готовы.

Рекомендуется помещать любой код создания кастомного вида внутри обработчика события **onTemplatesReady**. Это гарантирует, что шаблоны для кастомного вида будут готовы до инициализации scheduler'а, что позволяет корректно отобразить кастомный вид на странице.
