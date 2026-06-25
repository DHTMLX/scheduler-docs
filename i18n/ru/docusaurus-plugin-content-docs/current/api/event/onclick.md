---
sidebar_label: onClick
title: "onClick event"
description: "срабатывает, когда пользователь нажимает левую кнопку мыши на событии"
---

# onClick

### Description

@short: Срабатывает, когда пользователь нажимает левую кнопку мыши на событии

@signature: onClick: (id: string, e: Event) => boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие события (`true`) или заблокировано (`false`)

### Example

~~~jsx
scheduler.attachEvent("onClick", (id, event) => {
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Связанные примеры
- [Скрытие панели выбора в окне события](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Подробности

Событие можно заблокировать. Если обработчик вернет значение, отличное от `true`, реакция по умолчанию будет заблокирована. По умолчанию отображается панель выделения.

### Связанные руководства
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)