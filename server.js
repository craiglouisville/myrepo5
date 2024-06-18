// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/quote', async (req, res) => {
//     const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=5min&apikey=RLQUZ3LH4BWSZTG4';

//     try {
//         const response = await axios.get(url, {
//             headers: { 'User-Agent': 'axios' }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).send('Error fetching data');
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const axios = require('axios');
// const moment = require('moment');

async function getCloseAt4PM(apiKey, symbol) {
    const url = 'https://www.alphavantage.co/query';
    const params = {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        outputsize: 'full',
        apikey: apiKey
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;
        // const timeSeriesKey = 'Time Series (5min)';

        const LastRefreshed = data ["Meta Data"]["3. Last Refreshed"]
        const criteria = data ["Time Series (5min)"][LastRefreshed]

        // if (!data[timeSeriesKey]) {
        //     throw new Error('Unexpected response format or symbol not found.');
        // }

        // const timeSeries = data[timeSeriesKey];
        // const closeAt4PM = {}

        // for (let timestamp in timeSeries) {
        //     const time = moment(timestamp).format('HH:mm:ss');
        //     if (time === '16:00:00') {
        //         closeAt4PM[timestamp] = timeSeries[timestamp]['4. close'];
        //     }
        // }

        return criteria; 

    } catch (error) {
        console.error('Error fetching data from Alpha Vantage:', error);
        return null;
    }
}

// Replace 'YOUR_API_KEY' and 'YOUR_SYMBOL' with your actual API key and the desired stock symbol
const apiKey = 'RLQUZ3LH4BWSZTG4';
const symbol = 'KO';

getCloseAt4PM(RLQUZ3LH4BWSZTG4, ko).then(closePricesAt4PM => {
    console.log(closePricesAt4PM);
});

// {
//     "Meta Data": {
//       "1. Information": "Intraday (5min) open, high, low, close prices and volume",
//       "2. Symbol": "KO",
//       "3. Last Refreshed": "2024-06-14 19:55:00",
//       "4. Interval": "5min",
//       "5. Output Size": "Compact",
//       "6. Time Zone": "US/Eastern"
//     },
//     "Time Series (5min)": {
//       "2024-06-14 19:55:00": {
//         "1. open": "62.4750",
//         "2. high": "62.5100",
//         "3. low": "62.4400",
//         "4. close": "62.5100",
//         "5. volume": "5"
//       },