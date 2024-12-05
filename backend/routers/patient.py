from fastapi import APIRouter, HTTPException
from typing import List
from collections import defaultdict
from model import (
    patient,
    Test_Result,
    patient_full_info,
    patient_has_symptom,
    patient_has_comorbidity,
    treatment,
)
from connection_manager import ConnectionManager

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

# Insert an patient
# "symptom" : [ {}, {}, {} ]



@router.post("/insert")
async def insert_patient(new_patient: patient_full_info):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)

        # Insert patient data
        insert_patient_query = """
        INSERT INTO patient (PID, fullname, PHONE, GENDER, ADDRESS, RISK_LEVEL)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(
            insert_patient_query,
            (
                new_patient.PID,
                new_patient.Fullname,
                new_patient.Phone,
                new_patient.Gender.value,
                new_patient.Address,
                new_patient.Risk_level.value,
            ),
        )
        connection.commit()

        # Get the largest PNUMBER
        query_largest_pnumber = "SELECT LPAD(IFNULL(MAX(CAST(Pnumber AS UNSIGNED)), 0), 8, '0') AS next_pnumber FROM Patient;"
        cursor.execute(query_largest_pnumber)
        new_pnum = cursor.fetchone()["next_pnumber"]

        # Insert symptoms, comorbidities, and test data
        if new_patient.Symptom:
            insert_symptoms_query = """
            INSERT INTO symptoms (PNUM, SYMP_NAME, START_DATE, END_DATE, SERIOUS_LEVEL)
            VALUES (%s, %s, %s, %s, %s)
            """
            symptoms_data = [
                (new_pnum, symptom.name, symptom.startDate, symptom.endDate, symptom.seriousness.value)
                for symptom in new_patient.Symptom
            ]
            cursor.executemany(insert_symptoms_query, symptoms_data)

        if new_patient.Comorbidity:
            insert_comorbidity_query = """
            INSERT INTO patient_has_comorbidity (PNUM, COMORBIDITY_NAME)
            VALUES (%s, %s)
            """
            comorbidity_data = [(new_pnum, comor.value) for comor in new_patient.Comorbidity]
            cursor.executemany(insert_comorbidity_query, comorbidity_data)

        if new_patient.Test:
            insert_test_query = """
            INSERT INTO Test_Result (PNUMBER, DATE_TIME, RESPIRATORY_RATE, SPO2, PCR_ct_value, PCR_result, QT_ct_value, QT_result)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            test_data = [
                (
                    new_pnum,
                    test.Date_time,
                    test.Respiratory_rate,
                    test.SPO2,
                    test.PCR_ct_value,
                    test.PCR_result,
                    test.QT_ct_value,
                    test.QT_result,
                )
                for test in new_patient.Test
            ]
            cursor.executemany(insert_test_query, test_data)

        connection.commit()
        return {"message": "Insert successful"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()



# Endpoint to fetch all employees
@router.get("/all-patients", response_model=List[patient])
async def get_all_patients():
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM patient"
        cursor.execute(query)
        patients = cursor.fetchall()
        return patients

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


    
# Find and return the all patient with given name ( name is a string, can be both upper and lower case, doesn't need full name)
@router.get("/search/name/{name}", response_model=List[patient])
async def get_patient_by_name(name: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM patient WHERE LOWER(FULLNAME) LIKE LOWER(%s)"
        cursor.execute(query, (f"%{name}%",))
        patients = cursor.fetchall()

        if not patients:
            raise HTTPException(status_code=404, detail="Patient not found")
        return patients

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

@router.get("/search/pnum/{pnum}", response_model=patient)
async def get_patient_by_PNUM(pnum: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM patient WHERE PNUMBER = %s"
        cursor.execute(query, (pnum,))
        patient_data = cursor.fetchone()  # Use fetchone to get a single record

        if not patient_data:
            raise HTTPException(status_code=404, detail="Patient not found")

        return patient_data  # Return the single patient dictionary

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()



@router.get("/search/{name}/{limit}", response_model=List[patient])
async def get_patient_by_name(name: str, limit: int):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM patient WHERE LOWER(FULLNAME) LIKE LOWER(%s) LIMIT %s"
        cursor.execute(query, (f"%{name}%", limit))
        patients = cursor.fetchall()

        if not patients:
            raise HTTPException(status_code=404, detail="Patient not found!!")

        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


@router.get("/test/{pnum}", response_model=List[Test_Result])
async def get_test_by_pnumber(pnum: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = """SELECT TEST_ID, PNUMBER, DATE_TIME, RESPIRATORY_RATE, SPO2, QT_ct_value, QT_result, PCR_ct_value, PCR_result
                   FROM test_result WHERE PNUMBER = %s"""
        cursor.execute(query, (pnum,))
        list_test = cursor.fetchall()

        if list_test:
            for test in list_test:
                if test['QT_result'] is not None:
                    test['QT_result'] = test['QT_result'] > 0
                if test['PCR_result'] is not None:
                    test['PCR_result'] = test['PCR_result'] > 0

        return list_test
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


@router.get("/symptom/{pnum}", response_model=List[patient_has_symptom])
async def get_symptom_by_pnumber(pnum: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT PNUM, SYMP_NAME, START_DATE, END_DATE, SERIOUS_LEVEL FROM symptoms WHERE PNUM = %s"
        cursor.execute(query, (pnum,))
        symptoms = cursor.fetchall()

        return symptoms
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


@router.get("/comorbidity/{pnum}", response_model=List[patient_has_comorbidity])
async def get_comorbidity_by_pnumber(pnum: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT PNUM, COMORBIDITY_NAME FROM patient_has_comorbidity WHERE PNUM = %s"
        cursor.execute(query, (pnum,))
        comorbidities = cursor.fetchall()

        return comorbidities
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


@router.get("/treatment/{pnum}")
async def get_treatment_by_pnumber(pnum: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT t.PNUM, t.TREAT_ID, m.DOCTOR_ID, t.START_DATE, t.END_DATE, t.RESULT, h.MCODE, h.QUANTITY
            FROM treatment_record t
            JOIN make_treatrecord m ON t.pnum = m.pnum AND t.treat_id = m.treat_id
            JOIN has_medicine h ON t.pnum = h.pnum AND t.treat_id = h.treat_id
            WHERE t.pnum = %s
        """
        cursor.execute(query, (pnum,))
        data = cursor.fetchall()

        grouped_data = defaultdict(lambda: defaultdict(lambda: {"doctor_id": set(), "details": []}))

        for record in data:
            treat_id = record["TREAT_ID"]
            grouped_data[pnum][treat_id]["start_date"] = record["START_DATE"]
            grouped_data[pnum][treat_id]["end_date"] = record["END_DATE"]
            grouped_data[pnum][treat_id]["result"] = record["RESULT"]
            grouped_data[pnum][treat_id]["doctor_id"].add(record["DOCTOR_ID"])
            grouped_data[pnum][treat_id]["details"].append({
                "MCODE": record["MCODE"],
                "QUANTITY": record["QUANTITY"]
            })

        output = []
        for treat_id, details in grouped_data[pnum].items():
            output.append({
                "TREAT_ID": treat_id,
                "DOCTOR_ID": list(details["doctor_id"]),  # Convert set to list
                "START_DATE": details["start_date"],
                "END_DATE": details["end_date"],
                "RESULT": details["result"],
                "MEDICINE": details["details"]
            })

        return {"PNUM": pnum, "TREATMENTS": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
@router.get("/report/{pnum}")
async def get_all_patient_report(pnum: str):
    try:
        # Call other endpoints to fetch report data
        patient_info = await get_patient_by_PNUM(pnum)
        list_of_test_results = await get_test_by_pnumber(pnum)
        list_of_symptoms = await get_symptom_by_pnumber(pnum)
        list_of_comorbidities = await get_comorbidity_by_pnumber(pnum)
        list_of_treatment = await get_treatment_by_pnumber(pnum)

        return {
            "patient_info": patient_info,
            "test_results": list_of_test_results,
            "symptoms": list_of_symptoms,
            "comorbidities": list_of_comorbidities,
            "treatment_records": list_of_treatment,
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))