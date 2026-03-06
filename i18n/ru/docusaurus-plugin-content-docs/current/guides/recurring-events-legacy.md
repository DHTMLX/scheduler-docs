---
title: "Повторяющиеся события (до v7.1)"
sidebar_label: "Повторяющиеся события (до v7.1)"
---

# Повторяющиеся события (до v7.1)

*Эта статья описывает устаревший формат повторяющихся событий в DHTMLX Scheduler. Для информации о текущей версии в DHTMLX Scheduler v7.1+ смотрите [здесь](guides/recurring-events.md).*

По умолчанию Scheduler не поддерживает повторяющиеся события. Чтобы добавить эту функциональность, необходимо включить специальное расширение **recurring_legacy** на вашей странице.

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

После включения поддержки повторяющихся событий в лайтбоксе появится дополнительный раздел, как показано ниже:

![recurring_lightbox](/img/recurring_lightbox.png)

## Опции конфигурации

Библиотека предоставляет несколько опций для настройки повторяющихся событий:


- [repeat_date](api/config/repeat_date.md) - управляет форматом даты для поля 'End by' в тултипе 'recurring' лайтбокса
- [include_end_by](api/config/include_end_by.md) - задаёт, включается ли дата в поле 'End by'
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - управляет обработкой повторов, выходящих за пределы месяца
- [repeat_precise](api/config/repeat_precise.md) - предотвращает включение прошедших дат для событий с недельной периодичностью
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - позволяет работать с повторяющимися событиями вне зависимости от часового пояса


~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2019, 7, 5), "month");
~~~


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Лайтбокс 'Recurring'

После включения расширения для повторяющихся событий в лайтбоксе появляется дополнительный раздел с названием "Repeat event". По умолчанию конфигурация лайтбокса для повторяющихся событий выглядит так:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Вы можете добавить дополнительные секции, если это необходимо, но секции "recurring" и "time" должны присутствовать обязательно. Кроме того, секция "time" всегда должна идти **после** секции "recurring".


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Интеграция на сервере 

Повторяющееся событие хранится в базе данных как одна запись, которая содержит все стандартные поля события плюс три дополнительных:

1. **rec_type** - (_varchar_) определяет шаблон повторения; это поле заполняется автоматически
2. **event_length** - (_long int_) длительность события в секундах
3. **event_pid** - (_int_) идентификатор родительского события для серии

Типичный запрос к коннектору может выглядеть так:

~~~php
$scheduler->render_table("events_rec","event_id",
"start_date,end_date,text,rec_type,event_pid,event_length");
~~~

Помимо этих обязательных полей, вы можете получать любые другие данные из вашей базы.

Обратите внимание, что значения **start_date** и **end_date** имеют здесь немного иное значение:

- **start_date** - дата и время начала первого события в серии, в формате 'yyyy-mm-dd hh:mm:ss' (см. [Спецификация формата даты](guides/settings-format.md)).
- **end_date** - дата окончания последнего события в серии, в формате 'yyyy-mm-dd 00:00:00' (см. [Спецификация формата даты](guides/settings-format.md)).

Например, повторяющееся событие, начинающееся 3 января 2019 года в 10:00, повторяющееся ежедневно и заканчивающееся 13 января 2019 года в 12:00, будет храниться так:

~~~js
id:1,
start_date:"2019-01-03 10:00:00",
end_date:"2019-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" // 0 для родительских событий или ID родителя для под-событий
~~~

На клиентской стороне поле **rec_type** содержит строку в формате:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

где:

- *type* - тип повторения: 'day','week','month','year'.
- *count* - интервал между событиями в указанных единицах.
- *day* и *count2* - определяют конкретный день месяца (например, первый понедельник, третья пятница).
- *days* - список затронутых дней недели через запятую.
- *extra* - дополнительная информация, которая может влиять на отображение повторяющихся деталей.

Примеры значений **rec_type**:

- *"day_3___"* - каждые три дня
- *"month_2___"* - каждые два месяца
- *"month_1_1_2_"* - второй понедельник каждого месяца
- *"week_2___1,5"* - понедельник и пятница каждую вторую неделю

*Примечание: двойное или тройное подчёркивание означает, что параметры пропущены.*

## Парсинг серий на сервере

Повторяющиеся события хранятся в базе как отдельные записи, которые Scheduler может разбивать на клиенте. Если вам нужно получить отдельные даты повторов на сервере, доступны вспомогательные библиотеки для разбора повторяющихся событий для ASP.NET/ASP.NET Core и PHP.

Эти библиотеки доступны на GitHub:

