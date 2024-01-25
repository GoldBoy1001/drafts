import {numberOfCart} from './numberOfAdded.js'

function renderCartItem(product) {
	// Создаем HTML-разметку для товара
	const productHTML = `
	  <section class="product">
		 <div class="product__img">
			<img src="${product.image}" alt="${product.title}">
		 </div>
		 <div class="product__title">${product.title}</div>
		 <div class="product__count">
			<div class="count" data-count-id="${product.id}">
			  <div class="count__box">
				 <input type="number" class="count__input" min="1" max="${product.rating.count}" value="${product.quantity}">
			  </div>
			  <div class="count__controls">
				 <button type="button" class="count__up">
					<img src="./img/icon-up.svg" alt="Increase">
				 </button>
				 <button type="button" class="count__down">
					<img src="./img/icon-down.svg" alt="Decrease">
				 </button>
			  </div>
			</div>
		 </div>
		 <div class="product__price">${product.price * product.quantity} $</div>
		 <div class="product__controls">
			<button type="button" class="delete-button" data-product-id="${product.id}">
			  <img src="./img/cross.svg" alt="Delete">
			</button>
		 </div>
	  </section>
	`;
 
	return productHTML
 }

 function updateCartFooter(cartItems) {
	const cartFooter = document.querySelector('.cart-footer');
 
	if (cartFooter) {
		// Ваш код для обновления подвала корзины, например:
		const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
		const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
			// Пример обновления текста в подвале корзины
			cartFooter.querySelector('.cart-footer__count').textContent = `${totalCount} единиц`;
			cartFooter.querySelector('.cart-footer__price').textContent = `${totalPrice} $`;
		
	}

 }

 export function updateCart() {
	const cartContainer = document.querySelector('.cart');
	const cartTitle = document.querySelector('.title-1')
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

	// Находим контейнер товаров в корзине
	const productsContainer =  cartContainer.querySelector('.cart-products');

	// Очищаем контейнер перед отрисовкой
	productsContainer.innerHTML = '';
	if (cartItems.length === 0) {
		cartContainer.innerHTML = '';
		cartTitle.textContent = 'В корзине нет товаров'
	}

	productsContainer.addEventListener('click', (e) => {
		// Проверяем, что клик был по кнопке удаления
		if (e.target.closest('.delete-button')) {
		  // Получаем id товара из data-атрибута
		  const productId = e.target.closest('.delete-button').dataset.productId;
	 
		  // Вызываем функцию удаления из корзины
		  removeFromCart(productId);
		}
	 });

	// Проходим по товарам в корзине и добавляем их в контейнер товаров
	cartItems.forEach(item => {
	  const productSection = renderCartItem(item);
	  productsContainer.insertAdjacentHTML('beforeend',productSection);
	});
	// После того, как все товары добавлены, обновляем подвал корзины (например, общее количество и стоимость)
	updateCartFooter(cartItems);
	numberOfCart()
}

// Вызывайте эту функцию, когда нужно обновить корзину updateCart()

// ==================================================

export function removeFromCart(productId) {
	// Получаем текущий массив товаров из localStorage
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
 
	// Находим индекс товара в массиве по productId
	const index = cartItems.findIndex(item => item.id === parseInt(productId));

	// Если товар найден, удаляем его из массива
	if (index !== -1) {
	  cartItems.splice(index, 1);
 
	  // Обновляем localStorage
	  localStorage.setItem('cartItems', JSON.stringify(cartItems));
 
	  // Обновляем отображение корзины
	  updateCart();
	}
 }