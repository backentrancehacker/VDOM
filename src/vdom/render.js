const renderElement = ({tagName, attrs, children}) => {
	const element = document.createElement(tagName)

	for(const [key, value] of Object.entries(attrs)) {
		element.setAttribute(key, value)
	}
	
	for(const child of children) {
		element.appendChild(render(child))
	}

	return element
}
const render = node => {
	if(typeof node === 'string') return document.createTextNode(node)
	return renderElement(node)
}

export default render