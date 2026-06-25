---
sidebar_label: onEventChanged
title: "onEventChanged событие"
description: "возникает после того, как пользователь отредактировал событие и сохранил изменения (после нажатия кнопок редактирования и сохранения на панели события или в окне деталей)"
---

# onEventChanged

### Description

@short: Возникает после того, как пользователь отредактировал событие и сохранил изменения (после нажатия кнопок редактирования и сохранения на панели события или в окне деталей)

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (обязательный) *string* - идентификатор события
- `ev` - (обязательный) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Выделенные временные интервалы в месячном представлении](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)