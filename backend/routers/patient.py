from fastapi import APIRouter, HTTPException
from database import conn
from typing import List
from model import patient, Test_Result, patient_full_info
from itertools import zip_longest

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

# Insert an patient
# "symptom" : [ {}, {}, {} ]
@router.post("/insert")
async def insert_patient(new_patient : patient_full_info):
    try:
        cursor = conn.cursor(dictionary=True)
         # SQL Insert query to insert patient into the table
        insert_patient = """
        INSERT INTO patient (PNUMBER, PID, fullname, PHONE, GENDER, ADDRESS, RISK_LEVEL)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        # Execute the insert with the patient data
        cursor.execute(insert_patient, (new_patient.PNUMBER, new_patient.PID, new_patient.fullname, 
                                        new_patient.PHONE, new_patient.GENDER, new_patient.address, new_patient.RISK_LEVEL))
        
        if (new_patient.SYMPTOM_NAME != []):
            insert_symptoms = """
            INSERT INTO symptoms (PNUM, SYMP_NAME, START_DATE, END_DATE, SERIOUS_LEVEL)
            VALUES (%s, %s, %s, %s, %s)
            """
            # Prepare data as a list of tuples
            symptoms_data = [(new_patient.PNUMBER, symp_name, start, end, level) for symp_name, start, end, level in 
                            zip_longest(new_patient.SYMPTOM_NAME, new_patient.SYMPTOM_START_DATE, 
                                new_patient.SYMPTOM_END_DATE, new_patient.SYMPTOM_SERIOUS_LEVEL, fillvalue=None)]
            cursor.executemany(insert_symptoms, symptoms_data)
        
        if (new_patient.COMORBIDITY != []):
            insert_comorbidity = """
            INSERT INTO patient_has_comorbidity (PNUM, COMORBIDITY_NAME)
            VALUES (%s, %s)
            """
            # Prepare data as a list of tuples
            comorbidity_data = [(new_patient.PNUMBER, comor) for comor in new_patient.COMORBIDITY]
            cursor.executemany(insert_comorbidity, comorbidity_data)
        # Commit the transaction to make the change permanent
        conn.commit()

        # Return the inserted patient data as a response
        return {"message": "Insert successful"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()


# Endpoint to fetch all employees
@router.get("/all-patients", response_model=list[patient])
async def get_all_patients():
    try:

        cursor = conn.cursor(dictionary=True)

        # Fetch all employees
        query = "SELECT * FROM patient"
        cursor.execute(query)
        patients = cursor.fetchall()

        return patients

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()

# Get patient with highest pnumber
@router.get("/max-patient")
async def get_maxpum():
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch all employees
        cursor.execute("SELECT Max(PNUMBER) as PNUMBER FROM patient;")
        last_record = cursor.fetchone()

        # Determine the next PNUMBER
        if last_record and last_record["PNUMBER"]:
            next_number = int(last_record["PNUMBER"]) + 1
        else:
            next_number = 0
        return str(next_number).zfill(8)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()

# Endpoint to fetch a single employee by ID ?? why employee
@router.get("/{pnumber}", response_model=patient)
async def get_patient_by_id(pnumber: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch employee by ID
        query = "SELECT * FROM patient WHERE PNUMBER = %s"
        cursor.execute(query, (pnumber,))
        patient = cursor.fetchone()

        if not patient:
            raise HTTPException(status_code=404, detail="Employee not found!!")

        return patient

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()
    
# Find and return the all patient with given name ( name is a string, can be both upper and lower case, doesn't need full name)
@router.get("/search/{name}", response_model=List[patient])
async def get_patient_by_name(name: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch patients by FULLNAME
        query = "SELECT * FROM patient WHERE LOWER(FULLNAME) LIKE LOWER(%s)"
        cursor.execute(query, (f"%{name}%",))
        patients = cursor.fetchall()

        # If no patients are found, raise a 404 error
        if not patients:
            raise HTTPException(status_code=404, detail="Patient not found!!")

        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Find and return a LIMIT number of patient with name
@router.get("/search/{name}/{limit}", response_model=List[patient])
async def get_patient_by_name(name: str, limit: int):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch patients by FULLNAME
        query = "SELECT * FROM patient WHERE LOWER(FULLNAME) LIKE LOWER(%s) LIMIT %s"
        cursor.execute(query, (f"%{name}%", limit))
        patients = cursor.fetchall()

        # If no patients are found, raise a 404 error
        if not patients:
            raise HTTPException(status_code=404, detail="Patient not found!!")

        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Return all test for a patient
@router.get("/test/{pid}", response_model=List[Test_Result])
async def get_patient_by_name(pid: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch Test Result by PNUMBER
        query = "SELECT * FROM test_result WHERE PNUMBER = %s "
        cursor.execute(query, (pid, ))
        listTest = cursor.fetchall()

        # If no test are found, raise a 404 error
        if not listTest:
            raise HTTPException(status_code=404, detail="No Test for this patient")

        return listTest
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()