import {ProductCard} from './filter-products.js';
import {numberOfFavorites} from './numberOfAdded.js'

const addCart = new ProductCard('.catalog__cards')

function renderFavoritestItem(product) {
	// Создаем HTML-разметку для товара
	const productHTML = `
	<section class="favourites-product">
	<div class="favourites-product__img"><img src="${product.image}" alt="Apple MacBook Air 13"></div>
	<div class="favourites-product__title">${product.title}</div>
	<div class="favourites-product__count">
	${product.description}
	</div>
	<div class="favourites-product__price">${product.price} $</div>
	<div class="favourites-product__controls">
		 <button type="favourites-button"  class="delete-favourites" data-product-id="${product.id}">
			  <img src="./img/like-heart.svg" alt="Delete">
		 </button>
		 <button type="favourites-button" class="add-cart" data-product-id="${product.id}">
		  <img src="./img/shop-cart.svg" alt="Delete">
		 </button>
	</div>
</section>
	`;
 
	return productHTML
 }

 export function updateFavourites() {
	const favoritesContainer = document.querySelector('.favourites');
	const favoritesTitle = document.querySelector('.title-2')
	const favoritesItems = JSON.parse(localStorage.getItem('favorites')) || [];

	// Находим контейнер товаров в корзине
	const productsContainer = favoritesContainer.querySelector('.favorites-cart-products');

	// Очищаем контейнер перед отрисовкой
	productsContainer.innerHTML = '';
	if (favoritesItems.length === 0) {
		favoritesContainer.innerHTML = '';
		favoritesTitle.textContent = 'Пусто'
	}

	productsContainer.addEventListener('click', (e) => {
		if (e.target.closest('.add-cart')) {
			 const productId = e.target.closest('.add-cart').dataset.productId;
			 const product = getProductById(productId);
          addCart.addToCart(product);
			 removeFromCart(productId);
			 updateFavourites();
		}
  });

	productsContainer.addEventListener('click', (e) => {
		// Проверяем, что клик был по кнопке удаления
		if (e.target.closest('.delete-favourites')) {
		  // Получаем id товара из data-атрибута
		  const productId = e.target.closest('.delete-favourites').dataset.productId;
		  // Вызываем функцию удаления из корзины
		  removeFromCart(productId);
		}
	 });

	// Проходим по товарам в корзине и добавляем их в контейнер товаров
	favoritesItems.forEach(item => {
	  const productSection = renderFavoritestItem(item);
	  productsContainer.insertAdjacentHTML('beforeend',productSection);
	});
	// После того, как все товары добавлены, обновляем подвал корзины (например, общее количество и стоимость)
	// updateCartFooter(cartItems);
	numberOfFavorites()
}

// Вызывайте эту функцию, когда нужно обновить корзину updateCart()

// ==================================================

export function removeFromCart(productId) {
	// Получаем текущий массив товаров из localStorage
	const cartItems = JSON.parse(localStorage.getItem('favorites')) || [];
 
	// Находим индекс товара в массиве по productId
	const index = cartItems.findIndex(item => item.id === parseInt(productId));

	// Если товар найден, удаляем его из массива
	if (index !== -1) {
	  cartItems.splice(index, 1);
 
	  // Обновляем localStorage
	  localStorage.setItem('favorites', JSON.stringify(cartItems));
 
	  // Обновляем отображение корзины
	  updateFavourites();
	}
 }

 function getProductById(productId) {
	const products = JSON.parse(localStorage.getItem('favorites')) || [];
	return products.find(product => product.id === parseInt(productId));
}