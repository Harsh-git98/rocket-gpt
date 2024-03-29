const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
// const prompt= document.querySelector(".prompt");
var prompt_text='';

let API_URL = "https://api.openai.com/v1/chat/completions";
let part1= 'sk-quhmITTRn2RWW9ln9be9T3';
let part2= 'BlbkFJhuqffPxDda0FF0E5ot5X';
let API_KEY = part1+part2;

document.querySelectorAll('.prompt').forEach(function(button) {
  button.addEventListener('click', function() {
      clicked(button);
  });
});

// The clicked function remains the same
function clicked(button) {
  let value = button.value; // Convert to lowercase and remove spaces
  let btnId = button.getAttribute('data-btn-id');
  
  button.classList.add(value, 'clicked'); // Add the class based on the value and 'clicked'
  
  // Use the btnId as needed, for example:
  console.log(`Button with ID ${btnId} and value ${value} clicked`);
if(value=="explain"){
  prompt_text= "Kindly offer a comprehensive explanation or solution for the provided code/query at below . Ensure to break down each step, elucidate relevant concepts, and discuss potential alternatives or optimizations. Your elucidation should be accessible to individuals with diverse levels of expertise, catering to both novices and seasoned programmers";
}
else if(value=="antiplag"){
  prompt_text= "Investigating originality:Could you provide a critique or antiplag for the given below of the code/question? This could involve proposing alternative methods, optimizations, or addressing potential pitfalls. Your insights will contribute to a more comprehensive understanding and improvement of the code/question. Thank you for your expertise";
}
else if(value=="testcase"){
  prompt_text= "Constructive feedback requested: Please provide a comprehensive test review for the given below of the code/question. This review should include insights on test coverage, edge cases considered, robustness of inputs, and any potential improvements or optimizations. Your detailed analysis will aid in enhancing the reliability and effectiveness of the code/question. Thank you for your valuable input";
}
else if(value=="debug"){
  prompt_text= "Write it ";
}
else if("humanify"){
  prompt_text= "Write it in 500 words";
}
else if(value=="creator"){
  prompt_text= "Write it in 1000 words";
}
else if(value=="pro"){
  prompt_text= "Code it for me";
}
else if(value=="basic"){
  prompt_text= "Write a impressive contents for this";
}
else if(value=="summary"){
  prompt_text= "Make it a perfect mesmerising story";
}
else if(value=="extend"){
  prompt_text= "following is given text/ question understand this and complete and give text of detailed of it in around 500 words";
}
else if(value=="analysis"){
  prompt_text= "following is given text/ question understand this and complete and give text of detailed of it in around 1500 words";
}
else if(value=="sorting"){
  prompt_text= "following is given text/ question understand this summarize it pointwise beca";
}
else if(value=="smallkids"){
  prompt_text= "following is given text/ question understand this make it like can be easily understand by 10 year old kid and i know you can do it because smartest AI has great sense of understanding";
}
else if(value=="enggspcl"){
  prompt_text= "following is given text/ question understand this make it joke and i know you can do it because smartest Ai has great sense of humor";
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
