---
sidebar_label: onLocationError
title: "событие onLocationError"
description: "срабатывает, когда местоположение события не может быть найдено на карте (только в представлении Map)"
---

# onLocationError

### Description

@short: Срабатывает, когда местоположение события не может быть найдено на карте (только в представлении Map)

@signature: onLocationError: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
//With such a handler each time the location can be identified, scheduler will apply
//the coordinates of the Greenwich Royal Observatory to the event

scheduler.attachEvent("onLocationError", function (id){
    alert("Location can't be found");
    return google.maps.LatLng(51.477840, -0.001492); 
    //the coordinates of the Greenwich Royal Observatory
});
~~~

### Details

:::note

Событие будет срабатывать только при включённой конфигурации [map_resolve_event_location](api/config/map_resolve_event_location.md).

:::

<br>

**Как работает данное событие?**

- Если у события в базе данных отсутствуют значения 'lat' и 'lng', планировщик попытается разрешить их на основе значения 'event_location' во время загрузки событий в планировщик. Если указанное местоположение будет идентифицировано, соответствующие координаты будут сохранены в БД. Если нет — планировщик сгенерирует событие **onLocationError**.
- Включение конфигурационного свойства [map_resolve_event_location](api/config/map_resolve_event_location.md) полезно для миграции, но не для производственного этапа.
- Событие будет затрагивать только события, загружаемые из БД.


Событие можно использовать для задания пользовательской реакции на ситуацию, когда планировщик пытается загрузить событие с недопустимым или пустым местоположением.<br> Например, можно вернуть объект **google.maps.LatLng** с географическими координатами, которые будут применены к событию в случае ошибки.