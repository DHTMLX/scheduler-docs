---
sidebar_label: onToolbarItemChange
title: "Событие onToolbarItemChange"
description: "срабатывает при изменении значения элемента Toolbar"
---

# onToolbarItemChange

### Описание

@short: Срабатывает при изменении значения элемента Toolbar

@signature: onToolbarItemChange: (id: string | number, value: any, item: object) =\> boolean

### Параметры

- `id` - (обязательный) *string | number* - идентификатор элемента
- `value` - (обязательный) *any* - новое выбранное значение
- `item` - (обязательный) *object* - копия конфигурации элемента; свойство `occurrence` определяет повторяющийся идентификатор

### Возвращаемое значение

- `result` - (boolean) - верните `false`, чтобы восстановить предыдущее значение и отменить действие

### Пример

~~~jsx
scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "views" && value === "month" && !canOpenMonth()) return false;
    return true;
});
~~~

### Детали

Требуется плагин [Toolbar](guides/toolbar.md). Событие используется элементами со значением, такими как `combo`, `segmented` и сегментированный элемент `views`. При возврате `false` общая Toolbar восстанавливает последнее принятое значение.

### Связанные руководства

- [Toolbar](guides/toolbar.md)