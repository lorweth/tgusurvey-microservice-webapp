package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyFormRepository;
import vn.vnedu.tgusurvey.surveystore.service.SurveyFormService;
import vn.vnedu.tgusurvey.surveystore.service.dto.SurveyFormDTO;
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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.SurveyForm}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SurveyFormResource {

    private final Logger log = LoggerFactory.getLogger(SurveyFormResource.class);

    private static final String ENTITY_NAME = "surveystoreSurveyForm";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyFormRepository surveyFormRepository;
    private final SurveyFormService surveyFormService;

    public SurveyFormResource(SurveyFormRepository surveyFormRepository, SurveyFormService surveyFormService) {
        this.surveyFormRepository = surveyFormRepository;
        this.surveyFormService = surveyFormService;
    }

    /**
     * {@code POST  /survey-forms} : Create a new surveyForm.
     *
     * @param surveyForm the surveyForm to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new surveyForm, or with status {@code 400 (Bad Request)} if the surveyForm has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/survey-forms")
    public ResponseEntity<SurveyForm> createSurveyForm(@Valid @RequestBody SurveyForm surveyForm) throws URISyntaxException {
        log.debug("REST request to save SurveyForm : {}", surveyForm);
        if (surveyForm.getId() != null) {
            throw new BadRequestAlertException("A new surveyForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SurveyForm result = surveyFormRepository.save(surveyForm);
        return ResponseEntity.created(new URI("/api/survey-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /survey-forms} : Updates an existing surveyForm.
     *
     * @param surveyForm the surveyForm to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated surveyForm,
     * or with status {@code 400 (Bad Request)} if the surveyForm is not valid,
     * or with status {@code 500 (Internal Server Error)} if the surveyForm couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/survey-forms")
    public ResponseEntity<SurveyForm> updateSurveyForm(@Valid @RequestBody SurveyForm surveyForm) throws URISyntaxException {
        log.debug("REST request to update SurveyForm : {}", surveyForm);
        if (surveyForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SurveyForm result = surveyFormRepository.save(surveyForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, surveyForm.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /survey-forms} : get all the surveyForms.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveyForms in body.
     */
    @GetMapping("/survey-forms")
    public ResponseEntity<List<SurveyForm>> getAllSurveyForms(Pageable pageable) {
        log.debug("REST request to get a page of SurveyForms");
        Page<SurveyForm> page = surveyFormRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /survey-forms/:id} : get the "id" surveyForm.
     *
     * @param id the id of the surveyForm to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the surveyForm, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/survey-forms/{id}")
    public ResponseEntity<SurveyForm> getSurveyForm(@PathVariable Long id) {
        log.debug("REST request to get SurveyForm : {}", id);
        Optional<SurveyForm> surveyForm = surveyFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(surveyForm);
    }

    @GetMapping("/survey-forms/full/{id}")
    public ResponseEntity<SurveyFormDTO> getFullSurveyForm(@PathVariable Long id) {
        log.debug("REST request to get SurveyFormDTO : {}", id);
        Optional<SurveyFormDTO> surveyFormDTO = surveyFormService.getSurveyFormDTO(id);
        return ResponseUtil.wrapOrNotFound(surveyFormDTO);
    }

    /**
     * {@code DELETE  /survey-forms/:id} : delete the "id" surveyForm.
     *
     * @param id the id of the surveyForm to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/survey-forms/{id}")
    public ResponseEntity<Void> deleteSurveyForm(@PathVariable Long id) {
        log.debug("REST request to delete SurveyForm : {}", id);
        surveyFormRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
