const quizData = [
  {
    question: ' 1. What is a data structure?',
    options: ['A programming language',
      'A collection of algorithms',
      'A way to store and organize data',
      'A type of computer hardware'],
    answer: 'A collection of algorithms',
  },
  {
    question: '2. What are the disadvantages of arrays?',
    options: [' Index value of an array can be negative',
      'Elements are sequentially accessed',
      'Data structure like queue or stack cannot be implemented',
      'There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size'],
    answer: 'Java is a platform-independent programming There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size',
  },
  {
    question: '3.Which data structure is used for implementing recursion?',
    options: [' Stack',
      'Queue',
      'List',
      'Array'],
    answer: 'Stack',
  },
  {
    question: '4.  Which of the following application makes use of a circular linked list?',
    options: [' Recursive function calls',
      'Undo operation in a text editor',
      'Implement Hash Tables',
      'Allocating CPU to resources'],
    answer: 'Allocating CPU to resources',
  },
  {
    question: '5.What is a bit array?',
    options: [' Data structure that compactly stores bits',
      'Data structure for representing arrays of records',
      'Array in which elements are not present in continuous locations',
      'An array in which most of the elements have the same value'],
    answer: 'Data structure that compactly stores bits',
  },
  {
    question: '6.Which of the following tree data structures is not a balanced binary tree?',
    options: [' Splay tree',
      'B-tree',
      'AVL tree',
      'Red-black tree'],
    answer: 'B-tree',
  },
  {
    question: '7.Which of the following is not the type of queue?',
    options: [' Priority queue',
      'Circular queue',
      'Single ended queue',
      'Ordinary queue'],
    answer: 'Single ended queue',
  },
  {
    question: '8. Which of the following data structures can be used for parentheses matching?',
    options: ['n-ary tree',
      'queue',
      'priority queue',
      'stack'],
    answer: 'stack',
  },
  {
    question: '9. The optimal data structure used to solve Tower of Hanoi is _________',
    options: [' Tree',
      'Heap',
      'Priority queue',
      'Stack'],
    answer: 'Stack',
  },
  {
    question: '10. In simple chaining, what data structure is appropriate?',
    options: ['Doubly linked list',
      'Circular linked list',
      'Singly linked list',
      'Binary trees'],
    answer: 'Doubly linked list',
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
    radio.id = "radio_btn"

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