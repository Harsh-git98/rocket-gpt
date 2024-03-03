const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
const prompt= document.querySelector(".prompt");
var prompt_text='';

let API_URL = "https://api.openai.com/v1/chat/completions";
let part1= 'sk-quhmITTRn2RWW9ln9be9T3';
let part2= 'BlbkFJhuqffPxDda0FF0E5ot5X';
let API_KEY = part1+part2;

prompt.onclick= ()=>{
if(prompt.value=="10 words"){
  prompt_text= "Write it in 10 words";
}
else if(prompt.value=="50 words"){
  prompt_text= "Write it in 50 words";
}
else if(prompt.value=="100 words"){
  prompt_text= "Write it in 100 words";
}
else if(prompt.value=="300 words"){
  prompt_text= "Write it in 300 words";
}
else if(prompt.value=="500 words"){
  prompt_text= "Write it in 500 words";
}
else if(prompt.value=="1000 words"){
  prompt_text= "Write it in 1000 words";
}
else if(prompt.value=="code"){
  prompt_text= "Code it for me";
}
else if(prompt.value=="content"){
  prompt_text= "Write a impressive contents for this";
}
else if(prompt.value=="story"){
  prompt_text= "Make it a perfect mesmerising story";
}
else if(prompt.value=="solve"){
  prompt_text= "Solve this for me";
}
else if(prompt.value=="funny"){
  prompt_text= "Make it funny for readers to keep readers active to read more";
}
else if(prompt.value=="emojis"){
  prompt_text= "Use proper emojis at appropriate places to engage readers";
}
else if(prompt.value=="vocabulary"){
  prompt_text= "Use high level vocabulary to make it more attractive";
}
else if(prompt.value=="jokes"){
  prompt_text= "Convert it into a joke";
}
}



sendBtn.onclick = function () {
  if(messageBar.value.length > 0){
    var UserTypedMessage = messageBar.value+prompt_text;
    var displaymsg= messageBar.value;
    messageBar.value = "";

    let message =
    `<div class="chat message">
    <img src="img/user.jpg">
    <span>
      ${displaymsg}
    </span>
  </div>`;

  let response =
  `<div class="chat response">
  <img src="img/logo.png">
  <span class= "new">...
  </span>
</div>`

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() =>{
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": UserTypedMessage}]
        })
      }

      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        const ChatBotResponse = document.querySelector(".response .new");
        ChatBotResponse.innerHTML = data.choices[0].message.content;
        ChatBotResponse.classList.remove("new");
      }).catch((error) => {
        ChatBotResponse.innerHTML = "Opps! An error occured. Please try again"
      })
    }, 100);
  }
}