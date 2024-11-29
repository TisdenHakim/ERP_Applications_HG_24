sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("candidatecreation.controller.candidate", {
        onInit: function () {

            //Zoeken van Stap 1 als fragment voor de wizard
            this.oDialog = sap.ui.xmlfragment(
                "candidatecreation.view.fragments.StepOne",
                this
            );

            //Maken van een JSON model zodat we alle info van de kandidaat hierin kunnen opslagen
            let oCandidateModel = new sap.ui.model.json.JSONModel({
                firstName: null,
                lastName: null,
                birthday: null,
                address: {
                    city          : null,
                    postCode      : null,
                    streetAddress : null,
                    candidate     : null
                },
                email: null,
                department_code: null,
                contract_code:null,
                rapportTo:null,
                language:"NL",
                prioriteit_code: null,
                rapportTo: null,
                lengthOfService:null,
                status_code:null
            });



            //Step 1 binden aan de view
            this.getView().addDependent(this.oDialog);
            //Lokaal JSON model binden aan de view
            this.getView().setModel(oCandidateModel, 'candidateModel');

        },
        onProspectCreation: function(oEvent){
            // Ophalen default model (zie manifest.json)
            var oModel = this.getOwnerComponent().getModel()
            // We maken hier ook een groepering aan met de naam 'createCandidate'. Deze wordt later gebruikt om de requests te groeperen in de batch
            var oListBinding = oModel.bindList("/Candidate", undefined, undefined, undefined, { $$updateGroupId: "createCandidate" });

            // oData v4 werkt aan de hand van contexts, we gaan deze uit de reeds gemaakte list binding halen 
            // en invullen met de data die in ons prospects JSON model zit
            var oContext = oListBinding.create(this.getView().getModel("candidateModel").getData());
            
            // oData werkt aan de hand van batches om te communiceren met de server
            this.getOwnerComponent().getModel().submitBatch("createCandidate")
                .then(function () {
				// De prospect is aangemaakt
				MessageBox.alert("Changes have been saved", {
					icon : sap.m.MessageBox.Icon.SUCCESS,
					title : "Success"
				});
			}, function (oError) {
                // Er ging iets fout tijdens het aanmaken van de prospect
				MessageBox.alert(oError.message, {
					icon : sap.m.MessageBox.Icon.ERROR,
					title : "Unexpected Error"
				});
			});
        },
        checkIfEmailIsWrong: function (oEvent) {
            const sEmail = oEvent.getParameter("value");
            const oValidationText = this.byId("emailValidationText");
      
            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(sEmail)) {
              oValidationText.setVisible(true);
              return true;
            } else {
              oValidationText.setText("");
              oValidationText.setVisible(false);
              return false;
            }
          },
          function (MessageToast) {
            "use strict";
            
            return {
                onStepComplete: function () {
                    // Haal de waarde van de inputs op
                    const voornaam = this.byId("VoornaamInput").getValue();
                    const achternaam = this.byId("AchternaamInput").getValue();
                    const geboortedatum = this.byId("DP1").getDateValue();
                    const email = this.byId("emailInput").getValue();
        
                    // Controleer of velden leeg zijn
                    if (!voornaam || !achternaam || !geboortedatum || !email) {
                        MessageToast.show("Gelieve alle verplichte velden in te vullen.");
                        return false; // voorkomt doorgaan naar de volgende stap
                    }
        
                    // Optioneel: extra validatie zoals e-mailcontrole
                    if (checkIfEmailIsWrong(email)) {
                        return false;
                    }
                    // Als alles correct is, ga verder
                    return true;
                }
            }
        }
    });
});
