package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.Specialized;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Specialized entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecializedRepository extends JpaRepository<Specialized, Long> {
}
