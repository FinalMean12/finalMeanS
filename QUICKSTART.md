# Quick Start Guide

## Быстрый запуск проекта

### 1. Клонирование и подготовка

```bash
# Убедитесь, что Docker и Docker Compose установлены
docker --version
docker-compose --version
```

### 2. Настройка переменных окружения

#### Server (.env)
Создайте файл `server/.env`:
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://admin:password@localhost:27017/bookstore?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

#### Client (.env.local)
Создайте файл `client/.env.local`:
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_WS_URL=ws://localhost:4000/graphql
```

### 3. Запуск через Docker Compose

```bash
# Запуск всех сервисов одной командой
docker-compose up

# Или в фоновом режиме
docker-compose up -d
```

Сервисы будут доступны:
- Frontend: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- MongoDB Express: http://localhost:8081

### 4. Заполнение базы данных тестовыми данными

В новом терминале:
```bash
# Заполнение БД
cd server
npm install
npm run seed
```

Или через Docker:
```bash
docker-compose exec api npm run seed
```

### 5. Тестовые учетные данные

**Администратор:**
- Email: `admin@bookstore.com`
- Password: `admin123`

**Пользователь:**
- Email: `user@bookstore.com`
- Password: `user123`

## Проверка реалтайм функциональности

### Подписка на обновления книг

1. Откройте приложение в двух вкладках браузера
2. В первой вкладке войдите как администратор
3. Во второй вкладке откройте главную страницу с каталогом книг
4. В первой вкладке создайте новую книгу через GraphQL Playground:
   - Откройте http://localhost:4000/graphql
   - Выполните mutation:
   ```graphql
   mutation {
     createBook(input: {
       title: "Test Book"
       description: "Test description"
       isbn: "1234567890123"
       price: 19.99
       stock: 10
       authorId: "AUTHOR_ID"
     }) {
       id
       title
     }
   }
   ```
5. Во второй вкладке книга должна появиться автоматически (если реализована подписка на фронте)

### Подписка на обновления заказов

1. Войдите как пользователь
2. Откройте страницу "My Orders"
3. В другой вкладке (или через API) обновите статус заказа
4. На странице заказов статус должен обновиться автоматически

## Запуск тестов

```bash
cd server
npm install
npm test
```

## Локальная разработка (без Docker)

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Структура проекта

```
SessionMern/
├── client/              # Next.js frontend
│   ├── app/            # App Router страницы
│   ├── components/     # React компоненты
│   └── lib/            # Apollo Client, Zustand stores
├── server/             # Express + GraphQL backend
│   ├── src/
│   │   ├── models/     # Mongoose модели
│   │   ├── resolvers/  # GraphQL резолверы
│   │   ├── schema/     # GraphQL схемы
│   │   └── utils/      # Утилиты
│   └── tests/          # Jest тесты
├── docker-compose.yml  # Docker конфигурация
└── README.md          # Полная документация
```

## Troubleshooting

### Проблемы с подключением к MongoDB
- Убедитесь, что MongoDB контейнер запущен: `docker-compose ps`
- Проверьте логи: `docker-compose logs mongo`

### Проблемы с GraphQL Subscriptions
- Убедитесь, что WebSocket соединение установлено
- Проверьте переменные окружения NEXT_PUBLIC_WS_URL
- Проверьте логи API: `docker-compose logs api`

### Проблемы с фронтендом
- Очистите кэш Next.js: `rm -rf client/.next`
- Пересоберите: `cd client && npm run build`


