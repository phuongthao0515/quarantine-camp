class patient(BaseModel):
    PNUMBER: str = Field(min_length=8, max_length=8)
    PID: str = Field(min_length=12, max_length=12)
    fullname: str
    PHONE: str = Field(min_length=9, max_length=9)
    GENDER: gender
    address: str
    RISK_LEVEL: risk_level