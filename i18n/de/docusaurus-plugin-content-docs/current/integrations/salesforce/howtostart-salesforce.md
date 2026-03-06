---
title: "dhtmlxScheduler mit SalesForce LWC"
sidebar_label: "dhtmlxScheduler mit SalesForce LWC"
---

# dhtmlxScheduler mit SalesForce LWC

Dieses Tutorial zeigt, wie Sie dhtmlxScheduler in eine [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide) integrieren.

Wenn Sie mit einer anderen Technologie arbeiten, finden Sie unten weitere Integrationsmöglichkeiten:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Wir verwenden die [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli), um die Lightning Web Component zu erstellen und in Ihre Organisation zu deployen. Details zur Installation finden Sie in [diesem Artikel](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm). Zusätzlich können Sie das [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)" für Visual Studio Code installieren, um die Arbeit mit Entwicklungsumgebungen zu erleichtern.

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo) verfügbar.
:::

Hier finden Sie ein Video-Tutorial, das zeigt, wie Scheduler mit Salesforce LWC erstellt wird.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Voraussetzungen

Stellen Sie sicher, dass die [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli) installiert ist. Falls nicht, finden Sie in [diesem Artikel](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) Anweisungen zur Einrichtung.

## Schritt 1. Projekt erstellen

Falls Sie noch keinen Account haben, können Sie sich [hier](https://developer.salesforce.com/) für ein kostenloses Entwicklerkonto registrieren. Dieser [Artikel](https://webkul.com/blog/create-free-developer-account-in-salesforce/) bietet hilfreiche Hinweise.

Verwenden Sie die Suchleiste auf der linken Seite, um *Dev Hub* zu finden und auszuwählen:

![](/img/sf_devhub.png)

Aktivieren Sie anschließend im sich öffnenden Einstellungsfenster *Dev Hub*:

![](/img/sf_enabledh.png)

Erstellen Sie nun einen Basisordner für Ihr Salesforce DX-Projekt:

~~~js
$ mkdir ~/salesforce
~~~

Erzeugen Sie ein Salesforce DX-Projekt mit der CLI:

~~~js
$ cd ~/salesforce
$ sfdx project generate -n scheduler-salesforce-app
    target dir = C:UsersUsersalesforce
        create scheduler-salesforce-appconfigproject-scratch-def.json
        create scheduler-salesforce-appguides/README.md
        create scheduler-salesforce-appsfdx-project.json
        create scheduler-salesforce-app.huskypre-commit
        create scheduler-salesforce-app.vscodeextensions.json
        create scheduler-salesforce-app.vscodelaunch.json
        create scheduler-salesforce-app.vscodesettings.json
        create scheduler-salesforce-appforce-appmaindefaultlwc.eslintrc.json
        create scheduler-salesforce-appforce-appmaindefaultaura.eslintrc.json
        create scheduler-salesforce-appscriptssoqlaccount.soql
        create scheduler-salesforce-appscriptsapexhello.apex
        create scheduler-salesforce-app.eslintignore
        create scheduler-salesforce-app.forceignore
        create scheduler-salesforce-app.gitignore
        create scheduler-salesforce-app.prettierignore
        create scheduler-salesforce-app.prettierrc
        create scheduler-salesforce-appjest.config.js
        create scheduler-salesforce-apppackage.json
~~~

Wechseln Sie in den neuen Projektordner:

~~~js
$ cd scheduler-salesforce-app
~~~

## Schritt 2. Autorisierung

Autorisieren Sie Ihre Organisation über den Web Server Flow mit folgendem Befehl:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

Aktualisieren Sie anschließend Ihre Projektkonfigurationsdatei (*sfdx-project.json*), indem Sie den Parameter "sfdcLoginUrl" auf Ihre "My Domain URL" setzen. Diese URL finden Sie auf der "My Domain"-Einrichtungsseite Ihrer Organisation. Zum Beispiel:

![](/img/sf_mydomain.png)

~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Erstellen Sie eine Scratch Org mit folgendem Befehl:

~~~js
$ sfdx org create scratch -f config/project-scratch-def.json -d


Creating Scratch Org...
RequestId: 2SR8a000000PLf5GAG (https://xbs2-dev-ed.my.salesforce.com/2SR8a000000PLf5GAG)
OrgId: 00D8G000000EEMs
Username: test-3baxo2k0tpej@example.com
✓ Prepare Request
✓ Send Request
✓ Wait For Org
✓ Available
✓ Authenticate
✓ Deploy Settings
Done


Your scratch org is ready. 
~~~

## Schritt 3. Scheduler zu Salesforce hinzufügen

Um die Bibliothek zu verwenden, laden Sie sie als Static Resource in Salesforce hoch. Öffnen Sie Ihre Scratch Org mit folgendem Befehl:

~~~js
$ sfdx org open
~~~

Navigieren Sie dann zum Tab "Static Resources" und klicken Sie auf "New":

![](/img/sf_staticresources.png)

Geben Sie der Resource einen eindeutigen Namen (hier *dhtmlxscheduler*), laden Sie das ZIP-Archiv mit den Bibliotheksdateien (*dhtmlxscheduler.js* und *dhtmlxscheduler.css*) hoch und setzen Sie Cache Control auf "Public", um die Performance zu verbessern. Klicken Sie auf "Save".


![/img/sf_load_zip.png](/img/sf_load_zip.png)

Ab jetzt steht dhtmlxScheduler innerhalb von Salesforce zur Verfügung.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## Schritt 4. Datenmodell erstellen

Events sind die Kernelemente in dhtmlxScheduler. Eine praktische Möglichkeit zur Verwaltung besteht darin, alle Eigenschaften als einfaches JSON in Salesforce zu speichern. Erstellen Sie dazu ein neues Event-Objekt. Öffnen Sie den Object Manager, wählen Sie dann "Create" und anschließend "Custom Object":

![sf_new_object](/img/sf_new_object.png)

### **Ereignisobjekt**

Nennen Sie das Ereignisobjekt *SchedulerEvent* oder *SchedulerEvents*.


![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
Stellen Sie sicher, dass der Datensatzname mit dem Objektnamen übereinstimmt, zum Beispiel:

Objektname: SchedulerEvent => Datensatzname: SchedulerEvent Name
:::

Klicken Sie auf die Schaltfläche „Speichern".

Nachdem das Objekt erstellt wurde, wechseln Sie zum Tab "Felder & Beziehungen" und klicken Sie auf die Schaltfläche "Neu".


![sf_new_field](/img/sf_new_field.png)

- **Startdatum**

Wählen Sie "Datum/Uhrzeit" als Datentyp aus und klicken Sie auf "Weiter".


![sf_field_type](/img/sf_field_type.png)

Nennen Sie dieses Feld "Start Date". Dieses Feld enthält die JSON-serialisierten Task-Eigenschaften.


![sf_start_date](/img/sf_start_date.png)

Klicken Sie auf "Weiter" und übernehmen Sie alle Standardeinstellungen, bis die Schaltfläche "Speichern & Neu" erscheint.

- **Enddatum**

Fügen Sie das Feld "End Date" hinzu und wählen Sie "Datum/Uhrzeit" als Datentyp aus.

![sf_end_date](/img/sf_end_date.png)

Klicken Sie auf "Weiter" und übernehmen Sie die Standardeinstellungen, bis die Schaltfläche "Speichern & Neu" verfügbar ist.

- **Text**

Erstellen Sie ein "Text"-Feld und wählen Sie "Text" als Datentyp aus.

![sf_text](/img/sf_text.png)

Klicken Sie auf "Weiter" und übernehmen Sie alle Standardeinstellungen, bis die Schaltfläche "Speichern" verfügbar ist.

Am Ende sollten die Felder wie folgt aussehen:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## Schritt 5. Erstellen einer Lightning Web Component

Um eine Lightning Web Component zu erstellen, verwenden Sie folgenden Befehl:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

Passen Sie die Komponentendefinition in *scheduler.js-meta.xml* an, um sie im Lightning App Builder verfügbar zu machen:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.js-meta.xml"
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>57.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__AppPage">
            <property name="height" label="Height" type="Integer" default="800" />
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
~~~

Öffnen Sie *scheduler.html* und fügen Sie folgenden Code ein:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual"></div>
</template>
~~~

Öffnen Sie anschließend *scheduler.js* und fügen Sie folgenden Code hinzu:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.js"
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";
 
// Static resources
import SchedulerFiles from "@salesforce/resourceUrl/dhtmlxscheduler";
 
// Controllers
import getEvents from "@salesforce/apex/SchedulerData.getEvents";
 
function unwrap(fromSF) {
    const data = fromSF.events.map((a) => ({
        id: a.Id,
        info: a.Name,
        start_date: a.Start_Date__c,
        end_date: a.End_Date__c,
        text: a.Text__c,
    }));
 
    return { data };
}
 
export default class SchedulerView extends LightningElement {
    static delegatesFocus = true;
 
    @api height;
    schedulerInitialized = false;
 
    renderedCallback() {
        if (this.schedulerInitialized) {
            return;
        }
        this.schedulerInitialized = true;
 
        Promise.all([
            loadScript(this, SchedulerFiles + "/dhtmlxscheduler.js"),
            loadStyle(this, SchedulerFiles + "/dhtmlxscheduler.css")
        ])
            .then(() => {
                this.initializeUI();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error loading scheduler",
                        message: error.message,
                        variant: "error"
                    })
                );
            });
    }
 
    initializeUI() {
        const root = this.template.querySelector(".thescheduler");
        root.style.height = this.height + "px";
 
        const scheduler = window.Scheduler.getSchedulerInstance();
        scheduler.templates.parse_date = (date) => new Date(date);
        scheduler.templates.format_date = (date) => date.toISOString();
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next"
        ];
 
        scheduler.init(root, new Date(), "week");
 
        getEvents().then((d) => {
 
            const chartData = unwrap(d);
            scheduler.parse({
                events: chartData.data,
            });
        });
 
        ///↓↓↓ saving changes back to SF backend ↓↓↓
        scheduler.createDataProcessor(function (entity, action, data, id) {
            switch (action) {
                case "create":
                    console.log("createEvent", data);
                    const insert = {
                        apiName: "SchedulerEvent__c",
                        fields: {
                            Name: data.info,
                            Start_Date__c: data.start_date,
                            End_Date__c: data.end_date,
                            Text__c: data.text
                        }
                    };
                    scheduler.config.readonly = true; // suppress changes 
                                                      //until saving is complete
                    return createRecord(insert).then((res) => {
                        scheduler.config.readonly = false;
                        return { tid: res.id, ...res };
                    });
                case "update":
                    console.log("updateEvent", data);
                    const update = {
                        fields: {
                            Id: id,
                            Name: data.info,
                            Start_Date__c: data.start_date,
                            End_Date__c: data.end_date,
                            Text__c: data.text
                        }
                    };
                    return updateRecord(update).then(() => ({}));
                case "delete":
                    return deleteRecord(id).then(() => ({}));
            }
        });
    }
}
~~~

