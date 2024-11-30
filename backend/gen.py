import mysql.connector
import random
from datetime import datetime, timedelta
import copy
import time
connection = mysql.connector.connect(
    host="localhost",        # Database host
    user="Manager",    # Your MySQL username
    password="Manager123",# Your MySQL password
    database="dbassignment" # Your database name
)
cursor = connection.cursor()

make_treatrecord = []
has_medicine = []
treatment_record = []
random.seed()
risk1 = ["00000002", "00000003", "00000006", "00000009", "00000011", "00000014", "00000017", "00000019", "00000020", "00000021", "00000028", "00000029", "00000030", "00000031", "00000032", "00000033", "00000036", "00000039", "00000040", "00000041", "00000044", "00000048"]
risk2 = ["00000004", "00000007", "00000008", "00000012", "00000013", "00000016", "00000018", "00000022", "00000024", "00000025", "00000027", "00000034", "00000037", "00000042", "00000043", "00000045", "00000046", "00000049"]
medicine1 = [1, 2, 6, 7]
medicine2 = [2, 3, 4, 6, 7]
medicine3 = [3, 4, 5, 6]
res1 = ['Binh thuong', 'Da binh phuc', 'Co chuyen nang']
res2 = ['Co cai thien', 'Co chuyen nang']
res3 = ['Co cai thien', 'Co chuyen nang', 'Nguy cap']

def random_datetime(start_date, end_date, days_offset=0):
    # Ensure inputs are datetime objects
    if isinstance(start_date, str):
        start_date = datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S")
    if isinstance(end_date, str):
        end_date = datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S")

    if end_date < start_date:
        raise ValueError("end_date must be after start_date")
    
    delta = end_date - start_date
    random_seconds1 = random.randint(0, int(delta.total_seconds()))
    random_seconds2 = random.randint(0, days_offset * 24 * 60 * 60)  # Offset in seconds
    random_seconds3 = random.randint(0, days_offset * 24 * 60 * 60)  # Offset in seconds
    random_seconds4 = random.randint(0, days_offset * 24 * 60 * 60)  # Offset in seconds

    random_date1 = start_date + timedelta(seconds=random_seconds1)
    random_date2 = random_date1 + timedelta(seconds=random_seconds2)
    random_date3 = random_date2 + timedelta(seconds=random_seconds3)
    random_date4 = random_date3 + timedelta(seconds=random_seconds4)

    return random_date1, random_date2, random_date3, random_date4

def compare_datetime(d2, d3):
    # Ensure both are datetime objects
    if isinstance(d2, str):
        d2 = datetime.strptime(d2, "%Y-%m-%d %H:%M:%S")
    if isinstance(d3, str):
        d3 = datetime.strptime(d3, "%Y-%m-%d %H:%M:%S")
    # Return True if d3 is after d2
    return d3 > d2

for pnum in range (20000, 60000):
    start_date = "2024-01-01 00:00:00"
    end_date = "2024-12-31 23:59:59"
    d1, d2, d3, d4 = random_datetime(start_date, end_date, random.randint(3,5))

    for treat_id in range(1,3):
        doctor_id = f'{random.randint(1, 5):04d}'
        pid = f'{pnum:08d}'
        make_treatrecord.append((pid, treat_id, doctor_id))
        if pid in risk1:
            m1 = random.choice(medicine1)
            m2 = random.choice(medicine1)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append((pid, treat_id, m1, random.randint(1,10)))
            has_medicine.append((pid, treat_id, m2, random.randint(1,10)))
            if treat_id == 1:
                treatment_record.append((pid, treat_id, d1,d2, random.choice(res1)))
            else:
                treatment_record.append((pid, treat_id, d3, d4, random.choice(res1)))               
        elif pid in risk2:
            m1 = random.choice(medicine2)
            m2 = random.choice(medicine2)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append((pid, treat_id, m1, random.randint(1,10)))
            has_medicine.append((pid, treat_id, m2, random.randint(1,10)))
            if treat_id == 1:
                treatment_record.append(( pid ,  treat_id ,  d1 ,  d2 ,  random.choice(res2) ))
            else:
                treatment_record.append((pid, treat_id, d3,  d4 ,  random.choice(res2) ))     
        else:
            m1 = random.choice(medicine3)
            m2 = random.choice(medicine3)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append((pid, treat_id, m1, random.randint(1,10)))
            has_medicine.append(( pid ,  treat_id ,  m2 ,  random.randint(1,10) ))
            if treat_id == 1:
                treatment_record.append(( pid ,  treat_id ,  d1 ,  d2 ,  random.choice(res3) ))
            else:
                treatment_record.append(( pid ,  treat_id ,  d3 ,  d4 ,  random.choice(res3) ))     

insert_patient = """
    INSERT INTO treatment_record (PNUM, TREAT_ID, START_DATE, END_DATE, RESULT)
    VALUES (%s, %s, %s, %s, %s)
"""
try:
    start_time = time.time()
    cursor.executemany(insert_patient, treatment_record)
    connection.commit()  # Commit the transaction
    end_time = time.time()
    print(f"{cursor.rowcount} records inserted successfully into PATIENT table.")
    runtime = end_time - start_time
    print(f"Insert executed in {runtime:.4f} seconds.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    connection.rollback()  # Roll back the transaction on error

insert_patient = """
    INSERT INTO make_treatrecord (PNUM, TREAT_ID, DOCTOR_ID) 
    VALUES (%s, %s, %s)
"""
try:
    start_time = time.time()
    cursor.executemany(insert_patient, make_treatrecord)
    connection.commit()  # Commit the transaction
    end_time = time.time()
    print(f"{cursor.rowcount} records inserted successfully into PATIENT table.")
    runtime = end_time - start_time
    print(f"Insert executed in {runtime:.4f} seconds.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    connection.rollback()  # Roll back the transaction on error

insert_patient = """
    INSERT INTO has_medicine (PNUM, TREAT_ID, MCODE, QUANTITY) 
    VALUES (%s, %s, %s, %s)
"""
try:
    start_time = time.time()
    cursor.executemany(insert_patient, has_medicine)
    connection.commit()  # Commit the transaction
    end_time = time.time()
    print(f"{cursor.rowcount} records inserted successfully into PATIENT table.")
    runtime = end_time - start_time
    print(f"Insert executed in {runtime:.4f} seconds.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    connection.rollback()  # Roll back the transaction on error

connection.close()