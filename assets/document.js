document.addEventListener("DOMContentLoaded", function() {
    // Pobierz parametry z URL
    const params = new URLSearchParams(window.location.search);

    // Seria i numer
    const seriesAndNumber = localStorage.getItem("seriesAndNumber") || "";
    document.getElementById("seriesAndNumber").textContent = seriesAndNumber;

    // Termin ważności i Data wydania z URL lub localStorage
    let expiryDate = params.get("expiryDate") || localStorage.getItem("expiryDate") || "";
    let givenDate = params.get("givenDate") || localStorage.getItem("givenDate") || "";

    // Zapisz do localStorage jeśli są w URL
    if (params.get("expiryDate")) localStorage.setItem("expiryDate", expiryDate);
    if (params.get("givenDate")) localStorage.setItem("givenDate", givenDate);

    document.getElementById("expiryDate").textContent = expiryDate;
    document.getElementById("givenDate").textContent = givenDate;
});

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var date = new Date();

if (localStorage.getItem("cardUpdate") == null){
  localStorage.setItem("cardUpdate", "24.12.2024")
}

var update = document.querySelector(".update");
update.addEventListener('click', () => {
  var newDate = date.toLocaleDateString("pl-PL", { year: 'numeric', month: '2-digit', day: '2-digit' });
  localStorage.setItem("cardUpdate", newDate);
  updateText.innerHTML = newDate;

  scroll(0, 0)
});

document.querySelector('.bottom_update_value').innerHTML = localStorage.getItem('cardUpdate')
