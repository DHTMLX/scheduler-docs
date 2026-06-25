---
sidebar_label: DataProcessor
title: "DataProcessor метод"
description: "DataProcessor конструктор"
---

# DataProcessor

### Description

@short: Конструктор DataProcessor

@signature: DataProcessor: (url: string) =\> void

### Parameters

- `url` - (обязательный) *string* - URL потока данных

### Example

~~~jsx
const dataProcessor = new scheduler.DataProcessor("php/update.php");
~~~

### Details

Подробнее о DataProcessor можно найти в статье [Интеграция на стороне сервера](guides/server-integration.md).

### Change log
- Добавлено в версии 6.0