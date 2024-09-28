const addRecipeBtn = document.getElementById('add-recipe-btn');
const recipeModal = document.getElementById('recipe-modal');
const closeBtn = document.querySelector('.close-btn');
const recipeCards = document.getElementById('recipe-cards');

// Load saved recipes from localStorage
const loadRecipes = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.forEach(recipe => createRecipeCard(recipe));
};

// Function to create a recipe card
const createRecipeCard = (recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.dishName}">
        <h3>${recipe.dishName}</h3>
        <p>Cooking Time: ${recipe.cookingTime}</p>
        <ul>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ul>
    `;
    recipeCards.appendChild(recipeCard);
};

// Open modal
addRecipeBtn.addEventListener('click', () => {
    recipeModal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
});

// Submit recipe
document.getElementById('submit-recipe-btn').addEventListener('click', () => {
    const dishName = document.getElementById('dish-name').value;
    const cookingTime = document.getElementById('cooking-time').value;
    const instructions = document.getElementById('instructions').value.split('\n');
    const imageUpload = document.getElementById('image-upload').files[0];

    if (dishName && cookingTime && instructions.length > 0 && imageUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const recipe = {
                dishName,
                cookingTime,
                instructions,
                image: e.target.result,
            };

            // Save recipe to localStorage
            const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            savedRecipes.push(recipe);
            localStorage.setItem('recipes', JSON.stringify(savedRecipes));

            createRecipeCard(recipe);
            recipeModal.style.display = 'none'; // Close modal after adding

            // Clear the form
            document.getElementById('dish-name').value = '';
            document.getElementById('cooking-time').value = '';
            document.getElementById('instructions').value = '';
            document.getElementById('image-upload').value = '';
        };
        reader.readAsDataURL(imageUpload);
    } else {
        alert('Please fill in all fields.');
    }
});

// Load recipes when the page is loaded
window.onload = loadRecipes;
