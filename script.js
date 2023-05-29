let factList = [
  {
    id: 1,
    statement: "JavaScript was invented in 1995",
    answer: true,
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    id: 2,
    statement: "Strings in JS are editable values",
    answer: false,
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    id: 3,
    statement: "1 + 1 === 2",
    answer: true,
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    id: 4,
    statement: "'1' + '1' === '2'",
    answer: false,
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    id: 5,
    statement: "typeof ['J', 'S'] === 'array'",
    answer: false,
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.",
  },
];

// Initialize all selectors
const statementEl = document.querySelector("#statement");
const explanationEl = document.querySelector("#explanation");
const trueBtn = document.querySelector("#trueBtn");
const falseBtn = document.querySelector("#falseBtn");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
let correctAnswer = document.querySelector("#obtained");
let totalAttempted = document.querySelector("#completed");

// Initialize/Register click handlers for all buttons
trueBtn.addEventListener("click", onTrueBtnClick);
falseBtn.addEventListener("click", onFalseBtnClick);
nextBtn.addEventListener("click", onNextBtnClick);
prevBtn.addEventListener("click", onPrevBtnClick);

// Initialize app
let currentFact = factList[0];

statementEl.textContent = currentFact.id + ") " + currentFact.statement;
disableElement(nextBtn);
disableElement(prevBtn);

/**
 * Initialize score variables
 *
 */
let obtained = 0;
let completed = 0;

// Declare click handlers for all buttons

/**
 * On true click
 *
 * 1. Select True button (add correct or incorrect class to button based on answer)
 * 2. Disable True button
 * 3. Set explanation after selection
 * 4. Enable next button
 * 5. updated factList by adding userSelection
 */
function onTrueBtnClick() {
  completed += 1;
  if (currentFact.answer) {
    trueBtn.classList.add("correct");
  } else {
    trueBtn.classList.add("incorrect");
  }
  explanationEl.textContent = currentFact.explanation;
  disableTruefalseButtons();

  const currentFactIndex = factList.findIndex(
    (fact) => fact.id === currentFact.id
  );

  const updatedFactList = [];
  for (let i = 0; i < factList.length; i++) {
    if (factList[i].id === currentFact.id) {
      updatedFactList[i] = {
        ...factList[i],
        userSelection: true,
      };
    } else {
      updatedFactList[i] = factList[i];
    }
  }
  factList = updatedFactList;

  if (currentFact.answer) {
    obtained += 1;
    correctAnswer.textContent = obtained;
    totalAttempted.textContent = completed;
  } else {
    correctAnswer.textContent = obtained;
    totalAttempted.textContent = completed;
  }

  const isCurrentFactIndexLast = currentFactIndex === factList.length - 1;

  if (isCurrentFactIndexLast) {
    disableElement(nextBtn);
  } else {
    enableElement(nextBtn);
  }
}

/**
 * On false click
 *
 * 1. Select False button (add correct or incorrect class to button based on answer)
 * 2. Disable False button
 * 3. Set explanation after selection
 * 4. Enable next button
 * 5. updated factList by adding userSelection
 *
 */
function onFalseBtnClick() {
  completed += 1;
  if (!currentFact.answer) {
    falseBtn.classList.add("correct");
  } else {
    falseBtn.classList.add("incorrect");
  }
  explanationEl.textContent = currentFact.explanation;
  disableTruefalseButtons();

  const currentFactIndex = factList.findIndex(
    (fact) => fact.id === currentFact.id
  );

  const updatedFactList = [];
  for (let i = 0; i < factList.length; i++) {
    if (factList[i].id === currentFact.id) {
      updatedFactList[i] = {
        ...factList[i],
        userSelection: false,
      };
    } else {
      updatedFactList[i] = factList[i];
    }
  }

  factList = updatedFactList;

  if (!currentFact.answer) {
    obtained += 1;
    correctAnswer.textContent = obtained;
    totalAttempted.textContent = completed;
  } else {
    correctAnswer.textContent = obtained;
    totalAttempted.textContent = completed;
  }

  const isCurrentFactIndexLast = currentFactIndex === factList.length - 1;

  if (isCurrentFactIndexLast) {
    disableElement(nextBtn);
  } else {
    enableElement(nextBtn);
  }
}

/**
 * on Next button click
 *
 * 1. Update currentFact to next fact in factList
 * 2. Update statementEl to next fact's statement
 * 3. Update explanationEl to next fact's explanation
 * 4. enable previous button
 *
 */
function onNextBtnClick() {
  disableElement(nextBtn);
  enableElement(prevBtn);
  explanationEl.textContent = "";
  removeClassesOfTrueFalseButtons();
  enableTruefalseButtons();

  if (currentFact.answer) {
    correctAnswer.textContent = obtained;
    totalAttempted.textContent = completed;
  }

  const currentFactIndex = factList.findIndex(
    (fact) => fact.id === currentFact.id
  );
  const nextFactIndex = currentFactIndex + 1;
  currentFact = factList[nextFactIndex];
  statementEl.textContent = currentFact.id + ") " + currentFact.statement;
}
/*
  on previous button click
  1. disable previous on start
  2. shows previous fact that were answered
  3. disabled true and false buttons
  4. enables next button
  5. remove Classes of True and False Buttons as they were selected before
*/
function onPrevBtnClick() {
  removeClassesOfTrueFalseButtons();
  enableElement(nextBtn);

  const currentFactIndex = factList.findIndex(
    (fact) => fact.id === currentFact.id
  );

  const prevFactIndex = currentFactIndex - 1;

  currentFact = factList[prevFactIndex];

  if (currentFact.userSelection) {
    if (currentFact.userSelection === currentFact.answer) {
      currentFact.userSelection = trueBtn.classList.add("correct");
    } else {
      currentFact.userSelection = trueBtn.classList.add("incorrect");
    }
  } else {
    if (currentFact.userSelection === currentFact.answer) {
      currentFact.userSelection = falseBtn.classList.add("correct");
    } else {
      currentFact.userSelection = falseBtn.classList.add("incorrect");
    }
  }

  statementEl.textContent = currentFact.id + ") " + currentFact.statement;
  explanationEl.textContent = currentFact.explanation;

  disableTruefalseButtons();

  if (prevFactIndex === 0) {
    disableElement(prevBtn);
    disableElement(nextBtn);
  }
}

function disableElement(el) {
  el.disabled = true;
}

function enableElement(el) {
  el.disabled = false;
}

function disableTruefalseButtons() {
  disableElement(trueBtn);
  disableElement(falseBtn);
}

function enableTruefalseButtons() {
  enableElement(trueBtn);
  enableElement(falseBtn);
}

function removeClassesOfTrueFalseButtons() {
  trueBtn.classList.remove("correct");
  trueBtn.classList.remove("incorrect");
  falseBtn.classList.remove("correct");
  falseBtn.classList.remove("incorrect");
}
