export function menu() {
	menuToogle();
	menuActive();
}


function menuToogle() {
	const menuList = document.querySelector('.menu-br__list');
	const menuItem = document.querySelectorAll('.menu-br__item');
	menuList.addEventListener('click', (e) => {
		if(e.target.closest('.menu-br__list')) {
			menuItem.forEach(i => {
				i.classList.remove('active-menu')
			})
			e.target.classList.add('active-menu')
		}
	})
}

function menuActive() {
	const burger = document.querySelector('.body__burger');
	const menu = document.querySelector('.menu-br');
	const slider = document.querySelector('.main__slider');
   const swiperRightHtml = document.querySelector('.swiper-right');
	function handleWindowSize() {
		const screenWidth = window.innerWidth;
		
	   if (screenWidth > 641) {
		  swiperRightHtml.style.display = "grid";
		} if (screenWidth < 641) {
		  swiperRightHtml.style.display = "none";
		} else {
		  if (!menu.classList.contains('menu-br-hidden')) {
			 swiperRightHtml.style.display = "none";
		  } 
		}
	 }
	 
	 // Добавляем слушатель события resize
	 window.addEventListener('resize', handleWindowSize);
	 
	 // Вызываем функцию при загрузке страницы
	 handleWindowSize();
  
	 burger.addEventListener('click', e => {
		if (e.target.closest('.body__burger')) {
		  menu.classList.toggle('menu-br-hidden');
		  slider.classList.toggle('main__slider-togle');
		  if (window.innerWidth >= 641) {
			 swiperRightHtml.style.display = menu.classList.contains('menu-br-hidden') ? "grid" : "none";
		  }
		}
	 });
}

