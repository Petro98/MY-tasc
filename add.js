const blockForms = document.querySelector('.block_forms');
const formsButton = document.querySelector('.forms_button');
const mainBlock = document.querySelector('.main_block');
const checkboxRem = document.querySelectorAll('.pers .checkbox .container');
const checkboxMy = document.querySelectorAll('.my');

const colors = [
	'#2a9d8f',
	'#e76f51',
	'#264653',
	'#0077b6',
	'#ffc300',
	'#000814',
	'#264653',
	'#d00000',
	'#deaaff',
	'#283618',
	'#aacc00',
	'#3f37c9',
	'#7f5539',
	'#277da1',
	'#fca311',
	'#f08080',
	'#718355',
	'#4d194d',
	'#89b0ae',
];
let colorsRandom;

// hex To RgbA
function hexToRgbA(hex) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return (
			'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
		);
	} else {
		return 'rgba(228, 207, 228, 0.466)';
	}
}

// очистака
function rest() {
	window.location.reload();
}

// додавання нових блоків та перевірка на заповнення днів
formsButton.addEventListener('click', () => {
	const blockFormss = document.querySelectorAll('.main_block .block_forms');
	const block = document.querySelectorAll('.main_block .forms_time');

	function checkboxErrorFull() {
		const blockFormss = document.querySelectorAll('.my');
		// Errorr the days are over
		blockFormss[blockFormss.length - 1].children[6].innerHTML =
			'Errorr the days are over';
		blockFormss[blockFormss.length - 1].children[6].style.opacity = 1;
	}

	let res = true;
	block.forEach(i => {
		if (i.children[1].value === '') {
			res = false;
			i.children[2].style.opacity = 1;
		}
	});
	if (blockFormss.length === 0 && valCek() === 0) {
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
			if (res && valCek() === 0) {
				FormsAdd();
			}
		} else if (blockFormss.length > 6 || dayInitial.length > 6) {
			checkboxErrorFull();
		}
	}
});

FormsAdd();
// перевірка на вибраний чек в
function valCek() {
	const blockFormss = document.querySelectorAll('.main_block .block_forms');
	let arrayChek1 = [];
	for (const i of blockFormss) {
		let arrayChek = i.children[4].children;
		let arr = [];
		let arrayChek2;
		for (let index = 0; index < arrayChek.length - 1; index++) {
			const element = arrayChek[index].children[1].checked;
			arrayChek2 = arrayChek[index].parentElement.parentElement;
			(element === true) ? arrayChek1.push(element) : arr.push(false);
		}

		if (arr.length === 7) {
			arrayChek2.children[5].style.opacity = 1;
			arrayChek1.push(false);
		}
	}
	let checkedChec = arrayChek1.filter(i => i === false).length;
	return checkedChec;
}
// копіювання блока
function FormsAdd() {
	const clon = blockForms.cloneNode(true);
	mainBlock.append(clon);
	substitute(clon);
	validationInput();
}

// рандом коляру
function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length - 1);
	if (index == -1) {
		return colors[0];
	}
	return colors[index];
}
// редагування копійованого блока
function substitute(clon) {
	clon.querySelector('.forms_button').classList.add('mystyle');
	clon.classList.remove('pers');
	clon.classList.add('my');

	let color = getRandomColor();
	if (color === colorsRandom) {
		color = getRandomColor();
	}
	colorsRandom = color;

	clon.style.boxShadow = `0px 0px 17px ${color}`;

	formsButton.addEventListener('mouseover', function () {
		this.children[0].style.backgroundColor = colorsRandom;
	});
	formsButton.addEventListener('click', function () {
		this.children[0].style.backgroundColor = colorsRandom;
	});

	formsButton.addEventListener('mouseout', function () {
		this.children[0].style.backgroundColor = '#fff';
	});
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
		let oneInput = key.children[1].children[1];
		let towInput = key.children[3].children[1];
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
	if (worcing_items.length && worcing_items.length === mainBlockf.length) {
		console.log(worcing_items);
	}

	// запис інформації
	function Worcing_items(oneInput, towInput, arrCheckbox) {
		obj = {
			days: arrCheckbox,
			hours: {
				time_from: oneInput.value,
				time_to: towInput.value,
			},
		};

		if (arrCheckbox.length !== 0 && oneInput.value !== '' && towInput.value !== '') {
			worcing_items.push(obj);
		} else if (valCek() && (oneInput.value === '' || towInput.value === '')) {
			ErrorAdd('Error select all checkbox and Input');
			ErrorChildrenInput()
		} else if (arrCheckbox.length === 0) {
			ErrorAdd('Error select all checkbox');
		} else if (oneInput.value === '' || towInput.value === '') {
			ErrorAdd('Error select all Input');
			ErrorChildrenInput()
		}
		function ErrorChildrenInput(){
			if(oneInput.value === ''){
				oneInput.parentElement.children[2].style.opacity = 1
			}
			if(towInput.value === ''){
				towInput.parentElement.children[2].style.opacity = 1
			}
		}
		function ErrorAdd(text) {
			const blockFormss = document.querySelectorAll('.my');
			blockFormss[blockFormss.length - 1].children[6].innerHTML = text;
			blockFormss[blockFormss.length - 1].children[6].style.opacity = 1;
		}
	}
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
	const checkbox = document.querySelectorAll('.my .checkbox .container');
	for (const my of checkbox) {
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
			this.parentElement.parentElement.parentElement.children[5].style.opacity = 0;

			const blockFormss = document.querySelectorAll('.my');
			blockFormss[blockFormss.length - 1].children[6].style.opacity = 0;

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
				for (const i of checkbox) {
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
					for (const i of checkbox) {
						let dayInitial = i.children[0].textContent.trim();
						if (day === dayInitial) {
							i.children[1].disabled = true;
							if (i.children[1].checked === false) {
								i.children[2].classList.add('checkmark2');
							}
						}
					}
				});
			}
		}
	}
}

