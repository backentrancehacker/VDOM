import render from './render'

const zip = (xs, ys) => {
	const zipped = []
	for(let i = 0; i < Math.min(xs, ys); i++) {
		zipped.push([xs[i], ys[i]])
	}
	return zipped
}
const diffAttrs = (oldAttrs, newAttrs) => {
	let patches = []
	for(const [key, value] of Object.entries(newAttrs)) {
		patches.push(node => {
			node.setAttribute(key, value)
			return node
		})
	}
	for(const key in oldAttrs) {
		if(!(key in newAttrs)) {
			patches.push(node => {
				node.removeAttribute(key)
				return node
			})
		}
	}
	return node => {
		for(const patch of patches) 
			patch(node)
		return node
	}
}
const diffChildren = (oldChildren, newChildren) => {
	let patches = []
	oldChildren.forEach((child, i) => {
		patches.push(diffTree(child, newChildren[i]))
	})
	
	let _patches = []
	for(const child of newChildren.slice(oldChildren.length)) {
		_patches.push(node => {
			node.appendChild(render(child))
			return node
		})
	}
	return parent => {
		for(const [patch, child] of zip(patches, parent.childNodes)) 
			patch(child)
		
		for(const patch of _patches) 
			patch(parent)
		
		return parent
	}
}

const diffTree = (oldTree, newTree) => {
	if(!newTree) {
		return node => {
			node.remove()
		}
	}
	if(typeof oldTree == 'string' || typeof newTree == 'string') {
		if(oldTree !== newTree) {
			return node => {
				const replacement = render(newTree)
				node.replaceWith(replacement)
				return replacement
			}
		}
		else {
			return node => node
		}
	}
	if(oldTree.tagName !== newTree.tagName) {
		return node => {
			const replacement = render(newTree)
			node.replaceWith(replacement)
			return replacement
		}
	}
	const patchAttrs = diffAtrs(oldTree.attrs, newTree.attrs)
	const patchChildren = diffChildren(oldTree.children, newTree.children)

	return node => {
		patchAttrs(node)
		patchChildren(node)
		return node
	}
}


export default diffTree