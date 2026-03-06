---
title: "Migration From Older Versions"
sidebar_label: "Migration From Older Versions"
---

# Migration From Older Versions 

## 7.1 -> 7.2

Обновление до версии 7.2 вносит изменения в некоторые значения по умолчанию.

### Плагин `all_timed` теперь включён по умолчанию

Плагин [all_timed](api/config/all_timed.md) теперь активирован по умолчанию, что позволяет отображать события, продолжающиеся через ночь. Чтобы вернуть прежнее поведение, настройте конфигурацию следующим образом:

~~~js
scheduler.config.all_timed = false;
~~~

### Функции работы с датой больше не изменяют свой аргумент

В более ранних версиях функции работы с датой, такие как `scheduler.date.day_start`, `scheduler.date.week_start` и `scheduler.date.date_part`, изменяли исходный объект даты, переданный в качестве аргумента:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 00:00:00
~~~

Начиная с версии 7.2 исходная дата остаётся неизменной:

~~~js
const date = new Date(2025, 1, 15, 13, 00);
const dayStart = scheduler.date.day_start(date);

console.log(dayStart);
// 2025-02-15 00:00:00

console.log(date);
// 2025-02-15 13:00:00
~~~

## 7.0 -> 7.1

Обновление до версии 7.1 включает несколько несовместимых изменений.

### Новый движок для повторяющихся событий

Новый движок для [Повторяющихся событий](guides/recurring-events.md) используется при включении плагина `recurring`:

~~~js
scheduler.plugin({
    recurring:true
});
~~~

Так как новый плагин использует другой набор свойств для описания повторяющихся событий, на данный момент отсутствует прямой путь миграции. Вы можете продолжить использовать [старый движок для повторяющихся событий](guides/recurring-events-legacy.md), включив устаревший плагин до момента готовности к переходу:

~~~js
scheduler.plugin({
    recurring_legacy:true
});
~~~

### Всплывающее окно отмены

Функция отмены, управляемая [undo_deleted](api/config/undo_deleted.md), теперь включена по умолчанию. Если такое поведение не подходит, его можно отключить через конфигурацию:

~~~js
scheduler.config.undo_deleted = false;
~~~

### Изменения в Map View

Некоторые свойства устарели и теперь входят в объект конфигурации [map_settings](api/config/map_settings.md):

- **scheduler.config.map_error_position**
- **scheduler.config.map_initial_position**
- **scheduler.config.map_type**

Обновлённый способ задания этих свойств:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    type: google.maps.MapTypeId.HYBRID
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

Также эти шаблоны Map view устарели и заменены на [map_info_content](api/template/map_info_content.md):

- **scheduler.templates.marker_date**
- **scheduler.templates.marker_text**

Пример нового использования шаблона:

~~~
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### Свойства, доступные отдельно и внутри общего объекта

Свойство [map_view_provider](api/config/map_view_provider.md) можно указывать как отдельно, так и внутри объекта конфигурации [map_settings](api/config/map_settings.md) следующим образом:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

### Свойства, используемые отдельно

Следующие свойства карты остаются вне объекта [map_settings](api/config/map_settings.md):

- [map_end](api/config/map_end.md)
- [map_start](api/config/map_start.md)

## 6.0 -> 7.0

Обновление до версии 7.0 вносит несколько несовместимых изменений.

### Скины теперь используют CSS-переменные

CSS-скины (темы) были полностью переработаны и теперь используют CSS-переменные. Хотя структура HTML и имена CSS-классов в основном остались прежними, пользовательские стили, написанные для старых версий Scheduler, могут работать некорректно в версии 7.0.

Например, ранее для изменения цвета фона события использовался следующий стиль:

~~~html
<style>
    /* событие в дневном или недельном представлении */
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    /* многодневное событие в месячном представлении */
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    /* событие с фиксированным временем в месячном представлении */
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
</style>
~~~

Начиная с версии 7.0 тот же эффект достигается так:

~~~html
<style>
    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }
</style>
~~~

Список доступных переменных можно найти на странице [Настройка скинов](guides/custom-skins.md).

