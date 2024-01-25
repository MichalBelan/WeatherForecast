$(document).ready(function () {
  // Inicializácia DataTable pre tabuľku HTML s ID 'weatherTable'
  $("#weatherTable").DataTable({
    // Povolenie stránkovania s 10 riadkami na stránku
    paging: true,
    pageLength: 10,
    // Povolenie triedenia stĺpcov
    ordering: true,
    // Povolenie funkcie vyhľadávania
    searching: true,
  });
});
