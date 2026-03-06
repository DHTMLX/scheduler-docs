---
title: "Tastaturnavigation"
sidebar_label: "Tastaturnavigation"
---

# Tastaturnavigation

Der Scheduler und seine Elemente können mit einzelnen Tasten oder Tastenkombinationen gesteuert werden. Dieser Artikel enthält alles, was Sie über die Tastaturnavigation im Scheduler wissen müssen, einschließlich des Fokusverhaltens, der integrierten Shortcuts und wie Sie eigene erstellen.

## Aktivieren der Funktionalität {#enablingthefunctionality}

Um die Tastaturnavigation im Scheduler zu aktivieren, schalten Sie einfach die **key_nav**-Erweiterung auf Ihrer Seite ein.

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

## Fokusverhalten während der Tastaturnavigation {#focusbehaviorduringkeyboardnavigation}

### Fokus auf dem Scheduler

Durch Drücken der Tab-Taste wird der Fokus auf den Scheduler gesetzt, wie bei jedem anderen Element auch. Sobald der Scheduler fokussiert ist, können Sie innerhalb des Schedulers mit den Pfeiltasten und anderen Tastenkombinationen navigieren.

Durch erneutes Drücken von Tab wird der Fokus vom Scheduler auf ein anderes Element der Seite verschoben.

### Fokus auf einem modalen Fenster

Wenn ein modales Fenster (wie ein Lightbox- oder Bestätigungsfenster) geöffnet wird, wechselt der Fokus vom Scheduler zu diesem Fenster, sodass Sie darin wie in einem normalen Formular navigieren können. Beim Schließen des Fensters kehrt der Fokus zum Scheduler zurück.

Um den Fokus programmatisch auf den Scheduler zurückzusetzen, verwenden Sie die Methode [focus](api/method/focus.md):

~~~js
scheduler.focus();
~~~

Wenn der Scheduler den Fokus zurückerhält, wird dieser auf das aktive Element im Scheduler, die erste Zeile oder das zuletzt ausgewählte Element gesetzt.

Standard-Navigationsaktionen innerhalb eines modalen Fensters sind:

- *Enter* - bestätigen und schließen
- *Escape* - schließen, ohne Änderungen zu speichern

Wenn der Fokus auf einem Formular-Button liegt, löst das Drücken von *Space* oder *Enter* die Aktion dieses Buttons aus, anstatt das Standardverhalten.

## Zellen im Fokus stylen {#stylingcellsinfocus}

Fokussierte Zellen werden standardmäßig mit einem grau/gelben Hintergrund hervorgehoben. Um diesen Stil anzupassen, ändern Sie die CSS-Klasse **.dhx_focus_slot**:

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## Scopes {#scopes}

Tastaturaktionen hängen vom Kontext ab, das heißt, verschiedene Shortcuts können verschiedenen Elementen (Scopes) im Scheduler zugewiesen werden. Die verfügbaren Scopes sind:

- **"scheduler"** - Der gesamte Scheduler
- **"timeSlot"** - Ein Zeitfenster
- **"event"** - Ein Ereignis
- **"minicalDate"** - Ein Datum im Mini-Kalender
- **"minicalButton"** - Ein Pfeil-Button im Mini-Kalender

Wenn derselbe Shortcut mehreren Scopes zugewiesen ist, hat der Shortcut des spezifischeren Elements Vorrang. Zum Beispiel überschreibt ein Shortcut auf einem Ereignis denselben Shortcut, der dem gesamten Scheduler zugewiesen ist.

### Shortcut hinzufügen

Um einen neuen Tastatur-Shortcut hinzuzufügen, verwenden Sie die Methode [addShortcut](api/method/addshortcut.md) mit drei Parametern:

- **shortcut** - (*string*) die Taste oder Tastenkombination
- **handler** - (*function*) die Funktion, die beim Auslösen des Shortcuts ausgeführt wird
- **scope** - (*string*) das Kontext-Element, dem der Handler zugeordnet wird

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    var target = e.target;
    if(target.closest("[event_id]"))
        var eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Shortcut entfernen

Um einen Shortcut aus einem Scope zu entfernen, verwenden Sie die Methode [removeShortcut](api/method/removeshortcut.md) mit zwei Parametern:

- **shortcut** - (*string*) die Taste oder Tastenkombination des Shortcuts
- **scope** - (*string*) das Kontext-Element, aus dem der Shortcut entfernt werden soll

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### Shortcut-Handler abrufen

Sie können die Handler-Funktion eines Shortcuts mit [getShortcutHandler](api/method/getshortcuthandler.md) abrufen. Diese Methode benötigt:

- **shortcut** - (*string*) die Taste oder Tastenkombination
- **scope** - (*string*) das Kontext-Element, dem der Shortcut zugeordnet ist

~~~js
var shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

Diese Methode gibt die Funktion zurück, die den Shortcut verarbeitet.

## Shortcut-Syntax {#shortcut-syntax}

Tastatur-Shortcuts können bestehen aus:

- einer Modifikatortaste plus einem Zeichen (z.B. "ctrl+a");
- einer Modifikatortaste plus einer Nicht-Zeichen-Taste (z.B. "ctrl+space");
- einer einzelnen Zeichen-Taste (z.B. "a");
- einer einzelnen Nicht-Zeichen-Taste (z.B. "space").

Mehrere Tastenkombinationen können dieselbe Aktion auslösen, indem sie durch Kommas getrennt angegeben werden, wie z.B. "ctrl+a, ctrl+space".

### Liste der unterstützten Tasten für Shortcuts

- Modifikatortasten: **shift**, **alt**, **ctrl**, **meta**
- Nicht-Zeichen-Tasten: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**, **insert**, **plus**, **f1-f12**

## Vorhandene Shortcuts {#existingshortcuts}

Der Scheduler verfügt über eine Reihe vordefinierter Shortcuts für die Navigation:

### Allgemeine Tastatur-Shortcuts

- **Tab** - fokussiert den Scheduler
- **Alt+1, Alt+2, Alt+3, ...** - wechselt zwischen Ansichten
- **Ctrl+Left/Right** - zum vorherigen/nächsten Datum wechseln
- **Ctrl+Up/Down** - scrollt den Datenbereich
- **Ctrl+Enter** - neues Ereignis erstellen
- **E, Shift+E** - nächstes/vorheriges Ereignis auswählen
- **Home** - zum aktuellen Datum springen
- **Ctrl+C, Ctrl+X, Ctrl+V** - Ereignis kopieren, ausschneiden und einfügen

### Shortcuts für Zeitfenster

- **Pfeiltasten Oben/Unten/Links/Rechts** - zwischen Zeitfenstern wechseln
- **Shift+Pfeiltasten Oben/Unten/Links/Rechts** - das ausgewählte Zeitfenster erweitern
- **Enter** - Ereignis im ausgewählten Zeitfenster erstellen

### Shortcuts für Ereignisse

- **Pfeiltasten Oben/Unten/Links/Rechts** - zu einem Zeitfenster navigieren
- **Enter** - Lightbox öffnen

### Shortcuts für Mini-Kalender

- **Tab** - fokussiert den Mini-Kalender
- **Pfeiltasten Oben/Unten/Links/Rechts** - zwischen Buttons und Daten navigieren
- **Enter** - den ausgewählten Button oder das Datum aktivieren


[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


### Zugehörige Events

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
