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
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});