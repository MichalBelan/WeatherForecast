function calculateHeatIndex() {
  // Získanie vstupu od používateľa
  var temperature = parseFloat(document.getElementById("temperature").value);
  var unit = document.getElementById("unit").value;
  var humidity = parseFloat(document.getElementById("humidity").value);

  // Skontrolujte, či je teplota nižšia ako minimum pre výpočet
  if (
    (unit === "celsius" && temperature < 26.7) ||
    (unit === "fahrenheit" && temperature < 80)
  ) {
    document.getElementById("result").innerHTML =
      "Heat Index cannot be calculated for temperatures below 26.7°C or 80°F.";

    return;
  }

  // Previesť teplotu na Celzia, ak je v stupňoch Fahrenheita
  if (unit === "fahrenheit") {
    temperature = (temperature - 32) * (5 / 9);
  }

  // Výpočet indexu tepla
  var heatIndex =
    -42.379 +
    2.04901523 * temperature +
    10.14333127 * humidity -
    0.22475541 * temperature * humidity -
    6.83783e-3 * temperature * temperature -
    5.481717e-2 * humidity * humidity +
    1.22874e-3 * temperature * temperature * humidity +
    8.5282e-4 * temperature * humidity * humidity -
    1.99e-6 * temperature * temperature * humidity * humidity;

  // Zobrazenie výsledku
  var resultMessage = "Heat Index: " + heatIndex.toFixed(2) + " °C";
  document.getElementById("result").innerHTML = resultMessage;

  // Uloženie výsledku do miestneho úložiska
  saveResultToLocalStorage(resultMessage);

  // Zobrazenie posledných 5 výsledkov
  displayLast5Results();
}

function saveResultToLocalStorage(result) {
  // Získanie existujúcich výsledkov z miestneho úložiska alebo inicializácia prázdneho poľa
  var results = JSON.parse(localStorage.getItem("heatIndexResults")) || [];

  // Pridanie nového výsledku do poľa
  results.push(result);

  // Ponechajte si len posledných 5 výsledkov
  results = results.slice(-5);

  // Uloženie aktualizovaného poľa späť do miestneho úložiska
  localStorage.setItem("heatIndexResults", JSON.stringify(results));
}

function displayLast5Results() {
  // Získanie posledných 5 výsledkov z miestneho úložiska
  var results = JSON.parse(localStorage.getItem("heatIndexResults")) || [];

  // Zobrazenie výsledkov na stránke
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "<strong>Last 5 Results:</strong>";

  results.forEach(function (result) {
    var listItem = document.createElement("li");
    listItem.textContent = result;
    historyList.appendChild(listItem);
  });
}
