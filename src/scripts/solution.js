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
var CompanyApp = /** @class */ (function () {
    function CompanyApp(companiesCount) {
        var _this = this;
        this.companiesCount = companiesCount;
        this.companiesList = [];
        this.fillCompanies(companiesCount)
            .then(function (v) { return window.addEventListener("scroll", _this.addNewCompanies.bind(_this)); });
    }
    CompanyApp.prototype.addNewCompanies = function () {
        var companyElem = document.querySelector(".main__company-logo");
        if (window.pageYOffset >= companyElem.scrollHeight * (this.companiesList.length - 2))
            this.fillCompanies(this.companiesCount);
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
    CompanyApp.prototype.displayCompanies = function (companiesToDisplay) {
        var companiesListElement = document.querySelector(".main__companies-list");
        for (var i = this.companiesList.length - companiesToDisplay.length; i < this.companiesList.length; i++) {
            companiesListElement.append(this.createCompanyElement(this.companiesList[i], i));
        }
    };
    CompanyApp.prototype.createCompanyElement = function (company, index) {
        var _this = this;
        var companyWrapperElement = document.createElement("div");
        companyWrapperElement.innerHTML = "\n        <div class=\"main__company-description\">\n            <h3 class=\"main__company-name\">".concat(company.business_name, "</h3>\n            <p class=\"main__company-catchPhrase\">").concat(company.catch_phrase, "</p>\n            <p>\u0412\u0438\u0434 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438: ").concat(company.industry, "</p>\n            <p>\u0422\u0438\u043F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438: ").concat(company.type, "</p>\n        </div>\n        <div class=\"main__company-logo__wrapper\">\n            <img class = \"main__company-logo\" src=").concat(company.logo, " alt = \u041B\u043E\u0433\u043E:").concat(company.business_name, " width=\"650px\" height=\"250px\">\n        </div>");
        companyWrapperElement.classList.add("main__company-wrapper");
        companyWrapperElement.id = "".concat(index);
        companyWrapperElement.addEventListener("click", function (ev) {
            localStorage.setItem("test", JSON.stringify(_this.companiesList[parseInt(companyWrapperElement.id)]));
            window.location.href = "../../src/pages/company_info.html";
        });
        return companyWrapperElement;
    };
    return CompanyApp;
}());
new CompanyApp(4);
