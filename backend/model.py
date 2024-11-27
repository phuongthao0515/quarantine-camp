from pydantic import BaseModel, Field
from enum import Enum
from decimal import Decimal
from datetime import datetime
from typing import List, Optional

# Enum for employee type
class EmployeeType(str, Enum):
    staff = "STAFF"
    volunteer = "VOLUNTEER"
    nurse = "NURSE"
    manager = "MANAGER"
    doctor = "DOCTOR"

class gender(str, Enum):
    male = 'M'
    female = 'F'

class risk_level(str, Enum):
    Low = '1'
    Mid = '2'
    High = '3'

class symptom(str, Enum):
    s1 = 'Fever or chills'
    s2 = 'Cough'
    s3 = 'Difficulty breathing'
    s4 = 'Fatigue'
    s5 = 'Muscle or body aches'
    s6 = 'Headache'
    s7 = 'Loss of taste or smell'
    s8 = 'Sore throat'
    s9 = 'Congestion or runny nose'
    s10 = 'Nausea or vomiting'
    s11 = 'Diarrhea'

class comorbidity(str, Enum):
    c1 = 'Diabetes'
    c2 = 'Heart disease'
    c3 = 'Obesity'
    c4 = 'Chronic lung disease'
    c5 = 'Kidney disease'
    c6 = 'Weakened immune system'
    c7 = 'Pregnancy'
    c8 = 'Stroke'
class serious_level(str , Enum):
    l1 = '1'
    l2 = '2'
    l3 = '3'


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

class patient_full_info(BaseModel):
    PNUMBER: str = Field(min_length=8, max_length=8)
    PID: str = Field(None, min_length=12, max_length=12) 
    fullname: str
    PHONE: str = Field(None, min_length=9, max_length=9)
    GENDER: gender
    address: str = None
    RISK_LEVEL: risk_level = None
    SYMPTOM_NAME: List[symptom] = []  # default to empty list if not provided
    SYMPTOM_START_DATE: List[datetime] = []  # Nullable datetime, default empty
    SYMPTOM_END_DATE: List[Optional[datetime]] = []  # Nullable datetime, default empty
    SYMPTOM_SERIOUS_LEVEL: List[Optional[serious_level]] = []  # Nullable integer, default empty
    COMORBIDITY: List[comorbidity] = []  # Nullable comorbidity, default empty


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

class Config:
        # Allow None for any fields that are optional
        orm_mode = True
        anystr_strip_whitespace = True