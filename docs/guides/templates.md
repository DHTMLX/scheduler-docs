---
title: "Formatting Labels, Dates, Styles"
sidebar_label: "Formatting Labels, Dates, Styles"
---

# Formatting Labels, Dates, Styles

Follow the link of a view to see templates supported by it. 

### Default views

- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
- [Week View Templates](views/week-view-templates.md)

### Extension views

- [Agenda View Templates](views/agenda-view-templates.md)
- [Grid View Templates](views/grid-view-templates.md)
- [Map View Templates](views/map-view-templates.md)
- [Timeline View Templates](views/timeline-view-templates.md)
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)
- [Units View Templates](views/units-view-templates.md)
- [Year View Templates](views/year-view-templates.md)


### Common for all views

- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Lightbox](guides/common-templates.md#lightbox)
- [Tooltips](guides/common-templates.md#tooltips)
- [Touch support](guides/common-templates.md#touch-support)
- [API templates](guides/common-templates.md#api-templates)


## Specifying Templates 

You can set templates in 2 ways: either from the code or from the HTML markup. 

### Specifying templates with code

By default, templates can be defined as JS functions which take the event object or date arguments and must return an HTML string that will be inserted in the layout:

~~~js
scheduler.templates.event_text="function(start," end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

### Specifying templates via markup

Alternatively, templates can be defined in the declarative way from HTML. This approach requires adding the [html_templates](guides/extensions-list.md#html-templates) extension to the page.
Once you've activate the extension on the page, you may specify templates as in:

~~~html
<div class="template:event_text">
    <a href='http://some.com/details.php?for="{event.id}"'>{event.text}<a>
</div>
~~~

The complete list of templates can be found [in the API](api/overview/templates_overview.md).
