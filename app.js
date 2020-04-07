let d = new Date();
let month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
let n = month[d.getMonth()];
window.addEventListener('load', () => {
    let long;
    let lat;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude; 
            let apikey = '1aa23825914c640753fca8390ec5d922';
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apikey}`)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                let date = new Date()
                let currdate = `${n} ${date.getDate()}, ${date.getFullYear()}`
                const {  temp } = res.main;
                const { description, icon } = res.weather[0];
                let celsius = Math.floor(((temp - 32) * 5) /9)
                document.querySelector('.feels_like').innerHTML = `feels like ${celsius} <span>&#8451;</span>`;
                document.querySelector('.temp').innerHTML = `
                ${celsius} <span>&#8451;</span>
                `;
                document.querySelector('.timezone').textContent = res.name;
                document.querySelector('.date').textContent = currdate;
                document.querySelector('.temp-description').textContent = description;
                document.querySelector('.icon').innerHTML = `
                <section class="owi-group">
                <i class="owi owi-${icon}"></i>
                <i class="owi owi-${icon}"></i>
                </section>
                `
            })

        })
    }
})
