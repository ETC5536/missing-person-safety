import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiTrendingUp, FiNavigation } from 'react-icons/fi';

const UtilitiesComponent = () => {
  const [activeTab, setActiveTab] = useState('food');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (tab === 'food') {
        response = await axios.get(`${API_URL}/api/utilities/food-water`, {
          params: { latitude: 35.6762, longitude: 139.6503, radius: 1000 }
        });
      } else if (tab === 'transport') {
        response = await axios.get(`${API_URL}/api/utilities/transportation`, {
          params: {
            startLat: 35.6762,
            startLon: 139.6503,
            endLat: 35.7000,
            endLon: 139.7000
          }
        });
      } else if (tab === 'weather') {
        response = await axios.get(`${API_URL}/api/utilities/weather-alert`, {
          params: { latitude: 35.6762, longitude: 139.6503 }
        });
      }
      setData(response.data || []);
      setLoading(false);
    } catch (err) {
      setError('データの取得に失敗しました。');
      console.error('エラー:', err);
      setLoading(false);
    }
  };

  const tabContent = {
    food: {
      title: '食事・水',
      icon: <FiShoppingCart />,
      description: '近くの食事や水が入手できる場所'
    },
    transport: {
      title: '交通手段',
      icon: <FiNavigation />,
      description: '移動手段と経路案内'
    },
    weather: {
      title: '防災情報',
      icon: <FiTrendingUp />,
      description: '天気とアラート情報'
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {tabContent[activeTab].icon} {tabContent[activeTab].title}
        </h1>
        <p className="text-sm mt-1">{tabContent[activeTab].description}</p>
      </div>

      <div className="flex bg-white border-b">
        {Object.entries(tabContent).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 font-bold flex items-center justify-center gap-1 ${
              activeTab === key
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {value.icon} <span className="hidden sm:inline">{value.title}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 mt-8">
            <p>読み込み中...</p>
          </div>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item, idx) => (
            <div key={item.id || idx} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-sm mb-1">{item.name || item.title}</h3>
              <p className="text-xs text-gray-600">
                {item.type || item.category}
              </p>
              {item.distance && (
                <p className="text-xs mt-1 text-blue-600">
                  距離: 約 {item.distance} km
                </p>
              )}
              {item.duration && (
                <p className="text-xs mt-1">所要時間: {item.duration}</p>
              )}
              {item.cost && (
                <p className="text-xs mt-1">料金: ¥{item.cost}</p>
              )}
              {item.phone && (
                <p className="text-xs mt-1">電話: {item.phone}</p>
              )}
              {item.hours && (
                <p className="text-xs mt-1">営業時間: {item.hours}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>データがありません</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilitiesComponent;
