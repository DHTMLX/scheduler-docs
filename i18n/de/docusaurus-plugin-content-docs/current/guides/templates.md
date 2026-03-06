---
title: "Formatieren von Beschriftungen, Daten, Stilen"
sidebar_label: "Formatieren von Beschriftungen, Daten, Stilen"
---

# Formatieren von Beschriftungen, Daten, Stilen

Siehe den Link für jede Ansicht, um die unterstützten Templates zu erkunden.

### Standardansichten

- [Day-Ansicht Vorlagen](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
- [Week-View-Vorlagen](views/week-view-templates.md)


### Erweiterte Ansichten

- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
- [Grid-View-Vorlagen](views/grid-view-templates.md)
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)
- [Units View Templates](views/units-view-templates.md)
- [Jahresansicht-Vorlagen](views/year-view-templates.md)


### Gemeinsam für alle Ansichten

- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch support](guides/common-templates.md#touch-support)
- [API templates](guides/common-templates.md#api-templates)


## Festlegen von Templates

Templates können auf zwei Arten festgelegt werden: entweder per Code oder mit HTML-Markup.

### Templates per Code festlegen

Standardmäßig werden Templates als JavaScript-Funktionen definiert, die das Event-Objekt oder Datumsparameter erhalten und einen HTML-String zurückgeben, der in das Layout eingefügt wird:

~~~js
scheduler.templates.event_text="function(start," end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

### Templates über Markup festlegen {#specifyingtemplatesasanhtmlcode}

Eine weitere Möglichkeit ist die deklarative Definition von Templates mit HTML. Diese Methode erfordert das Einbinden der [html_templates](guides/extensions-list.md#html-templates)-Erweiterung auf der Seite. Sobald die Erweiterung aktiviert ist, können Templates wie folgt angegeben werden:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}<a>
</div>
~~~

Die vollständige Liste der Templates finden Sie in der [API-Dokumentation](api/overview/templates_overview.md).
