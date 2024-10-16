const searched = document.getElementById('search-bar');
const button = document.getElementById('button');

const baseUrl = "https://worldtimeapi.org/api/timezone";
const container = document.getElementById('container');

const getTime = () => {
    let value = searched.value.trim(); 
    const city = document.getElementById('time-date');
    city.innerHTML = '';  

    fetch(`${baseUrl}/${value}`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('City not found. Please make sure you input Continent/City');
            }
            const result = await response.json();
            const time = new Date(result.datetime);
            console.log(time.toString());

            const cityT = document.createElement('p');
            cityT.setAttribute('id', 'userValue-time');
            cityT.setAttribute('class', 'search');
            city.appendChild(cityT);

            if (time.toString() !== 'Invalid Date') {
                const realTime = time.toLocaleTimeString("en-US", { timeZone: `${value}` });
                console.log({ realTime });

                const cityD = document.createElement('p');
                cityD.setAttribute('id', 'userValue-date');
                cityD.setAttribute('class', 'search');
                city.appendChild(cityD);

                cityT.innerHTML = `In ${value}, it's ${realTime}`;
                cityD.innerHTML = `${time.toDateString()} (${result.abbreviation})`;
            } else {
                cityT.innerHTML = `Not Found. Make sure you Input Continent/City`;
            }
        })
        .catch((error) => {
            alert(error.message);
        });
};

button.addEventListener('click', getTime);

document.getElementById('search-bar').addEventListener('input', () => {
    if (searched.value.trim() === "") {
        const city = document.getElementById('time-date');
        city.innerHTML = ''; 
    }
});
