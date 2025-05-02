const CMC_API_KEY = 'c3c7f080-d991-4176-90c9-bd60024f20a1';
const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

export async function getZoraCoinData() {
  try {
    const response = await fetch(
      `${CMC_BASE_URL}/cryptocurrency/quotes/latest?id=3165`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
          'Accept': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.data['3165'];
  } catch (error) {
    console.error('Error fetching Zora coin data:', error);
    return null;
  }
}

export async function getZoraHistoricalData() {
  try {
    const response = await fetch(
      `${CMC_BASE_URL}/cryptocurrency/quotes/historical?id=3165&interval=1d&count=30`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
          'Accept': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Zora historical data:', error);
    return null;
  }
} 