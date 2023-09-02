import Home from "./home.js";



export default class Details {
    constructor() {
        this.homeObject = new Home();
        this.recipeElement = $('.ingredients');
        this.tagsElement = $('.tags');
        this.detailsSection = $('#details');
        this.loading = $('#loading');

    }
    /* get the api of  a meal details/Recipe */
    async getDetails(id = "52772") {
        let details = await this.homeObject.getCard('lookup', 'i', id);
        let mealDetails = details['meals'][0]
        return mealDetails;
    }
    /* Create the recipe paragraphs */
    createRecipe(details) {
        let recipe = ``;
        for (let i = 1; i <= 20; i++) {
            if (!details[`strIngredient${i}`]) {
                break;
            } else {
                recipe += `<p class="bg-info-subtle p-2 rounded-2">${details[`strMeasure${i}`] + " " + details[`strIngredient${i}`]} </p>`
            }
        }
        return recipe;
    }
    /* create the tags paragraphs */
    createTags(details) {
        let tagElement = ``;
        if (details['strTags']) {
            let tags = details['strTags'].split(",");
            for (let tag of tags) {
                tagElement += `<p class="bg-danger-subtle p-2 rounded-2">${tag} </p>`
            }
        }
        return tagElement;
    }
    /* Display the whole details section*/
    async displayDetails(id = "52772") {
        this.loading.fadeIn();
        let mealDetails = await this.getDetails(id);
        let { strMeal, strMealThumb, strInstructions, strArea, strCategory, strYoutube, strSource } = mealDetails;
        let cartona = ` <div class="close-details text-end">
    </div>
    <picture class="col-12 col-md-4">
        <img src="${strMealThumb}" alt="" class="w-100 rounded-3">
        <h2 class="fs-1 text-white">
            ${strMeal}
        </h2>
    </picture>
    <div class="recipe col-12 col-md-8 col-lg-8">
        <h3>Instructions</h3>
        <p>
            ${strInstructions}
        </p>
        <p class="fs-2 fw-bold">Area : ${strArea}</p>
        <p class="fs-2 fw-bold">Category : ${strCategory}</p>
        <p class="fs-2 fw-bold">Recipes :</p>
        <div class="ingredients d-flex flex-wrap gap-3 ps-3 text-black">
${this.createRecipe(mealDetails)}        </div>
        <p class="fs-2 fw-bold">Tags :</p>
        <div class="tags d-flex flex-wrap gap-3 ps-3 text-black">
${this.createTags(mealDetails)}        </div>
        <div class="outerLinks d-flex gap-2">
            <a href="${strSource}" target="_blank" class="btn btn-danger">Source</a>
            <a href="${strYoutube}"  target="_blank" class="btn btn-success">Youtube</a>
        </div>
    </div>`;

        this.detailsSection.html(`${cartona}`);
        this.homeObject.hideOthers('#details');
        this.loading.fadeOut(1000);
    }
}
