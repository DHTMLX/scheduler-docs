---
sidebar_label: "buttons_right"
title: "buttons_right config"
description: "enthält eine Reihe von Buttons, die in der unteren rechten Ecke des Lightbox positioniert sind"
---

# buttons_right

### Description

@short: Enthält eine Reihe von Buttons, die in der unteren rechten Ecke des Lightbox positioniert sind

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
