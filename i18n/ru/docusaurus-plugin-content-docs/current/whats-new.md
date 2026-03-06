---
title: "Что нового"
sidebar_label: "Что нового"
---

# Что нового

Если вы обновляете Scheduler с более ранней версии, ознакомьтесь с [Migration From Older Versions](migration.md) для получения дополнительной информации.


## 7.2.5

<span class='release_date'>20 мая 2025. Релиз с исправлениями</span>

- [Контрол времени Lightbox](guides/time.md) теперь корректно отображает правильное количество дней каждого месяца в селекторах дней.
- Исправлена ошибка скрипта, возникавшая в пробной сборке на Salesforce.
- Исправлена регрессия из Scheduler v7.2, из-за которой не подсвечивалась ячейка "Сегодня" в [Месячном виде](views/month.md).
- Скорректирован расчет `end_date` при изменении размера событий, если включен [round_position](views/timeline.md#stretchingeventsoverthecell).
- Исправлена проблема, из-за которой [тултип](guides/tooltips.md) смещался за пределы экрана при отображении длинного содержимого.

## 7.2.4

<span class='release_date'>6 мая 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена некорректная работа настройки [ignore_timeline](views/timeline.md) при перемещении или изменении размера событий в [Timeline view](views/timeline.md).
- Скорректирован расчет `end_date` при создании новых событий с включенным [ignore_timeline](views/timeline.md).
- Исправлена проблема, при которой конфигурации кнопок [lightbox](guides/lightbox-editors.md) путались после сохранения в хранилище.
- Решена проблема, из-за которой плагин [container_autoresize](guides/extensions-list.md#containerautoresize) неожиданно увеличивал размер контейнера в пустом [Agenda view](views/agenda.md).
- Исправлена ошибка скрипта в [Units view](views/units.md), связанная с некоторыми значениями настройки `size` при включенной опции [mark_now](api/config/mark_now.md).
- Скорректировано горизонтальное прокручивание в [Timeline view](views/timeline.md), когда `smart_rendering` установлен в `false`.

## 7.2.3

<span class='release_date'>9 апреля 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена проблема, когда ячейки грида не получали фокус, если задачи находились вне видимого временного диапазона диаграммы.
- Решена проблема в расширении [multiUserBackend](guides/multiuser-live-updates.md), вызывавшая некорректное поведение при редактировании всех событий в серии повторяющихся событий.
- Исправлено двойное добавление класса `timeline_scalex_class` в [Timeline view](views/timeline.md).
- Скорректировано поведение `scrollTo((section: x))`, теперь прокрутка корректно выполняется к первой секции в [Timeline view](views/timeline.md).
- Исправлена настройка `height` секции в [lightbox](guides/lightbox-editors.md).
- Решена проблема, из-за которой [Мини-календарь](guides/minicalendar.md) игнорировал конфигурацию `rtl`.
- Исправлен smart rendering, работавший только в первом [Timeline view](views/timeline.md), если использовалось несколько таймлайнов с настройками `smart_rendering:true` и `scrollable:false`.
- Скорректировано использование `first_hour`/`last_hour` с `round_position`, что приводило к неправильным датам событий при перетаскивании в [Timeline view](views/timeline.md).

## 7.2.2

<span class='release_date'>13 февраля 2025. Релиз с исправлениями</span>

- Исправлены проблемы фильтрации для изменённых экземпляров [повторяющихся событий](guides/recurring-events.md).
- Шаблон [month_date](api/template/month_date.md) теперь корректно влияет на [Годовой вид](views/year.md).
- Скорректировано поведение при использовании [multisection](views/units.md#assigningeventstoseveralunits) событий в [Timeline view](views/timeline.md) с `round_position: true`.
- Предотвращено обрезание экземпляров [повторяющихся событий](guides/recurring-events.md), находящихся вне видимого диапазона [Timeline view](views/timeline.md).
- Исправлены проблемы при редактировании [повторяющихся событий](guides/recurring-events.md) с опцией "текущее и последующие".

## 7.2.1

<span class='release_date'>16 января 2025. Релиз с исправлениями</span>

- Предотвращено исчезновение [повторяющихся экземпляров](guides/recurring-events.md) во время перехода на летнее/зимнее время (DST).
- Исправлена ошибка скрипта, возникавшая при редактировании только что созданных [повторяющихся событий](guides/recurring-events.md).
- Скорректировано отображение [экземпляров](guides/recurring-events.md) после загрузки данных из backend.
- Исправлены ошибки при изменении свойства `size` в [Units view](views/units.md) за пределы доступных колонок.
- Обеспечено корректное отображение многоуровневых папок в [Tree Timeline view](views/timeline.md) на всех уровнях вложенности.
- Исправлены ошибки, вызываемые опцией конфигурации `readonly_form` при открытии lightbox для повторяющихся событий.
- Скорректированы шаблоны повторения при изменении "текущего и последующих" экземпляров еженедельных повторяющихся событий, охватывающих определённые дни недели.

## 7.2

<span class='release_date'>17 декабря 2024. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-scheduler-7-2/)

### Важные изменения

Это обновление включает изменения некоторых свойств конфигурации карты. Подробнее см. [заметки по миграции](migration.md).

### Новая функциональность

- Добавлена возможность редактировать [текущее и последующие повторяющиеся события](guides/recurring-events.md).
- Представлен новый [Live-Update модуль](guides/multiuser-live-updates.md) для совместного редактирования.

### Обновления

- Улучшено отображение [ночных событий](api/config/all_timed.md).
- Обновлены [обработчики событий для Мини-календаря](guides/minicalendar.md#eventhandling).
- [Функции работы с датой](api/other/date.md) теперь не изменяют исходные данные.

### Исправления

- Исправлены проблемы с обработчиками изменения размера контейнера в среде LWC.
- Решены проблемы drag and drop при завершении событий после настройки [scheduler_last_hour](api/config/last_hour.md).
- Скорректировано отображение событий в режиме [cascade_event_display](api/config/cascade_event_display.md).
- Исправлено поведение drag-resize при изменении размера новых событий до нижней части столбца дня при активном расширении `all_timed`.
- Исправлены проблемы вертикальной прокрутки в прокручиваемом [Timeline view](views/timeline.md) при выключенном smart rendering.
- Исправлены проблемы отображения кнопок прокрутки в [Units](views/units.md).
- Скорректировано отображение неназначенных событий в [Units](views/units.md), если настройка `skip_incorrect` установлена в `false`.

## 7.1.3

<span class='release_date'>19 ноября 2024. Релиз с исправлениями</span>

- Исправлена проблема, когда начальные позиции событий не [подсвечивались при drag and drop](api/config/drag_highlight.md) в [Timeline](views/timeline.md) и [Units](views/units.md).
- Скорректировано поведение drag and drop, связанное с настройкой `last_hour` в [Timeline view](views/timeline.md).
- Предотвращено исчезновение [повторяющихся экземпляров](guides/recurring-events.md) в определённых часовых поясах при переходе на летнее/зимнее время.
- Исправлено повторное увеличение даты окончания при переключении [Full day](api/config/full_day.md) в контроле lightbox [Мини-календаря](guides/minicalendar.md#inthelightbox).
- Восстановлена работа методов [ignore_year](guides/custom-scales.md) и [ignore_agenda](guides/custom-scales.md).

## 7.1.2

<span class='release_date'>8 октября 2024. Релиз с исправлениями</span>

- Исправлены некорректные позиции событий при вставке с помощью [Ctrl+C/Ctrl+V](guides/keyboard-navigation.md) при активном расширении [multisection](views/units.md#assigningeventstoseveralunits).
- Обеспечена корректная работа [Collision extension](guides/collisions.md) с новыми [повторяющимися событиями](guides/recurring-events.md).
- Исправлена высота секций после вызова [scheduler.updateCollection()](api/method/updatecollection.md) с включённым smart rendering в [Timeline view](views/timeline.md).
- Исправлен smart rendering, скрывавший части новых [multisection](views/units.md#assigningeventstoseveralunits) событий при отмене [onBeforeLightbox](api/event/onbeforelightbox.md).
- Исправлено некорректное поведение метода [getEvents](api/method/getevents.md) с [повторяющимися событиями](guides/recurring-events.md).
- Улучшена обработка [повторяющихся событий](guides/recurring-events.md) с пользовательскими ежедневными свойствами.

## 7.1.1

<span class='release_date'>27 августа 2024. Релиз с исправлениями</span>

- Исправлена проблема, когда [DataProcessor](api/method/createdataprocessor.md) не позволял отправлять значения false.
- Исправлено исчезновение [тултипа](guides/tooltips.md) на мобильных устройствах после клика.
- Скорректировано позиционирование [тултипа](guides/tooltips.md) при прокрутке страницы.
- Исправлено скрытие секции multiday плагином [container_autoresize](guides/extensions-list.md#containerautoresize).
- Исправлено появление [Quick Info](guides/touch-support.md#quickinfoextension) вне контейнера.
- Предотвращено исчезновение неподтверждённых событий при прокрутке с включённым smart rendering в [Timeline view](views/timeline.md).
- Исправлены некорректные высоты секций в [Timeline view](views/timeline.md) после вызова [scheduler.updateCollection()](api/method/updatecollection.md) с активным smart rendering.

## 7.1

<span class='release_date'>31 июля 2024. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-scheduler-7-1/)

### Важные изменения

Это обновление вносит изменения в некоторые свойства конфигурации карты. Подробнее см. [заметки по миграции](migration.md).

### Новая функциональность

- Поддержка хранения [повторяющихся событий](guides/recurring-events.md) в формате RRULE.
- Грид карты теперь [поддерживает разных провайдеров карт](views/map.md).
- Добавлена возможность [отменять удаление события](api/config/undo_deleted.md).
- Представлен метод [batchUpdate](api/method/batchupdate.md) для одновременного обновления нескольких событий.

### Обновления

- Теперь Scheduler [подсвечивает исходную позицию события календаря при drag and drop](api/config/drag_highlight.md).

### Исправления

- Исправлена проблема, при которой динамическое изменение свойства **x_date** в [Timeline view](views/timeline.md) не обновляло шаблон.
- Скорректировано смещение заголовков в многодневном [Units view](views/units.md).
- Исправлена ошибка скрипта после вызова [destructor](api/method/destructor.md) при активном расширении [drag_between](guides/drag-between.md).
- Исправлено, что расширение [limit](guides/limits.md) не позволяло редактировать [серии повторяющихся событий](guides/recurring-events.md).
- Повышена производительность drag and drop событий в [Tree Timeline view](views/timeline.md) при **show_unassigned**: *true*.
- Исправлено поведение прокручиваемого [Timeline view](views/timeline.md) при `smart_rendering` = *false*.
- Скорректировано положение прокрутки после смены видов в прокручиваемом [Timeline view](views/timeline.md).

## 7.0.5

<span class='release_date'>30 мая 2024. Релиз с исправлениями</span>

### Исправления

- Исправлены некорректные высоты секций [Timeline](views/timeline.md) при использовании **event_dy:"full"**.
- Восстановлен отсутствующий маркер "сегодня" в [Годовом виде](views/year.md).
- Скорректировано позиционирование событий в [Дневном](views/day.md) и [Недельном](views/week.md) видах.

## 7.0.4

<span class='release_date'>22 мая 2024. Релиз с исправлениями</span>

### Исправления

- Добавлена опция `placeholder` для контрола [textarea](guides/textarea.md)
- Исправлены проблемы выделения ячеек в [Клавиатурной навигации](guides/keyboard-navigation.md)
- Исправлено отображение попапа [Quick Info](guides/touch-support.md#quickinfoextension) в [Agenda view](views/agenda.md)
- Скорректированы определения типов для шаблонов [Agenda view](views/agenda.md)
- Решены проблемы отображения многодневных событий в [Месячном виде](views/month.md) при отключённом [start_on_monday](api/config/start_on_monday.md) и скрытии нескольких колонок в [[Скрытие единиц времени на оси X в представлении](guides/custom-scales.md)](guides/custom-scales.md)

## 7.0.3

<span class='release_date'>15 марта 2024. Релиз с исправлениями</span>


### Исправления

- Исправлена проблема, при которой свойство [textColor](guides/custom-events-color.md) не применялось в [Месячном представлении](views/month.md)
- Исправлено корректное применение свойства [color](guides/custom-events-color.md) в [Agenda view](views/agenda.md)
- Исправлена ошибка, возникавшая при использовании [Клавиатурной навигации](guides/keyboard-navigation.md) в [Дневном таймлайн-представлении](views/timeline.md)

## 7.0.2

<span class='release_date'>20 февраля 2024. Релиз с исправлениями ошибок</span>

### Исправления

- Устранены проблемы совместимости с [DHTMLX Suite](https://docs.dhtmlx.com/suite/)
- Исправлена регрессия, влияющая на маркер [mark_now](api/config/mark_now.md) в [Timeline view](views/timeline.md)
- Исправлена проблема [инициализации темы](guides/skins.md), вызывавшая некорректное отображение Scheduler в некоторых случаях
- Исправлено исчезновение стилей выделения для выбранных событий в [Grid view](views/grid.md) после сортировки
- Исправлено дублирование событий при drag and drop в [режиме умного рендеринга Timeline](views/timeline.md#horizontalscroll)
- Внесены корректировки в [греческую локализацию](guides/localization.md)
- Исправлены утечки памяти: экземпляры Scheduler теперь полностью освобождаются при вызове метода [destructor](api/method/destructor.md)

## 7.0.1

<span class='release_date'>5 февраля 2024. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлены проблемы с отображением в представлении [Units](views/units.md) при показе планировщика на текущую дату
- Скорректировано положение всплывающего окна [Quick Info](guides/touch-support.md#quickinfoextension) в [прокручиваемом таймлайне](views/timeline.md#horizontalscroll)
- Исправлено позиционирование выбранного временного интервала при использовании [Клавиатурной навигации](guides/keyboard-navigation.md) в режиме [RTL](guides/rtl-mode.md)
- Исправлена ошибка, из-за которой нельзя было создавать многодневные события в [Месячном](views/month.md) представлении после изменения размера события в [Дневном](views/day.md)/[Недельном](views/week.md) представлениях

### Обновления

- [Высота секции многодневных событий](api/config/multi_day_height_limit.md) в представлениях [День](views/day.md)/[Неделя](views/week.md) теперь по умолчанию ограничена 200px

## <b>7.0</b>

<span class='release_date'>31 января 2024. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-scheduler-7-0/)

### Важные изменения

В этом релизе изменена структура пакета Scheduler и поведение функциональности. Рекомендуется ознакомиться с [заметками по миграции](migration.md) для плавного перехода.

### Новая функциональность

- [Настройка скинов](guides/custom-skins.md) с помощью CSS-переменных
- Добавлен новый [тёмный скин](guides/skins.md#darkskin)
- Добавлено новое представление [Agenda view](views/agenda.md)

### Обновления

- Обновлён [Terrace skin](guides/skins.md#terrace-skin)
- Добавлена возможность [установки профессиональных версий Scheduler через npm](guides/installation.md)
- Улучшены возможности кастомизации маркеров в [Map View](views/map.md)
- Улучшено отображение [коротких событий](guides/sizing.md) в представлениях День/Неделя/Units
- Удалены фоновые изображения грида из представлений [День](views/day.md)/[Неделя](views/week.md)/[Units](views/units.md)
- Удалена библиотека [Bluebird Promise](api/method/promise.md) из ядра
- Различные улучшения масштабирования на экранах с высоким разрешением и отзывчивости на маленьких экранах
- Колонки в представлениях [День](views/day.md)/[Неделя](views/week.md)/[Units](views/units.md) теперь могут [резервировать свободное пространство](api/config/day_column_padding.md)
- Обновлены определения типов
- Экспорт API теперь является частью [scheduler.plugins](guides/extensions-list.md#export-service) и не требует отдельного JS-файла. Подробнее см. в руководстве по [миграции](migration.md)

### Исправления

- Исправлены проблемы с отображением [формы повторяющихся событий](guides/recurring-events.md) при использовании [французской локализации](guides/localization.md)
- Исправлена длительность события после drag-and-drop в [Timeline view](views/timeline.md) при использовании настроек first_hour/last_hour
- Устранено неожиданное прокручивание при использовании колеса мыши над левой панелью в [Timeline view](views/timeline.md)
- Исправлено визуальное подтормаживание при вертикальном скроллинге в [Timeline view](views/timeline.md) на экранах с высоким разрешением при включённом Smart Rendering
- Восстановлена работа drag-and-drop в [Units view](views/units.md) при активном расширении `all_timed`
- Восстановлен плагин Multiselect в GPL-сборках

## 6.0.5

<span class='release_date'>31 июля 2023. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена проблема, из-за которой [lightbox](guides/lightbox-editors.md) не работал в SalesForce LWC
- Исправлена проблема с [container_autoresize](guides/extensions-list.md#containerautoresize) при использовании [ignore_week](guides/custom-scales.md), когда неделя начиналась с скрытого дня

### Улучшения

- Обновлены определения типов с добавлением [scheduler.form_blocks](guides/custom-lightbox-editor.md)

## 6.0.4

<span class='release_date'>31 мая 2023. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлено некорректное поведение [dataProcessor](guides/server-integration.md) при редактировании экземпляра [Recurring series](guides/recurring-events.md)
 - Устранена проблема, из-за которой [Recurring series](guides/recurring-events.md) теряли пользовательские свойства
 - Исправлена ошибка скрипта после вызова [scheduler.destructor()](api/method/destructor.md) при включённом [container_autoresize](guides/extensions-list.md#containerautoresize)
 - Исправлена регрессия в [Timeline view](views/timeline.md), блокировавшая автоскролл при перетаскивании событий
 - Обработчик события [onContextMenu](api/event/oncontextmenu.md) теперь автоматически предотвращает открытие стандартного контекстного меню

## 6.0.3

<span class='release_date'>4 ноября 2022. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена регрессия в [Year view](views/year.md), вызывавшая некорректные аргументы даты для обработчика события [onEmptyClick](api/event/onemptyclick.md)
- Исправлено поведение ['height' свойства секции 'time' lightbox](guides/time.md)
- Исправлена некорректная высота временной шкалы в таймлайн-представлении при использовании [second_scale](views/timeline.md#secondxaxis)
- Скорректировано значение флага нового события в аргументах события [onEventCancel](api/event/oneventcancel.md), чтобы оно было булевым
- Исправлена ошибка скрипта при прокрутке в [Tree Timeline](views/timeline.md) при включённом [smart_rendering](api/method/createtimelineview.md) и изначально загруженных [закрытых](views/timeline.md#dataforyaxissectionsinthetreemode) секциях

## 6.0.2

<span class='release_date'>25 июля 2022. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена регрессия в скриптах для создания [Custom Skins](guides/custom-skins.md)
- Исправлены ошибки скрипта на страницах с включённой Content Security Policy
- Скорректировано поведение DataProcessor при инициализации с [router object](guides/server-integration.md#customrouting)
- Исправлена опечатка в имени DOM-атрибута для ячеек в [Year view](views/year.md)

## 6.0.1

<span class='release_date'>23 июня 2022. Релиз с исправлениями ошибок</span>

### Исправления

- Улучшена совместимость с Salesforce LWC
- Исправлены проблемы с размещением тултипа, из-за которых он иногда обрезался
- Исправлено отображение [колонок](views/timeline.md) в [Tree Timeline](views/timeline.md)
- Отключение [show_quick_info](api/config/show_quick_info.md) теперь предотвращает появление всплывающего окна [Quick Info](guides/touch-support.md#quickinfoextension) при клике мышью, но позволяет открывать его через метод [showQuickInfo](api/method/showquickinfo.md)
- Исправлено некорректное поведение настроек [repeat_date](api/config/repeat_date.md) в отдельных случаях

## <b>6.0</b>

<span class='release_date'>19 мая 2022. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### Важные изменения

В этой версии были внесены изменения в структуру пакета Scheduler и его функциональность. Для корректного обновления рекомендуется ознакомиться с [заметками по миграции](migration.md#53---60).

### Новая функциональность

- Добавлены [деструкторы для экземпляров Scheduler и DataProcessor](guides/multiple-per-page.md#destructorofscheduleranddataprocessorinstances)
- Возможность задавать [высоту секций Timeline](views/timeline.md#changingheightsofsections)
- Поддержка указания [нескольких колонок](views/timeline.md) в левой панели Timeline
- Добавлены новые методы **resolvePosition**, **dateFromPos**, **getEventTop** в [Timeline object](views/timeline.md)

### API

- Добавлен новый шаблон [week_agenda_date](api/template/week_agenda_date.md)
- Представлены объекты [ajax](api/other/ajax.md), [env](api/other/env.md) и [i18n](api/other/i18n.md)
- Добавлен новый метод [Promise](api/method/promise.md)
- Добавлен метод [destructor()](api/method/destructor.md) и событие [onDestroy](api/event/ondestroy.md)
- Представлены отладочные помощники: метод [assert()](api/method/assert.md), свойство [show_errors](api/config/show_errors.md), событие [onError](api/event/onerror.md)
- Добавлены новые методы: [bind()](api/method/bind.md), [copy()](api/method/copy.md), [defined()](api/method/defined.md), [mixin()](api/method/mixin.md)
- Конструктор dataProcessor перемещён из глобальной области видимости в объект scheduler (window.dataProcessor -> [scheduler.DataProcessor](api/method/dataprocessor.md))
- Добавлен метод [createDataProcessor()](api/method/createdataprocessor.md)
- Публичные помощники для [popup-сообщений](guides/popups-and-modals.md) перенесены из **dhtmlx** в объект **scheduler**
- Добавлен метод [serialize()](api/method/serialize.md)
- Представлено свойство [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md)

### Обновления

- Все расширения теперь требуют активации через метод [plugins()](api/method/plugins.md)
- Файлы локализаций удалены; для локализации Scheduler представлен новый [API](api/other/i18n.md)
- `Scheduler.getSchedulerInstance` теперь может принимать объект конфигурации при создании нового экземпляра Scheduler
- Расширение CSP удалено; [режим csp включён по умолчанию](api/config/csp.md)
- В метод [attachEvent()](api/method/attachevent.md) добавлен третий параметр `settings`
- Добавлены [опции маршрутизации для DataProcessor](guides/server-integration.md#customrouting)
- Реализован [импорт dhtmlxScheduler как ES6-модуля](guides/initialization.md#importfilesintoes67andtypescriptapps)

## 5.3.14

<span class='release_date'>29 марта 2022. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлено поведение drag and drop для повторяющихся событий, добавленных через метод [scheduler.addEvent()](api/method/addevent.md)
- Устранена ошибка скрипта из [scheduler.formSection()](api/method/formsection.md) при активных повторяющихся событиях
- Исправлена ситуация, когда планировщик показывал события, которые должны были быть скрыты согласно настройке [first_hour](api/config/first_hour.md)
- Удалён неожиданный вызов события [onEventUnselected](api/event/oneventunselected.md) при каждом клике вне событий, если ни одно событие не выбрано
- Обновлено событие [onEventUnselected](api/event/oneventunselected.md), теперь оно вызывается при удалении выбранного события

## 5.3.13

<span class='release_date'>9 ноября 2021. Релиз с исправлениями ошибок</span>


### Исправления

- Исправлено исчезновение отредактированных [серийных событий](guides/recurring-events.md) после закрытия [Lightbox](guides/configuring-the-lightbox.md) с помощью [scheduler.hideLightbox](api/method/hidelightbox.md).
- Скорректировано динамическое отключение конфигурации [auto_end_date](api/config/auto_end_date.md).
- Улучшена обработка [изменённых экземпляров](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries) в серийных событиях, когда у события серии в `start_date` присутствуют миллисекунды.
- Исправлены смещения позиции скролла, возникающие при использовании модуля [Клавиатурная навигация](guides/keyboard-navigation.md) во время изменения размера события.
- Улучшено поведение фокуса при включённой [Клавиатурной навигации](guides/keyboard-navigation.md): теперь модальный фокус учитывает tabindex для [Lightbox](guides/configuring-the-lightbox.md) и `dhtmlx.modalbox`.
- Скорректировано поведение кнопки "Сегодня" - теперь фокус переходит на первую ячейку колонки "Сегодня", а не на первую ячейку первой колонки в [Неделя](views/week.md).
- Решены проблемы с работой [scheduler.showEvent](api/method/showevent.md) в [Timeline view](views/timeline.md#horizontalscroll) при включённом [Smart Rendering](api/method/createtimelineview.md).

## 5.3.12

<span class='release_date'>24 августа 2021. Bugfix release</span>

### Исправления

- Исправлен бесконечный цикл в представлении [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode), возникавший из-за повторяющихся ключей в списке секций.
- Скорректировано поведение ежемесячных [серийных событий](guides/recurring-events.md) при использовании ограничения `After N occurrences`.
- Исправлена работа конфигурации [recurring_overflow_instances](api/config/recurring_overflow_instances.md) в режиме `lastDay` для сохранения минут и секунд в экземплярах событий.
- Решена проблема, не позволявшая перемещать перетаскиваемые события за пределы планировщика при возврате `false` из [onBeforeEventDragOut](api/event/onbeforeeventdragout.md).
- Обновлены стандартные CSS-стили для [Tree Timeline](views/timeline.md#dataforyaxissectionsinthetreemode) секций [labels](api/template/timelinename_scale_label.md) для предотвращения нежелательных переносов строк при длинных подписях.

## 5.3.11

<span class='release_date'>9 февраля 2021. Bugfix release</span>

### Исправления

- Исправлена ошибка скрипта при смене дат с включённым расширением [Cookie](guides/extensions-list.md#cookie).
- Скорректировано значение заголовка Content-Type при установке у dataProcessor [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) в "JSON".
- Улучшено отображение Lightbox на [мобильных устройствах](guides/touch-support.md) при использовании [Terrace](guides/skins.md#terrace-skin) темы.
- Исправлены ошибки с [серийными событиями](guides/recurring-events.md), приводившие к их смещению на следующий месяц, если в целевом месяце отсутствовала соответствующая дата при ежемесячной периодичности.
- Решена проблема, когда модальное затемнение оставалось после закрытия Lightbox через [scheduler.updateCollection()](api/method/updatecollection.md).

### Обновления

- Добавлено API-событие [onBeforeEventPasted](api/event/onbeforeeventpasted.md) для валидации или корректировки позиции вставленного события.
- Введена новая конфигурация [recurring_overflow_instances](api/config/recurring_overflow_instances.md).

## 5.3.10

<span class='release_date'>11 ноября 2020. Bugfix release</span>

### Исправления

- Скорректировано поведение [column_width](views/timeline.md#horizontalscroll) при скрытии некоторых единиц времени ([hidden](guides/custom-scales.md)).
- Исправлена поддержка touch на iPad под Safari.
- Исправлена обработка событий [onDblClick](api/event/ondblclick.md) и [onClick](api/event/onclick.md) при возврате *false* в [Grid view](views/grid.md).
- Исправлено поведение drag and drop в [Timeline view](views/timeline.md), когда событие переносилось в следующую секцию при клике в нижней части бара события.

## 5.3.9

<span class='release_date'>4 июня 2020. Bugfix release</span>

### Исправления

- Исправлены ошибки отображения в [scrollable timeline](views/timeline.md#horizontalscroll) после прокрутки вниз и перетаскивания последней строки.
- Решены проблемы отображения при переключении между двумя [scrollable timelines](views/timeline.md#horizontalscroll).
- Исправлена ошибка скрипта при прокрутке [timeline](views/timeline.md) на touch-устройствах.
- Скорректированы заголовки Content-Type для POST/PUT/DELETE запросов, отправляемых через `dataProcessor` при использовании [custom headers](guides/server-integration.md#customrequestheadersandparameters).
- Добавлен шаблон [timeline_row_class](api/template/timelinename_row_class.md) для применения CSS-классов к строкам timeline.

## 5.3.8

<span class='release_date'>14 мая 2020. Bugfix release</span>

### Исправления

- Исправлена некорректная высота модального затемнения в [Lightbox](guides/lightbox-editors.md).
- Решены проблемы с размерами при инициализации планировщика внутри модальных окон Bootstrap.

### Обновления

- Планировщик теперь автоматически отслеживает изменение размеров контейнера и корректирует свои размеры.
- Добавлен элемент управления [Mini Calendar](guides/minicalendar.md) для [header config](api/config/header.md).

## 5.3.7

<span class='release_date'>30 апреля 2020. Bugfix release</span>

- Исправлены проблемы с расширением [Container Autoresize](guides/extensions-list.md#containerautoresize) при наличии горизонтального скроллбара в Timeline view [Вид 'Timeline'](views/timeline.md#horizontalscroll).
- Скорректирована опция [show_unassigned](api/method/createtimelineview.md) в [Timeline view](views/timeline.md).

## 5.3.6

<span class='release_date'>27 февраля 2020. Bugfix release</span>

- Исправлены проблемы отображения событий в [Day Timeline view](views/timeline.md#viewmodes) при включённых `scrollable:true` или `smart_rendering:true`.
- Решена ошибка скрипта в [Day Timeline view](views/timeline.md#viewmodes) после перетаскивания нового события при использовании `scrollable:true` вместе с [dataProcessor](guides/server-integration.md).
- Исправлена ошибка скрипта из-за отсутствия элементов `date` в [header config](guides/initialization.md#initializingschedulerviaheaderconfig).
- Улучшено отображение вкладки `day` в [Material skin](guides/skins.md#materialskin) при отсутствии вкладок `week` или `month` в [header config](guides/initialization.md#initializingschedulerviaheaderconfig).

## 5.3.5

<span class='release_date'>31 января 2020. Bugfix release</span>

### Исправления

- Исправлено оформление кнопки "вперёд" справа на панели навигации в [Terrace skin](guides/skins.md) при использовании [header config](guides/initialization.md#initializingschedulerviaheaderconfig).
- Решены проблемы с расширением [URL](guides/extensions-list.md#url), приводившие к ошибкам подсветки событий по URL в некоторых случаях.
- Исправлены ошибки с [Material skin](guides/skins.md#materialskin) при загрузке стилей планировщика через `@import`.

### Обновления

- Добавлен автоматический заголовок планировщика по умолчанию, если ни [header config](guides/initialization.md#initializingschedulerviaheaderconfig), ни [default markup](guides/initialization.md#initializingschedulerviamarkup) не заданы при инициализации, что предотвращает ошибки скрипта.

## 5.3.4

<span class='release_date'>10 декабря 2019. Bugfix release</span>

### Исправления

- Исправлены проблемы вертикальной прокрутки в [scrollable timeline](views/timeline.md#horizontalscroll) при наведении мыши на колонку секций.
- Скорректирована сериализация вложенных объектов через [dataProcessor](guides/server-integration.md).
- Исправлены ошибки скрипта при создании новых событий с помощью [custom lightbox](guides/custom-details-form.md).

## 5.3.3

<span class='release_date'>30 октября 2019. Bugfix release</span>

### Обновления

- Улучшены сообщения об ошибках для часто встречающихся проблем конфигурации.
- Очищена HTML-разметка в нескольких публичных примерах.

## 5.3.2

<span class='release_date'>9 октября 2019. Bugfix release</span>

### Исправления

- Исправлено некорректное поведение обработчика [handler](api/method/rendercalendar.md) в [Mini Calendar](guides/minicalendar.md) при определённом пользовательском шаблоне [calendar_date template](api/template/calendar_date.md).
- Скорректировано округление конечных дат событий при [resize](api/config/drag_resize.md) в [Day/Week views](/views/).

## 5.3.1

<span class='release_date'>2 октября 2019. Bugfix release</span>

### Обновления

- По умолчанию отключена опция [responsive_lightbox](api/config/responsive_lightbox.md).

## 5.3

<span class='release_date'>2 октября 2019. Minor update</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

### Изменения, влияющие на совместимость

Это обновление изменяет поведение некоторых частей компонента. Хотя разрывов совместимости не ожидается, рекомендуется ознакомиться с [заметками по миграции](migration.md) для плавного перехода.

### Новая функциональность

1. Добавлена [поддержка RTL](guides/rtl-mode.md).
2. Улучшена мобильная адаптивность ([[Мобильная адаптивность Scheduler](guides/touch-support.md)]).
3. Интеграция с DHTMLX Suite 6 Layout [Интеграция с dhtmlxLayout](integrations/legacy/dhxlayout-integration.md#dhtmlxsuite-v6).

### Обновления

1. Добавлена настройка [year range](guides/time.md#properties) для элемента управления датой/временем в Lightbox.
2. По умолчанию отключён горизонтальный свайп для смены дат планировщика ([Мобильная адаптивность Scheduler](guides/touch-support.md#touch-gestures-in-the-scheduler)).
3. Теперь заголовок планировщика можно задать через конфигурацию, а не только через разметку [dhtmlxScheduler на чистом JS/HTML](guides/initialization.md#initializingschedulerviaheaderconfig).
4. Представлен метод [render](api/method/render.md) как более очевидный алиас для setCurrentView() и updateView().
5. Метод [hideLightbox](api/method/hidelightbox.md) добавлен в публичный API.

### Исправления

- Исправлена [вертикальная](guides/multiselect.md#properties) настройка элемента multiselect, не работавшая в [Material skin](guides/skins.md#materialskin).

## 5.2.5

<span class='release_date'>23 сентября 2019. Bugfix release</span>

### Исправления

- Исправлена регрессия в расширении [Тултипы](guides/tooltips.md), появившаяся в версии [v5.2.4](#524).

## 5.2.4

<span class='release_date'>19 сентября 2019. Bugfix release</span>

### Исправления

- Решена проблема с [readonly формой](guides/readonly.md#readonlymodefortheentirelightbox), не позволявшая изменять [конфигурацию lightbox](guides/lightbox-editors.md) после [инициализации](api/method/init.md) Scheduler.
- Исправлена совместимость с Angular 8.

## 5.2.3

<span class='release_date'>20 августа 2019. Bugfix release</span>

### Исправления

- Исправлена анимация полос событий в [scrollable Timeline](views/timeline.md#horizontalscroll) при drag and drop.
- Исправлена ошибка в [Дневной вид](views/day.md) / [Week View](views/week.md), когда событие перемещалось в [multiday section](api/config/multi_day.md) при переносе в конец дня.
- Восстановлена корректная работа настройки `scroll_position` в [scrollable Timeline](views/timeline.md#horizontalscroll).
- Исправлены ошибки позиционирования для частей [multi-section events](views/timeline.md#assignmentofeventstoseveralsections) после клика мышью.
- Решена ошибка скрипта, возникавшая при появлении тултипа в режиме `cell` в [Timeline view](views/timeline.md#viewmodes) при использовании [ignore_timeline](guides/custom-scales.md).

## 5.2.2

<span class='release_date'>7 августа 2019. Bugfix release</span>

### Исправления

- Добавлены более информативные сообщения об ошибках для типовых ошибок конфигурации.
- Исправлена ошибка скрипта при двойном клике по любой подписи в [readonly форме](guides/readonly.md#readonlymodefortheentirelightbox).
- Исправлены проблемы отображения в [Timeline view](views/timeline.md) при использовании `smart_rendering:true` вместе с `section_autoheight:false`.
- Исправлена ошибка скрипта в [Year view](views/year.md) при скрытии дней с событиями с помощью метода [scheduler.ignore_year](guides/custom-scales.md).

## 5.2.1

<span class='release_date'>11 июня 2019. Bugfix release</span>

### Исправления

- Исправлены проблемы с определением типа данных в IE11, как описано в [load](api/method/load.md).
- Исправлен метод [timeline.scrollTo](views/timeline.md#timelineobjectapi) для таймлайнов без [горизонтального скроллбара](views/timeline.md#horizontalscroll).
- Восстановлена работоспособность метода [showEvent](api/method/showevent.md) в [Timeline view](views/timeline.md).
- Исправлено вертикальное прокручивание в [прокручиваемом таймлайне](views/timeline.md#horizontalscroll) при `smart_rendering:false`.
- Исправлено позиционирование событий в [мультидневном units view](views/units.md#displayingunitsformultipledays) с расширением [multisection](views/units.md#assigningeventstoseveralunits), когда установлена опция [step](views/units.md#scrollingunits).
- Исправлены проблемы с размером событий в [Daily Timeline](views/timeline.md#daysmodedetails).

## 5.2

<span class='release_date'>6 июня 2019. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

### Важные изменения

Некоторые методы API изменили поведение. Обычно это не приведёт к поломке существующего кода, но рекомендуется ознакомиться с [заметками по миграции](migration.md#51---52) для плавного перехода.

### Новая функциональность

1. Добавлена поддержка [пользовательского HTML-контента в ячейках таймлайна](views/timeline.md#customcontentincells) (PRO-версия).
2. Включено [перетаскивание событий за тело](api/config/drag_event_body.md).

### Обновления

- Параметр формата данных в [load](api/method/load.md) и [parse](api/method/parse.md) теперь необязателен; scheduler автоматически определяет формат.
- [Функции преобразования даты в строку](guides/date-formats.md) могут автоматически определять формат строки даты, если он отличается от указанного.
- [Библиотека dhtmlxConnector](https://github.com/DHTMLX/connector-php) больше не входит в пакет dhtmlxScheduler.
- Для запуска примеров больше не требуется сервер PHP/Apache.
- Добавлены новые методы для [timeline object](views/timeline.md#timelineobjectapi).
- Контрол [Multiselect](guides/multiselect.md) теперь поддерживает загрузку опций в формате JSON.
- Добавлены новые события: [onLoadStart](api/event/onloadstart.md), [onBeforeParse](api/event/onbeforeparse.md), [onParse](api/event/onparse.md), [onLoadEnd](api/event/onloadend.md), заменяющие устаревшие события **onXLS** и **onXLE**.

### Исправления

- Исправлено некорректное поведение при вызове [clearAll](api/method/clearall.md) до `scheduler.endLightbox(false)` при создании нового события.
- Решены проблемы с мерцанием [горизонтального скролла таймлайна](views/timeline.md#horizontalscroll) на iPad.
- Исправлены различные проблемы отображения в [прокручиваемом таймлайне](views/timeline.md#horizontalscroll).
- В Units view [](api/template/unitsname_scale_text.md) теперь в аргументах присутствует дата секции.
- Исправлена ошибка скрипта в [Units view](views/units.md) при создании события без загруженных секций.
- Контрол [Multiselect](guides/multiselect.md) теперь принимает только булевы значения для свойства `vertical`; строковые значения вроде `vertical:"false"` теперь интерпретируются как булево `true`.

## 5.1.6

<span class='release_date'>11 января 2019. Багфикс-релиз</span>

### Исправления

- Исправлены позиции событий, запланированных на сб-вс при `start_on_monday = false` в Month view.
- Исправлены ошибки скрипта в прокручиваемых таймлайнах с маркером текущего времени.
- Исправлены некорректные значения аргументов, передаваемых обработчику `onYScaleClick` в прокручиваемых таймлайнах после горизонтального скролла.
- Решена проблема, из-за которой прокручиваемые таймлайны отображались пустыми до обновления после перезагрузки секций.
- Исправлены ошибки отображения, когда некоторые ячейки папок Tree timeline не отображались после горизонтального скролла.
- Исправлено поведение изменения размера событий с расширением `all_timed`, теперь изменять размер можно только у последнего фрагмента события.
- Исправлено исчезновение событий при изменении размера в режиме `all_timed="short"`.

## 5.1.1

<span class='release_date'>14 декабря 2018. Багфикс-релиз</span>

### Исправления

- Исправлено отсутствие выделения фокуса при навигации с клавиатуры в таймлайне.
- Исправлена начальная высота `timeline_scale_header` при указании `second_scale`.
- Исправлена проблема, когда `event_min_dy` не влиял на высоту секции, если в секции было только одно событие.
- Исправлено самозакрытие всплывающего окна быстрого просмотра при многократном клике по одному и тому же событию.
- Исправлены ошибки скрипта после удаления событий в `Year view`.
- Исправлено некорректное начальное отображение прокручиваемых таймлайнов при отсутствии событий.
- Включён smart rendering для непрокручиваемых таймлайнов.
- Исправлено сбрасывание позиции скролла при смене даты при включённом расширении key_nav в таймлайне.
- Исправлено значение аргумента `old_date` в событии `onBeforeViewChange` в некоторых случаях.
- Исправлены проблемы отображения в прокручиваемых таймлайнах с игнорируемыми временными ячейками.
- Улучшено поведение при прокрутке во время создания новых событий в day/week views.
- Исправлено событие `onAfterSchedulerResize`, не срабатывающее в `Timeline view`.
- Улучшена производительность отрисовки событий в `Week view`.

## 5.1

<span class='release_date'>29 ноября 2018. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

### Важные изменения

HTML-структура Timeline view была значительно обновлена; для миграции может потребоваться корректировка кода. Подробнее - в статье [Миграция](migration.md#50---51).

### Основные изменения

1. Добавлен [горизонтальный скролл в Timeline view](views/timeline.md#horizontalscroll) (PRO-версия).
2. Улучшено smart rendering и производительность Timeline view (PRO-версия).
3. Добавлена интеграция с различными серверными платформами. [См. соответствующие руководства](integrations/howtostart-guides.md).

### Минорные изменения

- Обновлён [API объекта Timeline](views/timeline.md#timelineobjectapi).
- Добавлена поддержка [автопрокрутки в Timeline view](views/timeline.md#autoscrollconfiguration).
- В шапку колонки с секциями в таймлайне теперь можно добавить метку.

## <b>5.0</b>

<span class='release_date'>17 мая 2018. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

### Важные изменения

1. Удалены скины Classic и Glossy. Подробнее см. [детали миграции](migration.md#44---50).
2. Проведен глобальный рефакторинг CSS в Scheduler. Подробнее о влиянии на ваши приложения [здесь](migration.md#44---50).

### Основные изменения

1. Добавлен новый [Material skin](guides/skins.md#materialskin).
2. Внедрена [серверная интеграция с REST API](guides/server-integration.md).
3. Улучшена гибкость [кастомизации скинов](guides/custom-skins.md).

### Минорные изменения

- Обновлена поддержка touch для устройств Microsoft.
- Добавлена [иврит-локализация](guides/localization.md) для формы повторяющихся событий.
- Добавлено событие [onLoadError](api/event/onloaderror.md) для сетевых и серверных ошибок.

### Исправления и улучшения

- Исправлены проблемы совместимости с ES6/TS-импортами.
- Улучшена поддержка навигации с клавиатуры.
- Различные минорные багфиксы.

## 4.4.9

<span class='release_date'>6 июня 2017. Багфикс-релиз</span>

### Исправления

- Исправлен регресс в поддержке WAI-ARIA при отключённых атрибутах WAI-ARIA.
- Улучшена поддержка WAI-ARIA, повышена совместимость с JAWS.
- Исправлено множество ошибок и улучшена навигация с клавиатуры.
- Исправлены некорректные server config-сниппеты в примерах.
- Решены конфликты между cookie и ajax timeout'ами в расширении Cookie.
- Исправлены ошибки создания событий в Year view.
- Исправлены проблемы с позицией мыши при drag and drop на увеличенных страницах.
- Исправлено drag and drop на touch-устройствах в расширении all-timed.
- Исправлена динамическая загрузка для корректных временных диапазонов при настройке *server_utc*.
- Различные минорные исправления в локалях.

## 4.4

<span class='release_date'>2 февраля 2017. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

### Основные изменения

1. Добавлена [навигация с клавиатуры](guides/keyboard-navigation.md).
2. Внедрена [поддержка WAI-ARIA](guides/accessibility.md#wai-aria-attributes).
3. Добавлены [высококонтрастные темы](guides/accessibility.md#high-contrast-themes).
4. Предоставлена начальная поддержка Content Security Policy.

### Минорные изменения

- Включена возможность использовать markTimespan для Month view.
- Добавлена возможность удаления маркеров повторяемости с конкретных дат.
- В Year view появилась опция пропуска дней.
- В Multiselect добавлена опция *delimiter*.
- Обновлена совместимость внешнего drag-n-drop с последней версией dhtmlxSuite.
- Включены улучшения CSP из публичного репозитория.
- Незначительно повышена производительность [Timeline](views/timeline.md).
- Нормализованы значения z-index и обновлены стили для последней версии [dhtmlxCombo](guides/combo.md).

### Исправления и улучшения

- Гарантировано, что addEventNow возвращает ID нового события.
- Исправлены проблемы drag-n-drop и игнорируемых колонок в Week view.
- Добавлены проверки на неопределённые touch-события.
- Решены проблемы с кликами и фокусом клавиатуры на iPad.
- Сброс состояния dataprocessor после scheduler.clearAll.
- Исправлены ошибки JS в обработчиках событий от SVG-элементов.
- Исправлены различные баги в расширении тултипа.
- Исправлены множественные проблемы расширения container_autosize.
- Реализовано множество других исправлений.

## 4.3.35

<span class='release_date'>26 мая 2016. Багфикс-релиз</span>

### Исправления

- Интегрирована последняя версия библиотеки DHTMLX Suite
- Добавлена поддержка SVG-элементов внутри scheduler
- Исправлены даты при drag и создании событий в таймлайнах с округлёнными датами
- Двойной клик по отмеченным временам теперь учитывает настройку *scheduler.config.dblclick_create*
- Исправлены некорректные аргументы `onXScaleClick` в таймлайнах при активном *scheduler.ignore_timeline*
- Улучшено выравнивание лейаута при масштабировании браузера
- Исправлены игнорируемые колонки и отображение Year view
- Исправлены ошибки на мультитач-экранах
- Улучшено поведение фокуса клавиатуры на мобильных устройствах
- Исправлены различные проблемы с переходом на летнее время (DST)
- События, запланированные на 31-й день месяца, теперь корректно отображаются в Daily Timeline
- `addEventNow` теперь возвращает ID созданного события
- Исправлена обработка события `window.onresize` при удалении контейнера scheduler из DOM

## 4.3.25

<span class='release_date'>3 марта 2016. Багфикс-релиз</span>


### Исправления

- Улучшена поддержка сенсорных устройств: теперь срабатывают tap и double tap на многодневных областях в представлениях Day, Week и Units
- Исправлена регрессия, из-за которой события исчезали в начале touch-drag действий
- Исправлен callback onYScaleClick при наличии игнорируемых колонок в Timeline
- Исправлено состояние объекта события после отмены drag and drop в Timeline
- Шаблон *timeline_scale_class* теперь применяется к элементам-папкам в Tree Timeline
- Предотвращены ошибки JavaScript при очистке планировщика во время активного запроса dataProcessor
- Исправлены некорректные состояния при добавлении/изменении серий повторяющихся событий с отключённой опцией autoUpdate в dataProcessor
- Улучшена видимость событий при включённых первых или последних часах в представлениях Day и Week
- Исправлен выбор секции по умолчанию при создании события двойным кликом в Multiday Units View
- Устранена проблема в Chrome, из-за которой события click и double click иногда не срабатывали
- Исправлены проблемы с переходом на летнее время в Safari
- Различные мелкие исправления

## 4.3

<span class='release_date'>4 февраля 2015. Минорное обновление</span>

1. Добавлен режим "Days" для представления Timeline (PRO версия) ([details](views/timeline.md#daysmodedetails))
2. В Units view добавлена возможность отображения юнитов на несколько дней (PRO версия) ([details](views/units.md#displayingunitsformultipledays))
3. Добавлены новые события для расширения 'expand' ([details](guides/extensions-list.md#expand))
4. Добавлена новая опция для расширения Limit ([details](api/config/now_date.md), [details](guides/extensions-list.md#limit))
5. Добавлена новая опция для расширения Tooltip ([details](api/config/touch_tooltip.md), [details](guides/extensions-list.md#tooltip))
6. Реализована возможность связывать события с помощью расширения URL ([details](guides/extensions-list.md#url))
7. Исправлены проблемы, связанные с переходом на летнее время
8. Решена проблема создания новых событий на сенсорных устройствах в представлении Timeline
9. Добавлены Week Agenda, Grid View, Timeline view, Units View и Multisection события (PRO версия) ([details](views/weekagenda.md), [details](views/grid.md), [details](views/timeline.md), [details](views/units.md), [details](api/config/multisection.md))

## 4.2

<span class='release_date'>12 ноября 2014. Минорное обновление</span>

1. Добавлена возможность настраивать форму повторяющихся событий ([details](guides/recurring-events.md))
2. DataProcessor обновлён: добавлен режим REST и поддержка JSON-ответов ([details](guides/server-integration.md))
3. Улучшено drag-and-drop для multisection событий (PRO версия) ([details](api/config/multisection_shift_all.md))
4. Добавлены события API для обработки ошибок Ajax и сервера ([details](api/event/onloaderror.md))
5. Повышена производительность Timeline view
6. Добавлена опция отложенного рендеринга ([details](api/config/delay_render.md))
7. Улучшен экспорт данных в iCal и Excel ([details](export/excel.md))
8. Исправлена совместимость с DHTMLX Suite 4.0
9. Различные мелкие исправления

## 4.1

<span class='release_date'>13 июня 2014. Минорное обновление</span>

1. Представлен новый стиль "Flat" ([details](guides/skins.md#flatskin))
2. Реализована привязка событий к нескольким секциям в Timeline и Units Views (PRO версия) ([details](views/timeline.md), [details](views/units.md#assigningeventstoseveralunits))
3. Добавлена возможность изменения размера многодневных событий в Month view с помощью drag-and-drop ([details](views/month.md#resizingeventsbydragndropver41))
4. Реализовано drag-and-drop между несколькими планировщиками ([details](guides/drag-between.md))
5. Добавлен экспорт данных в PNG ([details](export/png.md))
6. Введён новый метод экспорта данных в PDF ([details](export/pdf.md))
7. Подсвечивается длительность события на шкале времени при перетаскивании ([details](api/config/drag_highlight.md))
8. Позволено изменять прокручиваемый временной интервал в Grid view (PRO версия) ([details](views/grid.md#activatingnavigation))
9. Добавлена опция запрета перетаскивания событий за пределы видимой части Timeline view ([details](api/config/limit_drag_out.md))
10. Исправлены ошибки на сенсорных устройствах Windows
11. Обновлены примеры для корректной работы в разных часовых поясах

## <b>4.0</b>

<span class='release_date'>2 июля 2013. Крупное обновление</span>

1. Добавлены гибкие временные шкалы с возможностью удаления отдельных дней или часов ([details](guides/custom-scales.md))
2. В Month view добавлены ссылки "more events" ([details](views/month.md#limitingthenumberofeventsinacell))
3. Интеграция с jQuery ([details](integrations/other/jquery-integration.md))
4. Добавлена интеграция с Backbone ([details](integrations/legacy/backbone-integration.md))
5. Изменён стиль по умолчанию на "terrace"; многодневные события теперь видимы по умолчанию
6. Добавлена альтернативная логика начальной даты для повторяющихся событий ([details](api/config/repeat_precise.md))
7. Планировщик теперь может загружать JSON-данные из .Net web-сервисов
8. Существенно доработана документация

## 3.7

<span class='release_date'>20 февраля 2013. Минорное обновление</span>

1. Добавлена поддержка сенсорных устройств (планшеты и сенсорные мониторы) ([details](guides/touch-support.md))
2. Добавлена румынская локализация

## 3.6

<span class='release_date'>3 декабря 2012. Минорное обновление</span>

1. Представлена версия для Windows 8
2. Расширена настройка формата даты для форм lightbox
3. Добавлена навигация по поддням в Timeline view
4. Реализована возможность пользовательской сортировки в Timeline view
5. Добавлен многостраничный экспорт в PDF ([details](export/pdf-multi.md))

## 3.5

<span class='release_date'>24 августа 2012. Минорное обновление</span>

1. Реализовано отображение нескольких планировщиков на одной странице ([details](guides/multiple-per-page.md))
2. Добавлена поддержка загрузки JSON напрямую из Connectors ([details](guides/server-integration.md))
3. Улучшена отрисовка пользовательских событий ([details](guides/custom-events-display.md))
4. В Timeline view реализовано drag, resize и контроль высоты событий
5. Представлен новый стиль 'dhx_terrace' ([details](guides/skins.md))
6. Добавлены новые опции для блокировки дат ([details](guides/limits.md#howtoblockcertaindates))
7. Реализовано выделение временных интервалов ([details](guides/limits.md#howtomarkcertaindates))
8. Добавлена подсветка временных интервалов ([details](api/method/marktimespan.md))
9. Добавлены новые методы API: updateView, showEvent, getRenderedEvent, getActionData ([details](api/method/updateview.md), [details](api/method/showevent.md), [details](api/method/getrenderedevent.md), [details](api/method/getactiondata.md))
10. Добавлен JSMessage
11. Представлен Grid view (PRO версия) ([details](views/grid.md))
12. Введены новые опции конфигурации
13. Упрощён доступ к объектам секций lightbox ([details](api/method/formsection.md))
14. Добавлена поддержка команд клавиатуры 'CTRL+C', 'CTRL+X', 'CTRL+V' ([details](guides/keyboard-navigation.md))

## <b>3.0</b>

<span class='release_date'>27 июля 2011. Крупное обновление</span>

1. Добавлен WeekAgenda view (PRO версия) ([details](views/weekagenda.md))
2. Представлен lightbox, удобный для нетбуков ([details](guides/lightbox-editors-manipulations.md#linkingselectcontrols))
3. Добавлено каскадное отображение событий ([details](api/config/cascade_event_display.md))
4. Упрощено назначение цветов событиям ([details](guides/custom-events-color.md))
5. Реализовано drag and drop для формы деталей
6. Добавлены пользовательские кнопки для формы деталей ([details](guides/changing-lightbox-buttons.md))
7. Добавлен маркер текущего времени в представлениях day и week
8. Добавлен многострочный заголовок для Timeline view
9. Сделаны настраиваемыми границы рабочего времени ([details](guides/collisions.md))
10. Добавлен API для доступа к значениям lightbox ([details](guides/lightbox-editors-manipulations.md))

## 2.3

<span class='release_date'>30 августа 2010. Минорное обновление</span>

### Основные изменения

1. Добавлен Map view ([details](views/map.md))
2. Представлен Cell mode для Timeline view (PRO версия) ([details](views/timeline.md#viewmodes))
3. Добавлен Tree mode для Timeline view (PRO версия) ([details](views/timeline.md#viewmodes))
4. Добавлены тултипы для всех представлений ([details](guides/tooltips.md))
5. Реализовано создание новых событий двойным кликом или drag-and-drop в режиме Timeline
6. Реализовано перемещение событий drag-and-drop в режиме Timeline
7. Добавлена поддержка создания новых событий через внешний drag and drop ([details](integrations/legacy/dhtmlx-dnd.md))

### Мелкие изменения

- Добавлена опция формата номера недели ([details](guides/settings-format.md))
- Добавлена опция full_day ([details](guides/custom-details-form.md))
- Добавлены опции event_duration и auto_end_date ([details](guides/custom-details-form.md))
- Добавлен multiselect-секция для формы деталей ([details](guides/custom-details-form.md))
- Добавлены секции checkbox, combo и radio для формы деталей ([details](guides/custom-details-form.md))
- Реализована возможность предотвращать коллизии для повторяющихся событий
- Добавлены дополнительные параметры для обработчиков, связанных с Timeline
- Расширен API расширения mini-calendar ([details](guides/minicalendar.md))
- Упрощена реализация пользовательских форм ([details](guides/custom-details-form.md))

### Исправления и улучшения

- Исправлена некорректная обработка некоторых источников данных iCal
- Исправлены ошибки отображения перекрывающихся событий

## 2.2

<span class='release_date'>14 апреля 2010. Минорное обновление</span>

### Основные изменения

1. Добавлен экспорт в XML, iCal, JSON ([details](export/serialization.md))
2. Добавлен экспорт в PDF ([details](export/pdf.md))
3. Реализована загрузка данных из JSON ([details](guides/data-formats.md))
4. Добавлено расширение 'Collision detection' ([details](guides/collisions.md))
5. Добавлено расширение 'Date-scale limitation' ([details](guides/collisions.md))
6. Добавлено расширение mini-calendar ([details](guides/minicalendar.md))
7. Добавлен Timeline view ([details](views/timeline.md))
8. Реализована авто-загрузка списков опций с сервера ([details](guides/select.md))

### Мелкие изменения

- Сделаны настраиваемыми горячие клавиши и размеры некоторых элементов
- Добавлена ступенчатая прокрутка в Units view (PRO версия) ([details](views/units.md#scrollingunits))
- Добавлены арабская, венгерская, индонезийская, польская и словенская локализации ([details](guides/localization.md#included-locales))
- Добавлено 18 новых примеров

### Исправления и улучшения

- Исправлены различные ошибки, связанные со смещением времени
- Решены проблемы с повторяющимися событиями в Agenda view
- Исправлены проблемы с повторяющимися событиями в Year view

## 2.1

<span class='release_date'>2 декабря 2009. Минорное обновление</span>

### Основные изменения

1. Добавлен Agenda view ([details](views/agenda.md))
2. Добавлен Year view ([details](views/year.md))
3. Добавлено несколько небольших расширений
4. Представлен Skin Builder для планировщика
5. Количество примеров увеличено вдвое

### Полный список обновлений

+ добавлен вид agenda  
+ добавлен вид year  
+ небольшие расширения  
+ добавлено событие onEventSave  
+ представлено событие onSchedulerResize  
+ теперь доступны финская и голландская локализации  
+ добавлена китайская локализация  
+ включён португальский перевод для планировщика  
+ теперь доступен шаблон time_picker  
+ введён шаблон event_date  
+ исправлены проблемы с отображением много-недельных событий (#808)  
+ исправлены проблемы рендеринга редактора в IE6  
+ скорректирован размер event-bar в сложных динамических шаблонах  
+ устранены ошибки при выполнении js-команд над невидимыми событиями  
+ исправлена обработка time_step, если он задан строкой (#788)  
+ удалены лишние полосы прокрутки в IE (#776)  
+ скорректирована конечная дата метки шкалы недели (#621)  
+ исправлены проблемы перетаскивания для добавляемых элементов (#782)  
+ улучшено размещение событий на несколько дней во view unit (#784)  
+ предотвращена установка конечной даты раньше начальной (#781)  
+ исправлены проблемы при обработке неизвестных CSS  
+ скорректировано отображение обводки в Chrome и Safari  
+ исправлено позиционирование lightbox на прокручиваемых страницах  
+ устранены проблемы перехода летнее|зимнее время  
+ исправлен рендеринг multi_day зоны при удалении или добавлении событий  
+ решены проблемы отображения повторяющихся событий после изменения размера в режиме редактирования  
+ исправлено поведение редактора событий при отключённом событии "onClick" (#617)  
+ скорректирована обработка 12AM при преобразовании строки в дату  


## <b>2.0</b> 

<span class='release_date'>20 июля 2009. Крупное обновление</span>

### Основные изменения

1. Добавлена поддержка [повторяющихся событий](guides/recurring-events.md) 
2. Введена возможность создания [Units view](views/units.md) (PRO версия) 
3. События на несколько дней теперь видны в режимах День и Неделя (scheduler.config.multi_day = true;) 
4. Месячный вид может автоматически изменять размер для предотвращения переполнения данных 
5. Добавлена поддержка создания пользовательских видов 


## <b>1.0</b> 

<span class='release_date'>20 мая 2009. Первый релиз</span>

- Включены виды День/Неделя/Месяц  
- Поддержка drag-and-drop  
- Доступна поддержка Ajax-enabled web API
