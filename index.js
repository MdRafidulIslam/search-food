const toggleSpinner = displayStyle => {
    document.getElementById('spinnering').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const food = () => {
    const searchText = document.getElementById('search-feild');
    toggleSpinner('block')
    toggleSearchResult('none')
    const searchValue = searchText.value;
    searchText.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {

    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    meals.forEach(meal => {

        const searchDiv = document.createElement('div')
        searchDiv.classList.add('col');
        searchDiv.innerHTML = `

        <div onclick="loadFullMeals(${meal.idMeal})" class="card">
        <img src=${meal.strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
        </div>
    </div>
        `;
        searchResult.appendChild(searchDiv);
    });
    toggleSpinner('none')
    toggleSearchResult('block')
}

const loadFullMeals = async mealId => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = mealDeatils => {
    console.log(mealDeatils)
    const mealDiv = document.getElementById('meal-detail')
    mealDiv.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
    
    <img src=${mealDeatils.strMealThumb} class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${mealDeatils.strMeal}</h5>
        <p class="card-text">${mealDeatils.strInstructions.slice(0, 300)}</p>
        <a href=${mealDeatils.strYoutube} class="btn btn-primary">Go somewhere</a>
    </div>
    
    `;
    mealDiv.appendChild(div)

}