---
title: "Форматирование меток, дат, стилей"
sidebar_label: "Форматирование меток, дат, стилей"
---

# Форматирование меток, дат, стилей

Ознакомьтесь с ссылками для каждого вида, чтобы узнать, какие шаблоны он поддерживает.

### Стандартные виды

- [Шаблоны для дневного вида](views/day-view-templates.md)
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
- [Шаблоны недельного вида](views/week-view-templates.md)


### Расширенные виды

- [Шаблоны представления Agenda](views/agenda-view-templates.md)
- [Шаблоны представления грида](views/grid-view-templates.md)
- [Шаблоны Map View](views/map-view-templates.md)
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)
- [Шаблоны Units View](views/units-view-templates.md)
- [Шаблоны годового вида](views/year-view-templates.md)


### Общие для всех видов

- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch support](guides/common-templates.md#touch-support)
- [API templates](guides/common-templates.md#api-templates)


## Указание шаблонов 

Шаблоны можно задавать двумя способами: через код или с помощью HTML-разметки.

### Задание шаблонов через код

По умолчанию шаблоны определяются как функции JavaScript, которые получают объект события или параметры даты и возвращают HTML-строку для вставки в макет:

~~~js
scheduler.templates.event_text="function(start," end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

### Задание шаблонов через разметку

Другой способ - определить шаблоны декларативно с помощью HTML. Для этого необходимо добавить расширение [html_templates](guides/extensions-list.md#html-templates) на страницу. После включения расширения шаблоны можно указывать так:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}<a>
</div>
~~~

Полный список шаблонов доступен в [API документации](api/overview/templates_overview.md).
