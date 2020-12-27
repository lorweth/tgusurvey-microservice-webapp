package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.Question;
import vn.vnedu.tgusurvey.surveystore.domain.ResultSurvey;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import vn.vnedu.tgusurvey.surveystore.domain.User;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ResultSurvey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResultSurveyRepository extends JpaRepository<ResultSurvey, Long> {

    @Query("select resultSurvey from ResultSurvey resultSurvey where resultSurvey.user.login = ?#{principal.preferredUsername}")
    List<ResultSurvey> findByUserIsCurrentUser();

    Optional<ResultSurvey> findByUserLoginAndQuestionId(String userLogin, Long Id);
}
