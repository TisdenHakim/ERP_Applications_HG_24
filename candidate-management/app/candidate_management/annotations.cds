using CandidateService as service from '../../srv/services';
annotate service.Candidate with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
                Label : 'email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'department_code_code',
                Value : department_code_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'contract_code_code',
                Value : contract_code_code,
            },
            {
                $Type : 'UI.DataField',
                Value : rapportTo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'language_code',
                Value : language_code,
            },
            {
                $Type : 'UI.DataField',
                Value : startdate,
            },
            {
                $Type : 'UI.DataField',
                Value : lengthOfService,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status_code_code',
                Value : status_code_code,
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
            Label : 'email',
            Value : email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'department_code_code',
            Value : department_code_code,
        },
    ],
);

