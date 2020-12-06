package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.domain.Classroom;
import vn.vnedu.tgusurvey.userinfo.repository.ClassroomRepository;
import vn.vnedu.tgusurvey.userinfo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.userinfo.domain.Classroom}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClassroomResource {

    private final Logger log = LoggerFactory.getLogger(ClassroomResource.class);

    private static final String ENTITY_NAME = "userinfoClassroom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClassroomRepository classroomRepository;

    public ClassroomResource(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    /**
     * {@code POST  /classrooms} : Create a new classroom.
     *
     * @param classroom the classroom to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new classroom, or with status {@code 400 (Bad Request)} if the classroom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/classrooms")
    public ResponseEntity<Classroom> createClassroom(@Valid @RequestBody Classroom classroom) throws URISyntaxException {
        log.debug("REST request to save Classroom : {}", classroom);
        if (classroom.getId() != null) {
            throw new BadRequestAlertException("A new classroom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Classroom result = classroomRepository.save(classroom);
        return ResponseEntity.created(new URI("/api/classrooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /classrooms} : Updates an existing classroom.
     *
     * @param classroom the classroom to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated classroom,
     * or with status {@code 400 (Bad Request)} if the classroom is not valid,
     * or with status {@code 500 (Internal Server Error)} if the classroom couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/classrooms")
    public ResponseEntity<Classroom> updateClassroom(@Valid @RequestBody Classroom classroom) throws URISyntaxException {
        log.debug("REST request to update Classroom : {}", classroom);
        if (classroom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Classroom result = classroomRepository.save(classroom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, classroom.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /classrooms} : get all the classrooms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of classrooms in body.
     */
    @GetMapping("/classrooms")
    public List<Classroom> getAllClassrooms() {
        log.debug("REST request to get all Classrooms");
        return classroomRepository.findAll();
    }

    /**
     * {@code GET  /classrooms/:id} : get the "id" classroom.
     *
     * @param id the id of the classroom to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the classroom, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/classrooms/{id}")
    public ResponseEntity<Classroom> getClassroom(@PathVariable Long id) {
        log.debug("REST request to get Classroom : {}", id);
        Optional<Classroom> classroom = classroomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(classroom);
    }

    /**
     * {@code DELETE  /classrooms/:id} : delete the "id" classroom.
     *
     * @param id the id of the classroom to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/classrooms/{id}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long id) {
        log.debug("REST request to delete Classroom : {}", id);
        classroomRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
