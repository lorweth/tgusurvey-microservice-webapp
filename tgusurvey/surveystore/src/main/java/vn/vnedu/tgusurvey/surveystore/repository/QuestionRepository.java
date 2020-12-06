package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.Question;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Question entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
