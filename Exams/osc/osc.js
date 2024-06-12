const quizData = [
    {
      question: ' 1. What is an operating system?',
      options: ['interface between the hardware and application programs',
     'collection of programs that manages hardware resources',
      'system service provider to the application programs',
      'all of the mentioned'],
      answer: 'all of the mentioned',
    },
    {
      question: '2. What is the main function of the command interpreter? ',
      options: [' to provide the interface between the API and application program',
       'to handle the files in the operating system',
      'to get and execute the next user-specified command',
      'none of the mentioned'],
      answer: ' to get and execute the next user-specified command',
    },
    {
      question: '3. In Operating Systems, which of the following is/are CPU scheduling algorithms?',
      options: ['Priority',
       'Round Robin',
       'Shortest Job First',
       'All of the mentioned'],
      answer: 'All of the mentioned',
    },
    {
      question: '4. CPU scheduling is the basis of ___________',
      options: [' multiprogramming operating systems',
      'larger memory sized systems',
      'multiprocessor systems',
      'none of the mentioned'],
      answer: ' multiprogramming operating systems',
    },
    {
      question: '5.Which one of the following is not true?',
      options: [' kernel remains in the memory during the entire computer session',
       'kernel is made of various modules which can not be loaded in running operating system',
       'kernel is the first part of the operating system to load into memory during booting',
       'kernel is the program that constitutes the central core of the operating system'],
      answer: 'kernel is made of various modules which can not be loaded in running operating system',
    },
    {
      question: '6.  If a process fails, most operating system write the error information to a ______',
      options: [' new file',
       'another running process',
       'log file',
       'none of the mentioned'],
      answer: 'log file',
    },
    {
      question: '7.Which one of the following is not a real time operating system?',
      options: ['RTLinux',
      'Palm OS',
      'QNX',
      'VxWorks'],
      answer: ' Palm OS',
    },
    {
      question: '8.  What does OS X has?',
      options: [' monolithic kernel with modules',
       'microkernel',
       'monolithic kernel',
       'hybrid kernel'],
      answer: 'hybrid kernel',
    },
    {
      question: '9.In operating system, each process has its own __________',
      options: [' open files',
       'pending alarms, signals, and signal handlers',
      'address space and global variables',
      'all of the mentioned'],
      answer: 'all of the mentioned',
    },
    {
      question: '10. For an effective operating system, when to check for deadlock?',
      options: ['every time a resource request is made at fixed time intervals',
      'at fixed time intervals',
      'every time a resource request is made',
      'none of the mentioned'],
      answer: 'every time a resource request is made at fixed time intervals',
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