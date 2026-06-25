---
sidebar_label: onTemplatesReady
title: "onTemplatesReady событие"
description: "срабатывает при инициализации шаблонов планировщика"
---

# onTemplatesReady

### Description

@short: Срабатывает, когда шаблоны планировщика инициализируются

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

Событие информирует, что шаблоны планировщика готовы.

Это хорошая практика — писать код создания пользовательского вида в обработчике события **onTemplatesReady**. Это гарантирует, что шаблоны пользовательского вида будут готовы до инициализации планировщика, а сам пользовательский вид будет корректно отрисован на странице.