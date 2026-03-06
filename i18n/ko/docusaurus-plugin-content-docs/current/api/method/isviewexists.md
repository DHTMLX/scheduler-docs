---
sidebar_label: "isViewExists"
title: "isViewExists method"
description: "지정된 이름의 뷰가 존재하는지 확인합니다."
---

# isViewExists

### Description

@short: 지정된 이름의 뷰가 존재하는지 확인합니다.

@signature: isViewExists: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - 뷰의 이름

### Returns
- ` isExist` - (boolean) - <i>뷰가 존재하면 true</i>, 그렇지 않으면 <i>false</i>

### Example

~~~jsx
scheduler.init('scheduler_here');
scheduler.load("data/events.xml");

scheduler.isViewExists("month"); //->true  /*!*/
~~~
