package vn.vnedu.tgusurvey.userinfo.repository;

import vn.vnedu.tgusurvey.userinfo.domain.Enterprise;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Enterprise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
}
