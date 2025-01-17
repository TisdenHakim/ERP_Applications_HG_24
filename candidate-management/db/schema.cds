using { cuid, managed, sap.common.CodeList, Country } from '@sap/cds/common';

namespace sap.capire.candidates; 

entity Candidate : cuid, managed {  
    firstName        : String  @title : 'Firstname';
    lastName         : String  @title : 'Lastname';
    birthday         : Date    @title : 'Birthday';
    address          : Composition of Address on address.candidate = $self;
    email            : EMailAddress;
    department_code       : Association to Department;
    contract_code     : Association to ContractType;
    rapportTo        : String   @title : 'Reports To';
    language         : Association to Language default 'NL';
    startdate           :  Date    @title : 'Start date';
    lengthOfService  : Int16    @title : 'Length of Service';
    status_code           : Association to Status;
}

entity Address : cuid, managed {
    city          : String;
    postCode      : String;
    street        : String;
    number        : Int16;
    appartment    : String;
    country       : Country;
    candidate     : Association to Candidate;
}





entity Department : CodeList {
    key code: String enum {
        HR = 'HR';
        FIN = 'FIN'; 
        SAL = 'SAL'; 
        MKT = 'MKT'; 
        DEV = 'DEV'; 
        IT = 'IT'; 
    };
}

entity ContractType : CodeList {
    key code: String enum {
        full_time = 'FT';
        four_five = '4/5'; 
        three_five = '3/5'; 
        part_time = 'PT'; 
        internship = 'IN'; 
    };
}

entity Language : CodeList {
    key code: String enum {
        english = 'EN'; 
        dutch = 'NL'; 
        german = 'DE'; 
        french = 'FR'; 
    };
}

entity Status : CodeList {
    key code: String enum {
        approved = 'A';
        rejected = 'R';
    };
}

type EMailAddress : String;
