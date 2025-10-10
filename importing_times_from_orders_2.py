import pandas as pd

# Load datasets
pnl = pd.read_excel(r'S_pnl.xlsx')
order_history = pd.read_excel(r'S_order.xlsx')

# Convert to datetime
order_history['Execution DateTime'] = pd.to_datetime(order_history['Execution DateTime'])
pnl['Buy date'] = pd.to_datetime(pnl['Buy date']).dt.date
pnl['Sell date'] = pd.to_datetime(pnl['Sell date']).dt.date

# Function to validate market hours (9:15 AM to 3:30 PM)
def is_market_time(dt):
    if not pd.isna(dt):
        time = dt.time()
        return (time >= pd.Timestamp('09:15:00').time()) & (time <= pd.Timestamp('15:30:00').time())
    return False

# Match Buy/Sell Times from Order History
def get_times_from_order_history(pnl_row, order_df):
    stock_name = pnl_row['Stock name']
    isin = pnl_row['ISIN']
    quantity = pnl_row['Quantity']
    buy_date = pnl_row['Buy date']
    sell_date = pnl_row['Sell date']
    
    # Filter relevant orders
    stock_orders = order_df[
        (order_df['Stock name'] == stock_name) & 
        (order_df['ISIN'] == isin)
    ].copy()
    
    # Case 1: Intraday (Buy & Sell same day)
    if buy_date == sell_date:
        buy_order = stock_orders[
            (stock_orders['Execution DateTime'].dt.date == buy_date) &
            (stock_orders['Type'] == 'BUY') &
            (stock_orders['Execution DateTime'].apply(is_market_time))
        ].sort_values('Execution DateTime').head(1)
        
        sell_order = stock_orders[
            (stock_orders['Execution DateTime'].dt.date == sell_date) &
            (stock_orders['Type'] == 'SELL') &
            (stock_orders['Execution DateTime'].apply(is_market_time))
        ].sort_values('Execution DateTime').tail(1)
    
    # Case 2: Delivery (Different dates)
    else:
        buy_order = stock_orders[
            (stock_orders['Execution DateTime'].dt.date == buy_date) &
            (stock_orders['Type'] == 'BUY') &
            (stock_orders['Execution DateTime'].apply(is_market_time))
        ].sort_values('Execution DateTime').head(1)
        
        sell_order = stock_orders[
            (stock_orders['Execution DateTime'].dt.date == sell_date) &
            (stock_orders['Type'] == 'SELL') &
            (stock_orders['Execution DateTime'].apply(is_market_time))
        ].sort_values('Execution DateTime').tail(1)
    
    # Extract times
    buy_time = buy_order['Execution DateTime'].iloc[0].time() if not buy_order.empty else pd.Timestamp('09:15:00').time()
    sell_time = sell_order['Execution DateTime'].iloc[0].time() if not sell_order.empty else pd.Timestamp('15:30:00').time()
    
    return buy_time, sell_time

# Apply to PnL
pnl[['Buy Time', 'Sell Time']] = pnl.apply(
    lambda row: pd.Series(get_times_from_order_history(row, order_history)), 
    axis=1
)

# Save
pnl.to_excel('S_pnl.xlsx', index=False)
print("Done! File saved with accurate buy/sell times (9:15 AM - 3:30 PM).")