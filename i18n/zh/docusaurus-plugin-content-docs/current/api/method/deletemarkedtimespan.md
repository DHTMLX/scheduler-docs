---
sidebar_label: "deleteMarkedTimespan"
title: "deleteMarkedTimespan method"
description: "移除使用 addMarkedTimespan() 方法创建的标记或阻塞"
---

# deleteMarkedTimespan

### Description

@short: 移除使用 addMarkedTimespan() 方法创建的标记或阻塞

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* -  时间段的 id 或包含其配置属性的对象

### Example

~~~jsx
var spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note

此功能自版本 3.5 起可用。
 
:::

:::note
 此方法需要启用 [limit](guides/extensions-list.md#limit) 插件。 
:::

该方法支持三种调用方式:

1. **deleteMarkedTimespan()** - 无参数，移除所有标记/阻塞。
2. **deleteMarkedTimespan(id)** - 移除指定 id 的时间段。
3. **deleteMarkedTimespan(config)** - 移除符合给定配置属性的时间段。
  
  
~~~js
var spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// 移除每个星期天的标记
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

// 移除每个星期五在 250 到 350 分钟之间的标记时间段
// 因此星期五将剩下两个标记块：100-250 和 350-400
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350]
});

// 移除 Units 视图中 id=3 的项目在星期五的标记
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350],
    sections:{ unit:3 }        
});

~~~

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
