package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition;
import vn.vnedu.tgusurvey.surveystore.repository.SubjectConditionRepository;
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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubjectConditionResource {

    private final Logger log = LoggerFactory.getLogger(SubjectConditionResource.class);

    private static final String ENTITY_NAME = "surveystoreSubjectCondition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectConditionRepository subjectConditionRepository;

    public SubjectConditionResource(SubjectConditionRepository subjectConditionRepository) {
        this.subjectConditionRepository = subjectConditionRepository;
    }

    /**
     * {@code POST  /subject-conditions} : Create a new subjectCondition.
     *
     * @param subjectCondition the subjectCondition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subjectCondition, or with status {@code 400 (Bad Request)} if the subjectCondition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subject-conditions")
    public ResponseEntity<SubjectCondition> createSubjectCondition(@Valid @RequestBody SubjectCondition subjectCondition) throws URISyntaxException {
        log.debug("REST request to save SubjectCondition : {}", subjectCondition);
        if (subjectCondition.getId() != null) {
            throw new BadRequestAlertException("A new subjectCondition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubjectCondition result = subjectConditionRepository.save(subjectCondition);
        return ResponseEntity.created(new URI("/api/subject-conditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subject-conditions} : Updates an existing subjectCondition.
     *
     * @param subjectCondition the subjectCondition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectCondition,
     * or with status {@code 400 (Bad Request)} if the subjectCondition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subjectCondition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subject-conditions")
    public ResponseEntity<SubjectCondition> updateSubjectCondition(@Valid @RequestBody SubjectCondition subjectCondition) throws URISyntaxException {
        log.debug("REST request to update SubjectCondition : {}", subjectCondition);
        if (subjectCondition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubjectCondition result = subjectConditionRepository.save(subjectCondition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subjectCondition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subject-conditions} : get all the subjectConditions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjectConditions in body.
     */
    @GetMapping("/subject-conditions")
    public List<SubjectCondition> getAllSubjectConditions() {
        log.debug("REST request to get all SubjectConditions");
        return subjectConditionRepository.findAll();
    }

    /**
     * {@code GET  /subject-conditions/:id} : get the "id" subjectCondition.
     *
     * @param id the id of the subjectCondition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subjectCondition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subject-conditions/{id}")
    public ResponseEntity<SubjectCondition> getSubjectCondition(@PathVariable Long id) {
        log.debug("REST request to get SubjectCondition : {}", id);
        Optional<SubjectCondition> subjectCondition = subjectConditionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subjectCondition);
    }

    /**
     * {@code DELETE  /subject-conditions/:id} : delete the "id" subjectCondition.
     *
     * @param id the id of the subjectCondition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subject-conditions/{id}")
    public ResponseEntity<Void> deleteSubjectCondition(@PathVariable Long id) {
        log.debug("REST request to delete SubjectCondition : {}", id);
        subjectConditionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}