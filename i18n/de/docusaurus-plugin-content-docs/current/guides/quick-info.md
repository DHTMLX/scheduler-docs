---
title: "Große Schaltflächen für einfachere Navigation"
sidebar_label: "Große Schaltflächen für einfachere Navigation"
---

# Große Schaltflächen für einfachere Navigation

Ab Version 3.7 bietet dhtmlxScheduler die neue Erweiterung ["Quick Info" extension](guides/extensions-list.md#quick-info). Die Erweiterung ermöglicht es, Standard-Seitenleisten-Schaltflächen und das vereinfachte Bearbeitungsformular durch neue (größere und handlichere) zu ersetzen.

## Aktivierung des Schedulers mit großen Buttons

Um den Scheduler mit großen Buttons zu aktivieren, aktivieren Sie die ["Quick Info"](guides/extensions-list.md#quick-info) Erweiterung auf der Seite:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2027,5,30),"day");
    ...
<script>
~~~

[Touch-orientierter Scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


Sobald die Erweiterung aktiviert ist, ersetzt der Scheduler automatisch die Standard-Schaltflächen durch größere Buttons:

![quick_info_extension.png](/img/quick_info_extension.png)

## Konfigurieren und Anpassen des Schedulers mit großen Buttons

Um den Scheduler mit großen Buttons zu konfigurieren oder anzupassen, stehen Ihnen folgende APIs zur Verfügung:

- **3 Vorlagen** 

- [quick_info_content](api/template/quick_info_content.md) - definiert den Inhalt des Pop-up-Bearbeitungsformulars
- [quick_info_date](api/template/quick_info_date.md) - definiert das Datum des Pop-up-Bearbeitungsformulars
- [quick_info_title](api/template/quick_info_title.md) - definiert den Titel des Pop-up-Bearbeitungsformulars


- **1 Konfigurationsoption**  

- [quick_info_detached](api/config/quick_info_detached.md) - definiert, ob das Ereignisformular von der linken oder rechten Seite des Bildschirms erscheint oder in der Nähe des ausgewählten Ereignisses

- **2 Methoden** 

- [hideQuickInfo](api/method/hidequickinfo.md) - versteckt das Pop-up-Ereignisformular (falls es derzeit aktiv ist)
- [showQuickInfo](api/method/showquickinfo.md) - zeigt das Pop-up-Ereignisformular für das angegebene Ereignis an