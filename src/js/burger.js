export function initBurger() {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.mobile-nav');
	const contacts = document.querySelector('.contacts');

	if (!burger || !nav) return;

	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		nav.classList.toggle('active');
		contacts.classList.toggle('active');

		const isExpanded = burger.classList.contains('active');
		burger.setAttribute('aria-expanded', isExpanded);
		document.body.style.overflow = isExpanded ? 'hidden' : '';
	});

	// закрытие по клику вне
	document.addEventListener('click', e => {
		if (
			nav.classList.contains('active') &&
			!nav.contains(e.target) &&
			!burger.contains(e.target)
		) {
			burger.classList.remove('active');
			nav.classList.remove('active');
			contacts.classList.remove('active');
			burger.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
	});
}