- [ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## Редактирование/удаление отдельного повтора в серии 

Можно редактировать или удалять отдельные повторы внутри серии повторяющихся событий.

### Важные замечания

- Каждое обновление повторяющегося события создаёт отдельную запись в базе данных.
- Индивидуальные повторы ссылаются на родительское событие через свойство **event_pid**.
- При редактировании повтора поле **event_length** хранит временную метку, когда повтор должен был произойти изначально, если бы не был изменён, а не фактическую длительность события. Например, если повтор, изначально запланированный на 27 июля 2019 в 15:00, перенесён на 30 июля 2019 в 15:00, временная метка будет отражать 27 июля 2019 в 15:00. Это значение хранится в секундах с начала эпохи UNIX.
- Если в вашей базе есть отредактированные повторы и вы выбираете 'Edit series' через лайтбокс, после сохранения все индивидуальные повторы будут удалены. Останется только основная запись повторяющегося события, а индивидуальные повторы потеряют свои уникальные изменения.

### Пример сценария

Представьте, что вы поклонник Олимпийских игр и хотите смотреть Лондонскую Олимпиаду 2012 (*27 июля - 12 августа*) как можно больше. Вы создаёте повторяющееся событие с 17:00 (конец рабочего дня) до 23:00 (отбой). Однако, поскольку церемония открытия начинается в 19:00, вы хотите изменить первый повтор на время с 19:00 до 23:00. Также вы знаете, что 1 августа 2012 у вас дедлайн, и, вероятно, вы ничего не посмотрите, поэтому хотите удалить повтор этого дня из серии.

#### Краткое описание действий:

1. Создать повторяющееся событие **(17:00-23:00)** с **27 июля 2012** по **12 августа 2012**.
2. Изменить повтор **27 июля 2012** на **19:00-23:00**.
3. Удалить повтор **1 августа 2012** из серии.

В результате в базе будет 3 записи, относящиеся к повторяющемуся событию.

#### Что происходит в базе шаг за шагом:

Создание повторяющегося события:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

Редактирование **27 июля 2012**:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

Удаление **1 августа 2012**: 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)

### Логика на сервере 

Помимо дополнительных полей, серверный контроллер должен реализовать определённую логику:

- Когда вставляется событие с **rec_type == none**, ответ должен содержать статус "deleted".
- Когда событие с **rec_type != none** обновляется или удаляется, все записи с соответствующим **event_pid** должны быть удалены.
- Когда удаляется событие с ненулевым **event_pid**, его нужно обновить, установив **rec_type == none**, вместо удаления.

:::note
Полные примеры кода доступны [здесь](integrations/howtostart-guides.md)
:::

Если вы используете [PHP Connector](https://github.com/DHTMLX/connector-php), серверный код может выглядеть так:

~~~php
function delete_related($action){
    global $scheduler;
    
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    $pid = $action->get_value("event_pid");
    // При изменении или удалении серии удаляем все связанные события
    if (($status == "deleted" || $status == "updated") && $type != ""){
        $scheduler->sql->query("DELETE FROM events_rec WHERE 
        event_pid='" . $scheduler->sql->escape($action->get_id()) . "'");
    }
    if ($status == "deleted" && $pid != 0){
        $scheduler->sql->query("UPDATE events_rec SET rec_type='none' WHERE 
        event_id='" . $scheduler->sql->escape($action->get_id()) . "'");
        $action->success();
    }
}
function insert_related($action){
    $status = $action->get_status();
    $type = $action->get_value("rec_type");
    if ($status == "inserted" && $type == "none")
        $action->set_status("deleted");
}

$scheduler->event->attach("beforeProcessing","delete_related");
$scheduler->event->attach("afterProcessing","insert_related");
~~~

## Перетаскивание всей последовательности 

Чтобы разрешить пользователю перетаскивать всю последовательность повторяющихся событий, добавьте следующий код перед инициализацией Scheduler:

~~~js
scheduler.attachEvent("onBeforeEventChanged", function(dev){
    var parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          var series = this.getEvent(parts[0]);

          series.start_date.setHours(dev.start_date.getHours());
          series.start_date.setMinutes(dev.start_date.getMinutes());
          series.event_length = (dev.end_date - dev.start_date) / 1000;

          setTimeout(function(){
               scheduler.addEvent(series);
          }, 1);

          return false;
     }
     return true;
});
~~~

## Кастомизация блока повторов в лайтбоксе

Начиная с версии 4.2, dhtmlxScheduler позволяет настраивать HTML-форму, используемую в блоке 'recurring' лайтбокса.

#### Что можно настроить?

1. Изменять разметку формы
2. Удалять ненужные элементы (например, тип повторения 'yearly' и связанные с ним поля)
3. Задавать значения по умолчанию для полей (например, автоматически отмечать опцию 'no end date' и скрывать блок окончания повторения, чтобы все серии создавались без даты окончания)

### Пример использования

Давайте начнем с примера. Предположим, вы хотите убрать опции повторения 'monthly' и 'yearly', а также оставить выбор "без даты окончания" доступным для всех событий (то есть убрать секцию установки окончания повторения).

1. Сначала определите разметку для пользовательской формы и разместите её где-нибудь на вашей странице (вы можете начать с копирования стандартного шаблона из 'schedulersourceslocalerecurring'):
~~~html
<div class="dhx_form_repeat" id="my_recurring_form"> /*!*/
  <form>
    <div>
      <select name="repeat">
        <option value="day">Ежедневно</option>
        <option value="week">Еженедельно</option>
      </select>
    </div>
    <div>
      <div id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div id="dhx_repeat_week">
        Повторять каждую неделю по дням:


       <label><input type="checkbox" name="week_day" value="1" />Понедельник</label>
       <label><input type="checkbox" name="week_day" value="2" />Вторник</label>
       <label><input type="checkbox" name="week_day" value="3" />Среда</label>
       <label><input type="checkbox" name="week_day" value="4" />Четверг</label>
       <label><input type="checkbox" name="week_day" value="5" />Пятница</label>
       <label><input type="checkbox" name="week_day" value="6" />Суббота</label>
       <label><input type="checkbox" name="week_day" value="0" />Воскресенье</label>
       <input type="hidden" name="week_count" value="1" />
      </div>
    </div>

    <input type="hidden" value="no" name="end">
  </form>
</div>
~~~
2. Далее, укажите параметру 'form' секции 'recurring' ID вашей пользовательской формы: 
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

Стандартную HTML-разметку блока повторения lightbox для разных языков можно найти в папке <b>'schedulersourceslocalerecurring'</b>.


Например, для английской локали используйте файл <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>.

В целом, блок повторения в lightbox состоит из 3 основных групп элементов управления:

1) Элементы для выбора типа повторения. Эти input-элементы должны иметь имя 'repeat' и одно из следующих значений: 'daily', 'weekly', 'monthly', 'yearly'.
Ваша форма должна содержать хотя бы один input с именем 'repeat' и значением. Можно использовать radio-кнопки, select или даже скрытый input для установки значения по умолчанию.

Вот несколько допустимых примеров выбора типа повторения в форме:

- Radio-кнопки

~~~html
<label><input type="radio" name="repeat" value="day" />Ежедневно</label>


<label><input type="radio" name="repeat" value="week"/>Еженедельно</label>


<label><input type="radio" name="repeat" value="month" />Ежемесячно</label>


<label><input type="radio" name="repeat" value="year" />Ежегодно</label>
~~~

- Select без опций 'Monthly' и 'Yearly':

~~~html
<select name="repeat">
  <option value="day">Ежедневно</option>
  <option value="week">Еженедельно</option>
</select>
~~~

- Скрытый input (lightbox будет создавать только ежедневные серии):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Секция для настройки повторения в зависимости от выбранного типа. Например, для типа 'Daily' разметка выглядит так:

~~~html
<div class="dhx_repeat_center">
   <div id="dhx_repeat_day">
     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" value="d"/>Каждый
     </label>
       <input class="dhx_repeat_text" type="text" 
               name="day_count" value="1" />день


     <label>
       <input class="dhx_repeat_radio" type="radio" 
               name="day_type" checked value="w"/>Каждый рабочий день
     </label>
  </div>
...
</div>
         
~~~

Обратите внимание, что разметку, относящуюся к определённому типу повторения, можно обернуть в div с <b>id</b> в формате <b>"dhx_repeat_&lt;repeat type&gt;"</b>, например "dhx_repeat_day".
В этом случае она будет отображаться только при выборе соответствующего типа повторения.

3) Элементы для задания окончания повторения. Это определяется input-элементами с именем 'end'. 


