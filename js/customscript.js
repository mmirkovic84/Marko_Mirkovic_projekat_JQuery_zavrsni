var scrollToTopBtn = document.querySelector(".gototop");
var rootElement = document.documentElement;

function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.8) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

window.onload = function () {
	document.addEventListener("click", function (event) {
		// if the clicked element isn't child of the navbar, you must close it if is open
		if (!event.target.closest("#navbar_id") && document.getElementById("navbarToggler").classList.contains("show")) {
			document.getElementById("hamburger_menu_button").click();
		}
	});
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Display funkcija za prikazivanje i skrivanje DIVova
function replace1(hide, show) {
  document.getElementById(hide).style.display = "none";
  document.getElementById(show).style.display = "block";
}

function replaceFirstPage() {
  document.getElementById('div2').style.display = "none";
  document.getElementById('div3').style.display = "block";
}
// provera unesenog imena
function checkName() {

  var fname = document.querySelector("#input1").value;
  var displayedName = document.querySelector(".ime");
  displayedName.innerHTML = fname;

  if (fname == '' || fname == null) {
    alert("Please enter your name to continue!!!");
  }
  else {
    replaceFirstPage();
  }
}

//dodavanje text boxa ispod radio buttona
function showText() {
  var radio7 = document.querySelector("#Radio7").checked;
  if (radio7 == true) {
    document.getElementById('addTextArea').style.display = 'block';
  }
  else {
    document.getElementById('addTextArea').style.display = 'none';
  }
}

// swichovanje finalnih poruka
function replaceFinalResults() {
  document.getElementById('div6').style.display = "none";
  document.getElementById('final1').style.display = "block";
}

function FinalMessage() {
  var textFinal = document.querySelector(".Text_final");
  var smileyFinal = document.querySelector(".Smiley_final");
  var rangeResult = document.querySelector("#customRange2").value;

  switch (rangeResult) {
    case "1":
      replaceFinalResults();
      textFinal.innerHTML = "Oops, Sorry to disapoint you.";
      smileyFinal.innerHTML = '<i class="bi bi-emoji-frown-fill" style="font-size: 6rem; color: rgb(255, 255, 255);"></i>';
      break;
    case "2":
      replaceFinalResults();
      textFinal.innerHTML = "I hope we will be better next time.";
      smileyFinal.innerHTML = '<i class="bi bi-emoji-expressionless-fill" style="font-size: 6rem; color: rgb(255, 255, 255);"></i>';
      break;
    case "3":
      replaceFinalResults();
      textFinal.innerHTML = "Golden Middle.";
      smileyFinal.innerHTML = '<i class="bi bi-emoji-smile-fill" style="font-size: 6rem; color: rgb(255, 255, 255);"></i>';
      break;
    case "4":
      replaceFinalResults();
      textFinal.innerHTML = "Thanks for the very good rating.";
      smileyFinal.innerHTML = '<i class="bi bi-emoji-laughing-fill" style="font-size: 6rem; color: rgb(255, 255, 255);"></i>';
      break;
    case "5":
      replaceFinalResults();
      textFinal.innerHTML = "Perfect. We are glad to meet your requirements.";
      smileyFinal.innerHTML = '<i class="bi bi-emoji-heart-eyes-fill" style="font-size: 6rem; color: rgb(255, 255, 255);"></i>';
      break;
    default: 'Error 404. Not Found!';
      break;
  }
}
