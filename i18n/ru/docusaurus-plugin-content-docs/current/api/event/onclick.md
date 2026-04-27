---
sidebar_label: onClick
title: "onClick event"
description: "Срабатывает, когда пользователь нажимает левую кнопку мыши на событии"
---

# onClick

### Description

@short: Срабатывает, когда пользователь нажимает левую кнопку мыши на событии

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onClick", function (id, e){
  // любая ваша логика здесь
  return true;
});
~~~

### Related samples
- [Скрыть панель выделения у блока события](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

Событие можно заблокировать. Если обработчик вернет значение, отличное от true, действие по умолчанию будет заблокировано (по умолчанию отображается панель выделения).

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)