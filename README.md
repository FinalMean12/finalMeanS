# BookStore - MERN Stack Project

## Описание проекта

BookStore — это полнофункциональное веб-приложение для управления книжным магазином, построенное на стеке MERN (MongoDB, Express.js, React/Next.js, Node.js) с использованием TypeScript, GraphQL и Docker.

### Цели проекта

- Демонстрация навыков работы с современным стеком технологий
- Реализация полноценного full-stack приложения с реалтайм функциональностью
- Применение best practices в разработке (типизация, тестирование, контейнеризация)

### Домен

Приложение предназначено для управления книжным магазином:
- **Пользователи** могут просматривать каталог книг, добавлять книги в корзину, оформлять заказы
- **Администраторы** могут управлять книгами, авторами, заказами
- Реалтайм обновления для отслеживания изменений в каталоге и заказах

### Роли пользователей

1. **Гость** — просмотр каталога книг
2. **Пользователь** — просмотр, добавление в корзину, оформление заказов
3. **Администратор** — полный доступ к управлению контентом и заказами

## Технологический стек

### Backend
- Node.js + Express.js
- TypeScript
- GraphQL (Apollo Server)
- MongoDB + Mongoose
- JWT для аутентификации
- Jest для тестирования

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Zustand для управления состоянием
- Apollo Client для работы с GraphQL
- React Hook Form + Zod для валидации форм

### DevOps
- Docker & Docker Compose
- Healthchecks для всех сервисов

## Схема данных

### Модели

1. **User** (Пользователь)
   - email (String, unique, required)
   - password (String, hashed, required)
   - name (String, required)
   - role (Enum: USER, ADMIN, required)
   - avatar (String, optional)
   - createdAt, updatedAt

2. **Author** (Автор)
   - name (String, required)
   - bio (String, optional)
   - birthDate (Date, optional)
   - nationality (String, optional)
   - photo (String, optional)
   - isDeleted (Boolean, default: false)
   - createdAt, updatedAt

3. **Book** (Книга)
   - title (String, required)
   - description (String, required)
   - isbn (String, unique, required)
   - price (Number, required)
   - stock (Number, default: 0)
   - coverImage (String, optional)
   - publishedDate (Date, optional)
   - authorId (ObjectId, ref: Author, required)
   - isDeleted (Boolean, default: false)
   - createdAt, updatedAt

4. **Order** (Заказ)
   - userId (ObjectId, ref: User, required)
   - items (Array of OrderItem)
   - totalAmount (Number, required)
   - status (Enum: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
   - shippingAddress (Object, required)
   - createdAt, updatedAt

### Связи

- Book → Author (Many-to-One): каждая книга имеет одного автора
- Order → User (Many-to-One): каждый заказ принадлежит одному пользователю
- Order → Book (Many-to-Many через OrderItem): заказ содержит несколько книг

## Как запустить локально

### Предварительные требования

- Docker и Docker Compose установлены
- Git

### Запуск проекта

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd SessionMern
```

2. Создайте файлы `.env` на основе `.env.example`:
```bash
cd server && cp .env.example .env
cd ../client && cp .env.example .env
```

3. Запустите все сервисы одной командой:
```bash
docker-compose up
```

Проект будет доступен:
- Frontend: http://localhost:3000
- GraphQL API: http://localhost:4000/graphql
- GraphQL Playground: http://localhost:4000/graphql
- MongoDB Express: http://localhost:8081

### Локальная разработка (без Docker)

#### Backend
```bash
cd server
npm install
npm run dev
```

#### Frontend
```bash
cd client
npm install
npm run dev
```

## Как проверить реалтайм функциональность

### Подписка на обновления книг

1. Откройте приложение в двух вкладках браузера
2. В первой вкладке войдите как администратор
3. Во второй вкладке откройте каталог книг
4. В первой вкладке создайте новую книгу или обновите существующую
5. Во второй вкладке изменения должны появиться автоматически без перезагрузки страницы

### Подписка на обновления заказов

1. Войдите как пользователь
2. Откройте страницу "Мои заказы"
3. В другой вкладке (или через API) обновите статус заказа
4. На странице заказов статус должен обновиться автоматически

## Демо-ссылки

### Продакшн (если развернуто)
- Frontend: [URL будет добавлен]
- GraphQL Endpoint: [URL будет добавлен]
- WebSocket Endpoint: [URL будет добавлен]

### Тестовые пользователи

**Администратор:**
- Email: admin@bookstore.com
- Password: admin123

**Обычный пользователь:**
- Email: user@bookstore.com
- Password: user123

## Скрипты

### Корневые скрипты
- `npm run dev` — запуск dev режима для client и server
- `npm run build` — сборка обоих проектов
- `npm test` — запуск тестов
- `npm run seed` — заполнение БД тестовыми данными
- `npm run lint` — проверка кода линтером

### Backend скрипты
- `cd server && npm run dev` — запуск dev сервера
- `cd server && npm run build` — сборка
- `cd server && npm test` — запуск тестов
- `cd server && npm run seed` — заполнение БД

### Frontend скрипты
- `cd client && npm run dev` — запуск dev сервера
- `cd client && npm run build` — сборка
- `cd client && npm run lint` — проверка кода

## Команда/Роли

### Участник 1
- Настройка backend инфраструктуры (Express, GraphQL, MongoDB)
- Реализация GraphQL схемы и резолверов (6+ Query, 6+ Mutation, 2 Subscriptions)
- JWT аутентификация и авторизация
- GraphQL Subscriptions с PubSub
- Unit и интеграционные тесты (10+ тестов)
- Docker конфигурация для backend

### Участник 2
- Настройка frontend инфраструктуры (Next.js App Router, Apollo Client)
- Реализация UI компонентов и страниц (5+ экранов)
- Интеграция Apollo Client с WebSocket для Subscriptions
- Zustand store (auth, cart)
- Реалтайм обновления на фронтенде
- Docker конфигурация для frontend

## Архитектура

### Backend структура
```
server/
├── src/
│   ├── models/          # Mongoose модели
│   ├── resolvers/       # GraphQL резолверы
│   ├── schema/          # GraphQL схемы
│   ├── services/        # Бизнес-логика
│   ├── utils/           # Утилиты (JWT, валидация)
│   ├── types/           # TypeScript типы
│   └── index.ts         # Точка входа
├── tests/               # Тесты
├── Dockerfile
└── package.json
```

### Frontend структура
```
client/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Группа маршрутов для аутентификации
│   ├── (dashboard)/    # Защищенные маршруты
│   └── layout.tsx
├── components/          # React компоненты
├── lib/                # Apollo Client, Zustand stores
├── types/              # TypeScript типы
├── Dockerfile
└── package.json
```

## Тестирование

Запуск тестов:
```bash
cd server
npm test
```

Покрытие:
```bash
cd server
npm run test:coverage
```

## Лицензия

MIT

#   f i n a l M e a n S  
 