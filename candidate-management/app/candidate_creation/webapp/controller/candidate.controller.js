sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("candidatecreation.controller.candidate", {
        onInit: function () {
            this._oNavContainer = this.byId("wizardNavContainer");

            // Maken van een JSON model zodat we alle info van de kandidaat hierin kunnen opslagen
            let oCandidateModel = new sap.ui.model.json.JSONModel({
                firstName: null,
                lastName: null,
                birthday: null,
                address: {
                    city: null,
                    postCode: null,
                    street: null,
                    number: null,
                    appartment: null,
                    country: "BE",
                    candidate: null
                },
                email: null,
                department_code: null,
                contract_code: null,
                rapportTo: null,
                language: "NL",
                prioriteit_code: null,
                startdate: null,
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
		_handleNavigationToStep: function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},
    wizardCompletedHandler: function () {
        this._oNavContainer.to(this.byId("wizardReviewPage"));
    },

        stepOneValidation: function () {
            //TO DO ipv omodel te gebruiken input velden rechstreeks aanspreken, omdat er een vertraging anders opzit
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

        stepTwoValidation: function () {
            let oModel = this.getView().getModel("candidateModel").getData();
            console.log(oModel.address); // Controleer of de waarden correct zijn
            
            // Nodige elementen aanspreken
            let stepTwo = this.byId("StepTwo");
        
            // Data van velden inlezen
            let stad = this.getView().byId("stadInput").getValue();
            let postcode = this.getView().byId("postcodeInput").getValue();
            let nummer = this.getView().byId("nummerInput").getValue();
            let land = this.getView().byId("landInput").getSelectedKey();
        
            // Check of alles deftig is ingevuld
            if (stad.length >= 1 && postcode.length >= 1 && nummer >= 1 && land.length >= 1) {
                stepTwo.setValidated(true);
                console.log("Alles klopt");
            } else {
                console.log("Niks klopt");
                stepTwo.setValidated(false);
            }
        },
        stepThreeValidation: function () {
            // Nodige elementen aanspreken
            let stepThree = this.byId("StepThree");
        
            // Data van velden inlezen
            let afdeling = this.getView().byId("afdelingInput").getSelectedKey();
            let contract = this.getView().byId("contractInput").getSelectedKey();
            let rapportTo = this.getView().byId("rapportInput").getValue();
            let startdate = this.getView().byId("DP2").getValue();
            let ancienniteit = this.getView().byId("ancienniteitInput").getValue();

        
            // Check of alles deftig is ingevuld
            if (afdeling.length >= 1 && contract.length >= 1 && ancienniteit >= 1 && rapportTo.length >= 1 && startdate.length) {
                stepThree.setValidated(true);
                console.log("Alles klopt");
            } else {
                console.log("Niks klopt");
                stepThree.setValidated(false);
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
        },
        
        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
                        this.onProspectCreation();
					}
				}.bind(this)
			});
		},
        handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},
    });
});
