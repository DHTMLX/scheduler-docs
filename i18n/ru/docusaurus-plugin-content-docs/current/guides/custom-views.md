---
title: "Пользовательский вид"
sidebar_label: "Пользовательский вид"
---

# Пользовательский вид 

Когда стандартные виды не совсем соответствуют вашим требованиям, вы можете создать пользовательский вид.

## Вкладка вида
Создание пользовательского вида начинается с добавления новой вкладки в планировщик, которая будет представлять ваш новый вид. Обычно это выглядит так:

~~~js
<div class="dhx_cal_tab" data-tab="workweek"></div>
~~~

Обратите внимание:

- Имя вкладки должно соответствовать шаблону: (viewName)_tab
- Вкладка должна содержать хотя бы один класс с именем "dhx_cal_tab", и этот класс должен быть первым в списке.

Чтобы задать название для вида, используйте:

~~~js
scheduler.locale.labels.{viewName}_tab = "someName"
~~~

## Методы для обработки вида
Есть три основных метода, которые определяют поведение вида - они задают интервал отображения (например, неделя для Week, месяц для Month и т.д.) и активную дату при нажатии пользователем кнопок 'Next' или 'Prev' в заголовке.

1. **scheduler.date.(viewName)_start (active_date)** - принимает активную дату планировщика и возвращает начальную дату интервала вида (например, первый день активной недели для Week или первый день активного месяца для Month). 
2. **scheduler.date.get_(viewName)_end (start_date)** - принимает начальную дату (из предыдущего метода) и возвращает конечную дату интервала вида (например, последний день активной недели или месяца). 
3. **scheduler.date.add_(viewName)(date, inc)** - определяет, на сколько должна сместиться активная дата при нажатии пользователем кнопок 'Next' или 'Prev' в заголовке.

## Настройка шаблонов вида
Наконец, потребуется настроить шаблоны для даты в заголовке и шкалы X-оси:

- **Заголовок вида** - scheduler.templates.(viewName)_date = function(start_date, end_date)(...)
- **X-ось** - scheduler.templates.(viewName)_scale_date = function(date)(...)

Например:

~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~

## Пошаговый пример

Вот как создать пользовательский вид с именем 'workweek', похожий на Week, но отображающий только рабочие дни недели.

![custom_view](/img/custom_view.png)

Шаги:
1. Добавьте вкладку вида:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
   <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="workweek_tab"></div>
   </div>
</div>
~~~
2. Задайте название для вкладки:
~~~js
scheduler.locale.labels.workweek_tab = "Work week"
~~~
3. Определите метод, возвращающий начальную дату интервала вида, то есть понедельник активной недели:
~~~js
scheduler.date.workweek_start = function(date) {
    return scheduler.date.week_start(date);//
}
~~~
Здесь мы повторно используем метод week_start() из Week, так как оба вида имеют одинаковую начальную дату.
4. Определите метод, возвращающий конечную дату интервала вида, то есть пятницу активной недели:
~~~js
scheduler.date.get_workweek_end="function(start_date){" 
    return scheduler.date.add(start_date,5,"day"); 
}
~~~
Метод add() изменяет дату, прибавляя или вычитая указанный временной интервал. Подробнее [здесь](api/other/date.md).
5. Определите метод, который определяет, как изменяется активная дата при нажатии кнопок 'Next' или 'Prev':
~~~js
scheduler.date.add_workweek="function(date,inc){" 
    return scheduler.date.add(date,inc*7,"day");
}
~~~
Метод add() отвечает за прибавление или вычитание временного интервала. Подробнее смотрите [здесь](api/other/date.md).
6. Определите шаблон для даты в заголовке вида:
~~~js
scheduler.templates.workweek_date = scheduler.templates.week_date;
~~~
Этот шаблон совпадает с шаблоном Week, поэтому мы просто используем стандартный шаблон Week - [week_date](api/template/week_date.md)
7. Определите шаблон для X-оси вида:
~~~js
scheduler.templates.workweek_scale_date = scheduler.templates.week_scale_date;
~~~
Этот шаблон также взят из Week для сохранения единообразия - [week_scale_date](api/template/week_scale_date.md)


[Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)


## Установка пользовательского вида по умолчанию 
Начальный вид, отображаемый в планировщике, задаётся при инициализации, как описано в [init](api/method/init.md). Однако, поскольку шаблоны для пользовательского вида могут быть ещё не полностью обработаны на тот момент, инициализация может завершиться с ошибкой.


Чтобы этого избежать, убедитесь, что шаблоны для вашего пользовательского вида готовы до инициализации планировщика - создавайте пользовательские виды внутри обработчика события [onTemplatesReady](api/event/ontemplatesready.md). Это событие срабатывает после полной обработки всех шаблонов:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    // Здесь размещайте код создания пользовательского вида
});

scheduler.init(container, date, "custom view name");
~~~
