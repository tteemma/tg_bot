# Telegram Bot for Pocket

Этот проект представляет собой Telegram-бота, который позволяет пользователям сохранять ссылки в их аккаунте Pocket. Бот управляет процессом авторизации через Pocket и сохраняет токены доступа в локальной базе данных (BoltDB).

---

## 🚀 Основные функции

- **Авторизация через Pocket**: Бот генерирует ссылку для авторизации пользователя в Pocket и сохраняет токены доступа.
- **Сохранение ссылок**: Пользователь может отправлять ссылки боту, и они будут автоматически сохранены в его аккаунте Pocket.
- **Обработка ошибок**: Бот умеет обрабатывать ошибки, такие как неверные URL или проблемы с сохранением ссылок.

---

## 🛠 Как это работает

1. Пользователь запускает бота командой `/start`.
2. Бот генерирует ссылку для авторизации в Pocket и отправляет ее пользователю.
3. Пользователь переходит по ссылке и авторизуется в Pocket.
4. После успешной авторизации бот сохраняет токен доступа в базе данных.
5. Пользователь может отправлять ссылки боту, и они будут сохранены в его аккаунте Pocket.

---

## ⚙️ Установка и запуск

### 📋 Требования

- Go 1.16 или выше
- Telegram Bot Token (можно получить у [BotFather](https://core.telegram.org/bots#botfather))
- Pocket Consumer Key (можно получить на [сайте Pocket](https://getpocket.com/developer/))

---

### 🛠 Настройка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2. Создайте файл конфигурации cfg/main.yaml:
  bot_url: "https://your-domain.com"
  db_file: "bot.db"
  messages:
    response:
      start: "Для авторизации перейдите по ссылке: %s"
      already_authorized: "Вы уже авторизованы."
      unknown_command: "Неизвестная команда."
      link_saved: "Ссылка сохранена."
    error:
      default: "Произошла ошибка."
      invalid_url: "Некорректный URL."
      unable_to_save: "Не удалось сохранить ссылку."
3. Установите переменные окружения:
  export TELEGRAM_TOKEN="your-telegram-bot-token"
  export POCKET_CONSUMER_KEY="your-pocket-consumer-key"
  export AUTH_SERVER_URL="https://your-domain.com"
4. Запустите бота:
  go run main.go
