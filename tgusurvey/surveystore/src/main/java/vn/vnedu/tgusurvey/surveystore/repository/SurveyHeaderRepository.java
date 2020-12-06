package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SurveyHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyHeaderRepository extends JpaRepository<SurveyHeader, Long> {
}
