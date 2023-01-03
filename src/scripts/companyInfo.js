var CompanyDetailedInfo = /** @class */ (function () {
    function CompanyDetailedInfo(companyToDisplay) {
        this.companyToDisplay = companyToDisplay;
        this.createCompanySection();
    }
    CompanyDetailedInfo.prototype.createMap = function () {
        var _this = this;
        //подавляет ошибку ненахождения ymaps, который подключается через YMaps-api
        // @ts-ignore
        ymaps.ready(function () { return new ymaps.Map(document.querySelector(".main__company-location"), {
            center: [_this.companyToDisplay.latitude, _this.companyToDisplay.longitude],
            zoom: 7
        }); });
    };
    CompanyDetailedInfo.prototype.createCompanySection = function () {
        var companyWrapper = document.createElement("div");
        companyWrapper.classList.add("main__company-wrapper");
        companyWrapper.innerHTML = "\n            <div class=\"main__company-description\">\n                 <img src= ".concat(this.companyToDisplay.logo, " alt = \u041B\u043E\u0433\u043E:").concat(this.companyToDisplay.business_name, " width=\"450px\" height=\"200px\">\n                 <h1 class=\"main__company-name\">").concat(this.companyToDisplay.business_name, "</h1>\n                 <p>\u0412\u0438\u0434 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438: ").concat(this.companyToDisplay.industry, "</p>\n                 <p class=\"main__company-catchPhrase\">").concat(this.companyToDisplay.catch_phrase, "</p>\n                 <p>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430: ").concat(this.companyToDisplay.phone_number, "</p>\n                 <p>\u0410\u0434\u0440\u0435\u0441: ").concat(this.companyToDisplay.full_address, "</p>\n            </div>\n            <div class=\"main__company-location\">\n                <h2>\u041C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435:</h2>\n            </div>\n        ");
        this.createMap();
        document.querySelector("main").append(companyWrapper);
    };
    return CompanyDetailedInfo;
}());
new CompanyDetailedInfo(JSON.parse(localStorage.getItem("test")));
