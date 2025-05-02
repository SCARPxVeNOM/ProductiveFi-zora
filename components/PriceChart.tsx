import { useState, useEffect } from 'react';
import { getZoraHistoricalData } from '../services/coinMarketCap';

interface DataPoint {
  date: string;
  price: number;
}

export default function PriceChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getZoraHistoricalData();
      if (data) {
        const formattedData = Object.entries(data).map(([timestamp, value]: [string, any]) => ({
          date: new Date(parseInt(timestamp) * 1000).toLocaleDateString(),
          price: value.quote.USD.price,
        }));

        const prices = formattedData.map(d => d.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setChartData(formattedData);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getY = (price: number) => {
    const height = 200;
    const padding = 20;
    const availableHeight = height - (2 * padding);
    return height - (((price - minPrice) / (maxPrice - minPrice)) * availableHeight + padding);
  };

  const getX = (index: number) => {
    const width = 800;
    const padding = 40;
    const availableWidth = width - (2 * padding);
    return (index * (availableWidth / (chartData.length - 1))) + padding;
  };

  const getPath = () => {
    if (chartData.length === 0) return '';
    
    return chartData.reduce((path, point, i) => {
      const x = getX(i);
      const y = getY(point.price);
      return path + `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }, '');
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg width="800" height="200" className="w-full">
        {/* Price labels */}
        <text x="10" y="20" className="text-xs fill-gray-500">${maxPrice.toFixed(2)}</text>
        <text x="10" y="180" className="text-xs fill-gray-500">${minPrice.toFixed(2)}</text>
        
        {/* Chart line */}
        <path
          d={getPath()}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
        />

        {/* Data points */}
        {chartData.map((point, i) => (
          <g key={i}>
            <circle
              cx={getX(i)}
              cy={getY(point.price)}
              r="4"
              fill="#4F46E5"
              className="hover:r-6 transition-all"
            >
              <title>${point.price.toFixed(4)} - {point.date}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
} 