---
title: "dhtmlxScheduler와 SalesForce LWC 통합하기"
sidebar_label: "dhtmlxScheduler와 SalesForce LWC 통합하기"
---

# dhtmlxScheduler와 SalesForce LWC 통합하기

이 튜토리얼에서는 dhtmlxScheduler를 [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide)에 통합하는 방법을 안내합니다.

다른 기술을 사용 중이라면, 아래에 나열된 다른 통합 옵션도 참고하시기 바랍니다:

- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)
- ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)

이 가이드에서는 [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli)를 사용하여 Lightning Web Component를 생성하고, 이를 조직에 배포하는 과정을 다룹니다. 설치 관련 자세한 내용은 [이 문서](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)를 참고하세요. 또한, Visual Studio Code에서 개발 환경을 더욱 편리하게 사용하려면 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)을 설치할 수 있습니다.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo)에서 확인하실 수 있습니다.
:::

아래 영상 가이드에서는 Salesforce LWC와 함께 Scheduler를 구축하는 방법을 시연합니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 사전 준비 사항

[SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli)가 설치되어 있는지 확인하세요. 설치가 되어 있지 않다면, [이 문서](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)를 참고하여 설치를 진행하세요.

## 1단계. 프로젝트 생성

아직 개발자 계정이 없다면, [여기](https://developer.salesforce.com/)에서 무료 개발자 계정에 가입하세요. 자세한 안내는 [이 글](https://webkul.com/blog/create-free-developer-account-in-salesforce/)을 참고하실 수 있습니다.

좌측 검색창에서 *Dev Hub*를 검색하여 선택하세요:

![](/img/sf_devhub.png)

이후 나타나는 설정 창에서 *Dev Hub*를 활성화합니다:

![](/img/sf_enabledh.png)

Salesforce DX 프로젝트를 위한 기본 폴더를 생성합니다:

~~~js
$ mkdir ~/salesforce
~~~

CLI를 사용하여 Salesforce DX 프로젝트를 생성합니다:

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

새로 생성된 프로젝트 폴더로 이동합니다:

~~~js
$ cd scheduler-salesforce-app
~~~

## 2단계. 인증

다음 명령어를 실행하여 Web Server Flow를 통해 조직에 인증합니다:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

이제 프로젝트 설정 파일(*sfdx-project.json*)에서 "sfdcLoginUrl" 파라미터를 자신의 "My Domain URL"로 설정합니다. 해당 URL은 조직의 "My Domain" 설정 페이지에서 확인할 수 있습니다. 예시:

![](/img/sf_mydomain.png)

~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

다음 명령어로 Scratch Org를 생성합니다:

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

## 3단계. Salesforce에 Scheduler 추가

라이브러리를 사용하려면, Salesforce에 Static Resource로 업로드해야 합니다. 아래 명령어로 Scratch Org를 엽니다:

~~~js
$ sfdx org open
~~~

"Static Resources" 탭으로 이동한 후, "New" 버튼을 클릭하세요:

![](/img/sf_staticresources.png)

리소스 이름(예: *dhtmlxscheduler*)을 명확하게 지정하고, 라이브러리 파일(*dhtmlxscheduler.js* 및 *dhtmlxscheduler.css*)이 포함된 ZIP 압축 파일을 업로드합니다. Cache Control은 "Public"으로 설정하여 성능을 향상시킵니다. "Save"를 클릭하세요.

![sf_load_zip](/img/sf_load_zip.png)

이제 dhtmlxScheduler가 Salesforce 내에서 사용 가능합니다.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## 4단계. 데이터 모델 생성

dhtmlxScheduler의 핵심 엔터티는 이벤트입니다. 이들을 효과적으로 관리하기 위해, 모든 속성을 Salesforce 내에서 plain JSON 형태로 저장하는 것이 실용적입니다. 이를 위해 새로운 Event 오브젝트를 생성하세요. Object Manager를 열고, "Create" → "Custom Object"를 선택합니다:

![](/img/sf_new_object.png)


### **이벤트 객체**

이벤트 객체의 이름을 *SchedulerEvent* 또는 *SchedulerEvents*로 지정하세요.

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
레코드 이름이 객체 이름과 일치하는지 확인하세요. 예를 들어:

객체 이름: SchedulerEvent => 레코드 이름: SchedulerEvent Name
:::

"저장" 버튼을 클릭하세요.

객체가 생성되면 "필드 및 관계" 탭으로 이동하여 "새로 만들기" 버튼을 클릭합니다.


![sf_new_field](/img/sf_new_field.png)

- **시작 날짜**

데이터 유형으로 "날짜/시간"을 선택한 후 "다음"을 클릭하세요.

![sf_field_type](/img/sf_field_type.png)

이 필드의 이름을 "Start Date"로 지정합니다. 이 필드는 JSON으로 직렬화된 Task 속성을 저장합니다.

![sf_start_date](/img/sf_start_date.png)

"다음"을 클릭하고 "저장 및 새로 만들기" 버튼이 나타날 때까지 모든 기본 설정을 그대로 두세요.

- **종료 날짜**

"End Date" 필드를 추가하고, 데이터 유형으로 "날짜/시간"을 선택하세요.

![sf_end_date](/img/sf_end_date.png)

"다음"을 클릭하고 "저장 및 새로 만들기" 버튼이 나타날 때까지 기본 설정을 그대로 두세요.

- **텍스트**

"Text" 필드를 만들고 데이터 유형으로 "Text"를 선택하세요.

![sf_text](/img/sf_text.png)

"다음"을 클릭하고 "저장" 버튼이 활성화될 때까지 모든 기본 설정을 그대로 두세요.

마지막에는 필드가 다음과 같이 보여야 합니다:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## 5단계. Lightning Web Component 생성

Lightning Web Component를 생성하려면 다음 명령어를 사용하세요:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

Lightning App Builder에 노출되도록 *scheduler.js-meta.xml*에서 컴포넌트 정의를 수정하세요:

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

*scheduler.html*을 열고 다음 코드를 입력하세요:

~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual"></div>
</template>
~~~

이제 *scheduler.js*를 열고 다음 코드를 추가하세요:

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

## 6단계. Apex 클래스 생성

다음 단계는 Lightning Component와 데이터 모델 간의 상호작용을 가능하게 하는 클래스를 만드는 것입니다.

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

생성 후, *SchedulerData.cls*를 열고 다음 코드를 추가하세요:

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

Scratch Org에서 소스를 프로젝트로 가져옵니다:

~~~js
$ sfdx project retrieve start
~~~

그런 다음 소스를 다시 Scratch Org로 푸시합니다:

~~~js
$ sfdx project deploy start
~~~

## 7단계. Lightning 페이지 생성

"Lightning App Builder"를 열고 새 Lightning Page를 만드세요.

![](/img/sf_lightning_app_builder.png)

"App Page"를 선택한 후 페이지 이름을 입력하고 레이아웃을 선택하세요.

![](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![](/img/sf_page_layout.png)

Scheduler 커스텀 컴포넌트가 새 페이지에서 사용 가능해야 합니다. 원하는 영역에 추가하고 저장하세요.

![sf_scheduler](/img/sf_scheduler.png)

페이지를 활성화하세요.

![](/img/sf_page_saved.png)

변경 사항을 저장하세요.

![sf_activation](/img/sf_activation.png)

![](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

애플리케이션 페이지를 엽니다. 앱 실행기에서 Scheduler를 입력하면 접근할 수 있습니다.

![sf_home_scheduler](/img/sf_home_scheduler.png)

모든 설정이 올바르게 완료되었다면, Lightning Page에서 간단한 Scheduler 데모가 표시됩니다.

![sf_final](/img/sf_final.png)

## 애플리케이션 보안

Scheduler 자체에는 SQL 인젝션, XSS 또는 CSRF 공격과 같은 위협에 대한 보호 기능이 포함되어 있지 않습니다. 애플리케이션의 보안은 개발자의 책임입니다. 자세한 내용은 [관련 문서](guides/app-security.md)를 참고하세요. Salesforce는 데이터와 애플리케이션을 보호하는 보안 기능을 제공하며, 조직의 요구에 맞는 추가 보안 조치도 구현할 수 있습니다. 자세한 내용은 [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm)를 참고하세요. 또한, [이 리소스](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm)에서 필수적인 보안 실무를 확인할 수 있습니다.

## 문제 해결

통합 단계를 완료한 후 Scheduler가 이벤트를 표시하지 않는 경우, [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 문서를 참고하세요. 일반적인 문제를 식별하고 해결하는 방법을 안내합니다.

## 다음 단계

이 시점에서 Scheduler는 완전히 동작합니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo)에서 복제하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

또한 [Scheduler의 기능을 다루는 가이드](/guides/)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 참고할 수 있습니다.

