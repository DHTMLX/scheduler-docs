---
sidebar_label: "skin"
title: "skin config"
description: "предоставляет текущий skin планировщика"
---

# skin

### Description

@short: Предоставляет текущий skin планировщика

@signature: skin: string

### Example

~~~jsx
var currentSkin = scheduler.skin;// -> 'glossy' или 'classic'
~~~

### Details

Этот метод возвращает текущий skin, применённый к планировщику. Если планировщик использует skin, отличный от стандартного (*'terrace'*), метод вернёт название этого skin. При использовании стандартного skin метод возвращает 'undefined'.
