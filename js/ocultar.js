
$(document).ready(function(){
   $("#si").click(function(evento){
      if ($("#si").attr("checked")){
         $("#adolescente").css("display", "block");
      }else{
         $("#adolescente").css("display", "none");
      }
   });
});
