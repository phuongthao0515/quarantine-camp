from fastapi import APIRouter, HTTPException
from connection_manager import ConnectionManager
from model import employee

router = APIRouter(prefix="/employee", tags=["employee"])


@router.get("/", response_model=list[employee])
async def get_all_employees():
    """
    Fetch all employees from the employee table.
    Ensure the database connection is established and valid.
    """
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM employee"
        cursor.execute(query)
        employees = cursor.fetchall()
        return employees

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch employees: {e}")

    finally:
        if cursor:
            cursor.close()


@router.get("/{employee_id}", response_model=employee)
async def get_employee_by_id(employee_id: str):
    connection = ConnectionManager.get_instance().get_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection not established")

    try:
        cursor = connection.cursor(dictionary=True)

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
#         # conn.close()