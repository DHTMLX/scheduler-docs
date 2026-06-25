---
title: "Повторяющиеся события (до v7.1)"
sidebar_label: "Повторяющиеся события (до v7.1)"
---

# Повторяющиеся события (до v7.1)

*Эта статья описывает устаревший формат повторяющихся событий в DHTMLX Scheduler. Для информации о текущей версии в DHTMLX Scheduler v7.1+ смотрите [здесь](guides/recurring-events.md).*


~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~


После активации поддержки повторяющихся событий лайтбокс начинает выглядеть так, как показано ниже:


![recurring_lightbox_legacy](/img/recurring_lightbox_legacy.png)


## Настройки

Библиотека предоставляет следующие параметры для настройки повторяющихся событий:

- [repeat_date](api/config/repeat_date.md) - устанавливает формат даты в поле 'End by' во всплывающем окне 'recurring'
- [include_end_by](api/config/include_end_by.md) - определяет, должно ли значение даты, указанное в поле 'End by', быть эксклюзивным или инклюзивным
- [recurring_overflow_instances](api/config/recurring_overflow_instances.md) - определяет поведение повторов, которые переходят в следующий месяц
- [repeat_precise](api/config/repeat_precise.md) - предотвращает включение прошедших дней в события с недельной повторяемостью
- [occurrence_timestamp_in_utc](api/config/occurrence_timestamp_in_utc.md) - позволяет работать с повторяющимися событиями независимо от часовых поясов

~~~js
scheduler.config.repeat_date = "%m/%d/%Y";
scheduler.config.include_end_by = true;
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "month");
~~~


[Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Лайтбокс 'Recurring'

По умолчанию, после включения расширения повторяющихся, лайтбокс получает ещё один раздел — «Repeat event».
И базовое определение лайтбокса 'recurring' начинает выглядеть так же, как ниже:

~~~js
[     
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", height:115, type:"recurring", map_to:"rec_type", 
        button:"recurring"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Вы можете добавить любые дополнительные секции, но необходимо сохранить обе секции 'recurring' и 'time'. 
Также обязательно разместить секцию 'time' после секции 'recurring'.


[Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Серверная интеграция 

Повторяющееся событие хранится в базе данных как одна запись, которая содержит все поля обычного события плюс 3 дополнительных: 

1. **rec_type** - (_varchar_) определяет логику повторения. Это поле заполняется автоматически
2. **event_length** - (_long int_) фактическая длительность события в секундах
3. **event_pid** - (_int_) идентификатор родителя серии событий

Итак, ваш бэкенд должен возвращать повторяющиеся поля вместе с обычными полями события, например:

~~~js
{
  "id": 1,
  "start_date": "2027-01-03 10:00:00",
  "end_date": "2027-01-13 00:00:00",
  "text": "some_text",
  "rec_type": "day_1___",
  "event_length": 7200,
  "event_pid": 0
}
~~~

В обычном случае помимо обязательных полей вы можете извлекать любые дополнительные данные из БД.

Однако поля **start_date** и **end_date** несколько изменяют своё значение:


- **start_date** - дата начала первого события в серии в формате 'yyyy-mm-dd hh:mm:ss' (settings_format.md).
- **end_date** - дата окончания последнего события в серии в формате 'yyyy-mm-dd 00:00:00' (settings_format.md).

Например, повторяющееся событие, которое начинается 3 января 2027 года в 10:00, повторяется каждый день и заканчивается 13 января 2027 года в 12:00, 
будет храниться в базе данных следующим образом:


~~~js
id:1,
start_date:"2027-01-03 10:00:00",
end_date:"2027-01-13 00:00:00",
text:"some_text",
details:"",
rec_type:"day_1___",
event_length:"7200",
event_pid:"0" //0 для родительских событий или ID родительских для подпредложений
~~~


Клиентская часть получает данные из поля **rec_type** в виде строки следующего формата:

~~~html
[type]_[count]_[day]_[count2]_[days]#[extra]
~~~

где:

- *type* - тип повторения: 'day','week','month','year'.
- *count* - интервал между событиями в единицах "type".
- *day* и *count2* - определяют день месяца (первый понедельник, третий пятница и т. д.).
- *days* - запятая-разделённый список рабочих дней.
- *extra* - дополнительная информация, которая может использоваться для изменения отображения деталей повторения.

Примеры данных **rec_type**:


- *"day_3___"* - каждые три дня
- *"month _2___"* - каждые два месяца
- *"month_1_1_2_"* - второй понедельник каждого месяца
- *"week_2___1,5"* - понедельник и пятница каждой второй недели 
  
*Двойной или тройной подчеркивание указывает на то, что соответствующие параметры строки опущены*.

## Разбор последовательности на стороне сервера

Повторяющееся событие хранится в базе данных как одна запись, которую Scheduler может разбить на клиентской стороне.
Если вам нужно получить даты отдельных событий на стороне сервера, используйте вспомогательную библиотеку для разбора повторяющихся событий dhtmlxScheduler в ASP.NET/ASP.NET Core/PHP. 

Вы найдёте готовые библиотеки на нашем GitHub:

- [для ASP.NET/ASP.NET Core](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)
- [для PHP 5.4+](https://github.com/DHTMLX/scheduler-helper-php)

## Редактирование/удаление конкретного вхождения в серии 

Есть возможность удалить или редактировать конкретное вхождение в серии. 

### Важные советы

- Для каждого обновления повторяющегося события создаётся отдельная запись в БД.
- Конкретные вхождения ссылаются на родительское событие через свойство **event_pid**.
- Если вы отредактировали вхождение в серии, поле **event_length** для этого обновления будет хранить временную метку даты, когда вхождение должно было произойти, если бы его не редактировали, вместо реальной длительности события. Поэтому, если вхождение произошло 27 июля 2027 года в 15:00 и было перенесено на 30 июля 2027 года 15:00, метка времени отразит первую дату. Метка времени измеряется в секундах с UNIX-эпохи.
- Обратите внимание, что если ваша БД содержит записи об отредактированных вхождениях в серии и вы решите «Редактировать серию» через лайтбокс, все сохранённые записи будут удалены после сохранения. Единая запись, которая останется — это главное повторяющееся событие, его вхождения утратят различия (станут идентичными).

### Пример
Вы — поклонник Олимпийских игр и хотите посмотреть предстоящую Лондонскую Олимпиаду 2027 (*27 июля — 12 августа*) как можно дольше. 
Поэтому вы решаете создать повторяющееся событие, которое *начинается в 17:00* (окончание рабочего дня) и *заканчивается в 23:00* (время, когда вы засыпаете).
Но так как Открытие начинается *только в 19:00*, вы хотите отредактировать первое событие в серии (в этот конкретный день) и задать время 
*с 19:00 до 23:00*. Также вы помните, что 1 августа 2027 года у вас дедлайн и, скорее всего, вы будете дома слишком поздно, чтобы что-то смотреть. 
Поэтому нужно исключить *1 августа 2027 года* из серии.

#### Кратко ваши действия следующие:

1. Создать повторяющееся событие **_(17.00-23.00)_** с 27 июля 2027 года по 12 августа 2027 года.
2. Отредактировать конкретное вхождение на **27 июля 2027 года** — изменить временной диапазон **_с 17.00-23.00 на 19.00-23.00_**.
3. Удалить конкретное вхождение на **1 августа 2027 года** из серии.

В результате в БД должно быть 3 записи, относящиеся к нашему повторяющемуся событию.

#### Что происходит в БД по мере выполнения действий:

Создание повторяющегося события:

![create_a_recurring_event.png](/img/create_a_recurring_event.png)

Редактирование **27 июля 2027 года**:

![edit_a_recurring_event.png](/img/edit_a_recurring_event.png)

Удаление **1 августа 2027 года**: 

![delete_an_occurrence.png](/img/delete_an_occurrence.png)


### Логика на стороне сервера 

Помимо дополнительных полей, на стороне сервера следует добавить специфическую логику:

- Если было вставлено событие с **rec_type==none** — ответ должен содержать статус "deleted".
- Если событие с **rec_type!=none** было обновлено или удалено — все записи с связанным **event_pid** должны быть удалены.
- Если событие с значением **event_pid** было удалено — его нужно обновить с **rec_type==none** вместо удаления.

:::note
Полные примеры кода можно найти [здесь](integrations/howtostart-guides.md)
:::


Реализуйте эту логику в вашем backend-контроллере или сервисе, чтобы серия повторяющихся событий и исключения оставались согласованными.

## Перемещение всей последовательности 

Чтобы дать пользователям возможность перемещать всю последовательность при перетаскивании повторяющихся событий, добавьте следующий код перед инициализацией scheduler:

~~~js
scheduler.attachEvent("onBeforeEventChanged",function(dev){
    let parts = scheduler.getState().drag_id.toString().split("#");
     if (parts.length > 1) {

          let series = this.getEvent(parts[0]);

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

## Пользовательский контроль для блока recurring в лайтбоксе

Начиная с версии 4.2, dhtxmlScheduler позволяет задать свою HTML-форму для блока 'recurring' в лайтбоксе.

#### Какие настройки можно сделать?

1. Изменить разметку формы
2. Удалить ненужные элементы (например, тип повтора 'yearly' и все связанные поля ввода)
3. Задать значения по умолчанию для элементов ввода (например, чтобы все серии создавались без конечной даты. Тогда включите опцию 'no end date' и скрыть
весь блок для указания конца повторения.


### Пример использования

Начнем с примера. Представим, что вы хотите удалить типы повторения 'monthly' и 'yearly' и сделать опцию 'no end date' для всех событий
(то есть убрать блок для указания конца повторения). 

1. Определите разметку своей пользовательской формы и разместите её на странице (вы можете начать с копирования шаблона по умолчанию, который можно найти в <b>'schedulersourceslocalerecurring'</b>):
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
      <div style="display:none;" id="dhx_repeat_day">
        <input type="hidden" name="day_type" value="d"/>
        <input type="hidden" name="day_count" value="1" />
      </div>
      <div style="display:none;" id="dhx_repeat_week">
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
2. Установите параметр 'form' для секции 'recurring' равным идентификатору вашей пользовательской формы: 
~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring", 
      form:"my_recurring_form"},/*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


<div style="text-align:center;">![custom_recurring_form_legacy](/img/custom_recurring_form_legacy.png)</div>

### Основные элементы

Вы можете найти стандартную HTML-структуру блока recurring лайтбокса для различных языков в директории <b>'schedulersourceslocalerecurring'</b>.

Например, для английской локали вам нужно увидеть файл <b>'schedulersourceslocalerecurringrepeat_template_en.htm'</b>.

В основном, блок повторяющегося лайтбокса содержит 3 группы элементов управления:

1) Элементы управления выбором типа повторения. Эти поля имеют имя 'repeat' и одно из следующих значений: 'daily', 'weekly', 'monthly', 'yearly'. Форме должно быть как минимум одно поле ввода 'repeat' с указанным значением. Можно использовать радиокнопки, выпадающие списки или задать тип по умолчанию в скрытом поле.

Рассмотрим следующие примеры — каждый из них является допустимым способом выбора типа повторения в форме. 

- Радиокнопки

~~~html
<label><input type="radio" name="repeat" value="day" />Daily</label>


<label><input type="radio" name="repeat" value="week"/>Weekly</label>


<label><input type="radio" name="repeat" value="month" />Monthly</label>


<label><input type="radio" name="repeat" value="year" />Yearly</label>
~~~

- Select input, без опций 'Monthly' и 'Yearly':

~~~html
<select name="repeat">
  <option value="day">Daily</option>
  <option value="week">Weekly</option>
</select>
~~~

- Скрытое поле (лайтбокс создаст только серию 'Daily'):

~~~html
<input type="hidden" name="repeat" value="day" />
~~~

2) Блок для настройки повторения в зависимости от типа повторения. Например, для типа повторения 'Daily' блок примет следующую структуру:

~~~html
<div class="dhx_repeat_center">
   <div style="display:none;" id="dhx_repeat_day">
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

Заметьте, что разметка, которая относится к конкретному типу повторения, может быть обернута в div с `id` в формате `dhx_repeat_<repeat type>`, например "dhx_repeat_day". В таком случае она будет отображаться только при выборе соответствующего типа повторения.

3) Элементы управления указанием конца повторения. Конец повторения определяется по полю ввода с именем 'end'.


Возможные значения: <b>'no'</b>, <b>'date_of_end'</b>, <b>'occurences_count'</b>.

Как и в контролах 'repeat', в форме должно быть как минимум одно поле данного типа.

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

Дата для режима <b>'date_of_end'</b> должна быть задана в поле ввода с именем 'date_of_end'. То же работает и для режима 
<b>'occurences_count'</b>, который берет количество повторений из поля ввода с именем 'occurences_count'.


Вы можете удалить любой тип или предвизуализировать его в скрытом поле:

~~~html
<input type="hidden" name="end" value="date_of_end" />
<input type="hidden" name="date_of_end" value="01.01.2027" />
~~~
  
### Примечания по изменению блока повторения

Пожалуйста, перед тем как начинать применять пользовательскую конфигурацию к блоку recurring в лайтбоксе, обратите внимание на следующее: 

1. Атрибут 'name' фиксирован за все поля — поля с другими именами будут проигнорированы.
2. Атрибут 'value' фиксирован для всех полей ввода, кроме тех, которые предполагают прямой ввод.
3. Когда вы указываете новую форму — dhtmlxScheduler не использует её напрямую и просто повторяет вашу HTML-структуру в шаблон лайтбокса.
Это означает, что все обработчики событий или пользовательские свойства, прикреплённые к DOM-элементам вашей формы из кода, не будут применяться к форме в лайтбоксе.
Если вы хотите привязать обработчики событий, вам нужно либо задать это как inline HTML-атрибут, либо прикрепить обработчик к форме, когда она отображается в лайтбоксе.

:::note
Осторожно, dhtmlxScheduler не работает с вашей оригинальной HTML-формой и просто создаёт её копию в шаблоне лайтбокса.
:::


Например:

- следующая строка будет скопирована в лайтбокс:

~~~html
<input onclick="handler()"> 
~~~

- следующая строка не будет скопирована в лайтбокс:

~~~js
addEventListener(node, "click", function(){...})
~~~
