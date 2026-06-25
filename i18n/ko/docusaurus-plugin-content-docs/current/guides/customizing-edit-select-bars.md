---
title: "'Select' 및 'Edit' 바 사용자 정의"
sidebar_label: "'Select' 및 'Edit' 바 사용자 정의"
---

# 'Select' 및 'Edit' 바 사용자 정의

dhtmlxScheduler는 편집 및 선택 바에 대해 사용자 정의 버튼 세트를 정의할 수 있는 기능을 제공합니다.

## 선택 바

기본적으로 선택 바에는 [icons_select](api/config/icons_select.md) 구성 옵션으로 지정된 3개의 버튼('상세 정보', '편집', '삭제')이 포함되어 있습니다.

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

### 사용 예시

아래 그림에 표시된 선택 바를 살펴보겠습니다:
  
![select_bar.png](/img/select_bar.png)

여기에 기존 버튼들에 새 버튼인 - **위치**를 추가했습니다.

다음은 절차입니다:

-  [icons_select](api/config/icons_select.md)을 아래와 같이 재정의합니다:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

:::note
참고: 모든 버튼은 반드시 "icon_"로 시작해야 합니다.
::: 

-  새 버튼의 레이블을 설정합니다:
  
~~~js
scheduler.locale.labels.icon_location = "위치";
~~~

-  버튼의 CSS 클래스를 설정합니다:
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

-  버튼 클릭 처리를 위한 핸들러를 지정합니다:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~

여기서 **scheduler._click.buttons**는 바의 버튼들에 대한 onClick 핸들러의 모음을 포함합니다. 'location'은 'icon_' 뒤의 부분으로 [icons_edit](api/config/icons_edit.md)에서 설정된 버튼 이름입니다.

## 편집 바

일반적으로 편집 바에는 [icons_edit](api/config/icons_edit.md) 구성 옵션으로 지정된 2개의 버튼('저장', '취소')이 포함되어 있습니다.

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~

### 사용 예시

아래 그림에 표시된 편집 바를 살펴보겠습니다:
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

저장 버튼과 취소 버튼에 새 버튼 - **정보**를 추가했습니다.
다음은 절차입니다:

-  [icons_edit](api/config/icons_edit.md)을 아래와 같이 재정의합니다:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

-  새 버튼의 레이블을 설정합니다:
  
~~~js
scheduler.locale.labels.icon_custom = "정보";
~~~

-  버튼의 CSS 클래스를 설정합니다:
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

-  버튼 클릭 처리를 위한 핸들러를 지정합니다:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

여기서 **scheduler._click.buttons**는 바의 버튼들에 대한 onClick 핸들러의 모음을 포함합니다. 'custom'은 'icon_' 뒤의 부분으로 [icons_edit](api/config/icons_edit.md)에서 설정된 버튼 이름입니다.

## 바 요소의 동적 변경

편집 및 선택 바의 버튼은 특정 조건에 따라 동적으로 변경될 수 있습니다. 

예를 들어 이벤트에 사용자가 삭제할 수 없도록 하는 중요도 여부를 나타내는 사용자 정의 불리언 속성 **important**가 있다고 가정합니다. 이 속성의 값에 따라 선택 바에서 '삭제' 버튼을 숨기거나 표시하고자 할 수 있습니다. 이러한 동작을 구현하는 방법은 다음과 같습니다:

~~~js
scheduler.attachEvent("onClick", function(id){
    const event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~