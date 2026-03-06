---
sidebar_label: "keys"
title: "keys config"
description: "스케줄러의 핫키를 설정합니다"
---

# keys

### Description

@short: 스케줄러의 핫키를 설정합니다

@signature: keys: SchedulerHotkeys

### Example

~~~jsx
scheduler.keys.edit_save = 32;
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

### Details

**keys** 객체는 다음과 같은 속성을 포함합니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성
  </th>
  <th>
  설명
  </th>
  <th>
  기본값
  </th>
  <th>
  적용 가능한 뷰
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>편집 작업을 확정하는 키보드 키의 키 코드를 지정합니다 (라이트박스에서 'Save' 버튼을 클릭하는 대신 사용할 수 있습니다)</td>
  <td>13 ('Enter' 키)</td>
  <td>모든 뷰</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>편집 작업을 취소하는 키보드 키의 키 코드를 지정합니다 (라이트박스에서 'Cancel' 버튼을 클릭하는 대신 사용할 수 있습니다)</td>
  <td>27 ('Escape' 키)</td>
  <td>모든 뷰</td>
  </tr>
  </tbody>
</table>

:::note

참고로, 모든 **keys** 속성은 'number' 데이터 타입을 사용합니다.
 
:::
