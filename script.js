const questions = [

{
question:"What does HTML stand for?",
answers:[
{text:"Hyper Text Markup Language",correct:true},
{text:"Home Tool Markup Language",correct:false},
{text:"Hyper Transfer Markup Language",correct:false},
{text:"Hyperlink Markup Language",correct:false}
]
},

{
question:"Which language is used for styling webpages?",
answers:[
{text:"HTML",correct:false},
{text:"CSS",correct:true},
{text:"Python",correct:false},
{text:"Java",correct:false}
]
},

{
question:"Which language is used for web interactivity?",
answers:[
{text:"JavaScript",correct:true},
{text:"C++",correct:false},
{text:"SQL",correct:false},
{text:"Python",correct:false}
]
},

{
question:"Which company developed Java?",
answers:[
{text:"Microsoft",correct:false},
{text:"Google",correct:false},
{text:"Sun Microsystems",correct:true},
{text:"Apple",correct:false}
]
},

{
question:"What does CSS stand for?",
answers:[
{text:"Cascading Style Sheets",correct:true},
{text:"Computer Style Sheets",correct:false},
{text:"Creative Style Sheets",correct:false},
{text:"Colorful Style Sheets",correct:false}
]
},

{
question:"Which symbol is used for comments in JavaScript?",
answers:[
{text:"//",correct:true},
{text:"<!-- -->",correct:false},
{text:"#",correct:false},
{text:"**",correct:false}
]
},

{
question:"Which HTML tag creates a hyperlink?",
answers:[
{text:"<a>",correct:true},
{text:"<link>",correct:false},
{text:"<h1>",correct:false},
{text:"<img>",correct:false}
]
},

{
question:"What does CPU stand for?",
answers:[
{text:"Central Processing Unit",correct:true},
{text:"Computer Processing Unit",correct:false},
{text:"Control Processing Unit",correct:false},
{text:"Central Program Unit",correct:false}
]
},

{
question:"Which database language is used for queries?",
answers:[
{text:"SQL",correct:true},
{text:"Java",correct:false},
{text:"Python",correct:false},
{text:"CSS",correct:false}
]
},

{
question:"Which company created Windows?",
answers:[
{text:"Google",correct:false},
{text:"Microsoft",correct:true},
{text:"Apple",correct:false},
{text:"IBM",correct:false}
]
}

];

let currentQuestion=0;
let score=0;
let timer;
let timeLeft=15;

const questionElement=document.getElementById("question");
const answersElement=document.getElementById("answers");
const nextButton=document.getElementById("next-btn");
const resultElement=document.getElementById("result");
const timerElement=document.getElementById("timer");
const progressElement=document.getElementById("progress");

function startQuiz(){
currentQuestion=0;
score=0;
showQuestion();
}

function showQuestion(){

resetState();

let q=questions[currentQuestion];

progressElement.innerHTML=
`Question ${currentQuestion+1} of ${questions.length}`;

questionElement.innerHTML=q.question;

q.answers.forEach(answer=>{

const button=document.createElement("button");

button.innerHTML=answer.text;
button.classList.add("btn");

if(answer.correct){
button.dataset.correct=answer.correct;
}

button.addEventListener("click",selectAnswer);

answersElement.appendChild(button);

});

startTimer();
}

function resetState(){

clearInterval(timer);

timeLeft=15;
timerElement.innerHTML="Time Left: "+timeLeft;

nextButton.style.display="none";
answersElement.innerHTML="";
}

function startTimer(){

timer=setInterval(()=>{

timeLeft--;

timerElement.innerHTML="Time Left: "+timeLeft;

if(timeLeft<=0){

clearInterval(timer);
nextButton.style.display="block";

}

},1000);
}

function selectAnswer(e){

clearInterval(timer);

const selected=e.target;
const correct=selected.dataset.correct==="true";

if(correct){

selected.classList.add("correct");
score++;

}else{

selected.classList.add("wrong");
}

Array.from(answersElement.children).forEach(button=>{

if(button.dataset.correct==="true"){
button.classList.add("correct");
}

button.disabled=true;

});

nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion<questions.length){

showQuestion();

}else{

showScore();

}

});

function showScore(){

resetState();

questionElement.innerHTML="Quiz Completed!";

resultElement.innerHTML=
`Your Score: ${score}/${questions.length}`;

nextButton.innerHTML="Restart";

nextButton.style.display="block";

nextButton.onclick=startQuiz;
}

startQuiz();