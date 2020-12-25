package vn.vnedu.tgusurvey.userinfo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.vnedu.tgusurvey.userinfo.domain.Students;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Students entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentsRepository extends JpaRepository<Students, Long> {
    Optional<Students> findOneByUserLogin(String currentUser);

    Page<Students> findByClassroom_Id(Pageable pageable, Long classId);

    Page<Students> findByMssvContainingIgnoreCase(Pageable pageable, String keyword);
}
