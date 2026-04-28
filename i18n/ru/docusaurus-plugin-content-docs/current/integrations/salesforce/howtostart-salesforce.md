---
title: "dhtmlxScheduler с SalesForce LWC"
sidebar_label: "dhtmlxScheduler с SalesForce LWC"
---

# dhtmlxScheduler с SalesForce LWC

В этом руководстве описан процесс интеграции dhtmlxScheduler в [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

Посмотрите [онлайн‑демо](https://dhtmlx-dev-ed.develop.lightning.force.com/) по теме интеграции компонентов DHTMLX с Salesforce LWC (Логин: *user*, Пароль: *demo*). Исходный код демо‑примера приведён на [GitHub](https://github.com/DHTMLX/salesforce-lwc-demo).

Если вы используете другую технологию, ниже приведён список доступных вариантов интеграции:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Мы будем использовать [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli) для создания Lightning Web Component и загрузки его в организацию. См. [эту статью](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) для руководства по установке. Вы также можете установить [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) в Visual Studio Code для работы с разработческими организациями.

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo).
:::


Вы можете посмотреть видеоруководство, которое показывает, как создать Scheduler с Salesforce LWC.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Требования

Установите [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli), если его нет. См. [эту статью](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) для руководства по установке.

## Шаг 1. Создание проекта

[Зарегистрируйтесь](https://developer.salesforce.com/) для бесплатной учетной записи разработчика, если у вас её нет. См. [эту статью](https://webkul.com/blog/create-free-developer-account-in-salesforce/) для инструкций по установке.

Слева в строке поиска найдите и выберите *Dev Hub*:

![sf_devhub](/img/sf_devhub.png)

В новом окне настроек выберите *Enable Dev Hub*:

![sf_enabledh](/img/sf_enabledh.png)

Давайте создадим базовый каталог для проекта Salesforce DX:

~~~js
$ mkdir ~/salesforce
~~~

Создайте проект Salesforce DX через CLI:

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

Перейдите в созданный проект:

~~~js
$ cd scheduler-salesforce-app
~~~

## Шаг 2. Авторизация

[Авторизуйте организацию](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) с использованием потока Web Server:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

Обновите файл конфигурации проекта (*sfdx-project.json*). Установите параметр "sfdcLoginUrl" на ваш "My Domain URL". Найти ваш "My Domain URL" можно на странице настройки "My Domain". Например:

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Создайте Scratch Org:

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

Чтобы начать использовать библиотеку, её нужно загрузить в Salesforce как Static Resource. Откройте ваш scratch org:

~~~js
$ sfdx org open
~~~

Теперь перейдите на вкладку "Static Resources" и нажмите кнопку "New"

![sf_staticresources](/img/sf_staticresources.png)

Дайте осмысленное имя (мы используем *dhtmlxscheduler*), выберите ZIP‑архив самой библиотеки (архив должен содержать файлы *dhtmlxscheduler.js* и *dhtmlxscheduler.css*), и выберите режим кэширования "Public" для повышения производительности. Нажмите кнопку "Save".

![sf_load_zip](/img/sf_load_zip.png)

Теперь у нас внутри Salesforce есть dhtmlxScheduler.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## Шаг 4. Создание модели данных

Основные сущности dhtmlxScheduler — это События. Хорошим подходом является хранение всех свойств сущностей dhtmlxScheduler в виде простого JSON внутри Salesforce. Давайте создадим объект Event. Откройте Object Manager и выберите "Create", затем "Custom Object":

![sf_new_object](/img/sf_new_object.png)

### **Объект SchedulerEvent/SchedulerEvents**

Дайте имя объекту события, пусть это будет SchedulerEvent/SchedulerEvents.

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
Имя записи должно соответствовать имени объекта, например:

Object Name: SchedulerEvent => Record Name: SchedulerEvent Name
:::

Нажмите кнопку "Save".

После создания объекта откройте вкладку "Fields & Relationships". Нажмите кнопку "New".


![sf_new_field](/img/sf_new_field.png)

- **Start Date**

Выберите "Date/Time" в качестве типа данных и нажмите кнопку "Next". 

![sf_field_type](/img/sf_field_type.png)

Назовите его "Start Date". Он хранит свойства задач в виде JSON.

![sf_start_date](/img/sf_start_date.png)

Нажмите кнопку "Next" (принимая все значения по умолчанию) до тех пор, пока не станет доступна кнопка "Save & New".

- **End Date**

Создайте поле "End Date". Выберите "Date/Time" в качестве типа данных.

![sf_end_date](/img/sf_end_date.png)

Нажмите кнопку "Next" (принимая все значения по умолчанию) до тех пор, пока не станет доступна кнопка "Save & New".

- **Text**

Создайте поле "Text". Выберите тип данных "Text".

![sf_text](/img/sf_text.png)

Нажмите кнопку "Next" (принимая все значения по умолчанию) до тех пор, пока не станет доступна кнопка "Save".

В конце должно выглядеть так:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## Шаг 5. Создание компонента Lightning Web

Чтобы создать компонент Lightning Web, выполните команду:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

Измените определение компонента в *scheduler.js-meta.xml*, чтобы сделать его доступным в Конструкторе приложений Lightning:

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

Откройте *scheduler.html* и добавьте следующий код в него:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Откройте *scheduler.js* и добавьте следующий код в него:

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

## Шаг 6. Создание Apex‑класса

Следующий шаг — создать класс, который обеспечит взаимодействие между компонентом Lightning и нашей моделью данных.

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

Откройте "Lightning App Builder", создайте новую страницу Lightning Page.

![sf_lightning_app_builder](/img/sf_lightning_app_builder.png)

Выберите "App Page", затем имя страницы и макет.

![sf_app_page](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![sf_page_layout](/img/sf_page_layout.png)

Вы должны увидеть настраиваемый компонент Scheduler, доступный для новой страницы. Добавьте его в любую область и сохраните.

![sf_scheduler](/img/sf_scheduler.png)

Активируйте страницу.

![sf_page_saved](/img/sf_page_saved.png)

Сохраните изменения.

![sf_activation](/img/sf_activation.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

Откройте страницу приложения. Она должна быть доступна в запуске приложений (app launcher), если нажать её и ввести Scheduler.

![sf_home_scheduler](/img/sf_home_scheduler.png)

Если всё прошло успешно, вы увидите простой демо‑показ Scheduler на странице Lightning.

![sf_final](/img/sf_final.png)

## Безопасность приложения

Scheduler не обеспечивает защиту приложения от различных угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих приложение. Смотрите подробности в соответствующей статье Salesforce, который построен на безопасности для защиты ваших данных и приложений. Вы также можете реализовать свою собственную схему безопасности, чтобы отразить структуру и потребности вашей организации. Для получения дополнительной информации см. [Руководство по безопасности Salesforce](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). [Здесь](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) можно узнать, что нужно для обеспечения безопасности.

## Устранение неполадок

В случае, если вы выполнили все вышеуказанные шаги по интеграции Scheduler с Salesforce, но Scheduler не рендерит события на странице, ознакомьтесь с статьёй [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Она описывает способы идентификации причин проблем.

## Что дальше

Теперь у вас полноценно функционирующий Scheduler. Полный код можно посмотреть на [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo), клонировать или скачать и использовать в ваших проектах.

Вы можете ознакомиться с [Решениями по многочисленным возможностям Scheduler](/guides/) или с решениями по интеграции Scheduler с другими бекенд‑фреймворками [здесь](integrations/howtostart-guides.md).