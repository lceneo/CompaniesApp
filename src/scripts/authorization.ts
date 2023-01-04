
class Authorization{
    constructor() {
        this.initialiseAllBtns();
    }

    public initialiseAllBtns(): void{
        this.inititaliseEnterBtn();
        this.initialiseRegistrationRedirectBtn();
    }
    public inititaliseEnterBtn(): void{
        const enterBtn = document.querySelector(".main__button");
        const login = document.querySelector(".main__wrapper-login") as HTMLInputElement;
        const password = document.querySelector(".main__wrapper-password") as HTMLInputElement;
        enterBtn!.addEventListener("click", () => {
            if(enterBtn!.textContent === "Сохранить"){
                this.registerNewUser(login, password);
                console.log(localStorage.getItem(login.value))
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
            window.location.href = "index.html";
    });
    }
    public initialiseRegistrationRedirectBtn(){
        const registrationBtn = document.querySelector(".main__wrapper-registration");
            registrationBtn!
            .addEventListener("click", function (){
                // @ts-ignore обращаемся к this как к элементу, по которому кликнули
                const elem = this as HTMLElement;
                const checkboxElem = document.querySelector(".main__wrapper-checkbox") as HTMLElement;
                const repeatPassElem = document.querySelector(".main__wrapper-repeat") as HTMLElement;
                const btnElem = document.querySelector(".main__button") as HTMLElement;
                app.clearAllInputs([checkboxElem,repeatPassElem]);
                if(elem.textContent === "Авторизация"){
                    elem.textContent = "Регистрация";
                    checkboxElem.style.display = "block";
                    repeatPassElem.style.display = "none";
                    btnElem.textContent = "Войти"
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
        (checkboxElem as HTMLInputElement).checked = false;
        (repeatPassElem as HTMLInputElement).value = "";
        (document.querySelector(".main__wrapper-repeat1") as HTMLInputElement).value = "";
        (document.querySelector(".main__wrapper-password") as HTMLInputElement).value = "";
        (document.querySelector(".main__wrapper-login") as HTMLInputElement).value = "";
    };
    public registerNewUser(login: HTMLInputElement, password: HTMLInputElement): void{
        const repeatPassword = document.querySelector(".main__wrapper-repeat1") as HTMLInputElement;
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