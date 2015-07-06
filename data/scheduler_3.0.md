

 Migration to the Scheduler 3.0  
==============


{{note


  You need not change anything to work with existing version of scheduler. All described below code is supported in scheduler 2.3 , but will be deprecated in scheduler 3.0

}}

There are few inner methods which were exposed but will not be available in scheduler 3.0


### resetting lightbox 


~~~js 
    scheduler._lightbox = null;

~~~

->

~~~js 
    //2.3+
    scheduler.resetLightbox();

~~~



### current state 


~~~js 
    scheduler._date
    scheduler._mode
    scheduler._min_date
    scheduler._max_date
    scheduler._editor_id
    scheduler._lightbox_id

~~~

->

~~~js 
    //2.3+
    scheduler.getState().date
    scheduler.getState().mode
    scheduler.getState().min_date
    scheduler.getState().max_date
    scheduler.getState().editor_id
    scheduler.getState().lightbox_id

~~~


