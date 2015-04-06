// YOUR CODE HERE:
var messages = {};
var sortableMessages = [];

$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: '',//JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    for(var x =0; x < data.results.length; x++){
        messages[data.results[x].objectId] = data.results[x]
    }


    for(var prop in messages){

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
    console.log("TEST")
    $("#main").append('<div class="message" id='+key+'>'+a.text+'</div>');

  });




  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message');
  }
});













