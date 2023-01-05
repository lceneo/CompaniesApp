var Authorization = /** @class */ (function () {
    function Authorization() {
        this.initialiseAllBtns();
        localStorage.removeItem("$companiesList");
    }
    Authorization.prototype.initialiseAllBtns = function () {
        this.inititaliseEnterBtn();
        this.initialiseRegistrationRedirectBtn();
        this.initialiseCheckBox();
    };
    Authorization.prototype.initialiseCheckBox = function () {
        document.querySelector("input[type = checkbox]")
            .addEventListener("change", function () {
            //@ts-ignore нужно обращаться к чекбоксу
            var checkbox = this;
            var password = checkbox.parentNode.parentNode
                .querySelector(".wrapper-password");
            if (checkbox.checked)
                password.type = "text";
            else
                password.type = "password";
        });
    };
    Authorization.prototype.inititaliseEnterBtn = function () {
        var _this = this;
        var enterBtn = document.querySelector(".wrapper__addBtn");
        var login = document.querySelector(".wrapper__div-login");
        var password = document.querySelector(".wrapper-password");
        enterBtn.addEventListener("click", function () {
            if (enterBtn.textContent === "Сохранить") {
                _this.registerNewUser(login, password);
                return;
            }
            var passwordInStorage = localStorage.getItem(login.value);
            if (login.value.trim().length === 0 || login.value.includes("$")
                || password.value.trim().length === 0 || passwordInStorage === null
                || passwordInStorage !== password.value) {
                alert("Некорректный логин или пароль");
                return;
            }
            localStorage.setItem("$authorized", "".concat(login.value));
            window.location.href = "main_page.html";
        });
    };
    Authorization.prototype.initialiseRegistrationRedirectBtn = function () {
        var registrationBtn = document.querySelector(".wrapper-registration");
        registrationBtn
            .addEventListener("click", function () {
            // @ts-ignore обращаемся к this как к элементу, по которому кликнули
            var elem = this;
            var checkboxElem = document.querySelector(".wrapper-checkbox");
            var repeatPassElem = document.querySelector(".wrapper-repeat");
            var btnElem = document.querySelector(".wrapper__addBtn");
            app.clearAllInputs([checkboxElem, repeatPassElem]);
            if (elem.textContent === "Авторизация") {
                elem.textContent = "Регистрация";
                checkboxElem.style.display = "block";
                repeatPassElem.style.display = "none";
                btnElem.textContent = "Войти";
                return;
            }
            elem.textContent = "Авторизация";
            checkboxElem.style.display = "none";
            repeatPassElem.style.display = "block";
            btnElem.textContent = "Сохранить";
        });
    };
    Authorization.prototype.clearAllInputs = function (inputs) {
        var checkboxElem = inputs[0], repeatPassElem = inputs[1];
        var password = document.querySelector(".wrapper-password");
        checkboxElem.checked = false;
        repeatPassElem.value = "";
        document.querySelector(".wrapper-repeat1").value = "";
        password.value = "";
        password.type = "password";
        document.querySelector(".wrapper__div-login").value = "";
    };
    ;
    Authorization.prototype.registerNewUser = function (login, password) {
        var repeatPassword = document.querySelector(".wrapper-repeat1");
        if (login.value.trim().length === 0 || login.value.includes("$")
            || password.value.trim().length === 0 || password.value !== repeatPassword.value) {
            alert("Некорректный логин или пароль");
            return;
        }
        if (localStorage.getItem(login.value) !== null) {
            alert("Пользователь с таким логином уже существует!");
            return;
        }
        localStorage.setItem(login.value, password.value);
        alert("Успех");
    };
    return Authorization;
}());
var app = new Authorization();
