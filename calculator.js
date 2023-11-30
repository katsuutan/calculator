const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

let totalNum = null, // holds the total value
    currentNum = 0, // holds the value that will be operated on the totalNum
    result = 0,
    prevOp; // holds previous clicked operator

let numArr = []; // Arr to hold single digit value before combining to a proper value

// Numbers
const buttonFunction = () => {
    const numpadList = document.querySelectorAll('.num');
    const numpadArr = Array.from(numpadList); // Converts nodelist to array

    numpadArr.forEach((num) => { // For each number button, add a click that sends its value.
        num.addEventListener('click', function(e) {
            numArr.push(num.value);
            currentNum = parseInt(numArr.join(''));
            populateDisplay(currentNum);
        });
    });
};

// Operators
const operatorFunction = () => {
    const operatorList = document.querySelectorAll('.operator');
    const operatorArr = Array.from(operatorList);

    operatorArr.forEach((operator) => {
        operator.addEventListener('click', function(e) {
            if (numArr.length){ // Checked for any number input, fixes repeated pressing of operator buttons.
                if (totalNum && prevOp != '=') {
                    result = operate(totalNum, prevOp, currentNum);
                    populateDisplay(result);
                    if (Number.isInteger(result)) // Divide by 0 case
                        totalNum = result;
                    else
                        result = totalNum;
                } else if (prevOp === '=') {
                    totalNum = result;
                }
                else { // First operation use only
                    totalNum = currentNum;
                }
                numArr.length = 0; // Resets numArr to store a different number
            }
            prevOp = operator.value; // Stores the operator value
        });
    });
};

const equalFunction = () => {
    const equal = document.querySelector('#equal');
    equal.addEventListener('click', function(e) {
        if (prevOp != '=' && prevOp != null) { // Checks to see if there's an initial value to run
            result = operate(totalNum, prevOp, currentNum)
            populateDisplay(result);
            numArr.length = 0;
            if (Number.isInteger(result)) // Dvide by 0 case
                totalNum = result;
            else
                result = totalNum;
        }
        prevOp = equal.value;
        // If no value, then nothing happens.
    })
};

const clearFunction = () => { // Resets stored values to default state
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', function(e) {
        totalNum = null;
        currentNum = 0;
        result = 0;
        numArr.length = 0;
        prevOp = null;
        populateDisplay('');
    });
};

const operate = (a, op, b) => {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract (a, b);
        case '*':
            return multiply (a, b);
        case '/':
            if (b != 0)
                return divide (a, b);
            else
                return 'BRUH';
    }
    return 'error';
};

const populateDisplay = (value) => {
    const display = document.querySelector('#display-container');
    display.textContent = value;
};

// Generates functions
const run = () => {
    buttonFunction();
    operatorFunction();
    equalFunction();
    clearFunction();
};

run();