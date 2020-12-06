package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.ProgramItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProgramItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramItemRepository extends JpaRepository<ProgramItem, Long> {
}
