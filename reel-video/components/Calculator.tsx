import React, { useState, useCallback } from 'react';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { PercentIcon } from './icons/PercentIcon';
import { CurrencyExchangeIcon } from './icons/CurrencyExchangeIcon';

interface InputGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  step?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ id, label, value, onChange, placeholder, icon, type = 'text', step }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-4 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 transition-all duration-200"
        onFocus={(e) => e.target.select()}
      />
    </div>
  </div>
);

const Calculator: React.FC = () => {
  const [reelValue, setReelValue] = useState<string>('100');
  const [years, setYears] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('10');
  const [exchangeRate, setExchangeRate] = useState<string>('27000');
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatCurrencyUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }

  const handleCalculate = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFutureValue(null);

    const P = parseFloat(reelValue);
    const t = parseFloat(years);
    const annualRate = parseFloat(interestRate);
    const rate = parseFloat(exchangeRate);

    if (isNaN(P) || P <= 0 || isNaN(t) || t <= 0 || isNaN(annualRate) || annualRate < 0 || isNaN(rate) || rate <= 0) {
      setError('Vui lòng nhập các giá trị hợp lệ (số dương).');
      setIsLoading(false);
      return;
    }

    const r = annualRate / 100;
    const n = 365;
    const dailyRate = r / n;
    const totalPeriods = n * t;

    const calculatedFv = P * ( (Math.pow(1 + dailyRate, totalPeriods) - 1) / dailyRate );

    setTimeout(() => {
        setFutureValue(calculatedFv);
        setIsLoading(false);
    }, 500);

  }, [reelValue, years, interestRate, exchangeRate]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10">
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputGroup
            id="reelValue"
            label="Giá trị mỗi Reel Video ($)"
            value={reelValue}
            onChange={(e) => setReelValue(e.target.value)}
            placeholder="100"
            icon={<DollarSignIcon />}
            type="number"
            step="any"
          />
          <InputGroup
            id="exchangeRate"
            label="Tỷ giá USD/VND"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            placeholder="27000"
            icon={<CurrencyExchangeIcon />}
            type="number"
            step="any"
          />
          <InputGroup
            id="years"
            label="Số năm"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="30"
            icon={<CalendarIcon />}
            type="number"
            step="any"
          />
          <InputGroup
            id="interestRate"
            label="Lãi suất hàng năm (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="10"
            icon={<PercentIcon />}
            type="number"
            step="any"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          {isLoading ? 'Đang tính toán...' : 'Tính Toán Chi Phí Trì Hoãn'}
        </button>
      </form>

      {(isLoading || futureValue !== null) && (
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
            {isLoading && (
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="h-16 bg-gray-600 rounded w-1/2 mx-auto"></div>
                </div>
            )}
            {futureValue !== null && !isLoading && (
                <div className="animate-fade-in">
                    <p className="text-gray-400 text-lg mb-2">
                        Nếu bạn không tạo một reel video mỗi ngày, sau <strong>{years}</strong> năm, bạn có thể đã mất đi:
                    </p>
                    <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 py-2">
                        {formatCurrencyUSD(futureValue)}
                    </p>
                    <p className="text-xl text-gray-300 mt-2">
                      (Tương đương khoảng <span className="font-semibold">{formatCurrencyVND(futureValue * parseFloat(exchangeRate))}</span>)
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Đây là sức mạnh của lãi kép và sự nhất quán hàng ngày.
                    </p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Calculator;
