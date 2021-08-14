const blockForms = document.querySelector('.block_forms');
const formsButton = document.querySelector('.forms_button');
const mainBlock = document.querySelector('.main_block');
const checkboxRem = document.querySelectorAll('.pers .checkbox .container');
const checkboxMy = document.querySelectorAll('.my');


// очистака
function rest() {
	mainBlock.innerHTML = '';
	// window.location.reload();
}

// додавання нових блоків та перевірка на заповнення днів
formsButton.addEventListener('click', () => {
	const blockFormss = document.querySelectorAll('.main_block .block_forms');
	const block = document.querySelectorAll('.main_block .forms_time');
	let res = true;
	block.forEach(i => {
		if (i.children[1].value === '') res = false;
	});
	if (blockFormss.length === 0) {
		FormsAdd();
	} else {
		let lastItem = blockFormss[blockFormss.length - 1].children[4].children;
		let dayInitial = [];
		for (const i of lastItem) {
			if (i.children[1].checked || i.children[1].disabled) {
				dayInitial.push(i.children[1].checked);
			}
		}
		let tr = dayInitial.filter(i => i === true);

		if (blockFormss.length < 7 && dayInitial.length < 7 && tr[0] === true) {
			if (res) {
				FormsAdd();
			} else {
				alert('заповніть input');
			}
		} else if (tr[0] !== true) {
			alert('оберіть день');
		} else {
			alert('В тижні тільки 7 днів!!!');
		}
	}
});
FormsAdd();
// копіювання блока
function FormsAdd() {
	const clon = blockForms.cloneNode(true);
	mainBlock.append(clon);

	substitute(clon);
	validationInput();
}

// редагування копійованого блока
function substitute(clon) {
	clon.querySelector('.forms_button').classList.add('mystyle');
	clon.classList.remove('pers');
	clon.classList.add('my');
	remove();
	Disabled();
}

// видалення блока
function remove() {
	const mystyle = document.querySelectorAll('.mystyle');
	for (const my of mystyle) {
		my.addEventListener('click', item => {
			item.composedPath()[2].remove();
			checkboxValidation(item);
		});
	}
}
// масив з інфою
let worcing_items = [];

// прийняття інформації
function info() {
	worcing_items = [];
	const mainBlockf = document.querySelectorAll('.main_block .block_forms');
	for (const key of mainBlockf) {
		let oneInput = key.children[1].children[1].value;
		let towInput = key.children[3].children[1].value;
		let checkbox = key.children[4].children;
		const arrCheckbox = [];
		for (const i of checkbox) {
			if (i.children[1].checked) {
				let day = i.children[0].textContent.trim();
				arrCheckbox.push(day);
			}
		}
		Worcing_items(oneInput, towInput, arrCheckbox);
	}
	if (worcing_items.length) console.log(worcing_items);
}

// запис інформації
function Worcing_items(oneInput, towInput, arrCheckbox) {
	obj = {
		days: arrCheckbox,
		hours: {
			time_from: oneInput,
			time_to: towInput,
		},
	};
	worcing_items.push(obj);
}

// редагування Checkbox при видаленні
function checkboxValidation(item) {
	const mystyle = document.querySelectorAll('.my .checkbox .container');
	let res = item.composedPath()[2].children[4].children;
	for (const i of res) {
		if (i.children[1].checked) {
			let day = i.children[0].textContent.trim();
			for (const i of mystyle) {
				let dayInitial = i.children[0].textContent.trim();
				if (day === dayInitial) {
					i.children[1].disabled = false;
					i.children[2].classList.remove('checkmark2');
				}
			}
			for (const i of checkboxRem) {
				let dayInitial = i.children[0].textContent.trim();
				if (day === dayInitial) {
					i.children[1].disabled = false;
					i.children[2].classList.remove('checkmark2');
				}
			}
		}
	}
}

