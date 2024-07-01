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
  const value = parseFloat(document.getElementById("value").value);
  let insurance = (value / 10) * 0.03;

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

      if (document.getElementById("delivery-in-poland").checked) {
        // Проверка оценочной стоимости
        if (value < 12000.01) {
          // Если выбрана опция "Международная" (com === true)
          if (document.getElementById("commerce").checked) {
            // Расчет стоимости в зависимости от веса
            if (totalWeight < 2.01) {
              cost = 100;
            } else if (totalWeight < 5.01) {
              cost = 130;
            } else if (totalWeight > 5.01) {
              cost = 130 + (totalWeight - 5) * 11;
            }
          } else {
            // Если выбрана опция "Национальная"
            // Расчет стоимости в зависимости от веса
            if (totalWeight < 2.01) {
              cost = 60;
            } else if (totalWeight < 5.01) {
              cost = 80;
            } else if (totalWeight < 10.1) {
              cost = 110;
            } else if (totalWeight < 15.01) {
              cost = 130;
            } else if (totalWeight < 20.01) {
              cost = 150;
            } else if (totalWeight < 30.01) {
              cost = 190;
            } else if (totalWeight > 30.01) {
              cost = totalWeight * 7;
            }
          }
        } else if (value < 50000.01) {
          // Расчет стоимости в зависимости от веса для больших оценочных стоимостей
          if (totalWeight < 2.01) {
            cost = 100;
          } else if (totalWeight < 5.01) {
            cost = 130;
          } else if (totalWeight > 5.01) {
            cost = 130 + (totalWeight - 5) * 11;
          }
        } else if (value > 50000.01) {
          // Расчет стоимости в зависимости от веса для очень больших оценочных стоимостей
          if (totalWeight < 2.01) {
            cost = 100;
          } else if (totalWeight > 2.01) {
            cost = 100 + (totalWeight - 2) * 20;
          }
        }
      } else {
        // Если выбран тариф "Голд" или "Платинум" (polska === false)
        if (value < 12000.01) {
          // Если выбрана опция "Международная" (com === true)
          if (document.getElementById("commerce").checked) {
            // Расчет стоимости в зависимости от веса
            if (totalWeight < 2.01) {
              cost = 80;
            } else if (totalWeight < 5.01) {
              cost = 100;
            } else if (totalWeight > 5.01) {
              cost = 100 + (totalWeight - 5) * 10;
            }
          } else {
            // Если выбрана опция "Национальная"
            // Расчет стоимости в зависимости от веса
            if (totalWeight < 2.01) {
              cost = 40;
            } else if (totalWeight < 5.01) {
              cost = 60;
            } else if (totalWeight < 10.1) {
              cost = 80;
            } else if (totalWeight < 15.01) {
              cost = 100;
            } else if (totalWeight < 20.01) {
              cost = 120;
            } else if (totalWeight < 30.01) {
              cost = 150;
            } else if (totalWeight > 30.01) {
              cost = totalWeight * 5;
            }
          }
        } else if (value < 50000.01) {
          // Расчет стоимости в зависимости от веса для больших оценочных стоимостей
          if (totalWeight < 2.01) {
            cost = 80;
          } else if (totalWeight < 5.01) {
            cost = 100;
          } else if (totalWeight > 5.01) {
            cost = 100 + (totalWeight - 5) * 10;
          }
        } else if (insurance > 50000.01) {
          // Расчет стоимости в зависимости от веса для очень больших оценочных стоимостей
          if (totalWeight < 2.01) {
            cost = 100;
          } else if (totalWeight > 2.01) {
            cost = 100 + (totalWeight - 2) * 20;
          }
        }
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

  resultText += `<p class="total-result">Сума страхування: ${insurance.toFixed(
    2
  )} zł</p>`;
  totalCost += insurance;
  resultText += `<p class="total-result">Загальна вартість доставки: ${totalCost.toFixed(
    2
  )} zł</p>`;

  document.getElementById("result").innerHTML = resultText;
}
