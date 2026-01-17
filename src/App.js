import React, { useState, useEffect } from 'react';
import './App.css';
import { Phone, ShoppingCart, User, Settings, Star, AlignRight } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'мужская одежда', price: 3100, brand: 'nike', size: 'm', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/21f2f1bcb014ce0f62994d1d0c019d3766519cae16dd0e7b28d5f7c0ea5703ae/696ba02f/YA9g2N3FQE7jhQU0jm1Upi_vZLbCnbis-V2p_MdDAwAx2Ltv8vkCAYG-NDOvisaeRRLJUFjYbfeUkGrhlKOZCA%3D%3D?uid=0&filename=6585114001.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 2, name: 'женская одежда', price: 2600, brand: 'adidas', size: 'xs', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/75a69baac7ba056c7ea830f7b7a9909eb9b091c34d007e042ddfd225ab48b61b/696ba02f/xTXaYz9JLTESQczh7XnVbk37CPaI_FxmqpD9Ahyeoy6DmsUtGA7KE94N0cwHZELW7BEjNujJDvs2DPQpDbJjwQ%3D%3D?uid=0&filename=953f1b12b2ccd9321266673dd6a08a45793aadd2_original.jpeg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 3, name: 'детская одежда', price: 1900, brand: 'nike', size: 'ssx', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/07b62090f96a99b648f95b5f4b2054213b4649e6a1270cb9a6a9c582c962321c/696ba02f/jZ8JSGc0SpFOpzZR_rMLB0f4FW6nFn1ewmCsILrehBqWc7RR71st4wV-IKmLf6uAQCcbiniTMbkRd5rJPtp2tA%3D%3D?uid=0&filename=i%20%283%29.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 4, name: 'обувь', price: 2000, brand: 'jasper', size: '42', category: 'обувь', image: 'https://downloader.disk.yandex.ru/preview/3ad22a6499ffdf59f98499799d3208d7b05a7f99336c4cf324e017c3588613e0/696ba02f/-uwEwS9ZeHxd3DGjy_TMz8oKkcDQ8X6uBucfrhTFQcQZhfMVUoE9DNxzwIl3gEsKpiHpVxaDuPNDQ2K98wYkkA%3D%3D?uid=0&filename=588c91bfba1ed32b8b0ae41dc7fb7c4d.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 5, name: 'аксессуары (шапки, перчатки, сумки)', price: 2500, brand: 'ilon', size: 's', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/ba8085dd7ee961ac323e30a71b670ea41d38b9879f13d4291bba5fdd9127cfd6/696ba02f/EMe2sBhtG9o5AV7EGT7sMvswvfY125EMWGa-R0P2e__wQ-0GowCId3-319WOWWSuL9FokPeaGeN8Wlwl3SUsnA%3D%3D?uid=0&filename=450x600.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 6, name: 'экипировка для видов спорта (бег, йога, футбол и т. д.)', price: 3000, brand: 'Adidas', size: 'm', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/303588097e4620cdaecaf5b5d01a8ece5a60a3da7ef01503ee3764ed1ad76645/696ba02f/cOuI9DVOu09LDl50z_GeRUf4FW6nFn1ewmCsILrehBphnAu-O2Mth6ANZzapdsEnVZGX4utSFAW84-xTMbrJSg%3D%3D?uid=0&filename=set-sport-wear-collection-vector_18591-19986.avif&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=919x919' },
  { id: 7, name: 'мужская одежда', price: 3300, brand: 'boss', size: 's', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/a17551e743cea225561e21ba0877e914a9d8017475aa2dba05e75fd7c6f0d9ba/696ba02f/-U0aZ5Ej_GmLPRiZp-7YnKhqaRh-HCGH1YXBZt2R52VNS8I9ngmh3pnqVLGAS4_Pq6BMC8SvnGA_ZW5T-yfK0Q%3D%3D?uid=0&filename=6fc8e2de0116b53d90a658ef4d50c101374a9878_original.jpeg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 8, name: 'женская одежда', price: 2400, brand: 'adidas', size: 'xs', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/f309bd1eb708c44da8d23aafda00457006097851f1591ffc6b87a3d2543bc2ff/696ba02f/HXay3c_NFSalYITEiRLwFd968be_MlFOyaoWhmYQsqZldkZvzc5Cnx2SFSN9B_hsXOE9hiMYXnIikL9OnxnRZQ%3D%3D?uid=0&filename=Sports-Wear-Transparent-Image.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 9, name: 'детская одежда', price: 1700, brand: 'nike', size: 'ssx', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/9aaebd2c3dfadb7ae5b9eec753013165670ebfb89ae56ce1e33e5751302e145b/696ba02f/Poz1VMmKQ2NoZCregc0LTRShi29518U7DYAa1HDDEYs3R9wMg4Szi2ZbO72UCUgXRnhhNCuQgrNJKmXlw_imNA%3D%3D?uid=0&filename=926569818ca1539ae112f8abbafb7f6f6552fa5e_original.jpeg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 10, name: 'мужская обувь', price: 4100, brand: 'baldinini', size: '42', category: 'обувь', image: 'https://downloader.disk.yandex.ru/preview/e5e78032636f03f340b35cbefdda59f0e158d017ab0cdb8c37cb7e259005ae59/696ba02f/-d8zxLl2o5Ry69vX5qksQQI5Mz7N6t5-kkjobxw-LNg_kP_LuepevIBfclthQVT4fwqwVg8c3KIKdagEOfhUMA%3D%3D?uid=0&filename=44252736d380dc652390ae386c398a27.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 2, name: 'женская одежда', price: 2500, brand: 'adidas', size: 'xxs', category: 'одежда', image: 'https://downloader.disk.yandex.ru/preview/758e60d29cb11513bbd019d5474bc774a89bb7c2c886e5ede365f9d39b87f794/696ba02f/W2oQXmzGh__8QWaDS2DFr05Xuj8kXJ7SY8lihvCId6ZKkl7PfOiqyqqMrBX2uKML7oVMsF5_gU_losfvt7yeig%3D%3D?uid=0&filename=orig.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
  { id: 3, name: 'детская обувь', price: 1900, brand: 'nivel', size: '36', category: 'обувь', image: 'https://downloader.disk.yandex.ru/preview/3f0a5edbd9c95e32aeacf04f561e7a2b6dfd15185f5b3257d6160e20aa5048df/696ba02f/3pu9oR-uUT-a-sq4xF9IDEf4FW6nFn1ewmCsILrehBptIeVcZBVx7tcLV-09VTi8FnvTmQkcPJhYKf3YneNCUw%3D%3D?uid=0&filename=i.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=1905x919' },
];

