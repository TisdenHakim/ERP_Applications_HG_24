sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'candidatemanagement/test/integration/FirstJourney',
		'candidatemanagement/test/integration/pages/CandidateList',
		'candidatemanagement/test/integration/pages/CandidateObjectPage'
    ],
    function(JourneyRunner, opaJourney, CandidateList, CandidateObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('candidatemanagement') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCandidateList: CandidateList,
					onTheCandidateObjectPage: CandidateObjectPage
                }
            },
            opaJourney.run
        );
    }
);