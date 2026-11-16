---
title: Toolbar
sidebar_label: Toolbar
---

# Toolbar

Плагин Toolbar выводит `scheduler.config.header` над календарем с помощью UI kit Scheduler. Включите его перед `init()`:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
scheduler.config.header = ["prev", "date", "next", "today", { id: "views", comp: "segmented" }];
scheduler.init("scheduler_here");
~~~

Без `header` Toolbar использует `add_event, spacer, prev, date, next, spacer, today, views`, не меняя конфигурацию. При включенном Sidebar первым элементом будет `toggle_sidebar`. Установите `header` в `false`, чтобы скрыть внешнюю Toolbar.

Простые строки заголовка сохраняют устаревшее значение (`prev`, `next`, `today`, `date`, имена представлений, `minicalendar`, `button`, `spacer`). Новые встроенные элементы — `views`, `add_event`, `toggle_sidebar`; `"|"` выводит разделитель. Новые объекты используют `{ id, comp, label, ... }`, включая пустой хост `{ id, comp: "container" }`. Строка определяется как устаревшее имя, существующее представление, встроенный элемент Toolbar, затем вкладка представления. Поэтому пользовательское представление `views` остается вкладкой.

## Настройка Toolbar

Toolbar использует `scheduler.config.header`; отдельного `scheduler.config.toolbar` нет.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `toolbar` | *boolean* | Параметр `scheduler.plugins()`, включающий Toolbar перед `init()`. |
| `header` | *Array \| object \| false* | Список элементов Toolbar или вложенный макет `rows`/`cols`. `false` скрывает внешнюю Toolbar. |
| `header.height` | *number* | Положительная фиксированная высота Toolbar в пикселях. Без нее Toolbar растет при переносе элементов. |
| `rows` / `cols` | *Array* | Вложенные группы для многострочной или сгруппированной Toolbar. |
| `align` | *"left" \| "right"* | Выравнивание элементов группы `rows` или `cols`. |

### Свойства элементов Toolbar

| Свойство | Тип | Описание |
| --- | --- | --- |
| `id` | *string \| number* | Идентификатор; также выбирает встроенное поведение `views`, `add_event`, `toggle_sidebar`. |
| `comp` | *string* | Элемент UI kit: `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer`, `container`. |
| `label` / `icon` / `tooltip` | *string* | Видимая метка, CSS-класс значка и доступная всплывающая метка. |
| `options` / `items` | *Array* | Параметры `combo`/`segmented` или пункты `menu`. |
| `value` / `placeholder` | *any \| string* | Выбранное значение или заполнитель элемента со значением. |
| `css` / `width` / `height` / `align` | *string \| number* | Переопределение вида, размеров и выравнивания. |
| `disabled` / `hidden` | *boolean* | Отключает или скрывает элемент. |

Устаревшие элементы `{ html, click, css }` поддерживаются. `click` выполняется до `onToolbarItemClick`, при этом `this` указывает на узел; возвращаемое значение не отменяет действие. Не объединяйте устаревшие `view`, `html`, `click` с `id`: Toolbar выводит устаревший элемент и предупреждает, что новые свойства игнорируются.

## Пользовательское содержимое и изменения во время выполнения

Для содержимого приложения используйте контейнер:

~~~js
scheduler.config.header = ["prev", { id: "search", comp: "container" }];
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.appendChild(document.createElement("input"));
});
~~~

[`scheduler.ext.toolbar`](api/other/toolbar.md) предоставляет `setItems`, `updateItem`, `getItem`, `getValue`, `setValue`, `show`, `hide`, `refresh`, `getItemNode`, `getDefaultItems`. Для повторяющихся ID передайте последним аргументом номер вхождения с нуля в визуальном порядке обхода в глубину. `1` и `"1"` — один ID. Патчи сохраняются при эквивалентных и неструктурных изменениях заголовка; структурное декларативное изменение удаляет их. Структура `setItems()` удаляется при следующем декларативном изменении.

[`onToolbarItemClick`](api/event/ontoolbaritemclick.md) и [`onToolbarItemChange`](api/event/ontoolbaritemchange.md) отменяемы. Устаревший `click` выполняется первым; `false` из события Toolbar предотвращает действие Scheduler.

## Макет, клавиатура и жизненный цикл

`getLayoutSize()` возвращает целые `clientWidth`/`clientHeight` оболочки или `null` для отсоединенной/скрытой оболочки. `onLayoutSizeChange(size)` вызывается до согласования заголовка и может выбрать адаптивный заголовок в той же отрисовке. Задайте положительный `header.height` или используйте `--dhx-scheduler-toolbar-height`; `xy.nav_height = 0` скрывает Toolbar, если заголовок не задает положительную высоту.

Каждый ряд Toolbar — одна точка Tab. Элементы обрабатывают стрелки, Home и End; Ctrl+Left, Ctrl+Right, Alt+1–Alt+9 и горизонтальные жесты используют тот же путь действий/событий. Поля и пользовательские контейнеры сохраняют клавиши редактирования. Стилизуйте область через `.dhx_scheduler_toolbar`, `data-item-id`, `data-item-occurrence`; видимые элементы `dhx_cal_*` намеренно не предоставляются.

Режим Toolbar превращает хост `init()` в `.dhx_scheduler_shell`; `_obj`, `$container`, `$root` указывают на внутренний календарь. При полной устаревшей разметке и отсутствующем или `false` заголовке используется постоянный резервный вариант: оболочка не создается, API изменений ничего не делают. Экспорт и уничтожение изолируют ресурсы Toolbar для каждого экземпляра.

В обертках включайте тот же плагин через prop Scheduler: `plugins={{ toolbar: true }}` в React, `:plugins="{ toolbar: true }"` в Vue, `[plugins]="{ toolbar: true }"` в Angular.

См. [header](api/config/header.md), [инициализацию](guides/initialization.md), [клавиатурную навигацию](guides/keyboard-navigation.md), [Мини-календарь](guides/minicalendar.md).