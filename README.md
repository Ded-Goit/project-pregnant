# 🤰 Project Pregnant

## 📖 Про проєкт

**Project Pregnant** — це вебзастосунок для майбутніх мам, що допомагає відстежувати перебіг вагітності, вести особистий щоденник, отримувати поради та виконувати завдання.  
Мета проєкту — створити зручний та адаптивний простір, де жінки можуть:

- отримувати персоналізовану інформацію про розвиток малюка та власний стан;
- вести щоденник настроїв і записів;
- планувати та контролювати виконання завдань;
- користуватися інтуїтивною навігацією на різних пристроях.

---

## 🛠 Використані технології

- **Next.js 15 (App Router)** — сучасна архітектура для фронтенду
- **TypeScript** — типізація коду
- **CSS Modules** — модульна стилізація з підходом _mobile-first_
- **Zustand** — легкий стейт-менеджмент (за необхідності)
- **React Query** — асинхронне отримання даних і кешування
- **Formik + Yup** — форми та валідація
- **Toast повідомлення** — для обробки помилок і статусів
- **Vercel** — хостинг фронтенду
- **Backend (Node.js, Express, MongoDB)** — у окремому репозиторії:  
  👉 [project-pregnant-back](https://github.com/Nickolay1990/project-pregnant-back)

---

## 🚀 Запуск та розгортання

### 1. Клонування репозиторію

```bash
git clone https://github.com/Ded-Goit/project-pregnant
```

```bash
cd project-pregnant
```

2. Встановлення залежностей

```bash
npm install
```

3. Запуск у режимі розробки

```bash
npm run dev
```

Застосунок буде доступний за адресою:
👉 http://localhost:3000

4. Збірка для продакшну

```bash
npm run build
npm run start
```

## 📂 Структура проєкту

📦 project-pregnant  
 ┣ 📂 project-plans # CSV-файли з планами та завданнями  
 ┣ 📂 public # Статичні файли (іконки, зображення, анімації)  
 ┣ 📂 src  
 ┃ ┣ 📂 app # Сторінки та API (App Router Next.js 15)  
 ┃ ┣ 📂 components # UI-компоненти та бізнес-блоки  
 ┃ ┣ 📂 fonts # Кастомні шрифти  
 ┃ ┣ 📂 hooks # Кастомні React-хуки  
 ┃ ┣ 📂 lib # Утиліти та API-запити  
 ┃ ┗ 📂 types # Типи TypeScript  
 ┣ 📜 .env # Налаштування середовища  
 ┣ 📜 package.json # Залежності проєкту  
 ┣ 📜 tsconfig.json # Конфігурація TypeScript  
 ┗ 📜 README.md # Документація

## 📌 Загальні вимоги та особливості

Адаптивність: mobile-first дизайн для мобільних, планшетних і десктопних екранів

Маршрутизація: App Router Next.js 15

Публічні та приватні маршрути: захист сторінок на рівні компонентів

Лоадери: відображення під час будь-яких активних запитів

Обробка помилок: toast-сповіщення та повідомлення у формах

UI-компоненти: побудовані з використанням CSS Modules

Форми: створені через Formik із Yup-валідаторами

## ℹ️ Супутня інформація

У бекенд-репозиторії реалізовано API для автентифікації, профілю, завдань, щоденника та тижнів вагітності

Є підтримка Google-авторизації

Тематичне оформлення змінюється залежно від обраної статі дитини (рожеве/блакитне/нейтральне)

В додатку передбачено онбординг нового користувача

## Ознайомтесь також з рекомендаціями 👇

# This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
