class CompanyDetailedInfo{
    constructor(public companyToDisplay: Company){
        this.createCompanySection();
    }
    public createMap(){
        //подавляет ошибку ненахождения ymaps, который подключается через YMaps-api
        // @ts-ignore
        ymaps.ready(() => new ymaps.Map(document.querySelector(".main__company-location"),
                {
                    center: [this.companyToDisplay.latitude, this.companyToDisplay.longitude],
                    zoom: 7
                }));
    }
    public createCompanySection(): void{
        const companyWrapper = document.createElement("div");
        companyWrapper.classList.add("main__company-wrapper");
        companyWrapper.innerHTML = `
            <div class="main__company-description">
                 <img src= ${this.companyToDisplay.logo} alt = Лого:${this.companyToDisplay.business_name} width="450px" height="200px">
                 <h1 class="main__company-name">${this.companyToDisplay.business_name}</h1>
                 <p>Вид деятельности: ${this.companyToDisplay.industry}</p>
                 <p class="main__company-catchPhrase">${this.companyToDisplay.catch_phrase}</p>
                 <p>Контактный номер телефона: ${this.companyToDisplay.phone_number}</p>
                 <p>Адрес: ${this.companyToDisplay.full_address}</p>
            </div>
            <div class="main__company-location">
                <h2>Местоположение на карте:</h2>
            </div>
        `
        this.createMap();
        document.querySelector("main")!.append(companyWrapper);
    }
}

new CompanyDetailedInfo(JSON.parse(localStorage.getItem("test") as string));