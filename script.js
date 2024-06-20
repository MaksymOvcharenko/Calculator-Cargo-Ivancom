// script.js
document.getElementById("add-package").addEventListener("click", addPackage);
document.getElementById("calculate").addEventListener("click", calculate);

let packageCount = 1;

function addPackage() {
  packageCount++;
  const packageContainer = document.getElementById("package-container");
  const newPackage = document.createElement("div");
  newPackage.classList.add("package");
  newPackage.id = `package${packageCount}`;
  newPackage.innerHTML = `
        <h2>Посилка ${packageCount}</h2>
        <div class="dimensions">
            <label for="length">Довжина (см):</label>
            <input type="number" id="length${packageCount}" name="length" required>
            <label for="width">Ширина (см):</label>
            <input type="number" id="width${packageCount}" name="width" required>
            <label for="height">Висота (см):</label>
            <input type="number" id="height${packageCount}" name="height" required>
        </div>
        <label for="weight">Фактична вага (кг):</label>
        <input type="number" id="weight${packageCount}" name="weight" required>
        <button class="remove-package" onclick="removePackage(${packageCount})">Видалити посилку</button>
    `;
  packageContainer.appendChild(newPackage);
  packageContainer.scrollIntoView({ behavior: "smooth" }); // Прокручування до нової посилки
}

function removePackage(id) {
  const packageElement = document.getElementById(`package${id}`);
  packageElement.remove();
}

function calculate() {
  let totalWeight = 0;
  let totalVolumetricWeight = 0;
  let totalCost = 0;
  let resultText = "";

  for (let i = 1; i <= packageCount; i++) {
    if (document.getElementById(`package${i}`)) {
      const length = parseFloat(document.getElementById(`length${i}`).value);
      const width = parseFloat(document.getElementById(`width${i}`).value);
      const height = parseFloat(document.getElementById(`height${i}`).value);
      const weight = parseFloat(document.getElementById(`weight${i}`).value);

      const volumetricWeight = (length * width * height) / 4000;
      totalVolumetricWeight += volumetricWeight;
      const finalWeight = Math.max(weight, volumetricWeight);
      totalWeight += finalWeight;

      let cost = 0;
      if (finalWeight <= 0.5) {
        cost = 40;
      } else if (finalWeight <= 5) {
        cost = 45;
      } else if (finalWeight <= 10) {
        cost = 60;
      } else if (finalWeight <= 15) {
        cost = 80;
      } else if (finalWeight <= 20) {
        cost = 90;
      } else if (finalWeight <= 25) {
        cost = 110;
      } else {
        cost = 110 + (finalWeight - 25) * 5;
      }

      resultText += `
                <div class="package-result">
                    <p>Посилка ${i} - Фактична вага: ${weight.toFixed(2)} кг</p>
                    <p>Об'ємна вага: ${volumetricWeight.toFixed(2)} кг</p>
                    <p>Вартість: ${cost.toFixed(2)} zł</p>
                </div>
            `;
      totalCost += cost;
    }
  }

  const value = parseFloat(document.getElementById("value").value);
  let insurance = 0;

  if (value <= 1000) {
    insurance = value * 0.01;
  } else {
    insurance = 10 + (value - 1000) * 0.11;
  }

  resultText += `<p class="total-result">Сума страхування: ${insurance.toFixed(
    2
  )} zł</p>`;
  totalCost += insurance;
  resultText += `<p class="total-result">Загальна вартість доставки: ${totalCost.toFixed(
    2
  )} zł</p>`;

  document.getElementById("result").innerHTML = resultText;
}
