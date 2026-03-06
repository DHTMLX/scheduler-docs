---
title: "Tooltips (v6.0)"
sidebar_label: "Tooltips (v6.0)"
---

# Tooltips (v6.0)

*Dieser Artikel behandelt dhtmlxScheduler Version 6.0 und früher. Für Versionen 7.0 und höher finden Sie die Details [hier](guides/tooltips.md).*

Um Tooltips für Ereignisse zu aktivieren, muss die **Tooltip**-Erweiterung einmalig auf der Seite aktiviert werden.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

Nach der Aktivierung erscheinen Tooltips mit der Standardkonfiguration.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Die Tooltip-Funktionalität kann mit der folgenden API angepasst werden:

## Methoden

- **hide()** - blendet das Tooltip aus
- **show(event,text)** - zeigt das Tooltip an der Position des Browser-Events mit dem angegebenen Inhalt an. Diese Methode akzeptiert zwei Parameter:
    - *event* - das Browser-Event-Objekt
    - *text* - der Inhalt, der in das innerHTML des Tooltips eingefügt wird

~~~js
tooltip.hide();
tooltip.show(event, text);
~~~


## Konfigurationseigenschaften

- **className** - gibt den CSS-Klassennamen an, der auf Tooltips angewendet wird
- **timeout_to_display** - Verzögerung in Millisekunden, bevor das Tooltip angezeigt wird (Standardwert ist 50)
- **timeout_to_hide** - Verzögerung in Millisekunden, bevor das Tooltip ausgeblendet wird (Standardwert ist 50)
- **delta_x** - horizontaler Versatz von der Cursorposition (positive Werte verschieben nach rechts, Standardwert ist 15)
- **delta_y** - vertikaler Versatz von der Cursorposition (positive Werte verschieben nach unten, Standardwert ist -20)

~~~js
scheduler.config.className = 'dhtmlXTooltip tooltip'; 
scheduler.config.timeout_to_display = 50;
scheduler.config.timeout_to_hide = 50;
scheduler.config.delta_x = 15; 
scheduler.config.delta_y = -20; 
~~~

## Templates

- [tooltip_text](api/template/tooltip_text.md) - definiert den im Tooltip angezeigten Inhalt  
- [tooltip_date_format](api/template/tooltip_date_format.md) - definiert das Datumsformat für Start- und Enddatum, das im Tooltip angezeigt wird

~~~js
var format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    format(start)+"

<b>End date:</b> "+format(end);
};
~~~
