package vn.vnedu.tgusurvey.tgusurvey.repository;

import vn.vnedu.tgusurvey.tgusurvey.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
