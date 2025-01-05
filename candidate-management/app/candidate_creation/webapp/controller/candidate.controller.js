sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("candidatecreation.controller.candidate", {
        onInit: function () {
            // Zoeken van Stap 1 als fragment voor de wizard
            this.oDialog = sap.ui.xmlfragment(
                "candidatecreation.view.fragments.StepOne",
                this
            );

            // Maken van een JSON model zodat we alle info van de kandidaat hierin kunnen opslagen
            let oCandidateModel = new sap.ui.model.json.JSONModel({
                firstName: null,
                lastName: null,
                birthday: null,
                address: {
                    city: null,
                    postCode: null,
                    streetAddress: null,
                    candidate: null
                },
                email: null,
                department_code: null,
                contract_code: null,
                rapportTo: null,
                language: "NL",
                prioriteit_code: null,
                lengthOfService: null,
                status_code: null
            });

            // Step 1 binden aan de view
            this.getView().addDependent(this.oDialog);
            // Lokaal JSON model binden aan de view
            this.getView().setModel(oCandidateModel, 'candidateModel');
        },

        emailValidate:function()
        {
        var email = this.getView().byId("emailInput").getValue();
        var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
        if (!mailregex.test(email)) {
        this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Error);
        return false;
        }
        else{
        this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Success);
            return true;
        }
    
    },

        stepOneValidation: function () {
            let oModel = this.getView().getModel("candidateModel").getData();
            let firstName = oModel.firstName || ""; // Zorg ervoor dat dit een lege string is als het null is
            let lastName = oModel.lastName || "";  // Zorg ervoor dat dit een lege string is als het null is
            let birthday = oModel.birthday;


            if (firstName.length >= 1 && lastName.length >= 1 && birthday !== null && this.emailValidate()) {
                this.byId("StepOne").setValidated(true);
                console.log("Alles klopt");
            } else {
                this.byId("StepOne").setValidated(false);
                console.log("Niks klopt");
            }
        },

        onProspectCreation: function (oEvent) {
            var oModel = this.getOwnerComponent().getModel();
            var oListBinding = oModel.bindList("/Candidate", undefined, undefined, undefined, { $$updateGroupId: "createCandidate" });
            var oContext = oListBinding.create(this.getView().getModel("candidateModel").getData());

            this.getOwnerComponent().getModel().submitBatch("createCandidate")
                .then(function () {
                    MessageBox.alert("Changes have been saved", {
                        icon: sap.m.MessageBox.Icon.SUCCESS,
                        title: "Success"
                    });
                }, function (oError) {
                    MessageBox.alert(oError.message, {
                        icon: sap.m.MessageBox.Icon.ERROR,
                        title: "Unexpected Error"
                    });
                });
        }
    });
});
