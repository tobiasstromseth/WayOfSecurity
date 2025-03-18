# Cybersecurity Assessment Tool

A React application for small businesses to test their cybersecurity readiness and get recommendations on how to improve their security posture.

## Features

- Interactive assessment with 15 key cybersecurity categories
- Question-based assessment to establish a baseline security score
- Action-based mode to track security improvements
- Animated card flipping to switch between question and action modes
- Results page with tailored recommendations based on assessment
- Security certificate generation
- Responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/cybersecurity-assessment.git
cd cybersecurity-assessment
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Build for production

```bash
npm run build
```

## Project Structure

```
cybersecurity-assessment/
├── public/                 # Public assets
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── home/           # Home page components
│   │   ├── assessment/     # Assessment components
│   │   └── results/        # Results page components
│   ├── context/            # React context for state management
│   ├── data/               # Data files (categories, questions, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── index.jsx           # Application entry point
│   └── index.css           # Global styles
└── package.json            # Project dependencies
```

## Customization

You can customize the assessment by modifying the data files in the `src/data` directory:

- `categories.js`: Contains all the security categories, questions, and recommendations
- Add or remove categories, change questions, or update recommendations as needed

## Technologies Used

- React
- React Router
- Framer Motion (for animations)
- TailwindCSS (for styling)
- LocalStorage (for saving assessment progress)

## License

[MIT](LICENSE)
