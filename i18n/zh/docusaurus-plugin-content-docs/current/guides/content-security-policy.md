---
title: "内容安全策略（CSP）合规"
sidebar_label: "内容安全策略（CSP）合规"
---

# 内容安全策略（CSP）合规

:::warning
 此功能自 6.0 版本起已弃用。请为日期格式化方法的内部实现设置模式。[查看详情](api/config/csp.md)。
:::

内容安全策略（Content Security Policy，CSP）是一项旨在阻止未经授权的JavaScript运行的 Web 标准。

dhtmlxScheduler 库包含了 **ext/dhtmlxscheduler_csp.js** 扩展，以帮助 dhtmlxScheduler 在您的应用程序启用 CSP 时能够顺利运行。该扩展能够提升应用的安全性。

要在使用 Scheduler 构建的应用中启用 CSP 支持，只需在 *dhtmlxscheduler.js* 之后添加 *dhtmlxscheduler_csp.js*:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>
~~~

*dhtmlxscheduler_csp.js* 扩展是在 Scheduler 基础上开发的，并替换了不安全的代码（主要是日期格式化器和解析器）。请注意，需要允许使用内联样式，因为组件的许多部分都会用到它们。

在某些情况下，兼容 CSP 的方法可能会稍微影响性能，因此默认情况下不会启用，必须显式开启。
