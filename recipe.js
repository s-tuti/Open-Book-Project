// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const recipeModal = document.getElementById('recipe-modal');
    const closeBtn = document.querySelector('.close-btn');
    const recipeCards = document.getElementById('recipe-cards');
    const recipeForm = document.getElementById('recipe-form');

    // Load saved recipes from localStorage
    const loadRecipes = () => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipeCards.innerHTML = ''; // Clear existing cards
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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal
    const closeModal = () => {
        recipeModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === recipeModal) {
            closeModal();
        }
    });

    // Handle form submission
    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        const dishName = document.getElementById('dish-name').value.trim();
        const cookingTime = document.getElementById('cooking-time').value.trim();
        const instructions = document.getElementById('instructions').value.trim().split('\n').filter(instr => instr.trim() !== '');
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

                // Create and display the new recipe card
                createRecipeCard(recipe);

                // Close the modal
                closeModal();

                // Reset the form
                recipeForm.reset();
            };
            reader.readAsDataURL(imageUpload);
        } else {
            alert('Please fill in all fields and upload an image.');
        }
    });

    // Initial load of recipes
    loadRecipes();
});

