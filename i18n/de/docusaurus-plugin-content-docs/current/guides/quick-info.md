---
title: "Große Schaltflächen für einfachere Navigation"
sidebar_label: "Große Schaltflächen für einfachere Navigation"
---

# Große Schaltflächen für einfachere Navigation

Ab Version 3.7 führt dhtmlxScheduler die ["Quick Info"-Erweiterung](guides/extensions-list.md#quick-info) ein. Diese Funktion ermöglicht es, die üblichen Seitenleisten-Schaltflächen und das vereinfachte Bearbeitungsformular durch größere, benutzerfreundlichere Schaltflächen zu ersetzen.

## Aktivierung des Big-Buttons-Schedulers

Um den Big-Buttons-Scheduler zu aktivieren, müssen Sie lediglich die ["Quick Info"](guides/extensions-list.md#quick-info)-Erweiterung auf Ihrer Seite einschalten:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2009,5,30),"day");
    ...
<script>
~~~

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


Nach der Aktivierung ersetzt der Scheduler automatisch die Standard-Schaltflächen durch größere Versionen:

![quick_info_extension.png](/img/quick_info_extension.png)

## Konfiguration und Anpassung des Big-Buttons-Schedulers

Es stehen mehrere APIs zur Verfügung, um den Big-Buttons-Scheduler zu konfigurieren oder anzupassen:

- **3 Templates**

- [quick_info_content](api/template/quick_info_content.md) - steuert den Inhalt, der im Pop-up-Bearbeitungsformular angezeigt wird
- [quick_info_date](api/template/quick_info_date.md) - steuert das Datum, das im Pop-up-Bearbeitungsformular angezeigt wird
- [quick_info_title](api/template/quick_info_title.md) - steuert den Titel des Pop-up-Bearbeitungsformulars


- **1 Konfigurationsoption**


- [quick_info_detached](api/config/quick_info_detached.md) - legt fest, ob das Ereignisformular von der linken/rechten Seite des Bildschirms oder neben dem ausgewählten Ereignis erscheint


- **2 Methoden**


- [hideQuickInfo](api/method/hidequickinfo.md) - blendet das Pop-up-Ereignisformular aus, falls es derzeit geöffnet ist
- [showQuickInfo](api/method/showquickinfo.md) - öffnet das Pop-up-Ereignisformular für das angegebene Ereignis
