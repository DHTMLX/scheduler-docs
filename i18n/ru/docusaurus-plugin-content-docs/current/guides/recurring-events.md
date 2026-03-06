---
title: "Повторяющиеся события"
sidebar_label: "Повторяющиеся события"
---

# Повторяющиеся события

Повторяющиеся события - это удобная функция в календарных приложениях, позволяющая пользователям создавать события, которые повторяются с выбранной периодичностью. Начиная с версии 7.1, Scheduler поддерживает стандартный формат повторяющихся событий согласно [RFC-5545](https://datatracker.ietf.org/doc/html/rfc5545).

В этом руководстве описано, как работать с повторяющимися событиями в Scheduler и как сохранять их в базе данных.

:::note
Вы можете ознакомиться с описанием старого формата повторяющихся событий [здесь](guides/recurring-events-legacy.md)
:::

По умолчанию повторяющиеся события в Scheduler не включены. Чтобы добавить эту возможность, необходимо активировать специальное расширение на странице - плагин **recurring**:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

После включения повторяющихся событий в интерфейсе lightbox появится дополнительный раздел, как показано ниже:

![recurring_lightbox](/img/recurring_lightbox.png)

## Параметры конфигурации {#configurationoptions}

Библиотека предоставляет следующую настройку для работы с повторяющимися событиями:

- [repeat_date](api/config/repeat_date.md) - определяет формат даты, используемый в поле 'End by' (Дата окончания) внутри блока 'recurring' в lightbox.

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Lightbox с блоком 'Recurring' {#recurringlightbox}
------------------------------------------ 

После активации расширения recurring в lightbox появляется дополнительный раздел "Repeat event". Стандартная конфигурация блока 'recurring' в lightbox выглядит так:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Вы можете добавлять другие разделы, но обязательно оставьте разделы "recurring" и "time". Кроме того, раздел "time" всегда должен идти **после** "recurring".


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Описание формата {#formatdescription}

Повторяющееся событие сохраняется в базе данных как одна запись, которая содержит все стандартные поля события плюс дополнительные свойства:

1. **start_date** - (_datetime_) дата начала серии
2. **end_date** - (_datetime_) дата окончания серии
3. **rrule** - (_string_) определяет правило повторения
4. **duration** - (_number_) длительность каждого экземпляра события
5. **recurring_event_id** - (_string|number_) ID родительской серии; указывается только для изменённых или удалённых экземпляров
6. **original_start** - (_datetime_) исходная дата изменённого экземпляра; указывается только для изменённых или удалённых экземпляров
7. **deleted** - (_boolean_) пометка о том, что экземпляр удалён; указывается только для удалённых экземпляров

Свойство **rrule** соответствует формату iCalendar, описанному в RFC-5545, и определяет частоту, интервал и другие параметры повторения.

### Отличия от формата iCalendar

Есть два основных отличия нашего формата от формата iCalendar:

#### Раздельное хранение STDATE и DTEND

В iCalendar обычно даты начала и окончания серии повторяющихся событий включаются в строку **RRULE** как свойства **STDATE** и **DTEND**. В нашем формате **start_date** и **end_date** хранятся как отдельные поля. Это упрощает работу с повторяющимися событиями и позволяет легко выполнять выборки по дате без необходимости парсить строку **RRULE**.

Пример повторяющейся серии событий, повторяющейся каждый понедельник с 1 июня 2024 по 1 декабря 2024:

~~~
{
  "id": 1,
  "text": "Weekly Team Meeting",
  "start_date": "2024-06-03 09:00:00",
  "duration": 3600,
  "end_date": "2024-12-02 10:00:00",
  "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
  "recurring_event_id": null,
  "original_start": null
}
~~~

#### Обработка исключений

Исключения - то есть изменённые или удалённые экземпляры - хранятся как отдельные записи, связанные с родительской серией. Такие записи содержат три дополнительных свойства: **recurring_event_id**, **original_start** и **deleted**. Они позволяют определить, какие экземпляры были изменены или удалены, и как они связаны с основной серией.

:::note
В отличие от стандартного формата iCalendar, исключения (изменённые или удалённые экземпляры) **не** хранятся в свойстве **EXDATE** строки **RRULE**.
:::

Пример серии повторяющихся событий с одним изменённым и одним удалённым экземпляром:
~~~
[
  {
    "id": 1,
    "text": "Weekly Team Meeting",
    "start_date": "2024-06-03 09:00:00",
    "duration": 3600,
    "end_date": "2024-12-02 10:00:00",
    "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO",
    "recurring_event_id": null,
    "original_start": null
  },
  {
    "id": 2,
    "text": "Special Team Meeting",
    "start_date": "2024-06-10 09:00:00",
    "end_date": "2024-06-10 11:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-10 09:00:00"
  },
  {
    "id": 3,
    "text": "Deleted Team Meeting",
    "start_date": "2024-06-17 09:00:00",
    "end_date": "2024-06-17 10:00:00",
    "rrule": null,
    "recurring_event_id": 1,
    "original_start": "2024-06-17 09:00:00",
    "deleted": true
  }
]
~~~

Событие, запланированное на `2024-06-10 09:00:00`, заменено записью `Special Team Meeting`, а событие на `2024-06-17 09:00:00` пропущено.

Обратите внимание, что свойство **rrule** для изменённых или удалённых экземпляров игнорируется.

Также поля **text**, **start_date** и **end_date** для удалённых экземпляров не влияют на поведение Scheduler.


## Редактирование/удаление отдельного экземпляра в серии {#editingdeletingacertainoccurrenceintheseries}

Вы можете удалить или отредактировать отдельные экземпляры в серии повторяющихся событий.

### Важные рекомендации

- Каждое изменение повторяющегося события приводит к созданию новой записи в базе данных.
- Отдельные экземпляры связаны с основной серией через свойство **recurring_event_id**.
- При редактировании экземпляра поле **original_start** хранит дату, на которую изначально был запланирован экземпляр, а не новую дату. Например, если экземпляр, запланированный на 27 июля 2024 в 15:00, перенесён на 30 июля 2024 в 15:00, **original_start** всё равно будет 27 июля 2024 в 15:00.


### Логика на сервере

Помимо дополнительных полей, серверный контроллер должен реализовать следующую логику:

- При добавлении удалённого экземпляра ответ сервера должен содержать статус "deleted".
    - Удалённый экземпляр определяется по непустому свойству **deleted**.
- При изменении серии все связанные с ней изменённые и удалённые экземпляры должны быть удалены.
    - Серия определяется по непустому **rrule** и пустому **recurring_event_id**.
    - Изменённые экземпляры - это все записи, у которых **recurring_event_id** совпадает с **id** серии.
- Если событие с непустым **recurring_event_id** удаляется, оно должно быть обновлено путем установки **deleted="true**" вместо физического удаления.

:::note
Полные примеры кода доступны [здесь](integrations/howtostart-guides.md)
:::


## Кастомизация блока recurring в lightbox {#customcontrolforthelightboxsrecurringblock}

Начиная с версии 4.2, dhtmlxScheduler позволяет определять собственную HTML-форму для секции 'recurring' в lightbox.

#### Какие настройки доступны?

1. Изменение разметки формы.
2. Удаление ненужных элементов (например, опции ежегодного повторения и связанных полей).
3. Установка значений по умолчанию для полей ввода (например, всегда выбирать вариант "без даты окончания" и скрывать блок для указания конца повторения).

### Пример использования

Пример, в котором опции ежемесячного и ежегодного повторения удалены, а вариант "без даты окончания" выбран по умолчанию (блок конца повторения скрыт):

1. Определите разметку вашей формы где-либо на странице (можно начать с копирования шаблона по умолчанию из 'schedulersourceslocalerecurring'):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Repeat every week next days:


       <label><input type="checkbox" name="week_day" value="1" />Monday</label>
       <label><input type="checkbox" name="week_day" value="2" />Tuesday</label>
       <label><input type="checkbox" name="week_day" value="3" />Wednesday</label>
       <label><input type="checkbox" name="week_day" value="4" />Thursday</label>
       <label><input type="checkbox" name="week_day" value="5" />Friday</label>
       <label><input type="checkbox" name="week_day" value="6" />Saturday</label>
       <label><input type="checkbox" name="week_day" value="0" />Sunday</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. Укажите параметр 'form' для секции 'recurring' с ID вашей формы: 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

<div>![custom_recurring_form](/img/custom_recurring_form.png)</div>


### Основные части

Стандартная HTML-структура блока повторяющихся событий (recurring block) для lightbox на разных языках находится в директории <b>'schedulersourceslocalerecurring'</b>.


Например, для английской локализации используется файл <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>.

Блок повторяющихся событий в lightbox обычно включает 3 группы элементов управления:

1) Элементы управления для выбора типа повторения. Эти input-элементы имеют имя 'repeat' и одно из следующих значений: 'daily', 'weekly', 'monthly', 'yearly'. 
В форме должен присутствовать хотя бы один input с именем 'repeat' и каким-либо значением. Вы можете использовать radio-кнопки, выпадающие списки (select) или задать тип по умолчанию с помощью скрытого input.

Примеры корректного выбора типа повторения в форме:

- Radio-кнопки:

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select-список, без опций 'Monthly' и 'Yearly':

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Скрытый input (создает только серию событий "Daily"):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Секция для настройки параметров повторения в зависимости от выбранного типа. Например, блок для типа "Daily" выглядит так:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Every
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />day


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Every workday
     </label>
  </div>
...
</div>         
~~~

Обратите внимание, что разметка, относящаяся к определенному типу повторения, может быть обернута в div с <b>id</b> формата <b>"dhx_repeat_&lt;repeat type&gt;"</b>, например, "dhx_repeat_day". 
Этот блок будет отображаться только при выборе соответствующего типа повторения.

3) Элементы управления для указания, когда завершать повторение. Input для этого имеет имя 'end'. 


Возможные значения: <b>'no'</b>, <b>'date_of_end'</b> и <b>'occurences_count'</b>.

Как и для элементов 'repeat', в форме должен быть хотя бы один input с этим именем.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>No end date
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />After</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />After</label>
    <input type="text" name="occurences_count" value="1" />Occurrences
</div>
~~~

Для режима <b>'date_of_end'</b> дата указывается в input с именем 'date_of_end'. Аналогично, для режима <b>'occurences_count'</b> количество повторений указывается в input с именем 'occurences_count'. 


Вы можете удалить любой тип повторения или задать его заранее с помощью скрытого input:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2024" />
~~~
  
### Примечания по изменению блока повторения

Перед кастомизацией блока повторения в lightbox, обратите внимание на следующие моменты:

1. Атрибут 'name' фиксирован для всех input-элементов; input с другими именами будут проигнорированы. 
2. Атрибут 'value' фиксирован для всех input, кроме тех, которые предназначены для непосредственного ввода пользователем. 
3. Если вы предоставляете новую форму, dhtmlxScheduler не использует её напрямую, а копирует вашу HTML-структуру внутрь шаблона lightbox. 
Это значит, что любые обработчики событий или пользовательские свойства, привязанные к DOM-элементам вашей формы, не будут работать в lightbox. 
Чтобы добавить обработчики событий, их нужно указывать как inline-атрибуты HTML или навешивать при отображении формы в lightbox.

:::note
Имейте в виду, что dhtmlxScheduler не работает с вашей исходной HTML-формой, а создает её копию внутри шаблона lightbox.
:::

Например:

- Эта строка будет скопирована в lightbox:

~~~html
<input onclick="handler()"> 
~~~

- А эта - нет:

~~~js
addEventListener(node, "click", function(){...})
~~~

## Устаревший формат повторяющихся событий {#legacyformatofrecurringevents}

До версии 7.1 Scheduler использовал собственный формат для повторяющихся событий. Подробнее об этом формате можно узнать [здесь](guides/recurring-events-legacy.md).
