# Stock Trading Dashboard

A real-time stock trading dashboard built with React + Vite, featuring live market data from Angel One API.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory with your Angel One credentials:

```env
API_KEY=your_api_key_here
CLIENT_CODE=your_client_code_here
PASSWORD=your_password_here
TOTP_SECRET=your_totp_secret_here
```

**Note:** Never commit your `.env` file to GitHub. Use `.env.example` as a template.

### 3. Run the Application

Start the backend server:
```bash
npm run server
```

Start the frontend development server:
```bash
npm run dev
```

## Features

- Real-time stock market data from NSE/BSE
- WebSocket integration for live updates
- Interactive charts and metrics
- Trading modal for stock transactions
- Market news and insights

## Security

- All sensitive credentials are stored in `.env` file
- `.env` is excluded from version control via `.gitignore`
- Use `.env.example` as a template for required environment variables