## Schritt 6. Erstellen einer Apex-Klasse

Im nächsten Schritt wird eine Klasse erstellt, die die Interaktion zwischen der Lightning-Komponente und dem Datenmodell ermöglicht.

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

Nachdem die Klasse erstellt wurde, öffnen Sie *SchedulerData.cls* und fügen Sie diesen Code ein:

~~~js title="force-app/main/default/classes/SchedulerData.cls"
public with sharing class SchedulerData {
 
    @RemoteAction
    @AuraEnabled(cacheable="true)"
    public static Map<String, Object> getEvents() {
       
        // fetching the Records via SOQL
        List<SchedulerEvent__c> Events = new List<SchedulerEvent__c>();
        Events = [SELECT Id, Name, Start_Date__c, End_Date__c, 
            Text__c FROM SchedulerEvent__c];
 
        Map<String, Object> result = new Map<String, Object>{'events' => Events };
        return result;
   }
}
~~~

Ziehen Sie die Quelle aus dem Scratch Org in Ihr Projekt:

~~~js
$ sfdx project retrieve start
~~~

Schieben Sie dann die Quellen zurück in das Scratch Org:

~~~js
$ sfdx project deploy start
~~~

## Schritt 7. Erstellen einer Lightning Page

Öffnen Sie den "Lightning App Builder" und erstellen Sie eine neue Lightning Page.

![sf_lightning_app_builder](/img/sf_lightning_app_builder.png)

Wählen Sie "App Page", geben Sie den Seitennamen ein und wählen Sie das Layout aus.

![sf_app_page](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![sf_page_layout](/img/sf_page_layout.png)

Die benutzerdefinierte Scheduler-Komponente sollte für die neue Seite verfügbar sein. Fügen Sie sie einem beliebigen Bereich hinzu und speichern Sie.

![sf_scheduler](/img/sf_scheduler.png)

Aktivieren Sie die Seite.

![sf_page_saved](/img/sf_page_saved.png)

Speichern Sie die Änderungen.


![sf_activation](/img/sf_activation.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

Öffnen Sie die Anwendungsseite. Sie sollte im App Launcher durch Eingabe von Scheduler zugänglich sein.

![sf_home_scheduler](/img/sf_home_scheduler.png)

Wenn alles korrekt eingerichtet wurde, wird eine einfache Scheduler-Demo auf der Lightning Page angezeigt.

![sf_final](/img/sf_final.png)

## Anwendungssicherheit

Der Scheduler selbst enthält keinen Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Entwickler. Weitere Details finden Sie [im zugehörigen Artikel](/guides/app-security.md). Salesforce ist mit Sicherheitsfunktionen ausgestattet, um Ihre Daten und Anwendungen zu schützen, und Sie können eigene Sicherheitsmaßnahmen implementieren, die auf die Anforderungen Ihrer Organisation zugeschnitten sind. Weitere Informationen finden Sie im [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). Zusätzlich behandelt [diese Ressource](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) wichtige Sicherheitspraktiken.

## Fehlerbehebung

Wenn der Scheduler nach Abschluss der Integrationsschritte keine Ereignisse anzeigt, lesen Sie den Artikel [Troubleshooting Backend Integration Issues](/guides/troubleshooting.md). Dieser bietet Hilfestellungen zur Identifikation und Lösung häufiger Probleme.

## Wie geht es weiter?

An diesem Punkt ist der Scheduler vollständig funktionsfähig. Der vollständige Code steht auf [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo) zum Klonen oder Herunterladen für Ihre eigenen Projekte zur Verfügung.

Sie können auch [Anleitungen zu den Funktionen des Schedulers](/guides/) oder Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md) erkunden.
