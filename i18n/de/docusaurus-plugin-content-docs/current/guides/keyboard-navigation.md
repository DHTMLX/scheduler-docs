---
title: "Tastaturnavigation"
sidebar_label: "Tastaturnavigation"
---

# Tastaturnavigation

Sie können auf Scheduler und seine Elemente mittels Tasten oder Tastenkombinationen zugreifen. Dieser Artikel enthält alle notwendigen Informationen zu den Besonderheiten der Tastaturnavigation mit Scheduler, einschließlich Fokusverhalten, Verwendung vordefinierter Shortcuts und der Erstellung eigener Shortcuts.

## Aktivierung der Funktionalität

Um die Tastaturnavigation in Scheduler zu verwenden, müssen Sie die **key_nav**-Erweiterung auf der Seite aktivieren. 

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

## Fokusverhalten während der Tastaturnavigation

### Fokus auf Scheduler

Wenn die Tab-Taste gedrückt wird, erhält Scheduler den Fokus wie jedes andere normale Element. Danach können Sie zur Navigation im Scheduler die Pfeiltasten und weitere Tasten verwenden.

Wenn die Tab-Taste ein zweites Mal gedrückt wird, verlässt der Fokus Scheduler und wird an eine andere Stelle der Seite verschoben.

### Fokus auf einem Modalfenster

Wenn ein Modalfenster (eine Lightbox, ein Bestätigungsfenster) geöffnet wird, verschiebt sich der Fokus vom Scheduler zu diesem Fenster, und die Navigation erfolgt darin wie in einem einfachen Formular. Beim Schließen des Fensters geht der Fokus zurück zum Scheduler.

Um den Fokus wieder zum Scheduler zu richten, verwenden Sie die [focus](api/method/focus.md)-Methode. 

~~~js
scheduler.focus();
~~~

Wenn der Scheduler erneut den Fokus erhält, setzt er den Fokus auf das aktive Element darin, auf die erste Zeile oder auf das zuletzt ausgewählte Element.

Die Standard-Navigationsaktionen in einem Modalfenster sind wie folgt:

- *Enter* - Bestätigen und Schließen
- *Escape* - Schließen ohne Änderungen

Wenn der Fokus auf einem Button des Formulars liegt, bewirkt das Drücken von *Space* oder *Enter*, dass der Button unter dem Fokus ausgelöst wird und nicht die Aktion.

## Styling der Zellen im Fokus

Wenn Sie den Fokus auf eine Zelle setzen, wird sie in Grau/Gelb hervorgehoben. Falls Sie dieses Styling ändern möchten, verwenden Sie die CSS-Klasse **.dhx_focus_slot**:

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## Geltungsbereiche

Eine durch einen Tastendruck ausgelöste Aktion hängt vom Kontext ab. Das bedeutet, dass verschiedene Aktionen an verschiedene Elemente (Geltungsbereiche) angehängt werden können. Im Scheduler gibt es folgende Kontext-Elemente (Geltungsbereiche):

- **"scheduler"** - Der gesamte Scheduler
- **"timeSlot"** - Ein Zeitslot
- **"event"** - Ein Ereignis
- **"minicalDate"** - Ein Datum im Mini-Kalender
- **"minicalButton"** - Eine Pfeil-Schaltfläche im Mini-Kalender

Wenn dieselbe Tastenkombination mehreren Geltungsbereichen zugeordnet ist, wird die spezifischere Tastenkombination ausgelöst. Das bedeutet, dass, wenn dieselbe Tastenkombination sowohl dem Scheduler als auch seinem Element zugeordnet ist, die dem Element zugeordnete Tastenkombination aufgerufen wird, statt der Tastenkombination, die dem gesamten Scheduler zugeordnet ist.

### Hinzufügen einer Tastenkombination

Um eine neue Tastenkombination zu erstellen, müssen Sie die [addShortcut](api/method/addshortcut.md)-Methode verwenden und ihr drei Parameter übergeben:

