const cds = require('@sap/cds');
const httpclient = require("@sap-cloud-sdk/http-client");
const { RED } = require('@sap/cds/lib/utils/colors');

module.exports = cds.service.impl(async (srv) => {
    const { Candidates } = cds.entities('Candidate');

    srv.before('CREATE', 'Candidate', async (req) => {


        if (req.department_code === 'SAL' || req.department_code === 'MKT') {
            const count = await cds.run(SELECT.from(Candidates).where({ department_code: req.department_code }));
            if (count.length >= 3) {
                req.reject(400, `Maximum aantal voor ${req.department_code}`);
            }
        }

        if (req.department_code === 'HR' || req.department_code === 'FIN' || req.department_code === 'IT') {
            const count = await cds.run(SELECT.from(Candidates).where({ department_code: req.department_code }));
            if (count.length >= 5) {
                req.reject(400, `Maximum aantal voor ${req.department_code}`);
            }
        }


        if (req.department_code === 'DEV') {
            const count = await cds.run(SELECT.from(Candidates).where({ department_code: req.department_code }));
            if (count.length >= 10) {
                req.reject(400, `Maximum aantal voor ${req.department_code}`);
            }
        }
    });

    srv.after('CREATE', 'Candidates', async (req) => {

        try {
            let oData = {
                "definitionId": "us10.0e52d93dtrial.candidateprocess.candidate_judgement",
                "context": {
                    "canidate": {
                        "firstName": req.firstName,
                        "lastName": req.lastName,
                        "birthday": req.birthday,
                        "address": {
                            "city": req.address.city,
                            "postCode": req.address.postCode,
                            "street": req.address.street,
                            "number": req.address.number,
                            "appartment": req.address.appartment,
                            "country": req.address.country,
                            "candidate": null
                        },
                        "department_code": req.department_code,
                        "rapportTo": req.rapportTo,
                        "email": req.email,
                        "contract_code": req.contract_code,
                        "language": req.language,
                        "startdate": req.startdate,
                        "lengthOfService": req.lengthOfService,
                        "status_code": req.status_code
                    }
                }
            }

            let oResponse = await startBusinessProcess(oData);
        } catch (oError) {
            console.log(`Error starting business process: ${oError.message}`);
        }
    });


});

async function startBusinessProcess(payload) {
    try {
        let oResponse = await httpclient.executeHttpRequest({
            destinationName: 'bpmworkflowruntime'
        }, {
            method: 'POST',
            url: '/workflow/rest/v1/workflow-instances',
            headers: {
                "Content-Type": 'application/json'
            },
            data: payload
        });
        return oResponse.data;
    } catch (oError) {
        console.log(`Error connecting to Build Process Automation destination: ${oError.message}`);
        return null;
    }
}
