---
sidebar_label: "buttons_right"
title: "buttons_right config"
description: "라이트박스의 오른쪽 하단에 위치한 버튼 세트를 포함합니다"
---

# buttons_right

### Description

@short: 라이트박스의 오른쪽 하단에 위치한 버튼 세트를 포함합니다

@signature: buttons_right: any[]

### Example

~~~jsx
<style>
.custom_btn_info{
    background-image:url('../../codebase/imgs/controls.gif');
    width:20px;
}
</style>
<script>
    scheduler.config.buttons_right = ["custom_btn_info"];
    scheduler.locale.labels["custom_btn_info"] = "Info";
    scheduler.init('scheduler_here',new Date(2013,05,11),"week");
    ...
    scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
        if(button_id == "custom_btn_info"){
            alert("Info!");
        }
    });
</script>
~~~

**Default value:** ["dhx_delete_btn"]

### Details

![buttons_property](/img/buttons_property.png)

### Related API
- [buttons_left](api/config/buttons_left.md)
- [onLightboxButton](api/event/onlightboxbutton.md)
