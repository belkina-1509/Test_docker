# Docker тестовое приложение

Простое Python приложение на Flask для тестирования Docker контейнеров.

## Описание

Приложение состоит из двух компонентов:
- **Backend (Flask API)** - предоставляет REST API эндпоинты
- **Frontend (Web Interface)** - веб-интерфейс для взаимодействия с API

### API эндпоинты:
- `/` - главная страница с информацией о контейнере
- `/health` - проверка здоровья приложения
- `/info` - информация о системе
- `/calc/<a>/<b>` - вычисление математических операций с двумя числами (сложение, вычитание, умножение, деление)

## Требования

- Docker установлен на вашей системе
- Python 3.11+ (для локальной разработки, опционально)

## Перед началом работы

### Проверка Docker

Убедитесь, что Docker Desktop запущен. На Windows:

1. Проверьте, запущен ли Docker Desktop (иконка в системном трее)
2. Если не запущен, запустите Docker Desktop из меню Пуск или выполните:
   ```powershell
   Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
   ```
3. Дождитесь полной загрузки Docker Desktop (обычно 10-30 секунд)
4. Проверьте, что Docker работает:
   ```bash
   docker ps
   ```
   Если команда выполняется без ошибок, Docker готов к работе.

**Ошибка "The system cannot find the file specified"** обычно означает, что Docker Desktop не запущен.

## 🚀 Быстрый старт с Docker Compose (Рекомендуется)

Самый простой способ запустить приложение - использовать Docker Compose, который автоматически соберет и запустит оба сервиса (бэкенд и фронтенд).

### Запуск приложения

1. Убедитесь, что Docker Desktop запущен
2. Выполните команду в корневой директории проекта:

```bash
docker-compose up --build
```

Или для запуска в фоновом режиме:

```bash
docker-compose up -d --build
```

### Доступ к приложению

После запуска приложение будет доступно:
- **Веб-интерфейс (Frontend)**: http://localhost
- **API (Backend)**: http://localhost:5000
- **API через прокси**: http://localhost/api (для использования из фронтенда)

### Управление через Docker Compose

```bash
# Остановка сервисов
docker-compose down

# Просмотр логов
docker-compose logs

# Просмотр логов конкретного сервиса
docker-compose logs backend
docker-compose logs frontend

# Перезапуск сервисов
docker-compose restart

# Остановка и удаление контейнеров, сетей
docker-compose down -v
```

### Структура проекта

```
.
├── app.py                 # Flask приложение
├── Dockerfile             # Dockerfile для бэкенда
├── requirements.txt       # Python зависимости
├── docker-compose.yml     # Docker Compose конфигурация
├── frontend/              # Фронтенд приложение
│   ├── index.html        # HTML интерфейс
│   ├── styles.css        # Стили
│   ├── app.js            # JavaScript логика
│   ├── Dockerfile        # Dockerfile для фронтенда
│   └── nginx.conf        # Nginx конфигурация
└── README.md
```

## Инструкция по сборке образа (только бэкенд)

### 1. Сборка Docker образа

Выполните следующую команду в директории проекта:

```bash
docker build -t test-app:latest .
```

Где:
- `test-app` - имя образа
- `latest` - тег версии
- `.` - текущая директория (где находится Dockerfile)

### 2. Проверка созданного образа

Убедитесь, что образ создан:

```bash
docker images
```

Вы должны увидеть образ `test-app` в списке.

## Запуск контейнера

### Запуск контейнера

```bash
docker run -d -p 5000:5000 --name my-test-app test-app:latest
```

Где:
- `-d` - запуск в фоновом режиме (detached)
- `-p 5000:5000` - проброс порта (хост:контейнер)
- `--name my-test-app` - имя контейнера
- `test-app:latest` - имя и тег образа

### Проверка работы приложения

Откройте браузер и перейдите по адресу:
- http://localhost:5000 - главная страница
- http://localhost:5000/health - проверка здоровья
- http://localhost:5000/info - информация о системе
- http://localhost:5000/calc/10/5 - вычисление операций с числами 10 и 5

Или используйте curl:

```bash
curl http://localhost:5000
```

## Управление контейнером

### Просмотр логов

```bash
docker logs my-test-app
```

### Остановка контейнера

```bash
docker stop my-test-app
```

### Запуск остановленного контейнера

```bash
docker start my-test-app
```

### Удаление контейнера

```bash
docker rm my-test-app
```

### Удаление образа

```bash
docker rmi test-app:latest
```

## Локальная разработка (без Docker)

Если вы хотите запустить приложение локально:

1. Установите зависимости:
```bash
pip install -r requirements.txt
```

2. Запустите приложение:
```bash
python app.py
```

Приложение будет доступно по адресу http://localhost:5000

## Переменные окружения

Вы можете настроить приложение через переменные окружения:

- `PORT` - порт для запуска приложения (по умолчанию: 5000)
- `ENV` - окружение (по умолчанию: production)

Пример запуска с кастомным портом:

```bash
docker run -d -p 8080:8080 -e PORT=8080 --name my-test-app test-app:latest
```
