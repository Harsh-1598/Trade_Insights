// Comprehensive verification script
// This script will verify ALL stocks and show which ones are receiving live data correctly

import { io } from "socket.io-client";

// All stocks from marketData.js
const ALL_STOCKS = [
  { symbol: 'RELIANCE', displayName: 'RELIANCE', apiSymbol: 'RELIANCE', token: '2885' },
  { symbol: 'TCS', displayName: 'TCS', apiSymbol: 'TCS', token: '11536' },
  { symbol: 'HDFC BANK', displayName: 'HDFC BANK', apiSymbol: 'HDFCBANK', token: '1333' },
  { symbol: 'INFOSYS', displayName: 'INFOSYS', apiSymbol: 'INFY', token: '4081' },
  { symbol: 'ICICIBANK', displayName: 'ICICIBANK', apiSymbol: 'ICICIBANK', token: '4963' },
  { symbol: 'KOTAKBANK', displayName: 'KOTAKBANK', apiSymbol: 'KOTAKBANK', token: '1922' },
  { symbol: 'L&T', displayName: 'L&T', apiSymbol: 'LT', token: '467' },
  { symbol: 'HINDUNILVR', displayName: 'HINDUNILVR', apiSymbol: 'HINDUNILVR', token: '1394' },
  { symbol: 'ASIANPAINT', displayName: 'ASIANPAINT', apiSymbol: 'ASIANPAINT', token: '694' },
  { symbol: 'HCLTECH', displayName: 'HCLTECH', apiSymbol: 'HCLTECH', token: '7229' },
  { symbol: 'BHARTIARTL', displayName: 'BHARTIARTL', apiSymbol: 'BHARTIARTL', token: '271' },
  { symbol: 'MARUTI', displayName: 'MARUTI', apiSymbol: 'MARUTI', token: '10999' },
  { symbol: 'SUNPHARMA', displayName: 'SUNPHARMA', apiSymbol: 'SUNPHARMA', token: '857' },
  { symbol: 'TITAN', displayName: 'TITAN', apiSymbol: 'TITAN', token: '11543' },
  { symbol: 'AXISBANK', displayName: 'AXISBANK', apiSymbol: 'AXISBANK', token: '5900' },
  { symbol: 'NESTLEIND', displayName: 'NESTLEIND', apiSymbol: 'NESTLEIND', token: '4598' },
  { symbol: 'TATAMOTORS', displayName: 'TATAMOTORS', apiSymbol: 'TATAMOTORS', token: '8840' },
  { symbol: 'WIPRO', displayName: 'WIPRO', apiSymbol: 'WIPRO', token: '11287' },
  { symbol: 'POWERGRID', displayName: 'POWERGRID', apiSymbol: 'POWERGRID', token: '14977' },
  { symbol: 'SBIN', displayName: 'SBIN', apiSymbol: 'SBIN', token: '3045' },
  { symbol: 'BAJFINANCE', displayName: 'BAJFINANCE', apiSymbol: 'BAJFINANCE', token: '317' },
  { symbol: 'BAJAJFINSV', displayName: 'BAJAJFINSV', apiSymbol: 'BAJAJFINSV', token: '16669' },
  { symbol: 'ULTRACEMCO', displayName: 'ULTRACEMCO', apiSymbol: 'ULTRACEMCO', token: '29536' },
  { symbol: 'JSWSTEEL', displayName: 'JSWSTEEL', apiSymbol: 'JSWSTEEL', token: '11723' },
  { symbol: 'ADANIENT', displayName: 'ADANIENT', apiSymbol: 'ADANIENT', token: '25' },
  { symbol: 'ADANIPORTS', displayName: 'ADANIPORTS', apiSymbol: 'ADANIPORTS', token: '15083' },
  { symbol: 'ONGC', displayName: 'ONGC', apiSymbol: 'ONGC', token: '1041' },
  { symbol: 'COALINDIA', displayName: 'COALINDIA', apiSymbol: 'COALINDIA', token: '5210' },
  { symbol: 'NTPC', displayName: 'NTPC', apiSymbol: 'NTPC', token: '11630' },
  { symbol: 'ITC', displayName: 'ITC', apiSymbol: 'ITC', token: '4244' },
  { symbol: 'DIVISLAB', displayName: 'DIVISLAB', apiSymbol: 'DIVISLAB', token: '910' },
  { symbol: 'CIPLA', displayName: 'CIPLA', apiSymbol: 'CIPLA', token: '4151' },
  { symbol: 'LUPIN', displayName: 'LUPIN', apiSymbol: 'LUPIN', token: '11532' },
  { symbol: 'HEROMOTOCO', displayName: 'HEROMOTOCO', apiSymbol: 'HEROMOTOCO', token: '3456' },
  { symbol: 'EICHERMOT', displayName: 'EICHERMOT', apiSymbol: 'EICHERMOT', token: '772' },
  { symbol: 'M&M', displayName: 'M&M', apiSymbol: 'M&M', token: '18921' },
  { symbol: 'BAJAJ-AUTO', displayName: 'BAJAJ-AUTO', apiSymbol: 'BAJAJ-AUTO', token: '314' },
  { symbol: 'TVSMOTOR', displayName: 'TVSMOTOR', apiSymbol: 'TVSMOTOR', token: '11239' },
  { symbol: 'ASHOKLEY', displayName: 'ASHOKLEY', apiSymbol: 'ASHOKLEY', token: '14766' },
  { symbol: 'VEDL', displayName: 'VEDL', apiSymbol: 'VEDL', token: '10099' },
  { symbol: 'HINDALCO', displayName: 'HINDALCO', apiSymbol: 'HINDALCO', token: '1363' },
  { symbol: 'TATASTEEL', displayName: 'TATASTEEL', apiSymbol: 'TATASTEEL', token: '3499' },
  { symbol: 'GRASIM', displayName: 'GRASIM', apiSymbol: 'GRASIM', token: '3150' },
  { symbol: 'AMBUJACEM', displayName: 'AMBUJACEM', apiSymbol: 'AMBUJACEM', token: '553' },
  { symbol: 'SHREECEM', displayName: 'SHREECEM', apiSymbol: 'SHREECEM', token: '20329' },
  { symbol: 'DABUR', displayName: 'DABUR', apiSymbol: 'DABUR', token: '21614' },
  { symbol: 'BRITANNIA', displayName: 'BRITANNIA', apiSymbol: 'BRITANNIA', token: '547' },
  { symbol: 'GODREJCP', displayName: 'GODREJCP', apiSymbol: 'GODREJCP', token: '10940' },
  { symbol: 'COLPAL', displayName: 'COLPAL', apiSymbol: 'COLPAL', token: '4248' },
  { symbol: 'PIDILITIND', displayName: 'PIDILITIND', apiSymbol: 'PIDILITIND', token: '6705' },
  { symbol: 'BERGEPAINT', displayName: 'BERGEPAINT', apiSymbol: 'BERGEPAINT', token: '13630' },
];

