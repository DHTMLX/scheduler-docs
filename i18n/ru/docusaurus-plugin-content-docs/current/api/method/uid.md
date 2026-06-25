---
sidebar_label: uid
title: "uid метод"
description: "генерирует уникальный идентификатор (уникальный внутри текущего планировщика, не GUID)"
---

# uid

### Description

@short: Генерирует уникальный идентификатор (уникальный внутри текущего планировщика, не GUID)

@signature: uid: () =\> number

### Returns
- ` uid` - (число) - сгенерированный идентификатор

### Example

~~~jsx
const new_id = scheduler.uid();
~~~