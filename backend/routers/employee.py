from fastapi import APIRouter, HTTPException
from database import conn
from model import employee

# Create a router instance
router = APIRouter(prefix="/employee", tags=["employee"])

# Endpoint to fetch all employees
@router.get("/", response_model=list[employee])
async def get_all_employees():
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch all employees
        query = "SELECT * FROM employee"
        cursor.execute(query)
        employees = cursor.fetchall()

        return employees

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()

# Endpoint to fetch a single employee by ID
@router.get("/{employee_id}", response_model=employee)
async def get_employee_by_id(employee_id: str):
    try:
        cursor = conn.cursor(dictionary=True)

        # Fetch employee by ID
        query = "SELECT * FROM employee WHERE ID = %s"
        cursor.execute(query, (employee_id,))
        employee = cursor.fetchone()

        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        return employee

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        # conn.close()