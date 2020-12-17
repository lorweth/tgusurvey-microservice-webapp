package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.EducationProgram;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
/**
 * Spring Data  repository for the EducationProgram entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EducationProgramRepository extends JpaRepository<EducationProgram, Long> {

}
