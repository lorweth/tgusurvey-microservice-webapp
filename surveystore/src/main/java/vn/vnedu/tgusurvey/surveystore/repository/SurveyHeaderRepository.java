package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import vn.vnedu.tgusurvey.surveystore.service.dto.HeaderDTO;

import java.util.List;

/**
 * Spring Data  repository for the SurveyHeader entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyHeaderRepository extends JpaRepository<SurveyHeader, Long> {
    List<SurveyHeader> findBySurveyForm_Id(Long id);
}
