---
sidebar_label: "uid"
title: "uid method"
description: "创建一个在当前 scheduler 实例内保证唯一的唯一 ID（不是全局 GUID）"
---

# uid

### Description

@short: 创建一个在当前 scheduler 实例内保证唯一的唯一 ID（不是全局 GUID）

@signature: uid: () =\> number

### Returns
- ` uid` - (number) - 生成的唯一 ID

### Example

~~~jsx
const new_id = scheduler.uid();
~~~
