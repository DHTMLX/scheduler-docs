---
sidebar_label: onToolbarItemRender
title: "Событие onToolbarItemRender"
description: "срабатывает при монтировании элемента-контейнера Toolbar"
---

# onToolbarItemRender

### Описание

@short: Срабатывает при монтировании элемента-контейнера Toolbar

@signature: onToolbarItemRender: (id: string | number, node: HTMLElement) =\> void

### Параметры

- `id` - (обязательный) *string | number* - идентификатор элемента-контейнера
- `node` - (обязательный) *HTMLElement* - пустой элемент-контейнер

### Пример

~~~jsx
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "search" || node.firstChild) return;
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    node.appendChild(input);
});
~~~

### Детали

Требуется плагин [Toolbar](guides/toolbar.md). Событие срабатывает для каждого вхождения `{ id, comp: "container" }` после вставки в Toolbar. Заполняйте переданный узел, не заменяя его; при неизменной конфигурации заголовка узел сохраняется.

### Связанные руководства

- [Toolbar](guides/toolbar.md)