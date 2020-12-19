package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyHeaderRepository;
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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SurveyHeaderResource {

    private final Logger log = LoggerFactory.getLogger(SurveyHeaderResource.class);

    private static final String ENTITY_NAME = "surveystoreSurveyHeader";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyHeaderRepository surveyHeaderRepository;

    public SurveyHeaderResource(SurveyHeaderRepository surveyHeaderRepository) {
        this.surveyHeaderRepository = surveyHeaderRepository;
    }

    /**
     * {@code POST  /survey-headers} : Create a new surveyHeader.
     *
     * @param surveyHeader the surveyHeader to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new surveyHeader, or with status {@code 400 (Bad Request)} if the surveyHeader has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/survey-headers")
    public ResponseEntity<SurveyHeader> createSurveyHeader(@Valid @RequestBody SurveyHeader surveyHeader) throws URISyntaxException {
        log.debug("REST request to save SurveyHeader : {}", surveyHeader);
        if (surveyHeader.getId() != null) {
            throw new BadRequestAlertException("A new surveyHeader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SurveyHeader result = surveyHeaderRepository.save(surveyHeader);
        return ResponseEntity.created(new URI("/api/survey-headers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /survey-headers} : Updates an existing surveyHeader.
     *
     * @param surveyHeader the surveyHeader to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated surveyHeader,
     * or with status {@code 400 (Bad Request)} if the surveyHeader is not valid,
     * or with status {@code 500 (Internal Server Error)} if the surveyHeader couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/survey-headers")
    public ResponseEntity<SurveyHeader> updateSurveyHeader(@Valid @RequestBody SurveyHeader surveyHeader) throws URISyntaxException {
        log.debug("REST request to update SurveyHeader : {}", surveyHeader);
        if (surveyHeader.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SurveyHeader result = surveyHeaderRepository.save(surveyHeader);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, surveyHeader.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /survey-headers} : get all the surveyHeaders.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveyHeaders in body.
     */
    @GetMapping("/survey-headers")
    public ResponseEntity<List<SurveyHeader>> getAllSurveyHeaders(Pageable pageable) {
        log.debug("REST request to get a page of SurveyHeaders");
        Page<SurveyHeader> page = surveyHeaderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /survey-headers/:id} : get the "id" surveyHeader.
     *
     * @param id the id of the surveyHeader to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the surveyHeader, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/survey-headers/{id}")
    public ResponseEntity<SurveyHeader> getSurveyHeader(@PathVariable Long id) {
        log.debug("REST request to get SurveyHeader : {}", id);
        Optional<SurveyHeader> surveyHeader = surveyHeaderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(surveyHeader);
    }

    /**
     * {@code DELETE  /survey-headers/:id} : delete the "id" surveyHeader.
     *
     * @param id the id of the surveyHeader to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/survey-headers/{id}")
    public ResponseEntity<Void> deleteSurveyHeader(@PathVariable Long id) {
        log.debug("REST request to delete SurveyHeader : {}", id);
        surveyHeaderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
