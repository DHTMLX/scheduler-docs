---
sidebar_label: "setLoadMode"
title: "setLoadMode method"
description: "设置分段加载数据的模式，实现动态加载"
---

# setLoadMode

### Description

@short: 设置分段加载数据的模式，实现动态加载

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (required) *string* - 加载模式

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";  
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month")  
scheduler.load("data/events.php");
~~~

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note
  
此方法应在调用 **scheduler.init()** 之后，但在加载任何数据到scheduler之前使用。 
 
:::

默认情况下，scheduler 会一次性加载所有数据。当处理大量事件集合时，这种方式效率较低。在这种情况下，最好按段加载数据，仅加载当前视图所需的数据。

**mode** 参数可接受以下预定义值之一:

- day;  
- week;  
- month;  
- year。

例如，将模式设置为 'month' 会使 scheduler 仅请求当前月份的数据，并根据需要加载更多数据。 
[了解更多关于加载模式的信息](guides/loading-data.md#dynamic-loading)。

#### 请求

生成的请求格式如下:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*其中 DATEHERE 是根据 [load_date](api/config/load_date.md) 设置格式化的有效日期。*

<br>

当服务器端使用 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 时，无需额外的服务器端处理即可完成数据解析。

### Related API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [데이터 불러오기](guides/loading-data.md#dynamic-loading)
