import axios from 'axios';

export const fetchStockData = async (symbol) => {
  try {
    console.log('Fetching data for symbol:', symbol);
    const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.data;
    console.log('Response received:', data);
    
    // Validate the response structure
    if (!data || !data['Time Series (Daily)']) {
      throw new Error('Invalid stock data format. Expected "Time Series (Daily)" property.');
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};


export const parseStockData = (data) => {
  if (!data || !data['Time Series (Daily)']) {
    console.error('Invalid data:', data);
    throw new Error('Invalid stock data format. Expected "Time Series (Daily)" property.');
  }

  const timeSeries = data['Time Series (Daily)'];

  if (typeof timeSeries !== 'object') {
    throw new Error('Invalid "Time Series (Daily)" format.');
  }

  const formattedData = Object.keys(timeSeries).map(date => {
    const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '5. volume': volume } = timeSeries[date];
    if (open == null || high == null || low == null || close == null || volume == null) {
      throw new Error(`Missing data for date ${date}`);
    }
    return {
      date,
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      volume: parseInt(volume, 10)
    };
  });

  formattedData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return formattedData;
};



  