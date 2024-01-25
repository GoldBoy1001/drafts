export function Accordion() {
	document.addEventListener('DOMContentLoaded', function () {
		const textContainer = document.querySelector('.assortment__text');
		const readMoreBtn = document.querySelector('.read-more-btn');
	 
		readMoreBtn.addEventListener('click', function () {
		  textContainer.classList.toggle('collapsed');
		  textContainer.classList.toggle('expanded');
		});
	 });
}