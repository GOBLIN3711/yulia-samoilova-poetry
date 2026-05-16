'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'yulia202555') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D4C5B5]/50 shadow-sm p-8">
            <h1 className="font-serif text-2xl font-bold text-[#3C2415] text-center mb-6">
              Вход
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className="w-full px-4 py-3 rounded-xl border border-[#D4C5B5] bg-[#FDFAF7] text-[#3C2415] placeholder-[#8B7355]/60 focus:outline-none focus:ring-2 focus:ring-[#C8A45C]/50 focus:border-[#C8A45C] transition-all text-sm"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-[#3C2415] text-white rounded-xl hover:bg-[#4a3322] transition-all duration-300 font-medium text-sm cursor-pointer"
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0EB] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D4C5B5]/50 shadow-sm p-6 md:p-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3C2415] mb-6">
            Панель управления
          </h1>
          <div className="w-16 h-0.5 bg-[#C8A45C] mb-6" />

          <div className="space-y-4">
            <div className="p-4 bg-[#FDFAF7] rounded-xl border border-[#EDE6DD]">
              <p className="text-[#3C2415] font-medium">Всего стихотворений</p>
              <p className="text-3xl font-bold text-[#C8A45C] mt-1">125</p>
            </div>

            <div className="p-4 bg-[#FDFAF7] rounded-xl border border-[#EDE6DD]">
              <p className="text-[#3C2415] font-medium">Категории</p>
              <p className="text-3xl font-bold text-[#C8A45C] mt-1">7</p>
            </div>

            <div className="p-4 bg-[#FDFAF7] rounded-xl border border-[#EDE6DD]">
              <p className="text-[#3C2415] font-medium">Музыкальные треки</p>
              <p className="text-3xl font-bold text-[#C8A45C] mt-1">2</p>
            </div>

            <div className="p-4 bg-[#FDFAF7] rounded-xl border border-[#EDE6DD]">
              <p className="text-[#3C2415] font-medium mb-3">Категории стихов:</p>
              <ul className="space-y-1 text-sm text-[#8B7355]">
                <li>• Размышления — 100</li>
                <li>• Любовная лирика — 2</li>
                <li>• Семья и родные — 3</li>
                <li>• Санкт-Петербург — 3</li>
                <li>• Природа и времена года — 5</li>
                <li>• Духовная поэзия — 6</li>
                <li>• О Родине и мире — 6</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE6DD]">
            <a
              href="/"
              className="text-[#C8A45C] hover:text-[#3C2415] text-sm transition-colors duration-200"
            >
              ← Вернуться на главную
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