:::note
Для сохранения желаемого внешнего вида после миграции потребуется обновить ваши стили.
:::

### Один CSS-файл для всех тем

Теперь все темы объединены в один файл **dhtmlxscheduler.css**.

Для выбора конкретного скина используйте свойство `scheduler.skin`:

~~~js
scheduler.skin = "material";
~~~

Или воспользуйтесь методом [setSkin](api/method/setskin.md):

~~~js
scheduler.setSkin("material");
~~~

:::note
Учтите, что `scheduler.setSkin()` вызывает перерисовку Scheduler.
:::

Если вы переключаетесь с любого скина, кроме **terrace**, выполните следующие шаги:

1) Замените старый CSS-файл скина на новый объединённый файл:

~~~html
<!-- СТАРЫЙ -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler_material.css" type="text/css">
<!-- НОВЫЙ -->
<link rel="stylesheet" href="./codebase/dhtmlxscheduler.css" type="text/css">
~~~

2) Включите скин через JavaScript:

~~~js
scheduler.setSkin("material");
scheduler.init("scheduler_here");
~~~

### Устаревшие настройки `scheduler.xy`

Следующие свойства `scheduler.xy` больше не используются:

- scheduler.xy.nav_height
- scheduler.xy.event_header_height

Их высота теперь регулируется CSS-стилями, например:

~~~css
.dhx_cal_navline {
    height: 40px;
}

.dhx_cal_event dhx_title {
    height: 30px;
}
~~~

### Изменены значения по умолчанию

Значения по умолчанию для свойств [details_on_create](api/config/details_on_create.md) и [details_on_dblclick](api/config/details_on_dblclick.md) изменены с `false` на `true`.

### Шрифт для скина Material

Скин **Material** больше не включает шрифт Roboto по умолчанию.

Если вы используете Material, импортируйте шрифт вручную:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

### Новый API для тултипов

Тултипы теперь имеют обновлённый API, который упрощает привязку тултипов к пользовательским элементам. Подробнее в статье [Тултипы](guides/tooltips.md).

### Отступы в колонках Day/Week view

В представлениях День, Неделя и Units теперь добавлен небольшой отступ по краям колонок. Это обеспечивает пустое пространство, в котором пользователь может создать новое событие двойным щелчком.

Чтобы убрать этот отступ, установите [day_column_padding](api/config/day_column_padding.md) в ноль:

~~~js
scheduler.config.day_column_padding = 0;
~~~

### Интеграция сервиса экспорта

Начиная с версии 7.0, функции импорта/экспорта входят в библиотеку Scheduler.

Если ранее вы подключали **https://export.dhtmlx.com/scheduler/api.js** для онлайн-экспорта, например:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~

Удалите этот файл и включите расширение **export_api** через **scheduler.plugins**:

~~~js
scheduler.plugins({
    export_api: true
});
~~~

### Обновлена реализация Promise

Библиотека **Bluebird** была удалена из пакета Scheduler. Теперь [Promise](api/method/promise.md) использует нативную реализацию Promise.

## 5.3 -> 6.0

Обновление до версии 6.0 вносит две основные структурные перемены в пакет Scheduler:

1) Все файлы расширений теперь включены в *dhtmlxscheduler.js*. Для включения дополнительных расширений используйте API.

- Если вы ранее подключали расширения отдельно, например:

~~~js
<script src="../codebase/dhtmlxscheduler.js"></script>
<script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~

или

~~~js
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/ext/dhtmlxscheduler_active_links";
~~~

Удалите отдельные файлы расширений и включайте расширения через **scheduler.plugins**:

~~~js
scheduler.plugins({
   active_links: true
});
~~~

Полный список расширений смотрите [здесь](guides/extensions-list.md).

- Если вы используете модифицированные или кастомные файлы расширений, продолжайте подключать их вручную, как прежде.

- **Обратите внимание**, что расширение **dhtmlxscheduler_csp.js** полностью удалено и больше не требует ручного включения.


2) Все локали теперь входят в *dhtmlxscheduler.js*. Для активации локали используйте вызов API.

