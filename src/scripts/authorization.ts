
class Authorization{
    constructor() {
        this.initialiseAllBtns();
        localStorage.removeItem("$companiesList");
    }

    public initialiseAllBtns(): void{
        this.inititaliseEnterBtn();
        this.initialiseRegistrationRedirectBtn();
        this.initialiseCheckBox();
    }
    public initialiseCheckBox(): void{
        document.querySelector("input[type = checkbox]")!
            .addEventListener("change", function (){
                //@ts-ignore нужно обращаться к чекбоксу
                const checkbox = this as HTMLInputElement;
                const password = (checkbox!.parentNode!.parentNode!
                    .querySelector(".wrapper-password") as HTMLInputElement);
                if(checkbox.checked)
                    password.type = "text";
                else
                    password.type = "password";
            });
    }
    public inititaliseEnterBtn(): void{
        const enterBtn = document.querySelector(".wrapper__addBtn");
        const login = document.querySelector(".wrapper__div-login") as HTMLInputElement;
        const password = document.querySelector(".wrapper-password") as HTMLInputElement;
        enterBtn!.addEventListener("click", () => {
            if(enterBtn!.textContent === "Сохранить"){
                this.registerNewUser(login, password);
                return;
            }
            const passwordInStorage = localStorage.getItem(login.value);
            if(login.value.trim().length === 0 || login.value.includes("$")
                || password.value.trim().length === 0 || passwordInStorage === null
                || passwordInStorage !== password.value) {
                alert("Некорректный логин или пароль")
                return;
            }
            localStorage.setItem("$authorized", `${login.value}`)
            window.location.href = "main_page.html";
    });
    }
    public initialiseRegistrationRedirectBtn(){
        const registrationBtn = document.querySelector(".wrapper-registration");
            registrationBtn!
            .addEventListener("click", function (){
                // @ts-ignore обращаемся к this как к элементу, по которому кликнули
                const elem = this as HTMLElement;
                const checkboxElem = document.querySelector(".wrapper-checkbox") as HTMLElement;
                const repeatPassElem = document.querySelector(".wrapper-repeat") as HTMLElement;
                const btnElem = document.querySelector(".wrapper__addBtn") as HTMLElement;
                app.clearAllInputs([checkboxElem,repeatPassElem]);
                if(elem.textContent === "Авторизация"){
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
    }
    public clearAllInputs(inputs: HTMLElement[]): void{
        const [checkboxElem, repeatPassElem] = inputs;
        const password = document.querySelector(".wrapper-password") as HTMLInputElement;
        (checkboxElem as HTMLInputElement).checked = false;
        (repeatPassElem as HTMLInputElement).value = "";
        (document.querySelector(".wrapper-repeat1") as HTMLInputElement).value = "";
        password.value = "";
        password!.type = "password";
        (document.querySelector(".wrapper__div-login") as HTMLInputElement).value = "";
    };
    public registerNewUser(login: HTMLInputElement, password: HTMLInputElement): void{
        const repeatPassword = document.querySelector(".wrapper-repeat1") as HTMLInputElement;
        if(login.value.trim().length === 0 || login.value.includes("$")
            || password.value.trim().length === 0 || password.value !== repeatPassword.value){
            alert("Некорректный логин или пароль")
            return;
        }
        if(localStorage.getItem(login.value) !== null){
            alert("Пользователь с таким логином уже существует!")
            return;
        }
        localStorage.setItem(login.value, password.value);
        alert("Успех");
    }
}

let app = new Authorization();