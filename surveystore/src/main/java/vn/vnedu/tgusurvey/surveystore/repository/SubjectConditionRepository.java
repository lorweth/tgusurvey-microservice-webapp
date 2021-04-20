package vn.vnedu.tgusurvey.surveystore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubjectCondition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectConditionRepository extends JpaRepository<SubjectCondition, Long> {
    Page<SubjectCondition> findBySubjectId(Long subjectId, Pageable pageable);
}
