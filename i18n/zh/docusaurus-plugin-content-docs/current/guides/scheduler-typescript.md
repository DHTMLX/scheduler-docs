---
title: "使用 Scheduler 与 TypeScript"
sidebar_label: "使用 Scheduler 与 TypeScript"
---

# 使用 Scheduler 与 TypeScript

dhtmlxScheduler 库可以与 TypeScript 集成。所有 TypeScript 类型定义都可以在 **dhtmlxscheduler.d.ts** 文件中找到。

在 TypeScript 中使用 Scheduler 能为现代 IDE 提供有用的代码提示，并通过持续检查你所使用的类型，帮助保持代码的稳定性。

## 声明全局变量

*dhtmlxscheduler.js* 库定义了两个你可能会用到的全局变量:*window.scheduler* 和 *window.Scheduler*:

- *scheduler* 变量保存了默认的 Scheduler 实例。
- *Scheduler* 仅在商业版（自 2021 年 10 月 6 日起）、企业版和旗舰版中可用，并提供用于创建新 scheduler 实例的工厂方法。更多信息请参阅 [페이지에서 여러 개의 Scheduler 생성하기](guides/multiple-per-page.md) 文章。

由于 *dhtmlxscheduler.js* 是标准的浏览器 JS 库，它不会显式导出 TypeScript 模块。因此，需要在 TypeScript 中手动声明 "scheduler"（或 "Scheduler"），以避免编译器错误。可以通过以下两种方式实现:

- 两个变量都已在 *@types/dhtmlxscheduler* 中声明，并在导入后可用。
- 如果你不打算使用类型定义，也可以在代码中直接声明该变量:

~~~js
declare let scheduler: any;
~~~

这样可以防止编译错误，并且在运行时，你的代码会正确引用全局 Scheduler 实例，确保一切如预期运行。
