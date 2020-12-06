package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.Specialized;
import vn.vnedu.tgusurvey.surveystore.repository.SpecializedRepository;
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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.Specialized}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SpecializedResource {

    private final Logger log = LoggerFactory.getLogger(SpecializedResource.class);

    private static final String ENTITY_NAME = "surveystoreSpecialized";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpecializedRepository specializedRepository;

    public SpecializedResource(SpecializedRepository specializedRepository) {
        this.specializedRepository = specializedRepository;
    }

    /**
     * {@code POST  /specializeds} : Create a new specialized.
     *
     * @param specialized the specialized to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new specialized, or with status {@code 400 (Bad Request)} if the specialized has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/specializeds")
    public ResponseEntity<Specialized> createSpecialized(@Valid @RequestBody Specialized specialized) throws URISyntaxException {
        log.debug("REST request to save Specialized : {}", specialized);
        if (specialized.getId() != null) {
            throw new BadRequestAlertException("A new specialized cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Specialized result = specializedRepository.save(specialized);
        return ResponseEntity.created(new URI("/api/specializeds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /specializeds} : Updates an existing specialized.
     *
     * @param specialized the specialized to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated specialized,
     * or with status {@code 400 (Bad Request)} if the specialized is not valid,
     * or with status {@code 500 (Internal Server Error)} if the specialized couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/specializeds")
    public ResponseEntity<Specialized> updateSpecialized(@Valid @RequestBody Specialized specialized) throws URISyntaxException {
        log.debug("REST request to update Specialized : {}", specialized);
        if (specialized.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Specialized result = specializedRepository.save(specialized);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, specialized.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /specializeds} : get all the specializeds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of specializeds in body.
     */
    @GetMapping("/specializeds")
    public List<Specialized> getAllSpecializeds() {
        log.debug("REST request to get all Specializeds");
        return specializedRepository.findAll();
    }

    /**
     * {@code GET  /specializeds/:id} : get the "id" specialized.
     *
     * @param id the id of the specialized to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the specialized, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/specializeds/{id}")
    public ResponseEntity<Specialized> getSpecialized(@PathVariable Long id) {
        log.debug("REST request to get Specialized : {}", id);
        Optional<Specialized> specialized = specializedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(specialized);
    }

    /**
     * {@code DELETE  /specializeds/:id} : delete the "id" specialized.
     *
     * @param id the id of the specialized to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/specializeds/{id}")
    public ResponseEntity<Void> deleteSpecialized(@PathVariable Long id) {
        log.debug("REST request to delete Specialized : {}", id);
        specializedRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
