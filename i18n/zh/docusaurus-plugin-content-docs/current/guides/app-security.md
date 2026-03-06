---
title: "应用安全"
sidebar_label: "应用安全"
---

# 应用安全

Scheduler 本身不包含内置功能来防止诸如 SQL 注入、XSS 或 CSRF 攻击等威胁。确保应用程序的安全主要是开发者的责任。后端应对所有传入数据进行彻底的验证、转义或清洗，并适当地执行用户访问规则。

请注意，客户端验证很容易被绕过或篡改，因此不应依赖其作为安全措施。其主要作用是为用户提供关于错误输入的即时反馈，而无需等待服务器响应。最终的验证必须始终在服务器端进行。

下面，我们将介绍一些常见的攻击类型，并提出相应的防范建议。通常，遵循平台后端 CRUD 操作的最佳实践就足够了。

## XSS 攻击 {#xssattacks}

XSS 攻击可能源自不安全的后端 CRUD 实现、[Scheduler 模板函数](api/overview/templates_overview.md)以及[通过 UI 的用户输入](guides/lightbox-editors.md):

- 负责保存和加载 Scheduler 数据的后端 API（需要开发者自行实现）应正确转义输入和输出，以确保数据安全。当使用 [dhtmlxConnector](integrations/other/howtostart-connector.md#step-7-loading-data-from-the-server) 时，它会自动[转义并清理客户端输入](https://docs.dhtmlx.com/connector__php__app_security.html#protectionfromcrosssitescringxss)。如果你开发自己的后端，必须自行处理存储在数据库中以及加载到 Scheduler 的数据的转义。

关于模板函数和 lightbox，只有在忽略服务器端数据清洗时才会存在风险。一般来说，保护好后端即可防止 XSS 攻击，因为仅靠客户端防护在没有安全后端的情况下是无效的。

- 一个 [template](api/overview/templates_overview.md) 会直接将内容输出到 Scheduler 的 inner HTML 中，未做转义或预处理。

模板旨在允许在 Scheduler 元素中自定义标记，如格式化文本、图标或按钮。但这也可能带来代码注入的风险。你可以根据安全需求重定义任何模板。

**Related sample** [Template XSS](https://snippet.dhtmlx.com/5/db4ac67b8)

- lightbox 默认不会对客户端输入进行验证，如果不加以处理，可能会造成 XSS 漏洞。更多信息请参阅[客户端验证文章](guides/validation.md)。

**Related sample** [Lightbox XSS](https://snippet.dhtmlx.com/5/f30760ae0)

## SQL 注入 {#sqlinjections}

由于 Scheduler 完全在客户端运行，防止 SQL 注入是后端的责任。

有两个重要注意事项:

- lightbox 不包含内置验证，因此用户可以在可编辑字段中输入任意值，除非实现了验证机制。
- 后端 API 可以通过包含恶意数据的 PUT/POST 请求被直接访问，从而绕过客户端 UI。

因此，后端必须采取措施防止 SQL 注入。如果你使用 [dhtmlxConnector](integrations/other/howtostart-connector.md#step-7-loading-data-from-the-server) 并按照[文档](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase)配置表，所有输入将被自动转义。否则，请确保你的 CRUD 实现遵循所选平台的最佳安全实践（[参见此处](integrations/howtostart-guides.md)）。

## CSRF 攻击 {#csrfattacks}

在后端使用 [dhtmlxConnector](integrations/other/howtostart-connector.md#step-7-loading-data-from-the-server) 时，可以通过 connector 的配置启用 CSRF 保护。详细信息请参考相关的[防止 CSRF 和 XSRF 攻击](https://docs.dhtmlx.com/connector__php__app_security.html#preventingcsrfandxsrfattacks)文章。

如果未使用 dhtmlxConnector，则需要自行处理 CSRF 保护。请参考[此文章](guides/server-integration.md#customrequestheadersandparameters)了解如何为 Scheduler 发送到后端的请求添加自定义 token 或 header。

## 内容安全策略 {#contentsecuritypolicy}

该库包含一个配置选项，帮助你的 dhtmlxScheduler 应用程序符合内容安全策略（CSP）标准。这能提升对多种代码注入攻击的防护能力，增强整体应用安全性。

[了解更多关于如何将 CSP 应用于 dhtmlxScheduler 应用程序](api/config/csp.md)。
