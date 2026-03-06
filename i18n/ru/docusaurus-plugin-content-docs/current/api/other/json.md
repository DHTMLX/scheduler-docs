---
sidebar_label: "json"
title: "json config"
description: "обрабатывает сериализацию и парсинг JSON"
---

# json

### Description

@short: Обрабатывает сериализацию и парсинг JSON

@signature: json: any

### Example

~~~jsx
var obj = scheduler.json; // -> { parse(data){... }}
~~~

### Details

Объект JSON включает единственный элемент - метод **parse()**, который определяет, как scheduler обрабатывает данные, форматированные в JSON.
