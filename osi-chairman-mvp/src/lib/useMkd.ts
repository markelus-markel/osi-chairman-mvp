import { useState, useEffect } from 'react';

// Типизация для твоего МКД в Семее
export interface MkdConfig {
  management_type: 'OSI' | 'KSK' | 'PT' | '';
  name: string;
  city: string;
  address: string;
  total_flats: number;
  status: 'PENDING_SETUP' | 'ACTIVE';
}

export function useMkd() {
  const [config, setConfig] = useState<MkdConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      // Прямой запрос к API, который читает твой house.md
      const response = await fetch('/api/config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Ошибка загрузки паспорта МКД:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Проверка: настроен ли дом (стерильное состояние или нет)
  const isSetup = !!config?.management_type && config.status === 'ACTIVE';

  return { config, isSetup, isLoading, refresh: fetchConfig };
}