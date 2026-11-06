---
title: "Макет приложения"
sidebar_label: "Макет приложения"
description: "Создание макета Scheduler с Toolbar, Sidebar и группами событий"
---

# Макет приложения

Используйте плагины Toolbar и Sidebar для создания макета календаря событий. Группы событий — встроенная функция Scheduler: они предоставляют данные списка календарей, фильтруют неактивные группы и применяют цвета групп.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.event_groups = { list: "event_groups", property: "group" };
scheduler.init("scheduler_here");
scheduler.parse({ data, collections: { event_groups } });
```

Без настройки заголовка или Sidebar выводится заголовок:

```js
["toggle_sidebar", "add_event", "spacer", "prev", "date", "next", "spacer", "today", "views"]
```

Sidebar содержит `minicalendar` и `event_groups`, имеет ширину 260 пикселей и становится оверлеем ниже 768 пикселей. По-английски список групп называется **Calendars**, хотя API по-прежнему называет модель данных группами событий.

Добавьте раздел lightbox, если пользователь должен выбирать группу:

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", map_to: "group", options: scheduler.serverList("event_groups") },
  { name: "time", type: "time", map_to: "auto" }
];
```

## Изменение одной части

Используйте меню представлений или измените метку группы без перестройки макета:

```js
scheduler.config.header = ["toggle_sidebar", "prev", "date", "next", { id: "views", comp: "menu" }];
scheduler.config.sidebar = {
  items: ["minicalendar", { id: "event_groups", label: "My calendars" }]
};
```

## Добавление содержимого приложения

Элементы Toolbar `container` и пользовательские элементы Sidebar — пустые узлы, принадлежащие приложению.

```js
scheduler.config.header = ["prev", { id: "search", comp: "container" }, "next"];
scheduler.config.sidebar = { items: [{ id: "summary" }, "minicalendar", "event_groups"] };

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.innerHTML = '<input aria-label="Search events">';
});
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "summary") node.textContent = "Upcoming work";
});
```

Обертки фреймворков могут владеть содержимым напрямую. Сопоставьте ID через React `toolbarComponents` / `sidebarComponents`, Vue `toolbar-components` / `sidebar-components` или Angular `[toolbarComponents]` / `[sidebarComponents]`. Обертки монтируют порталы, teleports или экземпляры Angular в стабильные узлы и очищают их при уничтожении элемента или Scheduler. См. руководства [React](integrations/react/configuration-props.md#toolbar-and-sidebar-components), [Vue](integrations/vue/configuration-props.md#toolbar-and-sidebar-components), [Angular](integrations/angular/configuration-props.md#toolbar-and-sidebar-components).

## Существующая разметка Scheduler

Если переданный в `init()` элемент уже содержит устаревшую разметку Scheduler, Toolbar и Sidebar используют постоянный резервный вариант. Scheduler сохраняет разметку и не создает оболочку, Toolbar или Sidebar. Перед включением плагинов замените дочернюю устаревшую разметку пустым хостом.

См. [Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md), [группы событий](guides/event-groups.md), [header](api/config/header.md).

- [Пример макета Toolbar](https://docs.dhtmlx.com/scheduler/samples/16_layout/01_toolbar.html)
- [Пример макета Sidebar](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
- [Полный адаптивный макет приложения](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)
