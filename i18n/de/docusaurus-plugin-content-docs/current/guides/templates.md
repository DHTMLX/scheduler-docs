---
title: "Formatierung von Labels, Datumsangaben und Stilen"
sidebar_label: "Formatierung von Labels, Datumsangaben und Stilen"
---

# Formatierung von Labels, Datumsangaben und Stilen

Folgen Sie dem Link einer Ansicht, um die von ihr unterstützten Vorlagen zu sehen.

### Standardansichten

- [Tagesansicht-Vorlagen](views/day-view-templates.md)
- [Monatsansicht-Vorlagen](views/month-view-templates.md)
- [Wochenansicht-Vorlagen](views/week-view-templates.md)

### Erweiterte Ansichten

- [Agenda-Ansicht-Vorlagen](views/agenda-view-templates.md)
- [Raster-Ansicht-Vorlagen](views/grid-view-templates.md)
- [Kartenansicht-Vorlagen](views/map-view-templates.md)
- [Timeline-Ansicht-Vorlagen](views/timeline-view-templates.md)
- [WeekAgenda-Ansicht-Vorlagen](views/weekagenda-view-templates.md)
- [Einheiten-Ansicht-Vorlagen](views/units-view-templates.md)
- [Jahresansicht-Vorlagen](views/year-view-templates.md)


### Allgemein für alle Ansichten

- [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch-Unterstützung](guides/common-templates.md#touch-support)
- [API-Vorlagen](guides/common-templates.md#api-templates)


## Festlegen von Vorlagen

Sie können Vorlagen auf zwei Arten festlegen: entweder aus dem Code oder aus HTML-Markup.

### Vorlagen mit Code definieren

Standardmäßig können Vorlagen als JS-Funktionen definiert werden, die das Event-Objekt oder Datumsargumente entgegennehmen und eine HTML-Zeichenkette zurückgeben müssen, die in das Layout eingefügt wird:

~~~js
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

### Vorlagen über HTML-Markup definieren

Alternativ können Vorlagen deklarativ aus HTML definiert werden. Dieser Ansatz erfordert das Hinzufügen der [html_templates](guides/extensions-list.md#html-templates) Erweiterung zur Seite.
Nachdem Sie die Erweiterung auf der Seite aktiviert haben, können Sie Vorlagen wie folgt festlegen:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}</a>
</div>
~~~

Die vollständige Liste der Vorlagen finden Sie [in der API](api/overview/templates_overview.md).