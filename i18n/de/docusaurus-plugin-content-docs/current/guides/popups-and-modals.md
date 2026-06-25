---
title: "Popup-Nachrichten und Modalboxen"
sidebar_label: "Popup-Nachrichten und Modalboxen"
---

# Popup-Nachrichten und Modalboxen

Nachrichten werden im Scheduler verwendet, um den Benutzer über einen Fehler zu informieren, eine Aktion zu bestätigen oder abzulehnen, eine der Optionen zu wählen und so weiter.  
Scheduler-Nachrichten verwenden [den Fork des Repositories dhtmlxMessage](https://github.com/DHTMLX/message) als Basis.  
Daher gilt die gesamte Funktionalität von dhtmlxMessage auch für dhtmlxScheduler-Nachrichten.

Es gibt zwei Haupttypen von Nachrichten: eine [einfaches Popup-Nachrichtenfenster](#basic-popup-message) und ein [modales Nachrichtenfenster](#modal-message-boxes) mit Buttons, die die Arbeit einer Anwendung blockieren.

Ein modales Nachrichtenfenster kann zu einem von drei Typen gehören:

- [Hinweisfenster](#alert-message-box-alert)
- [Bestätigungsfenster](#confirm-message-box-confirm)
- [Modalbox](#modal-box-modal)


## Grundlegendes Popup-Nachrichtenfenster 

Um ein grundlegendes modales Nachrichtenfenster zu erstellen, verwenden Sie die [scheduler.message](api/method/message.md)-Methode. Der Pflichtparameter der Methode ist der Text der Nachricht:

~~~js
scheduler.message("The event is updated");
~~~

Es gibt drei Typen von Nachrichtenboxen:
  
- eine Standard-Nachrichtenbox (**type:"info"**)

![default_message](/img/default_message.png)
  
- eine Fehlermeldungsbox (**type:"error"**)

![error_message](/img/error_message.png)

- eine Warnungsnachrichtenbox (**type:"warning"**)

![warning_message](/img/warning_message.png)

Um eine notwendige Nachrichtenbox zu erstellen, müssen Sie die *type*-Eigenschaft mit dem entsprechenden Wert definieren: 

~~~js
// Erstellung einer Fehlermeldungsbox
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[Different types of popups and modal boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


Um verschiedene Stile auf eine Nachrichtenbox anzuwenden, müssen Sie eine CSS-Klasse über den Type-Parameter angeben, wie hier beschrieben [hier](#styling).

### Positionierung von Nachrichtenboxen

Standardmäßig erscheint eine Popup-Nachrichtenbox in der rechten oberen Ecke des Fensters. Sie blockiert nicht die Arbeit der übergeordneten Anwendung, im Gegensatz zu [modalen Nachrichtenboxen](#modal-message-boxes), die die übergeordnete Anwendung überdecken und deren Arbeit blockieren.  
Sie können die Position einer Nachrichtenbox ändern, indem Sie die Eigenschaft **scheduler.message.position** verwenden:

~~~js
scheduler.message.position = 'bottom';
~~~

Es gibt vier mögliche Werte für die Position der Nachrichtenbox:

- **top** - zeigt eine Nachrichtenbox in der rechten oberen Ecke des Fensters an, standardmäßig voreingestellt

- **bottom** - zeigt eine Nachrichtenbox in der rechten unteren Ecke des Fensters an

- **left** -  zeigt eine Nachrichtenbox auf der linken Seite des Fensters unter Scheduler

- **right** - zeigt eine Nachrichtenbox auf der rechten Seite des Fensters unter Scheduler

### Ablauf-Intervall

Es ist möglich, das Ablaufintervall für eine Nachrichtenbox mit Hilfe des *expire*-Parameters anzupassen. Es ist der Zeitraum, nach dem die Nachrichtenbox verschwindet (in Millisekunden).  
Standardmäßig beträgt das Ablaufintervall 4000 Millisekunden. 

Sie können diesen Wert entweder ändern oder das Ablauf-Intervall ganz deaktivieren, indem Sie den expire-Parameter auf "-1" setzen. In diesem Fall verschwindet eine Nachrichtenbox nur beim Mausklick.

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Ausblenden einer Nachrichtenbox über die API

Um die angegebene Nachrichtenbox manuell auszublenden und nicht darauf zu warten, dass sie automatisch verschwindet, können Sie die **scheduler.message.hide(boxId)**-Methode verwenden. Sie nimmt einen Parameter:

- **boxId** - die Box-ID, die im Konstrukt der Box angegeben ist

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## Modal Message Boxes

Modale Nachrichtenboxen verhindern die Arbeit der übergeordneten App, bis eine notwendige Aktion durchgeführt wird (in der Regel durch Klicken auf eine Schaltfläche). Sie schließen sich bei einem Klick auf eine Schaltfläche und einer Callback-Funktion, falls vorhanden.

Es gibt drei Typen modaler Nachrichtenboxen:

- [Hinweisfenster](#alert-message-box-alert) - ein Hinweisfenster mit einer Schaltfläche;
- [Bestätigungsfenster](#confirm-message-box-confirm) - ein Bestätigungsfenster mit zwei Schaltflächen (zum Bestätigen oder Abbrechen);
- [Modalbox](#modal-box-modal) - eine modale Nachrichtenbox mit einer unbegrenzten Anzahl von Buttons. 

Gemeinsame Eigenschaften der Boxen sind:

- **id** - die Nachrichtenbox-ID;
- **title** - der Text der Kopfzeile;
- **type** - der Typ der Nachrichtenbox (eine Warnung oder ein Fehler);
- **text** - der Text des Nachrichtenboxinhalts; 
- **ok** - der Text der "OK"-Schaltfläche;
- **cancel** - der Text der "Cancel"-Schaltfläche (für das Bestätigungsfenster);
- **callback** - die Funktion, die beim Klicken auf eine Schaltfläche aufgerufen wird. Nimmt *true* oder *false* als Parameter an (abhängig von der geklickten Schaltfläche);
- **position** - unterstützt derzeit nur den Wert - "top", jeder andere Wert führt zu einer zentrierten Ausrichtung;
- **width**    - die Breite der Modalbox (gesetzt als CSS \<length\> oder
  [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z.B. "100px", "50%");
- **height** - die Höhe der Modalbox (gesetzt als CSS \<length\> oder
  [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z.B. "100px", "50%").

## Hinweisfenster (#alert) {#alert-message-box-alert}

![alert](/img/alert.png)

Ein Hinweisfenster enthält die "OK"-Schaltfläche. Um den Text der "OK"-Schaltfläche festzulegen, verwenden Sie den *ok*-Parameter mit dem Text als Wert:

- eine kurze Form (enthält nur den Nachrichtentext - implizite Nutzung des Parameters 'text'. Die anderen Parameter verwenden Standardwerte):

~~~js
scheduler.alert("Text");
~~~

- eine vollständige Form (enthält mehrere verfügbare Parameter. Nicht angegebene Parameter erhalten Standardwerte)

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~


## Bestätigungsfenster (#confirm) {#confirm-message-box-confirm}

![confirm](/img/confirm.png)

Ein Bestätigungsfenster hat zwei Buttons: den "OK"-Button und den "Cancel"-Button. Der Text der Buttons wird in den Eigenschaften mit den entsprechenden Namen festgelegt.


- eine kurze Form

~~~js
scheduler.confirm("ConfirmText");
~~~

- eine vollständige Form

~~~js
scheduler.confirm({
    title:"Confirm",
    text:"This is a simple confirm",
    ok:"Ok",
    cancel:"Cancel",
    callback: function(result){
        if(result){
            scheduler.message("You clicked Ok");
        }else{
            scheduler.message("You clicked Cancel");
        }
    }
});
~~~


## Modalbox (#modal) {#modal-box-modal}

![modalbox](/img/modalbox.png)

Eine Modalbox besitzt einige Besonderheiten: 

- ihr *text* kann beliebige *HTML*-Inhalte enthalten;
- sie kann viele Buttons enthalten, die im *buttons*-Array angegeben sind und die Textwerte der Buttons enthalten;
- die *callback*-Funktion erhält den **index** des gewählten Buttons als Parameter.

~~~js
scheduler.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});
~~~


### Konfiguration der Modalbox-Buttons

Es gibt zwei Hauptwege, die Konfiguration der Modalbox-Buttons zu definieren:

- eine kurze Form:

~~~js
scheduler.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

Das Ergebnis der Callback-Funktion entspricht dem als String formatierten Index eines gedrückten Buttons aus dem Array ("0", "1", "2", ...). Jedem Button wird eine CSS-Klasse aus seinem Label in Kleinschreibung zugewiesen, z.B. scheduler_save_button, scheduler_delete_button, scheduler_cancel_button. 

Diese Klassen können verwendet werden, um Buttons zu stylen:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

Für denselben Button-Namen, der von mehreren Popups verwendet wird und unterschiedlich gestylt werden soll, kann die **type**-Konfiguration verwendet werden:

~~~js
scheduler.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Der **type** wird mit dem Präfix "scheduler_" versehen und dem Popup-Element als Klassenname hinzugefügt:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- eine vollständige Form:

Die CSS-Klassen der Buttons und Callback-Werte können explizit mit einer längeren Form der Konfiguration definiert werden:

~~~js
scheduler.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

Der **label**-Parameter ist obligatorisch, während **css**- und **value**-Optionen weggelassen werden können. Fehlende Parameter werden wie in der kurzen Form der Button-Konfiguration berechnet: CSS wird aus dem kleingeschriebenen Button-Label abgeleitet und der Button-Index wird als Wert verwendet.

Der **css**-Wert wird mit dem "scheduler_"-Präfix versehen und dem Button-Element als Klasse hinzugefügt:

~~~css
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## Ausblenden von Modalboxen

Um eine Modalbox manuell auszublenden, können Sie die Methode **scheduler.modalbox.hide()** verwenden. Als Parameter wird der Div-Container der Modalbox übergeben:

~~~js
const box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

Für die **alert**- und **confirm**-Modalboxen müssen Sie ebenfalls die Methode **scheduler.modalbox.hide()** verwenden:

~~~js
const box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~


## Styling

Für jeden Typ von Nachrichtenbox können Sie einen benutzerdefinierten Stil definieren, um das gewünschte Aussehen zu erreichen. Grundsätzlich wird die passende CSS-Klasse über den *type*-Parameter festgelegt: Sie definieren eine CSS-Klasse und setzen den Parameter auf deren Namen.

Einige Regeln beim Festlegen des 'type'-Parameters sollten Sie beachten:

- Um eine CSS-Klasse für die Alert- und Bestätigungsboxen festzulegen, müssen Sie eine Box auf die fensterbezogene Weise initialisieren.
- Um eine CSS-Klasse für die Nachrichtenboxen festzulegen, müssen Sie eine Box auf die allgemeine Weise initialisieren.
- Der Name einer CSS-Klasse sollte mit dem Präfix "scheduler-" beginnen.
- Um den Stil korrekt anzuwenden, ist es notwendig, den Klassennamen als **.scheduler-some div** zu verwenden, um anzugeben, dass er für das Element innerhalb einer Scheduler-Nachricht gedacht ist. 

~~~js
<style type="text/css">
.scheduler-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


scheduler.message({ type:"myCss", text:"some text" });
~~~

## Modalfenster und Tastaturinteraktion

Die Tastaturfunktionalität für Modalfenster wird durch die Eigenschaft **scheduler.message.keyboard** gesteuert. Anfangs ist sie auf *true* gesetzt. 

Standardmäßig blockieren Modalfenster Tastaturereignisse der Seite. Die einzigen Tasten, die verwendet werden können, sind: 

- "space" und "enter" - setzt den *true*-Wert als Ergebnis des Modalfensters;
- "escape" - setzt den *false*-Wert als Ergebnis des Modalfensters.

Durch Festlegen der Eigenschaft **keyboard** auf *false* werden Tastaturereignisse aktiviert (und die oben genannten Tasten deaktiviert):

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

Dadurch ist die volle Tastatur nutzbar, z.B. zum Tippen von Werten in Eingabefeldern innerhalb von Modalfenstern.