// валідація Checkbox
function Disabled() {
	const mystyle = document.querySelectorAll('.my .checkbox .container');
	for (const my of mystyle) {
		my.children[2].addEventListener('mouseover', function (e) {
			if (my.children[1].disabled === false) {
				my.children[2].classList.add('checkmark4');
			}
		});
		my.children[2].addEventListener('mouseout', function (e) {
			if (my.children[1].disabled === false) {
				my.children[2].classList.remove('checkmark4');
			}
		});
		my.children[2].addEventListener('click', name);
		function name() {
			my.children[2].classList.remove('checkmark4');
			let day = my.children[0].textContent.trim();
			for (const i of checkboxRem) {
				let dayInitial = i.children[0].textContent.trim();
				if (day === dayInitial) {
					i.children[1].disabled = true;
					i.children[2].classList.add('checkmark2');
				}
			}


			if (my.children[1].checked) {
				my.children[1].disabled = false;
				for (const i of mystyle) {
					let dayInitial = i.children[0].textContent.trim();
					if (day === dayInitial) {
						i.children[1].disabled = false;
						i.children[2].classList.remove('checkmark2');
					}
				}
				for (const i of checkboxRem) {
					let dayInitial = i.children[0].textContent.trim();
					if (day === dayInitial) {
						i.children[1].disabled = false;
						i.children[2].classList.remove('checkmark2');
					}
				}
			} else {
				setTimeout(() => {
					
					for (const i of mystyle) {
						let dayInitial = i.children[0].textContent.trim();
						if (day === dayInitial) {
							i.children[1].disabled = true;
							if (i.children[1].checked === false) {
								i.children[2].classList.add('checkmark2');
							}
						}
					}
				}, 0);
			}
		}
	}
}

function validationInput() {
	const val = document.querySelectorAll('main .main_block .forms_time input');
	for (const i of val) {
		i.addEventListener('blur', i => {
			let value = i.path[1].children[1].value;
			let a = value.split('');
			let b = a.filter(i => {
				if (!isNaN(i) || i == ':') {
					return i;
				} else if (i == ':') {
					return i;
				}
			});
			let c = a.filter(i => i == ':');
			let namber = a.filter(i => !isNaN(i));
			if (a.length === b.length && c.length < 2 && namber.length < 5) {
				if (value.length === 1) {
					i.path[1].children[1].value = `0${value}:00`;
				} else if (value.length === 2 && value[1] !== ':' && value[0] !== ':') {
					i.path[1].children[1].value = `${value}:00`;
				} else if (value.length === 3) {
					if (value[1] === ':') {
						i.path[1].children[1].value = `0${value}0`;
					} else if (value[2] === ':') {
						i.path[1].children[1].value = `${value}00`;
					}
				} else if (
					value.length === 4 &&
					value.split('').every(i => !isNaN(i))
				) {
					let res = value.split('');
					res.splice(2, 0, ':');
					i.path[1].children[1].value = res.join('');
				} else if (value === '') {
					i.path[1].children[1].value = '';
				}
			} else {
				error('помилка');
			}
			function error(text) {
				alert(`${text}`);
				i.path[1].children[1].value = '';
			}

			const inputOne = document.querySelectorAll('.my .inputOne input');
			const inputTwo = document.querySelectorAll('.my .inputTwo input');
			for (let index = 0; index < inputOne.length; index++) {
				let valueOne = inputOne[index].value;
				let valueTwo = inputTwo[index].value;

				if (!(+valueOne[0] < 3 && +valueOne[3] < 6) && valueOne != 0) {
					error();
				} else if (+valueOne[0] == 2 && +valueOne[1] > 3) {
					error('помилка');
				}
				if (!(+valueTwo[0] < 3 && +valueTwo[3] < 6) && valueTwo != 0) {
					error();
				} else if (+valueTwo[0] == 2 && +valueTwo[1] > 3) {
					error('помилка');
				}

				let elementOne = inputOne[index].value.split('');
				let elementTwo = inputTwo[index].value.split('');
				elementOne.splice(2, 1);
				elementTwo.splice(2, 1);
				elementOne = +elementOne.join('');
				elementTwo = +elementTwo.join('');

				if (elementTwo > 0 || inputTwo[index].value == '00:00') {
					if (elementTwo <= elementOne) {
						error('ведіть більше число');
					}
				}
			}
		});
		i.addEventListener('focus', i => {
			setTimeout(() => {
				i.path[1].children[1].value = '';
			}, 5);
		});
	}
}
validationInput();
