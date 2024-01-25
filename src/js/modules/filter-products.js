import {numberOfFavorites, numberOfCart} from './numberOfAdded.js'
export class ProductCard {
	constructor(containerSelector) {
		this.container = document.querySelector(containerSelector);
		this.defaultLimit = 12; // Устанавливаем значение по умолчанию
	}
	 toggleCardExpansion() {
		this.container.classList.toggle('visible');
		
		// Здесь можно добавить дополнительные действия, например, изменение текста кнопки
	 }

	showLoadingMessage() {
		this.container.innerHTML = 'Loading...';
	}

	async fetchData(limit = this.defaultLimit) {
		try {
			this.showLoadingMessage(); // Показываем сообщение о загрузке

			// Выполняем запрос к серверу (ваш API-URL здесь)
			const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
			const data = await response.json();
			// Создаем карточки товаров на основе полученных данных
			this.renderCards(data);
		} catch (error) {
			console.error('Error fetching data:', error);
			this.container.innerHTML = 'Error fetching data';
		}
	}

	renderCards(products) {
		this.container.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

		products.forEach(product => {
			const card = this.createCard(product);
			this.container.appendChild(card);
		});
	}

	createCard(product) {
		const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		const productId = product.id;
  		const existingItem = cartItems.findIndex(item => item.id === productId);
		const favouritesItems = JSON.parse(localStorage.getItem('favorites')) || [];
  		const existingItemFavorites = favouritesItems.findIndex(item => item.id === productId);
		const cardBody = document.createElement('div');
      cardBody.className = 'card__body';

		const card = document.createElement('div');
		card.className = 'card';
	 
		card.addEventListener('click', () => {
			this.toggleCardExpansion(card);
		 });

		const imageContainer = document.createElement('div');
		imageContainer.className = 'card__image';
	 
		const image = document.createElement('img');
		image.className = 'card__img';
		image.src = product.image; // Замените на реальный путь к изображению
		image.alt = 'img';
	 
		const price = document.createElement('div');
		price.className = 'card__price';
		price.textContent = `${product.price} ₽`;
		const favouritesImg = document.createElement('img');
		favouritesImg.className = 'card__price-img';
		favouritesImg.src = existingItemFavorites !== -1  ? './img/like-heart.svg' :  './img/heart-black-shape.svg';
		favouritesImg.alt = 'heart';

		price.appendChild(favouritesImg);

		favouritesImg.addEventListener('click', (e) => {
			e.stopPropagation();
			this.addToFavorites(product);
			numberOfFavorites()
			favouritesImg.src = this.isProductInFavorites(product) ? './img/like-heart.svg' : './img/heart-black-shape.svg';
		 });
		 

		const rate = document.createElement('div');
		rate.className = 'card__rate';
		
		const rateNum = document.createElement('span');
		rateNum.className = 'card__rate-num';
		rateNum.textContent = product.rating.rate;
	 
		const starIcon = document.createElement('img');
		starIcon.src = 'https://cdn-icons-png.flaticon.com/128/149/149763.png';
		starIcon.alt = 'starfill';
	 
		const rateText = document.createElement('span');
		rateText.className = 'card__rate-text';
		rateText.textContent = '14 отзывов';
	 
		rate.appendChild(rateNum);
		rate.appendChild(starIcon);
		rate.appendChild(rateText);
	 
		const category = document.createElement('div');
		category.className = 'card__category';
		category.textContent = product.category; // Замените на реальную категорию
	 
		const description = document.createElement('p');
		description.className = 'card__descriptions';
		description.textContent = product.description;
	 
		const btn = document.createElement('span');
		btn.className = 'card__btn';
		btn.textContent = existingItem !== -1 ? 'Добавлен в корзину' : 'В корзину';
		btn.addEventListener('click', (e) => {
				e.target.textContent = 'Добавлен в корзину'
		})
		btn.addEventListener('click', (event) => {
			event.stopPropagation(); // Чтобы избежать всплытия события и вызова toggleCardExpansion
			this.addToCart(product); // Вызываем метод для добавления товара в корзину
			numberOfCart()
		 });
	 
		// Собираем структуру карточки
		imageContainer.appendChild(image);
		card.appendChild(imageContainer);
		card.appendChild(price);
		card.appendChild(rate);
		card.appendChild(category);
		card.appendChild(description);
		card.appendChild(btn);
		cardBody.appendChild(card);
		return cardBody;
	 }

	 // Добавьте метод isProductInFavorites
	 isProductInFavorites(product) {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		const productId = product.id;
		return favorites.some(item => item.id === productId);
	 }

	 toggleCardExpansion(clickedCard) {
		const isVisible = clickedCard.classList.contains('visible');
		const allCards = this.container.querySelectorAll('.card');
	 
		allCards.forEach(card => {
		  card.classList.remove('visible');
		});
	 
		// Добавляем/удаляем класс в зависимости от его наличия
		if (!isVisible) {
		  clickedCard.classList.add('visible');
		}
	 }

	addToCart(product) {
		const productId = product.id;
		const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

		const existingItem = cartItems.find(item => item.id === productId);

		if (existingItem) {
			return;
		} else {
			cartItems.push({ ...product, quantity: 1 });
		}

		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}

	addToFavorites(product) {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		const productId = product.id;
		const existingItemIndex = favorites.findIndex(item => item.id === productId);
	 
		if (existingItemIndex !== -1) {
		  // Товар уже в избранном, удаляем его
		  favorites.splice(existingItemIndex, 1);
		} else {
		  // Товара нет в избранном, добавляем его
		  favorites.push(product);
		}
		localStorage.setItem('favorites', JSON.stringify(favorites));
	 }


}

