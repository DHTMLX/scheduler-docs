---
title: "dhtmlxScheduler in Plain JS/HTML"
sidebar_label: "dhtmlxScheduler in Plain JS/HTML"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler in Plain JS/HTML

Beim Erstellen einer Anwendung mit dhtmlxScheduler besteht der erste Schritt darin, den Scheduler auf der Seite einzurichten und anzuzeigen.

In dieser Anleitung erfahren Sie, wie Sie dhtmlxScheduler mit einfachem JS und HTML initialisieren. Für die Integration in Frontend-Frameworks können Sie die folgenden Anleitungen nutzen:

<div className="framework-grid">

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Use the ready-made <code>ReactScheduler</code> component with props and events.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrate Scheduler into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Use Scheduler inside Vue apps with a small wrapper and reactive configuration.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>
</div>


Es gibt zwei Ansätze, um den Scheduler auf einer Seite zu initialisieren:

- [über das Markup des Schedulers](#initializing-scheduler-via-markup)
- [über die Header-Konfigurationseigenschaft](#initializing-scheduler-via-header-config)

## Initialisierung des Schedulers über Markup {#initializing-scheduler-via-markup}

Um einen grundlegenden Scheduler über Markup auf der Seite einzurichten, gehen Sie wie folgt vor:

1. Fügen Sie die [dhtmlxScheduler-Code-Dateien](#requiredcodefiles) in Ihre Seite ein.
2. Fügen Sie einen DIV-Container auf der Seite hinzu, zusammen mit den erforderlichen untergeordneten DIVs für dessen Elemente.
3. Initialisieren Sie dhtmlxScheduler im erstellten Container mit der Methode [init](api/method/init.md). Diese Methode erwartet ein HTML-Container-Element (oder dessen ID), in dem der Scheduler gerendert wird.

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
   <script type="text/javascript">
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Initialisierung des Schedulers über die Header-Konfiguration {#initializing-scheduler-via-header-config}

Diese Methode wird empfohlen, wenn Sie den Scheduler [responsiv](guides/initialization.md#makingschedulerresponsive) gestalten möchten.

Um einen grundlegenden Scheduler auf der Seite einzurichten, gehen Sie wie folgt vor:

1. Fügen Sie die [dhtmlxScheduler-Code-Dateien](#requiredcodefiles) in Ihre Seite ein.
2. Fügen Sie einen DIV-Container auf der Seite hinzu.
3. Definieren Sie die Struktur des Schedulers im Konfigurationsobjekt [header](api/config/header.md).
4. Initialisieren Sie dhtmlxScheduler im Container mit der Methode [init](api/method/init.md). Übergeben Sie dabei den Container (oder dessen ID) als Parameter.

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
    scheduler.init('scheduler_here',new Date(2020,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## Erforderliche Code-Dateien {#requiredcodefiles}

Die einzubindenden Dateien sind:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (weitere verfügbare Skins finden Sie in [Skins](guides/skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

Hier ein kurzer Überblick über die Struktur des dhtmlxScheduler-Pakets, um Ihnen das Auffinden der Dateien zu erleichtern:

- <b>sources</b> - enthält die Quellcodedateien der Bibliothek. Diese sind nicht minifiziert und gut lesbar, hauptsächlich für Debugging-Zwecke.
:::note
Beachten Sie, dass die **Trial**-Version der Scheduler-Bibliothek keinen **sources**-Ordner enthält.
:::
- <b>samples</b> - enthält Beispielcode.
- <b>codebase</b> - enthält die gepackten Code-Dateien der Bibliothek. Diese sind kleiner und für den Produktionseinsatz vorgesehen. <b>In Ihren Projekten sollten Sie die Dateien aus diesem Ordner verwenden.</b>


## Größenanpassung des Schedulers {#schedulersizing}
------------------------------ 

Der Scheduler nimmt die gesamte Größe seines Containerelements ein (*scheduler_here*-div in den obigen Beispielen), ohne das Container-Element selbst zu vergrößern. 
Das bedeutet: Wenn Sie keine Höhe für den Container festlegen oder diese auf null gesetzt ist, hat auch der Scheduler eine Höhe von null und ist nicht sichtbar.

In unseren Beispielen nimmt der Scheduler in der Regel den gesamten Bildschirm ein, indem sowohl dem Dokumenten-Body als auch dem Scheduler-Container 100% Breite und Höhe zugewiesen werden:

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

Probleme können auftreten, wenn das *scheduler_here*-Element in einem Div mit Standardgrößeneinstellungen platziert wird:

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

In diesem Fall wird der Scheduler nicht korrekt angezeigt, da "scheduler_here" auf 100% seines Elternelements gesetzt ist, das Elternelement aber keine definierte Größe hat.

Wenn Sie relative Größen (Prozentwerte) für das *.dhx_cal_container*-Element verwenden, stellen Sie sicher, dass auch das Elternelement eine Höhe besitzt. Andernfalls kann die berechnete Höhe null sein und der Scheduler wird nicht angezeigt.

Alternativ können Sie für das Hauptdiv des Schedulers auch andere Einheiten verwenden. Die folgenden Beispiele sorgen für die erwartete Größe, unabhängig von den Stilen der äußeren Elemente:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

oder:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Automatische Größenanpassung des Schedulers {#containerautoresizing}

Die **container_autoresize**-Erweiterung verändert das Standardverhalten der Größenanpassung des Schedulers. Normalerweise passt sich dhtmlxScheduler an die Größe seines Containers an und zeigt bei Bedarf interne Scrollbalken, um alle Daten innerhalb des festen Containers anzuzeigen.

Mit aktivierter **container_autoresize**-Erweiterung passt sich der Scheduler dynamisch an den Inhalt an. Das bedeutet, er wächst in der Höhe und/oder Breite, um alle Ereignisse und Daten ohne interne Scrollbalken anzuzeigen.

Dadurch wird sichergestellt, dass alles sichtbar ist, ohne innerhalb des Schedulers scrollen zu müssen - besonders nützlich, wenn die vollständige Sichtbarkeit des Inhalts ohne manuelles Scrollen gewünscht ist.

#### Verwendung

Um die **container_autoresize**-Erweiterung zu aktivieren, binden Sie sie wie folgt in Ihre Scheduler-Konfiguration ein:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


Mit dieser einfachen Konfiguration aktivieren Sie das **container_autoresize**-Feature und ermöglichen es dem Scheduler, seine Größe automatisch an den Inhalt anzupassen.


#### Umgang mit Kopfzeilen bei container_autoresize

Wenn die **container_autoresize**-Erweiterung aktiviert ist, passt sich der Scheduler automatisch so an, dass er allen Inhalt anzeigt. Dies kann dazu führen, dass der Scheduler über die Bildschirmgröße hinausgeht, wodurch Scrollbalken auf der Seite oder im äußeren Container erscheinen.

In diesem Modus bewegen sich beim Scrollen der Seite auch die Navigations- und Zeit-Kopfzeilen, sodass sie beim Herunterscrollen nicht sichtbar bleiben. Dieses Verhalten ist normalerweise in Ordnung, aber in manchen Fällen ist es wünschenswert, die Kopfzeilen fixiert anzuzeigen. Dies lässt sich mit zusätzlichem Styling und Skripting erreichen.

Um die Kopfzeilen zu fixieren, können Sie CSS-Sticky-Positionierung zusammen mit weiteren Stilen verwenden, zum Beispiel:

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
      /* top coordinate is assigned from JS */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

Zusätzlich ist etwas JavaScript notwendig, um die korrekte obere Position der sticky Zeit-Skala zu setzen, damit sie direkt unterhalb des Navigationsbereichs liegt.

Da die Höhe des Navigationsbereichs je nach Stil und Inhalt variieren kann, sollte die Höhe dynamisch berechnet und als oberer Wert für die Kopfzeile gesetzt werden, z. B.:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

Ein vollständiges Beispiel finden Sie im folgenden Snippet:

**Related sample** [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## Scheduler responsiv machen {#makingschedulerresponsive}

Wenn der Scheduler über [die header-Konfigurationseigenschaft](#initializing-scheduler-via-header-config) initialisiert wird, kann ein Kopfzeilen-Layout gewählt werden, das zur Bildschirmgröße des Clients passt. Es werden außerdem bestimmte Stile angewendet, die Elemente und Schriftgrößen besser an kleinere Bildschirme anpassen.

Weitere Informationen finden Sie im Artikel: [Mobile Responsive Scheduler](guides/touch-support.md).

## Dateien in ES6/7- und TypeScript-Anwendungen importieren {#import-files-into-es67-and-typescript-apps}

Verwenden Sie diesen Befehl, um die Dateien zu importieren:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

Für die Commercial-, Enterprise- oder Ultimate-Versionen sieht der Import so aus:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## Scheduler mit Vite verwenden {#usingschedulerwithvite}

Wenn Ihr Projekt Vite verwendet, fügen Sie folgende Einstellung zur **vite.config.js**-Datei hinzu, damit der Scheduler korrekt in Ihre App eingebunden wird:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~

## Dateien in eine RequireJS-basierte Anwendung einbinden {#includefilesintoarequirejsbasedapp}
------------------------------------------------------ 

Um dhtmlxScheduler-Dateien in einer RequireJS-basierten Anwendung einzubinden, gehen Sie wie im folgenden Beispiel vor:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    var scheduler = dhx.scheduler;
    var Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

Die dhtmlxScheduler-Bibliothek gibt ein Objekt zurück, das `scheduler` und `Scheduler` enthält (in Commercial-, Enterprise- oder Ultimate-Versionen) - diese entsprechen den *scheduler*- und *Scheduler*-Objekten, die [hier](guides/multiple-per-page.md) beschrieben sind.

:::note
Wenn Sie Scheduler mit benutzerdefinierten Erweiterungen in RequireJS verwenden, stellen Sie sicher, dass Sie die `shim`-Konfiguration für RequireJS angeben und die Abhängigkeiten der Erweiterungen vom Scheduler entsprechend deklarieren.
:::

Das folgende Beispiel zeigt, wie Sie eine benutzerdefinierte Erweiterungsdatei *custom_tooltip_plugin.js* korrekt einbinden:

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
    var scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

Stellen Sie sicher, dass der Modulname für jede Datei im Paket als *relativer Pfad innerhalb des 'codebase'-Ordners des Pakets* plus *Dateiname* angegeben wird, zum Beispiel:

**Kernbibliothek:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"
