import { useState, useEffect } from 'react';
import Calculator from './components/Calculator';

// ============ STICKY BOTTOM BAR ============
function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-3 flex items-center justify-between gap-3 md:hidden">
      <a href="#calculator" className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl text-center text-sm shadow-lg shadow-orange-500/25">
        📊 Рассчитать стоимость
      </a>
      <div className="flex gap-2">
        <a href="https://t.me/" className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
        </a>
        <a href="https://wa.me/" className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
}

// ============ EXIT INTENT POPUP ============
function ExitPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
        <div className="text-center">
          <span className="text-5xl mb-4 block">🎁</span>
          <h3 className="text-xl font-bold text-white mb-2">Подождите!</h3>
          <p className="text-gray-300 mb-4">
            Заберите <span className="text-orange-400 font-semibold">бесплатную таблицу</span> «Сравнение Карго и Белой доставки» + <span className="text-orange-400 font-semibold">скидку 10%</span> на первую логистику
          </p>
          <input
            type="text"
            placeholder="Ваш Telegram или телефон"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none mb-3"
          />
          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25">
            Получить подарок 🎁
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [onlineStatus, setOnlineStatus] = useState(true);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitShown) {
        setShowExitPopup(true);
        setExitShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitShown]);

  // Simulate online status
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineStatus(prev => Math.random() > 0.1 ? true : prev);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const faqItems = [
    {
      q: 'Как я могу быть уверен, что вы не мошенники?',
      a: 'Мы работаем как юридическое лицо в РФ (ООО). Все отношения закрепляются договором с полной финансовой ответственностью. Вы можете приехать к нам в офис в Москве или связаться с нами по видеосвязи. За 5 лет работы — 0 случаев мошенничества, все отзывы реальные.'
    },
    {
      q: 'Какая комиссия за выкуп?',
      a: 'Комиссия составляет от 5% до 7% в зависимости от объёма и типа доставки. Никаких скрытых наценок — вы видите стоимость товара на 1688/Taobao и нашу фиксированную комиссию. Курс юаня фиксируется на момент оплаты.'
    },
    {
      q: 'Что если товар окажется бракованным?',
      a: 'Наш сотрудник на складе в Китае физически вскрывает каждую коробку, проверяет товар и делает фото/видео отчёт ДО отправки в РФ. Если обнаружен брак — мы бесплатно организуем замену или возврат денег от фабрики. Это входит в стоимость.'
    },
    {
      q: 'Нужно ли мне самому платить за валюту?',
      a: 'Нет! Вы платите в рублях по безналичному расчёту на расчётный счёт в РФ. Мы сами конвертируем и переводим юани фабрике. Вам не нужно открывать валютные счета или разбираться с SWIFT.'
    },
    {
      q: 'Как отследить мой груз?',
      a: 'Вы получаете доступ в личный кабинет или Telegram-бот, где видите статус груза на каждом этапе: приёмка на складе → отправка → граница → таможня → доставка. Обновления в реальном времени.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Exit Popup */}
      {showExitPopup && <ExitPopup onClose={() => setShowExitPopup(false)} />}

      {/* ============ HEADER ============ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center font-bold text-sm">
              CB
            </div>
            <span className="font-bold text-lg hidden sm:block">ChinaBuy<span className="text-orange-500">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#how" className="hover:text-white transition-colors">Как работаем</a>
            <a href="#guarantees" className="hover:text-white transition-colors">Гарантии</a>
            <a href="#cases" className="hover:text-white transition-colors">Кейсы</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-gray-400">Байер онлайн</span>
            </div>
            <a href="tel:+74951234567" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
              +7 (495) 123-45-67
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO + CALCULATOR ============ */}
      <section id="calculator" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-gray-950 to-gray-950" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-400 text-sm font-medium">Бесплатный расчёт за 3 минуты</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                Закупка и доставка товаров из Китая{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  «Под ключ»
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-3 font-medium">
                От 14 дней. От <span className="text-white font-bold">200 ₽/кг</span>
              </p>
              <p className="text-gray-400 mb-6 text-base sm:text-lg">
                Выкуп с 1688, Taobao, Pinduoduo и прямых фабрик. Бесплатная проверка на брак. Оплата в рублях на счёт в РФ.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '📄', text: 'Договор РФ' },
                  { icon: '🛡️', text: 'Страховка груза' },
                  { icon: '💰', text: 'Оплата в рублях' },
                  { icon: '🏭', text: 'Склад в Гуанчжоу' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2">
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm text-gray-300">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-2xl font-bold text-orange-400">1200+</span>
                  <p className="text-gray-500">довольных клиентов</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-400">5 лет</span>
                  <p className="text-gray-500">на рынке</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-400">0%</span>
                  <p className="text-gray-500">потерь груза</p>
                </div>
              </div>
            </div>

            {/* Right: Calculator */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl shadow-black/50">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-white">🧮 Калькулятор стоимости</h2>
                <p className="text-gray-400 text-sm">Узнайте ориентировочную стоимость за 3 шага</p>
              </div>
              <Calculator />
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section id="how" className="py-16 md:py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Как мы работаем</h2>
            <p className="text-gray-400 text-lg">4 простых шага — от ссылки до двери</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: '🔗',
                title: 'Вы присылаете ссылку',
                desc: 'Или фото/описание товара. Мы находим лучшего производителя с лучшей ценой.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                icon: '🔍',
                title: 'Проверяем фабрику и товар',
                desc: 'Наш сотрудник на складе в Китае вскрывает коробки, проверяет брак, делает фото/видео отчёт.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                icon: '💳',
                title: 'Вы платите в рублях',
                desc: 'На расчётный счёт в РФ. Без валютных переводов, без SWIFT, без головной боли.',
                color: 'from-green-500 to-emerald-500',
              },
              {
                step: '04',
                icon: '🚚',
                title: 'Доставляем до двери',
                desc: 'Или прямо на склад маркетплейса (WB/Ozon). С упаковкой и маркировкой.',
                color: 'from-orange-500 to-amber-500',
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 h-full hover:border-gray-600 transition-all hover:-translate-y-1 duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Шаг {item.step}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-600 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#calculator" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25">
              📎 Прислать ссылку на товар для бесплатной оценки
            </a>
          </div>
        </div>
      </section>

      {/* ============ GUARANTEES ============ */}
      <section id="guarantees" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-green-400 text-sm font-medium">🛡️ 100% безопасность сделки</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Ваши деньги под защитой</h2>
            <p className="text-gray-400 text-lg">Мы берём на себя все риски — вы получаете товар</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📄',
                title: 'Договор РФ',
                desc: 'Работаем по договору с ООО в России. Полная юридическая защита ваших интересов. Можно приехать в офис.',
                highlight: 'Юр. защита',
              },
              {
                icon: '🏭',
                title: 'Свой склад в Китае',
                desc: 'Наш сотрудник физически вскрывает коробки, проверяет брак и делает фотоотчёт до отправки в РФ.',
                highlight: 'Бесплатная инспекция',
              },
              {
                icon: '📈',
                title: 'Фиксация курса юаня',
                desc: 'Курс фиксируется на момент оплаты. Никаких сюрпризов из-за скачков валюты на этапе производства.',
                highlight: 'Защита от скачков',
              },
              {
                icon: '💰',
                title: 'Финансовая ответственность',
                desc: 'Если мы теряем груз — возвращаем 100% стоимости. Это прописано в договоре. За 5 лет — 0 случаев.',
                highlight: '100% возврат',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 hover:border-green-600/30 transition-all duration-300 group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <span className="inline-block bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-1 rounded mb-3">
                  {item.highlight}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="mt-10 bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                'ООО зарегистрировано в РФ',
                'Расчётный счёт в Сбербанке',
                'Страхование груза до 10 млн ₽',
                'Собственный склад 2000 м² в Гуанчжоу',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-500">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SHIPPING ============ */}
      <section className="py-16 md:py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Сроки и маршруты доставки</h2>
            <p className="text-gray-400 text-lg">Выберите оптимальный вариант под ваш объём и бюджет</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: '✈️ Авиа',
                time: '7-10 дней',
                price: 'от 650 ₽/кг',
                desc: 'Для образцов, срочных товаров и электроники. Быстрее всех, но дороже.',
                tag: 'Срочно',
                tagColor: 'bg-red-500/10 text-red-400',
                popular: false,
              },
              {
                type: '🚗 Авто (Карго)',
                time: '16-22 дня',
                price: 'от 350 ₽/кг',
                desc: 'Оптимально по цене/скорости. Самый популярный вариант для селлеров WB/Ozon.',
                tag: 'Популярный',
                tagColor: 'bg-orange-500/10 text-orange-400',
                popular: true,
              },
              {
                type: '🚂 Ж/Д + Белая',
                time: '30-40 дней',
                price: 'от 200 ₽/кг',
                desc: 'Для крупных партий, оборудования. Полный пакет документов (ГТД), сертификация.',
                tag: 'Эконом',
                tagColor: 'bg-green-500/10 text-green-400',
                popular: false,
              },
            ].map((item, i) => (
              <div key={i} className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                item.popular
                  ? 'bg-gradient-to-b from-orange-500/10 to-gray-900/50 border-orange-500/30 shadow-lg shadow-orange-500/10'
                  : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'
              }`}>
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Выбор 80% клиентов
                  </div>
                )}
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${item.tagColor} mb-3`}>
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{item.type}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-orange-400">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Срок:</span>
                  <span className="text-white font-semibold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <span className="text-blue-400">📍</span>
              Отслеживание груза в Telegram-боте на каждом этапе
            </p>
          </div>
        </div>
      </section>

      {/* ============ CASES ============ */}
      <section id="cases" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Реальные кейсы наших клиентов</h2>
            <p className="text-gray-400 text-lg">Конкретные цифры и результаты</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Электроника для Wildberries',
                client: 'Селлер WB, Москва',
                result: 'Сэкономили 30% на закупке',
                desc: 'Нашли прямую фабрику в Шэньчжэне вместо посредника на 1688. Партия 500 единиц TWS-наушников. Доставка карго за 18 дней.',
                stats: [
                  { label: 'Экономия', value: '30%' },
                  { label: 'Срок', value: '18 дней' },
                  { label: 'Объём', value: '500 шт' },
                ],
                emoji: '🎧',
              },
              {
                title: 'Станок ЧПУ для производства',
                client: 'Производство, Новосибирск',
                result: 'Доставили за 28 дней + сертификация',
                desc: 'Подобрали станок по ТЗ клиента, помогли с сертификацией, организовали белую доставку с полным пакетом ГТД.',
                stats: [
                  { label: 'Срок', value: '28 дней' },
                  { label: 'Вес', value: '2.5 тонны' },
                  { label: 'Документы', value: 'ГТД' },
                ],
                emoji: '⚙️',
              },
              {
                title: 'Одежда для Ozon',
                client: 'Бренд одежды, СПб',
                result: 'Упаковка + маркировка Честный ЗНАК',
                desc: 'Закупка 2000 единиц одежды с фабрики в Гуанчжоу. Полная подготовка: упаковка по стандартам Ozon, маркировка Честный ЗНАК, доставка на склад.',
                stats: [
                  { label: 'Единиц', value: '2000' },
                  { label: 'Брак', value: '0.2%' },
                  { label: 'Подготовка', value: 'включена' },
                ],
                emoji: '👗',
              },
              {
                title: 'Сырьё для косметики',
                client: 'Косметическая компания, Казань',
                result: 'Снизили себестоимость на 45%',
                desc: 'Нашли сертифицированного производителя сырья. Организовали регулярные поставки каждые 2 недели с фиксацией курса.',
                stats: [
                  { label: 'Экономия', value: '45%' },
                  { label: 'Частота', value: '2 нед' },
                  { label: 'Курс', value: 'зафиксирован' },
                ],
                emoji: '🧴',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.client}</p>
                  </div>
                </div>
                <p className="text-green-400 font-semibold mb-2">→ {item.result}</p>
                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                <div className="grid grid-cols-3 gap-3">
                  {item.stats.map((stat, j) => (
                    <div key={j} className="bg-gray-900/50 rounded-lg p-2 text-center">
                      <span className="text-orange-400 font-bold text-sm block">{stat.value}</span>
                      <span className="text-gray-500 text-xs">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SEGMENTS ============ */}
      <section className="py-16 md:py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Для кого мы работаем</h2>
            <p className="text-gray-400 text-lg">Решения под конкретные задачи вашего бизнеса</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🛒',
                title: 'Селлеры WB / Ozon',
                features: [
                  'Упаковка по стандартам маркетплейсов',
                  'Маркировка «Честный ЗНАК»',
                  'Доставка прямо на склады WB/Ozon',
                  'Поиск трендовых товаров',
                  'Защита карточек от конкурентов',
                ],
                cta: 'Хочу товар для маркетплейса',
                color: 'border-blue-500/30 hover:border-blue-500/50',
              },
              {
                icon: '📦',
                title: 'Оптовики и ритейл',
                features: [
                  'Поиск эксклюзивных товаров',
                  'Снижение себестоимости до 40%',
                  'Защита от конкурентов (эксклюзив)',
                  'Регулярные поставки по графику',
                  'Фиксация курса юаня',
                ],
                cta: 'Снизить себестоимость',
                color: 'border-orange-500/30 hover:border-orange-500/50',
              },
              {
                icon: '🏭',
                title: 'Бизнес / Оборудование',
                features: [
                  'Подбор линий и станков по ТЗ',
                  'Помощь с техзаданиями',
                  '«Белая» доставка с ГТД',
                  'Полный пакет закрывающих документов',
                  'Помощь с сертификацией',
                ],
                cta: 'Подобрать оборудование',
                color: 'border-green-500/30 hover:border-green-500/50',
              },
            ].map((item, i) => (
              <div key={i} className={`bg-gray-800/50 border rounded-2xl p-6 transition-all duration-300 ${item.color}`}>
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-2 mb-6">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gray-700/50 border border-gray-600 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 transition-colors">
                  {item.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Отзывы клиентов</h2>
            <p className="text-gray-400 text-lg">Реальные люди, реальные результаты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Алексей К.',
                role: 'Селлер WB, Москва',
                text: 'Сначала боялся платить предоплату 50%, но менеджер прислал видео со склада в Иу, где мой товар уже упакован. Везут уже вторую партию. Всё чётко.',
                rating: 5,
                platform: 'Telegram',
              },
              {
                name: 'Марина С.',
                role: 'Магазин одежды, СПб',
                text: 'Заказывала 2000 единиц одежды. Переживала за брак — но получила фотоотчёт каждой коробки. Брак оказался 0.2%. Для Китая это идеально.',
                rating: 5,
                platform: 'WhatsApp',
              },
              {
                name: 'Дмитрий В.',
                role: 'Производство, Екатеринбург',
                text: 'Привезли станок ЧПУ за 28 дней. Помогли с сертификацией, которую я сам бы делал месяцами. Документы все в порядке, налоговая вопросов не задала.',
                rating: 5,
                platform: 'Видео-отзыв',
              },
            ].map((review, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed italic">
                  «{review.text}»
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.role}</p>
                  </div>
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">{review.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-16 md:py-24 bg-gray-900/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Частые вопросы</h2>
            <p className="text-gray-400 text-lg">Отвечаем на главные сомнения</p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-800/80 transition-colors"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">{item.q}</span>
                  <span className={`text-orange-400 text-xl transition-transform duration-300 ${faqOpen === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-6 block">🎁</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Не знаете, с чего начать?
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            Получите <span className="text-orange-400 font-semibold">бесплатный аудит вашей ниши</span> и чек-лист
          </p>
          <p className="text-2xl font-bold text-white mb-8">
            «Топ-50 товаров из Китая для WB/Ozon в 2026»
          </p>

          <div className="max-w-md mx-auto bg-gray-800/80 border border-gray-700 rounded-2xl p-6">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон или @Telegram"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <input
                type="url"
                placeholder="Ссылка на товар (если есть)"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25 text-lg">
                🚀 Получить расчёт + чек-лист бесплатно
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              🔒 Менеджер свяжется в течение 15 минут в рабочее время
            </p>
          </div>

          {/* Timer */}
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
            <span className="text-red-400 text-sm font-medium">⏰ Бесплатная инспекция на складе в Гуанчжоу — при заказе расчёта до конца недели</span>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center font-bold text-sm">
                  CB
                </div>
                <span className="font-bold text-lg">ChinaBuy<span className="text-orange-500">Pro</span></span>
              </div>
              <p className="text-gray-500 text-sm">
                Закупка и доставка товаров из Китая в Россию с 2020 года.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Выкуп с 1688/Taobao</li>
                <li>Карго доставка</li>
                <li>Белая доставка с ГТД</li>
                <li>Инспекция товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 +7 (495) 123-45-67</li>
                <li>📧 info@chinabuypro.ru</li>
                <li>📍 Москва, ул. Примерная, 1</li>
                <li>🏭 Гуанчжоу, Байюнь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Мессенджеры</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Онлайн-менеджер:<br/>
                <span className="text-green-400">● Статус: Онлайн</span>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-600 text-sm">
            © 2026 ChinaBuyPro. Все права защищены. ООО «ЧайнаБайПро» ИНН 7712345678
          </div>
        </div>
      </footer>

      {/* ============ STICKY BAR (Mobile) ============ */}
      <StickyBar />
    </div>
  );
}
