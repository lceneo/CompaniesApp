  class Company {
    constructor(public business_name: string,public industry: string, public logo: string, public isAvailableInRussia: boolean,
                public bs_company_statement: string,public buzzword: string,public catch_phrase: string,public duns_number: string,
                public employee_identification_number: string,public full_address: string, public id: number,public latitude: number,
                public longitude: number, public phone_number: string,public suffix: string,public type: string,public uid: string ) {
    }
}
class CompanyApp{
    public companiesList: Company[] = [];
    constructor(public companiesCount: number) {
        if(this.checkIfHashed()){
            // @ts-ignore
            this.displayCompanies(this.companiesList);
            window.addEventListener("scroll", this.addNewCompanies.bind(this));
            this.initialiseAllBtns();
        }
        else {
            this.fillCompanies!(companiesCount)
                .then(v => window.addEventListener("scroll",
                    this.addNewCompanies.bind(this)))
                .then(v => this.initialiseAllBtns());
        }
        this.initialiseProfile();
    }
    public checkIfHashed(): boolean{
        const companiesValue = localStorage.getItem("$companiesList");
        if(localStorage.getItem("$companiesList") !== null){
            this.companiesList = JSON.parse(companiesValue as string);
            return true;
        }
        return false;
    }
    public initialiseProfile(): void{
        document.querySelector(".wrapper-user")!.textContent
            = localStorage.getItem("$authorized") ?? "не авторизован";
    }
    public addNewCompanies(): void{
        const companyElem = document.querySelector(".company-logo");
        if(document.body.scrollHeight - window.pageYOffset <= window.innerHeight)
            this.fillCompanies(this.companiesCount);
        //if(window.pageYOffset >= companyElem!.scrollHeight * (this.companiesList.length - 2))
            //this.fillCompanies(this.companiesCount);
    }
    public initialiseAllBtns(): void{
        this.initialiseAddBtn();
        this.initialiseSaveBtn();
        this.initialiseCloseBtn();
        this.initialiseEnterBtn();
        this.initialiseExitBtn();
    }
    public initialiseEnterBtn(): void{
        document.querySelector(".buttons-item__enter")!
            .addEventListener("click", () => {
                if (localStorage.getItem("$authorized") === null)
                    window.location.href = "authorization_page.html";
                else
                    alert("Вы уже авторизованы!");
            });
    }
    public initialiseExitBtn(): void{
        document.querySelector(".buttons-item__exit")!
            .addEventListener("click", () => {
                if (localStorage.getItem("$authorized") === null)
                    alert("Вы не авторизованы!")
                else {
                    localStorage.removeItem("$authorized");
                    this.initialiseProfile();
                }
            });
    }
    public initialiseCloseBtn(): void{
        const btn = document.querySelector(".button-close");
        btn!.addEventListener("click",
            () => {
            btn!.parentElement!.style.display = "none";
            (document.querySelector(".button-add") as HTMLElement).style.display = "block";
        });
    }
    public initialiseAddBtn(): void{
        (document.querySelector(".button-add") as HTMLElement).addEventListener("click",
            function (){
            if(localStorage.getItem("$authorized") === null){
                alert("Отказано в доступе. Сначала авторизуйтесь!")
                return;
            }
            this.style.display = "none";
            (document.querySelector(".form-wrapper") as HTMLElement).style.display = "block";
            (document.querySelector(".form-name") as HTMLInputElement).value = "";
            (document.querySelector(".form-type") as HTMLSelectElement).value = "None";
        });
    }
    public uploadCompanyLogo(logo: HTMLInputElement): string | undefined{
        return logo!.files!.length !== 0 ? URL.createObjectURL(logo!.files![0]) : undefined;
    }
    public initialiseSaveBtn(): void{
        document.querySelector(".button-save")!.addEventListener("click",
            () => {
                if(this.formIsFilled()) {
                    const companyNameElement = document.querySelector(".form-name") as HTMLInputElement;
                    const companyIndustryElement = document.querySelector(".form-type") as HTMLSelectElement;
                    const companyInRussia = document.querySelector(".form-checkbox") as HTMLInputElement;
                    const companyLogo = this.uploadCompanyLogo(document.querySelector(".form__logo") as HTMLInputElement);
                    // остальные заполняем undefined
                    // @ts-ignore
                    const newCompany = new Company(companyNameElement.value,companyIndustryElement.value, companyLogo, companyInRussia.checked);
                    this.companiesList.push(newCompany);
                    this.displayCompanies([newCompany]);
                    companyNameElement.value = "";
                    companyIndustryElement.value = "None";
                    companyInRussia.checked = false;
                    (document.querySelector(".form-wrapper") as HTMLElement).style.display = "none";
                    (document.querySelector(".button-add") as HTMLElement).style.display = "block";
                    console.log(JSON.stringify(newCompany));
                }
            });
    }
    public formIsFilled(): boolean{
        const inputNameText = (document.querySelector(".form-name") as HTMLInputElement).value;
        const selectedIndustry = (document.querySelector(".form-type") as HTMLSelectElement).value;
        if(inputNameText === null || inputNameText.trim().length === 0 || inputNameText.length > 15){
            alert("Некорректное имя компании");
            return false;
        }
        if(selectedIndustry === "None"){
            alert("Не указан вид деятельности компании");
            return false;
        }
        return true;
    }
    public async fillCompanies(companiesCount: number) : Promise<void>{
        let newElementsArray: Company[] = [];
        const response = await
            fetch(`https://random-data-api.com/api/company/random_company?size=${companiesCount}`);
        if(response.ok)
            newElementsArray = await response.json();
        else
            return;
        newElementsArray.forEach((c: Company) => this.companiesList.push(c));
        this.displayCompanies(newElementsArray);
    }
    public displayCompanies(companiesToDisplay: Company[]) : void{
        const companiesListElement = document.querySelector(".companies-list");
        for (let i = this.companiesList.length - companiesToDisplay.length; i < this.companiesList.length ; i++) {
            companiesListElement!.append(this.createCompanyElement(this.companiesList[i],i))
        }
        localStorage.setItem("$companiesList", JSON.stringify(this.companiesList));
    }
    public createCompanyElement(company: Company, index: number){
        const companyWrapperElement = document.createElement("div");
        companyWrapperElement.innerHTML = `
        <div class="company-description">
            <h3 class="company-name">${company.business_name}</h3>
            <p class="company-catchPhrase">${company.catch_phrase}</p>
            <p>Вид деятельности: ${company.industry}</p>
            <p>Тип компании: ${company.type}</p>
            <p>Присутствие на Российском рынке: ${company.isAvailableInRussia}</p>
        </div>
        <div class="company-logo__wrapper">
            <img class = "company-logo" src=${company.logo} alt = Лого:${company.business_name} width="650px" height="250px">
        </div>
        `;
        companyWrapperElement.classList.add("company-wrapper")
        companyWrapperElement.id = `${index}`
        companyWrapperElement.addEventListener("click",
            (ev) => {
            if(localStorage.getItem("$authorized") === null){
                alert("Отказано в доступе. Сначала авторизуйтесь!")
                return;
            }
            localStorage.setItem("$company", JSON.stringify(this.companiesList[parseInt(companyWrapperElement.id)]));
            window.location.href = "company_info.html";
        });
            return companyWrapperElement;
    }
}

new CompanyApp(4);