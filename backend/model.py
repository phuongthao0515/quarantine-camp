from pydantic import BaseModel, Field
from enum import Enum
from decimal import Decimal
from datetime import datetime
from typing import List, Optional

######  Enum Class for use  #######
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

class serious_level(str, Enum):
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

####### Class for Querry From DB ##########

# Pydantic model for creating a user
class employee(BaseModel):
    ID: str = Field(min_length=4, max_length=4)
    address: str
    phone: str = Field(min_length=10, max_length=10)
    fullname: str
    Employee_type: EmployeeType

class patient(BaseModel):
    PNUMBER: str = Field(min_length=8, max_length=8)
    PID: Optional[str] = Field(None, min_length=12, max_length=12)
    fullname: Optional[str] = None
    PHONE: Optional[str] = Field(None, min_length=9, max_length=9)
    GENDER: Optional[gender] = None
    address: Optional[str] = None
    RISK_LEVEL: Optional[risk_level] = None

class Test_Result(BaseModel):
    TEST_ID: int
    PNUMBER: str = Field(min_length=8, max_length=8)
    DATE_TIME: Optional[datetime] = None
    RESPIRATORY_RATE: Decimal = Field(..., ge=0, le=999.99) # equivalent to decimal(5,2)
    SPO2:  Decimal = Field(..., ge=0, le=100.99)
    PCR_ct_value: Optional[Decimal] = Field(None, ge=0, le=100.99)
    PCR_result: Optional[bool] = None
    QT_ct_value: Optional[Decimal] = Field(None, ge=0, le=999.99)
    QT_result: Optional[bool] =None

class patient_has_symptom(BaseModel):
    PNUM: str = Field(min_length=8, max_length=8)
    SYMP_NAME: symptom
    START_DATE: datetime 
    END_DATE: Optional[datetime] = None
    SERIOUS_LEVEL: Optional[serious_level] = None

class patient_has_comorbidity(BaseModel):
    PNUM: str = Field(min_length=8, max_length=8)
    COMORBIDITY_NAME: comorbidity

class treatment(BaseModel):
    PNUM: str = Field(min_length=8, max_length=8)
    TREAT_ID: int
    DOCTOR_ID: str = Field(min_length=4, max_length=4)
    START_DATE: datetime 
    END_DATE: Optional[datetime] = None
    RESULT: Optional[str] = None
    MCODE: int
    QUANTITY: int
########## Special Class for Insert from front end ###########

class symptom_element(BaseModel):
    name: str
    startDate: datetime
    endDate: Optional[datetime] = None
    seriousness: Optional[serious_level] = None

class Test_Result_B(BaseModel):
    Date_time: Optional[datetime] = None
    Respiratory_rate: Decimal = Field(..., ge=0, le=999.99) # equivalent to decimal(5,2)
    SPO2:  Decimal = Field(..., ge=0, le=100.99)
    PCR_ct_value: Optional[Decimal] = Field(None, ge=0, le=100.99)
    PCR_result: Optional[bool] = None
    QT_ct_value: Optional[Decimal] = Field(None, ge=0, le=999.99)
    QT_result: Optional[bool] =None

class patient_full_info(BaseModel):
    Fullname: str  # Required field
    PID: Optional[str] = Field(None, min_length=12, max_length=12)  
    Gender: Optional[gender] = None  
    Risk_level: Optional[risk_level] = None  
    Address: Optional[str] = None 
    Phone: Optional[str] = Field(None, min_length=9, max_length=9)  
    Symptom: List[symptom_element] = Field(default_factory=list)  # Default empty list
    Comorbidity: List[comorbidity] = Field(default_factory=list)  # Default empty list
    Test: Optional[List[Test_Result_B]] = None  

class Config:
        # Allow None for any fields that are optional
        orm_mode = True
        anystr_strip_whitespace = True

class login_info(BaseModel):
    username: str = Field(..., min_length=1, max_length= 200) 
    password: str = Field(..., min_length=1, max_length= 255) 