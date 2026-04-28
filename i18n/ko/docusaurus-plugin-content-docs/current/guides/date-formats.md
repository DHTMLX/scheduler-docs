---
title: "날짜 연산"
sidebar_label: "날짜 연산"
---

# 날짜 연산

라이브러리에는 [date](api/other/date.md) 객체가 포함되어 있으며, 이는 날짜 형식 지정 메서드의 세트를 제공합니다.

이 문서에서는 특히 중요하고 자주 사용되는 메서드를 살펴봅니다. 전체 메서드 목록은 [date object page](api/other/date.md)에서 확인하실 수 있습니다.

## Date 객체를 문자열로 변환하기

Date 객체를 문자열로 변환하려면 [date_to_str](api/other/date.md) 메서드를 사용하세요:

*이 메서드는 지정된 형식의 문자열로 Date 객체를 변환하는 함수를 반환합니다:*
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~

[주간 보기에서 여러 주 표시](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## 문자열을 Date 객체로 변환하기

문자열을 Date 객체로 변환하려면 [str_to_date](api/other/date.md) 메서드를 사용하세요:

*이 메서드는 지정된 형식의 문자열을 Date 객체로 변환하는 함수를 반환합니다:*

다음과 같이 날짜 변환 함수를 생성할 수 있습니다:

~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~

## UTC로 변환하기

로컬 시간을 UTC로 변환하려면 [convert_to_utc](api/other/date.md) 메서드를 사용하세요:

~~~js
//29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

## 날짜에 시간 간격 더하기(빼기)

지정된 날짜에 시간 간격을 더하기(빼기) 하려면 [add](api/other/date.md) 메서드를 사용하세요:

~~~js
//지정된 날짜에 1년을 더합니다: 29 June, 2027 -> 29 June, 2020
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~

[Y 축 간격 변경](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

:::note
날짜 형식 지정 메서드의 전체 목록은 [여기](api/other/date.md)에서 확인하실 수 있습니다.
:::