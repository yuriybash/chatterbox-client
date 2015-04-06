// YOUR CODE HERE:
var messages = {};
var sortableMessages = [];

setInterval(function(){$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: {order: "-updatedAt"},//JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    for(var x =0; x < data.results.length; x++){
        messages[data.results[x].objectId] = data.results[x]
    }


    for(var prop in messages){
      messages[prop].text = escape(messages[prop].text)
      sortableMessages.push({
                              "createdAt": messages[prop].createdAt,
                              "user":messages[prop].username,
                              "text":messages[prop].text,
                              "roomname":messages[prop].roomname
      })
    }

    sortableMessages.sort(function(a, b){
        return Date.parse(a.createdAt) - Date.parse(b.createdAt)
    })

  _.each(sortableMessages, function(a,key){
    $("#main").prepend('<div class="message" id='+key+'>'+a.text+'</div>');
    if ( $('.message').length > 100 ) {
      $('.messages').childen().last().remove();
    }

  });




  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message');
  }
});
},500);


function escape(string){


  return string ? string.replace(/&/g, "&amp")
                 .replace(/</g, "&lt")
                 .replace(/>/g, "&gt")
                 .replace(/"/g, "&quot")
                 .replace(/'/g, "&#x27")
                 .replace(/\//g, "&#x2F")
              : undefined

}









