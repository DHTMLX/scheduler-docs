---
title: "dhtmlxScheduler in Plain JS/HTML"
sidebar_label: "dhtmlxScheduler in Plain JS/HTML"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler in Plain JS/HTML

Wenn Sie eine Anwendung mit dhtmlxScheduler entwickeln, ist das Erste, was Sie benötigen, die Scheduler zu initialisieren oder einfach gesagt, auf der Seite anzuzeigen.

Dieser Leitfaden beschreibt die Initialisierung von dhtmlxScheduler in reinem JS und HTML. Sie können auch die Anleitungen zur Integration mit Frontend-Frameworks prüfen:

<div className="framework-grid">

  <a className="framework-card" href="../../integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Verwenden Sie die fertige <code>ReactScheduler</code>-Komponente mit Props und Events.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      In Angular-Projekten den Scheduler mithilfe einer dünnen Wrapper-Schicht integrieren.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Verwenden Sie Scheduler in Vue-Apps mit einem kleinen Wrapper und reaktiver Konfiguration.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Scheduler in Salesforce Lightning Web Components verwenden und mit Organisationsdaten verbinden.
    </div>
  </a>

</div>


Es gibt zwei Möglichkeiten, den Scheduler auf einer Seite zu initialisieren:

- [über das Markup des Schedulers](#initializing-scheduler-via-markup)
- [über die Header-Konfigurations-Eigenschaft](#initializing-scheduler-via-header-config)

## Scheduler-Initialisierung über Markup

Um einen grundlegenden Scheduler über das Markup auf der Seite anzuzeigen, befolgen Sie drei Schritte: 

1. Binden Sie die [dhtmlxScheduler-Code-Dateien](#required-code-files) in die Seite ein.
2. Erstellen Sie einen DIV-Container auf der Seite und definieren Sie die zugehörigen DIV-Container für seine Elemente.
3. Initialisieren Sie dhtmlxScheduler im neu erstellten Container mit der [init](api/method/init.md)-Methode. Als Parameter erwartet die Methode einen HTML-Container (oder dessen ID), in dem der Scheduler angezeigt wird.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
    <!--Container für Scheduler und das Standard-Set an 'divs'-->
   <div id="scheduler_here" class="dhx_cal_container">
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" data-tab="day"></div>
            <div class="dhx_cal_tab" data-tab="week" ></div>
               <div class="dhx_cal_tab" data-tab="month"></div>
           </div>
        <div class="dhx_cal_header"></div>
        <div class="dhx_cal_data"></div>       
   </div>
   <script>
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Grundlegende Initialisierung](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Scheduler-Initialisierung über Header-Konfiguration

Sie müssen Scheduler auf diese Weise initialisieren, um ihn [responsiv](guides/initialization.md#making-scheduler-responsive) zu machen.

Um einen grundlegenden Scheduler auf der Seite anzuzeigen, gehen Sie wie folgt vor:

1. Binden Sie die [dhtmlxScheduler-Code-Dateien](#required-code-files) in die Seite ein.
2. Erstellen Sie einen DIV-Container auf der Seite.
3. Geben Sie die Struktur des Schedulers in dem [Header](api/config/header.md) Konfigurationsobjekt an. 
4. Initialisieren Sie dhtmlxScheduler im neu erstellten Container mit der [init](api/method/init.md)-Methode. Als Parameter erhält die Methode einen HTML-Container (oder dessen ID), in dem der Scheduler angezeigt wird.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
   <!--Container für Scheduler-->
   <div id="scheduler_here">
   </div>
</body>   
<script>
    //Die Struktur des Schedulers
    scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
    ];
    scheduler.init('scheduler_here',new Date(2027,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## Erforderliche Code-Dateien 

Die erforderlichen Code-Dateien sind:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (Sie können auch [die verfügbaren Skins erkunden](guides/skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

Lassen Sie uns schnell die Struktur des dhtmlxScheduler-Pakets erkunden, um herauszufinden, wo man die Dateien findet. 

- <b>sources</b> - Die Quellcode-Dateien der Bibliothek. Die Dateien sind nicht minifiziert und gut lesbar. Das Paket ist größtenteils für Debugging von Komponenten gedacht.
:::note
Beachten Sie, dass die **Trial**-Version der Scheduler-Bibliothek keinen **sources**-Ordner enthält.
:::
- <b>samples</b> - Die Code-Beispiele.
- <b>codebase</b> - Die gepackten Code-Dateien der Bibliothek. Diese Dateien sind wesentlich kleiner und für den Einsatz in der Produktion gedacht. <b>In Ihren Apps sollten Sie Dateien aus diesem Ordner verwenden.</b>


## Scheduler-Größen

Scheduler nimmt die volle Größe seines Container-Elements ein (*scheduler_here*-Div im obigen Beispiel), ohne es zu vergrößern.
Das bedeutet, dass, wenn Sie die Container-Höhe nicht festlegen oder sie auf 0 setzen, Scheduler ebenfalls eine Nullhöhe hat und nicht angezeigt wird.

In unseren Beispielen machen wir Scheduler typischerweise fullscreen, indem wir der Dokumenten-Body und dem Scheduler-Container sowohl Breite als auch Höhe von 100% geben:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

Es kann leicht schief gehen, wenn Sie das *scheduler_here*-Element in ein DIV mit Standardgrößen platzieren:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div class="outer_container"> /*!*/
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%;height:100%;">
~~~

Der Scheduler wird in diesem Fall nicht korrekt angezeigt, weil "scheduler_here" zu 100% seiner Elternhöhe gesetzt ist und die Größe seines Elternteils nicht festgelegt ist.

Wenn Sie relative Größen (%, Prozentangaben) für das *.dhx_cal_container*-Element verwenden, stellen Sie sicher, dass auch sein Elternteil eine Höhe festgelegt hat. Andernfalls könnte die resultierende Höhe null sein und der Scheduler wird nicht angezeigt.

Oder Sie können unterschiedliche Einheiten für die Haupt-Scheduler-Divs verwenden. Die folgenden Elemente erhalten die erwarteten Größen unabhängig von den Stilen der äußeren Elemente:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

oder:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Scheduler-Autoren resizing

Die **container_autoresize**-Erweiterung für dhtmlxScheduler ändert das Standardverhalten der Größenanpassung des Schedulers. Standardmäßig passt sich dhtmlxScheduler automatisch an seinen Container an und verwendet interne Bildlaufleisten, um alle Daten im festen Größenbereich zugänglich zu machen.

Wenn die **container_autoresize**-Erweiterung aktiviert ist, passt Scheduler seine Größe dynamisch an den gesamten Inhalt an. Das bedeutet, Scheduler erweitert sich in Höhe und/oder Breite, um alle Ereignisse und Daten anzuzeigen, ohne interne Bildlaufleisten zu benötigen. 

Dieses Verhalten stellt sicher, dass der gesamte Inhalt sichtbar ist, ohne innerhalb des Schedulers scrollen zu müssen, und ist ideal für Anwendungsfälle, in denen eine vollständige Sichtbarkeit des Scheduler-Inhalts ohne manuelles Scrollen erforderlich ist.

#### Verwendung

Um die **container_autoresize**-Erweiterung zu aktivieren, fügen Sie die Erweiterung wie folgt in Ihre Scheduler-Einrichtung ein:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autorisieren des Scheduler-Containers](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


Diese einfache Konfigurationsänderung aktiviert das **container_autoresize**-Verhalten und ermöglicht Scheduler, seine Größe basierend auf dem enthaltenen Inhalt anzupassen.

#### Behandlung der Kopfzeilen mit container_autoresize

Wenn die **container_autoresize**-Erweiterung aktiviert ist, passt Scheduler seine Größe an den gesamten Inhalt an. Dies kann dazu führen, dass Scheduler größer als der Bildschirmbereich wird, wodurch ein äußerer Container oder die Seitenleiste erscheint. 

In diesem Modus scrollt die Seite auch die Navigation und die Zeitkopien, wodurch sie beim Herunterscrollen der Seite nicht mehr sichtbar sind. Obwohl dies normalerweise das beabsichtigte Verhalten ist, gibt es Szenarien, in denen Sie möchten, dass die Kopfzeilen fest bleiben. Dies lässt sich mit zusätzlichem Code und Stil erreichen.

Um die Kopfzeilen fest zu halten, können Sie die Sticky-Position zusammen mit zusätzlichem Styling verwenden, zum Beispiel:

~~~js
<style>
    
  .dhx_cal_container{
    overflow: visible!important;
   }
  .dhx_cal_navline,
  .dhx_cal_header {
      position: sticky;
      z-index: 10;
      background:var(--dhx-scheduler-container-background);
    
  }
  .dhx_cal_navline{
      z-index: 11;
      top:0;
  }
  .dhx_cal_header{
      /* obere Koordinate wird von JS zugewiesen */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

Zusätzlich benötigen Sie etwas JavaScript, um die korrekte obere Position der Sticky-Zeitachse sicherzustellen und sie direkt unter dem Navigationspanel zu positionieren.

Da das Navigationspanel flexibel ist und seine Höhe basierend auf anderen Stilen und Inhalten anpassen kann, müssen Sie dessen Höhe dynamisch berechnen und als obere Koordinate für den Header anwenden, wie folgt:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

Schauen Sie sich die vollständige Demo im untenstehenden Snippet an:

**Zugehöriges Beispiel** [Container autoresize und sticky header]

## Scheduler responsiv machen

Wenn Sie Scheduler über [die Header-Konfigurations-Eigenschaft](#initializing-scheduler-via-header-config) initialisieren, können Sie die Header-Struktur auswählen, die zur Bildschirmgröße des Clients passt.
Es wendet außerdem bestimmte Stile an, die Elemente und Schriftgrößen auf kleinen Bildschirmen responsive machen.

Weitere Details finden Sie in einem separaten Artikel: [Mobile Responsive Scheduler](guides/touch-support.md).

## Dateien importieren in ES6/7- und TypeScript-Apps

Verwenden Sie folgenden Befehl, um Dateien zu importieren:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

Für die kommerzielle, Enterprise- oder Ultimate-Version sieht der Befehl so aus:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## Scheduler mit Vite verwenden

Falls Sie Vite in Ihrem Projekt verwenden, ist die folgende Einstellung für die **vite.config.js**-Datei erforderlich, um sicherzustellen, dass Scheduler korrekt in die App eingebunden wird:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~


Dateien in eine RequireJS-basierte App einbinden
------------------------------------------- 

Um dhtmlxScheduler-Dateien in eine RequireJS-basierte App einzubinden, sollten Sie der unten gezeigten Logik folgen:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    const scheduler = dhx.scheduler;
    const Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

Die dhtmlxScheduler-Bibliothek gibt ein Objekt mit den Feldern `scheduler` und `Scheduler` (in Commercial-, Enterprise- oder Ultimate-Versionen) zurück - die Objekte *scheduler* und *Scheduler*, die hier beschrieben werden [hier](guides/multiple-per-page.md).

:::note
Wenn Sie Scheduler mit benutzerdefinierten Erweiterungen in RequireJS verwenden, sollten Sie die `shim`-Konfiguration für RequireJS angeben und direkt die Abhängigkeit der Erweiterungen von Scheduler darin festlegen.
:::

Das folgende Beispiel zeigt, wie eine benutzerdefinierte Erweiterungsdatei *custom_tooltip_plugin.js* korrekt gesetzt werden kann:

~~~js
requirejs.config({
    paths: {
        "dhtmlxscheduler": "../../codebase/dhtmlxscheduler",
        "ext/dhtmlxscheduler_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxscheduler_custom_tooltip": ["dhtmlxscheduler"]
    }
});
 
requirejs(["dhtmlxscheduler"], 
function (dhx) {
    const scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

Überprüfen Sie, dass der Modulname für jede Datei innerhalb des Pakets als *relativer Pfad innerhalb des 'codebase'-Ordners des Pakets* plus *dem Dateinamen* angegeben wird, zum Beispiel:

**Kernbibliothek:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"