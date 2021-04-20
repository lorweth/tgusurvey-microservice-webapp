package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the SurveyForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyFormRepository extends JpaRepository<SurveyForm, Long> {
    Optional<SurveyForm> findOneById(Long id);

//    List<SurveyForm> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(Instant date, Instant date2);
}
