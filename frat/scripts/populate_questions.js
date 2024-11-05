//import questions from './questions.json' assert {type: 'json'};


function populate_questions() {
    

    fetch('./questions.json')
        .then((response) => response.json())
        .then((json) => console.log(json));
    
    console.log("Questions Populating");

    //let questions_div = document.getElementById("questions");

    console.log(questions);

}