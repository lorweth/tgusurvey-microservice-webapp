package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SubjectCondition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectConditionRepository extends JpaRepository<SubjectCondition, Long> {
    List<SubjectCondition> findAllBySubjectId(Long id);
}
