  class Company {
    constructor(public business_name: string,public industry: string, public logo: string, public isAvailableInRussia: boolean,
                public bs_company_statement: string,public buzzword: string,public catch_phrase: string,public duns_number: string,
                public employee_identification_number: string,public full_address: string, public id: number,public latitude: number,
                public longitude: number, public phone_number: string,public suffix: string,public type: string,public uid: string ) {
    }
}
class CompanyApp{
    public companiesList: Company[] = [];
    private allCompaniesOnPage: Element[] = [];
    private industriesSet: Set<string> = new Set<string>();
    private typesSet: Set<string> = new Set<string>();
    constructor(public companiesCount: number) {
        if(this.checkIfHashed()){
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
        this.initialiseFilters();
    }
    public initialiseFilters(): void{
        this.initialiseNameFilter();
        this.initialiseIndustryFilter();
        this.initialiseTypeFilter();
    }
    public initialiseNameFilter(): void{
        const checkBox = document.querySelector(".companies-filter__name") as HTMLInputElement;
        checkBox!
            .addEventListener("change", () => {
                const companiesListElement = document.querySelector(".companies-list");
                //@ts-ignore берём массив элементов компаний
                const companies = [...companiesListElement!.children];
                if(!checkBox.checked){
                    companiesListElement!.innerHTML = "";
                    this.allCompaniesOnPage.forEach(c => companiesListElement!.append(c));
                    return;
                }
                this.allCompaniesOnPage = [...companies];
                companies.sort((f,s) =>
                    this.customCompateTo((f.children[0].children[0] as HTMLElement)!.innerText,
                    (s.children[0].children[0] as HTMLElement)!.innerText));
                companiesListElement!.innerHTML = "";
                companies.forEach(c => companiesListElement!.append(c));
            });
    }
    public initialiseIndustryFilter(): void{
        const selectElement = document.querySelector(".companies-filter__industry") as HTMLSelectElement;
        selectElement.addEventListener("change", () =>{
            const companiesListElement = document.querySelector(".companies-list");
            const companies = companiesListElement!.children as unknown as Array<HTMLElement>;
            const typeElement = document.querySelector(".companies-filter__type") as HTMLSelectElement;
            if(selectElement.value === "All"){
                for (const c of companies)
                    if(typeElement.value === "All" || c.children[0].children[3].innerHTML
                        .split(": ")[1].trim() === typeElement.value) {
                        c.style.display = "flex";
                    }
                return;
            }
            for (const c of companies){
                if(c.children[0].children[2].innerHTML.split(": ")[1].trim() === selectElement.value
                    && (typeElement.value === "All" || c.children[0].children[3].innerHTML
                        .split(": ")[1].trim() === typeElement.value))
                    (c as HTMLElement).style.display = "flex";
                else
                    (c as HTMLElement).style.display = "none";
            }
        });
    }
    public initialiseTypeFilter(): void{
        const typeElement = document.querySelector(".companies-filter__type") as HTMLSelectElement;
        typeElement.addEventListener("change", () =>{
            const companiesListElement = document.querySelector(".companies-list");
            const companies = companiesListElement!.children as unknown as Array<HTMLElement>;
            const industryElement = document.querySelector(".companies-filter__industry") as HTMLSelectElement;
            if(typeElement.value === "All"){
                for (const c of companies) {
                    if(industryElement.value === "All" || c.children[0].children[2].innerHTML
                                .split(": ")[1].trim() === industryElement.value) {
                        c.style.display = "flex";
                    }
                }
                return;
            }
            for (const c of companies){
                if(c.children[0].children[3].innerHTML.split(": ")[1].trim() === typeElement.value
                && (industryElement.value === "All" || c.children[0].children[2].innerHTML
                        .split(": ")[1].trim() === industryElement.value))
                    (c as HTMLElement).style.display = "flex";
                else
                    (c as HTMLElement).style.display = "none";
            }
        });
    }
    public filtersAreSetToDefault(): boolean{
        const nameFilter = document.querySelector(".companies-filter__name") as HTMLInputElement;
        const industryFilter = document.querySelector(".companies-filter__industry") as HTMLSelectElement;
        const typeFilter = document.querySelector(".companies-filter__type") as HTMLSelectElement;
        return !nameFilter.checked && industryFilter.value === "All" && typeFilter.value === "All";
    }
    public customCompateTo(a: string, b: string): number{
        const aToLower = a.toLowerCase();
        const bToLower = b.toLowerCase();
        return (aToLower > bToLower) ? 1 : (aToLower < bToLower) ? -1 : 0;
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
        if(!this.filtersAreSetToDefault())
            return;
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
            else if(!companyApp.filtersAreSetToDefault()){
                alert("Нельзя добавлять компании во время фильтрации");
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
    public addNewIndustry(industry: string): void{
        this.industriesSet.add(industry);
        const newOption = document.createElement("option") as HTMLOptionElement;
        newOption.value = industry;
        newOption.innerText = industry;
        document.querySelector(".companies-filter__industry")!
            .append(newOption);
    }
    public addNewType(type: string): void{
        this.typesSet.add(type);
        const newOption = document.createElement("option") as HTMLOptionElement;
        newOption.value = type;
        newOption.innerText = type;
        document.querySelector(".companies-filter__type")!
            .append(newOption);
    }
    public displayCompanies(companiesToDisplay: Company[]) : void{
        const companiesListElement = document.querySelector(".companies-list");
        for (let i = this.companiesList.length - companiesToDisplay.length; i < this.companiesList.length ; i++) {
            companiesListElement!.append(this.createCompanyElement(this.companiesList[i],i));
            if(!this.industriesSet.has(this.companiesList[i].industry))
                this.addNewIndustry(this.companiesList[i].industry);
            if("type" in this.companiesList[i] && !this.typesSet.has(this.companiesList[i].type))
                this.addNewType(this.companiesList[i].type)
        }
        localStorage.setItem("$companiesList", JSON.stringify(this.companiesList));
    }
    public createCompanyElement(company: Company, index: number = NaN){
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

let companyApp = new CompanyApp(4);