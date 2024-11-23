from pydantic import BaseModel, Field
from enum import Enum

# Enum for employee type
class EmployeeType(str, Enum):
    staff = "STAFF"
    volunteer = "VOLUNTEER"
    nurse = "NURSE"
    manager = "MANAGER"
    doctor = "DOCTOR"

# Pydantic model for creating a user
class employee(BaseModel):
    ID: str = Field(min_length=4, max_length=4)
    address: str
    phone: str = Field(min_length=10, max_length=10)
    fullname: str
    Employee_type: EmployeeType