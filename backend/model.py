from pydantic import BaseModel, Field
from enum import Enum
from decimal import Decimal
from datetime import datetime

# Enum for employee type
class EmployeeType(str, Enum):
    staff = "STAFF"
    volunteer = "VOLUNTEER"
    nurse = "NURSE"
    manager = "MANAGER"
    doctor = "DOCTOR"

class gender(Enum):
    male = 'M'
    female = 'F'

class risk_level(Enum):
    Low = '1'
    Mid = '2'
    High = '3'

# Pydantic model for creating a user
class employee(BaseModel):
    ID: str = Field(min_length=4, max_length=4)
    address: str
    phone: str = Field(min_length=10, max_length=10)
    fullname: str
    Employee_type: EmployeeType

class patient(BaseModel):
    PNUMBER: str = Field(min_length=8, max_length=8)
    PID: str = Field(min_length=12, max_length=12)
    fullname: str
    PHONE: str = Field(min_length=9, max_length=9)
    GENDER: gender
    address: str
    RISK_LEVEL: risk_level

class Test_Result(BaseModel):
    TEST_ID: int
    PNUMBER: str = Field(min_length=8, max_length=8)
    DATE_Time: datetime
    RESPIRATORY_RATE: Decimal = Field(..., ge=0, le=999.99) # equivalent to decimal(5,2)
    SPO2:  Decimal = Field(..., ge=0, le=100.99)
    PCR_ct_value: Decimal = Field(..., ge=0, le=100.99)
    PCR_result: int
    QT_ct_value: Decimal = Field(..., ge=0, le=999.99)
    QT_result: int