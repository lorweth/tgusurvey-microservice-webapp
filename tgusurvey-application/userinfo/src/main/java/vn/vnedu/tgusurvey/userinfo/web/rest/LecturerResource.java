package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.domain.Lecturer;
import vn.vnedu.tgusurvey.userinfo.repository.LecturerRepository;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.security.SecurityUtils;
import vn.vnedu.tgusurvey.userinfo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.userinfo.domain.Lecturer}.
 */
@RestController
@RequestMapping("/api")
public class LecturerResource {

    private final Logger log = LoggerFactory.getLogger(LecturerResource.class);

    private static final String ENTITY_NAME = "userinfoLecturer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LecturerRepository lecturerRepository;

    private final UserRepository userRepository;

    public LecturerResource(LecturerRepository lecturerRepository, UserRepository userRepository) {
        this.lecturerRepository = lecturerRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /lecturers} : Create a new lecturer.
     *
     * @param lecturer the lecturer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lecturer, or with status {@code 400 (Bad Request)} if the lecturer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lecturers")
    public ResponseEntity<Lecturer> createLecturer(@Valid @RequestBody Lecturer lecturer) throws URISyntaxException {
        log.debug("REST request to save Lecturer : {}", lecturer);
        if (lecturer.getId() != null) {
            throw new BadRequestAlertException("A new lecturer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (lecturer.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(lecturer.getUser());
        }
        Lecturer result = lecturerRepository.save(lecturer);
        return ResponseEntity.created(new URI("/api/lecturers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lecturers} : Updates an existing lecturer.
     *
     * @param lecturer the lecturer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lecturer,
     * or with status {@code 400 (Bad Request)} if the lecturer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lecturer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lecturers")
    public ResponseEntity<Lecturer> updateLecturer(@Valid @RequestBody Lecturer lecturer) throws URISyntaxException {
        log.debug("REST request to update Lecturer : {}", lecturer);
        if (lecturer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (lecturer.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(lecturer.getUser());
        }
        Lecturer result = lecturerRepository.save(lecturer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lecturer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lecturers} : get all the lecturers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lecturers in body.
     */
    @GetMapping("/lecturers")
    public ResponseEntity<List<Lecturer>> getAllLecturers(Pageable pageable) {
        log.debug("REST request to get a page of Lecturers");
        Page<Lecturer> page = lecturerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lecturers/:id} : get the "id" lecturer.
     *
     * @param id the id of the lecturer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lecturer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lecturers/{id}")
    public ResponseEntity<Lecturer> getLecturer(@PathVariable Long id) {
        log.debug("REST request to get Lecturer : {}", id);
        Optional<Lecturer> lecturer = lecturerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lecturer);
    }

    /**
     * {@code GET /lecturers/myinfo} : get the current login lecturers
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lecturers, or with status {@code 404 (Not Found)}
     */
    @GetMapping("/lecturers/myinfo")
    public ResponseEntity<Lecturer> getCurrentLecturer() {
        log.debug("REST request to get student login info");
        final Optional<String> isUser = SecurityUtils.getCurrentUserLogin();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
        }

        final String user = isUser.get();

        Optional<Lecturer> lecturer = lecturerRepository.findOneByUserLogin(user);
        return ResponseUtil.wrapOrNotFound(lecturer);
    }

    /**
     * {@code DELETE  /lecturers/:id} : delete the "id" lecturer.
     *
     * @param id the id of the lecturer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lecturers/{id}")
    public ResponseEntity<Void> deleteLecturer(@PathVariable Long id) {
        log.debug("REST request to delete Lecturer : {}", id);
        lecturerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
