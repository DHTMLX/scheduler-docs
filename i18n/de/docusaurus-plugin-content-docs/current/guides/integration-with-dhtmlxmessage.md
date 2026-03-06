---
title: "Popup-Nachrichten und Modale Fenster"
sidebar_label: "Popup-Nachrichten und Modale Fenster"
---

# Popup-Nachrichten und Modale Fenster

Nachrichten im Scheduler informieren Benutzer über Fehler, bestätigen oder verwerfen Aktionen, ermöglichen die Auswahl von Optionen und mehr. Die Scheduler-Nachrichten basieren auf [einem Fork des dhtmlxMessage-Repositories](https://github.com/DHTMLX/message), daher gelten alle Funktionen von dhtmlxMessage auch für dhtmlxScheduler-Nachrichten.

Es gibt zwei Hauptkategorien von Nachrichten: eine [einfache Popup-Nachricht](#basicpopupmessage) und eine [modale Nachricht](#modalmessageboxes) mit Schaltflächen, die die Interaktion mit der Anwendung blockieren.

Ein modales Nachrichtenfenster kann eine der folgenden drei Typen sein:

- [Alert-Nachrichtenfenster](#alert)
- [Confirm-Nachrichtenfenster](#confirm)
- [Modalbox](#modal)


## Einfache Popup-Nachricht 

Um eine einfache modale Nachricht anzuzeigen, verwenden Sie die Methode [scheduler.message](api/method/message.md). Der einzige erforderliche Parameter ist der Nachrichtentext:

~~~js
scheduler.message("The event is updated");
~~~

Es gibt drei Arten von Nachrichtenfenstern:

- ein Standard-Nachrichtenfenster (**type:"info"**)

![default_message](/img/default_message.png)
  
- ein Fehler-Nachrichtenfenster (**type:"error"**)

![error_message](/img/error_message.png)

- ein Warnungs-Nachrichtenfenster (**type:"warning"**)

![warning_message](/img/warning_message.png)

Um einen bestimmten Nachrichtentyp zu erstellen, setzen Sie die Eigenschaft *type* auf den entsprechenden Wert:

~~~js
// Erstellen eines Fehler-Nachrichtenfensters
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[Different types of popups and modal boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


Um das Aussehen eines Nachrichtenfensters anzupassen, geben Sie eine CSS-Klasse über den type-Parameter an, wie [hier](#styling) beschrieben.

### Positionierung von Nachrichtenfenstern

Standardmäßig erscheinen Popup-Nachrichtenfenster in der rechten oberen Ecke des Fensters. Im Gegensatz zu [modale Nachrichtenfenstern](#modalmessageboxes) blockieren sie nicht die Interaktion mit der Anwendung. Die Position kann durch Setzen der Eigenschaft **scheduler.message.position** geändert werden:

~~~js
scheduler.message.position = 'bottom';
~~~

Mögliche Werte für die Nachrichtenposition sind:

- **top** - zeigt das Nachrichtenfenster in der rechten oberen Ecke an (Standard)
- **bottom** - zeigt das Nachrichtenfenster in der rechten unteren Ecke an
- **left** - zeigt das Nachrichtenfenster auf der linken Seite unterhalb des Schedulers an
- **right** - zeigt das Nachrichtenfenster auf der rechten Seite unterhalb des Schedulers an

### Ablaufintervall

Sie können steuern, wie lange ein Nachrichtenfenster sichtbar bleibt, indem Sie den *expire*-Parameter festlegen, der die Dauer in Millisekunden definiert, bevor die Nachricht verschwindet. Der Standardwert beträgt 4000 Millisekunden.

Um die Dauer zu ändern oder das automatische Verschwinden zu verhindern, setzen Sie *expire* auf "-1". In diesem Fall schließt sich die Nachricht nur, wenn sie angeklickt wird.

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Ausblenden eines Nachrichtenfensters per API

Um ein bestimmtes Nachrichtenfenster manuell auszublenden, ohne auf das Ablaufintervall zu warten, verwenden Sie die Methode **scheduler.message.hide(boxId)**. Sie nimmt einen Parameter entgegen:

- **boxId** - die beim Erstellen zugewiesene ID des Nachrichtenfensters

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## Modale Nachrichtenfenster

Modale Nachrichtenfenster blockieren die Interaktion mit der übergeordneten Anwendung, bis eine erforderliche Aktion durchgeführt wurde - in der Regel durch das Klicken auf eine Schaltfläche. Sie schließen sich, wenn eine Schaltfläche angeklickt wird, und eine ggf. bereitgestellte Callback-Funktion wird ausgeführt.

Es gibt drei Typen von modalen Nachrichtenfenstern:

- [Alert-Nachrichtenfenster](#alert) - ein Hinweisfenster mit einer einzigen Schaltfläche
- [Confirm-Nachrichtenfenster](#confirm) - ein Bestätigungsfenster mit zwei Schaltflächen (Bestätigen oder Abbrechen)
- [Modalbox](#modal) - ein modales Fenster mit beliebig vielen Schaltflächen

Gemeinsame Eigenschaften sind:

- **id** - die ID des Nachrichtenfensters
- **title** - Überschrift
- **type** - Nachrichtentyp (z. B. warning oder error)
- **text** - Nachrichtentext
- **ok** - Text für die "OK"-Schaltfläche
- **cancel** - Text für die "Abbrechen"-Schaltfläche (nur für Confirm-Box)
- **callback** - Funktion, die beim Klicken auf eine Schaltfläche aufgerufen wird; erhält *true* oder *false*, abhängig von der gewählten Schaltfläche
- **position** - unterstützt derzeit nur "top"; andere Werte zentrieren das Fenster
- **width** - Breite des modalen Fensters (CSS-[Länge](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [Prozentwert](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), z. B. "100px", "50%")
- **height** - Höhe des modalen Fensters (CSS-[Länge](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [Prozentwert](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), z. B. "100px", "50%")

## Alert-Nachrichtenfenster (#alert)

![alert](/img/alert.png)

Ein Alert-Fenster enthält eine einzelne "OK"-Schaltfläche. Um den Text der Schaltfläche festzulegen, verwenden Sie den *ok*-Parameter:

- Kurzform (nur Nachrichtentext, *text* wird implizit gesetzt, andere Parameter verwenden Standardwerte):

~~~js
scheduler.alert("Text");
~~~

- Vollständige Form (ermöglicht das Setzen mehrerer Parameter; nicht angegebene verwenden Standardwerte):

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~


## Confirm-Nachrichtenfenster (#confirm)

![confirm](/img/confirm.png)

Ein Confirm-Fenster enthält zwei Schaltflächen: "OK" und "Abbrechen". Die Texte werden über die entsprechenden Eigenschaften gesetzt.

- Kurzform

~~~js
scheduler.confirm("ConfirmText");
~~~

- Vollständige Form

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


## Modalbox (#modal)

![modalbox](/img/modalbox.png)

Die Modalbox bietet einige besondere Funktionen:

- Ihr *text* kann beliebigen *HTML*-Inhalt enthalten
- Sie unterstützt mehrere Schaltflächen, die im *buttons*-Array angegeben werden, jeweils mit einer Beschriftung
- Die *callback*-Funktion erhält den Index der gedrückten Schaltfläche als Parameter

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


### Konfiguration der Modalbox-Schaltflächen

Es gibt zwei Hauptmöglichkeiten, die Schaltflächen der Modalbox zu konfigurieren:

- Kurzform:

~~~js
scheduler.modalbox({
    // andere Einstellungen
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

In dieser Form erhält das Callback den als String dargestellten Index der geklickten Schaltfläche ("0", "1", "2", ...). Jede Schaltfläche erhält eine CSS-Klasse basierend auf ihrer Beschriftung in Kleinbuchstaben, z. B.: *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button*.

Diese Klassen können zum Stylen der Schaltflächen verwendet werden:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

Wenn mehrere Popups die gleichen Schaltflächennamen verwenden, aber unterschiedliche Stile benötigen, kann die **type**-Eigenschaft verwendet werden:

~~~js
scheduler.modalbox({
    // andere Einstellungen
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Der **type**-Wert wird mit "scheduler_" vorangestellt und als Klasse zum Popup-Element hinzugefügt:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- Vollständige Form:

Sie können Beschriftungen, CSS-Klassen und Callback-Werte der Schaltflächen explizit über eine detaillierte Konfiguration festlegen:

~~~js
scheduler.modalbox({
    // andere Einstellungen
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

Nur der **label**-Parameter ist erforderlich; **css** und **value** sind optional. Wenn sie weggelassen werden, werden CSS-Klassen aus dem Kleinbuchstabenwert des Labels abgeleitet und der Button-Index als Wert verwendet.

Die **css**-Klasse wird mit "scheduler_" vorangestellt und auf das Schaltflächenelement angewendet:

~~~js
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## Modale Nachrichtenfenster ausblenden

Um ein modales Nachrichtenfenster manuell zu schließen, verwenden Sie die Methode **scheduler.modalbox.hide()** und übergeben das Container-Element der Modalbox:

~~~js
var box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

Für **alert**- und **confirm**-Fenster wird die gleiche Methode **scheduler.modalbox.hide()** verwendet:

~~~js
var box = scheduler.confirm({
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

Sie können das Aussehen jedes Nachrichtenfensters anpassen, indem Sie eigene CSS-Stile definieren. Normalerweise wird die CSS-Klasse über den *type*-Parameter angegeben: Erstellen Sie eine CSS-Klasse und weisen Sie deren Namen dem *type* zu.

Beachten Sie dabei folgende Hinweise zum 'type'-Parameter:

- Um Alert- und Confirm-Boxen zu stylen, initialisieren Sie diese mit der 'window-bezogenen' Methode.
- Um Nachrichtenfenster zu stylen, initialisieren Sie diese mit der 'common'-Methode.
- CSS-Klassennamen sollten mit dem Präfix 'scheduler-' beginnen.
- Um Stile korrekt anzuwenden, richten Sie Ihre Selektoren auf Elemente innerhalb von Scheduler-Nachrichten, z. B. **.scheduler-some div**.

Beispiel:

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

## Modale Fenster und Tastatur-Interaktion

Das Verhalten der Tastatur für modale Fenster wird über die Eigenschaft **scheduler.message.keyboard** gesteuert, die standardmäßig auf *true* steht.

Wenn aktiviert, blockieren modale Fenster die meisten Tastaturereignisse auf der Seite. Nur diese Tasten sind aktiv:

- "Leertaste" und "Enter" - lösen ein *true*-Ergebnis im modalen Fenster aus
- "Escape" - löst ein *false*-Ergebnis aus

Wenn Sie **scheduler.message.keyboard** auf *false* setzen, wird diese Blockierung aufgehoben und die vollständige Tastatureingabe ist möglich, was nützlich ist, um Daten in modalen Fenstern einzugeben:

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

Dadurch wird die normale Tastaturnutzung innerhalb modaler Fenster ermöglicht.
