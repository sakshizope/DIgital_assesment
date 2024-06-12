const quizData = [
    {
      question: ' 1. What is a computer network?',
      options: ['A device used to display information on a computer screen',
      'A collection of interconnected computers and devices that can communicate and share resources',
      'A type of software used to create documents and presentations',
      'The physical casing that protects a computer’s internal components'],
      answer: 'A collection of interconnected computers and devices that can communicate and share resources',
    },
    {
      question: '2. What is internet?',
      options: [' A network of interconnected local area networks',
      'A collection of unrelated computers',
      'Interconnection of wide area networks',
      'A single network',],
      answer: 'Interconnection of wide area networks',
    },
    {
      question: '3.What is the full form of OSI?',
      options: ['optical service implementation',
      'open service Internet',
      'open system interconnection',
      'operating system interface'],
      answer: 'open system interconnection',
    },
    {
      question: '4.When a collection of various computers appears as a single coherent system to its clients, what is this called?',
      options: ['  mail system',
      'networking system',
      'computer network',
      'distributed system'],
      answer: 'distributed system',
    },
    {
      question: '5. How many layers are there in the ISO OSI reference model?',
      options: ['6',,
      '7',
      '4',
      '5'],
      answer: '7',
    },
    {
      question: '6. What are nodes in a computer network?',
      options: [' the computer that routes the data',
       'the computer that terminates the data',
       'the computer that originates the data',
      'all of the mentioned'],
      answer: 'all of the mentioned',
    },
    {
      question: '7. How is a single channel shared by multiple signals in a computer network?',
      options: ['multiplexing',
       'phase modulation',
      'analog modulation',
       'digital modulation'],
      answer: 'multiplexing',
    },
    {
      question: '8.How do two devices become part of a network?',
      options: ['PIDs of the processes running of different devices are same',
       'a process in one device is able to exchange information with a process in another device',
       'a process is active and another is inactive',
       'a process is running on both devices'],
      answer: 'a process in one device is able to exchange information with a process in another device',
    },
    {
      question: '9.Which topology requires a multipoint connection?',
      options: ['Ring',
       'Bus',
       'Star',
       'Mesh'],
      answer: 'Bus',
    },
    {
      question: '10.  Which of the following networks extends a private network across public networks?',
      options: ['virtual private network',
      'local area network',
      'storage area network',
       'enterprise private network'],
      answer: 'virtual private network',
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