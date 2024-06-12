const quizData = [
    {
      question: ' 1. Who is the father of Software Engineering',
      options: ['Margaret Hamilton',
      'Watts S. Humphrey',
      'Alan Turing',
      'Boris Beizer'],
      answer: 'Watts S. Humphrey',
    },
    {
      question: '2. What encapsulates both data and data manipulation functions ?',
      options: ['  Object',
       'Class',
       'Super Class',
       'Sub Class'],
      answer: 'Object',
    },
    {
      question: '3.How is generalization implemented in Object Oriented programming languages?',
      options: [' Inheritance',
      'Polymorphism',
      'Encapsulation',
      'Abstract Classes'],
      answer: 'Inheritance',
    },
    {
      question: '4.  Which of the following is a disadvantage of OOD ?',
      options: [' Easier maintenance',
       'Objects may be understood as stand-alone entities',
       'Objects are potentially reusable components',
       'None of the mentioned'],
      answer: 'None of the mentioned',
    },
    {
      question: '5. Which of the following describes”Is-a-Relationship” ?',
      options: [' Aggregation',
      'Inheritance',
      'Dependency',
      'All of the mentioned'],
      answer: 'Inheritance',
    },
    {
      question: '6. Object that collects data on request rather than autonomously is known as?',
      options: [' Active Object',
       'Passive Object',
      'Multiple instance',
       'None of the mentioned'],
      answer: 'Passive Object',
    },
    {
      question: '7. Objects are executed?',
      options: ['sequentially',
      'in Parallel',
      'sequentially & Parallel',
       'none of the mentioned'],
      answer: 'sequentially & Parallel',
    },
    {
      question: '8. Choose the incorrect statement in terms of Objects?',
      options: ['Objects are abstractions of real-world',
      'Objects cant manage themselves',
       'Objects encapsulate state and representation information',
      'All of the mentioned'],
      answer: 'Objects cant manage themselves',
    },
    {
      question: '9.Which of the following points related to Object-oriented development (OOD) is true?',
      options: [' OOA is concerned with developing an object model of the application domain',
      'OOD is concerned with developing an object-oriented system model to implement requirements',
       'All of the mentioned',
       'None of the mentioned'],
      answer: ' All of the mentioned',
    },
    {
      question: '10. Which of the following is one of the steps in the integration testing of OO software?',
      options: ['cluster testing',
       'thread-based testing',
       'use-based testing',
       'none of the mentioned'],
      answer: 'cluster testings',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
      radio.id="radio_btn"
  
      const option = document.createElement('label');
      option.className = 'option';
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();