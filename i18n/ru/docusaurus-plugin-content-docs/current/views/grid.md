---
title: "Грид View"
sidebar_label: "Грид View"
---

# Грид View 

:::info
Этот вид доступен только в версии Scheduler PRO.
:::

Грид View отображает список предстоящих событий и, в отличие от Agenda View, позволяет настраивать любое количество колонок.

![grid_view](/img/grid_view.png)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## Инициализация {#initialization}

Чтобы добавить Грид View в планировщик, выполните следующие шаги:

1. Включите расширение "grid view" на вашей странице:
~~~js
scheduler.plugins({
    grid_view: true
});
~~~
2. Добавьте вкладку вида в разметку планировщика:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="grid_tab"></div>
    </div>
    ...    
</div>
~~~
3. Установите название вкладки:
~~~js
//'grid_tab' - это имя нашего div
scheduler.locale.labels.grid_tab = "Грид";
~~~
4. Вызовите метод [createGridView](api/method/creategridview.md): 
~~~js
scheduler.createGridView({
    name:"grid",
    fields:[    // определяет колонки грида
        {id:"id",   label:'Id',   sort:'int',  width:80,  align:'right'},
        {id:"date", label:'Date', sort:'date', width:'*'},
        {id:"text", label:'Text', sort:'str',  width:200, align:'left'}
    ],
    from:new Date(2019, 3, 10),//левая граница допустимого диапазона дат
    to:new Date(2019, 5, 23)    //правая граница допустимого диапазона дат
});
~~~


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## Ограничение диапазона дат {#limitingdaterange}

Это расширение позволяет ограничить активные даты, чтобы пользователи не могли выходить за указанные рамки.

Например, если вы хотите ограничить активные даты с **1 января 2024** по **1 января 2025**, настройте конфигурацию следующим образом:


~~~js
scheduler.createGridView({
     name:"grid",
    ..
    from:new Date(2024, 0, 1),
    to:new Date(2025, 0, 1)
});

~~~

## Активация навигации {#activatingnavigation}

Чтобы включить навигацию с помощью кнопок ![navigation_buttons](/img/navigation_buttons.png) в гриде, просто включите свойство [paging](api/method/creategridview.md):


~~~js
scheduler.createGridView({
    name:"grid",
    ...
    paging:true
});
~~~

[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


При включённой навигации, нажатие на кнопки ![navigation_buttons](/img/navigation_buttons.png) будет прокручивать грид на один месяц вперёд или назад. 


Чтобы изменить стандартный временной интервал прокрутки, используйте свойства **unit** и **step**:

- **unit** - (<i>minute, hour, day, week, month, year</i>) единица времени для прокрутки. По умолчанию 'month'
- **step** - (<i>number</i>) сколько единиц прокручивать за раз. По умолчанию 1. 


~~~js
//прокрутка на 2 недели за раз
scheduler.createGridView({
    name:"grid",
    ...
    paging:true,
    unit:"week",
    step:2
});
~~~

## Сортировка {#sorting}

Клик по заголовку колонки вызывает контрол, который показывает, по какой колонке сейчас сортируется грид и по какому направлению (по возрастанию или убыванию).


Повторный клик по тому же заголовку меняет направление сортировки.

Поскольку в колонках могут быть разные типы данных (числа, строки, даты), для каждого типа нужен свой метод сортировки.

Поэтому этот вид поддерживает 3 типа сортировки:

1. **int**;
2. **date**;
3. **str**.


Чтобы включить сортировку и указать её тип для колонки, используйте свойство [sort](api/method/creategridview.md).


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"date",  label:'Date', sort:'date'},
        {id:"text",  label:'Text', sort:'str'}
    ]
});

~~~


## Пользовательские функции сортировки {#customsortingfunctions}

Если вы хотите использовать свою логику сортировки, определите функцию и присвойте её параметру [sort](api/method/creategridview.md).

Эта функция будет вызываться для каждой пары соседних значений и должна возвращать 1, -1 или 0:


- **1** - первое значение должно идти перед вторым;
- **-1** - второе значение должно идти перед первым;
- **0** - оба значения равны.

Вот пример универсальной функции сортировки:


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",   label:'Id',      sort: sortById},
        {id:"text", label:'Text', sort:'str'}
    ]
});

function sortById(a,b){
    a = a.id;
    b = b.id;
    return a>b?1:(a<b?-1:0);
}
~~~


## Шаблоны данных {#datatemplates}

По умолчанию каждая колонка отображает данные из свойства, указанного как её **id**.
  
Если вы хотите настроить содержимое, отображаемое в колонке, вы можете использовать шаблоны. В этом случае колонка будет показывать данные, возвращаемые функцией-шаблоном.
  
  
Шаблоны данных назначаются колонкам с помощью свойства [template](api/method/creategridview.md). 


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
      {id:"date",label:'Date',template:function(start,end,ev){return "1# "+ev.text}},
       ...
    ]
});

~~~


Функция-шаблон получает 3 параметра:

- **start** - дата начала события
- **end** - дата окончания события
- **ev** - объект события


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны представления грида](views/grid-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
