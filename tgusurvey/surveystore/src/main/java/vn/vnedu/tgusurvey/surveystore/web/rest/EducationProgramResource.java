package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.EducationProgram;
import vn.vnedu.tgusurvey.surveystore.repository.EducationProgramRepository;
import vn.vnedu.tgusurvey.surveystore.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.EducationProgram}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EducationProgramResource {

    private final Logger log = LoggerFactory.getLogger(EducationProgramResource.class);

    private static final String ENTITY_NAME = "surveystoreEducationProgram";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EducationProgramRepository educationProgramRepository;

    public EducationProgramResource(EducationProgramRepository educationProgramRepository) {
        this.educationProgramRepository = educationProgramRepository;
    }

    /**
     * {@code POST  /education-programs} : Create a new educationProgram.
     *
     * @param educationProgram the educationProgram to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new educationProgram, or with status {@code 400 (Bad Request)} if the educationProgram has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/education-programs")
    public ResponseEntity<EducationProgram> createEducationProgram(@Valid @RequestBody EducationProgram educationProgram) throws URISyntaxException {
        log.debug("REST request to save EducationProgram : {}", educationProgram);
        if (educationProgram.getId() != null) {
            throw new BadRequestAlertException("A new educationProgram cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EducationProgram result = educationProgramRepository.save(educationProgram);
        return ResponseEntity.created(new URI("/api/education-programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /education-programs} : Updates an existing educationProgram.
     *
     * @param educationProgram the educationProgram to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated educationProgram,
     * or with status {@code 400 (Bad Request)} if the educationProgram is not valid,
     * or with status {@code 500 (Internal Server Error)} if the educationProgram couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/education-programs")
    public ResponseEntity<EducationProgram> updateEducationProgram(@Valid @RequestBody EducationProgram educationProgram) throws URISyntaxException {
        log.debug("REST request to update EducationProgram : {}", educationProgram);
        if (educationProgram.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EducationProgram result = educationProgramRepository.save(educationProgram);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, educationProgram.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /education-programs} : get all the educationPrograms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of educationPrograms in body.
     */
    @GetMapping("/education-programs")
    public List<EducationProgram> getAllEducationPrograms() {
        log.debug("REST request to get all EducationPrograms");
        return educationProgramRepository.findAll();
    }

    /**
     * {@code GET  /education-programs/:id} : get the "id" educationProgram.
     *
     * @param id the id of the educationProgram to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the educationProgram, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/education-programs/{id}")
    public ResponseEntity<EducationProgram> getEducationProgram(@PathVariable Long id) {
        log.debug("REST request to get EducationProgram : {}", id);
        Optional<EducationProgram> educationProgram = educationProgramRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(educationProgram);
    }

    /**
     * {@code DELETE  /education-programs/:id} : delete the "id" educationProgram.
     *
     * @param id the id of the educationProgram to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/education-programs/{id}")
    public ResponseEntity<Void> deleteEducationProgram(@PathVariable Long id) {
        log.debug("REST request to delete EducationProgram : {}", id);
        educationProgramRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
