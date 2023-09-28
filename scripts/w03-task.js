/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
    return number1 + number2
  }
  
  

function addNumbers() {
    let addNumbers1 = Number(document.querySelectorAll("#add1").value);
    let addNumbers2 = Number(document.querySelectorAll("#add2").value);
    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}
/* Function Expression - Subtract Numbers */

const subtract = function(number1, number2) {
    return number1 - number2;
  };
  
const subtractNumbers = function() {
    let subtractNumber1 = Number(document.querySelector('#subtract1').value);
    let subtractNumber2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(subtractNumber1, subtractNumber2);

  };

document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);
  
/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

const multiplyNumbers = () => {
  const factor1 = Number(document.querySelector('#factor1').value);
  const factor2 = Number(document.querySelector('#factor2').value);
  const product = multiply(factor1, factor2);
  document.querySelector('#product').value = product;
};

document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);

  /* Open Function Use - Divide Numbers */
function divide(number1, number2) {
    if (number2 === 0) {
      return "Cannot divide by zero";
    }
    return number1 / number2;
  }
  
  const divideNumbers = function () {
    const dividend = Number(document.querySelector('#dividend').value);
    const divisor = Number(document.querySelector('#divisor').value);
    const quotient = divide(dividend, divisor);
    document.querySelector('#quotient').value = quotient;
  };
  
  document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);
  
/* Decision Structure */


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */

/* Output Odds Only Array */

/* Output Evens Only Array */

/* Output Sum of Org. Array */

/* Output Multiplied by 2 Array */

/* Output Sum of Multiplied by 2 Array */
