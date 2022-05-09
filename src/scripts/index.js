import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import '../styles/style.css';

let MAX_TRY_COUNT = 15;

let elements = [];

let timeout = setInterval(() => {
	elements = document.querySelectorAll('pre');
	MAX_TRY_COUNT -= 1;

	if (elements.length !== 0 || MAX_TRY_COUNT < 0) {
		clearInterval(timeout);
	}
	for (const element of elements) {
		getSapnText(element);
	}
}, 1000);

function getSapnText(element) {
	let parentNode = element.childNodes[0].parentNode;
	const data = [];

	for (const item of element.childNodes) {
		data.push(item.innerText);
	}

	let code = data.join(' ');

	try {
		const forattedCode = prettier.format(code, {
			parser: 'babel',
			plugins: [parserBabel],
		});
		if (forattedCode) {
			code = forattedCode;
		}
	} catch (error) {}

	const html = hljs.highlight(code, {
		language: 'javascript',
	}).value;

	parentNode.classList.add('hljs');
	parentNode.innerHTML = `<code class='hljs'>${html}</code>`;
}
