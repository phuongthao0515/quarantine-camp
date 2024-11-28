import random
from datetime import datetime, timedelta

make_treatrecord = ["INSERT INTO make_treatrecord (PNUM, TREAT_ID, DOCTOR_ID) VALUES"]
has_medicine = ["INSERT INTO has_medicine (PNUM, TREAT_ID, MCODE, QUANTITY) VALUES"]
treatment_record = ["INSERT INTO treatment_record (PNUM, TREAT_ID, START_DATE, END_DATE, RESULT) VALUES"]

risk1 = ["00000002", "00000003", "00000006", "00000009", "00000011", "00000014", "00000017", "00000019", "00000020", "00000021", "00000028", "00000029", "00000030", "00000031", "00000032", "00000033", "00000036", "00000039", "00000040", "00000041", "00000044", "00000048"]
risk2 = ["00000004", "00000007", "00000008", "00000012", "00000013", "00000016", "00000018", "00000022", "00000024", "00000025", "00000027", "00000034", "00000037", "00000042", "00000043", "00000045", "00000046", "00000049"]
medicine1 = [1, 2, 6, 7]
medicine2 = [2, 3, 4, 6, 7]
medicine3 = [3, 4, 5, 6]
res1 = ['Binh thuong', 'Da binh phuc', 'Co chuyen nang']
res2 = ['Co cai thien', 'Co chuyen nang']
res3 = ['Co cai thien', 'Co chuyen nang', 'Nguy cap']

def random_datetime(start, end, delta_days):
    """
    Generate two random datetimes with a specified distance between them.
    
    :param start: Start datetime as a string in 'yyyy-mm-dd hh:mm:ss' format.
    :param end: End datetime as a string in 'yyyy-mm-dd hh:mm:ss' format.
    :param delta_days: The distance in days between the two datetimes.
    :return: Two random datetimes as strings in 'yyyy-mm-dd hh:mm:ss' format.
    """
    # Convert start and end to datetime objects
    start_dt = datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
    end_dt = datetime.strptime(end, '%Y-%m-%d %H:%M:%S')

    # Calculate a random number of seconds between start and end
    delta = end_dt - start_dt
    random_seconds1 = random.randint(0, int(delta.total_seconds()))
    random_seconds2 = random.randint(0, int(delta.total_seconds()))

    # Generate the first random datetime
    datetime1 = start_dt + timedelta(seconds=random_seconds1)

    # Generate the second datetime with the specified delta in days
    datetime2 = start_dt + timedelta(seconds=random_seconds2) + timedelta(days=delta_days)

    return datetime1.strftime('%Y-%m-%d %H:%M:%S'), datetime2.strftime('%Y-%m-%d %H:%M:%S')

def compare_datetime(d1, d2):
    date1 = datetime.strptime(d1, "%Y-%m-%d %H:%M:%S")
    date2 = datetime.strptime(d2, "%Y-%m-%d %H:%M:%S")
    return date2 > date1

for pnum in range (1,51):
    start_date = "2024-01-01 00:00:00"
    end_date = "2024-12-31 23:59:59"
    d1, d2 = random_datetime(start_date, end_date, random.randint(3,5))
    d3, d4 = random_datetime(d2, end_date, random.randint(3,5))
    while compare_datetime(d2,d3) is False:
        d3, d4 = random_datetime(d2, end_date, random.randint(3,5))

    for treat_id in range(1,3):
        doctor_id = f'{random.randint(1, 5):04d}'
        pid = f'{pnum:08d}'
        make_treatrecord.append(f"('{pid}', {treat_id}, '{doctor_id}'),")
        if pid in risk1:
            m1 = random.choice(medicine1)
            m2 = random.choice(medicine1)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append(f"('{pid}', {treat_id}, {m1}, {random.randint(1,10)}),")
            has_medicine.append(f"('{pid}', {treat_id}, {m2}, {random.randint(1,10)}),")
            if treat_id == 1:
                treatment_record.append(f"('{pid}', {treat_id}, '{d1}', '{d2}', '{random.choice(res1)}')")
            else:
                treatment_record.append(f"('{pid}', {treat_id}, '{d3}', '{d4}', '{random.choice(res1)}')")               
        elif pid in risk2:
            m1 = random.choice(medicine2)
            m2 = random.choice(medicine2)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append(f"('{pid}', {treat_id}, {m1}, {random.randint(1,10)}),")
            has_medicine.append(f"('{pid}', {treat_id}, {m2}, {random.randint(1,10)}),")
            if treat_id == 1:
                treatment_record.append(f"('{pid}', {treat_id}, '{d1}', '{d2}', '{random.choice(res2)}')")
            else:
                treatment_record.append(f"('{pid}', {treat_id}, '{d3}', '{d4}', '{random.choice(res2)}')")     
        else:
            m1 = random.choice(medicine3)
            m2 = random.choice(medicine3)
            while m1 == m2:
                m2 = random.choice(medicine1)
            has_medicine.append(f"('{pid}', {treat_id}, {m1}, {random.randint(1,10)}),")
            has_medicine.append(f"('{pid}', {treat_id}, {m2}, {random.randint(1,10)}),")
            if treat_id == 1:
                treatment_record.append(f"('{pid}', {treat_id}, '{d1}', '{d2}', '{random.choice(res3)}'),")
            else:
                treatment_record.append(f"('{pid}', {treat_id}, '{d3}', '{d4}', '{random.choice(res3)}'),")     


for x in treatment_record:
    print(x)

for x in make_treatrecord:
    print(x)

for x in has_medicine:
    print(x)