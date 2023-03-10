# CompaniesApp
Приложение представляет собой сервис, генерирующий случайные компании и предоставляющий детальную информацию о них.
## Содержание

1. <a href = "#start">Как запустить проект?</a>
2. <a href = "#stack">Stack-технологий</a>
3. <a href = "#authorize_page">Страница авторизации/регистрации</a>
4. <a href = "#main_page">Страница со списком компаний и фильтрацией<a>
5. <a href = "#info_page">Страница детальной информации</a>
6. <a href = "#additional">Дополнительный проект</a>

<a name = start></a>
## Как запустить проект?
1-ый способ:
  1. Перейти по ссылке https://ct78872.tw1.ru/ (сайт выложен на хостинг) (Снят с хостинга из-за конца бесплатного периода)

2-ой способ:
  1. Скачать проект
  2. Открыть проект и перейти по пути "src/pages"
  3. Запустить "authorization_page.html"
  
3-ий способ:
  1. Скачать проект
  2. Открыть проект и в терминале прописать "npm install"
  3. Дождаться окончания загрузки и прописать "npm start"
  4. В открывшемся окне пройти по пути src/pages
  5. Нажать на "authorization_page.html"
<a name = stack></a>
## Stack-технологий
- Приложение написано на чистом TypeScript, скомпилированном позже в JavaScript для подключения к HTML-странице.
- При написании кода использовались Random Data Api(https://random-data-api.com/) и YMaps-Api(https://yandex.ru/dev/maps/?p=realty);
- При вёрстке использовались принципы БЭМ
<a name = authorize_page></a>
## Страница авторизации/регистрации
На данной странице пользователь может войти или зарегистрировать новый аккаунт. Информация об аккаунтах хранится в local storage.
Присутствуют всевозможные валидации(корректность пароля,невозможность регистрации двух пользователей с одинковыми логинами и прочее).
Как только пользователь введёт корректный логин и пароль,
он будет перенаправлен на страницу со списком компаний.
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211170439-7a57e821-cc7b-477d-a85d-e7453235ec8f.png)
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211170579-68c4b0ac-8fa6-44fe-ad30-01028bfbefc7.png)
<a name = main_page>
## Страница со списком компаний и фильтрацией
### Список компаний
На данной странице выводятся случайно-сгенерированные компании, полученные с Random Data Api(в рамках одного логина каждая сгенерированная компания остаётся
в потоке документа, это сделано для имитации реализма, если вы хотите начать генерацию <b>С САМОГО НАЧАЛА</b>, а не динамически подгружать новые компании к уже подгруженным,
то выйдите и войдите в аккаунт, использовав кнопки "Войти" и "Выйти").
Реализована кэшизация компаний при каждом добавлении
(будь то API или пользователь)<b>ВСЕ КОМПАНИИ ПОДГРУЖАЮТСЯ ЛЕНИВО</b>, то есть,
как только пользователь прокрутит страницу до конца, подгрузятся новые компании.
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211170908-3ae075d2-ac5f-4a22-b768-5bb62e43c18a.png)<br><br>
Также на странице присутствуют 2 кнопки("Войти" и "Выйти").<br><br>
![image](https://user-images.githubusercontent.com/94864786/211170965-280a3c91-b226-42ba-a95b-85a05388b57d.png)
<br><br>
Если пользователь уже авторизован, то для повторного входа сначала надо нажать кнопку "Выйти".

### Добавление компании

Есть возможность добавить новую компанию, указав обязательные поля
(Название, Вид деятельности) и при желании необязательные(подгрузить логотип, указать присутствие на Российском рынке). 
При создании компании в консоль выводится её JSON.
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211171197-eb7f3d12-65a5-4503-bb19-27af11779f34.png)
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211171219-6ccaa923-af44-44b5-89d1-29f8521464d1.png)
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211171243-f9a0d778-3d84-4328-a063-8104c57c74e4.png)
<br><br>
### Фильтрация
Присутствуют 3 фильтра(по названию, виду деятельности, типу компании). Виды деятельности и типы компаний пополняются с каждой новой компанией
(будь то добавленная пользователям или подгруженная с API)
Фильтры могут быть включены в любом их сочетании. <b>ПРИ ВКЛЮЧЕННЫХ ФИЛЬТРАХ</b>
нельзя добавлять новую компанию и ленивая подгрузка компаний отключается до снятия всех фильтров(<b>это сделано намеренно</b>).<br><br>
![image](https://user-images.githubusercontent.com/94864786/211171255-520e449a-a105-4bae-96f7-fe2d76a18521.png)
<a name = info_page></a>
## Страница детальной информации

При щелчке по любой компании в списке компаний(при условии, что пользователь авторизован) происходит редирект на данную страницу.
На ней указана детальная информация по компании, а также её местоположение на карте(это нормально, что иногда компании спавнятся в океане или Антарктиде,
так как API выдаёт случайные координаты). Щёлкнув по кнопке "На главную" можно вернуться обратно на страницу списка компаний за счёт кэшизации компаний(при этом фильтры сбрасываются).
<br><br>
![image](https://user-images.githubusercontent.com/94864786/211171371-517dd899-6a58-4a6a-b8ce-758bcab99ea4.png)
<br><br>
<a name = additional></a>
## Дополнительный проект
Также в рамках 1 семестра этого года я принимал участие в проекте создания Агрегатора репетиторов(аналог Profi.ru) от компании 66bit.
Ссылка на репозиторий: https://github.com/lceneo/tutor-aggregator-main

