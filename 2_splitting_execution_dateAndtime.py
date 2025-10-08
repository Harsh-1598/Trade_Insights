import pandas as pd

# Dataset load karo
order_history = pd.read_excel(r'S_order.xlsx')

# 1. Convert 'Execution date and time' to datetime
order_history['Execution DateTime'] = pd.to_datetime(order_history['Execution DateTime'])

# 2. Extract Date and Time into separate columns
order_history['Execution Date'] = order_history['Execution DateTime'].dt.date  # Only date
order_history['Execution Time'] = order_history['Execution DateTime'].dt.time  # Only time

# 3. Drop the original column (optional)
order_history.drop('Execution date and time', axis=1, inplace=True)

# 4. Save updated file
order_history.to_excel('S_order.xlsx', index=False)

print("Execution Date & Time alag ho gaya! Check 'S_order.xlsx'")