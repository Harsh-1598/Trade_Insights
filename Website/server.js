// server.js (polling fallback, ESM)
import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import axios from "axios";
import { SmartAPI } from "smartapi-javascript";
import { authenticator } from "otplib";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const API_KEY = process.env.API_KEY;
const CLIENT_CODE = process.env.CLIENT_CODE;
const PASSWORD = process.env.PASSWORD;
const TOTP_SECRET = process.env.TOTP_SECRET; 

const smart_api = new SmartAPI({ api_key: API_KEY });

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: "*" } });

let jwtToken = null;       // long token you already get
let pollInterval = 5000;   // 5 seconds to avoid rate limiting (increased from 3s)
let pollTimer = null;

// login and get session (jwt)
async function login() {
  const totp = authenticator.generate(TOTP_SECRET);
  const session = await smart_api.generateSession(CLIENT_CODE, PASSWORD, totp);
  // SDK returns jwt-like token in session.data - use that for REST Authorization
  jwtToken = session.data?.jwtToken || session.data?.jwt || session.data?.token;
  console.log("✅ Logged in. JWT token (short):", String(jwtToken).slice(0, 20) + "...");
  return jwtToken;
}

// NSE Token to symbol mapping for AngelOne API
const TOKEN_SYMBOL_MAP = {
  // Indices
  "26000": { symbol: "NIFTY", display: "Nifty 50", exchange: "NSE" },
  "99926000": { symbol: "NIFTY", display: "Nifty 50", exchange: "NSE" },
  "99926009": { symbol: "BANKNIFTY", display: "Bank Nifty", exchange: "NSE" },
  
  // Top NSE Stocks
  "2885": { symbol: "RELIANCE", display: "Reliance Industries Ltd.", exchange: "NSE" },
  "11536": { symbol: "TCS", display: "Tata Consultancy Services Ltd.", exchange: "NSE" },
  "1333": { symbol: "HDFCBANK", display: "HDFC Bank Ltd.", exchange: "NSE" },
  "500209": { symbol: "INFY", display: "Infosys Ltd.", exchange: "NSE" },
  "4963": { symbol: "ICICIBANK", display: "ICICI Bank Ltd.", exchange: "NSE" },
  "1922": { symbol: "KOTAKBANK", display: "Kotak Mahindra Bank Ltd.", exchange: "NSE" },
  "467": { symbol: "LT", display: "Larsen & Toubro Ltd.", exchange: "NSE" },
  "1394": { symbol: "HINDUNILVR", display: "Hindustan Unilever Ltd.", exchange: "NSE" },
  "694": { symbol: "ASIANPAINT", display: "Asian Paints Ltd.", exchange: "NSE" },
  "7229": { symbol: "HCLTECH", display: "HCL Technologies Ltd.", exchange: "NSE" },
  "10604": { symbol: "BHARTIARTL", display: "Bharti Airtel Ltd.", exchange: "NSE" },
  "10999": { symbol: "MARUTI", display: "Maruti Suzuki India Ltd.", exchange: "NSE" },
  "857": { symbol: "SUNPHARMA", display: "Sun Pharmaceutical Industries Ltd.", exchange: "NSE" },
  "500114": { symbol: "TITAN", display: "Titan Company Ltd.", exchange: "NSE" },
  "5900": { symbol: "AXISBANK", display: "Axis Bank Ltd.", exchange: "NSE" },
  "4598": { symbol: "NESTLEIND", display: "Nestle India Ltd.", exchange: "NSE" },
  "8840": { symbol: "TATAMOTORS", display: "Tata Motors Ltd.", exchange: "NSE" },
  "11287": { symbol: "WIPRO", display: "Wipro Ltd.", exchange: "NSE" },
  "14977": { symbol: "POWERGRID", display: "Power Grid Corporation of India Ltd.", exchange: "NSE" },
  "3045": { symbol: "SBIN", display: "State Bank of India", exchange: "NSE" },
  "317": { symbol: "BAJFINANCE", display: "Bajaj Finance Ltd.", exchange: "NSE" },
  "16669": { symbol: "BAJAJFINSV", display: "Bajaj Finserv Ltd.", exchange: "NSE" },
  "29536": { symbol: "ULTRACEMCO", display: "UltraTech Cement Ltd.", exchange: "NSE" },
  "11723": { symbol: "JSWSTEEL", display: "JSW Steel Ltd.", exchange: "NSE" },
  "25": { symbol: "ADANIENT", display: "Adani Enterprises Ltd.", exchange: "NSE" },
  "15083": { symbol: "ADANIPORTS", display: "Adani Ports and Special Economic Zone Ltd.", exchange: "NSE" },
  "1041": { symbol: "ONGC", display: "Oil and Natural Gas Corporation Ltd.", exchange: "NSE" },
  "5210": { symbol: "COALINDIA", display: "Coal India Ltd.", exchange: "NSE" },
  "11630": { symbol: "NTPC", display: "NTPC Ltd.", exchange: "NSE" },
  "4244": { symbol: "ITC", display: "ITC Ltd.", exchange: "NSE" },
  "910": { symbol: "DRREDDY", display: "Dr. Reddy's Laboratories Ltd.", exchange: "NSE" },
  "4151": { symbol: "CIPLA", display: "Cipla Ltd.", exchange: "NSE" },
  "3456": { symbol: "HEROMOTOCO", display: "Hero MotoCorp Ltd.", exchange: "NSE" },
  "772": { symbol: "EICHERMOT", display: "Eicher Motors Ltd.", exchange: "NSE" },
  "18921": { symbol: "M&M", display: "Mahindra & Mahindra Ltd.", exchange: "NSE" },
  "314": { symbol: "BAJAJ-AUTO", display: "Bajaj Auto Ltd.", exchange: "NSE" },
  "11239": { symbol: "TVSMOTOR", display: "TVS Motor Company Ltd.", exchange: "NSE" },
  "14766": { symbol: "ASHOKLEY", display: "Ashok Leyland Ltd.", exchange: "NSE" },
  "10099": { symbol: "VEDL", display: "Vedanta Ltd.", exchange: "NSE" },
  "1363": { symbol: "HINDALCO", display: "Hindalco Industries Ltd.", exchange: "NSE" },
  "3499": { symbol: "TATASTEEL", display: "Tata Steel Ltd.", exchange: "NSE" },
  "3150": { symbol: "GRASIM", display: "Grasim Industries Ltd.", exchange: "NSE" },
  "553": { symbol: "AMBUJACEM", display: "Ambuja Cements Ltd.", exchange: "NSE" },
  "20329": { symbol: "SHREECEM", display: "Shree Cement Ltd.", exchange: "NSE" },
  "21614": { symbol: "DABUR", display: "Dabur India Ltd.", exchange: "NSE" },
  "547": { symbol: "BRITANNIA", display: "Britannia Industries Ltd.", exchange: "NSE" },
  "10940": { symbol: "GODREJCP", display: "Godrej Consumer Products Ltd.", exchange: "NSE" },
  "4248": { symbol: "COLPAL", display: "Colgate Palmolive (India) Ltd.", exchange: "NSE" },
  "6705": { symbol: "PIDILITIND", display: "Pidilite Industries Ltd.", exchange: "NSE" },
  "13630": { symbol: "BERGEPAINT", display: "Berger Paints India Ltd.", exchange: "NSE" },
  
  // BSE Stocks
  "500463": { symbol: "BBOX", display: "Black Box Limited", exchange: "BSE" },
};

