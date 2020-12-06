package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubjectCondition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectConditionRepository extends JpaRepository<SubjectCondition, Long> {
}
