# 🏋️ FitLog — Workout Tracking Application

**Train with intent. Log every set.**

FitLog is a dark-themed workout library and tracking application built to help users explore workouts, create a daily workout plan, and save exercises for later. It provides workout details, useful exercise statistics, and a clean, responsive interface for a focused fitness experience.

## 🌐 Live Demo

🔗 **Live Website:** [Add your Vercel deployment URL here]

## ✨ Features

- **Workout Library:** Browse workouts and explore different muscle groups.
- **Workout Details:** View exercise descriptions, equipment, difficulty, sets, reps, duration, calories, ratings, and instructions.
- **Today's Plan:** Add workouts to your daily workout plan.
- **Save for Later:** Save exercises to revisit whenever needed.
- **Workout Management:** Remove workouts from your plan or saved list.
- **Sorting Options:** Sort workouts by duration, calories burned, or rating.
- **Dynamic Counters:** Track the number of planned and saved workouts.
- **Workout Statistics:** View exercise counts, total duration, and estimated calories for your plan.
- **Toast Notifications:** Receive feedback when adding, saving, or removing workouts.
- **Responsive Design:** Designed to work across desktop, tablet, and mobile screens.
- **Persistent Browser Storage:** Uses local storage to retain the plan and saved workouts in the same browser.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- REST API
- Browser Local Storage
- Git and GitHub
- Vercel

## 🔌 API

FitLog retrieves workout data from the following API:

**All workouts**
```text
https://api.abcz.workers.dev/api/fitlog
```

**Individual workout**
```text
https://api.abcz.workers.dev/api/fitlog/:id
```

The API provides workout information such as names, images, muscle groups, equipment, difficulty levels, duration, calories burned, ratings, and exercise instructions.

## 🚀 Getting Started

Follow these steps to run FitLog locally.

### Prerequisites

- Node.js installed on your computer
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sohag54/Assingment-6.git
```

### 2. Open the project folder

```bash
cd Assingment-6
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit the following URL in your browser:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
Assingment-6/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WorkoutLibrary.tsx
│   │   └── WorkoutActions.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   ├── workouts/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── types.ts
│   ├── layout.tsx
│   └── page.tsx
├── assets/
│   ├── banner.png
│   └── logo.png
├── public/
├── package.json
└── README.md
```

*Note: The structure above highlights the main application files. Your exact folders and files may differ slightly.*

## 💾 Data Storage

FitLog uses browser `localStorage` to store the user's planned and saved workouts.

- `fitlog-plan` — workouts added to Today's Plan
- `fitlog-saved` — workouts saved for later

This storage is specific to the browser and device. The application does not use these keys as a cloud account or cross-device sync system.

## 📦 Production Build

To create a production build, run:

```bash
npm run build
```

To start the production server locally after building:

```bash
npm run start
```

## 🚀 Deployment

FitLog can be deployed using [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Confirm the project uses the Next.js framework.
4. Click **Deploy**.
5. Add the live deployment URL to the Live Demo section above.

## 👨‍💻 Author

**Nosad Sattar Sohag**

- GitHub: [@sohag54](https://github.com/sohag54)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/sohag-sattar-sohag-9792823a4/)

---

<p align="center">
  Built with 💚 and a passion for learning web development.
</p>

