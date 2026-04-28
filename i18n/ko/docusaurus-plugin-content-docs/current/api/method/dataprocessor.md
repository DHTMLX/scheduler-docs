---
sidebar_label: DataProcessor
title: "DataProcessor 메서드"
description: "DataProcessor 생성자"
---

# DataProcessor

### Description

@short: DataProcessor 생성자

@signature: DataProcessor: (url: string) =\> void

### Parameters

- `url` - (required) *string* - 데이터 피드의 URL

### Example

~~~jsx
const dataProcessor = new scheduler.DataProcessor("php/update.php");
~~~

### Details

DataProcessor에 대한 자세한 내용은 [Server-Side Integration](guides/server-integration.md) 문서의 기사에서 확인할 수 있습니다.

### Change log
- 버전 6.0에 추가되었습니다.