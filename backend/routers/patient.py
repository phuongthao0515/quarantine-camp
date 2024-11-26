from fastapi import APIRouter, HTTPException
from database import conn
from typing import List
from model import patient, Test_Result, symptoms, comorbidity

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

# Endpoint to fetch all patient
@router.get("/all-patients", response_model=list[patient])
async def get_all_patients():
    try:

        cursor = conn.cursor(dictionary=True)

        # Fetch all patients
        query = "SELECT * FROM patient"
        cursor.execute(query)
        patients = cursor.fetchall()

        return patients

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
    
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
@router.get("/test/{pnum}", response_model=List[Test_Result])
async def get_test_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch Test Result by PNUMBER
        query = "SELECT date_time, respiratory_rate, spo2, QT_ct_value, qt_result, pcr_ct_value, pcr_result FROM test_result WHERE PNUMBER = %s "
        cursor.execute(query, (pnum, ))
        listTest = cursor.fetchall()

        # If no test are found, raise a 404 error
        if not listTest:
            raise HTTPException(status_code=404, detail="No Test for this patient")

        return listTest
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Return all symptom for a patient
@router.get("/symptom/{pnum}", response_model=List[symptoms])
async def get_symptom_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch symptom by PNUMBER
        query = "SELECT symp_name, start_date, end_date, serious_level FROM symptoms WHERE PNUM = %s "
        cursor.execute(query, (pnum, ))
        sym = cursor.fetchall()

        # If no symptom are found, raise a 404 error
        if not sym:
            raise HTTPException(status_code=404, detail="No symptoms for this patient")

        return sym
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Return all comorbidity for a patient
@router.get("/comorbidity/{pnum}", response_model=List[comorbidity])
async def get_comorbidity_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch comorbidity by PNUMBER
        query = "SELECT comorbidity_name FROM patient_has_comorbidity WHERE PNUM = %s "
        cursor.execute(query, (pnum, ))
        comor = cursor.fetchall()

        # If no comorbidity are found, raise a 404 error
        if not comor:
            raise HTTPException(status_code=404, detail="No symptoms for this patient")

        return comor
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

@router.get("/report/{pnum}")
async def get_all_patient_report(pnum: str):
    try:
        # Call the previously defined functions to get the patient report
        test_results = await get_test_by_pnumber(pnum)  # Fetch test results
        symptoms = await get_symptom_by_pnumber(pnum)  # Fetch symptoms
        comorbidities = await get_comorbidity_by_pnumber(pnum)  # Fetch comorbidities

        # Combine all the data into a single report
        report = {
            "pnumber": pnum,
            "test_results": test_results,
            "symptoms": symptoms,
            "comorbidities": comorbidities
        }

        return report
    except HTTPException as e:
        raise e  # Return any 404 or other errors from the called functions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))