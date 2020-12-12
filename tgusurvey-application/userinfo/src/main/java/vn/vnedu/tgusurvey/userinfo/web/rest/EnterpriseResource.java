package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.domain.Enterprise;
import vn.vnedu.tgusurvey.userinfo.domain.Students;
import vn.vnedu.tgusurvey.userinfo.repository.EnterpriseRepository;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.security.SecurityUtils;
import vn.vnedu.tgusurvey.userinfo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.userinfo.domain.Enterprise}.
 */
@RestController
@RequestMapping("/api")
public class EnterpriseResource {

    private final Logger log = LoggerFactory.getLogger(EnterpriseResource.class);

    private static final String ENTITY_NAME = "userinfoEnterprise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnterpriseRepository enterpriseRepository;

    private final UserRepository userRepository;

    public EnterpriseResource(EnterpriseRepository enterpriseRepository, UserRepository userRepository) {
        this.enterpriseRepository = enterpriseRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /enterprises} : Create a new enterprise.
     *
     * @param enterprise the enterprise to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enterprise, or with status {@code 400 (Bad Request)} if the enterprise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enterprises")
    public ResponseEntity<Enterprise> createEnterprise(@Valid @RequestBody Enterprise enterprise) throws URISyntaxException {
        log.debug("REST request to save Enterprise : {}", enterprise);
        if (enterprise.getId() != null) {
            throw new BadRequestAlertException("A new enterprise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (enterprise.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(enterprise.getUser());
        }
        Enterprise result = enterpriseRepository.save(enterprise);
        return ResponseEntity.created(new URI("/api/enterprises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enterprises} : Updates an existing enterprise.
     *
     * @param enterprise the enterprise to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enterprise,
     * or with status {@code 400 (Bad Request)} if the enterprise is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enterprise couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enterprises")
    public ResponseEntity<Enterprise> updateEnterprise(@Valid @RequestBody Enterprise enterprise) throws URISyntaxException {
        log.debug("REST request to update Enterprise : {}", enterprise);
        if (enterprise.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (enterprise.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(enterprise.getUser());
        }
        Enterprise result = enterpriseRepository.save(enterprise);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enterprise.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /enterprises} : get all the enterprises.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enterprises in body.
     */
    @GetMapping("/enterprises")
    public List<Enterprise> getAllEnterprises() {
        log.debug("REST request to get all Enterprises");
        return enterpriseRepository.findAll();
    }

    /**
     * {@code GET  /enterprises/:id} : get the "id" enterprise.
     *
     * @param id the id of the enterprise to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enterprise, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enterprises/{id}")
    public ResponseEntity<Enterprise> getEnterprise(@PathVariable Long id) {
        log.debug("REST request to get Enterprise : {}", id);
        Optional<Enterprise> enterprise = enterpriseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enterprise);
    }

    /**
     * {@code GET /enterprises/myinfo} : get the current login enterprises
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enterprises, or with status {@code 404 (Not Found)}
     */
    @GetMapping("/enterprises/myinfo")
    public ResponseEntity<Enterprise> getCurrentEnterprise() {
        log.debug("REST request to get student login info");
        final Optional<String> isUser = SecurityUtils.getCurrentUserLogin();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
        }

        final String user = isUser.get();

        Optional<Enterprise> enterprise = enterpriseRepository.findOneByUserLogin(user);
        return ResponseUtil.wrapOrNotFound(enterprise);
    }

    /**
     * {@code DELETE  /enterprises/:id} : delete the "id" enterprise.
     *
     * @param id the id of the enterprise to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enterprises/{id}")
    public ResponseEntity<Void> deleteEnterprise(@PathVariable Long id) {
        log.debug("REST request to delete Enterprise : {}", id);
        enterpriseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
