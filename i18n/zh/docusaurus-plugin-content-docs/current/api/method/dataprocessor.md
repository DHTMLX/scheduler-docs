---
sidebar_label: DataProcessor
title: "DataProcessor 方法"
description: "DataProcessor 构造函数"
---

# DataProcessor

### Description

@short: DataProcessor 构造函数

@signature: DataProcessor: (url: string) =\> void

### Parameters

- `url` - (必填) *string* - 数据源的 URL

### Example

~~~jsx
const dataProcessor = new scheduler.DataProcessor("php/update.php");
~~~

### Details

您可以在 [Server-Side Integration](guides/server-integration.md) 文章中找到有关 DataProcessor 的更多信息。

### Change log
- 已在版本 6.0 中新增