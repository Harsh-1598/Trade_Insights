import pandas as pd
import yfinance as yf

# Load datasets
pnl = pd.read_excel(r'S_pnl.xlsx')
order_history = pd.read_excel(r'S_order.xlsx')

# Create symbol mapping from order history (Symbol to Stock name)
symbol_to_name = dict(zip(order_history['Symbol'], order_history['Stock name']))
name_to_symbol = {v: k for k, v in symbol_to_name.items()}

# Get unique symbols from order history
unique_symbols = order_history['Symbol'].unique()

# Fetch sector data
sector_data = {}
for symbol in unique_symbols:
    try:
        ticker = yf.Ticker(f"{symbol}.NS")
        info = ticker.info
        sector_data[symbol] = (
            info.get('sector', 'Unknown'),
            info.get('industry', 'Unknown')
        )
        print(f"Fetched data for {symbol}: {sector_data[symbol][0]}")
    except Exception as e:
        print(f"Error fetching {symbol}: {str(e)}")
        sector_data[symbol] = ('Unknown', 'Unknown')

# Add to order history
order_history['Sector'] = order_history['Symbol'].map(lambda x: sector_data.get(x, ('Unknown', 'Unknown'))[0])
order_history['Industry'] = order_history['Symbol'].map(lambda x: sector_data.get(x, ('Unknown', 'Unknown'))[1])

# Add to PnL - first extract symbol from stock name
pnl['Symbol'] = pnl['Stock name'].map(name_to_symbol)
pnl['Sector'] = pnl['Symbol'].map(lambda x: sector_data.get(x, ('Unknown', 'Unknown'))[0])
pnl['Industry'] = pnl['Symbol'].map(lambda x: sector_data.get(x, ('Unknown', 'Unknown'))[1])

# Save back to the SAME files (overwriting them)
order_history.to_excel('S_order.xlsx', index=False)
pnl.to_excel('S_pnl.xlsx', index=False)

print("\nSector and Industry data added successfully to original files!")
print(f"Updated S_order.xlsx with {len(order_history)} rows")
print(f"Updated S_pnl.xlsx with {len(pnl)} rows")