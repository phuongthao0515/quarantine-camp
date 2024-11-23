from fastapi import APIRouter, HTTPException
from database import conn
from model import patient

# Create a router instance
router = APIRouter(prefix="/patient", tags=["patient"])

# Endpoint to fetch all employees
@router.get("/", response_model=list[patient])
async def get_all_patients():
    try:
        # conn = get_connection()
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

# Endpoint to fetch a single employee by ID
@router.get("/{pnumber}", response_model=patient)
async def get_patient_by_id(pnumber: str):
    try:
        # conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch employee by ID
        query = "SELECT * FROM patient WHERE PNUMBER = %s"
        cursor.execute(query, (pnumber,))
        patient = cursor.fetchone()

        if not patient:
            raise HTTPException(status_code=404, detail="Employee not found")

        return patient

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()
