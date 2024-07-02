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

// MASTER this one is the one that works (below) - all others are tests. MASTER

// async function getQuote(symbol, elementId) {
//     try {
//         const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=RLQUZ3LH4BWSZTG4`;
//         let response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         let data = await response.json();
//         const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
//         const criteria = data["Time Series (5min)"][lastRefreshed];
//         let formattedData = '';
//         for (const [key, value] of Object.entries(criteria)) {
//             formattedData += `${key}: ${value}\n`;
//         }
//         document.getElementById(elementId).innerText = formattedData;
//     } catch (error) {
//         console.error('Error fetching quote:', error);
//         document.getElementById(elementId).innerText = 'Error fetching quote';
//     }
// }

// window.onload = () => {
//     getQuote("KO", "quote-ko");
//     getQuote("JNJ", "quote-jnj");
//     getQuote("JPM", "quote-jpm");
// };

// MASTER this one is the one that works (above) - all others are tests. MASTER

// ============================================================================================

// MASTER1 (below) to get box with quotes in order from closing price 

async function fetchStockPrice(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=RLQUZ3LH4BWSZTG4`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        const closePrice = data["Time Series (5min)"][lastRefreshed]["4. close"];
        return parseFloat(closePrice);
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}

async function displayStockPrices() {
    const stocks = ["KO", "JNJ", "JPM"];
    const prices = await Promise.all(stocks.map(fetchStockPrice));

    const stockPrices = stocks.map((stock, index) => ({ stock, price: prices[index] }));
    stockPrices.sort((a, b) => b.price - a.price);

    const priceBox = document.getElementById('stock-prices');
    priceBox.innerHTML = stockPrices.map(sp => `${sp.stock}: $${sp.price.toFixed(2)}`).join('<br>');
}

window.onload = () => {
    displayStockPrices();
    getQuote("KO", "quote-ko");
    getQuote("JNJ", "quote-jnj");
    getQuote("JPM", "quote-jpm");
};

async function getQuote(symbol, elementId) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=RLQUZ3LH4BWSZTG4`;
    try {
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

// MASTER1 (above) to get box with quotes in order from closing price 

// ==========================================================================================================================================

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