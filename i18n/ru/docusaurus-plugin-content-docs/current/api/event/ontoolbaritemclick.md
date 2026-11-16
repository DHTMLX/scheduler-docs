---
sidebar_label: onToolbarItemClick
title: "Событие onToolbarItemClick"
description: "срабатывает при активации элемента Toolbar"
---

# onToolbarItemClick

### Описание

@short: Срабатывает при активации элемента Toolbar

@signature: onToolbarItemClick: (id: string | number, item: object, event: Event | null) =\> boolean

### Параметры

- `id` - (обязательный) *string | number* - идентификатор элемента
- `item` - (обязательный) *object* - копия конфигурации элемента; свойство `occurrence` определяет повторяющийся идентификатор
- `event` - (обязательный) *Event | null* - нативное событие клика или `null` при активации с клавиатуры/касанием

### Возвращаемое значение

- `result` - (boolean) - верните `false`, чтобы отменить встроенное действие или переключение представления

### Пример

~~~jsx
scheduler.attachEvent("onToolbarItemClick", (id, item, event) => {
    if (id === "add_event" && scheduler.config.readonly) return false;
    return true;
});
~~~

### Детали

Требуется плагин [Toolbar](guides/toolbar.md). Событие срабатывает после callback-функции `click` устаревшего элемента и до встроенного действия Toolbar или представления. Возврат `false` не отменяет устаревший callback, но предотвращает последующее действие Scheduler. Вкладки представлений и меню `views` передают имя выбранного представления как `id`.

### Связанные руководства

- [Toolbar](guides/toolbar.md)