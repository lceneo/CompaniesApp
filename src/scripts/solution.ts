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
        this.fillCompanies!(companiesCount)
            .then(v => window.addEventListener("scroll",
                this.addNewCompanies.bind(this)))
            .then(v => this.initialiseAllBtns());
    }

    public addNewCompanies(): void{
        const companyElem = document.querySelector(".main__company-logo");
        if(window.pageYOffset >= companyElem!.scrollHeight * (this.companiesList.length - 2))
            this.fillCompanies(this.companiesCount);
    }
    public initialiseAllBtns(): void{
        this.initialiseAddBtn();
        this.initialiseSaveBtn();
        this.initialiseCloseBtn();
    }
    public initialiseCloseBtn(): void{
        const btn = document.querySelector(".main__button-close");
        btn!.addEventListener("click",
            () => {
            btn!.parentElement!.style.display = "none";
            (document.querySelector(".main__button-add") as HTMLElement).style.display = "block";
        });
    }
    public initialiseAddBtn(): void{
        (document.querySelector(".main__button-add") as HTMLElement).addEventListener("click",
            function (){
            this.style.display = "none";
            (document.querySelector(".main__form-wrapper") as HTMLElement).style.display = "block";
            (document.querySelector(".main__form-name") as HTMLInputElement).value = "";
            (document.querySelector(".main__form-type") as HTMLSelectElement).value = "None";
        });
    }
    public initialiseSaveBtn(): void{
        document.querySelector(".main__button-save")!.addEventListener("click",
            () => {
                if(this.formIsFilled()) {
                    const companyNameElement = document.querySelector(".main__form-name") as HTMLInputElement;
                    const companyIndustryElement = document.querySelector(".main__form-type") as HTMLSelectElement;
                    const companyInRussia = document.querySelector(".main__form-checkbox") as HTMLInputElement;
                    // остальные заполняем undefined
                    // @ts-ignore
                    const newCompany = new Company(companyNameElement.value,companyIndustryElement.value, undefined, companyInRussia.checked);
                    this.companiesList.push(newCompany);
                    this.displayCompanies([newCompany]);
                    companyNameElement.value = "";
                    companyIndustryElement.value = "None";
                    companyInRussia.checked = false;
                    (document.querySelector(".main__form-wrapper") as HTMLElement).style.display = "none";
                    (document.querySelector(".main__button-add") as HTMLElement).style.display = "block";
                    console.log(JSON.stringify(newCompany));
                }
            });
    }
    public formIsFilled(): boolean{
        const inputNameText = (document.querySelector(".main__form-name") as HTMLInputElement).value;
        const selectedIndustry = (document.querySelector(".main__form-type") as HTMLSelectElement).value;
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
        const companiesListElement = document.querySelector(".main__companies-list");
        for (let i = this.companiesList.length - companiesToDisplay.length; i < this.companiesList.length ; i++) {
            companiesListElement!.append(this.createCompanyElement(this.companiesList[i],i))
        }
    }
    public createCompanyElement(company: Company, index: number){
        const companyWrapperElement = document.createElement("div");
        companyWrapperElement.innerHTML = `
        <div class="main__company-description">
            <h3 class="main__company-name">${company.business_name}</h3>
            <p class="main__company-catchPhrase">${company.catch_phrase}</p>
            <p>Вид деятельности: ${company.industry}</p>
            <p>Тип компании: ${company.type}</p>
            <p>Присутствие на Российском рынке: ${company.isAvailableInRussia}</p>
        </div>
        <div class="main__company-logo__wrapper">
            <img class = "main__company-logo" src=${company.logo} alt = Лого:${company.business_name} width="650px" height="250px">
        </div>
        `;
        companyWrapperElement.classList.add("main__company-wrapper")
        companyWrapperElement.id = `${index}`
        companyWrapperElement.addEventListener("click",
            (ev) => {
            localStorage.setItem("test", JSON.stringify(this.companiesList[parseInt(companyWrapperElement.id)]));
            window.location.href = "../pages/company_info.html";
        });
            return companyWrapperElement;
    }
}

new CompanyApp(4);