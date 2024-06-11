// var request = require('request');

// Replace the "demo" API key with your own key from https://www.alphavantage.co/support/#RLQUZ3LH4BWSZTG4
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=5min&apikey=RLQUZ3LH4BWSZTG4';

// request.get({
//     url: url,
//     json: true,
//     headers: { 'User-Agent': 'request' }
// }, (err, res, data) => {
//     if (err) {
//         console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//         console.log('Status:', res.statusCode);
//     } else {
//         // data is successfully parsed as a JSON object:
//         console.log(data);
//     }
// });


async function getQuote(){
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        document.getElementById('quote').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = 'Error fetching quote';
    }
    
}

getQuote ()