---
title: "Повторяющиеся события"
sidebar_label: "Повторяющиеся события"
---

# Повторяющиеся события

Повторяющиеся события — это распространённая функция в календарях событий, которая позволяет пользователям создавать события, которые повторяются через заданные интервалы. Начиная с версии v7.1 Scheduler использует формат на основе [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545) для повторяющихся событий.

Эта статья объяснит, как использовать повторяющиеся события в Scheduler и как хранить их в базе данных.

:::note
Вы можете найти описание устаревшего формата повторяющихся событий [здесь](guides/recurring-events-legacy.md)
:::

По умолчанию Scheduler не поддерживает повторяющиеся события. Чтобы обеспечить такую поддержку, нужно включить на странице специальное расширение - **recurring**: 

~~~js
scheduler.plugins({
    recurring: true
});
~~~

После активации поддержки повторяющихся событий окно lightbox начинает выглядеть как на изображении ниже: 

![recurring_lightbox](/img/recurring_lightbox.png)


## Параметры конфигурации

Библиотека предоставляет следующую опцию для настройки повторяющихся событий:

- [repeat_date](api/config/repeat_date.md) - задаёт формат даты для поля 'End by' во вкладке 'recurring' lightbox


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## 'Recurring' lightbox

По умолчанию, после включения расширения повторения, у lightbox появляется ещё один раздел — «Повторение события».
И базовое определение lightbox повторяющегося блока начинается как в примере:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule" },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];
~~~


[Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Описание формата

Повторяющееся событие хранится в базе данных как одна запись, которая содержит все поля обычного события, плюс несколько дополнительных свойств:

1. **start_date** - (_datetime_) определяет дату начала серии
2. **end_date** - (_datetime_) определяет дату окончания серии
3. **rrule** - (_string_) определяет правило повторения
4. **duration** - (_number_) длительность повторяющегося экземпляра
5. **recurring_event_id** - (_string|number_) идентификатор родительской серии, заполняется только для изменённых или удалённых вхождений серии
6. **original_start** - (_datetime_) исходная дата отредактированного экземпляра, заполняется только для изменённых или удалённых вхождения серии
7. **deleted** - (_boolean_) указывает на удалённый экземпляр серии, заполняется только для удалённых вхождения серии

**rrule** следует формату iCalendar, как указано в RFC-5545, с детализацией частоты, интервала и других параметров, управляющих шаблоном повторения.

### Отличия от формата iCalendar

Наш формат отличается от iCalendar двумя ключевыми моментами:

#### Раздельное хранение STDATE и DTEND:

В формате iCalendar даты начала и окончания повторяющейся серии обычно включаются в строку **RRULE** как свойства **STDATE** и **DTEND**.
В нашем формате **stdate** и **dtend** хранятся как отдельные поля. Такое разделение облегчает манипулирование и запрос повторяющихся событий по дате без необходимости разбирать строку **RRULE**.

Вот пример серии повторяющихся событий, которая настроена повторяться каждый понедельник с 1 июня 2026 года по 1 декабря 2027 года:

~~~js
{
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2026-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2027-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
}
~~~

#### Обработка исключений

Исключения, также называемые изменёнными или удалёнными вхождениями серии, хранятся как отдельные записи событий и связаны со своей родительской серией.
Исключения имеют три дополнительных свойства: **recurring_event_id**, **original_start** и **deleted**.
Эти свойства позволяют легко идентифицировать изменённые или удалённые вхождения и их связь с родительской серией.

:::note
Примечание: в отличие от традиционного формата iCalendar исключения (изменённые или удалённые вхождения) не хранятся в свойстве EXDATE в RRULE серии.
:::

Вот пример повторяющейся серии с одним изменённым и одним удалённым вхождением:

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

Повторяющееся событие, запланированное на `2027-06-10 09:00:00`, будет заменено записью `Special Team Meeting`, а событие на `2027-06-17 09:00:00` будет пропущено.

Примечание: **rrule** изменённых или удалённых вхождений игнорируется.

**text**, **start_date**, и **end_date** удалённых экземпляров также игнорируются, и значения этих полей не повлияют на поведение Scheduler.

## Редактирование/удаление конкретного вхождения в серии

Существует возможность удалить или отредактировать конкретное вхождение в серии.

### Важные советы

- Для каждого обновления повторяющегося события создаётся отдельная запись в БД.
- Определённые вхождения ссылаются на родительское событие через свойство **recurring_event_id**.
- После редактирования вхождения в серии поле **original_start** для этого обновления будет хранить дату, когда вхождение должно было произойти, если бы его не редактировали, вместо фактической длительности события.
  Так что если вхождение произошло 27 июля 2027 года в 15:00 и было перенесено на 30 июля 2027 года в 15:00, временная отметка будет отражать первую дату.


### Серверная логика

Помимо дополнительных полей, на стороне сервера необходима специальная логика в контроллере:

- Если удалённый экземпляр был добавлен — ответ сервера должен иметь статус "deleted".
  - Удалённый экземпляр можно определить по непустому значению свойства **deleted**.
- Если серия была изменена, все изменённые и удалённые вхождения серии должны быть удалены.
  - Серия может быть идентифицирована по непустому значению свойства **rrule** и пустому значению свойства **recurring_event_id**.
  - Изменённые вхождения серии — это все записи, в которых **recurring_event_id** совпадает с **id** серии.
- Если событие с непустым **recurring_event_id** было удалено, его нужно обновить на **deleted="true"** вместо удаления.

:::note
Вы можете найти полные примеры кода [здесь](integrations/howtostart-guides.md)
:::

## Пользовательский контроль блока повторения lightbox

Начиная с версии 4.2, Scheduler позволяет задать пользовательский HTML для блока 'recurring' lightbox.

#### Какие настройки можно сделать?

1. Изменить разметку
2. Удалить ненужные элементы (например, тип повторения "yearly")
3. Задать значения по умолчанию для полей ввода (например, чтобы все серии создавались без даты завершения)

### Шаблон по умолчанию для контроля блока повторения lightbox

Шаблон по умолчанию контроля для блока повторения lightbox выглядит следующим кодом, где объект `loc` является объектом локализации (региональные подписи) Scheduler:

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
</div>
~~~

#### Основной контроль повторения

По сути, блок повторения lightbox содержит основной элемент выбора повторения, который имеет 5 типов повторения по умолчанию с следующими вариантами: "Каждый день", "Каждую неделю", "Каждый месяц", "Каждый год", "Каждый рабочий день". Кроме того, он включает вариант "Custom" для создания требуемого типа и вариант "Never" для отключения повторения:

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

Для типа повтора "Custom" существуют специальные единицы повторения: "Day", "Week", "Month", "Year" и поле ввода интервала повторения. Единицы "Week", "Month" и "Year" имеют свои разделы с конкретными опциями повторения (по умолчанию эти разделы скрыты до выбора нужного типа):

~~~html
<div class="dhx_form_repeat_custom ">
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

#### Блок определения конца повторения

Конец повторения определяется с помощью элемента выбора со значениями: "NEVER", "ON", "AFTER". Если выбрано "AFTER", появится дополнительный ввод для количества повторяющихся событий. Если выбрано "ON" — дополнительный ввод даты:

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
~~~

### Пример пользовательского блока повторения

Давайте создадим пример пользовательского блока повторения. Представьте, что вы хотите удалить типы повторения "monthly" и "yearly" и иметь опцию "без даты окончания" для всех событий (то есть удалить блок определения конца повторения). 

1. Определите разметку пользовательской формы и разместите её где-нибудь на странице (можно начать с копирования шаблона по умолчанию):

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

2. Установите параметр **form** для секции "recurring" равным id вашей пользовательской формы:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", focus: true },
    { name: "recurring", type: "recurring", map_to: "rrule", 
        form: "my_recurring_form" }, /*!*/
    { name: "time", type: "time", map_to: "auto", height: 72 },
];
~~~

