export function numberOfAdded() {
	numberOfFavorites()
	numberOfCart()
}

export function numberOfFavorites() {
	const num = document.querySelector('.favourites-num')
	const cartItems = JSON.parse(localStorage.getItem('favorites')) || [];
	if(cartItems.length > 0) {
		num.style.display = 'flex'
		num.textContent = cartItems.length;
	} else {
		num.style.display = 'none';
	}
}
export function numberOfCart() {
	const num = document.querySelector('.cart-num')
	const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
	if(cartItems.length > 0) {
		num.style.display = 'flex';
		num.textContent = cartItems.length;
	} else {
		num.style.display = 'none';
	}
}