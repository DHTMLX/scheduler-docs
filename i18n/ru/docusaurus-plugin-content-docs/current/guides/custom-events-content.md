---
title: "Пользовательское содержимое события"
sidebar_label: "Пользовательское содержимое события"
---

# Пользовательское содержимое события

Чтобы настроить содержимое события и определить, какие данные отображать, используйте шаблоны. Разные режимы просмотра используют различные шаблоны, и чтобы узнать, какие именно применяются в конкретном режиме, обратитесь к статье [Форматирование меток, дат, стилей](guides/templates.md).

В этой статье рассматривается, как изменять шаблоны для наиболее часто используемых представлений - [Дневной вид](views/day.md) и [Week View](views/week.md).

В этих представлениях для настройки текста события используются два шаблона:

- [event_header](api/template/event_header.md) - определяет заголовок события
- [event_text](api/template/event_text.md) - определяет текст события

Также существует шаблон [event_bar_text](api/template/event_bar_text.md), который задаёт текст для событий, продолжающихся несколько дней. Этот шаблон используется в [Месячный вид](views/month.md) и [Вид 'Timeline'](views/timeline.md).

:::note
Рекомендуется переопределять шаблоны внутри функции-обработчика для события [onTemplatesReady](api/event/ontemplatesready.md), чтобы ваш шаблон не был перезаписан стандартным.
:::

## Настройка заголовка события

Заголовок события формируется с помощью шаблона [event_header](api/template/event_header.md).

~~~js
// стандартное определение
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*Предположим, что в ваших объектах данных есть булево свойство **important**, которое определяет важность события. Вы хотите выделить важные события, добавив красную иконку с галочкой и выделив длительность события оранжевым цветом.*


![custom_event_header](/img/custom_event_header.png)

Вот пример кода для реализации этого:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev){
        if (event.important == true){
            return ("![red_check](/img/red_check.png) <b>"+
                scheduler.templates.event_date(start)+" - "+
        } else {
            return(scheduler.templates.event_date(start)+" - "+
            scheduler.templates.event_date(end))
        }
    };
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~

## Настройка текста события

Текст события задаётся с помощью шаблона [event_text](api/template/event_text.md).

~~~js
// стандартное определение
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*Допустим, в ваших объектах данных есть дополнительное свойство **location**, указывающее место проведения события. Вы хотите отображать место проведения вместе с текстом события внутри блока события.*


![custom_event_text](/img/custom_event_text.png)

Вот как это можно реализовать:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_text="function(start,end,event){"
        return "<b>" + event.text + "</b>

<i>" + event.location + "</i>";
    }
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~
