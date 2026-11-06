---
sidebar_label: sidebar
title: "Настройка sidebar"
description: "настраивает плагин Sidebar для Scheduler"
---

# sidebar

### Описание

@short: Настраивает плагин Sidebar для Scheduler

@signature: sidebar: SidebarConfig | false

### Пример

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

### Детали

Включите `sidebar: true` перед `init()`. Если конфигурация отсутствует, Sidebar использует `minicalendar` и, когда настроены группы событий, `event_groups`. Значения по умолчанию: `position: "left"`, `width: 260`, `collapsed: false`, `overlay_width: 768`.

`items` содержит встроенные идентификаторы или пользовательские элементы `{ id, css }`. Пользовательский элемент — пустой узел, передаваемый через `onSidebarItemRender`. Встроенный элемент групп событий принимает переопределения `label` и `select_all`.

Ниже `overlay_width` Sidebar становится закрытым оверлеем, только если в Toolbar отрисован видимый элемент `toggle_sidebar`. Без него панель остается закрепленной. `collapsed` задает исходное закрепленное состояние; вызовы `scheduler.ext.sidebar` во время выполнения не записывают его обратно в конфигурацию. Установите `sidebar` в `false`, чтобы скрыть область.

### Связанный API

- [sidebar](api/other/sidebar.md)
- [header](api/config/header.md)

### Связанные руководства

- [Sidebar](guides/sidebar.md)
- [Макет приложения](guides/application-layout.md)