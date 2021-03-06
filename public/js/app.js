//console.log('Client side Javascript file is properly loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchLocation = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                searchElement.value = ''
                
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})
