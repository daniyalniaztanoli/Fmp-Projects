var questions = [
    {
        question: "Q: What is the capital of France?",
        option1: "Paris",
        option2: "London",
        option3: "Berlin",
        correctAns: "Paris",
        number:1
    },
    {
        question: "Q: What do you use to cut paper?",
        option1: "Scissors",
        option2: "Hammer",
        option3: "Pencil",
        correctAns: "Scissors",
        number:2
    },
    {
        question: "Q: What is the opposite of 'hot'?",
        option1: "Cold",
        option2: "Wet",
        option3: "Sunny",
        correctAns: "Cold",
        number:3
    },{
        question: "Q: How many days are there in a week?",
        option1: "5",
        option2: "6",
        option3: "7",
        correctAns: "7",
        number:4
    },{
        question: "Q: What is the process of plants making their own food using sunlight?",
        option1: "Photosynthesis",
        option2: "Respiration",
        option3: "Digestion",
        correctAns: "Photosynthesis",
        number:5
    },{
        question: "Q: Which planet is known as the 'Red Planet'?",
        option1: "Earth",
        option2: "Venus",
        option3: "Mars",
        correctAns: "Mars",
        number:6
    },{
        question: "Q: What is the result of subtracting 8 from 20?",
        option1: "12",
        option2: "18",
        option3: "28",
        correctAns: "12",
        number:7
    },{
        question: "Q: What do you use to see distant objects more clearly?",
        option1: "Telescope",
        option2: "Microscope",
        option3: "Magnifying glass",
        correctAns: "Telescope",
        number:8
    },{
        question: "Q: Which animal is known as 'man's best friend'?",
        option1: "Cat",
        option2: "Elephant",
        option3: "Dog",
        correctAns: "Dog",
        number:9,
    },{
        question: "Q: What is the chemical symbol for the element oxygen?",
        option1: "O2",
        option2: "O3",
        option3: "O",
        correctAns: "O",
        number:10
    }   
]


var num = document.getElementById("number");
var para = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var button = document.getElementById("btn");
var time = document.getElementById("timer")
var interval = "";
var index = 0;
var score = 0;
var min = 1;
var sec = 30;



setInterval(function(){
    time.innerHTML = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    sec--
    if(sec<0){
        min--;
        sec = 30    
    }
    if(min<0){
        min= 1;
        sec = 59;
        nextQuestion()
    }
},1000)


function nextQuestion(){

    var button = document.getElementById("btn");
    clearInterval(interval);
    setInterval(time,1000);
    min = 1;
    sec = "30";
    var getOptions = document.getElementsByName("options");

    for(var i = 0;i<getOptions.length;i++)
    {
        if(getOptions[i].checked){
            var selectValue = getOptions[i].value;
            var Ques = questions[index - 1]["question"];
            var Ans = questions[index-1][`option${selectValue}`]
            var correctAns = questions[index - 1]["correctAns"]
            if(Ans == correctAns){
                score++
            }
        }
        getOptions[i].checked = false
    }

    button.disabled = true

    if (index > questions.length -1) {
        Swal.fire(
            'Good job!',
            `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
            'success'
        )
        return;
    }
    else{
        
        
        para.innerText = questions[index].question;
        opt1.innerText= questions[index].option1;
        opt2.innerText = questions[index].option2;
        opt3.innerText = questions[index].option3;
        num.innerText = questions[index].number;
        index++
    }   
    window.onload = "";
}







function clicked()
{
    button.disabled = false
}
