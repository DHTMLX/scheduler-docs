---
title: "Allgemeine Konfigurationsanweisungen"
sidebar_label: "Allgemeine Konfigurationsanweisungen"
---

# ## Allgemeine Konfigurationsanweisungen 

Um das Erscheinungsbild des Schedulers anzupassen, stellt die Bibliothek drei Hauptobjekte zur Verfügung:

- [scheduler.config](api/api_overview.md#scheduler-properties) - Optionen für Datumsangaben, Skalen, Steuerelemente und mehr.
- [scheduler.templates](api/api_overview.md#scheduler-templates) - Vorlagen zur Formatierung von Datumsangaben, Titeln, Tooltips und für das Styling.
- [scheduler.xy](api/other/xy.md) - Einstellungen, die die Größen verschiedener Scheduler-Elemente festlegen.

Zusätzlich enthält dhtmlxScheduler [mehrere Erweiterungen](#extensions), um die Funktionalität der Komponente zu erweitern.

## scheduler.config {#schedulerconfig}

Die Bibliothek bietet eine Vielzahl von Konfigurationsoptionen innerhalb des **scheduler.config**-Objekts.

Um eine Option anzuwenden, weisen Sie sie einfach wie in dieser Dokumentation gezeigt zu (oder ersetzen Sie *scheduler* durch den Namen Ihrer spezifischen *dhtmlxScheduler-Instanz*, falls Sie [mehrere Scheduler auf der Seite](guides/multiple-per-page.md) verwenden).

Beachten Sie, dass die Konfigurationseinstellungen vor der Initialisierung des Schedulers angewendet werden müssen.

~~~js
scheduler.config.first_hour = 8;/*!*/
scheduler.config.last_hour = 17;/*!*/
scheduler.config.start_on_monday = true;/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

Eine vollständige Liste der **scheduler.config**-Eigenschaften finden Sie unter [Scheduler API: Properties](api/overview/properties_overview.md).


[Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)


## scheduler.templates {#schedulertemplates}

Mit Vorlagen können Sie anpassen, wie Datumsangaben und Titel im Scheduler angezeigt werden.

Um eine Vorlage zu definieren, weisen Sie sie wie hier demonstriert zu (oder ersetzen Sie *scheduler* durch den Namen Ihrer spezifischen *dhtmlxScheduler-Instanz*, falls Sie [mehrere Scheduler auf der Seite](guides/multiple-per-page.md) verwenden). Stellen Sie sicher, dass Sie Vorlagen vor der Initialisierung des Schedulers definieren.

~~~js
scheduler.templates.event_text = function(start,end,ev){/*!*/
   return 'Subject: ' + ev.text + '';/*!*/
};/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

:::note
Es wird empfohlen, Vorlagen innerhalb der Handler-Funktion für das [onTemplatesReady](api/event/ontemplatesready.md)-Ereignis neu zu definieren, um zu verhindern, dass Ihre Vorlagen durch die Standardvorlagen überschrieben werden.
:::

![templates.png](/img/templates.png)

Eine vollständige Liste der verfügbaren Vorlagen finden Sie unter [Scheduler API: Templates](api/overview/templates_overview.md).


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## scheduler.xy {#schedulerxy}

Das [scheduler.xy](api/other/xy.md) -Objekt enthält Eigenschaften, mit denen Sie Breiten, Höhen und Abstände der Scheduler-Elemente in verschiedenen Ansichten steuern können.

Um diese Optionen festzulegen, weisen Sie Werte wie gezeigt zu (oder ersetzen Sie *scheduler* durch den Namen Ihrer spezifischen *dhtmlxScheduler-Instanz*, falls Sie [mehrere Scheduler auf der Seite](guides/multiple-per-page.md) verwenden). Denken Sie daran, die Größeneinstellungen vor der Initialisierung des Schedulers anzuwenden.

~~~js
scheduler.xy.scale_height = 40; //setzt die Höhe der X-Achse /*!*/
scheduler.init('scheduler_here',new Date(),"month");
~~~

:::note
Alle Eigenschaften in scheduler.xy verwenden den Datentyp 'number'.
:::


[Customizing the scheduler header](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/03_header_format.html)


## Erweiterungen {#extensions}

Mehrere Erweiterungen können aktiviert werden, um dem Scheduler-Komponenten spezielle Funktionen hinzuzufügen. Beispielsweise ermöglicht die Aktivierung der **cookie**-Erweiterung dem Scheduler, seinen aktuellen Zustand (wie Modus und Datum) in Cookies zu speichern.

~~~js
scheduler.plugins({
    cookie: true
});
~~~


[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


Eine Liste verfügbarer Scheduler-Erweiterungen finden Sie im Artikel [Vollständige Liste der Erweiterungen](guides/extensions-list.md).
