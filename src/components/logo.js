class Logo extends HTMLElement {
	constructor() {
		super()
		
		let shadow = this.attachShadow({mode: 'open'})

		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'logo')

		const img = document.createElement('img')
		img.src = 'https://randomassets.adcharity.repl.co/V_DOM.png'

		const style = document.createElement('style')
		style.textContent = 
		`	
			.logo {
				height: 100vh;
				width: 100%;
				padding: 0;
				margin: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.logo > img {
				height: 13em;
				width: 13em;
				border-radius: 50%;
				cursor: pointer;
				box-shadow: 0 0 0.5em silver;
				transition: transform 0.3s ease;
			}
			.logo > img:hover {
				transform: scale(1.1);
			}
		`

		shadow.appendChild(style)
		shadow.appendChild(wrapper)
		wrapper.appendChild(img)
	}
}

export default Logo