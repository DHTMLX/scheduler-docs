---
title: "dhtmlxScheduler 与 Salesforce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxScheduler 与 Salesforce LWC

本教程介绍如何将 dhtmlxScheduler 集成到一个 [Salesforce Lightning Web 组件](https://developer.salesforce.com/docs/platform/lwc/guide) 中。

请查看 [在线演示](https://dhtmlx-dev-ed.develop.lightning.force.com/)（演示将 DHTMLX 组件与 Salesforce LWC 集成，登录名：*user*，密码：*demo*）。
演示的源代码在 [GitHub 上提供](https://github.com/DHTMLX/salesforce-lwc-demo)。

如果你使用的是其他技术，请查看下面可用的集成变体列表：

- [dhtmlxScheduler 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler 与 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler 与 PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler 与 Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler 与 dhtmlxConnector](integrations/other/howtostart-connector.md)

我们将使用 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) 来创建 Lightning Web Component 并将其上传到一个组织（org）。有关安装指南，请参阅 [此文](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)。你还可以在 Visual Studio Code 中安装 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)，以便在开发组织中工作。

:::note
本教程中创建的演示的完整源代码 [在 GitHub 上可用](https://github.com/DHTMLX/salesforce-scheduler-demo)。
:::


你也可以观看视频指南，了解如何使用 Salesforce LWC 创建 Scheduler。

<iframe width="704" height="400" src="https://www.youtube.com/embed/IceDT8O1Pys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前提条件

如果你还没有，请安装 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)。有关安装指南，请参阅 [此文](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)。

## 步骤 1. 创建项目

如果你还没有免费开发者账户，请 [注册](https://developer.salesforce.com/) 一个开发者账户。有关安装指南，请参阅 [此文](https://webkul.com/blog/create-free-developer-account-in-salesforce/)。

在左侧的搜索栏中，找到并选择 *Dev Hub*：

![sf_devhub](/img/sf_devhub.png)

在新的设置窗口中，选择 *Enable Dev Hub*：

![sf_enabledh](/img/sf_enabledh.png)

让我们为 Salesforce DX 项目创建一个基目录：

~~~js
$ mkdir ~/salesforce
~~~

通过 CLI 创建一个 Salesforce DX 项目：

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

进入创建的项目：

~~~js
$ cd scheduler-salesforce-app
~~~

## 步骤 2. 授权

使用 Web 服务器流对 Org 进行授权：

~~~js
$ sfdx org login web -d

Successfully authorized ...@...com with org ID ...
~~~

更新你的项目配置文件 (*sfdx-project.json*)。将 "sfdcLoginUrl" 参数设置为你的 "My Domain URL"。你可以在 “My Domain” 设置页面找到你的组织的 "My Domain URL"。例如：

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="scheduler-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

创建 Scratch Org：

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


## 步骤 3. 将 Scheduler 添加到 Salesforce

为了开始使用该库，我们需要将其上传到 Salesforce 作为一个静态资源（Static Resource）。因此，打开你的 scratch org：

~~~js
$ sfdx org open
~~~

现在，打开 “Static Resources” 标签页并点击 “New” 按钮

![sf_staticresources](/img/sf_staticresources.png)

给它一个有意义的名称（我们使用 *dhtmlxscheduler*），选择包含库本身的 ZIP 压缩包（该压缩包中必须包含 *dhtmlxscheduler.js* 与 *dhtmlxscheduler.css* 文件），并选择 "Public" 缓存控制以提高性能。点击 “Save” 保存。

![sf_load_zip](/img/sf_load_zip.png)

现在我们在 Salesforce 内部拥有 dhtmlxScheduler。

![sf_scheduler_in_sf](/img/sf_scheduler_in_sf.png)

## 步骤 4. 创建数据模型

dhtmlxScheduler 的核心实体是 Events。一个好的做法是在 Salesforce 中将 dhtmlxScheduler 的所有属性以纯 JSON 的形式存储。让我们创建一个 Event 对象。打开对象管理器并选择 "Create"，然后选择 "Custom Object"：

![sf_new_object](/img/sf_new_object.png)

### **Event 对象**
为事件对象命名，例如设为 *SchedulerEvent/SchedulerEvents*。

![sf_schedulerevent](/img/sf_schedulerevent.png)

:::note
记录名称必须与对象名称匹配，例如：
对象名称: SchedulerEvent => 记录名称: SchedulerEvent Name
:::

点击保存按钮。

对象创建后，打开 “Fields & Relationships” 标签页。点击 “New” 按钮。


![sf_new_field](/img/sf_new_field.png)

- **Start Date**

将数据类型选择为 “Date/Time” 并点击 “Next” 按钮。 

![sf_field_type](/img/sf_field_type.png)

将其命名为 "Start Date"。它用于存储 JSON 序列化的任务属性。

![sf_start_date](/img/sf_start_date.png)

点击 “Next” 按钮（接受所有默认设置）直到出现 “Save & New” 按钮。

- **End Date**

创建 “End Date” 字段。将数据类型选择为 “Date/Time”。

![sf_end_date](/img/sf_end_date.png)

点击 “Next” 按钮（接受所有默认设置）直到出现 “Save & New” 按钮。

- **Text**

创建一个 "Text" 字段。将数据类型选择为 “Text”。

![sf_text](/img/sf_text.png)

点击 “Next” 按钮（接受所有默认设置）直到出现 “Save” 按钮。

最后它应显示如下所示：

![sf_schedulerevent_fields](/img/sf_schedulerevent_fields.png)

## 步骤 5. 创建一个 Lightning Web Component

要创建一个 Lightning Web Component，请运行以下命令：

~~~js
$ sfdx lightning generate component --type lwc -n scheduler -d force-app/main/default/lwc

target dir = C:UsersUsersourcesalesforcescheduler-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcschedulerscheduler.js
   create force-appmaindefaultlwcschedulerscheduler.html
   create force-appmaindefaultlwcscheduler__tests__scheduler.test.js
   create force-appmaindefaultlwcschedulerscheduler.js-meta.xml
~~~

在 *scheduler.js-meta.xml* 中修改组件定义，以便在 Lightning App Builder 中暴露它：

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

打开 *scheduler.html* 并将以下代码添加到其中：

~~~js title="force-app/main/default/lwc/scheduler/scheduler.html"
<template>
    <div class="thescheduler" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

打开 *scheduler.js* 并将以下代码添加到其中：

~~~js title="force-app/main/default/lwc/scheduler/scheduler.js"
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";
 
// 静态资源
import SchedulerFiles from "@salesforce/resourceUrl/dhtmlxscheduler";
 
// 控制器
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

## 步骤 6. 创建 Apex 类

下一步是创建一个类，使 Lightning 组件与我们的数据模型之间的交互成为可能。

~~~js
$ sfdx apex generate class -n SchedulerData -d force-app/main/default/classes

target dir = C:UsersUsersalesforcescheduler-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesSchedulerData.cls
   create force-appmaindefaultclassesSchedulerData.cls-meta.xml
~~~

创建后，打开 *SchedulerData.cls*，并将以下代码添加到其中：

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

从 Scratch Org 读取源码到你的项目中：

~~~js
$ sfdx project retrieve start
~~~

接着将源码推送到 Scratch Org：

~~~js
$ sfdx project deploy start
~~~

## 步骤 7. 创建 Lightning 页面

打开“Lightning App Builder”，创建一个新的 Lightning 页面。

![sf_lightning_app_builder](/img/sf_lightning_app_builder.png)

选择 "App Page"，然后是页面名称和布局。

![sf_app_page](/img/sf_app_page.png)

![sf_new_lightning_page](/img/sf_new_lightning_page.png)

![sf_page_layout](/img/sf_page_layout.png)

你应该会在新页面上看到 Scheduler 自定义组件。将其追加到任意区域并保存。

![sf_scheduler](/img/sf_scheduler.png)

激活该页面。

![sf_page_saved](/img/sf_page_saved.png)

保存变更。

![sf_activation](/img/sf_activation.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_scheduler_in_app](/img/sf_scheduler_in_app.png)

打开应用程序页面。若在应用启动器中单击并输入 Scheduler 应该可以访问。

![sf_home_scheduler](/img/sf_home_scheduler.png)

如果一切顺利，你应该在 Lightning 页面看到一个简单的 Scheduler 演示正在运行。

![sf_final](/img/sf_final.png)

## 应用程序安全性

Scheduler 不提供防止应用程序受到各种威胁（如 SQL 注入、XSS 和 CSRF 攻击）的机制。保持应用程序安全的责任在于实现应用程序的开发者。请在对应的文章中了解更多细节，Salesforce 以安全性来保护你的数据和应用程序。你也可以实现你自己的安全方案，以符合你组织的结构和需要。欲了解更多信息，请参阅 Salesforce Security Guide。 [在这里](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) 可以了解需要保持安全的要点。

## 故障排除

如果你已经完成上述步骤以实现 Scheduler 与 Salesforce 的集成，但 Scheduler 在页面上没有渲染事件，请参阅 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。它描述了识别问题根源的方式。

## 接下来要做什么

现在你已经拥有一个功能完整的 Scheduler。你可以在 [GitHub](https://github.com/DHTMLX/salesforce-scheduler-demo) 查看完整代码，克隆或下载它并将其用于你的项目。

你也可以查看 [关于 Scheduler 的众多特性的指南](/guides/) 或关于 [Scheduler 与其他后端框架集成的教程](integrations/howtostart-guides.md)。