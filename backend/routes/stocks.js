const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { symbols } = req.query;
  const apiKey = 'cquc2rpr01qvea0asd6gcquc2rpr01qvea0asd70'; // Replace with your actual API key
  
  if (!symbols) {
    return res.status(400).json({ error: 'No symbols provided' });
  }

  const symbolArray = symbols.split(',');
  
  // Ensure correct API endpoint and parameters
  const requests = symbolArray.map(symbol =>
    axios.get('https://finnhub.io/api/v1/quote', {
      params: {
        symbol: symbol,
        token: apiKey
      }
    })
  );

  try {
    const responses = await Promise.all(requests);
    const data = responses.map((response, index) => ({
      symbol: symbolArray[index],
      currentPrice: response.data.c,
      high: response.data.h,
      low: response.data.l,
      open: response.data.o,
      previousClose: response.data.pc
    }));
    res.json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
