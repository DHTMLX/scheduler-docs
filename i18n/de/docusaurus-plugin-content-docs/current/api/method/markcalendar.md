---
sidebar_label: "markCalendar"
title: "markCalendar method"
description: "fügt einem bestimmten Datum eine CSS-Klasse hinzu"
---

# markCalendar

### Description

@short: Fügt einem bestimmten Datum eine CSS-Klasse hinzu

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - die Kalender-Instanz
- `date` - (required) *Date* - das Datum, das hervorgehoben werden soll
- `css` - (required) *string* - der anzuwendende CSS-Klassenname

### Example

~~~jsx
<style>
my_style{
    color:red !important; // Verwenden Sie das Schlüsselwort 'important', um sicherzustellen, dass der Stil auf das Datum angewendet wird
}                        // 
</style>
<script>
    // Es gibt zwei Möglichkeiten, das Kalender-Objekt zu erhalten:

    // durch Erstellen eines Mini-Kalenders
    var calendar = scheduler.renderCalendar({...});

    // oder durch Auswahl des Container-Elements des Mini-Kalenders
    var calendar = document.querySelector(".dhx_mini_calendar");
    
    ...
    scheduler.markCalendar(calendar, new Date(2027,3,1), "my_style");
</script>
~~~

### Details

:::note
 Die Methode erfordert, dass das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

:::note

Beachten Sie, dass diese Methode nur mit dem Mini-Calendar funktioniert, nicht mit dem Scheduler selbst.
 
:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
