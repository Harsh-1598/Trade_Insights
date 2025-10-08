import pandas as pd
from datetime import datetime

# Load PnL dataset
pnl = pd.read_excel('Stocks_PnL_Report_With_Sectors_Yahoo.xlsx')

# Convert dates to datetime
pnl['Buy date'] = pd.to_datetime(pnl['Buy date'], dayfirst=True)
pnl['Sell date'] = pd.to_datetime(pnl['Sell date'], dayfirst=True)

# 1. Calculate Holding Period (in days)
pnl['Holding Period (Days)'] = (pnl['Sell date'] - pnl['Buy date']).dt.days

# 2. Calculate Realized PnL % (Profit/Buy Value * 100)
pnl['Realized PnL %'] = (pnl['Realised P&L'] / pnl['Buy value']) * 100

# 3. Round off decimals
pnl['Realized PnL %'] = pnl['Realized PnL %'].round(2)

# Save updated file
# pnl.to_excel('Stocks_PnL_Report_With_Holding_Period.xlsx', index=False)

print("Holding Period & Realized PnL % added successfully!")
print("Check 'Stocks_PnL_Report_With_Holding_Period.xlsx'")