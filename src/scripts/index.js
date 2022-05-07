import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import '../styles/style.css';

const elements = document.querySelectorAll('pre');

for (const element of elements) {
	getSapnText(element);
}

function getSapnText(element) {
	let parentNode = element.childNodes[0].parentNode;
	const data = [];

	for (const item of element.childNodes) {
		data.push(item.innerText);
	}

	let code = data.join(' ').replaceAll('" "', '\n').replaceAll('"', '');

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
