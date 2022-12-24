const inputCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
      ingredients = document.querySelectorAll('.current-pizza-item'),
      drinks = document.querySelectorAll('.select-drink-item'),
      totalAmount = document.querySelector('.total-amount>.summa'),
      orderBtn = document.querySelector('.typical-btn'),
      modalWindow = document.querySelector('.modal-window'),
      submitBtn = document.querySelector('.modal-window__submit-btn');

const subject = document.querySelector('.modal-window__subject'),
      ingredientsSpan = document.querySelector('.modal-window__ingredients'),
      drinksSpan = document.querySelector('.modal-window__drinks');

// additing ingredients to pizza

const addIngredients = checkboxes => {
    const nodesArray = Array.from(checkboxes);
    const ingredientsArray = Array.from(ingredients);
    ingredientsArray.splice(0, 2);

    for(let node of checkboxes) {
        node.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            const index = nodesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active');
            calculateOrder();
        })
    }
}

addIngredients(inputCheckbox);

// additing drinks

const addDrinks = drinksItems => {
    for(let item of drinksItems) {
        item.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            calculateOrder();
        })
    }
}

addDrinks(drinks);

// calculate order

const calculateOrder = () => {
    const ingredients = document.querySelectorAll('.container-custom-checkbox.active'),
          drinks = document.querySelectorAll('.select-drink-item.active');

    const startPrice = 300,
          ingredientsPrice = ingredients.length * 25,
          drinksPrice = drinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₴`;
};

// modal window

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none');
    prepareWondowModalContent();
});

window.addEventListener('click', event => {
    if(event.target === modalWindow) {
        modalWindow.classList.add('none');
    }
});

submitBtn.addEventListener('click', () => {
    modalWindow.classList.add('none');
});

const prepareWondowModalContent = () => {
    subject.innerHTML = '';
    ingredientsSpan.innerHTML = '';
    drinksSpan.innerHTML = '';

    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active'),
          adedDrinks = document.querySelectorAll('.select-drink-item.active');
    let ingredientsList = [];
    if(addedIngredients) {
        for(let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText);
        }
    };

    let drinkList = [];
    if(addedIngredients) {
        for(let drink of adedDrinks) {
            drinkList.push(drink.dataset.name);
        }
    };

    const totalIngredients = ingredientsList.join(', ') || 'немає інгредієнтів';
    const totalDrinks = drinkList.join(', ') || 'немає напоїв';
    const totalText = `Ти замовил(-а) піцу з інгредієнтами: '${totalIngredients}', а також напої: '${totalDrinks}'. З Вас: '${totalAmount.innerHTML}'`;

    subject.innerHTML = totalText;
}