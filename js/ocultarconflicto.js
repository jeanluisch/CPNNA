$(document).ready(function(){
   $("#conflicto").click(function(evento){
      if ($("#conflicto").attr("checked")){
         $("#formulariomayores").css("display", "block");
      }else{
         $("#formulariomayores").css("display", "none");
      }
   });
});
