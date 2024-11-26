using { sap.capire.candidates as my } from '../db/schema';

/**
* Candidate service
 */
service CandidateService { 
    entity Candidate as projection on my.Candidate;
}