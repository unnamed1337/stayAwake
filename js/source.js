var stayAwake;

(function(){
  var timeout = 60;
  var message = "Hallo Welt";
  var timer = 0;
  var interval;
  var callback;
  var alertFocusLost=false;
  
  function init(data){
    if(interval !== undefined){
      clearInterval(interval);
    }
    if(data.timer !== undefined){
      if(data.timer > 0 && $.isNumeric(data.timer)){
        timeout = data.timer;
      }
      else{
        console.warn("Der Wert "+data.timer+" ist leider ungültig, nutze default.");
      }
    }
    if(data.message !== undefined){
      if(data.message.length > 0){
        message = data.message;
      }
      else{
        console.warn("Der Wert "+data.message+" ist leider ungültig, nutze default.");
      }
    }
    if(data.callback !== undefined){
      if($.isFunction(data.callback)){
        callback = data.callback;
      }
    }
    if(data.triggerOnFocusLost !== undefined){
      alertFocusLost = data.triggerOnFocusLost;
    }
    
    if(alertFocusLost){
//      $(window).blur(function() {
//          wakeup();
//      });
    }
    
    $(window).scroll(scrolled);
    interval = setInterval(tick,1000);
  }
  
  function wakeup(){
    if($.isFunction(callback)){
      callback(message);
    }
    else{
      var result = confirm(message);
      if(result){
        timer = 0;
      }
      else {
        stop();
      }
    }
  }
  
  function tick(){
    timer++;
    if(timer >= timeout){
      wakeup();
    }
  }
  
  function stop(){
    if(interval !== undefined){
      clearInterval(interval);
      timer = 0;
    }
  }
  
  function scrolled(){
    timer = 0;
  }
  
  stayAwake.Init = init;
  stayAwake.Stop = stop;
}(stayAwake || (stayAwake = {})));


stayAwake.Init({
  timer:10,
  triggerOnFocusLost:true
});