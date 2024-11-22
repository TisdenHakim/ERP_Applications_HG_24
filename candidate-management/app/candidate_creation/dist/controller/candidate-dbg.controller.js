sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("candidatecreation.controller.candidate", {
        onInit: function () {
            this.oDialog = sap.ui.xmlfragment(
                "candidatecreation.view.fragments.StepOne",
                this
            );
            this.getView().addDependent(this.oDialog);
        }
    });
});
