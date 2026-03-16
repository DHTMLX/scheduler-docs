---
title: "dhtmlxScheduler с SalesForce LWC"
sidebar_label: "dhtmlxScheduler с SalesForce LWC"
---

# dhtmlxScheduler с SalesForce LWC

В этом руководстве описан процесс интеграции dhtmlxScheduler в [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

Если вы работаете с другой технологией, ознакомьтесь с другими вариантами интеграции, приведёнными ниже:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Мы будем использовать [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli) для создания Lightning Web Component и его деплоя в вашу организацию. Для информации по установке обратитесь к [этой статье](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm). Дополнительно вы можете установить [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) для Visual Studio Code, чтобы упростить работу с организациями для разработки.

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo).
:::

Ниже приведён видеоурок, демонстрирующий создание Scheduler с использованием Salesforce LWC.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Необходимые условия

Убедитесь, что у вас установлен [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli). Если нет - ознакомьтесь с [этой статьёй](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) для получения инструкций по установке.

## Шаг 1. Создание проекта

Если у вас ещё нет аккаунта, [зарегистрируйтесь](https://developer.salesforce.com/) для получения бесплатного аккаунта разработчика. Эта [статья](https://webkul.com/blog/create-free-developer-account-in-salesforce/) поможет вам в этом.

Используйте строку поиска слева, чтобы найти и выбрать *Dev Hub*:

![](/img/sf_devhub.png)

Затем в открывшемся окне настроек включите *Dev Hub*:

![](/img/sf_enabledh.png)

Далее создайте базовую папку для вашего проекта Salesforce DX:

~~~js
$ mkdir ~/salesforce
~~~

Сгенерируйте проект Salesforce DX с помощью CLI:

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

Перейдите в папку с новым проектом:

~~~js
$ cd scheduler-salesforce-app
~~~

## Шаг 2. Авторизация

Авторизуйте свою организацию с помощью Web Server Flow, выполнив команду:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

Далее обновите файл конфигурации проекта (*sfdx-project.json*), установив параметр "sfdcLoginUrl" в значение вашего "My Domain URL". Найти этот URL можно на странице настроек "My Domain" вашей организации. Например:

![](/img/sf_mydomain.png)

~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Создайте Scratch Org с помощью следующей команды:

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

## Шаг 3. Добавление Scheduler в Salesforce

Чтобы использовать библиотеку, загрузите её в Salesforce как Static Resource. Откройте ваш scratch org, выполнив:

~~~js
$ sfdx org open
~~~

Затем перейдите на вкладку "Static Resources" и нажмите кнопку "New":

![](/img/sf_staticresources.png)

Дайте ресурсу понятное имя (например, *dhtmlxscheduler*), загрузите ZIP-архив с файлами библиотеки (*dhtmlxscheduler.js* и *dhtmlxscheduler.css*) и установите Cache Control в "Public" для повышения производительности. Нажмите "Save".

![sf_load_zip](/img/sf_load_zip.png)

Теперь dhtmlxScheduler доступен внутри Salesforce.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## Шаг 4. Создание модели данных

События - основные сущности в dhtmlxScheduler. Практичный способ их хранения - сохранять все их свойства в виде обычного JSON внутри Salesforce. Для этого создайте новый объект Event. Откройте Object Manager, затем выберите "Create" и далее "Custom Object":

![](/img/sf_new_object.png)

### **Объект события**

Назовите объект события *SchedulerEvent* или *SchedulerEvents*.

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
Убедитесь, что имя записи совпадает с именем объекта, например:

Имя объекта: SchedulerEvent => Имя записи: SchedulerEvent Name
:::

Нажмите кнопку "Сохранить".

После создания объекта перейдите на вкладку "Fields & Relationships" и нажмите кнопку "New".

![sf_new_field](/img/sf_new_field.png)

- **Start Date**

Выберите "Date/Time" в качестве типа данных и нажмите "Next".

![sf_field_type](/img/sf_field_type.png)

Назовите это поле "Start Date". Это поле будет хранить JSON-сериализованные свойства задачи.

![sf_start_date](/img/sf_start_date.png)

Нажмите "Next" и принимайте все настройки по умолчанию до появления кнопки "Save & New".

- **End Date**

Добавьте поле "End Date", выбрав "Date/Time" как тип данных.

![sf_end_date](/img/sf_end_date.png)

Нажмите "Next" и принимайте настройки по умолчанию до появления кнопки "Save & New".

- **Text**

Создайте поле "Text" и выберите "Text" как тип данных.

![sf_text](/img/sf_text.png)

Нажмите "Next" и принимайте все настройки по умолчанию до появления кнопки "Save".

В результате поля должны выглядеть следующим образом:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## Шаг 5. Создание Lightning Web Component

Чтобы создать Lightning Web Component, используйте следующую команду:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

Измените определение компонента в *scheduler.js-meta.xml*, чтобы сделать его доступным в Lightning App Builder:

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

Откройте *scheduler.html* и вставьте следующий код:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual"></div>
</template>
~~~

Далее откройте *scheduler.js* и добавьте следующий код:

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

## Шаг 6. Создание Apex класса

Следующий шаг - создать класс, который позволит взаимодействовать между Lightning Component и моделью данных.

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

После создания откройте *SchedulerData.cls* и добавьте следующий код:

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

Получите исходный код из Scratch Org в ваш проект:

~~~js
$ sfdx project retrieve start
~~~

Затем отправьте исходный код обратно в Scratch Org:

~~~js
$ sfdx project deploy start
~~~

## Шаг 7. Создание Lightning Page

Откройте "Lightning App Builder" и создайте новую Lightning Page.

![](/img/sf_lightning_app_builder.png)

Выберите "App Page", затем введите имя страницы и выберите макет.

![](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![](/img/sf_page_layout.png)

Пользовательский компонент Scheduler должен быть доступен для новой страницы. Добавьте его в любую область и сохраните.

![sf_scheduler](/img/sf_scheduler.png)

Активируйте страницу.

![](/img/sf_page_saved.png)

Сохраните изменения.

![sf_activation](/img/sf_activation.png)

![](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

Откройте страницу приложения. Она должна быть доступна в лаунчере приложений по запросу Scheduler.

![sf_home_scheduler](/img/sf_home_scheduler.png)

Если всё настроено правильно, на Lightning Page отобразится простая демонстрация Scheduler.

![sf_final](/img/sf_final.png)

## Безопасность приложения

Scheduler сам по себе не содержит встроенной защиты от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения лежит на разработчиках. Подробнее см. [в соответствующей статье](guides/app-security.md). Salesforce спроектирован с учетом безопасности для защиты ваших данных и приложений, и вы можете реализовать собственные меры безопасности, подходящие вашей организации. Дополнительную информацию смотрите в [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). Кроме того, [этот ресурс](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) содержит важные рекомендации по безопасности.

## Устранение неполадок

Если Scheduler не отображает события после завершения интеграции, обратитесь к статье [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). В ней содержатся рекомендации по выявлению и устранению распространённых проблем.

## Что дальше

На этом этапе Scheduler полностью работоспособен. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo) для клонирования или загрузки для использования в ваших проектах.

Вы также можете ознакомиться с [руководствами по возможностям Scheduler](/guides/) или с учебными материалами по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
