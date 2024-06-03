
const searched = document.getElementById('search-bar');
const button = document.getElementById('button');

// APIS 
const baseUrl = "http://worldtimeapi.org/api/timezone";
const container = document.getElementById('container');
const getTime =  () => {
let value = searched.value;
const timeZone = fetch(`${baseUrl}/${value}`)
.then(async (response) =>{
const result = await response.json()

const cityDate = document.getElementById('userValue-time');
const cityTime = document.getElementById('userValue-date');
const time = new Date(result.datetime);
const realTime = time.toLocaleTimeString("en-US",{timeZone: `${value}`});
console.log({realTime});
cityTime.innerHTML = `In ${value}, it's ${realTime}`
cityDate.innerHTML = `${time.toDateString()} (${result.abbreviation})`

})
.catch(error =>{
    throw new Error(error.message);
});
console.log({timeZone});
};
button.addEventListener('click',getTime);
