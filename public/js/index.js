console.log("this is js page")

const p1 = document.getElementById('data')
const p2 = document.getElementById('error')
const Searchbtn = document.getElementById('Searchbtn')
const cityinput = document.getElementById('cityinput')

Searchbtn.addEventListener('submit', (e)=>{
    e.preventDefault()
    const cityname = cityinput.value
    p1.textContent = "Loading..."
    p2.textContent = ""

    fetch('http://localhost:3000/weather?cityname=' + cityname).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            p1.textContent = ""
            p2.textContent = data.error
        }else{
            console.log(data)
            p1.textContent =`the forecast of ${cityname} is ${data.condition}, temperature is ${data.temp}, longitude = ${data.longitude} and latitude = ${data.latitude} `
            p2.textContent = ""
        }
    })
})
})

