import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Минималистичная ваза',
    price: 2490,
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
    description: 'Элегантная керамическая ваза'
  },
  {
    id: 2,
    name: 'Скандинавский стул',
    price: 8990,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    description: 'Удобный стул из натурального дерева'
  },
  {
    id: 3,
    name: 'Настольная лампа',
    price: 3990,
    category: 'lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    description: 'Лаконичная LED лампа'
  },
  {
    id: 4,
    name: 'Хлопковое покрывало',
    price: 4490,
    category: 'textile',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
    description: 'Мягкое покрывало из органического хлопка'
  },
  {
    id: 5,
    name: 'Книжная полка',
    price: 12990,
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop',
    description: 'Настенная полка из дуба'
  },
  {
    id: 6,
    name: 'Подушка декоративная',
    price: 1990,
    category: 'textile',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
    description: 'Мягкая подушка с геометрическим узором'
  },
  {
    id: 7,
    name: 'Керамическая тарелка',
    price: 890,
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
    description: 'Ручная работа, уникальная глазурь'
  },
  {
    id: 8,
    name: 'Торшер напольный',
    price: 7990,
    category: 'lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    description: 'Регулируемый по высоте торшер'
  }
];

const categories = [
  { id: 'all', name: 'Все товары' },
  { id: 'furniture', name: 'Мебель' },
  { id: 'decor', name: 'Декор' },
  { id: 'lighting', name: 'Освещение' },
  { id: 'textile', name: 'Текстиль' }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">MINIMAL SHOP</h1>
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О магазине
              </button>
              <button
                onClick={() => setActiveSection('reviews')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'reviews' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Отзывы
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
            </nav>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setActiveSection('cart')}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="mb-20 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Красота в простоте
                </h2>
                <p className="text-xl text-muted-foreground">
                  Тщательно отобранные предметы для современного минималистичного дома
                </p>
                <Button size="lg" className="mt-8" onClick={() => setActiveSection('catalog')}>
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold text-center mb-12">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог</h2>
              <p className="text-muted-foreground">Найдите идеальные предметы для вашего пространства</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <Button size="sm" onClick={() => addToCart(product)}>
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'cart' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Корзина</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
                <Button onClick={() => setActiveSection('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                        <p className="font-bold mt-2">{item.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Итого:</span>
                      <span className="text-3xl font-bold">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Button size="lg" className="w-full">
                      Оформить заказ
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">О магазине</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы верим, что красота заключается в простоте. Наш магазин предлагает тщательно отобранную коллекцию
                минималистичных предметов интерьера, которые помогут создать гармоничное пространство в вашем доме.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Каждый товар в нашем каталоге выбран с особым вниманием к качеству, функциональности и дизайну.
                Мы работаем только с проверенными производителями, которые разделяют нашу философию минимализма
                и устойчивого развития.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card>
                <CardHeader>
                  <Icon name="Award" size={32} className="mb-2 text-primary" />
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Только проверенные бренды и материалы</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Truck" size={32} className="mb-2 text-primary" />
                  <CardTitle>Доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Бережная доставка по всей России</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Shield" size={32} className="mb-2 text-primary" />
                  <CardTitle>Гарантия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">14 дней на возврат без вопросов</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Отзывы</h2>
            <div className="grid gap-6">
              {[
                {
                  name: 'Анна Петрова',
                  rating: 5,
                  text: 'Потрясающее качество! Ваза превзошла все ожидания. Минималистичный дизайн идеально вписался в интерьер.',
                  date: '15 ноября 2024'
                },
                {
                  name: 'Дмитрий Соколов',
                  rating: 5,
                  text: 'Заказывал стул и лампу. Оба товара отличного качества, быстрая доставка. Рекомендую!',
                  date: '3 ноября 2024'
                },
                {
                  name: 'Мария Иванова',
                  rating: 5,
                  text: 'Очень довольна покупкой! Покрывало мягкое, приятное к телу. Цвет точно как на фото.',
                  date: '28 октября 2024'
                }
              ].map((review, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{review.name}</CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Контакты</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Icon name="Mail" size={24} className="mb-2 text-primary" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:hello@minimalshop.ru" className="text-lg hover:text-primary transition-colors">
                    hello@minimalshop.ru
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Phone" size={24} className="mb-2 text-primary" />
                  <CardTitle>Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+74951234567" className="text-lg hover:text-primary transition-colors">
                    +7 (495) 123-45-67
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="MapPin" size={24} className="mb-2 text-primary" />
                  <CardTitle>Адрес</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    Москва, ул. Примерная, д. 10<br />
                    Пн-Пт: 10:00 - 20:00<br />
                    Сб-Вс: 11:00 - 18:00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 Minimal Shop. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
