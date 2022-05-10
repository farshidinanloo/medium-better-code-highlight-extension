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
		getCodeText(element);
	}
}, 1000);

function getCodeText(element) {
	let code = element.innerText;

	try {
		const formattedCode = prettier.format(code, {
			parser: 'babel',
			plugins: [parserBabel],
		});
		if (formattedCode) {
			code = formattedCode;
		}
	} catch (error) {}

	const html = hljs.highlight(code, {
		language: 'javascript',
	}).value;

	element.classList.add('hljs');
	element.innerHTML = `<code class='hljs'>${html}</code>`;
}