- Удалите любые отдельные файлы локалей со страницы и включайте нужную локаль с помощью **scheduler.i18n.setLocale**:

~~~js
scheduler.i18n.setLocale("de");
~~~

- Кастомные файлы локалей по-прежнему можно загружать вручную.

### Инициализация DataProcessor

Конструктор DataProcessor перемещён из глобальной функции **dataProcessor** в функцию **scheduler.DataProcessor**.

Если в вашем приложении используется DataProcessor, обновите код инициализации следующим образом:

~~~js
// старый способ
var dp = new dataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

Замените на:

~~~js
// обновлённый способ
var dp = new scheduler.DataProcessor("/scheduler/backend/events");
dp.init(scheduler);
dp.setTransactionMode("REST", false);
~~~

Рекомендуется использовать **scheduler.createDataProcessor**:

~~~js
// предпочтительный способ
var dp = scheduler.createDataProcessor({
    url: "/scheduler/backend/events",
    mode: "REST"
});
~~~

В этом случае вызов **DataProcessor.init(scheduler)** не требуется, а **DataProcessor.setTransactionMode** можно вызывать как обычно при необходимости.

### Устаревший API

Объект **dhtmlx** больше не определяется в dhtmlxscheduler.js, поэтому ряд методов и глобальных объектов устарели начиная с версии 6.0.

1) Следующие методы устарели и заменены на:

<table class="my_table">

<tr><td class="version_info">Устаревшие методы</td><td class="version_info">Рабочие методы</td></tr>

<tr><td>dhtmlx.alert</td><td>scheduler.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>scheduler.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>scheduler.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>scheduler.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>scheduler.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>scheduler.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>scheduler.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>scheduler.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>scheduler.assert</td></tr>
<tr><td>window.dataProcessor</td><td>scheduler.DataProcessor</td></tr>
</table>

Аргументы и поведение методов не изменились.

2) Следующие глобальные объекты устарели:

- dhtmlxAjax
- dtmlXMLLoaderObject
- dhtmlDragAndDropObject
- dhtmlxEventable
- dhtmlxError

Если они всё ещё требуются в вашем приложении, включайте их через плагин **legacy**:

~~~js
scheduler.plugins({
    legacy: true
});
~~~

## 5.2 -> 5.3

### Сенсорные жесты

Обработчик [жеста свайпа](guides/touch-support.md#touch-gestures-in-the-scheduler) теперь по умолчанию отключён.

Чтобы включить его обратно, используйте настройку [scheduler.config.touch_swipe_dates](api/config/touch_swipe_dates.md) следующим образом:

~~~js
scheduler.config.touch_swipe_dates = true;
~~~

### Разметка и стили

Режим [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) для элементов событий в [Месячный вид](views/month.md) был изменён с **content-box** на **border-box** во всех скинах.

Это касается элементов **.dhx_cal_event_clear** и **.dhx_cal_event_line**.

Это изменение не должно привести к видимым отличиям, но если вы настраивали отображение событий в представлении Месяц или используете собственный скин, возможно, потребуется скорректировать ваши стили.

## 5.1 -> 5.2

<h3 id="dnd">Поведение drag-n-drop</h3>

Начиная с версии 5.2, события можно перетаскивать за любую часть их тела, а не только за заголовок, как раньше. Чтобы вернуть прежнее поведение, установите свойство [drag_event_body](api/config/drag_event_body.md) в *false* (по умолчанию включено):

~~~js
scheduler.config.drag_event_body = false;
~~~

### События onXLE/onXLS устарели

Эти события всё ещё работают, но будут удалены в будущем. Замените их следующим образом:

~~~js
scheduler.attachEvent("onXLS",function(){}); → 
scheduler.attachEvent("onLoadStart",function(){});

scheduler.attachEvent("onXLE",function(){}); → 
scheduler.attachEvent("onLoadEnd",function(){});
~~~

### Конфиг и шаблон "xml_date", а также шаблоны "xml_format" были переименованы

Вот как обновить ваш код для новых имён API:

- scheduler.config.xml_date →  [scheduler.config.date_format](api/config/date_format.md)
- scheduler.templates.xml_date → [scheduler.templates.parse_date](api/template/parse_date.md)
- scheduler.templates.xml_format → [scheduler.templates.format_date](api/template/format_date.md)

Начиная с v5.2, значения по умолчанию для конфига **xml_date** и шаблонов **xml_date** и **xml_format** - *undefined*. Без явного присваивания они работать не будут.

Тем не менее, Scheduler по-прежнему поддерживает старые имена, если вы переопределяли их, так что они продолжат работать. Например:

~~~js
// это всё ещё будет работать
scheduler.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

#### Формат даты по умолчанию изменился

- До v5.2 по умолчанию использовался **scheduler.config.xml_date** со значением "%m/%d/%Y %H:%i"
- Начиная с v5.2, используется [scheduler.config.date_format](api/config/date_format.md) со значением "%Y-%m-%d %H:%i"

Чтобы вернуть прежний формат по умолчанию, используйте:

~~~js
scheduler.config.date_format = "%m/%d/%Y %H:%i";
~~~

#### Улучшен разбор дат

В версии v5.2 Scheduler пытается автоматически определять формат даты при разборе, что может повлиять на поведение **scheduler.date.str_to_date**, **scheduler.templates.format_date** и **scheduler.templates.parse_date**.

Чтобы вернуть прежнее поведение, когда даты разбираются строго по заданному формату, включите:

~~~js
scheduler.config.parse_exact_format = true;
~~~

### Свойство "vertical" для [Multiselect](guides/multiselect.md#properties) теперь принимает только boolean

Ранее *vertical* можно было задать строкой, например:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical:"false" }
~~~

