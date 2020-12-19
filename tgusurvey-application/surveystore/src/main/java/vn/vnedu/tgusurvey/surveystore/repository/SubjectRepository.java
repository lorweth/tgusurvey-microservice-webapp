package vn.vnedu.tgusurvey.surveystore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.vnedu.tgusurvey.surveystore.domain.Subject;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Subject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByMsmh(String msmh);
}
