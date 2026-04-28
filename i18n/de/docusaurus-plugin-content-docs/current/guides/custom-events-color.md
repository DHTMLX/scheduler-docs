---
title: "Farbe eines benutzerdefinierten Ereignisses"
sidebar_label: "Farbe eines benutzerdefinierten Ereignisses"
---

# Farbe eines benutzerdefinierten Ereignisses

Es gibt drei Möglichkeiten, einem Ereignis eine benutzerdefinierte Farbe zuzuweisen:

1. [Um Farbwerte in den Eigenschaften des Ereignis-Objekts festzulegen](guides/custom-events-color.md#specifying-colors-in-properties-of-the-event-object);
2. [Um dem Ereignis zusätzliche CSS-Klassen zuzuweisen](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event).
3. [Um Stile aus Daten zu erzeugen](guides/custom-events-color.md#loading-colors-with-data).

![custom_event_color](/img/custom_event_color.png)

## Festlegen der Farben in den Eigenschaften des Ereignis-Objekts

Um eine benutzerdefinierte Farbe für ein Ereignis festzulegen, reichen zwei zusätzliche Eigenschaften im Datenobjekt aus (oder nur eine davon):

- **textColor** - gibt die Schriftfarbe des Ereignisses an;
- **color** - gibt die Hintergrundfarbe des Ereignisses an.

![custom_color_model](/img/custom_color_model.png)

Festlegen der Ereignisfarbe im Datenobjekt:
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-21",end_date:"2027-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2027-06-02",end_date:"2027-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Hinweis: Dies sind spezielle Eigenschaften. Standardmäßig prüft der Scheduler immer, ob ein Ereignis sie besitzt, und wendet bei Vorhandensein die entsprechenden Werte auf den Ereigniskontainer und den Text an. Andernfalls verwendet der Scheduler vordefinierte Farben für das Ereignis.

Die Eigenschaften können jeden gültigen CSS-Farbwert haben, z. B. sind alle folgenden Notationen gültig:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~

## Hinzufügen zusätzlicher CSS-Klassen zu einem Ereignis

Der zweite Weg, ein Ereignis zu färben, besteht darin, ihm zusätzliche CSS-Klassen anzuwenden.

### Technik

Um eine CSS-Klasse auf ein Ereignis anzuwenden, verwenden Sie die [event_class](api/template/event_class.md) Vorlage.

Die Standardimplementierung der Vorlage ist:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*Die Funktion gibt eine Zeichenkette zurück, die der Ereignisklasse hinzugefügt wird. Sie können also je nach Zustand des Ereignisses unterschiedliche Klassen zurückgeben.*

[Färben von Ereignissen](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

### Beispiel

Nehmen wir an, Sie möchten, dass die Ereignisse Managern und Mitarbeitenden in unterschiedlichen Farben zugeordnet werden: Für Manager grün, für Mitarbeitende orange. In diesem Fall führen Sie zwei Schritte aus:

1. Fügen Sie dem Modell eine zusätzliche Daten-Eigenschaft hinzu und nennen Sie sie zum Beispiel 'type'. Die Eigenschaft speichert den Typ des Benutzers: 'manager' oder 'employee'.

![extended_data_model](/img/extended_data_model.png)
2. Definieren Sie die zugehörigen CSS-Klassen für diese Typen, z. B. benannt als 'manager_event' und 'employee_event'. Für solche Namen sieht die CSS-Definition wie folgt aus:

[Redefining the default CSS classes](Redefining the default CSS classes)

~~~html

    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }

~~~

Für ältere Scheduler-Versionen (v6.0 und älter) sind CSS-Variablen nicht verfügbar und Ereignisse können mit folgenden Stilen eingefärbt werden:

~~~html

    /*Event im Day- oder Week-View*/
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event.employee_event div{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /*Mehr­tages-Ereignis im Monatsansicht*/
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event_line.employee_event{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /*Ereignis mit fester Zeit, in der Monatsansicht*/
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
    .dhx_cal_event_clear.employee_event{
        color: black !important;
    }

~~~

3. Und schließlich überschreiben Sie die [event_class](api/template/event_class.md) Vorlage

[Applying additional CSS classes to events:](Applying additional CSS classes to events:)
~~~js
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~

[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

## Farben mit Daten laden

Wenn Farben Teil Ihrer Daten sind, die vom Backend stammen, z. B. wenn die Farbe einer Aufgabe mit einer Phase oder einer Ressource verknüpft ist, die einer Aufgabe zugewiesen ist und nicht direkt auf der Seite fest codiert werden kann, kann es sinnvoll sein, Stile manuell aus Ihren Daten zu generieren.

Angenommen, Sie haben die folgende Sammlung von Benutzern, die Aufgaben zugewiesen werden können. Die Stile der Aufgaben sollten durch die Eigenschaften der Benutzer-Datensätze definiert werden:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

In diesem Anwendungsfall werden Benutzer und ihre Farben von verschiedenen Teilen der App erstellt und verwaltet, und der Scheduler kennt in der Regel Benutzer-IDs und deren Farben nicht im Voraus.

Folgendes können Sie in diesem Fall tun:

- Definieren Sie eine benannte serverList für diese Sammlung

~~~js
scheduler.serverList("people");
~~~

- Optionen auf die Seite laden, entweder mit einem der unterstützten [Datenformate](guides/data-formats.md#json-with-collections) oder manuell über einen benutzerdefinierten xhr

- Sobald Optionen geladen sind, können Sie CSS-Stile aus den Daten generieren:

~~~js
scheduler.attachEvent("onLoadEnd", function(){
    // use an arbitrary id for the style element
    const styleId = "dynamicSchedulerStyles";
 
    // in case you'll be reloading options with colors - reuse previously
    // created style element
 
    let element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    let html = [];
    const resources = scheduler.serverList("people");
 
    // generate css styles for each option and write css into the style element,
 
    resources.forEach(function(r){
        html.push(`.event_resource_${r.key} {
            --dhx-scheduler-event-background:${r.backgroundColor};
            --dhx-scheduler-event-color:${r.textColor};
        }`);
    });
    element.innerHTML = html.join("");
});
~~~

- Danach können Sie die zugehörigen Klassen zuweisen, die Sie aus der Klassen-Vorlage generiert haben:

~~~js
scheduler.templates.event_class = function (start, end, event) {
    let css = [];
 
    if(task.owner_id){
        css.push("event_resource_" + event.owner_id);
    }
 
    return css.join(" ");
};
~~~