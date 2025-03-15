Telegram Bot for Pocket
Этот проект представляет собой Telegram-бота, который позволяет пользователям сохранять ссылки в их аккаунте Pocket. Бот управляет процессом авторизации через Pocket и сохраняет токены доступа в локальной базе данных (BoltDB).

🚀 Основные функции
Авторизация через Pocket: Бот генерирует ссылку для авторизации пользователя в Pocket и сохраняет токены доступа.

Сохранение ссылок: Пользователь может отправлять ссылки боту, и они будут автоматически сохранены в его аккаунте Pocket.

Обработка ошибок: Бот умеет обрабатывать ошибки, такие как неверные URL или проблемы с сохранением ссылок.

🛠 Как это работает
Пользователь запускает бота командой /start.

Бот генерирует ссылку для авторизации в Pocket и отправляет ее пользователю.

Пользователь переходит по ссылке и авторизуется в Pocket.

После успешной авторизации бот сохраняет токен доступа в базе данных.

Пользователь может отправлять ссылки боту, и они будут сохранены в его аккаунте Pocket.

⚙️ Установка и запуск
📋 Требования
Go 1.16 или выше

Telegram Bot Token (можно получить у BotFather)

Pocket Consumer Key (можно получить на сайте Pocket)

🛠 Настройка
Клонируйте репозиторий:

bash
Copy
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Создайте файл конфигурации cfg/main.yaml:

yaml
Copy
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
Установите переменные окружения:

bash
Copy
export TELEGRAM_TOKEN="your-telegram-bot-token"
export POCKET_CONSUMER_KEY="your-pocket-consumer-key"
export AUTH_SERVER_URL="https://your-domain.com"
Запустите бота:

bash
Copy
go run main.go
🐳 Запуск с Docker
Соберите Docker-образ:

bash
Copy
docker build -t pocket-bot .
Запустите контейнер:

bash
Copy
docker run -e TELEGRAM_TOKEN="your-telegram-bot-token" \
           -e POCKET_CONSUMER_KEY="your-pocket-consumer-key" \
           -e AUTH_SERVER_URL="https://your-domain.com" \
           pocket-bot
📂 Структура проекта
main.go - точка входа в приложение.

config/ - пакет для работы с конфигурацией.

server/ - пакет для запуска HTTP-сервера, который обрабатывает запросы от Pocket.

storage/ - пакет для работы с хранилищем токенов (BoltDB).

telegram/ - пакет для работы с Telegram API и обработки команд.

📄 Лицензия
Этот проект распространяется под лицензией MIT. Подробности см. в файле LICENSE.

🤝 Как помочь проекту
Если вы хотите внести свой вклад в проект, пожалуйста, создайте issue или pull request. Мы рады любым улучшениям и предложениям!

📧 Контакты
Если у вас есть вопросы или предложения, свяжитесь со мной: ваш email.

Теперь вы можете просто вставить этот текст в ваш репозиторий на GitHub, и он будет выглядеть красиво и профессионально! 😊

