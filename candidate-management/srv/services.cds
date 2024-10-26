using { sap.capire.candidates as my } from '../db/schema';

/**
 * Service used by support personell, i.e. the incidents' 'processors'.
 */
service ProcessorService { 
    entity Candidate as projection on my.Candidate;
}

/**
 * Service used by administrators to manage customers and incidents.
 */
service AdminService {
        entity Candidate as projection on my.Candidate;
    }
