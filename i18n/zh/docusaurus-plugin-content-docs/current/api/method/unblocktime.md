---
sidebar_label: "unblockTime"
title: "unblockTime method"
description: "移除之前通过 blockTime() 方法设置的时间阻断"
---

# unblockTime
:::warning 
此功能已棄用。
:::
### Description

@short: 移除之前通过 blockTime() 方法设置的时间阻断

@signature: unblockTime: (days: any, zones?: any[], sections?: any) =\> void

### Parameters

- `days` - (required) *any* - (<i>Date, number, array, string</i>) 指定要解除阻断的日期
- `zones` - (optional) *array* - 指定要解除阻断的时间段，单位为分钟。可设置为 'fullday' 以解除全天阻断
- `sections` - (optional) *object* - 允许仅针对特定视图中的特定项解除日期的阻断。请注意，指定的日期只会在相关视图中被解除阻断

### Example

~~~jsx
const spanId = scheduler.blockTime(new Date(2027,2,5), "fullday");
...
// 解除2027年2月5日0点到8点以及18点到24点的阻断
scheduler.unblockTime(new Date(202713,2,5), [0,10*60]);
~~~

### Related API
- [blockTime](api/method/blocktime.md)

### Change log
- 自 v5.1 起废弃