// Symbol alias mapping (for different symbol formats)
const SYMBOL_ALIAS_MAP = {
  "INFOSYS": "INFY",
  "HDFC BANK": "HDFCBANK",
  "L&T": "LT",
  "M&M": "M&M",
  "BAJAJ-AUTO": "BAJAJ-AUTO",
};

// Poll Angel quote endpoint for tokens you want
async function pollQuotes(exchangeTokensMap = { NSE: ["26000", "50000", "26009"] }) {
  if (!jwtToken) {
    console.warn("No jwt token, skipping poll");
    return;
  }

  const url = "https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote";
  const headers = {
    "X-PrivateKey": API_KEY,
    "Accept": "application/json",
    "X-SourceID": "WEB",
    "X-ClientLocalIP": "127.0.0.1",
    "X-ClientPublicIP": "127.0.0.1",
    "X-MACAddress": "00:00:00:00:00:00",
    "X-UserType": "USER",
    "Authorization": `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };

  const body = {
    mode: "LTP",
    exchangeTokens: exchangeTokensMap,
  };

  try {
    const resp = await axios.post(url, body, { headers, timeout: 5000 });
    
    // AngelOne API response structure: { success: true, data: { NSE: [...], BSE: [...] } }
    const responseData = resp.data?.data || resp.data;
    
    // Transform the data to include tradingsymbol for easier frontend consumption
    const transformedData = {};
    
    if (responseData && typeof responseData === "object") {
      Object.keys(responseData).forEach((exchange) => {
        const arr = responseData[exchange];
        if (Array.isArray(arr)) {
          transformedData[exchange] = arr.map((item) => {
            // Map token to symbol if we have it in our map
            const token = String(item.symbolToken || item.token || "");
            const tokenData = TOKEN_SYMBOL_MAP[token] || null;
            const mappedSymbol = tokenData ? tokenData.symbol : null;
            
            // Get the symbol from API response or use mapped symbol
            const apiSymbol = item.tradingsymbol || item.symbol || item.name;
            
            // Use mapped symbol if available, otherwise use API symbol
            // Also check alias map for symbol variations
            let finalSymbol = mappedSymbol || apiSymbol;
            if (SYMBOL_ALIAS_MAP[finalSymbol]) {
              finalSymbol = SYMBOL_ALIAS_MAP[finalSymbol];
            }
            
            return {
              ...item,
              symbol: finalSymbol,
              tradingsymbol: finalSymbol,
              symbolToken: token,
              lastTradedPrice: item.lastTradedPrice || item.ltp || item.price,
              displayName: tokenData ? tokenData.display : null,
              exchange: tokenData ? tokenData.exchange : exchange,
            };
          });
        }
      });
    }
    
    // Log summary of updates (reduced logging to avoid spam)
    if (Object.keys(transformedData).length > 0) {
      const totalUpdates = Object.values(transformedData).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
      if (totalUpdates > 0) {
        console.log(`📊 Emitting ${totalUpdates} market updates`);
      }
    }
    
    // Emit the transformed data
    io.emit("market-tick", transformedData);
  } catch (err) {
    console.error("Polling error:", err.response?.data || err.message);
    // If JWT expired, attempt relogin
    if (err.response?.status === 401) {
      console.log("JWT probably expired, re-authenticating...");
      try {
        await login();
      } catch (e) {
        console.error("Relogin failed:", e.message || e);
      }
    }
  }
}

// Split tokens into batches to avoid API limit
function splitIntoBatches(array, batchSize = 10) {
  const batches = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }
  return batches;
}

async function pollAllBatches() {
  // Group tokens by exchange
  const tokensByExchange = {};
  Object.entries(TOKEN_SYMBOL_MAP).forEach(([token, data]) => {
    const exchange = data.exchange || 'NSE';
    if (!tokensByExchange[exchange]) {
      tokensByExchange[exchange] = [];
    }
    tokensByExchange[exchange].push(token);
  });
  
  // Poll each exchange in batches
  for (const [exchange, tokens] of Object.entries(tokensByExchange)) {
    const batches = splitIntoBatches(tokens, 10); // API limit is ~10-20 tokens per request
    
    for (const batch of batches) {
      await pollQuotes({ [exchange]: batch });
      // Increased delay between batches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }
}

async function startPolling() {
  // initial login
  await login();
  // Poll for all stocks - get all token IDs from the mapping
  const allTokens = Object.keys(TOKEN_SYMBOL_MAP);
  const exchangeCounts = {};
  Object.values(TOKEN_SYMBOL_MAP).forEach(d => {
    exchangeCounts[d.exchange] = (exchangeCounts[d.exchange] || 0) + 1;
  });
  const stockSymbols = Object.values(TOKEN_SYMBOL_MAP).map(d => d.symbol).join(", ");
  console.log(`📊 Polling for ${allTokens.length} instruments across ${Object.keys(exchangeCounts).join(', ')}`);
  console.log(`📈 Exchange breakdown:`, exchangeCounts);
  console.log(`📈 Stocks: ${stockSymbols}`);
  // start immediate poll and then interval
  await pollAllBatches();
  pollTimer = setInterval(() => pollAllBatches(), pollInterval);
}

io.on("connection", (socket) => {
  console.log("Frontend connected:", socket.id);
  // allow client to request token list / interval changes
  socket.on("subscribe", ({ tokens, intervalMs }) => {
    if (tokens) {
      // tokens expected as { NSE: ["3045", ...], BSE: [...] }
      // restart polling with new tokens
      clearInterval(pollTimer);
      pollInterval = intervalMs || pollInterval;
      pollTimer = setInterval(() => pollQuotes(tokens), pollInterval);
    }
  });
});

app.get("/", (req, res) => res.send("Polling backend is running"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await startPolling();
  } catch (e) {
    console.error("Startup error:", e.message || e);
  }
});
