---
title: "Представление Agenda"
sidebar_label: "Представление Agenda"
---

# Представление Agenda 

*Если вы работаете с dhtmlxScheduler версии 6.0 или ниже, подробности смотрите [здесь](views/agenda-legacy.md).*

Представление Agenda отображает список предстоящих событий в понятном и организованном виде.

![agenda_view](/img/agenda_view.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
По умолчанию список слева начинает отображать события с первого дня текущего месяца. Чтобы изменить это поведение, вы можете использовать свойства [agenda_start](api/config/agenda_start.md) и [agenda_end](api/config/agenda_end.md) или переопределить функции **scheduler.date.agenda_start** и **scheduler.date.agenda_end**.
:::

## Инициализация

Чтобы добавить представление Agenda в ваш планировщик, выполните следующие шаги:

1) Включите расширение Agenda на вашей странице:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) Добавьте вкладку представления в HTML планировщика:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="agenda"></div>
    </div>
    ...    
</div>
~~~
  
3) Задайте подпись для вкладки:

~~~js
//'agenda_tab' относится к div вкладки. По умолчанию подпись — 'Agenda'
scheduler.locale.labels.agenda_tab = "Моя Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## Особенности интерфейса 

- Двойной клик по пустой ячейке списка создаёт новое событие.
- Двойной клик по строке события открывает lightbox для редактирования или удаления события.

## Советы по локализации

В представлении Agenda используются две метки в локали:

- **scheduler.locale.labels.agenda_tab** - подпись для вкладки представления
- **scheduler.locale.labels.full_day** - подпись для событий на весь день или на несколько дней

Обычно первая метка задаётся при добавлении вкладки, а вторую стоит изменять только если ваше приложение использует язык, отличный от английского.

## Кнопки Следующий/Предыдущий/Сегодня 

По умолчанию представление Agenda показывает события за один месяц. Кнопки Следующий, Предыдущий и Сегодня позволяют переключаться между месяцами. Вы можете изменить отображаемый диапазон, переопределив функции **scheduler.date.agenda_start()** и **scheduler.date.add_agenda()**.

**scheduler.date.agenda_start(date)** возвращает начальную дату отображаемого интервала на основе переданной даты. По умолчанию возвращается первый день месяца.

Вы можете переопределить эти функции, например, чтобы отображать только одну неделю:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.week_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "week"); 
}; 
~~~

Это ограничит отображаемый диапазон одной неделей.

## Задание диапазона отображаемых дат

Вы также можете зафиксировать отображаемый диапазон, установив свойства [agenda_end](api/config/agenda_end.md) и [agenda_start](api/config/agenda_start.md):

~~~js
scheduler.config.agenda_start = new Date(2027, 5, 1); 
scheduler.config.agenda_end = new Date(2027, 6, 1);   
~~~

## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны представления Agenda](views/agenda-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Скины](guides/skins.md)
- [Локализация](guides/localization.md)