С версии 5.2 допускаются только boolean-значения:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical: false }
~~~

Если вы использовали строку "false", замените её на boolean false.

## 5.0 -> 5.1

Функции умного рендеринга и горизонтального скролла привели к полной переработке разметки timeline, что повлияло на Timeline, TreeTimeline и их режимы.

Ключевое изменение - элементы TABLE, TR и TD были заменены на DIV с соответствующими именами классов.

Если ваши CSS-селекторы ориентированы на теги таблицы для стилизации timeline, вам нужно обновить их под новую разметку. Общая структура DOM осталась похожей, поэтому в основном потребуется скорректировать селекторы.

Сравнение CSS-селекторов до и после обновления:

До:

- **.dhx_cal_data > table > tbody > tr > td.dhx_matrix_scell** - левая колонка с метками
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line** - строка timeline с ячейками дат
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line > table > tbody > tr > td.dhx_matrix_cell** - отдельная ячейка даты внутри строки timeline

После:

- **.dhx_cal_data .dhx_timeline_table_wrapper .dhx_timeline_label_row .dhx_matrix_scell** - левая колонка с метками
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line** - строка timeline с ячейками дат
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line .dhx_matrix_cell** - отдельная ячейка даты внутри строки timeline

## 4.4 -> 5.0

### Удалённые скины

Скины **Glossy** и **Classic** были объявлены устаревшими и удалены начиная с v5.0.

Если вы используете их, потребуется выбрать другой [скин](guides/skins.md) или продолжать использовать CSS-файлы из предыдущей версии.

### Крупный рефакторинг CSS

В версии 5.0 был проведён серьёзный пересмотр CSS, что может вызвать проблемы при глубокой кастомизации стилей. Существующие стили могут перестать работать из-за увеличения специфичности новых стилей dhtmlxScheduler.

Универсального решения нет; для миграции потребуется просмотреть и скорректировать ваш CSS.

### Исправлен маршрут POST в режиме REST

Обновление исправляет маршрут **POST** (insert) для dataProcessor в режиме **REST** - теперь на сервер не отправляется временный id события.

Ранее:

~~~js
POST /api/{tempId}

// пример
POST /api/1234567890
~~~

Теперь:

~~~js
POST /api
~~~

## 4.x -> 4.3

