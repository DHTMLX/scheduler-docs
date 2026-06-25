---
title: "dhtmlxScheduler with SalesForce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxScheduler와 SalesForce LWC

이 튜토리얼은 dhtmlxScheduler를 [SalesForce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide)에 추가하는 방법을 설명합니다. 

다음의 온라인 데모에서 DHTMLX 컴포넌트를 Salesforce LWC와 통합하는 방법을 확인해 보세요(로그인: *user*, 비밀번호: *demo*). 데모의 소스 코드는 [GitHub에서 제공됩니다](https://github.com/DHTMLX/salesforce-lwc-demo).

다른 기술을 사용하는 경우 아래에서 사용할 수 있는 통합 변형 목록을 확인하십시오:

- [dhtmlxScheduler with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler with PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler with PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler with Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler with dhtmlxConnector](integrations/other/howtostart-connector.md)

우리는 [SalesForce CLI](https://developer.salesforce.com/tools/salesforcecli)를 사용하여 Lightning Web Component를 만들고 조직에 업로드합니다. 설치 방법은 [이 문서](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)를 참조하십시오. 개발 조직과 함께 작업하기 위해 Visual Studio Code에 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)을 설치할 수도 있습니다.

:::note
이 튜토리얼에서 생성된 데모의 전체 소스 코드는 [GitHub에서 확인 가능합니다](https://github.com/DHTMLX/salesforce-scheduler-demo).
:::


비디오 가이드를 통해 Salesforce LWC로 Scheduler를 만드는 방법을 확인해 보세요.

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 필수 조건

아직 설치하지 않았다면 [SalesForce CLI]를 설치하십시오. 설치 방법은 [이 문서](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)를 참조하십시오.

## 1단계. 프로젝트 만들기

계정이 없으면 무료 개발자 계정에 가입하십시오. 설치 방법은 [이 글](https://webkul.com/blog/create-free-developer-account-in-salesforce/)을 참고하십시오.

왼쪽의 검색창에서 Dev Hub를 찾아 선택합니다:

![sf_devhub](/img/sf_devhub.png)

새 설정 창에서 Dev Hub를 활성화합니다:

![sf_enabledh](/img/sf_enabledh.png)

Salesforce DX 프로젝트의 기본 디렉터리를 만들어 봅시다:

~~~js
$ mkdir ~/salesforce
~~~

CLI를 통해 Salesforce DX 프로젝트를 만듭니다:

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

생성된 프로젝트로 이동합니다:

~~~js
$ cd scheduler-salesforce-app
~~~

## 2단계. 권한 부여

Web Server Flow를 사용하여 Org에 인증합니다:

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

프로젝트 구성 파일(*sfdx-project.json*)을 업데이트합니다. "sfdcLoginUrl" 파라미터를 자신의 "My Domain URL"로 설정합니다. 조직의 "My Domain URL"은 "My Domain" 설정 페이지에서 확인할 수 있습니다. 예를 들면:

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Scratch Org를 만듭니다:

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

라이브러리를 사용하려면 Salesforce에 Static Resource로 업로드해야 합니다. 따라서 Scratch Org를 엽니다:

~~~js
$ sfdx org open
~~~

이제, "Static Resources" 탭을 열고 "New" 버튼을 누릅니다

![sf_staticresources](/img/sf_staticresources.png)

의미 있는 이름을 지정합니다(여기서는 *dhtmlxscheduler*를 사용), 라이브러리 자체가 들어 있는 ZIP 아카이브를 선택합니다(아카이브에는 *dhtmlxscheduler.js*와 *dhtmlxscheduler.css* 파일이 포함되어 있어야 함), 그리고 성능 향상을 위해 "Public" Cache Control을 선택합니다. "Save" 버튼을 눌니다.

![sf_load_zip](/img/sf_load_zip.png)

이제 Salesforce 안에 dhtmlxScheduler가 있습니다.

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## 4단계. 데이터 모델 만들기

핵심 dhtmlxScheduler 엔티티는 Events입니다. dhtmlxScheduler 엔티티의 모든 속성을 Salesforce 내부의 일반 JSON으로 저장하는 것이 좋은 방법입니다. Event 객체를 만들어 봅시다. Object Manager를 열고 "Create"를 선택한 다음 "Custom Object"를 선택합니다:

![sf_new_object](/img/sf_new_object.png)

### **Event 객체**

이벤트 객체의 이름을 정합니다. 예를 들어 *SchedulerEvent/SchedulerEvents*로 합시다.

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
레코드 이름은 객체 이름과 일치해야 합니다. 예:

Object Name: SchedulerEvent => Record Name: SchedulerEvent Name
:::

"Save" 버튼을 누릅니다.

객체가 생성된 후에는 "Fields & Relationships" 탭을 열고 "New" 버튼을 누릅니다.

![sf_new_field](/img/sf_new_field.png)

- **Start Date**

Data Type으로 "Date/Time"을 선택하고 "Next" 버튼을 누릅니다. 

![sf_field_type](/img/sf_field_type.png)

이름을 "Start Date"로 지정합니다. 이 필드는 JSON으로 직렬화된 Task 속성을 저장합니다.

![sf_start_date](/img/sf_start_date.png)

다음 버튼을 눌러 기본 설정은 그대로 두고 계속 진행합니다(마지막에 "Save & New" 버튼이 활성화될 때까지).

- **End Date**

"End Date" 필드를 생성합니다. Data Type으로 "Date/Time"을 선택합니다.

![sf_end_date](/img/sf_end_date.png)

다음 버튼을 눌러 기본 설정은 그대로 두고 계속 진행합니다(마지막에 "Save & New" 버튼이 활성화될 때까지).

- **Text**

"Text" 필드를 만듭니다. Data Type으로 "Text"를 선택합니다.

![sf_text](/img/sf_text.png)

다음 버튼을 누릅니다(기본 설정으로 두고 계속 진행).

마지막으로 화면은 아래와 같아야 합니다:

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## 5단계. Lightning Web Component 만들기

Lightning Web Component를 만들려면 다음 명령을 실행합니다:

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

컴포넌트 정의를 *scheduler.js-meta.xml*에서 Lightning App Builder에 노출되도록 변경합니다:




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
    <div class="thescheduler" lwc:dom="manual" style='width: 100%;'></div>
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

## 6단계. Apex 클래스 만들기

다음 단계는 Lightning 컴포넌트와 데이터 모델 간의 상호 작용을 가능하게 하는 클래스를 만드는 것입니다.

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

생성 후 *SchedulerData.cls*를 열고 다음 코드를 추가합니다:


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

Scratch Org에서 로컬 프로젝트로 소스를 끌어옵니다:

~~~js
$ sfdx project retrieve start
~~~

그리고 소스를 Scratch Org에 푸시합니다:

~~~js
$ sfdx project deploy start
~~~

## 7단계. Lightning 페이지 만들기

"Lightning App Builder"를 열고 새 Lightning Page를 만듭니다.

![sf_lightning_app_builder](/img/sf_lightning_app_builder.png)

"App Page"를 선택한 후 페이지 이름과 레이아웃을 지정합니다.

![sf_app_page](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![sf_page_layout](/img/sf_page_layout.png)

새 페이지에서 Scheduler 커스텀 컴포넌트를 볼 수 있어야 합니다. 이를 임의의 영역에 추가하고 저장합니다.

![sf_scheduler](/img/sf_scheduler.png)

페이지를 활성화합니다.

![sf_page_saved](/img/sf_page_saved.png)

변경사항을 저장합니다.

![sf_activation](/img/sf_activation.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

애플리케이션 페이지를 엽니다. 앱 런처에서 Scheduler를 클릭하거나 검색하면 열 수 있습니다.

![sf_home_scheduler](/img/sf_home_scheduler.png)

모든 것이 잘 작동했다면 Lightning Page에서 간단한 Scheduler 데모를 볼 수 있습니다.

![sf_final](/img/sf_final.png)

## 애플리케이션 보안

Scheduler는 SQL 인젝션이나 XSS, CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 보호하는 방법을 제공하지 않습니다. 애플리케이션의 보안을 안전하게 유지하는 책임은 애플리케이션을 구현하는 개발자에게 있습니다. 해당 문서의 세부 정보를 읽어보십시오(Salesforce는 데이터를 보호하기 위해 보안 기능으로 구축되어 있습니다). 조직의 구조와 필요에 맞게 자체 보안 체계를 구현할 수도 있습니다. 자세한 내용은 [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm)를 참조하십시오. [여기](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm)에서 보안에 대해 알아야 할 내용을 확인할 수 있습니다.

## 문제 해결

위의 단계들을 따라 Scheduler를 Salesforce와 연동하는 과정을 완료했지만 페이지에서 이벤트가 렌더링되지 않는 경우, [문제 해결 백엔드 통합 이슈](guides/troubleshooting.md) 문서를 확인해 보십시오. 문제의 근본 원인을 식별하는 방법이 설명되어 있습니다.

## 다음 단계

이제 완전히 작동하는 Scheduler를 갖게 되었습니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo)에서 확인하거나 클론 또는 다운로드하여 프로젝트에 사용할 수 있습니다.

Scheduler의 다양한 기능에 대한 안내를 [guides](/guides/)에서 확인하거나 Scheduler를 다른 백엔드 프레임워크와 통합하는 방법에 대한 튜토리얼을 [통합 가이드](integrations/howtostart-guides.md)에서 확인할 수 있습니다.