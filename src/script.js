import createElement from './vdom/createElement' 
import render from './vdom/render'
import mount from './vdom/mount'
import diffTree from './vdom/difference'

const counter = count => createElement('div', {
	attrs: {
		id: 'counter',
		'data-count': count
	},
	children: [
		`The current count is ${count}.`
	]
})

let count = 0
const vApp = render(counter(count))
let root = mount(vApp, document.getElementById('root'))

setInterval(() => {
	count ++
	let newApp = counter(count)
	const patch = diffTree(vApp, newApp)

	root = patch(root)
	vApp = newApp
}, 1000)