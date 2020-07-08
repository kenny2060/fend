/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "";
const apiUnits = "&units=metric";
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const holderContent = document.getElementById('feelings');

// New date instance dynamically with JS
let d = new Date();
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let newDate = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
+ ' @ ' + d.getHours() + ':' + d.getMinutes();

// Click listener
generateBtn.addEventListener('click', getWxData);

function getWxData() {
  // Call for API Data
  getApiRes()
    .then(data => {
      console.log('Request succeeded with JSON response: ', data)
      postData('/base', {temp: data.main.temp, userContent: holderContent.value, date: newDate})
      .catch(error => {
        console.log('API Request failed', error)
      })
      .then(updateUI())
    });

  // Function get API weather for User Location 
  // (TODO: User options for setting 'apiUnits')
  async function getApiRes() {
    const apiRes = await fetch (baseURL + zipCode.value + apiUnits + apiKey);
    try {
      const data = await apiRes.json();
      return data;
    }catch (error) {
      console.log('Error with GET request: ', error);
    }
  };

  // Post Data
  async function postData(url = '', data = {}) {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // Check header status code
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error('Network response not OK: ', res.statusText);
        }
      })
      .catch((error) => console.error('postData FETCH failed', error)
    );
  };

  // Update the UI with the Users Content
  async function updateUI() {
    const req = await fetch ('/all');
    try {
      const allData = await req.json();
        for (const property in allData) {
          document.getElementById('temp').innerHTML = Math.round(allData[property].temp) + ' °C';
          document.getElementById('date').innerHTML = allData[property].date;
          document.getElementById('content').innerHTML = allData[property].userContent;
        }
    } catch (error) {
      console.log("Error updating UI: ", error);
    }
  };
};
