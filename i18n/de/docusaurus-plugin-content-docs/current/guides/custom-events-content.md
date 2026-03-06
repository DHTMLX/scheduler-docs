---
title: "Individuelle Inhalte für Events"
sidebar_label: "Individuelle Inhalte für Events"
---

# Individuelle Inhalte für Events

Um den Inhalt eines Events anzupassen und zu entscheiden, welche Daten angezeigt werden sollen, sind Templates das Mittel der Wahl. Verschiedene Ansichten verwenden unterschiedliche Templates. Um herauszufinden, welche Templates eine bestimmte Ansicht verwendet, siehe den Artikel - [Formatieren von Beschriftungen, Daten, Stilen](guides/templates.md).

Dieser Artikel konzentriert sich darauf, wie Templates für die am häufigsten verwendeten Ansichten angepasst werden können - [Tagesansicht](views/day.md) und [Week-Ansicht](views/week.md).

Diese Ansichten nutzen zwei Templates, um den Event-Text zu individualisieren:

- [event_header](api/template/event_header.md) - definiert den Header des Events
- [event_text](api/template/event_text.md) - definiert den Text des Events

Zusätzlich gibt es das Template [event_bar_text](api/template/event_bar_text.md), das den Text für mehrtägige Events festlegt. Dieses wird von [Monatsansicht](views/month.md) und [Timeline-Ansicht](views/timeline.md) verwendet.

:::note
Es wird empfohlen, Templates innerhalb einer Handler-Funktion für das Event [onTemplatesReady](api/event/ontemplatesready.md) neu zu definieren, um zu verhindern, dass das eigene Template von der Standardversion überschrieben wird.
:::

## Anpassen des Event-Headers

Der Header eines Events wird über das Template [event_header](api/template/event_header.md) gesteuert.

~~~js
// Standard-Definition
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*Angenommen, Ihre Datenobjekte enthalten eine boolesche Eigenschaft **important**, die angibt, ob ein Event wichtig ist. Sie möchten wichtige Events hervorheben, indem Sie ein rotes Häkchen und die Dauer des Events in Orange darstellen.*


![custom_event_header](/img/custom_event_header.png)

Hier ist der Code, um das zu erreichen:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev){
        if (event.important == true){
            return ("<img src='/img/red_check.png'/> <b>"+
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

## Anpassen des Event-Texts

Der Event-Text wird über das Template [event_text](api/template/event_text.md) festgelegt.

~~~js
// Standard-Definition
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*Stellen Sie sich vor, Ihre Datenobjekte besitzen eine zusätzliche Eigenschaft **location**, die angibt, wo das Event stattfindet. Sie möchten den Ort zusammen mit dem Event-Text innerhalb des Event-Feldes anzeigen.*


![custom_event_text](/img/custom_event_text.png)

So können Sie das umsetzen:

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
