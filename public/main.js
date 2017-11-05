$(document).ready(function () {
   $("#btn").click(function () {
       $.post("/login", {username:$("#username").val(),
       password:$("#password").val()
       }, function(result){
           console.log(result);
       });
   });
});