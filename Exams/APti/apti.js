const quizData = [
  {
    question: '120, 99, 80, 63, 48, ?',
    options: ['35',
    '38',
    '39',
    '40'],
    answer: '35',
  },
  {
    question: '2.In the series 2, 6, 18, 54, ...... what will be the 8th term ?',
    options: [' 4370',
    '4374',
    '7443',
    '7434'],
    answer:'4374',
  },
  {
    question: '3.abca _ bcaab _ ca _ bbc _ a',
    options: [' ccaa',
    'bbaa',
    'abac',
    'abba'],
    answer: 'abac',
  },
  {
    question: '4. What is found necessarily in milk?',
    options: ['  Cream',
    'Curd',
    'Water',
    'Whiteness'],
    answer: 'Whiteness',
  },
  {
    question: '5.The total of the ages of Amar, Akbar and Anthony is 80 years. What was the total of their ages three years ago ?',
    options: ['  71 years',
    '72 years',
    '74 years',
    '77 years'],
    answer: '71 years',
  },
  {
    question: '6.Two bus tickets from city A to B and three tickets from city A to C cost Rs. 77 but three tickets from city A to B and two tickets from city A to C cost Rs. 73. What are the fares for cities B and C from A ?',
    options: [' Rs. 4, Rs. 23',
    'Rs. 13, Rs. 17',
    'Rs. 15, Rs. 14',
    'Rs. 17, Rs. 13'],
    answer: 'Rs. 13, Rs. 17',
  },
  {
    question: '7.What is the product of all the numbers in the dial of a telephone ?',
    options: ['1,58,480',
    '1,59,450',
    '1,59,480',
    'None of these'],
    answer: 'None of these',
  },
  {
    question: '8. 12 year old Manick is three times as old as his brother Rahul. How old will Manick be when he is twice as old as Rahul ?',
    options: ['14 years',
    '16 years',
    '18 years',
    '20 years'],
    answer: '18 years',
  },
  {
    question: '9. A is 3 years older to B and 3 years younger to C, while B and D are twins. How many years older is C to D?',
    options: [' 2',
    '3',
   '6',
    '12'],
    answer: '6',
  },
  {
    question: '10. There are deer and peacocks in a zoo. By counting heads they are 80. The number of their legs is 200. How many peacocks are there ?',
    options: ['20',
    '30',
    '50',
    '60'],
    answer: '60',
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