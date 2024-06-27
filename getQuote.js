// var request = require('request');

// Replace the "demo" API key with your own key from https://www.alphavantage.co/support/#RLQUZ3LH4BWSZTG4


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


// async function getQuote(symbol){
//     try {
//         var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=RLQUZ3LH4BWSZTG4`;
//         let response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         let data = await response.json();
//         const LastRefreshed = data ["Meta Data"]["3. Last Refreshed"]
//         const criteria = data ["Time Series (5min)"][LastRefreshed]
//         document.getElementById('quote').innerText = JSON.stringify(criteria, null, 2);
//     } catch (error) {
//         console.error('Error fetching quote:', error);
//         document.getElementById('quote').innerText = 'Error fetching quote';
//     }
    
// }

// getQuote ("KO")
// getQuote ("JNJ")

// ---------

async function getQuote(symbol, elementId) {
    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=RLQUZ3LH4BWSZTG4`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        const criteria = data["Time Series (5min)"][lastRefreshed];
        let formattedData = '';
        for (const [key, value] of Object.entries(criteria)) {
            formattedData += `${key}: ${value}\n`;
        }
        document.getElementById(elementId).innerText = formattedData;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById(elementId).innerText = 'Error fetching quote';
    }
}

window.onload = () => {
    getQuote("KO", "quote-ko");
    getQuote("JNJ", "quote-jnj");
    getQuote("JPM", "quote-jpm");
};



// var request = require('request');

// // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=5min&apikey=RLQUZ3LH4BWSZTG4';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });

// getQuote ()