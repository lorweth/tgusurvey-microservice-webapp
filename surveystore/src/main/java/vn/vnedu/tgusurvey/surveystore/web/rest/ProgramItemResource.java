package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.domain.ProgramItem;
import vn.vnedu.tgusurvey.surveystore.repository.ProgramItemRepository;
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
 * REST controller for managing {@link vn.vnedu.tgusurvey.surveystore.domain.ProgramItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProgramItemResource {

    private final Logger log = LoggerFactory.getLogger(ProgramItemResource.class);

    private static final String ENTITY_NAME = "surveystoreProgramItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramItemRepository programItemRepository;

    public ProgramItemResource(ProgramItemRepository programItemRepository) {
        this.programItemRepository = programItemRepository;
    }

    /**
     * {@code POST  /program-items} : Create a new programItem.
     *
     * @param programItem the programItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programItem, or with status {@code 400 (Bad Request)} if the programItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/program-items")
    public ResponseEntity<ProgramItem> createProgramItem(@Valid @RequestBody ProgramItem programItem) throws URISyntaxException {
        log.debug("REST request to save ProgramItem : {}", programItem);
        if (programItem.getId() != null) {
            throw new BadRequestAlertException("A new programItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProgramItem result = programItemRepository.save(programItem);
        return ResponseEntity.created(new URI("/api/program-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /program-items} : Updates an existing programItem.
     *
     * @param programItem the programItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programItem,
     * or with status {@code 400 (Bad Request)} if the programItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/program-items")
    public ResponseEntity<ProgramItem> updateProgramItem(@Valid @RequestBody ProgramItem programItem) throws URISyntaxException {
        log.debug("REST request to update ProgramItem : {}", programItem);
        if (programItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProgramItem result = programItemRepository.save(programItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /program-items} : get all the programItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programItems in body.
     */
    @GetMapping("/program-items")
    public ResponseEntity<List<ProgramItem>> getAllProgramItems(Pageable pageable) {
        log.debug("REST request to get a page of ProgramItems");
        Page<ProgramItem> page = programItemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /program-items/:id} : get the "id" programItem.
     *
     * @param id the id of the programItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/program-items/{id}")
    public ResponseEntity<ProgramItem> getProgramItem(@PathVariable Long id) {
        log.debug("REST request to get ProgramItem : {}", id);
        Optional<ProgramItem> programItem = programItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programItem);
    }

    /**
     * {@code GET  /program-items/in-program/:id} : get all the programItems in the "id" program.
     *
     * @param id the id of the program to retrieve, pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programItems in body.
     */
    @GetMapping("/program-items/in-program/{id}")
    public ResponseEntity<List<ProgramItem>> getProgramItemsInProgram(@PathVariable Long id, Pageable pageable) {
        log.debug("REST request to get ProgramItem from the Program : {}", id);
        Page<ProgramItem> page = programItemRepository.findByProgramId(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code DELETE  /program-items/:id} : delete the "id" programItem.
     *
     * @param id the id of the programItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/program-items/{id}")
    public ResponseEntity<Void> deleteProgramItem(@PathVariable Long id) {
        log.debug("REST request to delete ProgramItem : {}", id);
        programItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
