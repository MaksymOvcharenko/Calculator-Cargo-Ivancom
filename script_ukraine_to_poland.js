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
            <label for="length${packageCount}">Довжина (см):</label>
            <input type="number" id="length${packageCount}" name="length" required>
            <label for="width${packageCount}">Ширина (см):</label>
            <input type="number" id="width${packageCount}" name="width" required>
            <label for="height${packageCount}">Висота (см):</label>
            <input type="number" id="height${packageCount}" name="height" required>
        </div>
        <label for="weight${packageCount}">Фактична вага (кг):</label>
        <input type="number" id="weight${packageCount}" name="weight" required>
        <button class="remove-package" type="button" data-package-id="${packageCount}">Видалити посилку</button>
    `;
  packageContainer.appendChild(newPackage);
  packageContainer.scrollIntoView({ behavior: "smooth" });

  // Додаємо обробник видалення для кожної кнопки
  newPackage
    .querySelector(".remove-package")
    .addEventListener("click", function () {
      removePackage(packageCount);
    });
}

function removePackage(id) {
  const packageElement = document.getElementById(`package${id}`);
  if (packageElement) {
    packageElement.remove();
  }
}

function calculate() {
  let totalWeight = 0;
  let totalVolumetricWeight = 0;
  let totalCost = 0;
  let resultText = "";
  const value = parseFloat(document.getElementById("value").value);
  let insurance = (value / 10) * 0.03;

  for (let i = 1; i <= packageCount; i++) {
    const packageElement = document.getElementById(`package${i}`);
    if (packageElement) {
      const length = parseFloat(document.getElementById(`length${i}`).value);
      const width = parseFloat(document.getElementById(`width${i}`).value);
      const height = parseFloat(document.getElementById(`height${i}`).value);
      const weight = parseFloat(document.getElementById(`weight${i}`).value);

      const volumetricWeight = (length * width * height) / 4000;
      totalVolumetricWeight += volumetricWeight;
      const finalWeight = Math.max(weight, volumetricWeight);
      totalWeight += finalWeight;

      resultText += `
        <div class="package-result">
          <p>Посилка ${i} - Фактична вага: ${weight.toFixed(2)} кг</p>
          <p>Об'ємна вага: ${volumetricWeight.toFixed(2)} кг</p>
        </div>
      `;
    }
  }

  const finalTotalWeight = Math.max(totalWeight, totalVolumetricWeight);

  let cost = 0;

  if (document.getElementById("delivery-in-poland").checked) {
    if (value < 12000.01) {
      if (document.getElementById("commerce").checked) {
        if (finalTotalWeight < 2.01) {
          cost = 100;
        } else if (finalTotalWeight < 5.01) {
          cost = 130;
        } else if (finalTotalWeight > 5.01) {
          cost = 130 + (finalTotalWeight - 5) * 11;
        }
      } else {
        if (finalTotalWeight < 2.01) {
          cost = 60;
        } else if (finalTotalWeight < 5.01) {
          cost = 80;
        } else if (finalTotalWeight < 10.1) {
          cost = 110;
        } else if (finalTotalWeight < 15.01) {
          cost = 130;
        } else if (finalTotalWeight < 20.01) {
          cost = 150;
        } else if (finalTotalWeight < 30.01) {
          cost = 190;
        } else if (finalTotalWeight > 30.01) {
          cost = finalTotalWeight * 7;
        }
      }
    } else if (value < 50000.01) {
      if (finalTotalWeight < 2.01) {
        cost = 100;
      } else if (finalTotalWeight < 5.01) {
        cost = 130;
      } else if (finalTotalWeight > 5.01) {
        cost = 130 + (finalTotalWeight - 5) * 11;
      }
    } else if (value > 50000.01) {
      if (finalTotalWeight < 2.01) {
        cost = 100;
      } else if (finalTotalWeight > 2.01) {
        cost = 100 + (finalTotalWeight - 2) * 20;
      }
    }
  } else {
    if (value < 12000.01) {
      if (document.getElementById("commerce").checked) {
        if (finalTotalWeight < 2.01) {
          cost = 80;
        } else if (finalTotalWeight < 5.01) {
          cost = 100;
        } else if (finalTotalWeight > 5.01) {
          cost = 100 + (finalTotalWeight - 5) * 10;
        }
      } else {
        if (finalTotalWeight < 2.01) {
          cost = 40;
        } else if (finalTotalWeight < 5.01) {
          cost = 60;
        } else if (finalTotalWeight < 10.1) {
          cost = 80;
        } else if (finalTotalWeight < 15.01) {
          cost = 100;
        } else if (finalTotalWeight < 20.01) {
          cost = 120;
        } else if (finalTotalWeight < 30.01) {
          cost = 150;
        } else if (finalTotalWeight > 30.01) {
          cost = finalTotalWeight * 5;
        }
      }
    } else if (value < 50000.01) {
      if (finalTotalWeight < 2.01) {
        cost = 80;
      } else if (finalTotalWeight < 5.01) {
        cost = 100;
      } else if (finalTotalWeight > 5.01) {
        cost = 100 + (finalTotalWeight - 5) * 10;
      }
    } else if (value > 50000.01) {
      insurance = (value / 10) * 0.01;
      if (finalTotalWeight < 2.01) {
        cost = 100;
      } else if (finalTotalWeight > 2.01) {
        cost = 100 + (finalTotalWeight - 2) * 20;
      }
    }
  }

  resultText += `<p class="total-result">Сума страхування: ${insurance.toFixed(
    2
  )} zł</p>`;
  totalCost = cost + insurance;
  resultText += `<p class="total-result">Загальна вартість доставки: ${totalCost.toFixed(
    2
  )} zł</p>`;

  document.getElementById("result").innerHTML = resultText;
}
