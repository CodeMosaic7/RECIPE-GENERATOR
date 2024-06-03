const searchBox = document.getElementById("SearchBox");
const searchBtn = document.getElementById("SearchButton");
const recipezContainer = document.getElementById("recipe-container");
const recipeDetails = document.getElementById("recipe-details");
const recipeCloseButton = document.getElementById("Recipe-close-btn");


const fetchRecipes = async (query) => {
    // await is used to wait till complete data is loaded. await is used with async function
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response.meals[0]);
    // To remove tag line before rendering the options
    recipezContainer.innerHTML = "";
    response.meals.forEach(meal => {
        // console.log(meal);
        // Here we are adding a div with class name recipe and following elements
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span></p>
        <p>Belongs to Category<span> ${meal.strCategory} </span></p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        //Adding event listeners to the button
        button.addEventListener("click", () => {
            RecipePopUp(meal);
            console.log("Button Clicked");
        })
        recipezContainer.appendChild(recipeDiv);
    });
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});
// Code for pop up
const RecipePopUp = (meal) => {
    recipeDetails.textContent = `
    <h2>${meal.strMeal}</h2>
    `
    recipeDetails.parentElement.style.display = "block";
}