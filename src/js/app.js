import * as webpFn from "./modules/fn.js";
import {ProductCard} from './modules/filter-products.js';
import {Accordion} from './modules/accordion.js';
import { updateCart} from './modules/renderCartItems.js';
import {updateFavourites} from './modules/renferFavoritesItems.js';
import {menu} from './modules/menu.js'
import {numberOfCart, numberOfFavorites} from './modules/numberOfAdded.js'

// ================== Product Fetch ======================
const showMore = document.querySelector('.catalog__btn');
const basket = window.location.href.endsWith('basket.html');
const favourites = window.location.href.endsWith('favourites.html');

if (!basket && !favourites) {
	menu();
	
const productCard = new ProductCard('.catalog__cards');
productCard.fetchData();
showMore.addEventListener('click', async (e) => {
	e.preventDefault();
	let isLoading = false;
	if (!isLoading) {
	  isLoading = true;
 
	  try {
		 if (showMore.textContent === 'Все товары') {
			await productCard.fetchData('');
			showMore.textContent = 'Закрыть';
		 } else {
			// Восстанавливаем исходный текст кнопки
			await productCard.fetchData('12');
			showMore.textContent = 'Все товары';
		 }
	  } catch (error) {
		 console.error('Error fetching data:', error);
	  } finally {
		 isLoading = false;
	  }
	}
 });

// =============== Swiper ====================

let mySwiper = new Swiper(".my-swiper", {
  touchRatio: 0.5,
  touchAngle: 45, 
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let swiperRight = new Swiper(".swiper-right", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 30,
    touchRatio: 0.5,
    touchAngle: 45,
	 breakpoints: {
		// Добавьте разные параметры для разных размеров экрана
		320: {
		  spaceBetween: 15,
		},
		679: {
		  spaceBetween: 20,
		},
		859: {
		  spaceBetween: 30,
		},
		// Другие разрешения экрана и их параметры
	 },
  });

  swiperRight.controller.control = mySwiper;
  mySwiper.controller.control = swiperRight;

// ============= Accordion ==============

Accordion()
}

// ============= Cart ===============

if (window.location.href.endsWith('basket.html')) {

	updateCart()
	document.addEventListener('click', (event) => {
		// Находим ближайший родительский элемент .count__box
		 const countBox = event.target.closest('.count');
	 
			 if (countBox) {
				 // Находим связанные элементы
				 const input = countBox.querySelector('.count__input');
				 const productId = countBox.dataset.countId; // предполагаем, что у вашего .count элемента есть атрибут data-product-id, содержащий id продукта
				
				 // Получаем текущее значение
				 let quantity = parseInt(input.value);
	 
				 // Обработка клика на кнопку увеличения
				 if (event.target.closest('.count__up')) {
					 quantity += 1;
				 }
				 // Обработка клика на кнопку уменьшения
				 else if (event.target.closest('.count__down')) {
					 // Проверяем, чтобы не уйти в отрицательные значения
					 if (quantity > 1) {
					 quantity -= 1;
					 }
				 }
	 
				 // Обновляем значение input
				 input.value = quantity;
				 updateQuantityInLocalStorage(productId, quantity);
				 // Дополнительные действия, если нужны
			 }
		 });

		 function updateQuantityInLocalStorage(productId, newQuantity) {
			const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
			
			// Находим индекс продукта в массиве по productId
			const index = cartItems.findIndex(item => item.id === parseInt(productId));
			
			// Если продукт найден, обновляем значение quantity
			if (index !== -1) {
			  cartItems[index].quantity = newQuantity;
			  localStorage.setItem('cartItems', JSON.stringify(cartItems));
			  updateCart()
			}
		 }
}

// =================== Favourites ==========================

if (window.location.href.endsWith('favourites.html')) {
	updateFavourites()
}

// ====================== Menu ======================
numberOfCart();
numberOfFavorites()


webpFn.isWebp();