Получившийся lightbox с пользовательским блоком повторения показан на изображении ниже:

<div style="text-align:center;">![custom_recurring_form](/img/custom_recurring_form.png)</div>

Следующий фрагмент демонстрирует, как можно реализовать lightbox с указанным выше пользовательским блоком повторения:

**Связанный пример** [Lightbox with a custom recurring block](https://snippet.dhtmlx.com/0ha0edlk)
  
### Примечания по изменению блока повторения

Пожалуйста, перед тем как начинать применение пользовательской конфигурации к блоку повторения lightbox, обратите внимание на следующее: 

1. Атрибут **name** задаётся жестко для всех полей ввода: поля ввода с другими именами будут проигнорированы.
2. Атрибут **value** фиксирован для всех полей ввода, за исключением тех, которые подразумевают прямой ввод.
3. Если вы указываете новую форму, Scheduler не использует её напрямую и просто дублирует вашу HTML-структуру в шаблоне lightbox. Это означает, что все обработчики событий или пользовательские свойства, привязанные к DOMElements вашей формы в коде, не будут применяться к форме в lightbox. Чтобы прикрепить обработчик события, вам нужно либо указать его как inline HTML-атрибут, либо привязать обработчик к форме, когда она отображается в lightbox.

:::note
Остерегайтесь, Scheduler не работает с вашей оригинальной HTML-формой и просто создаёт её копию в шаблоне lightbox.
:::


Например:

- следующая строка будет скопирована в lightbox:

~~~html
<input onclick="handler()"> 
~~~

- следующая строка не будет скопирована в lightbox:

~~~js
addEventListener(node, "click", function(){...})
~~~

## Пользовательское подтверждающее модальное окно {#customconfirmationmodal}

Когда пользователь редактирует или перетаскивает повторяющееся событие, планировщик отображает встроенное модальное окно, которое спрашивает, изменить ли только это вхождение, это и следующие события или всю серию. Вы можете заменить его своим интерфейсом, переопределив `scheduler.ext.recurring.confirm`.

~~~js
scheduler.ext.recurring.confirm = function(context) {
  // context содержит:
  // - origin: "lightbox" | "dnd"
  // - occurrence: объект события вхождения
  // - series: объект родительской повторяющейся серии
  // - labels: { title, ok, cancel, occurrence, following, series }
  // - options: ["occurrence", "following", "series"]
  //
  // Вернуть одно из: "occurrence", "following", "series", или null для отмены.
  // Может вернуть Promise для асинхронного UI.

  return new Promise(function(resolve) {
    myCustomDialog.show({
      title: context.labels.title,
      options: context.options,
      onSelect: function(choice) { resolve(choice); },
      onCancel: function() { resolve(null); }
    });
  });
};
~~~

Объект context имеет следующие свойства:

| Свойство | Тип | Описание |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Было ли действие инициировано из lightbox или перетаскивания? |
| `occurrence` | `object` | Конкретное редактируемое вхождение |
| `series` | `object` | Родительская повторяющаяся запись |
| `labels` | `object` | Локализованные строки: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Доступные варианты, например `["occurrence", "following", "series"]` |

Функция должна вернуть `"occurrence"`, `"following"`, `"series"`, или `null` для отмены. Можно вернуть значение напрямую или в виде Promise.

Для реализации на React смотрите [React Scheduler документацию](integrations/react/overview.md#customizingtherecurrenceconfirmationmodal).


## Устаревший формат повторяющихся событий

До v7.1 Scheduler использовал собственный формат повторяющихся событий, подробности формата можно найти [здесь](guides/recurring-events-legacy.md).