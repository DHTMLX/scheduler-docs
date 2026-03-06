---
title: "Lightbox 컨트롤"
sidebar_label: "Lightbox 컨트롤"
---

# Lightbox 컨트롤

Lightbox는 이벤트의 세부 정보를 수정하기 위해 설계된 편집 폼입니다. 기본 Lightbox는 아래 이미지와 같습니다.

![lightbox](/img/lightbox.png)

## Lightbox 구조

### 섹션
Lightbox의 레이아웃은 [lightbox](api/config/lightbox.md) 객체의 **sections** 속성으로 정의됩니다:

~~~js
// 기본 lightbox 정의
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**sections** 배열의 각 항목은 lightbox 내의 특정 섹션을 정의하는 객체입니다 ([사용 가능한 섹션 속성](api/config/lightbox.md)).


### 섹션 컨트롤
Lightbox의 각 섹션은 특정 컨트롤을 중심으로 구성됩니다. Lightbox에서 사용할 수 있는 컨트롤 타입은 다음과 같습니다:

- ["Textarea"](guides/textarea.md) - 여러 줄의 텍스트 입력 필드
- ["시간 및 날짜"](guides/time.md) - 시간 범위를 지정하는 두 개의 날짜 선택기
- ["Select"](guides/select.md) - 단일 선택 드롭다운 리스트
- ["Template"](guides/template.md) - HTML 콘텐츠를 담는 컨테이너
- ["Multiselect"](guides/multiselect.md) - 체크박스 그룹
- ["Checkbox"](guides/checkbox.md) - 두 상태의 체크박스
- ["Radio"](guides/radio.md) - 라디오 버튼 세트
- ["Combo"](guides/combo.md) - DHTMLX Combo 컴포넌트로 구현된 콤보 박스

:::note
사용하는 에디터의 조합과 관계없이, 'time' 에디터는 항상 lightbox의 마지막에 배치되어야 합니다.
:::

~~~js
{name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
    {key:"", label:"Do not repeat"},
    {key:"day", label:"Each day"},
    {key:"week", label:"Each week"},
    {key:"month", label:"Each month"}
]}
~~~
