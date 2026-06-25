---
title: "dhtmlxScheduler mit SalesForce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxScheduler mit SalesForce LWC

Dieses Tutorial beschreibt, wie man dhtmlxScheduler in eine [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide) integriert. 

Prüfen Sie die [Online-Demo](https://dhtmlx-dev-ed.develop.lightning.force.com/) zur Integration von DHTMLX-Komponenten mit Salesforce LWC (Login: *user*, Passwort: *demo*).
Der Quellcode der Demo ist [auf GitHub verfügbar](https://github.com/DHTMLX/salesforce-lwc-demo).

Wenn Sie eine andere Technologie verwenden, schauen Sie sich unten die Liste der verfügbaren Integrationsvarianten an:

- [dhtmlxScheduler mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](integrations/other/howtostart-connector.md)

Wir verwenden [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli), um eine Lightning Web Component zu erstellen und sie in einer Organisation hochzuladen. Siehe [dieser Artikel](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) für Installationshinweise. Sie können außerdem [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) für Visual Studio Code installieren, um mit Development-Org-Umgebungen zu arbeiten.

:::note
Der vollständige Quellcode der in diesem Tutorial erstellten Demo ist [auf GitHub verfügbar](https://github.com/DHTMLX/salesforce-scheduler-demo).
:::


Sie können sich auch die Videoanleitung ansehen, die zeigt, wie man Scheduler mit Salesforce LWC erstellt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Voraussetzungen

Installieren Sie [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli), falls Sie ihn noch nicht besitzen. Siehe [dieser Artikel](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) für Installationshinweise.

## Schritt 1. Ein Projekt erstellen

Melden Sie sich für ein kostenloses Entwicklerkonto an, falls Sie noch keines haben. Siehe [dieser Artikel](https://webkul.com/blog/create-free-developer-account-in-salesforce/) für Installationshinweise.

In der linken Leiste suchen Sie nach und wählen Sie **Dev Hub**:

![sf_devhub](/img/sf_devhub.png)

Im neuen Einstellungsfenster wählen Sie **Enable Dev Hub**:

![sf_enabledh](/img/sf_enabledh.png)

Lassen Sie uns ein Basisverzeichnis für das Salesforce DX-Projekt erstellen:

~~~js
$ mkdir ~/salesforce
~~~

Erstellen Sie ein Salesforce DX-Projekt über die CLI:

~~~js
$ cd ~/salesforce
$ sfdx project generate -n scheduler-salesforce-app
    target dir = C:UsersUsersalesforce
        create scheduler-salesforce-appconfigproject-scratch-def.json
        create guides/scheduler-salesforce-appREADME.md
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

Gehen Sie in das erstellte Projekt:

~~~js
$ cd scheduler-salesforce-app
~~~

## Schritt 2. Autorisierung

[Org autorisieren](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) mit dem Web Server Flow:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

Aktualisieren Sie Ihre Projektkonfiguration (*sfdx-project.json*). Setzen Sie den Parameter "sfdcLoginUrl" auf Ihre "My Domain URL". Die "My Domain URL" Ihres Orgs finden Sie auf der Einstellungsseite "My Domain". Zum Beispiel:

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Erstellen Sie eine Scratch Org:

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

Um die Bibliothek zu verwenden, müssen wir sie in Salesforce als Static Resource hochladen. Öffnen Sie dazu Ihre Scratch-Org:

~~~js
$ sfdx org open
~~~

Öffnen Sie nun die Registerkarte **Static Resources** und klicken Sie auf die Schaltfläche **New**

![sf_staticresources](/img/sf_staticresources.png)

Geben Sie ihm einen aussagekräftigen Namen (wir verwenden *dhtmlxscheduler*), wählen Sie das ZIP-Archiv mit der Bibliothek selbst (das Archiv muss die Dateien *dhtmlxscheduler.js* und *dhtmlxscheduler.css* enthalten) und wählen Sie die Cache-Kontrolle **Public**, um die Leistung zu verbessern. Drücken Sie die Schaltfläche **Save**.

![sf_load_zip](/img/sf_load_zip.png)

Jetzt haben wir dhtmlxScheduler in Salesforce installiert.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## Schritt 4. Datenmodell erstellen

Die Kerneinheiten von dhtmlxScheduler sind Ereignisse. Ein sinnvoller Ansatz ist es, alle Eigenschaften der dhtmlxScheduler‑Objekte als reines JSON in Salesforce zu speichern. Erstellen wir also ein Ereignis-Objekt. Öffnen Sie den Objekt-Manager und wählen Sie „Create“, dann „Custom Object“:

![sf_new_object](/img/sf_new_object.png)

### **Ereignis-Objekt**

Geben Sie dem Ereignis-Objekt den Namen, lassen Sie ihn *SchedulerEvent/SchedulerEvents* heißen.

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
Der Datensatzname muss dem Objektnamen entsprechen, zum Beispiel:

Objektname: SchedulerEvent ⇒ Datensatzname: SchedulerEvent Name
:::

Drücken Sie die Schaltfläche **Save**.

Nachdem das Objekt erstellt ist, öffnen Sie die Registerkarte **Fields & Relationships**. Drücken Sie die Schaltfläche **New**.

![sf_new_field](/img/sf_new_field.png)

- **Start Date**

Wählen Sie **Date/Time** als Datentyp und drücken Sie die Schaltfläche **Next**. 

![sf_field_type](/img/sf_field_type.png)

Benennen Sie es mit **Start Date**. Es speichert die JSON-serialisierten Task-Eigenschaften.

![sf_start_date](/img/sf_start_date.png)

Drücken Sie die Schaltfläche **Next** (unter Akzeptieren aller Standard-Einstellungen), bis die Schaltfläche **Save & New** verfügbar ist.

- **End Date**

Erstellen Sie das Feld **End Date**. Wählen Sie **Date/Time** als Datentyp.

![sf_end_date](/img/sf_end_date.png)

Drücken Sie die Schaltfläche **Next** (unter Akzeptieren aller Standard-Einstellungen), bis die Schaltfläche **Save & New** verfügbar ist.

- **Text**

Erstellen Sie ein Feld **Text**. Wählen Sie **Text** als Datentyp.

![sf_text](/img/sf_text.png)

Drücken Sie die Schaltfläche **Next** (unter Akzeptieren aller Standard-Einstellungen), bis die Schaltfläche **Save** verfügbar ist.

Am Ende sollte es so aussehen:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## Schritt 5. Erstellen einer Lightning Web Component

Um eine Lightning Web Component zu erstellen, führen Sie folgenden Befehl aus:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

Ändern Sie die Komponenten-Definition in *scheduler.js-meta.xml*, damit sie im Lightning App Builder freigegeben wird:


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

Öffnen Sie *scheduler.html* und fügen Sie den folgenden Code ein:


~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Öffnen Sie *scheduler.js* und fügen Sie den folgenden Code ein:


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

## Schritt 6. Apex-Klasse erstellen

Der nächste Schritt besteht darin, eine Klasse zu erstellen, die die Interaktionen zwischen der Lightning-Komponente und unserem Datenmodell ermöglicht.

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

Nach der Erstellung öffnen Sie *SchedulerData.cls* und fügen Sie den folgenden Code ein:


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

Quellen Sie den Quellcode aus der Scratch Org in Ihr Projekt:

~~~js
$ sfdx project retrieve start
~~~

und pushes Sie dann die Quellen in die Scratch Org:

~~~js
$ sfdx project deploy start
~~~

## Schritt 7. Lightning Page erstellen

Öffnen Sie den "Lightning App Builder", erstellen Sie eine neue Lightning Page.

![sf_lightning_app_builder](/img/sf_lightning_app_builder.png)

Wählen Sie "App Page" dann Seitenname und Layout.

![sf_app_page](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![sf_page_layout](/img/sf_page_layout.png)

Sie sollten eine Scheduler‑Benutzerkomponente für die neue Seite sehen. Fügen Sie sie zu einem Bereich hinzu und speichern Sie.

![sf_scheduler](/img/sf_scheduler.png)

Aktivieren Sie die Seite.

![sf_page_saved](/img/sf_page_saved.png)

Speichern Sie die Änderungen.

![sf_activation](/img/sf_activation.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

Öffnen Sie die Anwendungsseite. Sie sollte im App Launcher sichtbar sein, wenn Sie darauf klicken und Scheduler eingeben.

![sf_home_scheduler](/img/sf_home_scheduler.png)

Wenn alles gut gelaufen ist, sollten Sie eine einfache Scheduler-Demo sehen, die in der Lightning Page läuft.

![sf_final](/img/sf_final.png)

## Anwendungssicherheit

Scheduler bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z. B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit einer Anwendung bei den Entwicklern liegt, die die Anwendung implementieren. Lesen Sie die Details [im entsprechenden Artikel](guides/app-security.md). Salesforce ist so konzipiert, dass es Ihre Daten und Anwendungen schützt. Sie können auch Ihre eigene Sicherheitsstrategie implementieren, um der Struktur und den Bedürfnissen Ihrer Organisation gerecht zu werden. Für weitere Informationen siehe bitte den [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). [Hier](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) erfahren Sie, was Sie sicher machen müssen.

## Fehlerbehebung

Falls Sie die oben genannten Schritte zur Integration von Scheduler mit Salesforce abgeschlossen haben, Scheduler aber Ereignisse auf einer Seite nicht rendert, werfen Sie einen Blick auf den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dort wird beschrieben, wie man die Ursachen der Probleme identifiziert.

## Was kommt als Nächstes

Sie haben nun einen vollständig funktionsfähigen Scheduler. Den vollständigen Code können Sie sich auf [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo) ansehen, klonen oder herunterladen und in Ihren Projekten verwenden.

Sie können die [Guides zu den zahlreichen Funktionen von Scheduler](/guides/) oder Tutorials zur [Integration von Scheduler mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.