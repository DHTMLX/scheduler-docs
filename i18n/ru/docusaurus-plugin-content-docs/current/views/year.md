---
title: "Годовой вид"
sidebar_label: "Годовой вид"
---

# Годовой вид 

Годовой вид отображает один или несколько лет в календаре.

![year_view](/img/year_view.png)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## Инициализация

Чтобы включить Годовой вид в планировщике, выполните следующие шаги:

1. Активируйте расширение Year на странице:
~~~js
scheduler.plugins({
    year_view: true
});
~~~
2. Добавьте вкладку вида в разметку планировщика:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="year_tab"></div>
    </div>
    ...    
</div>
~~~
3. Задайте название для вкладки:
~~~js
//'year_tab' — это имя нашего div
scheduler.locale.labels.year_tab ="Year"; 
~~~


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## Детали интерфейса 

- Даты, к которым привязаны события, подсвечиваются.
- При наведении курсора на дату появляется тултип со списком всех событий, запланированных на этот день. Нажатие на иконку 'details' в тултипе открывает lightbox (если только не включён режим только для чтения).


## Настройка количества месяцев в виде

Чтобы управлять количеством месяцев в каждой строке и колонке, настройте свойства [year_x](api/config/year_x.md) и [year_y](api/config/year_y.md):

~~~js
//Годовой вид будет показывать только 6 месяцев
scheduler.config.year_x = 2; //2 месяца в строке
scheduler.config.year_y = 3; //3 месяца в колонке

~~~


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны годового вида](views/year-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
