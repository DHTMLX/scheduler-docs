---
title: "dhtmlxScheduler mit Angular"
sidebar_label: "dhtmlxScheduler mit Angular"
---

# dhtmlxScheduler mit Angular

Diese Anleitung setzt voraus, dass Sie ein grundlegendes Verständnis von Angular-Konzepten und -Mustern haben. Falls nicht, empfiehlt es sich, die [Angular-Dokumentation](https://angular.io/docs) für ein einsteigerfreundliches Tutorial zu lesen.

DHTMLX Scheduler funktioniert reibungslos mit Angular. Ein praktisches Beispiel finden Sie auf GitHub: [DHTMLX Scheduler mit Angular Demo](https://github.com/DHTMLX/angular-scheduler-demo).

## Erstellen eines Projekts

Stellen Sie vor dem Start eines neuen Projekts sicher, dass [Angular CLI](https://angular.io/cli) und [Node.js](https://nodejs.org/en/) installiert sind. Führen Sie dann folgenden Befehl aus:

~~~
ng new my-angular-scheduler-app
~~~

Dieser Befehl richtet alle benötigten Tools und Abhängigkeiten ein, sodass keine weiteren Schritte erforderlich sind.

### Installation der Abhängigkeiten

Navigieren Sie anschließend in den App-Ordner:

~~~
cd my-angular-scheduler-app
~~~

Starten Sie die App mit einem der folgenden Befehle:

~~~
yarn start
~~~

oder

~~~
npm start
~~~

Die App sollte nun unter [http://localhost:4200](http://localhost:4200) erreichbar sein.

![Scheduler mit Angular](/img/scheduler_angular_front.png)

## Scheduler erstellen

Um den DHTMLX Scheduler hinzuzufügen, stoppen Sie zunächst die laufende App mit **Strg+C** im Terminal. Installieren Sie dann das Scheduler-Paket.

## Schritt 1. Paketinstallation

PRO-Versionen der Bibliothek sind per **npm/yarn** aus unserem privaten Repository verfügbar. Folgen Sie 
[dieser Anleitung](/guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion haben, installieren Sie sie mit:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternativ, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es auch 
[aus einem lokalen Ordner installieren](/guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie eine neue Komponente zur Integration des Schedulers. Legen Sie im Verzeichnis ***src/app/*** einen ***scheduler***-Ordner an und fügen Sie folgende Dateien hinzu: ***scheduler.component.ts***, ***scheduler.component.css*** und ***scheduler.component.html***.

Fügen Sie in ***scheduler.component.html*** diese Vorlage für den Scheduler ein:

~~~js title="scheduler/scheduler.component.html"
<div #scheduler_here class="dhx_cal_container">
   <div class="dhx_cal_navline">
       <div class="dhx_cal_prev_button"></div>
       <div class="dhx_cal_next_button"></div>
       <div class="dhx_cal_today_button"></div>
       <div class="dhx_cal_date"></div>
       <div class="dhx_cal_tab" data-tab="day"></div>
       <div class="dhx_cal_tab" data-tab="week"></div>
       <div class="dhx_cal_tab" data-tab="month"></div>
   </div>
   <div class="dhx_cal_header"></div>
   <div class="dhx_cal_data"></div>
</div>
~~~

Deklarieren Sie die Scheduler-Styles separat in ***scheduler.component.css***. Hier ein einfaches Beispiel:

~~~js title="scheduler/scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
:host {
   display: block;
   position: relative;
   height: 100%;
   width: 100%;
}
~~~

Um sicherzustellen, dass der Scheduler-Container den gesamten Body ausfüllt, fügen Sie diese Styles zu ***styles.css*** im ***src***-Ordner hinzu:

~~~js title="src/styles.css"
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

### Importieren der Quelldateien

Öffnen Sie ***scheduler.component.ts*** und ***scheduler.component.css***, um die Scheduler-Quelldateien zu importieren. Je nach Installationsmethode:

- Bei Installation aus einem lokalen Ordner sehen die Importe so aus:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- Bei Verwendung der Trial-Version sollten die Importe so aussehen:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

In diesem Tutorial wird die **trial**-Version verwendet.

### Container setzen und Scheduler hinzufügen

Um den Scheduler auf der Seite anzuzeigen, muss der Container gesetzt werden, in dem er gerendert wird. Hier der Code:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

Hier initialisiert der **ngOnInit()**-Lebenszyklus-Hook den Scheduler, und **ngOnDestroy()** ruft [**scheduler.destructor()**](api/method/destructor.md) auf, um beim Zerstören der Komponente aufzuräumen.

## Schritt 3. Scheduler in die App einfügen

Ersetzen Sie als Nächstes den Standardinhalt durch die Scheduler-Komponente. Öffnen Sie ***src/app/app.component.ts*** und aktualisieren Sie die Datei wie folgt:

~~~js title="src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<scheduler></scheduler>`,
})
export class AppComponent {
  name = '';
}
~~~

Erstellen Sie ***app.module.ts*** in ***src/app/*** und binden Sie *SchedulerComponent* wie folgt ein:

~~~js title="src/app/app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
 
@NgModule({
  declarations: [AppComponent, SchedulerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

Aktualisieren Sie abschließend ***src/main.ts*** und ersetzen Sie den Inhalt durch:

~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

Nachdem Sie die App erneut gestartet haben, sollte ein leerer Scheduler auf der Seite erscheinen.

![Scheduler in eine App einfügen](/img/scheduler_angular_init.png)

## Schritt 4. Daten bereitstellen

Um das Laden von Daten im Angular Scheduler zu ermöglichen, muss ein Event-Service hinzugefügt werden. Zuvor ist es notwendig, das Event-Modell zu definieren.

Um das Event-Modell zu erstellen, verwenden Sie folgenden Befehl:

~~~
ng generate class models/event --skip-tests
~~~

Fügen Sie in der neu erstellten Datei ***event.ts*** im ***models***-Ordner folgenden Code hinzu:

~~~js title="models/event.ts"
export class Event {
    id!:  number;
    start_date!: string;
    end_date!: string;
    text!: string;
}
~~~

Erstellen Sie als Nächstes einen Event-Service. Dieser Service ist eine Klasse, die für das Verwalten bestimmter Events zuständig ist. In Angular können Services per Dependency Injection eingebunden werden. Sie können Daten, Funktionen oder Features enthalten, die von der Anwendung benötigt werden. Hier wird ein Data-Service erstellt, der dem Scheduler Events bereitstellt.

Um den Event-Service zu generieren, führen Sie aus:

~~~
ng generate service services/event --flat --skip-tests
~~~

Fügen Sie in der neu erstellten Datei ***event.service.ts*** im ***services***-Ordner folgenden Code ein:

~~~js title="services/event.service.ts"
import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2023-05-16 09:00", end_date: "2023-05-16 13:00", 
                text: "Event 1" },
            { id: 2, start_date: "2023-05-18 10:00", end_date: "2023-05-18 14:00", 
                text: "Event 2" },
        ]);
    }
}
~~~

Der **@Injectable()**-Decorator kennzeichnet diesen Service als für die Injektion verfügbar. Dieser Service wird später in die Komponente eingebunden.

Aktuell gibt die **get()**-Methode ein aufgelöstes Promise mit fest kodierten Events zurück. Es ist auch möglich, Daten vom Server zu laden und ein Promise zurückzugeben. Die Scheduler-Komponente wird **EventService** nutzen, um Events zu erhalten. Um dies einzurichten, fügen Sie **EventService** in ***scheduler.component.ts*** ein:

~~~js title="scheduler.component.ts"
import {EventService} from "../services/event.service";
~~~

Geben Sie dann **EventService** als Provider im **@Component**-Decorator an:

~~~js title="scheduler.component.ts"
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})
~~~

Dies stellt sicher, dass bei jeder Erstellung einer *SchedulerComponent* eine neue Instanz des Service bereitgestellt wird. Um den Service in die Komponente zu injizieren, fügen Sie diesen Konstruktor in die **SchedulerComponent**-Klasse ein:

~~~js title="scheduler.component.ts"
constructor(private eventService: EventService){}
~~~

Aktualisieren Sie die **ngOnInit()**-Methode, um:

- das Datumsformat für das Laden der Events festzulegen (hier wird das XML-Format verwendet)
- den Service aufzurufen, um Events zu erhalten und auf die Daten zu warten, bevor sie an den Scheduler übergeben werden

~~~js title="scheduler.component.ts"
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 9, 7));
this.eventService.get()
    .then((data) => {
         scheduler.parse(data);
    });
~~~

Die vollständige Datei ***scheduler.component.ts*** sieht dann so aus:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";
import {EventService} from "../services/event.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this.eventService.get().then((data) => {scheduler.parse(data);});
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

Nach dem erneuten Öffnen der App-Seite sollte der Scheduler die Events anzeigen.

![Scheduler mit Angular-Events](/img/scheduler_angular_events.png)

## Schritt 5. Daten speichern

Um Änderungen, die im Scheduler vorgenommen werden, nachzuverfolgen, kann ein [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html)-Handler verwendet werden, um mit dem Backend zu kommunizieren. Dieser Handler kann als Funktion oder als Router-Objekt definiert werden. dhtmlxScheduler unterstützt Promise-Antworten vom Handler, was eine ordnungsgemäße Verarbeitung der Aktionen gewährleistet.

Ein **DataProcessor** kann mit der **createDataProcessor()**-API-Methode erstellt werden, um Änderungen zu erfassen, wie im folgenden Beispiel:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Falls der Service die Event-ID nach dem Erstellen eines neuen Eintrags ändert (was häufig der Fall ist), sollte das Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgeben. Dadurch kann der Scheduler den Eintrag mit der neuen Datenbank-ID aktualisieren.

Weitere Informationen zur serverseitigen Integration finden Sie [hier](/guides/server-integration.md).

Der Angular Scheduler ist nun eingerichtet. Sie können sich gerne [das vollständige Demo auf GitHub ansehen](https://github.com/DHTMLX/angular-scheduler-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass der Scheduler selbst keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen bietet. Die Sicherheit der Anwendung liegt in der Verantwortung der Backend-Entwickler.

Weitere Informationen zu möglichen Schwachstellen und empfohlenen Sicherheitspraktiken finden Sie im Artikel [Application Security](/guides/app-security.md).
