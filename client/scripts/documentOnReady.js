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



})
