var filter;

$(document).ready(function(){

    var $username;
    var $messageToSend;


      $(".sendmessagebutton").on('click', function(){

          $username = $('.username').val();
          $messageToSend = $('.sendmessage').val();

          $.ajax({
            // always use this url
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'POST',
            data: JSON.stringify({'roomname': '6th floor', 'username':$username, 'text':$messageToSend}),
            contentType: 'application/json',
            success: function (data) {
              console.log('chatterbox: Message sent');
              console.log($messageToSend)
            },
            error: function (data) {
              // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to send message');
            }
          });

      })




      $(".addroombutton").on("click", function(){
          var $roomType = $(".addroom").val();

          var $buttonText = $(".defaultbutton").text();

          if(!$("ul").children().is("."+$buttonText)){
              $("ul").append("<li class="+$buttonText+"><a href=\"#\">"+$buttonText+"</a></li>");
          }
          if(!$("ul").children().is("."+$roomType)){
              $("ul").append("<li class="+$roomType+"><a href=\"#\">"+$roomType+"</a></li>");
          }
          $(".defaultbutton").text($roomType);

          $(".message").not("."+$roomType).hide();
          filter = $roomType;




          $("a").on("click", function(){
            var clickedLink = $(this).text();
            $(".defaultbutton").text(clickedLink);
            if($(this).text()==="All Rooms"){
              $(".message").show();
              filter = undefined;
            } else{
              $("."+clickedLink).show();
              $(".message").not("."+clickedLink).hide();      //use show and hide, right now we're never "un-hiding" previously toggled nodes
              filter = $(this).text();
            }
          })




      })







      $(".defaultbutton").on("click", function(){
          if ($(this).val() === "All Rooms")
            $(".message").show();
          //filter = $(this).val();
      })









})
