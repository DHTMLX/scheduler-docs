---
title: "Форматирование подписей, дат, стилей"
sidebar_label: "Форматирование подписей, дат, стилей"
---

# Форматирование подписей, дат, стилей

Перейдите по ссылке на вид, чтобы увидеть поддерживаемые им шаблоны.

### Представления по умолчанию

- [Шаблоны дневного вида](views/day-view-templates.md)
- [Шаблоны месячного вида](views/month-view-templates.md)
- [Шаблоны недельного вида](views/week-view-templates.md)

### Расширения представлений

- [Шаблоны вида Agenda](views/agenda-view-templates.md)
- [Шаблоны вида грида](views/grid-view-templates.md)
- [Шаблоны вида карты](views/map-view-templates.md)
- [Шаблоны вида Timeline](views/timeline-view-templates.md)
- [Шаблоны вида WeekAgenda](views/weekagenda-view-templates.md)
- [Шаблоны вида Units](views/units-view-templates.md)
- [Шаблоны вида Year](views/year-view-templates.md)


### Общие для всех видов

- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Лайтбокс](guides/common-templates.md#lightbox)
- [Тултипы](guides/common-templates.md#tooltips)
- [Поддержка касания](guides/common-templates.md#touch-support)
- [Шаблоны API](guides/common-templates.md#api-templates)


## Указание шаблонов

Вы можете задавать шаблоны двумя способами: либо из кода, либо с помощью HTML-разметки.

### Указание шаблонов с помощью кода

По умолчанию шаблоны можно определить как JS-функции, которые принимают объект события или аргументы даты и должны возвращать HTML-строку, которая будет вставлена в разметку:

~~~js
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

### Указание шаблонов через разметку

В качестве альтернативы шаблоны можно определить декларативно через HTML. Этот подход требует добавления расширения [html_templates](guides/extensions-list.md#html-templates) на страницу.
После включения расширения на странице вы можете указать шаблоны следующим образом:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}</a>
</div>
~~~

Полный список шаблонов можно найти [в API](api/overview/templates_overview.md).