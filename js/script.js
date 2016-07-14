var preTop = $('body').scrollTop();
var $header = $('.navbar');
$(window).scroll(function($e){
  var curTop = $('body').scrollTop();
  if(curTop > preTop){
    $header.css('top',-60).css('background-color','transparent');
  }else{
    $header.css('top',0).css('background-color','black');;
  }
  preTop = curTop;
});