export default class Home {
    constructor() {
        this.foodCards = document.getElementById('food-cards');
        this.search = $('#search');
        this.loading = $('#loading')
    }
    /* display one section and the main section only and hide the rest  */
    hideOthers(display = '#food-cards') {
        this.foodCards.innerHTML = '';
        $(`.home >div >div:not(${display})`).addClass('d-none');
        $(this.foodCards).removeClass('d-none');
        $(`${display}`).removeClass('d-none');
    }
    /* Get the food cards by name/cat/area/firstletter/ingredients */
    async getCard(type = 'search', method = 's', key = '') {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/${type}.php?${method}=${key}
        `);
        let food = await respone.json();
        return food;
    }
    /* Display the food-cards */
    async displayHomePage(type = 'search', method = 's', key = '') {
        this.loading.fadeIn();
        const meals = await this.getCard(type, method, key);
        let cartona = ``;
        if (meals['meals']) {
            for (let meal of meals['meals']) {
                let { idMeal, strMeal, strMealThumb } = meal;
                cartona += `<div class="col-sm-6 col-md-4 col-lg-3" data-id = "${idMeal}">
                <div class="food-card  overflow-auto rounded-3   p-0 position-relative overflow-hidden">
                    <img src="${strMealThumb}" alt="" class="w-100">
                    <div
                        class="position-absolute  start-0 end-0 food-card-layer bg-white bg-opacity-75 d-flex justify-content-center align-items-center h-100">
                        <h2 class="fs-1">${strMeal}</h2>
                    </div>
                </div>
            </div>`;
            }
            this.foodCards.innerHTML = cartona;
        }
        this.loading.fadeOut(1000)
    }
    /* Get the categories cards */
    async getCategories() {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let categories = await respone.json();
        return categories;
    }
    /* Display the categories cards */
    async displayCategories() {
        this.loading.fadeIn();
        this.hideOthers();
        const categories = await this.getCategories();
        let cartona = ``;
        for (let category of categories['categories']) {
            let { strCategory, strCategoryThumb, strCategoryDescription } = category;
            cartona += `<div class="col-sm-6 col-md-4 col-lg-3" data-cat-name = "${strCategory}">
            <div class="food-card  overflow-auto rounded-3   p-0 position-relative overflow-hidden">
                <img src="${strCategoryThumb}" alt="" class="w-100">
                <div
                    class="position-absolute  start-0 end-0 food-card-layer bg-white bg-opacity-75 d-flex flex-column justify-content-start align-items-center h-100 overflow-hidden">
                    <h2 class="fs-1 h-50">${strCategory}</h2>
                    <p class="fs-5 p-2 h-50 text-center">${strCategoryDescription}</p>
                </div>
            </div>
        </div>`;
        }
        this.foodCards.innerHTML = cartona;
        this.loading.fadeOut(1000);
    }

    /* Display the available areas(countries) for food */
    async displayArea() {

        this.hideOthers();
        this.loading.fadeIn();
        let areas = await this.getCard('list', 'a', 'list');
        let cartona = ``;
        for (let area of areas['meals']) {
            let { strArea } = area;
            cartona += `<div class="col-6 col-md-4 col-lg-3 " data-area-name = "${strArea}">
            <div class="food-card text-white overflow-auto rounded-3 text-center  p-0 position-relative ">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${strArea}</h3>
            </div>
        </div>`;

        }
        this.foodCards.innerHTML = cartona;
        this.loading.fadeOut(1000);
    }

    /* Display the first 20 ingredients */
    async displayIngredients() {
        this.loading.fadeIn();
        $('.home >div >div:not(#food-cards)').addClass('d-none')
        let ingredients = await this.getCard('list', 'i', 'list');
        let cartona = ``;
        for (let i = 0; i < 25; i++) {
            let { strIngredient, strDescription } = ingredients['meals'][i];

            cartona += `<div class="col-6 col-md-4 col-lg-3 ingredient overflow-hidden" data-ing-name = "${strIngredient}">
            <div class="food-card text-white overflow-hidden text-center rounded-3   p-0 position-relative">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${strIngredient}</h3>
            <p>${strDescription}</p>
            </div>
        </div>`;

        }
        this.foodCards.innerHTML = cartona;
        this.loading.fadeOut(1000);
    }
}




