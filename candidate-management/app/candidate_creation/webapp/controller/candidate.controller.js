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
            let oCandidatetModel = new sap.ui.model.json.JSONModel({
                firstNale: null,
                lastName: null,
                birthday: null,
                address: {
                    city          : null,
                    postCode      : null,
                    streetAddress : null,
                    candidate     : oCandidatetModel
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
            this.getView().setModel(oCandidatetModel, 'candidateModel');

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
        }
    });
});
