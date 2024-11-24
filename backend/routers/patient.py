from fastapi import APIRouter, HTTPException
from database import conn
from model import patient

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

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

# Endpoint to fetch a single employee by ID
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