---
title: "'Select' 및 'Edit' 바 커스터마이징"
sidebar_label: "'Select' 및 'Edit' 바 커스터마이징"
---

# "Select" 및 "Edit" 바 커스터마이징

dhtmlxScheduler에서는 Edit 바와 Select 바 모두에 대해 사용자 지정 버튼 모음을 설정할 수 있습니다.

## Select 바

기본적으로 Select 바에는 3개의 버튼('Details', 'Edit', 'Delete')이 포함되어 있으며, 이는 [icons_select](api/config/icons_select.md) 설정 옵션으로 정의됩니다.

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

### 사용 예시

아래 이미지와 같이 Select 바의 예시가 있습니다:
  
![select_bar.png](/img/select_bar.png)

**Location**이라는 새 버튼이 기존 버튼과 함께 추가되었습니다.

이를 구현하는 단계는 다음과 같습니다:

- [icons_select](api/config/icons_select.md)를 다음과 같이 업데이트합니다:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~
 
:::note
Note, 모든 버튼 이름은 "icon_"으로 시작해야 합니다
::: 

- 새 버튼의 라벨을 정의합니다:
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

- 버튼에 대한 CSS 클래스를 지정합니다:
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

- 버튼의 클릭 핸들러를 제공합니다:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~
 
여기서 **scheduler._click.buttons**는 바의 버튼들에 대한 onClick 핸들러를 담고 있습니다. 'location' 키는 [icons_select](api/config/icons_select.md)에서 'icon_' 접두사를 뺀 버튼 이름과 일치합니다.

## Edit 바

일반적으로 Edit 바에는 2개의 버튼('Save', 'Cancel')이 있으며, 이는 [icons_edit](api/config/icons_edit.md) 옵션을 통해 설정됩니다.

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~

### 사용 예시

아래 이미지와 같이 Edit 바를 예로 들 수 있습니다:
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

**Save** 및 **Cancel** 버튼 외에 새로운 **Info** 버튼이 추가되었습니다.
구현 과정은 다음과 같습니다:

- [icons_edit](api/config/icons_edit.md)를 다음과 같이 업데이트합니다:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

- 새 버튼의 라벨을 지정합니다:
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

- 버튼에 대한 CSS 클래스를 정의합니다:
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

- 버튼의 클릭 핸들러를 지정합니다:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

다시 한 번, **scheduler._click.buttons**는 버튼의 클릭 핸들러를 포함하며, 'custom'은 [icons_edit](api/config/icons_edit.md)에서 'icon_' 접두사를 뺀 버튼 이름과 일치합니다.

 

## 바 요소의 동적 변경

특정 조건에 따라 Edit 바와 Select 바의 버튼을 동적으로 수정할 수 있습니다.

예를 들어, 이벤트에 **important**라는 불리언 속성이 있어 해당 이벤트가 중요하며 삭제되어서는 안 된다는 것을 나타내는 경우, 이에 따라 Select 바에서 'delete' 버튼을 표시하거나 숨길 수 있습니다. 다음과 같이 구현할 수 있습니다:

~~~js
scheduler.attachEvent("onClick", function(id){
    var event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~
