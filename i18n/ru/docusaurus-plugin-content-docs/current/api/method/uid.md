---
sidebar_label: "uid"
title: "uid method"
description: "создаёт уникальный ID, который гарантированно уникален в пределах текущего экземпляра scheduler (не глобальный GUID)"
---

# uid

### Description

@short: Создаёт уникальный ID, который гарантированно уникален в пределах текущего экземпляра scheduler (не глобальный GUID)

@signature: uid: () =\> number

### Returns
- ` uid` - (number) - сгенерированный уникальный ID

### Example

~~~jsx
var new_id = scheduler.uid();
~~~
