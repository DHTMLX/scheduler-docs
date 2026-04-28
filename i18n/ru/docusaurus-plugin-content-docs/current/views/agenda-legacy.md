---
title: "Agenda View (v6.0)"
sidebar_label: "Agenda View (v6.0)"
---

# Agenda View (v6.0)

*Эта статья относится к dhtmlxScheduler версии 6.0 и ниже. Для dhtmlxScheduler 7.0 и выше смотрите детали [здесь](views/agenda.md).*

Вид Gantt "Agenda" отображает список предстоящих событий.

![agenda_view_old](/img/agenda_view_old.png)


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


:::note
По умолчанию левая часть списка в этом виде отображает события, начиная с текущей даты. Чтобы изменить это поведение, используйте свойства [agenda_start](api/config/agenda_start.md) и [agenda_end](api/config/agenda_end.md).
:::

## Инициализация

Чтобы добавить вид "Agenda" в планировщик, выполните следующие шаги:

1) Включите расширение Agenda на странице:

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~
  
2) Добавьте вкладку этого вида в разметку планировщика:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="agenda_tab"></div>
    </div>
    ...    
</div>
~~~
  
3) Задайте название для вкладки:

~~~js
//'agenda_tab' — это имя div. По умолчанию заголовок — 'Agenda' 
scheduler.locale.labels.agenda_tab = "Моя Agenda"; 
~~~


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## GUI: детали 

- Двойной клик по пустой ячейке списка создает новое событие.
- Чтобы отредактировать или удалить событие, дважды кликните по иконке 'Details', расположенной слева от описания события, чтобы открыть lightbox и внести изменения.

## Советы по локализации

Вид Agenda содержит 3 метки в locale:

- **scheduler.locale.labels.(agendaName)_tab** - название вкладки вида
- **scheduler.locale.labels.date** - заголовок колонки даты
- **scheduler.locale.labels.description** - заголовок колонки описания

Обычно первая метка задается при добавлении вкладки вида в планировщик. Остальные метки следует изменять только при локализации приложения на язык, отличный от английского.

## Установка диапазона отображаемых дат

Чтобы определить диапазон дат, отображаемых в виде Agenda, используйте свойства [agenda_end](api/config/agenda_end.md) и [agenda_start](api/config/agenda_start.md):

~~~js
//для отображения дат, начиная с 1 июня 2026 года
scheduler.config.agenda_start = new Date(2026, 5, 1); 

//для отображения дат до 1 июня 2027 года
scheduler.config.agenda_end = new Date(2027, 5, 1);   
~~~

## Включение кнопок Следующий/Предыдущий/Сегодня 

Кнопки "Следующий", "Предыдущий" и "Сегодня" можно включить в виде Agenda, переопределив функции **scheduler.date.agenda_start()** и **scheduler.date.add_agenda()**.

**scheduler.date.agenda_start(date)** возвращает начало отображаемого интервала для заданной даты. По умолчанию возвращается фиксированная дата, поэтому вид Agenda не реагирует на нажатия кнопок навигации.

Переопределите эти функции, чтобы, например, возвращать текущий месяц:

~~~js
scheduler.date.agenda_start = function(date){
  return scheduler.date.month_start(new Date(date)); 
};

scheduler.date.add_agenda = function(date, inc){
  return scheduler.date.add(date, inc, "month"); 
}; 
~~~

После этого кнопки навигации будут работать как ожидается.

**Related sample** [Next/Previous/Today buttons in Agenda view](https://snippet.dhtmlx.com/5/5a5d072f2)


## Ширина колонок

Ширину колонок в виде Agenda можно настраивать с помощью CSS классов:

~~~css
<style>
  .dhx_agenda_line div{
     width: 300px; 
  }
  .dhx_v_border{
     left: 299px; 
  }
</style>
~~~

![Columns Width](/img/agenda_columns_width.png)

**Related sample** [Adjusting width of columns](https://snippet.dhtmlx.com/5/8a2c1eb40)

## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны представления Agenda](views/agenda-view-templates-legacy.md)
- [Загрузка данных](guides/loading-data.md)
- [Скины](guides/skins.md)
- [Локализация](guides/localization.md)
