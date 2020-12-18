package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.Subject;
import vn.vnedu.tgusurvey.surveystore.repository.SubjectRepository;
import vn.vnedu.tgusurvey.surveystore.web.rest.errors.BadRequestAlertException;

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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.Subject}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubjectResource {

    private final Logger log = LoggerFactory.getLogger(SubjectResource.class);

    private static final String ENTITY_NAME = "surveystoreSubject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectRepository subjectRepository;

    public SubjectResource(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    /**
     * {@code POST  /subjects} : Create a new subject.
     *
     * @param subject the subject to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subject, or with status {@code 400 (Bad Request)} if the subject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@Valid @RequestBody Subject subject) throws URISyntaxException {
        log.debug("REST request to save Subject : {}", subject);
        if (subject.getId() != null) {
            throw new BadRequestAlertException("A new subject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subject result = subjectRepository.save(subject);
        return ResponseEntity.created(new URI("/api/subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subjects} : Updates an existing subject.
     *
     * @param subject the subject to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subject,
     * or with status {@code 400 (Bad Request)} if the subject is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subject couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subjects")
    public ResponseEntity<Subject> updateSubject(@Valid @RequestBody Subject subject) throws URISyntaxException {
        log.debug("REST request to update Subject : {}", subject);
        if (subject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subject result = subjectRepository.save(subject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subject.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subjects} : get all the subjects.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjects in body.
     */
    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects(Pageable pageable) {
        log.debug("REST request to get a page of Subjects");
        Page<Subject> page = subjectRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /subjects/:id} : get the "id" subject.
     *
     * @param id the id of the subject to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subject, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subjects/{id}")
    public ResponseEntity<Subject> getSubject(@PathVariable Long id) {
        log.debug("REST request to get Subject : {}", id);
        Optional<Subject> subject = subjectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subject);
    }

    /**
     * {@code GET  /subjects/msmh/:msmh} : get the "msmh" subject.
     *
     * @param msmh the "mã số môn học" of the subject to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subject, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subjects/msmh/{msmh}")
    public ResponseEntity<Subject> getSubjectByMsmh(@PathVariable String msmh) {
        log.debug("REST request to get Subject have msmh : {}", msmh);
        Optional<Subject> subject = subjectRepository.findByMsmh(msmh);
        return ResponseUtil.wrapOrNotFound(subject);
    }

    /**
     * {@code DELETE  /subjects/:id} : delete the "id" subject.
     *
     * @param id the id of the subject to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        log.debug("REST request to delete Subject : {}", id);
        subjectRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
