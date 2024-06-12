const quizData = [
    {
      question: ' 1.Who invented Java Programming?',
      options: ['Guido van Rossum', 'James Gosling' ,
      'Dennis Ritchie',
      'Bjarne Stroustrup'],
      answer: 'James Gosling',
    },
    {
      question: '2.Which statement is true about Java?',
      options: ['Java is a sequence-dependent programming language',
        'Java is a code dependent programming language',
        'Java is a platform-dependent programming language',
        'Java is a platform-independent programming language'],
      answer: 'Java is a platform-independent programming language',
    },
    {
      question: '3.Which component is used to compile, debug and execute the java programs?',
      options: ['JRE',
      'JIT',
      'JDK',
      'JVM'],
      answer: 'JDK',
    },
    {
      question: '4. Which one of the following is not a Java feature?',
      options: [' Object-oriented',
      'Use of pointers',
      'Portable',
      'Dynamic and Extensible'],
      answer: 'Use of pointers',
    },
    {
      question: '5. Which of these cannot be used for a variable name in Java?',
      options: [' identifier & keyword',,
      'identifier',
      'keyword',
      'none of the mentioned'],
      answer: 'keyword',
    },
    {
      question: '6. What is the extension of java code files?',
      options: ['.js',
      '.txt',
      '.class',
      '.java'],
      answer: '.java',
    },
    {
      question: '7.Which exception is thrown when java is out of memory?',
      options: ['MemoryError',
      'OutOfMemoryError',
      'MemoryOutOfBoundsException',
      'MemoryFullException'],
      answer: 'OutOfMemoryError',
    },
    {
      question: '8. Which of these keywords are used for the block to be examined for exceptions?',
      options: ['check',
      'throw',
      'catch',
      'try'],
      answer: 'try',
    },
    {
      question: '9.Which of these statements is incorrect about Thread?',
      options: ['start() method is used to begin execution of the thread',
      'run() method is used to begin execution of a thread before start() method in special cases',
      'A thread can be formed by implementing Runnable interface only',
      'A thread can be formed by a class that extends Thread class'],
      answer: 'run() method is used to begin execution of a thread before start() method in special cases',
    },
    {
      question: '10. Which of the following is a superclass of every class in Java?',
      options: ['ArrayList',
      'Abstract class',
      'Object class',
      'String'],
      answer: 'Object class',
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