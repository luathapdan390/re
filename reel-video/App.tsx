import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-2">
            Máy Tính Chi Phí Trì Hoãn
          </h1>
          <p className="text-lg text-gray-400">
            Đừng bỏ lỡ tiềm năng của bạn. Hãy xem bạn có thể mất bao nhiêu tiền nếu không hành động ngay hôm nay.
          </p>
        </header>
        <main>
          <Calculator />
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Công cụ này tính toán giá trị tương lai của một chuỗi các khoản đầu tư hàng ngày (niên kim).
          </p>
          <p>&copy; {new Date().getFullYear()} Được tạo ra để truyền cảm hứng hành động.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
