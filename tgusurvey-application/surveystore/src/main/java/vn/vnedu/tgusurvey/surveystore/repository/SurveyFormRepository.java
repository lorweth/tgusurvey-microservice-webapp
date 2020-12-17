package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SurveyForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyFormRepository extends JpaRepository<SurveyForm, Long> {

}
