interface ICompany{
    bs_company_statement: string;
    business_name: string;
    buzzword: string;
    catch_phrase: string;
    duns_number: string;
    employee_identification_number: string;
    full_address: string;
    id: number;
    industry: string;
    latitude: number;
    logo: string;
    longitude: number;
    phone_number: string;
    suffix: string;
    type: string;
    uid: string;
}
class CompanyApp{
    public companiesList: ICompany[] = [];
    constructor(public companiesCount: number) {
        this.fillCompanies!(companiesCount)
            .then(v => window.addEventListener("scroll",
                this.addNewCompanies.bind(this)));
    }
    public addNewCompanies(): void{
        const companyElem = document.querySelector(".main__company-logo");
        if(window.pageYOffset >= companyElem!.scrollHeight * (this.companiesList.length - 2))
            this.fillCompanies(this.companiesCount);
    }
    public async fillCompanies(companiesCount: number) : Promise<void>{
        let newElementsArray: ICompany[] = [];
        const response = await
            fetch(`https://random-data-api.com/api/company/random_company?size=${companiesCount}`);
        if(response.ok)
            newElementsArray = await response.json();
        else
            return;
        newElementsArray.forEach((c: ICompany) => this.companiesList.push(c));
        this.displayCompanies(newElementsArray);
    }
    public displayCompanies(companiesToDisplay: ICompany[]) : void{
        const companiesListElement = document.querySelector(".main__companies-list");
        companiesToDisplay.forEach(c => companiesListElement!.append(this.createCompanyElement(c)))
    }
    public createCompanyElement(company: ICompany){
        const companyWrapperElement = document.createElement("div");
        companyWrapperElement.innerHTML = `
        <div class="main__company-description">
            <h3 class="main__company-name">${company.business_name}</h3>
            <p class="main__company-catchPhrase">${company.catch_phrase}</p>
            <p>Вид деятельности: ${company.industry}</p>
            <p>Тип компании: ${company.type}</p>
        </div>
        <div>
            <img class = "main__company-logo" src=${company.logo} alt = Лого:${company.business_name} width="650px" height="250px">
        </div>`;
        companyWrapperElement.classList.add("main__company-wrapper")
        return companyWrapperElement;
    }
}

new CompanyApp(4);