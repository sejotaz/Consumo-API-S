const dataTemp = document.querySelector('.result')
const card = document.querySelector('.get-weather')
const nameCity = document.querySelector('#city')
const nameCountry = document.querySelector('#country')

card.addEventListener('submit', (e) => {
  e.preventDefault()
  if (nameCity.value === '' || nameCountry.value === '') {
    showError('Ambos campos son requeridos')
    return
  }

  callAPI(nameCity.value, nameCountry.value)
})

const callAPI = (city, country) => {
  const apiId = '31ad3e69e5af7b8e0f91b470c5add6aa'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

  fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((dataJSON) => {
      if (dataJSON.cod === '404') {
        showError('Ciudad encontrada')
      } else {
        clearHTML()
        showWeather(dataJSON)
      }
      console.log(dataJSON)
    })
    .catch((error) => {
      console.log(error)
    })
}

const showWeather = (data) => {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = data

  const degrees = kelvinToCentigrade(temp)
  const min = kelvinToCentigrade(temp_min)
  const max = kelvinToCentigrade(temp_max)

  const content = document.createElement('div')
  content.innerHTML = `
    <h5>Clima en ${name}</h5
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon"/>
    <h2> ${degrees}ºC </h2>
    <p>Max: ${max}ºC</p>
    <p>Min${min}ªC</p>
  `
  dataTemp.appendChild(content)
  console.log(arr.icon)
}

const showError = (message) => {
  console.log(message)
  const alert = document.createElement('p')
  alert.classList.add('alert-message')
  alert.innerHTML = message

  card.appendChild(alert)
  setTimeout(() => {
    alert.remove()
  }, 3000)
}

const kelvinToCentigrade = (temp) => {
  return parseInt(temp - 273.15)
}

const clearHTML = () => {
  dataTemp.innerHTML = ''
}
