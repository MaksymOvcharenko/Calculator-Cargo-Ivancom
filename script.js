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
}

function removePackage(id) {
  const packageElement = document.getElementById(`package${id}`);
  packageElement.remove();
}

function calculate() {
  let totalWeight = 0;
  let totalVolumetricWeight = 0;

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
    }
  }

  let cost = 0;

  if (totalWeight <= 0.5) {
    cost = 40;
  } else if (totalWeight <= 5) {
    cost = 45;
  } else if (totalWeight <= 10) {
    cost = 60;
  } else if (totalWeight <= 15) {
    cost = 80;
  } else if (totalWeight <= 20) {
    cost = 90;
  } else if (totalWeight <= 25) {
    cost = 110;
  } else {
    cost = totalWeight * 5;
  }

  const value = parseFloat(document.getElementById("value").value);
  let insurance = 0;

  if (value <= 1000) {
    insurance = value * 0.01;
  } else {
    insurance = 10 + (value - 1000) * 0.11;
  }

  const totalCost = cost + insurance;
  document.getElementById(
    "result"
  ).innerText = `Фактична вага: ${totalWeight.toFixed(
    2
  )} кг\nОб'ємна вага: ${totalVolumetricWeight.toFixed(
    2
  )} кг\nВартість доставки: ${totalCost.toFixed(2)} zł`;
}
