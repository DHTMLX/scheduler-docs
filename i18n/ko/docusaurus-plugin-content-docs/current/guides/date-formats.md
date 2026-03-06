---
title: "날짜 작업"
sidebar_label: "날짜 작업"
---

# 날짜 작업

라이브러리에는 다양한 날짜 포맷팅 메서드를 제공하는 [date](api/other/date.md) 객체가 포함되어 있습니다.

이 문서에서는 가장 중요하고 자주 사용되는 메서드들을 소개합니다. 전체 메서드 목록은 [date object page](api/other/date.md)에서 확인하실 수 있습니다.


## Date 객체를 문자열로 변환하기

Date 객체를 문자열로 변환하려면 [date_to_str](api/other/date.md) 메서드를 사용합니다: 


*이 메서드는 지정된 패턴에 따라 Date 객체를 문자열로 포맷팅하는 함수를 반환합니다:*
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


[Displaying several weeks in Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/03_two_work_weeks.html)

## 문자열을 Date 객체로 변환하기

문자열을 Date 객체로 변환하려면 [str_to_date](api/other/date.md) 메서드를 사용할 수 있습니다: 


*이 메서드는 지정된 형식의 문자열을 파싱하여 Date 객체를 반환하는 함수를 제공합니다:*


날짜 파싱 함수는 다음과 같이 생성할 수 있습니다:

~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019년 6월 29일 00:00:00
~~~


## UTC로 변환하기

로컬 날짜와 시간을 UTC로 변환하려면 [convert_to_utc](api/other/date.md) 메서드를 사용하세요:

~~~js
//2019년 6월 29일 14:00 (로컬 시간) -> 2019년 6월 29일 12:00 (UTC)
var time = scheduler.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

## 날짜에 시간 간격 더하기(빼기)

지정한 날짜에 시간 간격을 더하거나 빼려면 [add](api/other/date.md) 메서드를 사용할 수 있습니다:

~~~js
//지정한 날짜에 1년을 더함: 2019년 6월 29일 -> 2020년 6월 29일
var newDate = scheduler.date.add(new Date(2019, 05, 29), 1, 'year');
~~~


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


:::note
날짜 포맷팅 메서드 전체 목록은 [여기](api/other/date.md)에서 확인하실 수 있습니다.
:::
