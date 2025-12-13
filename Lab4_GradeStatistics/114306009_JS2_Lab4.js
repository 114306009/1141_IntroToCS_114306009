
const mathInput = document.getElementById("mathInput");
const englishInput = document.getElementById("englishInput");
const submitBtn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");

const gradeBody = document.getElementById("gradeBody");

const mathAvgCell = document.getElementById("mathAvg");
const englishAvgCell = document.getElementById("englishAvg");
const overallAvgCell = document.getElementById("overallAvg");

let rowCount = 0;

submitBtn.addEventListener("click", function () {
  msg.textContent = "";

  // Read inputs
  const mathVal = Number(mathInput.value);
  const engVal = Number(englishInput.value);

  // Validate inputs (only accept num)
  if (mathInput.value.trim() === "" || englishInput.value.trim() === "") {
    msg.textContent = "Please enter both Math and English grades.";
    return;
  }
  if (!Number.isFinite(mathVal) || !Number.isFinite(engVal)) {
    msg.textContent = "Invalid input. Please enter numbers only.";
    return;
  }
  if (mathVal < 0 || mathVal > 100 || engVal < 0 || engVal > 100) {
    msg.textContent = "Grades should be between 0 and 100.";
    return;
  }

  // Add row
  rowCount += 1;
  const rowAvg = (mathVal + engVal) / 2;

  const tr = document.createElement("tr");

  // # column
  const tdIndex = document.createElement("td");
  tdIndex.textContent = String(rowCount);
  tr.appendChild(tdIndex);

  // Math column
  const tdMath = document.createElement("td");
  tdMath.textContent = mathVal.toFixed(0);
  tdMath.className = "mathScore";
  tr.appendChild(tdMath);

  // English column
  const tdEng = document.createElement("td");
  tdEng.textContent = engVal.toFixed(0);
  tdEng.className = "englishScore";
  tr.appendChild(tdEng);

  // Row average column
  const tdAvg = document.createElement("td");
  tdAvg.textContent = rowAvg.toFixed(2);
  tdAvg.className = "rowAvg";
  tr.appendChild(tdAvg);

  gradeBody.appendChild(tr);

  // Update footer averages
  updateColumnAverages();

  // Clear inputs for next entry
  mathInput.value = "";
  englishInput.value = "";
  mathInput.focus();
});

function updateColumnAverages() {
  // Collect all math/english values from table
  const mathCells = document.querySelectorAll(".mathScore");
  const engCells = document.querySelectorAll(".englishScore");

  let mathSum = 0;
  let engSum = 0;

  const n = mathCells.length; // number of rows

  for (let i = 0; i < n; i++) {
    mathSum += Number(mathCells[i].textContent);
    engSum += Number(engCells[i].textContent);
  }

  const mathAvg = n === 0 ? 0 : mathSum / n;
  const engAvg = n === 0 ? 0 : engSum / n;

  // Overall average score in footer row
  // (Since each row has 2 subjects, overall average can be average of the two column averages)
  const overallAvg = (mathAvg + engAvg) / 2;

  // Display
  mathAvgCell.textContent = n === 0 ? "-" : mathAvg.toFixed(2);
  englishAvgCell.textContent = n === 0 ? "-" : engAvg.toFixed(2);
  overallAvgCell.textContent = n === 0 ? "-" : overallAvg.toFixed(2);
}