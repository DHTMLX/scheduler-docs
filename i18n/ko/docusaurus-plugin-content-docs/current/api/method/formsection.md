---
sidebar_label: "formSection"
title: "formSection method"
description: "라이트박스 섹션 객체에 접근할 수 있습니다."
---

# formSection

### Description

@short: 라이트박스 섹션 객체에 접근할 수 있습니다.

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - 라이트박스 섹션의 이름

### Returns
- ` config` - (object) - 섹션 객체 (아래 객체 멤버 참조)

### Example

~~~jsx
var time = scheduler.formSection('time');
var descr = scheduler.formSection('description');

//값을 가져옵니다
var value = time.getValue();
var value1 = descr.getValue();

//값을 할당합니다
descr.setValue('abc'); //단일 컨트롤이 있는 섹션의 경우
time.setValue(null,{start_date:new Date(2009,03,10),end_date:new Date(2012,03,10)}); 
//다중 컨트롤이 있는 섹션의 경우: 첫 번째 파라미터는 'null', 두 번째는 데이터 객체입니다
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

섹션 객체는 다음 멤버를 포함합니다:

### Properties

- **section** - (*object*) 섹션의 구성 객체
  - **id** -  (*string*) 섹션의 id
  - **name** - (*string*) 섹션의 이름. scheduler는 이 이름을 사용해 **locale.labels** 컬렉션에서 라벨을 조회합니다. 예를 들어 'time' 섹션의 경우,
  라벨은 **scheduler.locale.labels.section_time**에서 가져옵니다.
  - **height** - (*number*) 섹션의 높이
  - **map_to** - (*string*) 에디터에 매핑된 프로퍼티 이름
- **control** - (*HTML collection*) 섹션 내에서 사용되는 컨트롤들의 컬렉션  
### Methods

- **getValue()** - 섹션의 데이터를 포함하는 객체를 반환합니다
- **setValue()** - 섹션에 값들을 할당합니다. 섹션에 여러 컨트롤이 있을 경우 값(또는 여러 값이 포함된 객체)을 설정할 수 있습니다
