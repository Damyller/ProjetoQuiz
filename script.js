let currentQuestion = 0;
let CorrectAnswer = 0;

showQuestion();

//Event
document.querySelector(".scoreArea button").addEventListener("click", resetEvent);

//Functions
function showQuestion(){
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length)* 100);

        document.querySelector(".progress--bar").style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        // innerHTML serve para que possamos inserir algo dentro da tag. Nesse caso inseri a pergunta que queremos
        let optionsHtml = "";

        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll(".options .option").forEach(item => {
            item.addEventListener("click", optionClickEvent);
        });

    } else {
        //Acabaram as questões
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickOption){
        CorrectAnswer++; 
    }

    currentQuestion++;
    showQuestion();
     
}

function finishQuiz(){
    let total =  Math.floor((CorrectAnswer/ questions.length) * 100);

    if(total < 30){
        document.querySelector(".scoreText1").innerHTML = "Vish! Ta mal";
        document.querySelector(".scorePct").style.color = "#FF0000";
    } else if(total >= 30 && total < 70){
        document.querySelector(".scoreText1").innerHTML = "Okay, mas da pra melhorar";
        document.querySelector(".scorePct").style.color = "#FFFF00";
    } else if (total >= 70){
        document.querySelector(".scoreText1").innerHTML = "Parabéns";
        document.querySelector(".scorePct").style.color = "#0D630D";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${total}%` 
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${CorrectAnswer} `;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector(".progress--bar").style.width = "100%";

   
}

function resetEvent(){
    CorrectAnswer = 0;
    currentQuestion = 0;
    showQuestion(); 
}