Начиная с v4.3, расширения [Week Agenda View](views/weekagenda.md), [Grid View](views/grid.md), [Timeline View](views/timeline.md), [Units View](views/units.md) и [Multisection Events](api/config/multisection.md) больше не входят в Standard Edition, распространяемую по GNU GPL v2.

Чтобы продолжить их использование, либо оставайтесь на версии 4.2 или ниже, либо приобретите Commercial или Enterprise лицензию.

Подробнее [здесь](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).

## 3.6 -> 4.0

Публичный API полностью обратно совместим.

### Изменения по умолчанию

- Скин по умолчанию сменился на "terrace"; ext/dhtmlxscheduler_dhx_terrace.js был удалён. Чтобы вернуть классический скин, подключите его CSS-файл (codebase/dhtmlxscheduler_classic.css). Подробнее - в [Скины](guides/skins.md).

- [multi_day](api/config/multi_day.md) теперь включён по умолчанию. Чтобы отключить, добавьте:

~~~js
scheduler.config.multi_day = false;
~~~

### Пользовательские скины

Scheduler автоматически определяет скин по имени CSS-файла. Для пользовательских скинов, не основанных на "terrace", переименуйте CSS-файл в *dhtmlxscheduler_(skin name).css*.

Можно отключить автоопределение, задав:

~~~
scheduler.skin = "{skin name}";
~~~

до вызова *scheduler.init*.

### Устаревший API

Эти методы устарели, но всё ещё доступны и будут удалены в Scheduler 5.x: getEventText, getEventStartDate, getEventEndDate, setEventText, setEventStartDate, setEventEndDate.

Вместо них используйте *scheduler.getEvent()* и работайте со свойствами непосредственно у объекта события.

## 3.6 -> 3.7

Полная обратная совместимость.

## 3.5 -> 3.6

Полная обратная совместимость.

## 3.0 -> 3.5

Публичный API полностью обратно совместим.

- Функция 'Mark now' была перемещена в расширение dhtmlxscheduler_limit.js.

- Scheduler теперь поддерживает [JSON, сгенерированный dhtmlxConnector](guides/server-integration.md). Если нет особых причин использовать XML, рекомендуется перейти на JSON для уменьшения размера файлов и ускорения загрузки.

## 2.3 -> 3.0

Публичный API полностью обратно совместим.

- Структура файлов слегка изменилась: ext/dhtmlxscheduler_ext.css и dhtmlxscheduler_recurring.css удалены; все стили теперь находятся в dhtmlxscheduler.css.

- Аргументы некоторых шаблонов были приведены к единому виду: scheduler.templates.agenda_text и scheduler.templates.map_text теперь принимают (start_date, end_date, event) вместо просто 'event'.

## 2.2 -> 2.3

- Полная обратная совместимость.

- Файлы локализации для шведского языка переименованы в соответствии со стандартом ISO 639-1:

~~~
sources/locale_se.js => sources/locale_sv.js
sources/locale_recurring_se.js => sources/locale_recurring_sv.js
~~~

## 2.1 -> 2.2

- Полная обратная совместимость.

- Команда 'createUnitsView' теперь принимает другой набор параметров, но старый синтаксис также поддерживается.

## 2.0 -> 2.1

- Исправлены правила форматирования: %d и %m теперь всегда возвращают 2 цифры. Чтобы получить старое поведение, используйте %j и %n соответственно.

- Изменились пути к некоторым файлам внутри пакета:

~~~
codebase/dhtmlxgrid_recurring.js => codebase/ext/dhtmlxgrid_recurring.js
codebase/dhtmlxgrid_recurring.css => codebase/ext/dhtmlxgrid_recurring.css
codebase/dhtmlxgrid_units.js => codebase/ext/dhtmlxgrid_units.js
~~~

## 1.0 -> 2.0

- API и формат данных полностью обратно совместимы.

- События 'onEventChanged' и 'onEventAdded' больше не срабатывают при загрузке данных.

- Файл локализации для испанского языка переименован с locale_sp.js на locale_es.js.

- Опция 'drag_create' теперь управляет только созданием новых событий через drag-and-drop; создание событий по двойному клику теперь контролируется опцией 'dblclick_create'.
