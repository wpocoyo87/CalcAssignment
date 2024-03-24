class Calculator {
  constructor() {
    this.currentLeft = "0"; // 78 --> 132
    this.operation = ""; //
    this.currentRight = ""; //
    this.calculationPerformed = false; // Flag to track if a calculation has been performed
  
  }

  setLeft(left) {
    this.currentLeft = left;
  }

  setRight(right) {
    this.currentRight = right;
  }

  setOperation(operation) {
    this.operation = operation;
  }

  evaluate() {
    let result = 0;
    // do something

    const left = parseFloat(this.currentLeft, 10); 
    const right = parseFloat(this.currentRight, 10); 
  
    if (isNaN(left) || isNaN(right)) {
      console.error("Invalid operands");
      return;
  }

    switch (this.operation) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
      case "x":
        result = left * right;
        break;
      case "%":
        result = (left * right)/100;
        break;
      case "/":
        if (right === 0) {
          console.error("Division by zero");
          return;
      }
      
        result = left / right;
        break;
      default:
        console.error("Invalid operation");
        return; // Exit the method if operation is invalid
  }

   // Check if the result has a decimal point and format it to have two decimal places
   if (result % 1 !== 0) {
    result = result.toFixed(2);
  }

   // Store the expression entered by the user
   this.displayOutput.value = `${this.currentLeft} ${this.operation} ${this.currentRight} = ${result}`;

 
    this.currentLeft = result.toString();
    this.operation = ""; // Clear the operation after evaluation
    this.currentRight = ""; // Reset the right operand
    this.displayOutput.value = this.currentLeft; // Update display with the result
    
 // Set the flag indicating that a calculation has been performed
    this.calculationPerformed = true;
  }

  clear() {
    this.currentLeft = "0";
    this.operation = "";
    this.currentRight = "";
    this.displayOutput.value = "0"; // Reset display to "0"
  }


  debug() {
    console.log(
      `Left value is ${this.currentLeft} will be performing ${this.operation} operation to right value which is ${this.currentRight}`
    );
  }
}



window.onload = () => {
  const calculator = new Calculator();
  calculator.displayOutput = document.getElementById('displayOutput');

  
  const numberHandler = (event) => {
    const number = event.target.innerHTML;

    // Reset the flag when a new number is entered
    if (calculator.calculationPerformed) {
      calculator.currentLeft = "0";
      calculator.currentRight = "";
      calculator.operation = "";
      calculator.expression = "";
      calculator.displayOutput.value = "0";
      calculator.calculationPerformed = false;
    }

 // Check if the number is a decimal point
 if (number === ".") {
  // Handle decimal point input
  if (!calculator.currentLeft.includes(".") && calculator.operation === "") {
    calculator.setLeft(calculator.currentLeft + number);
    calculator.expression += number;
    calculator.displayOutput.value = calculator.currentLeft; // Update display with the left operand
  } else if (!calculator.currentRight.includes(".") && calculator.operation !== "") {
    calculator.setRight(calculator.currentRight + number);
    calculator.expression += number;
    calculator.displayOutput.value = calculator.currentRight; // Update display with the right operand
  }
} else if (number === "%") {
  // Handle percentage input
  if (calculator.currentRight === "") {
    // If there is no right operand yet, append % to the left operand
    calculator.currentLeft += "%";
    calculator.expression += "%";
    calculator.displayOutput.value = calculator.currentLeft;
  }
} else {
  // Handle regular number input
  if (calculator.operation === "") {
    if (calculator.currentLeft === "0" || calculator.resultCalculated) {
      calculator.setLeft(number);
    } else {
      calculator.setLeft(calculator.currentLeft + number);
    }
  } else {
    calculator.setRight(calculator.currentRight === "" ? number : calculator.currentRight + number);
  }
  // Display the expression along with the current numbers and operation
  calculator.expression = `${calculator.currentLeft} ${calculator.operation} ${calculator.currentRight}`;
  calculator.displayOutput.value = calculator.expression;
}
calculator.debug();
};
  
  const operationHandler = (event) => {
    const operation = event.target.innerHTML;

    // Reset the flag when a new operation is selected
  calculator.calculationPerformed = false;


    if (operation !== "=") { // Check if the operation is not equals
            
    calculator.setOperation(operation);
  } else {
    calculator.evaluate();
  }

  calculator.debug();
};

  const clearHandler = () => {
    calculator.clear();
  };

  const percentageHandler = () => {
    if (calculator.operation === "") {
      calculator.setLeft((parseFloat(calculator.currentLeft) / 100).toString());
      calculator.displayOutput.value = calculator.currentLeft;
    } else {
      calculator.setRight((parseFloat(calculator.currentRight) / 100).toString());
      calculator.displayOutput.value = calculator.currentRight;
    }
    calculator.debug();
  };

  document
    .querySelectorAll(".number>button")
    .forEach((numberButton) =>
      numberButton.addEventListener("click", numberHandler)
    );

  document
  .querySelectorAll(".operation>button")
  .forEach((operationButton) =>
    operationButton.addEventListener("click", operationHandler)
  );

  document
  .getElementById("clearButton")
  .addEventListener("click", clearHandler);


  
};
