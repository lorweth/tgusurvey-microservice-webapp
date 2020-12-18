package vn.vnedu.tgusurvey.surveystore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.vnedu.tgusurvey.surveystore.domain.ProgramItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProgramItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramItemRepository extends JpaRepository<ProgramItem, Long> {
    Page<ProgramItem> findByProgramId(Long programId, Pageable pageable);
}
