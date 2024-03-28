let userName = document.querySelector("[name='username']");
let age = document.querySelector("[name='age']");
let nameDiv = document.querySelector(".nam");
let ageDiv = document.querySelector(".ag");
let labels = document.querySelectorAll(".lbl");
let inputs = document.querySelectorAll(".myInp");
let show = document.getElementById("shw");
let clicked = false;
let reg = new RegExp(`^[-+=!@#$%^&*().,/]+$`);
let code = [
    8, 9, 13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 46, 91, 93,
    124, 125, 126, 133, 144, 173, 174, 175, 192, 255,
];
let meta = document.getElementsByTagName("meta");
const themes = document.querySelectorAll(".theme");
let theme;
let checkbox = document.querySelector(".toggle-checkbox");

inputs.forEach(function (inp, i) {
    inp.onblur = function () {
        labels[i].textContent = `${inp.value}`;
    };
});

userName.onblur = function () {
    labels[0].textContent = `${userName.value}`;
    if (userName.value !== "") {
        age.focus();
    }
};
//validating form
document.forms[0].onsubmit = function (e) {
    let userValid = false;
    let ageValid = false;

    userName.value !== "" && userName.value.length <= 10
        ? (userValid = true)
        : (userValid = false);
    age.value !== "" ? (ageValid = true) : (ageValid = false);

    if (!userValid || !ageValid) {
        e.preventDefault(true); //  preventing the default behavior of submit when clicked
        !userValid
            ? document.querySelector(".myName").classList.toggle("invalid")
            : "";
        !ageValid
            ? document.querySelector(".myAge").classList.toggle("invalid")
            : "";
        setTimeout(function () {
            document.querySelector(".myName").classList.remove("invalid");
            document.querySelector(".myAge").classList.remove("invalid");
        }, 600);
    } else {
        sessionStorage.setItem("name", userName.value);
        sessionStorage.setItem("age", age.value);
    }
};

//showing sent info
document.querySelector("button").onclick = function (e) {
    clicked = !clicked;
    let ag = sessionStorage.getItem("age");
    let name = sessionStorage.getItem("name");
    nameDiv.innerHTML = ` ${name || "unknown"}`;
    ageDiv.innerHTML = ` ${ag || "unknown"}`;
    clicked ? (show.textContent = "Hide") : (show.textContent = "Show");
    !clicked
        ? (document.querySelector(".info").style.display = "none")
        : (document.querySelector(".info").style.display = "flex");
};

userName.addEventListener("input", function (event) {
    if (userName.value.length === 10) {
        userName.blur();
    }
});
age.addEventListener("input", function (event) {
    if (age.value.length === 4) {
        age.blur();
    }
});
age.addEventListener("keydown", function (event) {
    if (reg.test(event.key)) {
        event.preventDefault();
    }
    if (isNaN(event.key) && !code.includes(event.keyCode)) {
        age.classList.add("true");
        document.querySelector("small").classList.add("shake");
        setTimeout(function () {
            document.querySelector("small").classList.remove("shake");
        }, 600);
    }
    if (!isNaN(event.key)) {
        age.classList.remove("true");
    }
});

//dark mode

checkbox.onclick = function () {
    this.classList.toggle("dark");
    this.classList.contains("dark")
        ? (this.value = "dark")
        : (this.value = "light");
    theme = this.value;
    change();
};
function change() {
    meta[--meta.length].content = theme;
    if (meta[--meta.length].content === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
    sessionStorage.setItem("theme", theme);
}
window.onload = () => {
    meta[--meta.length].content = sessionStorage.getItem("theme");
    theme = sessionStorage.getItem("theme");
    if (meta[--meta.length].content === "dark") {
        checkbox.setAttribute("checked", "");
        checkbox.classList.add("dark");
    } else {
        checkbox.removeAttribute("checked");
        checkbox.classList.remove("dark");
    }

    //clearing storage after 15s from loading
    setTimeout(function () {
        sessionStorage.clear();
    }, 15000);
};
let button = document.querySelector(".speak > button");
let text = document.querySelector(".speak > textarea");
button.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(text.value);
    speechSynthesis.speak(utterance);
});
