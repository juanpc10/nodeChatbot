
class Message {
  constructor (content) {
    this.id = this.createId();
    this.timestamp = this.createTimeString();
    this.content = content;
  }
  createTimeString () {
    let now = new Date();
    let timeString = now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();
    return timeString;
  }
  createId () {
    let randomNum = Math.floor(Math.random() * 100000000);
    return randomNum;
  }
}

class UserMessage extends Message {
  constructor (id, content, timestamp) {
    super(id, content, timestamp);
  }
  writeUserMessage () {
    let $newDivChatSelf = $(`<div class="chat self" id="${this.id}">`);
    $('#chatlog').append($newDivChatSelf);
    
    let $newDivDan= $('<div class="user-photo"><img src="https://i.pinimg.com/originals/a0/7f/21/a07f2172afd655514a822d37c6024962.png" alt="danPic"></img></div>');
    $(`#${this.id}`).append($newDivDan);
    
    let $newP = $('<p class="chat-message"></p>');
    $newP.html(this.content+'<br>'+this.timestamp+'<br>');
    $(`#${this.id}`).append($newP);
  }
}

class BotMessage extends Message {
  constructor (id ,content, timestamp) {
    super(id, content, timestamp);
  }
  writeBotMessage () {
    let $newDivChatFriend = $(`<div class="chat friend" id="${this.id}">`);
    $('#chatlog').append($newDivChatFriend);

    let $newDivBot = $('<div class="user-photo"><img src="https://image.freepik.com/vector-gratis/chat-bot-robot-sitio-web-asistencia-virtual-o-aplicaciones-moviles-ilustracion-plana-inteligencia-artificial_172533-21.jpg" alt="botPic"></img></div>');
    $(`#${this.id}`).append($newDivBot);
  
    let $newP2 = $('<p class="chat-message"></p>');
    $newP2.html(this.content+'<br>'+this.timestamp+'<br>');
    $(`#${this.id}`).append($newP2);
  }
}


function getMessages () {
  $.get('/messages', data => {
    data.forEach((msg, i) => {
      let content = msg.content;
      if (i % 2 === 0) {
        let userMessage = new UserMessage (content);
        userMessage.writeUserMessage();
        scrollToBottom();
      } else {
        const botMessage = new BotMessage (content);
        botMessage.writeBotMessage();
        scrollToBottom();
      }
    });
  });
}
function postMessage (msg) {
  $.ajax({
    url: '/messages',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(msg),
  });
}


function scrollToBottom () {
  const $messages = $('.chatlogs');
  $messages.animate({
    scrollTop: $messages[0].scrollHeight
  });
}

function clearTextArea () {
  $('textarea').val('');
}

function clickFunc () {
  let userContent = $('textarea').val();
  let userMessage = new UserMessage (userContent);
  postMessage(userMessage);      ///
  userMessage.writeUserMessage();
  
  $.get('http://quotes.stormconsultancy.co.uk/random.json', function (apiResponse) {
    const apiQuote = apiResponse.quote;
    const botMessage = new BotMessage (apiQuote);
    postMessage(botMessage);
    botMessage.writeBotMessage();
  });
  clearTextArea();
  scrollToBottom();
}

$(document).ready( () => {

  getMessages();
  scrollToBottom();
  
  $('button').click( () => {
    clickFunc();
  });

  $('textarea').keydown( () => {
    if(event.keyCode == 13) {
      clickFunc()
    }
  });

  $('textarea').keyup( () => {
    if(event.keyCode == 13) {
      clearTextArea();
    }
  });

});
