// Načítanie balíka 'corechart' z rozhrania Google Charts API
google.charts.load("current", { packages: ["corechart"] });

// Nastavenie funkcie spätného volania na načítanie teplotného grafu po načítaní rozhrania Google Charts API
google.charts.setOnLoadCallback(() =>
  loadTemperatureChart(forecastApiUrl, "Forecast")
);

// Funkcia na načítanie údajov teplotného grafu zo zadaného API a vytvorenie grafu
function loadTemperatureChart(apiUrl, label) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Výpis údajov o čase a teplote z odpovede API
      const time = data.hourly.time.map((time) => new Date(time));
      const temperature = data.hourly.temperature_2m;

      // Vytvorenie tabuľky DataTable pre graf Google a jej naplnenie získanými údajmi
      const chartData = new google.visualization.DataTable();
      chartData.addColumn("datetime", "Time");
      chartData.addColumn("number", "Temperature (°C)");

      for (let i = 0; i < time.length; i++) {
        chartData.addRow([time[i], temperature[i]]);
      }

      // Volanie funkcie na vytvorenie alebo aktualizáciu teplotného grafu s tabuľkou DataTable a štítkom
      createOrUpdateChart(chartData, label);
    })
    .catch((error) => {
      // Riešenie chýb, ktoré sa môžu vyskytnúť počas procesu načítania údajov
      console.error("Error loading temperature data:", error);
    });
}
// Funkcia na vytvorenie alebo aktualizáciu teplotného grafu so zadanými údajmi a označením
function createOrUpdateChart(data, label) {
  // Definovať možnosti vzhľadu grafu
  const options = {
    title: "Temperature Chart",
    hAxis: {
      title: "Time",
      format: "MMM d, HH:mm",
    },
    vAxis: {
      title: "Temperature (°C)",
    },
    legend: { position: "none" },
  };

  const chart = new google.visualization.LineChart(
    document.getElementById("weatherChart")
  );
  chart.draw(data, options);
}

document.addEventListener("DOMContentLoaded", function () {
  const forecastApiUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m&timezone=Europe%2FLondon";

  const historicalApiUrl =
    "https://archive-api.open-meteo.com/v1/archive?latitude=51.5085&longitude=-0.1257&start_date=2024-01-07&end_date=2024-01-14&hourly=temperature_2m&timezone=Europe%2FLondon";

  // Načítanie grafu predpovede teploty pri načítaní stránky
  loadTemperatureChart(forecastApiUrl, "Forecast");

  const forecastBtn = document.getElementById("forecastBtn");
  const historicalBtn = document.getElementById("historicalBtn");
  // Načítanie predpovede alebo historického grafu teploty na základe kliknutia na tlačidlo
  forecastBtn.addEventListener("click", () =>
    loadTemperatureChart(forecastApiUrl, "Forecast")
  );
  historicalBtn.addEventListener("click", () =>
    loadTemperatureChart(historicalApiUrl, "Historical")
  );
});
