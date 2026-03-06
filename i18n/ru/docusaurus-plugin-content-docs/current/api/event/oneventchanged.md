---
sidebar_label: "onEventChanged"
title: "onEventChanged event"
description: "срабатывает один раз, когда пользователь заканчивает редактирование события и сохраняет изменения (после нажатия кнопок редактирования и сохранения в панели события или окне деталей)"
---

# onEventChanged

### Description

@short: Срабатывает один раз, когда пользователь заканчивает редактирование события и сохраняет изменения (после нажатия кнопок редактирования и сохранения в панели события или окне деталей)

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - id события
- `ev` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    //любая пользовательская логика здесь
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
