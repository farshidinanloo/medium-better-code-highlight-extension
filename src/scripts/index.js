import '../styles/index.scss';
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
		if (item.tagName === 'SPAN') {
			data.push(item.textContent);
		}
	}

	const code = data.join(' ').replaceAll('" "', '\n').replaceAll('"', '');

	try {
		const forattedCode = prettier.format(code, {
			parser: 'babel',
			plugins: [parserBabel],
		});
		if (forattedCode) {
			const html = hljs.highlight(forattedCode, {
				language: 'javascript',
			}).value;

			parentNode.classList.add('hljs');
			parentNode.innerHTML = `<code class='hljs'>${html}</code>`;
		}
	} catch (error) {}
}
