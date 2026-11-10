import { useState } from 'react';

const categories = [
  { id: 'clothes', label: 'Одежда', icon: '👕', priceFrom: 350, priceTo: 550 },
  { id: 'electronics', label: 'Электроника', icon: '📱', priceFrom: 400, priceTo: 650 },
  { id: 'equipment', label: 'Оборудование', icon: '⚙️', priceFrom: 280, priceTo: 480 },
  { id: 'raw', label: 'Сырьё', icon: '🧱', priceFrom: 200, priceTo: 380 },
  { id: 'other', label: 'Другое', icon: '📦', priceFrom: 320, priceTo: 500 },
];

const volumes = [
  { id: 'small', label: 'до 50 кг', multiplier: 1.3 },
  { id: 'medium', label: 'до 500 кг', multiplier: 1.0 },
  { id: 'large', label: 'до 1 тонны', multiplier: 0.85 },
  { id: 'container', label: 'от 1 тонны', multiplier: 0.7 },
];

const deliveryTypes = [
  { id: 'cargo', label: 'Карго', desc: 'Быстро, без растаможки', commission: 5 },
  { id: 'white', label: 'Белая доставка', desc: 'С ГТД и растаможкой', commission: 7 },
];

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', volume: '' });

  const category = categories.find(c => c.id === selectedCategory);
  const volume = volumes.find(v => v.id === selectedVolume);
  const delivery = deliveryTypes.find(d => d.id === selectedDelivery);

  const calcPriceFrom = category && volume && delivery
    ? Math.round(category.priceFrom * volume.multiplier)
    : 0;
  const calcPriceTo = category && volume && delivery
    ? Math.round(category.priceTo * volume.multiplier)
    : 0;
  const commission = delivery ? delivery.commission : 0;

  const handleNext = () => {
    if (step === 1 && selectedCategory) setStep(2);
    else if (step === 2 && selectedVolume) setStep(3);
    else if (step === 3 && selectedDelivery) {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedVolume(null);
    setSelectedDelivery(null);
    setShowResult(false);
    setShowForm(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step >= s ? 'bg-orange-500 text-white scale-110' : 'bg-gray-700 text-gray-400'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 rounded transition-all duration-500 ${
                step > s ? 'bg-orange-500' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Что везём из Китая?
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'border-orange-500 bg-orange-500/10 scale-105'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-gray-300">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Volume */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Примерный объём груза?
          </h3>
          <div className="space-y-3">
            {volumes.map(vol => (
              <button
                key={vol.id}
                onClick={() => setSelectedVolume(vol.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center justify-between ${
                  selectedVolume === vol.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                }`}
              >
                <span className="text-white font-medium">{vol.label}</span>
                {selectedVolume === vol.id && (
                  <span className="text-orange-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Delivery type */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Тип доставки?
          </h3>
          <div className="space-y-3">
            {deliveryTypes.map(del => (
              <button
                key={del.id}
                onClick={() => setSelectedDelivery(del.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedDelivery === del.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">{del.label}</span>
                    <span className="text-gray-400 text-sm">{del.desc}</span>
                  </div>
                  {selectedDelivery === del.id && (
                    <span className="text-orange-500 text-xl">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {showResult && !showForm && (
        <div className="animate-slide-up">
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-600/30 rounded-2xl p-5">
            <div className="text-center mb-4">
              <span className="text-3xl">✅</span>
              <h3 className="text-lg font-bold text-white mt-2">Ориентировочный расчёт</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Логистика:</span>
                <span className="text-white font-bold">{calcPriceFrom} — {calcPriceTo} ₽/кг</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Комиссия байера:</span>
                <span className="text-white font-bold">{commission}%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Срок доставки:</span>
                <span className="text-white font-bold">
                  {selectedDelivery === 'cargo' ? '16-22 дня' : '30-40 дней'}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              * Точная стоимость зависит от конкретного товара, упаковки и маршрута
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all animate-pulse-slow shadow-lg shadow-orange-500/25"
          >
            📩 Получить точную смету + чек-лист
          </button>
          <button
            onClick={handleReset}
            className="w-full mt-2 text-gray-400 text-sm hover:text-white transition-colors"
          >
            Рассчитать заново
          </button>
        </div>
      )}

      {/* Lead form */}
      {showForm && (
        <div className="animate-slide-up">
          <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-white mb-1 text-center">Куда отправить смету?</h3>
            <p className="text-gray-400 text-sm text-center mb-4">
              Менеджер свяжется в течение 15 минут
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон или @Telegram"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <select
                value={formData.volume}
                onChange={e => setFormData({...formData, volume: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="">Объём партии</option>
                <option value="small">Мелкий опт (до 100 кг)</option>
                <option value="medium">Крупный опт (100 кг — 1 т)</option>
                <option value="container">Контейнер (от 1 тонны)</option>
              </select>
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25">
                🚀 Получить точную смету
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              🔒 Данные защищены. Мы не передаём их третьим лицам.
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {!showResult && !showForm && (
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
            >
              ← Назад
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedCategory) ||
              (step === 2 && !selectedVolume) ||
              (step === 3 && !selectedDelivery)
            }
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              ((step === 1 && selectedCategory) ||
               (step === 2 && selectedVolume) ||
               (step === 3 && selectedDelivery))
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Рассчитать →' : 'Далее →'}
          </button>
        </div>
      )}
    </div>
  );
}
