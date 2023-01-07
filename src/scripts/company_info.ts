
class CompanyDetailedInfo{
    constructor(public companyToDisplay: Company){
        this.createCompanySection();
        this.initialiseReturnBtn();
    }
    public createMap(){
        //подавляет ошибку ненахождения ymaps, который подключается через YMaps-api
        // @ts-ignore
        ymaps.ready(() => new ymaps.Map(document.querySelector(".company-location"),
                {
                    center: [this.companyToDisplay.latitude, this.companyToDisplay.longitude],
                    zoom: 7
                }));
    }
    public initialiseReturnBtn(){
        document.querySelector(".nav__link")!
            .addEventListener("click", () => window.location.href = "main_page.html");
    }
    public createCompanySection(): void{
        const companyWrapper = document.createElement("div");
        companyWrapper.classList.add("company-wrapper");
        companyWrapper.innerHTML = `
            <div class="company-description">
                 <img src= ${this.companyToDisplay.logo} alt = Лого:${this.companyToDisplay.business_name} width="450px" height="200px">
                 <h1 class="company-name">${this.companyToDisplay.business_name}</h1>
                 <p>Вид деятельности: ${this.companyToDisplay.industry}</p>
                 <p class="company-catchPhrase">${this.companyToDisplay.catch_phrase}</p>
                 <p>Контактный номер телефона: ${this.companyToDisplay.phone_number}</p>
                 <p>Адрес: ${this.companyToDisplay.full_address}</p>
            </div>
            <div class="company-location">
                <h2>Местоположение на карте:</h2>
            </div>`
        this.createMap();
        document.querySelector("main")!.append(companyWrapper);
    }
}

new CompanyDetailedInfo(JSON.parse(localStorage.getItem("$company") as string));