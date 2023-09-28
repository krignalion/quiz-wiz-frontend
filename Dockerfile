# Используем Node.js как базовый образ
FROM node:20.7.0

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в рабочую директорию
COPY . .

# Собираем проект
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 8080

# Команда для запуска приложения
CMD ["npm", "run", "serve"]
