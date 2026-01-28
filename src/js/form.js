export function initForm() {
	const form = document.getElementById('contactForm');
	if (!form) {
		console.warn('Форма #contactForm не найдена');
		return;
	}

	const nameInput = document.getElementById('name');
	const phoneInput = document.getElementById('phone');
	const agreementCheckbox = document.getElementById('agreement');
	const submitBtn = document.getElementById('submitBtn');
	const successModal = document.getElementById('successModal');

	// ─────────────────────────────────────────────
	// Маска телефона
	// ─────────────────────────────────────────────
	phoneInput.addEventListener('input', e => {
		let value = e.target.value.replace(/\D/g, '');

		if (value.startsWith('7') || value.startsWith('8')) {
			value = value.slice(1);
		}

		value = value.slice(0, 10);

		let formatted = '+7';
		if (value.length > 0) formatted += ` (${value.slice(0, 3)}`;
		if (value.length > 3) formatted += `) ${value.slice(3, 6)}`;
		if (value.length > 6) formatted += `-${value.slice(6, 8)}`;
		if (value.length > 8) formatted += `-${value.slice(8, 10)}`;

		e.target.value = formatted;
		validatePhone();
	});

	// ─────────────────────────────────────────────
	// Валидация в реальном времени
	// ─────────────────────────────────────────────

	function showError(elementId, message) {
		const errorEl = document.getElementById(elementId);
		errorEl.textContent = message;
	}

	function clearError(elementId) {
		const errorEl = document.getElementById(elementId);
		errorEl.textContent = '';
	}

	function validateName() {
		const value = nameInput.value.trim();
		if (!value) {
			showError('nameError', 'Поле обязательно');
			return false;
		}
		if (value.length < 2) {
			showError('nameError', 'Минимум 2 символа');
			return false;
		}
		clearError('nameError');
		return true;
	}

	function validatePhone() {
		const value = phoneInput.value;
		const digits = value.replace(/\D/g, '');
		if (!digits) {
			showError('phoneError', 'Поле обязательно');
			return false;
		}
		if (digits.length !== 11 || !/^[78]/.test(digits)) {
			showError('phoneError', 'Введите корректный номер (+7...)');
			return false;
		}
		clearError('phoneError');
		return true;
	}

	function validateAgreement() {
		if (!agreementCheckbox.checked) {
			showError('agreementError', 'Необходимо дать согласие');
			return false;
		}
		clearError('agreementError');
		return true;
	}

	// Привязываем валидацию к событиям
	nameInput.addEventListener('input', validateName);
	nameInput.addEventListener('blur', validateName);

	phoneInput.addEventListener('blur', validatePhone);

	agreementCheckbox.addEventListener('change', validateAgreement);

	// ─────────────────────────────────────────────
	// Отправка формы
	// ─────────────────────────────────────────────

	form.addEventListener('submit', e => {
		e.preventDefault();

		const isNameValid = validateName();
		const isPhoneValid = validatePhone();
		const isAgreementValid = validateAgreement();

		if (!isNameValid || !isPhoneValid || !isAgreementValid) {
			return;
		}

		const formData = {
			name: nameInput.value.trim(),
			phone: phoneInput.value,
			agreement: agreementCheckbox.checked,
			timestamp: new Date().toISOString(),
		};

		console.log('Форма отправлена:', formData);

	
		if (successModal) {
			successModal.showModal();

			const timeout = setTimeout(() => {
				successModal.close();
			}, 3000);

			// Если пользователь закрыл раньше — очищаем таймер
			successModal.addEventListener('close', () => clearTimeout(timeout), {
				once: true,
			});
		}

		form.reset();
	});

	// ─────────────────────────────────────────────
	// Закрытие модалки по клику вне диалога
	// ─────────────────────────────────────────────
	if (successModal) {
		successModal.addEventListener('click', e => {
			if (e.target === successModal) {
				successModal.close();
			}
		});
	}
}