- **shortcut** - (*string*) eine neue Tastenkombination oder der Name einer Tastenkombination
- **handler** - (*function*) eine Handler-Funktion, die beim Aufruf der Tastenkombination ausgeführt wird 
- **scope** - (*string*) der Name des Kontext-Elements, dem die Handler-Funktion zugeordnet wird

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    const target = e.target;
    if(target.closest("[event_id]"))
        const eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Entfernen einer Tastenkombination

Um eine Tastenkombination aus dem Geltungsbereich zu entfernen, verwenden Sie die [removeShortcut](api/method/removeshortcut.md)-Methode. Die Methode nimmt zwei Parameter entgegen:

- **shortcut** - (*string*) der Name der Taste oder der Tastenkombination
- **scope** - (*string*) der Name des Kontext-Elements, dem die Tastenkombination zugeordnet ist

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### Ermitteln eines Tastenkombination-Handlers

Sie können den Handler der Tastenkombination mit der Methode [getShortcutHandler](api/method/getshortcuthandler.md) erhalten. Sie nimmt zwei Parameter entgegen:

- **shortcut** - (*string*) der Name der Taste oder der Tastenkombination
- **scope** - (*string*) der Name des Kontext-Elements, dem die Tastenkombination zugeordnet ist

~~~js
const shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

Die Methode gibt eine Funktion zurück, die den Handler des Aufrufs der Tastenkombination darstellt.

## Syntax der Tastenkombination

Eine Tastenkombination kann aus den folgenden Tasten oder Tastenkombinationen bestehen:

- eine Modifikatortaste + eine Zeichen-Taste ("ctrl+a");
- eine Modifikatortaste + eine Nicht-Zeichen-Taste ("ctrl+space");
- eine Zeichen-Taste ("a");
- eine Nicht-Zeichen-Taste ("space")

Es kann mehrere Tastenkombinationen für eine Aktion geben. In diesem Fall werden alle Kombinationen durch ein Komma getrennt aufgelistet: "ctrl+a, ctrl+space".

### Die Liste der unterstützten Tasten für Tastenkombinationen

- Modifikatortasten: **shift**, **alt**, **ctrl**, **meta**;
- Nicht-Zeichen-Tasten: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

## Vorhandene Tastenkombinationen

Es gibt eine Reihe vordefinierter Tastenkombinationen, mit denen Sie Scheduler navigieren können:

### Allgemeine Tastenkombinationen

- **Tab** - setzt den Fokus auf den Scheduler
- **Alt+1,Alt+2,Alt+3,...** - zwischen Ansichten wechseln
- **Ctrl+Left/Right** - zum nächsten/vorherigen Datum wechseln
- **Ctrl+Up/Down** - Datenbereich scrollen
- **Ctrl+Enter** - neues Ereignis erstellen
- **E, Shift+E** - nächstes/vorheriges Ereignis auswählen
- **Home** - zum aktuellen Datum wechseln
- **Ctrl+C, Ctrl+X, Ctrl+V** - ein Ereignis kopieren/ausschneiden/einfügen

### Shortcuts für Time Slots

- **Up/Down/Left/Right Arrow Keys** - über Time Slots navigieren
- **Shift+Up/Down/Left/Right Arrow Keys** - einen Time Slot erweitern
- **Enter** - ein Ereignis im ausgewählten Time Slot erstellen

### Shortcuts für Ereignisse

- **Up/Down/Left/Right Arrow Keys** - zu einem Time Slot wechseln
- **Enter** - Lightbox öffnen

### Shortcuts für den Mini-Kalender

- **Tab** - setzt den Fokus auf den Mini-Kalender
- **Up/Down/Left/Right Arrow Keys** - zu Schaltflächen/Zellen navigieren
- **Enter** - auf eine Schaltfläche/Zelle klicken

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


### Verwandte Ereignisse

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)