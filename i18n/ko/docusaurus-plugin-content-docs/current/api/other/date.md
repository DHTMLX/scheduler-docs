---
sidebar_label: "date"
title: "date config"
description: "날짜를 포맷하고 조작하기 위한 메서드들의 모음입니다."
---

# date

### Description

@short: 날짜를 포맷하고 조작하기 위한 메서드들의 모음입니다.

@signature: date: SchedulerDateHelpers


### Details

**date** 객체는 여러 유용한 메서드를 포함하고 있습니다:

- **add**(date, number, unit) - 지정된 시간 단위를 더하거나 빼서 날짜를 조정합니다.
    - **date** - (<i>Date</i>) 수정할 date 객체
    - **number** - (<i>number</i>) 더할 단위의 양; 양수는 더하기, 음수는 빼기
    - **unit** - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>) 시간 단위

~~~js
// 지정한 날짜에 1년을 더함: 2027년 6월 29일 -> 2028년 6월 29일
const newDate = scheduler.date.add(new Date(2027, 05, 29), 1, 'year');
~~~

- **convert_to_utc**(date) - 로컬 날짜를 UTC 기준으로 변환합니다.
    - **date** - (<i>Date</i>) 변환할 date 객체
  
~~~js
// 2027년 6월 29일 14:00 (로컬 시간) -> 2027년 6월 29일 12:00 (UTC)
const time = scheduler.date.convert_to_utc(new Date(2027, 05, 29, 14, 00));
~~~

- **copy**(date) - Date 객체를 복제합니다.
    - **date** - (<i>Date</i>) 복사할 date 객체
  
~~~js
const copy = scheduler.date.copy(new Date(2027, 05, 29)); // -> 2027년 6월 29일
~~~
  
- **date_part**(date) - 날짜의 시간 부분을 00:00:00으로 초기화합니다.
    - **date** - (<i>Date</i>) 수정할 date 객체
  
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 00:00:00
const date = scheduler.date.date_part(new Date(2027, 05, 29, 14, 30, 10));
~~~
  
- **date_to_str**(format, utc) - 지정한 포맷에 맞게 Date 객체를 문자열로 변환하는 함수를 반환합니다.
       - **format** - (<i>string</i>) 원하는 날짜 포맷 (["날짜 형식 지정"](guides/settings-format.md) 참고)  
       - **utc** - (<i>boolean</i>) 로컬 시간을 UTC로 변환할지 여부  
  
~~~js
const formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
const date = formatFunc(new Date(2027, 05, 29)); // -> "29/06/2027"
~~~
  
- **day_start**(date) - 날짜의 시간 부분을 00:00:00으로 초기화합니다; <b>date_part</b> 메서드의 별칭입니다. Day 뷰에서 표시 날짜를 설정할 때 사용하며 필요에 따라 커스터마이즈할 수 있습니다.
      - **date** - (<i>Date</i>) 수정할 date 객체

~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 00:00:00
const date = scheduler.date.day_start(new Date(2027, 05, 29, 14, 30, 10));
~~~

>**참고**, 이 메서드는 전달된 date 객체를 직접 수정합니다. 원본 날짜를 변경하지 않으려면 전달 전에 *new Date*로 감싸서 복사본을 넘기세요. 예:

~~~js
const date1 = new Date(2027, 05, 29, 14, 30, 10);
const date2 = scheduler.date.day_start(new Date(date1));
~~~

- **getISOWeek**(date) - 주어진 날짜의 ISO 주 번호를 반환합니다.
    - **date** - (<i>Date</i>) 평가할 date 객체

~~~js
const week = scheduler.date.getISOWeek(new Date(2027, 05, 29)); // -> 26
~~~

- **getUTCISOWeek**(date) - 날짜를 UTC로 변환한 뒤 ISO 주 번호를 반환합니다.
    - **date** - (<i>Date</i>) 평가할 date 객체

~~~js
const week = scheduler.date.getUTCISOWeek(new Date(2027, 05, 29)); // -> 26
~~~

- **month_start**(date) - 월의 첫 날을 나타내는 새로운 Date 객체를 반환하며, 시간은 00:00:00으로 초기화됩니다.
    - **date** - (<i>Date</i>) 처리할 date 객체
  
~~~js
// 2027년 6월 29일 14:30 -> 2027년 6월 1일 00:00
const firstDay = scheduler.date.month_start(new Date(2027, 05, 29, 14, 30));
~~~

- <span id="strtodate">**str_to_date**(format, utc, parseExact)</span> - 지정한 포맷의 날짜 문자열을 Date 객체로 변환하는 함수를 반환합니다.
      - **format** - (<i>string</i>) 날짜 포맷 (["날짜 형식 지정"](guides/settings-format.md) 참고)  
      - **utc** - (<i>boolean</i>) 로컬 시간을 UTC로 변환할지 여부  
      - **parseExact** - (<i>boolean</i>) Scheduler가 자동으로 날짜 포맷을 감지할지(*false*, 기본값) 아니면 지정한 포맷만 엄격히 사용할지(*true*) 결정
~~~js
const formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
const date = formatFunc("29/06/2027"); // -> 2027년 6월 29일 00:00:00
~~~

- **time_part**(date) - Date 객체의 시간 부분을 자정(00:00:00)부터 경과한 초 단위로 반환합니다.
    - **date** - (<i>Date</i>) 평가할 date 객체
~~~js
const time = scheduler.date.time_part(new Date(2027, 05, 29, 14, 30, 10));
// time -> 52210
~~~

- **to_fixed**(num) - 10 미만의 숫자에 대해 앞에 0을 붙여 문자열로 반환하며, 10 이상은 그대로 반환합니다.
    - **num** - (<i>number</i>) 포맷할 숫자

~~~js
const num1 = scheduler.date.to_fixed(2);  // -> "02"
const num2 = scheduler.date.to_fixed(10); // -> 10
~~~
  
- **week_start**(date) - 주어진 날짜가 속한 주의 첫 날을 나타내는 Date 객체를 반환하며, 시간은 00:00:00으로 설정됩니다.
    - **date** - (<i>Date</i>) 처리할 date 객체

~~~js
// 2027년 6월 29일 14:30 -> 2027년 6월 24일 00:00
const weekStart = scheduler.date.week_start(new Date(2027, 05, 29, 14, 30));
~~~
  
- **year_start**(date) - 주어진 날짜가 속한 연도의 첫 날을 나타내는 Date 객체를 반환하며, 시간은 00:00:00으로 초기화됩니다.
    - **date** - (<i>Date</i>) 처리할 date 객체
  
~~~js
// 2027년 6월 29일 14:30 -> 2027년 1월 1일 00:00
const yearStart = scheduler.date.year_start(new Date(2027, 05, 29, 14, 30));
~~~
