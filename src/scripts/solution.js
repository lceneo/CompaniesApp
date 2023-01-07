var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Company = /** @class */ (function () {
    function Company(business_name, industry, logo, isAvailableInRussia, bs_company_statement, buzzword, catch_phrase, duns_number, employee_identification_number, full_address, id, latitude, longitude, phone_number, suffix, type, uid) {
        this.business_name = business_name;
        this.industry = industry;
        this.logo = logo;
        this.isAvailableInRussia = isAvailableInRussia;
        this.bs_company_statement = bs_company_statement;
        this.buzzword = buzzword;
        this.catch_phrase = catch_phrase;
        this.duns_number = duns_number;
        this.employee_identification_number = employee_identification_number;
        this.full_address = full_address;
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.phone_number = phone_number;
        this.suffix = suffix;
        this.type = type;
        this.uid = uid;
    }
    return Company;
}());
var CompanyApp = /** @class */ (function () {
    function CompanyApp(companiesCount) {
        var _this = this;
        this.companiesCount = companiesCount;
        this.companiesList = [];
        this.allCompaniesOnPage = [];
        this.industriesSet = new Set();
        this.typesSet = new Set();
        if (this.checkIfHashed()) {
            this.displayCompanies(this.companiesList);
            window.addEventListener("scroll", this.addNewCompanies.bind(this));
            this.initialiseAllBtns();
        }
        else {
            this.fillCompanies(companiesCount)
                .then(function (v) { return window.addEventListener("scroll", _this.addNewCompanies.bind(_this)); })
                .then(function (v) { return _this.initialiseAllBtns(); });
        }
        this.initialiseProfile();
        this.initialiseFilters();
    }
    CompanyApp.prototype.initialiseFilters = function () {
        this.initialiseNameFilter();
        this.initialiseIndustryFilter();
        this.initialiseTypeFilter();
    };
    CompanyApp.prototype.initialiseNameFilter = function () {
        var _this = this;
        var checkBox = document.querySelector(".companies-filter__name");
        checkBox
            .addEventListener("change", function () {
            var companiesListElement = document.querySelector(".companies-list");
            //@ts-ignore берём массив элементов компаний
            var companies = __spreadArray([], companiesListElement.children, true);
            if (!checkBox.checked) {
                companiesListElement.innerHTML = "";
                _this.allCompaniesOnPage.forEach(function (c) { return companiesListElement.append(c); });
                return;
            }
            _this.allCompaniesOnPage = __spreadArray([], companies, true);
            companies.sort(function (f, s) {
                return _this.customCompateTo(f.children[0].children[0].innerText, s.children[0].children[0].innerText);
            });
            companiesListElement.innerHTML = "";
            companies.forEach(function (c) { return companiesListElement.append(c); });
        });
    };
    CompanyApp.prototype.initialiseIndustryFilter = function () {
        var selectElement = document.querySelector(".companies-filter__industry");
        selectElement.addEventListener("change", function () {
            var companiesListElement = document.querySelector(".companies-list");
            var companies = companiesListElement.children;
            var typeElement = document.querySelector(".companies-filter__type");
            if (selectElement.value === "All") {
                for (var _i = 0, companies_1 = companies; _i < companies_1.length; _i++) {
                    var c = companies_1[_i];
                    if (typeElement.value === "All" || c.children[0].children[3].innerHTML
                        .split(": ")[1].trim() === typeElement.value) {
                        c.style.display = "flex";
                    }
                }
                return;
            }
            for (var _a = 0, companies_2 = companies; _a < companies_2.length; _a++) {
                var c = companies_2[_a];
                if (c.children[0].children[2].innerHTML.split(": ")[1].trim() === selectElement.value
                    && (typeElement.value === "All" || c.children[0].children[3].innerHTML
                        .split(": ")[1].trim() === typeElement.value))
                    c.style.display = "flex";
                else
                    c.style.display = "none";
            }
        });
    };
    CompanyApp.prototype.initialiseTypeFilter = function () {
        var typeElement = document.querySelector(".companies-filter__type");
        typeElement.addEventListener("change", function () {
            var companiesListElement = document.querySelector(".companies-list");
            var companies = companiesListElement.children;
            var industryElement = document.querySelector(".companies-filter__industry");
            if (typeElement.value === "All") {
                for (var _i = 0, companies_3 = companies; _i < companies_3.length; _i++) {
                    var c = companies_3[_i];
                    if (industryElement.value === "All" || c.children[0].children[2].innerHTML
                        .split(": ")[1].trim() === industryElement.value) {
                        c.style.display = "flex";
                    }
                }
                return;
            }
            for (var _a = 0, companies_4 = companies; _a < companies_4.length; _a++) {
                var c = companies_4[_a];
                if (c.children[0].children[3].innerHTML.split(": ")[1].trim() === typeElement.value
                    && (industryElement.value === "All" || c.children[0].children[2].innerHTML
                        .split(": ")[1].trim() === industryElement.value))
                    c.style.display = "flex";
                else
                    c.style.display = "none";
            }
        });
    };
    CompanyApp.prototype.filtersAreSetToDefault = function () {
        var nameFilter = document.querySelector(".companies-filter__name");
        var industryFilter = document.querySelector(".companies-filter__industry");
        var typeFilter = document.querySelector(".companies-filter__type");
        return !nameFilter.checked && industryFilter.value === "All" && typeFilter.value === "All";
    };
    CompanyApp.prototype.customCompateTo = function (a, b) {
        var aToLower = a.toLowerCase();
        var bToLower = b.toLowerCase();
        return (aToLower > bToLower) ? 1 : (aToLower < bToLower) ? -1 : 0;
    };
    CompanyApp.prototype.checkIfHashed = function () {
        var companiesValue = localStorage.getItem("$companiesList");
        if (localStorage.getItem("$companiesList") !== null) {
            this.companiesList = JSON.parse(companiesValue);
            return true;
        }
        return false;
    };
    CompanyApp.prototype.initialiseProfile = function () {
        var _a;
        document.querySelector(".wrapper-user").textContent
            = (_a = localStorage.getItem("$authorized")) !== null && _a !== void 0 ? _a : "не авторизован";
    };
    CompanyApp.prototype.addNewCompanies = function () {
        if (!this.filtersAreSetToDefault())
            return;
        var companyElem = document.querySelector(".company-logo");
        if (document.body.scrollHeight - window.pageYOffset <= window.innerHeight)
            this.fillCompanies(this.companiesCount);
        //if(window.pageYOffset >= companyElem!.scrollHeight * (this.companiesList.length - 2))
        //this.fillCompanies(this.companiesCount);
    };
    CompanyApp.prototype.initialiseAllBtns = function () {
        this.initialiseAddBtn();
        this.initialiseSaveBtn();
        this.initialiseCloseBtn();
        this.initialiseEnterBtn();
        this.initialiseExitBtn();
    };
    CompanyApp.prototype.initialiseEnterBtn = function () {
        document.querySelector(".buttons-item__enter")
            .addEventListener("click", function () {
            if (localStorage.getItem("$authorized") === null)
                window.location.href = "authorization_page.html";
            else
                alert("Вы уже авторизованы!");
        });
    };
    CompanyApp.prototype.initialiseExitBtn = function () {
        var _this = this;
        document.querySelector(".buttons-item__exit")
            .addEventListener("click", function () {
            if (localStorage.getItem("$authorized") === null)
                alert("Вы не авторизованы!");
            else {
                localStorage.removeItem("$authorized");
                _this.initialiseProfile();
            }
        });
    };
    CompanyApp.prototype.initialiseCloseBtn = function () {
        var btn = document.querySelector(".button-close");
        btn.addEventListener("click", function () {
            btn.parentElement.parentElement.style.display = "none";
            document.querySelector(".button-add").style.display = "block";
            document.querySelector(".companies").style.position = "relative";
        });
    };
    CompanyApp.prototype.initialiseAddBtn = function () {
        document.querySelector(".button-add").addEventListener("click", function () {
            if (localStorage.getItem("$authorized") === null) {
                alert("Отказано в доступе. Сначала авторизуйтесь!");
                return;
            }
            else if (!companyApp.filtersAreSetToDefault()) {
                alert("Нельзя добавлять компании во время фильтрации");
                return;
            }
            this.style.display = "none";
            document.querySelector(".companies").style.position = "static";
            document.querySelector(".form-wrapper").style.display = "block";
            document.querySelector(".form-name").value = "";
            document.querySelector(".form-type").value = "None";
        });
    };
    CompanyApp.prototype.uploadCompanyLogo = function (logo) {
        return logo.files.length !== 0 ? URL.createObjectURL(logo.files[0]) : undefined;
    };
    CompanyApp.prototype.initialiseSaveBtn = function () {
        var _this = this;
        document.querySelector(".button-save").addEventListener("click", function () {
            if (_this.formIsFilled()) {
                var companyNameElement = document.querySelector(".form-name");
                var companyIndustryElement = document.querySelector(".form-type");
                var companyInRussia = document.querySelector(".form-checkbox");
                var companyLogo = _this.uploadCompanyLogo(document.querySelector(".form__logo"));
                // остальные заполняем undefined
                // @ts-ignore
                var newCompany = new Company(companyNameElement.value, companyIndustryElement.value, companyLogo, companyInRussia.checked);
                _this.companiesList.push(newCompany);
                _this.displayCompanies([newCompany]);
                companyNameElement.value = "";
                companyIndustryElement.value = "None";
                companyInRussia.checked = false;
                document.querySelector(".form-wrapper").style.display = "none";
                document.querySelector(".button-add").style.display = "block";
                document.querySelector(".companies").style.position = "relative";
                console.log(JSON.stringify(newCompany));
            }
        });
    };
    CompanyApp.prototype.formIsFilled = function () {
        var inputNameText = document.querySelector(".form-name").value;
        var selectedIndustry = document.querySelector(".form-type").value;
        if (inputNameText === null || inputNameText.trim().length === 0 || inputNameText.length > 15) {
            alert("Некорректное имя компании");
            return false;
        }
        if (selectedIndustry === "None") {
            alert("Не указан вид деятельности компании");
            return false;
        }
        return true;
    };
    CompanyApp.prototype.fillCompanies = function (companiesCount) {
        return __awaiter(this, void 0, void 0, function () {
            var newElementsArray, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newElementsArray = [];
                        return [4 /*yield*/, fetch("https://random-data-api.com/api/company/random_company?size=".concat(companiesCount))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        newElementsArray = _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/];
                    case 4:
                        newElementsArray.forEach(function (c) { return _this.companiesList.push(c); });
                        this.displayCompanies(newElementsArray);
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanyApp.prototype.addNewIndustry = function (industry) {
        this.industriesSet.add(industry);
        var newOption = document.createElement("option");
        newOption.value = industry;
        newOption.innerText = industry;
        document.querySelector(".companies-filter__industry")
            .append(newOption);
    };
    CompanyApp.prototype.addNewType = function (type) {
        this.typesSet.add(type);
        var newOption = document.createElement("option");
        newOption.value = type;
        newOption.innerText = type;
        document.querySelector(".companies-filter__type")
            .append(newOption);
    };
    CompanyApp.prototype.displayCompanies = function (companiesToDisplay) {
        var companiesListElement = document.querySelector(".companies-list");
        for (var i = this.companiesList.length - companiesToDisplay.length; i < this.companiesList.length; i++) {
            companiesListElement.append(this.createCompanyElement(this.companiesList[i], i));
            if (!this.industriesSet.has(this.companiesList[i].industry))
                this.addNewIndustry(this.companiesList[i].industry);
            if ("type" in this.companiesList[i] && !this.typesSet.has(this.companiesList[i].type))
                this.addNewType(this.companiesList[i].type);
        }
        localStorage.setItem("$companiesList", JSON.stringify(this.companiesList));
    };
    CompanyApp.prototype.createCompanyElement = function (company, index) {
        var _this = this;
        if (index === void 0) { index = NaN; }
        var companyWrapperElement = document.createElement("div");
        companyWrapperElement.innerHTML = "\n        <div class=\"company-description\">\n            <h3 class=\"company-name\">".concat(company.business_name, "</h3>\n            <p class=\"company-catchPhrase\">").concat(company.catch_phrase, "</p>\n            <p>\u0412\u0438\u0434 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438: ").concat(company.industry, "</p>\n            <p>\u0422\u0438\u043F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438: ").concat(company.type, "</p>\n            <p>\u041F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043D\u0430 \u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u043C \u0440\u044B\u043D\u043A\u0435: ").concat(company.isAvailableInRussia, "</p>\n        </div>\n        <div class=\"company-logo__wrapper\">\n            <img class = \"company-logo\" src=").concat(company.logo, " alt = \u041B\u043E\u0433\u043E:").concat(company.business_name, " width=\"650px\" height=\"250px\">\n        </div>\n        ");
        companyWrapperElement.classList.add("company-wrapper");
        companyWrapperElement.id = "".concat(index);
        companyWrapperElement.addEventListener("click", function (ev) {
            if (localStorage.getItem("$authorized") === null) {
                alert("Отказано в доступе. Сначала авторизуйтесь!");
                return;
            }
            localStorage.setItem("$company", JSON.stringify(_this.companiesList[parseInt(companyWrapperElement.id)]));
            window.location.href = "company_info.html";
        });
        return companyWrapperElement;
    };
    return CompanyApp;
}());
var companyApp = new CompanyApp(4);
