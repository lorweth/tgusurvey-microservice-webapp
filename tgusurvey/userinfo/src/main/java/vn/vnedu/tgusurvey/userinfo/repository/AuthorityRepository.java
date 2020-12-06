package vn.vnedu.tgusurvey.userinfo.repository;

import vn.vnedu.tgusurvey.userinfo.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
