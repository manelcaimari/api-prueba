class Boton extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.handleButtonClick())
  }

  disconnectedCallback () {
    this.shadowRoot.querySelector('button').removeEventListener('click', this.handleButtonClick)
  }

  async handleButtonClick () {
    try {
      const response = await fetch('https://goweather.herokuapp.com/weather/palma')
      if (!response.ok) throw new Error('Error al obtener los datos')
      const data = await response.json()
      console.log(data)

      const response2 = await fetch('/saveWeatherData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response2.ok) {
        alert('Datos guardados exitosamente')
      } else {
        alert('Error al guardar los datos')
      }
    } catch (error) {
      console.error('Error al obtener o enviar datos:', error)
      alert('Error al obtener o enviar datos')
    }
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        button {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
      <button>Obtener y Guardar Datos</button>
    `
  }
}

customElements.define('boton-component', Boton)
