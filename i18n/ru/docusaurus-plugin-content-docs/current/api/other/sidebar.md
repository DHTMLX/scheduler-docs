---
sidebar_label: sidebar
title: "API sidebar"
description: "предоставляет доступ к плагину Sidebar во время выполнения"
---

# sidebar

### Описание

@short: Предоставляет доступ к плагину Sidebar во время выполнения

@signature: scheduler.ext.sidebar: SidebarApi

### Пример

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.init("scheduler_here");
scheduler.ext.sidebar.toggle();
~~~

### Детали

API доступен после `scheduler.plugins({ sidebar: true })`. `show()`, `hide()` и `toggle()` изменяют отрисованную панель. `isCollapsed()` сообщает видимое состояние, а `isOverlay()` — работает ли Sidebar сейчас как оверлей. `refresh()` повторно читает `scheduler.config.sidebar`; `getItemNode(id)` возвращает узел элемента или `null`; `getDefaultItems()` возвращает стандартные идентификаторы элементов.

### Связанные руководства

- [Sidebar](guides/sidebar.md)