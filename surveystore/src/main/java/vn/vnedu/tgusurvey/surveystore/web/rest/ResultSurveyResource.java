package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.ResultSurvey;
import vn.vnedu.tgusurvey.surveystore.repository.ResultSurveyRepository;
import vn.vnedu.tgusurvey.surveystore.repository.UserRepository;
import vn.vnedu.tgusurvey.surveystore.security.SecurityUtils;
import vn.vnedu.tgusurvey.surveystore.service.ResultSurveyService;
import vn.vnedu.tgusurvey.surveystore.service.dto.dataStatisticsDTO;
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
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.ResultSurvey}.
 */
@RestController
@RequestMapping("/api")
public class ResultSurveyResource {

    private final Logger log = LoggerFactory.getLogger(ResultSurveyResource.class);

    private static final String ENTITY_NAME = "surveystoreResultSurvey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResultSurveyRepository resultSurveyRepository;
    private final ResultSurveyService resultSurveyService;
    private final UserRepository userRepository;

    public ResultSurveyResource(ResultSurveyRepository resultSurveyRepository, ResultSurveyService resultSurveyService, UserRepository userRepository) {
        this.resultSurveyRepository = resultSurveyRepository;
        this.resultSurveyService = resultSurveyService;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /result-surveys} : Create a new resultSurvey.
     *
     * @param resultSurvey the resultSurvey to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new resultSurvey, or with status {@code 400 (Bad Request)} if the resultSurvey has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/result-surveys")
    public ResponseEntity<ResultSurvey> createResultSurvey(@RequestBody ResultSurvey resultSurvey) throws URISyntaxException {
        log.debug("REST request to save ResultSurvey : {}", resultSurvey);
        if (resultSurvey.getId() != null) {
            throw new BadRequestAlertException("A new resultSurvey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (resultSurvey.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(resultSurvey.getUser());
        }
        ResultSurvey result = resultSurveyRepository.save(resultSurvey);
        return ResponseEntity.created(new URI("/api/result-surveys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /result-surveys} : Updates an existing resultSurvey.
     *
     * @param resultSurvey the resultSurvey to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated resultSurvey,
     * or with status {@code 400 (Bad Request)} if the resultSurvey is not valid,
     * or with status {@code 500 (Internal Server Error)} if the resultSurvey couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/result-surveys")
    public ResponseEntity<ResultSurvey> updateResultSurvey(@RequestBody ResultSurvey resultSurvey) throws URISyntaxException {
        log.debug("REST request to update ResultSurvey : {}", resultSurvey);
        if (resultSurvey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (resultSurvey.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(resultSurvey.getUser());
        }
        ResultSurvey result = resultSurveyRepository.save(resultSurvey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, resultSurvey.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /result-surveys} : get all the resultSurveys.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of resultSurveys in body.
     */
    @GetMapping("/result-surveys")
    public ResponseEntity<List<ResultSurvey>> getAllResultSurveys(Pageable pageable) {
        log.debug("REST request to get a page of ResultSurveys");
        Page<ResultSurvey> page = resultSurveyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /result-surveys/:id} : get the "id" resultSurvey.
     *
     * @param id the id of the resultSurvey to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the resultSurvey, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/result-surveys/{id}")
    public ResponseEntity<ResultSurvey> getResultSurvey(@PathVariable Long id) {
        log.debug("REST request to get ResultSurvey : {}", id);
        Optional<ResultSurvey> resultSurvey = resultSurveyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(resultSurvey);
    }

    /**
     * {@code GET /result-surveys/answer-of-question/:id}
     * @param id the id of the question to retrieve answer
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the resultSurvey, or status {@code (no-content)}
     */
    @GetMapping("/result-surveys/answer-of-question/{id}")
    public ResponseEntity<ResultSurvey> getAnswerOfQuestion(@PathVariable Long id) {
        log.debug("REST request to get ResultSurvey : {}", id);
        Optional<ResultSurvey> resultSurvey = resultSurveyRepository.findByUserLoginAndQuestionId(SecurityUtils.getCurrentUserLogin().orElse(null),id);
        if(!resultSurvey.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(resultSurvey.get(), HttpStatus.OK);
    }

    @GetMapping("/result-surveys/get-statistics/{idQues}")
    public List<dataStatisticsDTO> getStatisticsOfQuestion(@PathVariable Long idQues){
//        Map<String, Long> result = resultSurveyService.getStatistics(idQues);
//        return result;
        return  resultSurveyService.getStatistics(idQues);
    }

    /**
     * {@code DELETE  /result-surveys/:id} : delete the "id" resultSurvey.
     *
     * @param id the id of the resultSurvey to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/result-surveys/{id}")
    public ResponseEntity<Void> deleteResultSurvey(@PathVariable Long id) {
        log.debug("REST request to delete ResultSurvey : {}", id);
        resultSurveyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
