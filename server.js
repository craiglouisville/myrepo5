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







const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/quote', async (req, res) => {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=5min&apikey=RLQUZ3LH4BWSZTG4';

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'axios' }
        });

        // Filter the data to include only the timestamp at 16:00:00
        const timeSeries = response.data['Time Series (5min)'];
        const filteredData = {};

        for (const [timestamp, values] of Object.entries(timeSeries)) {
            if (timestamp.endsWith('16:00:00')) {
                filteredData[timestamp] = values;
                break; // Stop after finding the first match
            }
        }

        res.json(filteredData);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});