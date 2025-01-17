using CandidateService as service from '../../srv/services';
annotate service.Candidate with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : firstName,
                Label : '{i18n>Firstname}',
            },
            {
                $Type : 'UI.DataField',
                Value : lastName,
                Label : '{i18n>Lastname}',
            },
            {
                $Type : 'UI.DataField',
                Value : birthday,
                Label : '{i18n>Birthday}',
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Email}',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Value : rapportTo,
                Label : '{i18n>ReportsTo}',
            },
            {
                $Type : 'UI.DataField',
                Value : startdate,
                Label : '{i18n>StartDate}',
            },
            {
                $Type : 'UI.DataField',
                Value : lengthOfService,
                Label : '{i18n>LengthOfService}',
            },
            {
                $Type : 'UI.DataField',
                Value : department_code.name,
                Label : '{i18n>Department}',
            },
            {
                $Type : 'UI.DataField',
                Value : contract_code.name,
                Label : '{i18n>Contract}',
            },
            {
                $Type : 'UI.DataField',
                Value : language.name,
                Label : '{i18n>Language}',
            },
            {
                $Type : 'UI.DataField',
                Value : status_code.name,
                Label : '{i18n>Status}',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : firstName,
        },
        {
            $Type : 'UI.DataField',
            Value : lastName,
        },
        {
            $Type : 'UI.DataField',
            Value : birthday,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email',
            Value : email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Departement',
            Value : department_code_code,
        },
    ],
);

