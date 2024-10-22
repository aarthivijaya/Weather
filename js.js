const CityInput=document.querySelector('.city-name');
const Searchbtn=document.querySelector('.button-search');
const apikey = '20bec07810bd71d9a738d23413380fa1';

const WeatherInfo = document.querySelector('.weather-info');
const SearchMessage = document.querySelector('.Search-message');
const NotFound = document.querySelector('.not-found-message');

const CityName = document.querySelector('.location-City');
const Celsius = document.querySelector('.celsius');
const Feel = document.querySelector('.feel');
const HumidityValue = document.querySelector('.Humidity-value');
const WindValue = document.querySelector('.Wind-value');
const WeatherImage = document.querySelector('.weather-image');
const CurrentDate = document.querySelector('.date-container');

const loader = document.getElementById('loader');



Searchbtn.addEventListener('click',()=> {
    
    if(CityInput.value.trim() != ''){

        updateWeatherInfo(CityInput.value);
        CityInput.value='';
        CityInput.blur();
    }
});

CityInput,addEventListener('keydown',(event) =>{
    if(event.key == 'Enter' && CityInput.value.trim() != ''){
        updateWeatherInfo(CityInput.value);
        CityInput.value='';
    }
})

async function getFetchData(endpoint,city){
    loader.style.display = 'block';
    [WeatherInfo,SearchMessage,NotFound]
    .forEach(section => section.style.display = 'none')

    try{
    const apiUrl =`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiUrl)
    loader.style.display = 'none';
    return response.json();
    }

    catch (error) {
        // Hide the loader and show error message
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    }
    
}

function getWeatherIcon(id){
    if (id <= 232){
        return 'thunderstorm.svg'
    }
    if (id <= 321){
        return 'drizzle.svg'
    }
    if (id <= 531){
        return 'rain.svg'
    }
    if (id <= 622){
        return 'snow.svg'
    }
    if (id <= 781){
        return 'atmosphere.svg'
    }
    if (id <= 800){
        return 'clear.svg'
    }
    else{
        return 'clouds.svg'
    }
        
}

function getCurrentDate(){
    const CurrentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return CurrentDate.toLocaleDateString('en-GB',options);
}


async function updateWeatherInfo(city){

    const WeatherData = await getFetchData('weather',city);
    if(WeatherData.cod != 200){
        showDisplaySection(NotFound);
        return
    }
     console.log(WeatherData);

     const{
        name:country,
        main:{temp,humidity},
        weather:[{id,main}],
        wind:{speed}
     } =  WeatherData;

     CityName.textContent = country;
     Celsius.textContent = Math.round(temp) + ' °C'
     Feel.textContent = main;
     HumidityValue.textContent = humidity + ' %'
     WindValue.textContent = speed + ' M/s'
     WeatherImage.src = `images/weather/${getWeatherIcon(id)}`
     CurrentDate.textContent= getCurrentDate();

     
    showDisplaySection(WeatherInfo);
      
}

function showDisplaySection(section){
    [WeatherInfo,SearchMessage,NotFound]
    .forEach(section => section.style.display = 'none')
    section.style.display='flex';
}


/* Light and Dark Mode*/

const Light=document.getElementById("light");
const Dark=document.getElementById("dark");
const Body=document.querySelector(".body");
const InputLight=document.querySelector(".city-name");

Dark.addEventListener('click',function(event){
    if(Dark.style.display != "none"){
        Dark.style.display="none";
        Light.style.display="block";
        Body.style.color="black";
        InputLight.style.color="black";
    }
})

Light.addEventListener('click',function(event){
    if(Light.style.display != "none"){
        Light.style.display="none";
        Dark.style.display="block"; 
        Body.style.color="white";  
        InputLight.style.color="white";
    }
})
