---
title: "Tooltips (v6.0)"
sidebar_label: "Tooltips (v6.0)"
---

# Tooltips (v6.0)

*Der Artikel bezieht sich auf dhtmlxScheduler 6.0 oder frühere Versionen. Falls Sie dhtmlxScheduler 7.0+ verwenden, finden Sie Details [hier](guides/tooltips.md).*

Um Tooltips für Ereignisse anzuzeigen, sollten Sie die **Tooltip**-Erweiterung einmal pro Seite aktivieren.

~~~js
scheduler.plugins({
    tooltip: true;
});
~~~

Danach werden Tooltips mit den Standardeinstellungen angezeigt.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Um Tooltips zu konfigurieren, haben Sie die folgende API:

## Methoden

- **hide()** - versteckt das Tooltip
- **show(event,text)** - zeigt das Tooltip an der Position des Browser-Events mit einem angegebenen Inhalt. Die Methode nimmt zwei Parameter entgegen:
    - *event* - Browser-Event
    - *text* - Tooltip-Inhalt, wird dem innerHTML des Tooltip-Elements hinzugefügt

~~~js
tooltip.hide();
tooltip.show(event, text);
~~~


## Konfigurationsparameter

- **className** - der Name der CSS-Klasse, die auf Tooltips angewendet wird
- **timeout_to_display** - die Verzögerung in Millisekunden, bevor das Tooltip für ein Ereignis angezeigt wird (Standardmäßig 50)
- **timeout_to_hide** - die Verzögerung in Millisekunden, bevor das Tooltip verschwindet (Standardmäßig 50)
- **delta_x** - der rechtsseitige (bei positiver Zahl) Versatz der Cursor-Position (Standardmäßig 15)
- **delta_y** - der oberer (bei positiver Zahl) Versatz der Cursor-Position (Standardmäßig -20)

~~~js
scheduler.config.className = 'dhtmlXTooltip tooltip'; 
scheduler.config.timeout_to_display = 50;
scheduler.config.timeout_to_hide = 50;
scheduler.config.delta_x = 15; 
scheduler.config.delta_y = -20; 
~~~

## Vorlagen

- [tooltip_text](api/template/tooltip_text.md) - bestimmt den Text der Tooltips  
- [tooltip_date_format](api/template/tooltip_date_format.md) - bestimmt das Format von Start- und Enddaten, die im Tooltip angezeigt werden

~~~js
const format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+ 
    format(start)+"

<b>End date:</b> "+format(end);
};
~~~