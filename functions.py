from gspread_dataframe import set_with_dataframe

def record_time(df, worksheet, club_name, lap_time, position):
    series = df[df['team'] == club_name].copy()
    series[position] = lap_time
    df[df['team'] == club_name] = series
    set_with_dataframe(worksheet,df)
    return df

def create_ranking(df2, worksheet2):
    
    return df2