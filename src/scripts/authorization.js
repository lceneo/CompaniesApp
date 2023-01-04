var Authorization = /** @class */ (function () {
    function Authorization() {
        this.initialiseAllBtns();
    }
    Authorization.prototype.initialiseAllBtns = function () {
        this.inititaliseEnterBtn();
        this.initialiseRegistrationRedirectBtn();
    };
    Authorization.prototype.inititaliseEnterBtn = function () {
        var _this = this;
        var enterBtn = document.querySelector(".main__button");
        var login = document.querySelector(".main__wrapper-login");
        var password = document.querySelector(".main__wrapper-password");
        enterBtn.addEventListener("click", function () {
            if (enterBtn.textContent === "Сохранить") {
                _this.registerNewUser(login, password);
                console.log(localStorage.getItem(login.value));
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
            window.location.href = "index.html";
        });
    };
    Authorization.prototype.initialiseRegistrationRedirectBtn = function () {
        var registrationBtn = document.querySelector(".main__wrapper-registration");
        registrationBtn
            .addEventListener("click", function () {
            // @ts-ignore обращаемся к this как к элементу, по которому кликнули
            var elem = this;
            var checkboxElem = document.querySelector(".main__wrapper-checkbox");
            var repeatPassElem = document.querySelector(".main__wrapper-repeat");
            var btnElem = document.querySelector(".main__button");
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
        checkboxElem.checked = false;
        repeatPassElem.value = "";
        document.querySelector(".main__wrapper-repeat1").value = "";
        document.querySelector(".main__wrapper-password").value = "";
        document.querySelector(".main__wrapper-login").value = "";
    };
    ;
    Authorization.prototype.registerNewUser = function (login, password) {
        var repeatPassword = document.querySelector(".main__wrapper-repeat1");
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
