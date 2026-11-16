---
title: Sidebar
sidebar_label: Sidebar
---

# Sidebar

Плагин Sidebar выводит панель рядом с календарем Scheduler. Включите его перед `init()`.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
  position: "left",
  width: 260,
  overlay_width: 768,
  items: ["minicalendar", "event_groups"]
};
scheduler.init("scheduler_here");
```

`minicalendar` и `event_groups` — стандартные элементы. Элемент групп показывается только при включенном `scheduler.config.event_groups`. Задайте `collapsed: true` для изначально свернутой панели, `position: "right"` для размещения справа или `sidebar: false` для отключения.

Ниже `overlay_width` панель становится закрытым оверлеем, только если доступен видимый элемент Toolbar `toggle_sidebar`. Добавьте его в пользовательский заголовок или отдельную Toolbar. Без переключателя и при отключенной Toolbar панель остается закрепленной.

## Настройка Sidebar

| Параметр | Тип | Описание |
| --- | --- | --- |
| `position` | *"left" \| "right"* | Сторона Scheduler с панелью. По умолчанию `"left"`. |
| `width` | *number* | Ширина закрепленной Sidebar в пикселях. По умолчанию `260`. |
| `collapsed` | *boolean* | Скрыта ли закрепленная Sidebar изначально. По умолчанию `false`. |
| `overlay_width` | *number* | Порог ширины оболочки, при котором Sidebar может стать оверлеем. По умолчанию `768`; `0` отключает оверлей. |
| `items` | *Array* | Встроенные и пользовательские элементы сверху вниз. |

### Элементы Sidebar

| Элемент | Описание |
| --- | --- |
| `"minicalendar"` | Выводит связанный мини-календарь. `mark_events: true` в объекте отмечает даты с событиями. |
| `"event_groups"` | Выводит список фильтров групп при включенном `scheduler.config.event_groups`. Объект принимает `label` и `select_all`. |
| `{ id, css }` | Создает пустой пользовательский контейнер. `css` добавляет классы; заполните его через `onSidebarItemRender`. |

## Пользовательские элементы

Пользовательский элемент Sidebar — пустой контейнер. Заполните его в `onSidebarItemRender`.

```js
scheduler.config.sidebar = { items: [{ id: "filters", css: "app-filters" }, "minicalendar"] };
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "filters") node.innerHTML = "<strong>Filters</strong>";
});
```

Для состояния во время выполнения используйте `scheduler.ext.sidebar.show()`, `hide()` и `toggle()`. Эти вызовы не меняют `scheduler.config.sidebar.collapsed`.

## Существующая разметка

Если хост инициализации содержит устаревшую разметку `.dhx_cal_*`, Sidebar использует постоянный резервный вариант разметки. Оболочка и Sidebar не выводятся. Для макета плагина инициализируйте его в пустом хосте.

См. [настройку sidebar](api/config/sidebar.md) и [макет приложения](guides/application-layout.md).
