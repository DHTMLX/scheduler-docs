---
sidebar_label: onSidebarItemRender
title: "Событие onSidebarItemRender"
description: "срабатывает при монтировании пользовательского элемента Sidebar"
---

# onSidebarItemRender

### Описание

@short: Срабатывает при монтировании пользовательского элемента Sidebar

@signature: onSidebarItemRender: (id: string, node: HTMLElement) => void

### Параметры

- `id` - (обязательный) *string* - идентификатор пользовательского элемента
- `node` - (обязательный) *HTMLElement* - пустой контейнер элемента

### Пример

~~~js
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
    if (id === "summary") node.textContent = "Upcoming events";
});
~~~

### Детали

Событие срабатывает для пользовательских элементов Sidebar вида `{ id }`. Встроенные элементы `minicalendar` и `event_groups` управляют своим содержимым самостоятельно.