function App() {
  const [view, setView] = useState('catalog');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [managerPhone, setManagerPhone] = useState('+7 (495) 123-45-67');
  const [orders, setOrders] = useState([]);

  const addToCart = (p) => setCart([...cart, p]);
  const removeFromCart = (id) => setCart(cart.filter((item, index) => index !== id));

  const handleCheckout = () => {
    const newOrder = { id: Date.now(), items: cart, total: cart.reduce((s, i) => s + i.price, 0), status: 'обработка' };
    setOrders([...orders, newOrder]);
    setCart([]);
    alert('оформлено!');
  };

  return (
    <div className="App">

      <a href={`telephone:${managerPhone}`} className="call-btn" title="позвонить менеджеру">
        <Phone size={35} />
      </a>

      <header className="navbar">
        <div className="logo" onClick={() => setView('catalog')}>магазин спортивных товаров</div>
        <nav>
          <button onClick={() => setView('catalog')}>каталог</button>
          <button onClick={() => setView('about')}>о нас</button>
          <button onClick={() => setView('otsivi')}>отзывы</button>
          <button onClick={() => setView('sale')}>акции</button>
          <button onClick={() => setView('cart')} className="cart-link">
            <ShoppingCart size={20} /> ({cart.length})
          </button>
          <button onClick={() => setView('profile')}><User size={20} /></button>
          <button onClick={() => setView('admin')} className="admin-link"><Settings size={20} /></button>
        </nav>
      </header>

      <main className="container">

        {view === 'about' && (
          <div className="about-page">
            <h1>о магазине</h1>

            <div className="about-content">
              <section>
                <h2>«Мы — интернет‑магазин спортивной одежды для тех, кто ценит качество, комфорт и стиль.</h2>
                <p>
                  Наша миссия. Обеспечивать спортсменов и любителей фитнеса функциональной и модной одеждой, которая помогает достигать целей и чувствовать себя уверенно.
                </p>
              </section>

              <section className="advantages">
                <h2>Почему выбирают нас?</h2>
                <div className="adv-grid">
                  <div className="adv-item">
                    <h3>Широкий ассортимент:</h3>
                    <p>от профессиональной экипировки до повседневной спортивной одежды.</p>
                    <p>Только проверенные бренды с гарантией качества.</p>
                    <p>Удобная система фильтров и поиска — найдёте нужное за минуту.</p>
                    <p>Быстрая обработка заказов и доставка.</p>
                    <p>Экспертные консультации по подбору размера и модели.</p>
                    <p>Программа лояльности и регулярные акции.</p>
                  </div>
                  <div className="adv-item">
                    <h3>Наши ценности</h3>
                    <p>Качество превыше всего: тестируем товары перед поступлением в продажу.</p>
                    <p>Клиент в центре внимания: персональный подход и поддержка на каждом этапе.</p>
                    <p>Устойчивое развитие: сотрудничаем с брендами, заботящимися об экологии.</p>
                  </div>
                  <div className="adv-item">
                    <h3>Мы находимся по адресу</h3>
                    <p>125009, г. Москва, ул. Тверская, д. 15, офис 101».</p>
                  </div>
                  <div className="adv-item">
                    <h3>Наши контакты</h3>
                    <p>+7 (495) 123‑45‑67 (Москва, пн–пт 9:00–18:00)</p>
                    <a href=''><p>sportinfo@mail.ru</p></a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}


        {view === 'catalog' && (
          <div className="catalog-page">
            <h1>в продаже</h1>
            <div className="grid">
              {products.map(p => (
                <div key={p.id} className="card">
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>{p.brand} | размер: {p.size}</p>
                  <div className="price">{p.price} ₽</div>
                  <button onClick={() => addToCart(p)}>в корзину</button>
                </div>
              ))}
            </div>
            <div className="adv-item">
              <h3>Полезные статьи</h3>
              <a href=''>«Как выбрать кроссовки для бега: гид по технологиям»</a>
              <p></p>
              <a href=''>«Спортивная одежда для зимы: топ‑5 материалов»</a>
              <p></p>
              <a href=''>«Топ‑10 брендов спортивной одежды 2026 года»</a>
              <p></p>
              <a href=''>«Уход за мембранной одеждой: 7 правил»</a>
              <p></p>
              <a href=''>«Стиль в спортзале: 5 луков для тренировок»</a>
              <p></p>
              <a href=''>«Экипировка для йоги: что важно знать новичку»</a>
              <p></p>
              <a href=''>«Как измерить размер стопы: инструкция с фото»</a>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="cart-page">
            <h2>корзина</h2>
            {cart.length === 0 ? <p>пусто</p> : (
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <span>{item.name} - {item.price} ₽</span>
                    <button onClick={() => removeFromCart(idx)}>удалить</button>
                  </div>
                ))}
                <div className="total">итого: {cart.reduce((s, i) => s + i.price, 0)} ₽</div>
                <button className="buy-btn" onClick={handleCheckout}>оформить заказ</button>
              </div>
            )}
          </div>
        )}


        {view === 'profile' && (
          <div className="profile-page">
            <h2>личный кабинет</h2>
            {!user ? (
              <button onClick={() => setUser({ name: 'Максим', email: 'maksim@mvek.ru' })}>войти</button>
            ) : (
              <div>
                <p><strong>имя:</strong> {user.name}</p>
                <h3>история заказов:</h3>
                {orders.map(o => (
                  <div key={o.id} className="order-item">заказ #{o.id} — {o.status} ({o.total} ₽)</div>
                ))}
              </div>
            )}
          </div>
        )}


        {view === 'admin' && (
          <div className="admin-page">
            <h2>управление магазином</h2>
            <div className="admin-tools">
              <label>телефон менеджера:</label>
              <input value={managerPhone} onChange={(e) => setManagerPhone(e.target.value)} />
            </div>
            <h3>все заказы:</h3>
            {orders.map(o => (
              <div key={o.id} className="admin-order">
                заказ №{o.id} | статус:
                <select onChange={(e) => {
                  const updated = orders.map(order => order.id === o.id ? { ...order, status: e.target.value } : order);
                  setOrders(updated);
                }}>
                  <option value="обработка">обработка</option>
                  <option value="отправлен">отправлен</option>
                  <option value="выполнен">выполнен</option>
                </select>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;

