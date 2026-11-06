---
title: "Мобильный адаптивный Scheduler"
sidebar_label: "Мобильный адаптивный Scheduler"
description: "Настройка Scheduler v8 для сенсорных устройств и адаптивных макетов Toolbar и Sidebar"
---

# Мобильный адаптивный Scheduler

Scheduler поддерживает сенсорный ввод на iOS, Android, планшетах Windows, сенсорных мониторах и телефонах. Жесты доступны в каждом представлении. На небольших экранах настройте и макет приложения, и календарь.

:::note
Это руководство описывает макет Toolbar и Sidebar версии 8.0. Приложения с устаревшей панелью навигации могут использовать [подход с адаптивным заголовком v7.2](guides/touch-support-legacy.md).
:::

Для приложений с сенсорным управлением:

- добавьте `<meta name="viewport" content="width=device-width, initial-scale=1">`;
- используйте [скин Material](guides/skins.md#material-skin) или тему с достаточно крупными элементами;
- включите плагин [Quick Info](guides/quick-info.md), если нужен компактный редактор;
- включите `responsive_lightbox`, чтобы встроенный lightbox адаптировался к узкому экрану.

## Адаптивная Toolbar

Включите Toolbar и предоставьте полную и компактную версии `scheduler.config.header`. Выбирайте между ними через `onLayoutSizeChange`:

~~~js
const compactHeader = {
    rows: [
        { cols: ["prev", "date", "next"] },
        { cols: ["today", { id: "views", comp: "menu" }] }
    ]
};

const fullHeader = [
    "toggle_sidebar", "add_event", "spacer",
    "prev", "date", "next", "spacer", "today", "views"
];

scheduler.plugins({ toolbar: true, sidebar: true });

scheduler.attachEvent("onLayoutSizeChange", ({ width }) => {
    scheduler.config.header = width < 700 ? compactHeader : fullHeader;
});

scheduler.init("scheduler_here", new Date(), "week");
~~~

Событие сообщает ширину оболочки — элемента, переданного в `scheduler.init()`. Используйте ее вместо `window.innerWidth`, поскольку Scheduler может занимать лишь часть страницы. Не выбирайте заголовок по высоте календаря: переход между одной и двумя строками Toolbar меняет высоту и может создать цикл изменения размера.

Toolbar повторно читает `config.header` после `onLayoutSizeChange`, поэтому выбранная структура используется в той же отрисовке. Неизменная структура сохраняет существующие элементы и компоненты фреймворка.

`scheduler.xy.nav_height = 0` скрывает навигацию. Положительные значения не задают высоту. Для фиксированной высоты используйте положительный `config.header.height` или CSS-переменную `--dhx-scheduler-toolbar-height`.

## Адаптивная Sidebar

Sidebar использует ту же ширину оболочки:

~~~js
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

Ниже `overlay_width` Sidebar становится закрытым оверлеем, если во встроенной или отдельной Toolbar есть видимый `toggle_sidebar`. Без него Sidebar остается закрепленной. Вызовы `scheduler.ext.sidebar.show()` и `hide()` меняют видимое состояние, не переписывая `config.sidebar.collapsed`.

См. [Макет приложения](guides/application-layout.md), [Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md).

## Автоматический размер контейнера

При `container_autoresize` внутри прокручиваемого родителя резервируйте место для вертикальной полосы прокрутки. Иначе она может многократно менять ширину оболочки на адаптивном брейкпоинте:

~~~css
.scheduler-scroll-container {
    overflow: auto;
    scrollbar-gutter: stable;
}
~~~

В оболочке Toolbar или Sidebar высота, записанная `container_autoresize`, не вызывает `onSchedulerResize`. Для решений о макете используйте `onLayoutSizeChange`.

## Адаптивный lightbox

Включите адаптивные стили встроенного lightbox:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

На узких экранах lightbox получает класс `dhx_cal_light_responsive`. Используйте его для стилей приложения.

## Параметры сенсорной настройки

- [touch](api/config/touch.md) включает/отключает сенсорную поддержку;
- [touch_drag](api/config/touch_drag.md) задает задержку между долгим нажатием и прокруткой;
- [touch_swipe_dates](api/config/touch_swipe_dates.md) включает навигацию горизонтальным жестом;
- [touch_tip](api/config/touch_tip.md) управляет подсказками;
- [touch_tooltip](api/config/touch_tooltip.md) управляет сенсорными tooltip;
- [responsive_lightbox](api/config/responsive_lightbox.md) включает адаптивные стили lightbox.

## Сенсорные жесты {#touch-gestures-in-the-scheduler}

- **Двойное касание** открывает или создает событие как двойной щелчок.
- **Долгое касание и перетаскивание** перемещает событие или создает его в пустом интервале.
- **Смахивание** переходит к предыдущему или следующему диапазону при включенном `touch_swipe_dates`.

При включенной Toolbar горизонтальное смахивание использует тот же отменяемый путь `onToolbarItemClick`, что и `prev`/`next`.

## Расширение Quick Info {#quick-info-extension}

Плагин [Quick Info](guides/quick-info.md) предоставляет удобную для касаний сводку и кнопки. Включите его до инициализации:

~~~js
scheduler.plugins({ quick_info: true });
~~~

Quick Info использует шаблоны `quick_info_content`, `quick_info_date`, `quick_info_title`. Методы и события включают `showQuickInfo`, `hideQuickInfo`, `onQuickInfo`, `onAfterQuickInfo`.

[Пример адаптивного макета приложения](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)