function validationInput() {
	const input = document.querySelectorAll('main .main_block .forms_time input');
	for (const i of input) {
		i.addEventListener('blur', function (i) {
			this.style.backgroundColor = '#fff';

			let value = i.path[1].children[1].value;
			let valueArr = value.split('');
			let isNaNValue = valueArr.filter(i => {
				if (!isNaN(i) || i == ':') {
					return i;
				} else if (i == ':') {
					return i;
				}
			});

			let colon = valueArr.filter(i => i == ':');
			let namber = valueArr.filter(i => !isNaN(i));

			if (
				valueArr.length === isNaNValue.length &&
				colon.length < 2 &&
				namber.length < 5
			) {
				if (value.length === 1) {
					this.value = `0${value}:00`;
				} else if (value.length === 2 && value[1] !== ':' && value[0] !== ':') {
					this.value = `${value}:00`;
				} else if (value.length === 3) {
					if (value[1] === ':') {
						this.value = `0${value}0`;
					} else if (value[2] === ':') {
						this.value = `${value}00`;
					}
				} else if (
					value.length === 4 &&
					value.split('').every(i => !isNaN(i))
				) {
					let res = value.split('');
					res.splice(2, 0, ':');
					this.value = res.join('');
				} else if (value === '') {
					i.path[1].children[2].style.opacity = 1;
					this.value = '';
				}
			} else {
				error();
			}
			function error() {
				i.path[1].children[1].parentElement.children[2].innerHTML =
					'Incorrect input';
				i.path[1].children[1].parentElement.children[2].style.opacity = 1;
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
					error();
				}
				if (!(+valueTwo[0] < 3 && +valueTwo[3] < 6) && valueTwo != 0) {
					error();
				} else if (+valueTwo[0] == 2 && +valueTwo[1] > 3) {
					error();
				}

				let elementOne = inputOne[index].value.split('');
				let elementTwo = inputTwo[index].value.split('');
				elementOne.splice(2, 1);
				elementTwo.splice(2, 1);
				elementOne = +elementOne.join('');
				elementTwo = +elementTwo.join('');

				if (elementTwo > 0 || inputTwo[index].value == '00:00') {
					if (elementTwo <= elementOne) {
						this.parentElement.children[2].innerHTML = 'Enter a larger number';
						this.parentElement.children[2].style.opacity = 1;
						this.value = '';
					}
				}
			}
		});

		i.addEventListener('focus', function (i) {
			let colorsRandomRgbA = hexToRgbA(colorsRandom).split('');
			colorsRandomRgbA.splice(-2, 1, '0.25');
			i.path[1].children[1].style.backgroundColor = colorsRandomRgbA.join('');

			i.path[1].children[2].style.opacity = 0;
			i.path[1].children[2].innerHTML = 'Errorr equired field';

			const blockFormss = document.querySelectorAll('.my');
			blockFormss[blockFormss.length - 1].children[6].style.opacity = 0;
			setTimeout(() => {
				i.path[1].children[1].value = '';
			}, 5);
		});
	}
}
validationInput();
