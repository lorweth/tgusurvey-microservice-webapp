package vn.vnedu.tgusurvey.surveystore.repository;

import vn.vnedu.tgusurvey.surveystore.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
