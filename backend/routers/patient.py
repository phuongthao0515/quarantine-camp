from fastapi import APIRouter, HTTPException
from database import conn
from typing import List
from collections import defaultdict
from model import patient, Test_Result, patient_full_info, patient_has_symptom, patient_has_comorbidity, treatment, login_info
from itertools import zip_longest
import bcrypt

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

# Insert an patient
# "symptom" : [ {}, {}, {} ]
@router.post("/login")
async def authorize_login( login_request : login_info):
    username = login_request.username
    password = login_request.password

    try:
        cursor = conn.cursor(dictionary=True)

        # Query to get the user by username
        query = "SELECT Password FROM USERNAME WHERE Username = %s"
        cursor.execute(query, (username,))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Get the stored hashed password
        stored_hashed_password = user["Password"]

        # Verify the password
        if not bcrypt.checkpw(password.encode("utf-8"), stored_hashed_password.encode("utf-8")):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        return {"message": "Login successful!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

@router.post("/insert")
async def insert_patient(new_patient : patient_full_info):
    try:
        cursor = conn.cursor(dictionary=True)
         # SQL Insert query to insert patient into the table
        insert_patient = """
        INSERT INTO patient ( PID, fullname, PHONE, GENDER, ADDRESS, RISK_LEVEL)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        # Execute the insert with the patient data
        cursor.execute(insert_patient, ( new_patient.PID, new_patient.Fullname, 
                                        new_patient.Phone, new_patient.Gender, new_patient.Address, new_patient.Risk_level))
        conn.commit()
        print("Finish Insert patient")

        querry_largest_PNUMBER = """ SELECT LPAD(IFNULL(MAX(CAST(Pnumber AS UNSIGNED)), 0), 8, '0') AS next_pnumber FROM Patient; """
        cursor.execute(querry_largest_PNUMBER)
        new_pnum = cursor.fetchone()["next_pnumber"]
        print(new_pnum)

        if (new_patient.Symptom != []):
            insert_symptoms = """
            INSERT INTO symptoms (PNUM, SYMP_NAME, START_DATE, END_DATE, SERIOUS_LEVEL)
            VALUES (%s, %s, %s, %s, %s)
            """
            # Prepare data as a list of tuples
            symptoms_data = [(new_pnum, symptom.name, symptom.startDate, symptom.endDate, symptom.seriousness)
                                for symptom in new_patient.Symptom]
            cursor.executemany(insert_symptoms, symptoms_data)
        conn.commit()
        print("Finish Insert symptom")
        if (new_patient.Comorbidity != []):
            insert_comorbidity = """
            INSERT INTO patient_has_comorbidity (PNUM, COMORBIDITY_NAME)
            VALUES (%s, %s)
            """
            # Prepare data as a list of tuples
            comorbidity_data = [(new_pnum, comor) for comor in new_patient.Comorbidity]
            cursor.executemany(insert_comorbidity, comorbidity_data)
        conn.commit()
        print("Finish Insert Como")
        if (new_patient.Test != []):
            insert_test = """
            INSERT INTO Test_Result ( PNUMBER, DATE_TIME, RESPIRATORY_RATE, SPO2, PCR_ct_value, PCR_result, QT_ct_value, QT_result)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            # Prepare data as a list of tuples
            test_data = [ (new_pnum, test.Date_time, test.Respiratory_rate, test.SPO2, 
                                test.PCR_ct_value, test.PCR_result, test.QT_ct_value, test.QT_result )
                                    for test in new_patient.Test]
            cursor.executemany(insert_test, test_data)
        # Commit the transaction to make the change permanent
        conn.commit()
        print("Finish Insert Test")

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
@router.get("/search/name/{name}", response_model=List[patient])
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

# Find and return patient with PNUM
@router.get("/search/pnum/{pnum}", response_model= patient)
async def get_patient_by_PNUM(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch patients by FULLNAME
        query = "SELECT * FROM patient WHERE PNUMBER = %s"
        cursor.execute(query, ( pnum,))
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
        query = "SELECT TEST_ID, PNUMBER, DATE_TIME, RESPIRATORY_RATE, SPO2, QT_ct_value, QT_result, PCR_ct_value, PCR_result FROM test_result WHERE PNUMBER = %s "
        cursor.execute(query, (pnum, ))
        listTest = cursor.fetchall()
        # If no test are found, raise a 404 error
        # if not listTest:
        #     raise HTTPException(status_code=404, detail="No Test for this patient")
        if (listTest[0]['QT_result'] != None):
            if (listTest[0]['QT_result']> 0 ): listTest[0]['QT_result'] = True
            else: listTest[0]['QT_result']= False
        if (listTest[0]['PCR_result'] != None):
            if (listTest[0]['PCR_result']> 0 ): listTest[0]['PCR_result'] = True
            else: listTest[0]['PCR_result']= False
        return listTest
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Return all symptom for a patient
@router.get("/symptom/{pnum}", response_model=List[patient_has_symptom])
async def get_symptom_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch symptom by PNUMBER
        query = "SELECT PNUM, SYMP_NAME, START_DATE, END_DATE, SERIOUS_LEVEL FROM symptoms WHERE PNUM = %s "
        cursor.execute(query, (pnum, ))
        sym = cursor.fetchall()

        # If no symptom are found, raise a 404 error
        # if not sym:
        #     raise HTTPException(status_code=404, detail="No symptoms for this patient")

        return sym
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

# Return all comorbidity for a patient
@router.get("/comorbidity/{pnum}", response_model=List[patient_has_comorbidity])
async def get_comorbidity_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch comorbidity by PNUMBER
        query = "SELECT PNUM, COMORBIDITY_NAME FROM patient_has_comorbidity WHERE PNUM = %s "
        cursor.execute(query, (pnum, ))
        comor = cursor.fetchall()

        # If no comorbidity are found, raise a 404 error
        # if not comor:
        #     raise HTTPException(status_code=404, detail="No symptoms for this patient")

        return comor
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

@router.get("/treatment/{pnum}")
async def get_treatment_by_pnumber(pnum: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch treatment by PNUMBER
        query = """
            Select t.PNUM, t.TREAT_ID, m.DOCTOR_ID, t.START_DATE, t.END_DATE, t.RESULT, h.MCODE, h.QUANTITY
            from treatment_record t join make_treatrecord m
            on t.pnum = %s and t.pnum = m.pnum and t.treat_id = m.treat_id
            join has_medicine h on t.pnum = h.pnum and t.treat_id = h.treat_id;
        """
        cursor.execute(query, (pnum, ))
        data = cursor.fetchall()

        grouped_data = defaultdict(lambda: defaultdict(lambda: {"doctor_id": set(), "details": []}))

        for record in data:
            pnum = record["PNUM"]
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
        for pnum, treatments in grouped_data.items():
            pnum_data = {"PNUM": pnum, "TREATMENT": []}
            for treat_id, details in treatments.items():
                pnum_data["TREATMENT"].append({
                    "TREAT_ID": treat_id,
                    "DOCTOR_ID": list(details["doctor_id"]),  # Convert set to list
                    "START_DATE": details["start_date"],
                    "END_DATE": details["end_date"],
                    "RESULT": details["result"],
                    "MEDICINE": details["details"]
                })
            output.append(pnum_data)

        return output
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()

@router.get("/report/{pnum}")
async def get_all_patient_report(pnum: str):
    try:
        # Call the previously defined functions to get the patient report
        patient_info = await get_patient_by_PNUM(pnum)
        list_of_test_results = await get_test_by_pnumber(pnum)  # Fetch test results
        list_of_symptoms = await get_symptom_by_pnumber(pnum)  # Fetch symptoms
        list_of_comorbidities = await get_comorbidity_by_pnumber(pnum)  # Fetch comorbidities
        list_of_treatment = await get_treatment_by_pnumber(pnum)  # Fetch comorbidities

        # Combine all the data into a single report
        report = {
            "patient_info": patient_info,
            "test_results": list_of_test_results,
            "symptoms": list_of_symptoms,
            "comorbidities": list_of_comorbidities,
            "treatment_records" : list_of_treatment
        }
        return report
    except HTTPException as e:
        raise e  # Return any 404 or other errors from the called functions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))