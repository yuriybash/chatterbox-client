// YOUR CODE HERE:
var messages = {};
var followedUsers = [];

var ajax = {
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: {order: "-updatedAt"},
  contentType: 'application/json',
  success: function (data) {
    //console.log(data.results[0].objectId);

    var newMessages =[];

    for(var x =0; x < data.results.length; x++){
        if (!messages.hasOwnProperty(data.results[x].objectId)){
          console.log("NEW MESSAGE")
          newMessages.unshift(data.results[x]);
        }
        messages[data.results[x].objectId] = data.results[x];
    }





    // for(var prop in messages){
    //       if(messages[prop].text)messages[prop].text = escape(messages[prop].text).substr(0,140);
    //   sortableMessages.push({
    //                           "createdAt": messages[prop].createdAt,
    //                           "user":messages[prop].username,
    //                           "text":messages[prop].text,
    //                           "roomname":messages[prop].roomname
    //   })
    // }


  _.each(newMessages, function(a,key){
    $(".messages").prepend('<div class="message ' + (a.roomname || "") + ' ">'+
      '<div class="modal-content ' + a.username + '">'+
      '<div class="modal-header">'+
          '<h4 class="modal-title">'+ '<a>' + a.username+ '</a>' + '</h4>'+
        '</div>'+
        '<div class="modal-body">'+
          '<p>'+escape(a.text)+'</p>'+
        '</div>'+
        '<div class="modal-footer">'+
            '<p class="text-left ">sent: '+a.createdAt+' room: '+a.roomname+'</p>'+
            '<button type="button" class="btn btn-primary followuserbutton ' + a.username +'">Follow User</button>'+
        '</div>'+
      '</div><!-- /.modal-content -->'+
      '</div>');
    //<div class="message ' + (a.roomname || "") + '" id='+key+'>'+key + " " + a.text+" " + a.username+ " " + a.createdAt + "ROOMNAME: " + a.roomname +'</div>');
    if ( $('.message').length > 100 ){
      $('.message').last().remove();
    }
    if(window.filter && a.roomname !== window.filter){
      $('.message').first().toggle();
    }

    if(followedUsers.indexOf(a.username) > -1){
        $('.followuserbutton').first().text("Followed!")
    }

  });
    $("body").on("click", ".followuserbutton", function(){
        $(this).text("Followed!");
        var numberOfClasses = $(this).attr('class').split(' ').length;
        var username = ($(this).attr('class').split(' ')[numberOfClasses-1]);
        followedUsers.push(username);
        $(".followuserbutton."+username).text("Followed!");
        $(this).parent().parent().find("p").first().css("font-weight", "Bold")
        $("."+username+" .modal-body p").css("font-weight", "Bold");


    })
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message');
  }
};

$.ajax(ajax);
setInterval(function(){
  $.ajax(ajax);
},5000);


function escape(string){
  return string ? string.replace(/&/g, "&amp")
                 .replace(/</g, "&lt")
                 .replace(/>/g, "&gt")
                 .replace(/"/g, "&quot")
                 .replace(/'/g, "&#x27")
                 .replace(/\//g, "&#x2F")
              : undefined;
}









