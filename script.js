const BASE_NUMBER = 10;

const form = document.getElementById("taskForm");
const output = document.getElementById("output");
const errorSummary = document.getElementById("errorSummary");
const resetButton = document.getElementById("resetButton");

const fields = [
  { id: "name", label: "Name" },
  { id: "userNumber", label: "Number" },
  { id: "sentence", label: "Sentence" },
  { id: "fruit1", label: "Fruit 1" },
  { id: "fruit2", label: "Fruit 2" },
  { id: "fruit3", label: "Fruit 3" },
];

// Validate inputs and show errors if any
function validate() {
  let valid = true;
  errorSummary.textContent = "";
  fields.forEach(({ id, label }) => {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(id + "Error");
    if (!input.value.trim()) {
      errorDiv.textContent = `${label} is required.`;
      valid = false;
    } else if (id === "userNumber") {
      const num = Number(input.value);
      if (isNaN(num) || num < -100 || num > 100) {
        errorDiv.textContent = "Please enter a number between -100 and 100.";
        valid = false;
      } else {
        errorDiv.textContent = "";
      }
    } else {
      errorDiv.textContent = "";
    }
  });

  if (!valid) {
    errorSummary.textContent = "Please fix the errors above.";
  }
  return valid;
}

function greetUser(name) {
  return `Hello, I’m ${name}.`;
}

function runTasks(data) {
  const { name, userNumber, sentence, fruits } = data;
  const num = Number(userNumber);

  let outputStr = "";

  // 1. Variables & Constants, Arithmetic
  outputStr += "1. Variables & Constants, Arithmetic\n";
  outputStr += `BASE_NUMBER: ${BASE_NUMBER}\n`;
  outputStr += `User Number: ${num}\n`;
  outputStr += `Sum: ${BASE_NUMBER + num}\n`;
  outputStr += `Difference: ${BASE_NUMBER - num}\n`;
  outputStr += `Product: ${BASE_NUMBER * num}\n`;
  outputStr += `Quotient: ${
    num === 0 ? "Division by zero" : (BASE_NUMBER / num).toFixed(2)
  }\n\n`;

  // 2. Strings & String Methods
  outputStr += "2. Strings & String Methods\n";
  outputStr += `Original: "${sentence}"\n`;
  outputStr += `Uppercase: "${sentence.toUpperCase()}"\n`;
  outputStr += `Lowercase: "${sentence.toLowerCase()}"\n\n`;

  // 3. If Statements & Ternary Operator
  outputStr += "3. If Statements & Ternary Operator\n";
  // if statement
  if (num > 0) {
    outputStr += "Using if: Number is positive.\n";
  } else if (num < 0) {
    outputStr += "Using if: Number is negative.\n";
  } else {
    outputStr += "Using if: Number is zero.\n";
  }
  // ternary operator
  const ternaryCheck =
    num > 0
      ? "positive"
      : num < 0
      ? "negative"
      : "zero";
  outputStr += `Using ternary: Number is ${ternaryCheck}.\n\n`;

  // 4. Loops
  outputStr += "4. Loops\n";
  outputStr += "For loop counting from 1 to user number:\n";
  if (num > 0) {
    for (let i = 1; i <= num; i++) {
      outputStr += i + " ";
    }
  } else {
    outputStr += "(No output for non-positive number)";
  }
  outputStr += "\nWhile loop counting down from 5:\n";
  let count = 5;
  while (count > 0) {
    outputStr += count + " ";
    count--;
  }
  outputStr += "\n\n";

  // 5. Functions & Arrays
  outputStr += "5. Functions & Arrays\n";
  outputStr += greetUser(name) + "\n";
  outputStr += `Favorite fruits: ${fruits.join(", ")}\n`;

  return outputStr;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) {
    output.textContent = "";
    output.classList.remove("visible");
    return;
  }

  // Collect data
  const data = {
    name: form.name.value.trim(),
    userNumber: form.userNumber.value.trim(),
    sentence: form.sentence.value.trim(),
    fruits: [
      form.fruit1.value.trim(),
      form.fruit2.value.trim(),
      form.fruit3.value.trim(),
    ],
  };

  const result = runTasks(data);
  output.textContent = result;
  output.classList.add("visible");

  // Optional: sound feedback on run
  if (window.AudioContext) {
    const context = new AudioContext();
    const o = context.createOscillator();
    const g = context.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(440, context.currentTime);
    g.gain.setValueAtTime(0.1, context.currentTime);
    o.connect(g);
    g.connect(context.destination);
    o.start();
    o.stop(context.currentTime + 0.1);
  }
});

resetButton.addEventListener("click", () => {
  form.reset();
  output.textContent = "";
  output.classList.remove("visible");
  errorSummary.textContent = "";
  fields.forEach(({ id }) => {
    document.getElementById(id + "Error").textContent = "";
  });
});
