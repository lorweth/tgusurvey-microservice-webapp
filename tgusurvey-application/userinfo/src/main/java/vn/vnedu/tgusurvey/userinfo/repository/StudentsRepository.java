package vn.vnedu.tgusurvey.userinfo.repository;

import vn.vnedu.tgusurvey.userinfo.domain.Students;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import vn.vnedu.tgusurvey.userinfo.domain.User;

import java.util.Optional;


/**
 * Spring Data  repository for the Students entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentsRepository extends JpaRepository<Students, Long> {
    Optional<Students> findOneByUserLogin(String currentUser);
}
