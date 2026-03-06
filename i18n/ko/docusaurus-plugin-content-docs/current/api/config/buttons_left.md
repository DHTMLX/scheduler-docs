---
sidebar_label: "buttons_left"
title: "buttons_left config"
description: "라이트박스 하단 왼쪽 코너에 위치한 버튼 세트를 보유합니다."
---

# buttons_left

### Description

@short: 라이트박스 하단 왼쪽 코너에 위치한 버튼 세트를 보유합니다.

@signature: buttons_left: any[]

### Example

~~~jsx
<style>
.custom_btn_info{
    background-image:url('../../codebase/imgs/controls.gif');
    width:20px;
}
</style>
<script>
    scheduler.config.buttons_left = ["custom_btn_info"];
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

**Default value:** ["dhx_save_btn", "dhx_cancel_btn"]

### Details

![buttons_property](/img/buttons_property.png)

### Related API
- [buttons_right](api/config/buttons_right.md)
- [onLightboxButton](api/event/onlightboxbutton.md)