Возможные значения: <b>'no'</b>, <b>'date_of_end'</b> и <b>'occurences_count'</b>.

Так же, как и с элементами 'repeat', ваша форма должна содержать хотя бы один input с этим именем.

~~~html
<div class="dhx_repeat_right">
  <label>
    <input type="radio" name="end" value="no" checked/>Без даты окончания
  </label>


  <label>
    <input type="radio" name="end" value="date_of_end" />После</label>
    <input type="text" name="date_of_end" />
  


  <label>
    <input type="radio" name="end" value="occurences_count" />После</label>
    <input type="text" name="occurences_count" value="1" />Повторений
</div>
~~~

Дата для опции <b>'date_of_end'</b> должна вводиться в input с именем 'date_of_end'. Аналогично, опция <b>'occurences_count'</b> использует количество повторений из input с именем 'occurences_count'.


Можно удалить любую опцию или установить её по умолчанию с помощью скрытого input:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2016" />
~~~
  
### Примечания по кастомизации блока повторения

Перед тем как настраивать блок повторения lightbox, учтите следующие моменты:

1. Атрибут 'name' фиксирован для всех input-элементов - элементы с другими именами будут проигнорированы.
2. Атрибут 'value' фиксирован для всех input-элементов, кроме тех, где требуется непосредственный ввод пользователя.
3. При передаче новой формы dhtmlxScheduler не использует её напрямую, а копирует вашу HTML-структуру внутрь шаблона lightbox.
Это значит, что любые обработчики событий или пользовательские свойства, привязанные к исходным DOM-элементам формы, не будут перенесены внутрь lightbox.
Если вы хотите добавить обработчики событий, делайте это либо с помощью inline-атрибутов в HTML, либо добавляйте их к форме в момент отображения lightbox.

:::note
Имейте в виду, что dhtmlxScheduler не работает напрямую с вашей исходной HTML-формой, а создает её копию внутри шаблона lightbox.
:::

Например:

- Эта строка будет скопирована в lightbox:

~~~html
<input onclick="handler()"> 
~~~

- А вот так - не будет:

~~~js
addEventListener(node, "click", function(){...})
~~~
