---
title: "Recurring Events"
sidebar_label: "Recurring Events"
---

# Повторяющиеся события

Повторяющиеся события — распространённая функция в календарях событий, позволяющая пользователям создавать события, которые повторяются через заданные интервалы. Начиная с версии v7.1 Scheduler использует формат на основе RFC-5545 для повторяющихся событий.

Эта статья объясняет, как использовать повторяющиеся события в Scheduler и как хранить их в базе данных.

:::note
Вы можете найти описание устаревшего формата повторяющихся событий [здесь](guides/recurring-events-legacy.md)
:::

По умолчанию Scheduler не поддерживает повторяющиеся события. Чтобы добавить такую поддержку, необходимо включить расширение `recurring` на странице:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

После активации поддержки повторяющихся событий окно lightbox начинает выглядеть как на изображении ниже:

![recurring_lightbox](/img/recurring_lightbox.png)


## Варианты конфигурации

Библиотека предоставляет следующую опцию для настройки повторяющихся событий:

- [`repeat_date`](api/config/repeat_date.md) - устанавливает формат даты поля 'End by' в окне 'recurring' lightbox

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~

**Связанный пример** [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

## 'Recurring' lightbox

По умолчанию, после включения расширения recurring, lightbox приобретает ещё один раздел — "Repeat event" (повторение события).  
И дефолтное определение lightbox для повторяющихся событий выглядит следующим образом:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~

**Связанный пример** [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Описание формата

Повторяющееся событие хранится в базе данных как одна запись, которая содержит все поля обычного события и несколько дополнительных свойств:

1. **start_date** - (_datetime_) определяет начальную дату серии
2. **end_date** - (_datetime_) определяет конечную дату серии
3. **rrule** - (_string_) задаёт правило повторения
4. **duration** - (_number_) длительность повторяющегося экземпляра
5. **recurring_event_id** - (_string|number_) идентификатор родительской серии, заполняется только для изменённых или удалённых экземпляров серии
6. **original_start** - (_datetime_) исходная дата редактируемого экземпляра, заполняется только для изменённых или удалённых экземпляров серии
7. **deleted** - (_boolean_) указывает на удалённый экземпляр серии, заполняется только для удалённых экземпляров серии

**rrule** следует формату iCalendar, как указано в RFC-5545, и определяет частоту, интервал и другие параметры, контролирующие схему повторения.

### Отличия от iCalendar

Наш формат отличается от iCalendar двумя ключевыми моментами:

#### Раздельное хранение STDATE и DTEND:

В формате iCalendar дата начала и окончания повторяющейся серии обычно включаются как часть строки **RRULE** в свойствах **STDATE** и **DTEND**.  
В нашем формате **stdate** и **dtend** хранятся как отдельные поля. Такое разделение упрощает манипуляцию и запросы повторяющихся событий по дате без необходимости разбирать строку **RRULE**.

Вот пример серии повторяющихся событий, установленной на повторение каждую понедельник с 1 июня 2027 года по 1 декабря 2027 года:

~~~js
{
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2027-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2027-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### Обработка исключений

Исключения, также называемые изменёнными или удалёнными экземплярами серии, сохраняются как отдельные записи событий и связаны с их родительской серией.  
Исключения имеют три дополнительных свойства: **recurring_event_id**, **original_start** и **deleted**. Эти свойства позволяют легко идентифицировать изменённые или удалённые экземпляры и их связь с родительской серией.

:::note
Обратите внимание, что, в отличие от традиционного формата iCalendar, исключения (изменённые или удалённые экземпляры) НЕ сохраняются в свойстве **EXDATE** в **RRULE** серии.
:::  

Вот пример повторяющейся серии с одним изменённым и одним удалённым экземпляром:

~~~js
[
    {
        "id": 1,
        "text": "Weekly Team Meeting",
        "start_date": "2027-06-03 09:00:00",
        "duration": 3600,
        "end_date": "2027-12-02 10:00:00",
        "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
        "recurring_event_id": null,
        "original_start": null
    },
    {
        "id": 2,
        "text": "Special Team Meeting",
        "start_date": "2027-06-10 09:00:00",
        "end_date": "2027-06-10 11:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-10 09:00:00"
    },
    {
        "id": 3,
        "text": "Deleted Team Meeting",
        "start_date": "2027-06-17 09:00:00",
        "end_date": "2027-06-17 10:00:00",
        "rrule": null,
        "recurring_event_id": 1,
        "original_start": "2027-06-17 09:00:00",
        "deleted": true
    }
]
~~~

Повторяющееся событие, запланированное на `2027-06-10 09:00:00`, будет заменено записью `Special Team Meeting`, а событие на `2027-06-17 09:00:00` — пропущено.

Обратите внимание, что **rrule** изменённых или удалённых экземпляров игнорируется.

**text**, **start_date**, и **end_date** удалённых экземпляров также игнорируются, и значения этих полей не будут влиять на поведение Scheduler.

## Редактирование/удаление конкретного экземпляра в серии

Существует возможность удалить или отредактировать конкретный экземпляр в серии.

### Важные советы

- Для каждого обновления повторяющегося события создаётся отдельная запись в БД.
- Конкретные экземпляры ссылаются на родительское событие через свойство **recurring_event_id**.
- После редактирования экземпляра в серии, поле **original_start** для этого обновления будет хранить дату, когда экземпляр должен был произойти, если бы он не был отредактирован, вместо реальной длительности события. Поэтому, если экземпляр состоялся 27 июля 2027 года в 15:00 и был перенесён на 30 июля 2027 года в 15:00, временная метка будет отражать первоначальную дату.

### Логика на стороне сервера

Помимо дополнительных полей, на стороне сервера требуется добавить специальную логику:

- Если удалённый экземпляр был вставлен — ответ сервера должен иметь статус "deleted".
  - Удалённый экземпляр можно определить по непустому значению свойства **deleted**.
- Если серия была изменена, все изменённые и удалённые экземпляры серии должны быть удалены.
  - Серия идентифицируется по непустому значению свойства **rrule** и пустому значению свойства **recurring_event_id**.
  - Изменённые экземпляры серии — это все записи, в которых **recurring_event_id** совпадает с **id** серии.
- Если событие с непустым значением **recurring_event_id** было удалено, его нужно обновить до deleted="true" вместо удаления.

:::note
Вы можете найти полные примеры кода [здесь](integrations/howtostart-guides.md)
:::


## Пользовательское управление блоком recurring lightbox

Начиная с версии 4.2, Scheduler позволяет задать собственный HTML для блока 'recurring' в lightbox.

#### Какие настройки можно сделать?

1. Изменение разметки
2. Удаление ненужных элементов (например, типа повторения "ежегодно")
3. Установка значений по умолчанию для полей ввода (например, нужно, чтобы все серии создавались без конца)

### По умолчанию шаблон контроля блока повторения

Дефолтный шаблон контроля для блока повторения в lightbox выглядит следующим образом, где объект `loc` — это объект локализации (региональные подписи) Scheduler:

~~~html
<div class="dhx_form_rrule">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">${loc.repeat_never}</option>
            <option value="DAILY">${loc.repeat_daily}</option>
            <option value="WEEKLY">${loc.repeat_weekly}</option>
            <option value="MONTHLY">${loc.repeat_monthly}</option>
            <option value="YEARLY">${loc.repeat_yearly}</option>
            <option value="WORKDAYS">${loc.repeat_workdays}</option>
            <option value="CUSTOM">${loc.repeat_custom}</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom dhx_hidden">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">${loc.repeat_freq_day}</option>
                <option value="WEEKLY">${loc.repeat_freq_week}</option>
                <option value="MONTHLY">${loc.repeat_freq_month}</option>
                <option value="YEARLY">${loc.repeat_freq_year}</option>
            </select>
        </div>
        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="MO" />${loc.day_for_recurring[1]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="TU" />${loc.day_for_recurring[2]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="WE" />${loc.day_for_recurring[3]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="TH" />${loc.day_for_recurring[4]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="FR" />${loc.day_for_recurring[5]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="SA" />${loc.day_for_recurring[6]}</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                    value="SU" />${loc.day_for_recurring[0]}</label>
            </div>
            <div class="dhx_form_repeat_custom_month dhx_hidden">
                <select name="dhx_custom_month_option">
                    <option value="month_date"></option>
                    <option value="month_nth_weekday"></option>
                </select>
            </div>
            <div class="dhx_form_repeat_custom_year dhx_hidden">
                <select name="dhx_custom_year_option">
                    <option value="month_date"></option>
                    <option value="month_nth_weekday"></option>
                </select>
            </div>
        </div>
    </div>
    <div class="dhx_form_repeat_ends">
        <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                    <label><input name="dhx_form_repeat_ends_after" type="number"
                        min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
                <div class="dhx_form_repeat_ends_on dhx_hidden">
                    <input type="date" name="dhx_form_repeat_ends_ondate">
                </div>
            </div>
        </div>
    </div>
</div>
~~~

#### Основной контрол повторения

По существу, блок повторения lightbox содержит основной контрол повторения, который имеет 5
типов повторения с следующими опциями: "Каждый день", "Каждую неделю", "Каждый месяц",
"Каждый год", "Каждый рабочий день". Кроме того, он включает опцию "Пользовательский" для создания требуемого
типа и опцию "Никогда" для отключения повторения:

~~~html
<div class="dhx_form_repeat_pattern">
    <select>
        <option value="NEVER">Never</option>
        <option value="DAILY">Every day</option>
        <option value="WEEKLY">Every week</option>
        <option value="MONTHLY">Every month</option>
        <option value="YEARLY">Every year</option>
        <option value="WORKDAYS">Every weekday</option>
        <option value="CUSTOM">Custom</option>
    </select>
</div>
~~~

Для типа повторения "Custom" существуют специальные единицы повторения: "Day", "Week", "Month", "Year" и поле ввода интервала повтора. Единицы "Week", "Month" и "Year" имеют собственные разделы с конкретными вариантами повторения (по умолчанию эти разделы скрыты до выбора нужного типа):

~~~html
<div class="dhx_form_repeat_custom">
    <div class="dhx_form_repeat_custom_interval">
        <input name="repeat_interval_value" type="number" min="1">
        <select name="repeat_interval_unit">
            <option value="DAILY">${loc.repeat_freq_day}</option>
            <option value="WEEKLY">${loc.repeat_freq_week}</option>
            <option value="MONTHLY">${loc.repeat_freq_month}</option>
            <option value="YEARLY">${loc.repeat_freq_year}</option>
        </select>
    </div>

    <div class="dhx_form_repeat_custom_additional">
        <div class="dhx_form_repeat_custom_week dhx_hidden">
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="MO" />${loc.day_for_recurring[1]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TU" />${loc.day_for_recurring[2]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="WE" />${loc.day_for_recurring[3]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="TH" />${loc.day_for_recurring[4]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="FR" />${loc.day_for_recurring[5]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SA" />${loc.day_for_recurring[6]}</label>
            <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day"
                value="SU" />${loc.day_for_recurring[0]}</label>
        </div>

        <div class="dhx_form_repeat_custom_month dhx_hidden">
            <select name="dhx_custom_month_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_year dhx_hidden">
            <select name="dhx_custom_year_option">
                <option value="month_date"></option>
                <option value="month_nth_weekday"></option>
            </select>
        </div>
    </div>
</div>
~~~

#### Блок, задающий конец повторения

Конец повторения определяется контролом выбора со значениями: "NEVER", "ON", "AFTER". Если выбрано "AFTER", появится дополнительное поле ввода количества повторяющихся событий. Если выбрано "ON", появится дополнительный ввод даты:

~~~html
<div class="dhx_form_repeat_ends">
    <div>${loc.repeat_ends}</div>
        <div class="dhx_form_repeat_ends_options">
            <select name="dhx_custom_repeat_ends">
                <option value="NEVER">${loc.repeat_never}</option>
                <option value="AFTER">${loc.repeat_radio_end2}</option>
                <option value="ON">${loc.repeat_on_date}</option>
            </select>
            <div class="dhx_form_repeat_ends_extra">
                <div class="dhx_form_repeat_ends_after dhx_hidden">
                    <label><input name="dhx_form_repeat_ends_after" type="number"
                        min="1">${loc.repeat_text_occurrences_count}</label>
                </div>
                <div class="dhx_form_repeat_ends_on dhx_hidden">
                    <input type="date" name="dhx_form_repeat_ends_ondate">
                </div>
            </div>
        </div>
    </div>
</div>
~~~

### Пример пользовательского блока recurring

Давайте создадим пример пользовательского блока recurring. Представим, что вы хотите убрать типы повторения "monthly" и "yearly" и сделать опцию "no end date" для всех событий (то есть удалить блок для указания конца повторения).

1. Определите разметку пользовательской формы и разместите её где-нибудь на странице
(можно начать с копирования дефолтного шаблона):

~~~html
<!-- note that you need to specify the id of your custom recurring form  -->
<div class="dhx_form_rrule" id="my_recurring_form" style="display:none;">
    <div class="dhx_form_repeat_pattern">
        <select>
            <option value="NEVER">Never</option>
            <option value="DAILY">Every day</option>
            <option value="WEEKLY">Every week</option>
            <option value="WORKDAYS">Every weekday</option>
            <option value="CUSTOM">Custom</option>
        </select>
    </div>
    <div class="dhx_form_repeat_custom">
        <div class="dhx_form_repeat_custom_interval">
            <input name="repeat_interval_value" type="number" min="1">
            <select name="repeat_interval_unit">
                <option value="DAILY">Day</option>
                <option value="WEEKLY">Week</option>
            </select>
        </div>

        <div class="dhx_form_repeat_custom_additional">
            <div class="dhx_form_repeat_custom_week dhx_hidden">
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="MO" />Monday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TU" />Tuesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="WE" />Wednesday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="TH" />Thursday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="FR" />Friday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SA" />Saturday</label>
                <label><input class="dhx_repeat_checkbox" type="checkbox" 
                    name="week_day" value="SU" />Sunday</label>
            </div>
        </div>
    </div>
</div>
~~~

2. Установите параметр **form** секции "recurring" равным id вашей пользовательской формы:

~~~js {3}
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", form: "my_recurring_form" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];
~~~

Получившийся lightbox с пользовательским блоком recurring показан на изображении ниже:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

Следующий фрагмент демонстрирует, как можно реализовать lightbox с упомянутым выше пользовательским блоком recurring:

**Связанный пример** [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)

### Примечания к изменению блока recurring

Пожалуйста, перед началом применения пользовательской конфигурации к блоку recurring в lightbox обратите внимание на следующее:

1. Атрибут **name** задаётся жестко для всех inputs: inputs с разными именами будут проигнорированы.
2. Атрибут **value** фиксирован для всех inputs, кроме тех, которые предполагают прямой ввод.
3. При указании новой формы Scheduler не использует её напрямую и просто воспроизводит вашу HTML-структуру в шаблоне lightbox. Это означает, что все обработчики событий или пользовательские свойства, привязанные к элементам DOM вашей формы в коде, не будут применены к форме в lightbox.
   Если вы хотите привязать обработчик события, нужно либо указывать его как inline HTML-атрибут, либо привязать обработчик к форме, когда она отображается в lightbox, с помощью `addEventListener()`.

:::note
Будьте осторожны: Scheduler не работает с вашей исходной HTML-формой и просто создаёт её копию в шаблоне lightbox.
:::

Например:

- следующая строка будет скопирована в lightbox:

~~~html
<input onclick="handler()">
~~~

- строка ниже не будет скопирована в lightbox:

~~~js
node.addEventListener("click", () => {
    ...
});
~~~

## Пользовательское подтверждающее модальное окно {#customconfirmationmodal}

Когда пользователь редактирует или перетаскивает повторяющееся событие, Scheduler отображает встроенное модальное окно, которое спрашивает, следует ли изменить только данное occurrence, это и последующие события, или всю серию. Вы можете заменить его своим пользовательским интерфейсом, переопределив `scheduler.ext.recurring.confirm`.

~~~js
scheduler.ext.recurring.confirm = (context) => {
    // context содержит:
    // - origin: "lightbox" | "dnd"
    // - occurrence: объект события экземпляра
    // - series: объект родительской повторяющейся серии
    // - labels: { title, ok, cancel, occurrence, following, series }
    // - options: ["occurrence", "following", "series"]
    //
    // Возвращает одну из: "occurrence", "following", "series", или null для отмены.
    // Может вернуть Promise для асинхронного UI.

    return new Promise((resolve) => {
        myCustomDialog.show({
            title: context.labels.title,
            options: context.options,
            onSelect: (choice) => { resolve(choice); },
            onCancel: () => { resolve(null); }
        });
    });
};
~~~

Объект context имеет следующие свойства:

| Свойство | Тип | Описание |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Было ли действие инициировано из lightbox или перетаскивания (drag-and-drop) |
| `occurrence` | `object` | Конкретный экземпляр события, который редактируется |
| `series` | `object` | Родительское повторяющееся событие |
| `labels` | `object` | Локализованные строки: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Доступные варианты, например `["occurrence", "following", "series"]` |

Функция должна вернуть `occurrence`, `following`, `series`, или `null` для отмены. Можно вернуть значение напрямую или как Promise.

Для реализации на React смотрите документацию [React Scheduler](integrations/react/overview.md#customizing-the-recurrence-confirmation-modal).


## Устаревший формат повторяющихся событий

До v7.1 Scheduler использовал собственный формат повторяющихся событий, подробности формата можно найти [здесь](guides/recurring-events-legacy.md).