const INDICES = [
  { symbol: 'NIFTY', token: '26000' },
  { symbol: 'SENSEX', token: '50000' },
  { symbol: 'BANKNIFTY', token: '26009' },
];

console.log("🔍 COMPREHENSIVE STOCK DATA VERIFICATION\n");
console.log("=" .repeat(100));
console.log("\nConnecting to backend server at http://localhost:3000...\n");

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const receivedData = new Map();
let updateCount = 0;
const MAX_UPDATES = 3; // Collect 3 rounds of updates

socket.on("connect", () => {
  console.log("✅ Connected to backend:", socket.id);
  console.log("⏳ Collecting data for verification (this will take ~15 seconds)...\n");
});

socket.on("market-tick", (data) => {
  updateCount++;
  
  // Process data
  Object.keys(data).forEach((exchange) => {
    const arr = data[exchange];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        const symbol = item.tradingsymbol || item.symbol;
        const price = Number(item.lastTradedPrice || item.ltp || item.price);
        const token = String(item.symbolToken || item.token || "");
        
        if (symbol && price && price > 0) {
          if (!receivedData.has(symbol)) {
            receivedData.set(symbol, {
              symbol,
              token,
              prices: [],
              count: 0
            });
          }
          
          const stockData = receivedData.get(symbol);
          stockData.prices.push(price);
          stockData.count++;
        }
      });
    }
  });
  
  // After collecting enough samples, show results
  if (updateCount === MAX_UPDATES) {
    console.log("\n" + "=".repeat(100));
    console.log("📊 VERIFICATION RESULTS");
    console.log("=".repeat(100));
    
    console.log("\n✅ STOCKS RECEIVING LIVE DATA:");
    console.log("-".repeat(100));
    console.log("DISPLAY NAME".padEnd(20) + "API SYMBOL".padEnd(20) + "TOKEN".padEnd(10) + "LATEST PRICE".padEnd(15) + "STATUS");
    console.log("-".repeat(100));
    
    let receivedCount = 0;
    let missingCount = 0;
    
    ALL_STOCKS.forEach(stock => {
      const data = receivedData.get(stock.apiSymbol);
      if (data && data.prices.length > 0) {
        const latestPrice = data.prices[data.prices.length - 1];
        const avgPrice = (data.prices.reduce((a, b) => a + b, 0) / data.prices.length).toFixed(2);
        console.log(
          stock.displayName.padEnd(20) +
          stock.apiSymbol.padEnd(20) +
          stock.token.padEnd(10) +
          `₹${latestPrice.toFixed(2)}`.padEnd(15) +
          `✓ OK (${data.count} updates)`
        );
        receivedCount++;
      }
    });
    
    console.log("\n❌ STOCKS NOT RECEIVING LIVE DATA:");
    console.log("-".repeat(100));
    
    ALL_STOCKS.forEach(stock => {
      const data = receivedData.get(stock.apiSymbol);
      if (!data || data.prices.length === 0) {
        console.log(
          stock.displayName.padEnd(20) +
          stock.apiSymbol.padEnd(20) +
          stock.token.padEnd(10) +
          "NO DATA".padEnd(15) +
          "✗ MISSING"
        );
        missingCount++;
      }
    });
    
    console.log("\n" + "=".repeat(100));
    console.log("📈 INDICES STATUS:");
    console.log("-".repeat(100));
    
    INDICES.forEach(index => {
      const data = receivedData.get(index.symbol);
      if (data && data.prices.length > 0) {
        const latestPrice = data.prices[data.prices.length - 1];
        console.log(
          index.symbol.padEnd(20) +
          index.token.padEnd(10) +
          `₹${latestPrice.toFixed(2)}`.padEnd(15) +
          `✓ OK (${data.count} updates)`
        );
      } else {
        console.log(
          index.symbol.padEnd(20) +
          index.token.padEnd(10) +
          "NO DATA".padEnd(15) +
          "✗ MISSING"
        );
      }
    });
    
    console.log("\n" + "=".repeat(100));
    console.log("📊 SUMMARY:");
    console.log("-".repeat(100));
    console.log(`Total Stocks: ${ALL_STOCKS.length}`);
    console.log(`Receiving Data: ${receivedCount} (${((receivedCount/ALL_STOCKS.length)*100).toFixed(1)}%)`);
    console.log(`Missing Data: ${missingCount} (${((missingCount/ALL_STOCKS.length)*100).toFixed(1)}%)`);
    console.log(`Total Unique Symbols Received: ${receivedData.size}`);
    
    console.log("\n" + "=".repeat(100));
    console.log("✅ Verification complete!\n");
    
    socket.disconnect();
    process.exit(0);
  }
});

socket.on("disconnect", () => {
  console.warn("\n❌ Disconnected from backend");
});

// Timeout after 30 seconds
setTimeout(() => {
  console.log("\n⏱️  Test timeout reached");
  console.log(`Collected ${updateCount} updates with ${receivedData.size} unique symbols`);
  socket.disconnect();
  process.exit(0);
}, 30000);
