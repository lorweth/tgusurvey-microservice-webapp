package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.domain.Students;
import vn.vnedu.tgusurvey.userinfo.repository.StudentsRepository;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.security.SecurityUtils;
import vn.vnedu.tgusurvey.userinfo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link vn.vnedu.tgusurvey.userinfo.domain.Students}.
 */
@RestController
@RequestMapping("/api")
public class StudentsResource {

    private final Logger log = LoggerFactory.getLogger(StudentsResource.class);

    private static final String ENTITY_NAME = "userinfoStudents";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentsRepository studentsRepository;

    private final UserRepository userRepository;

    public StudentsResource(StudentsRepository studentsRepository, UserRepository userRepository) {
        this.studentsRepository = studentsRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /students} : Create a new students.
     *
     * @param students the students to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new students, or with status {@code 400 (Bad Request)} if the students has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/students")
    public ResponseEntity<Students> createStudents(@Valid @RequestBody Students students) throws URISyntaxException {
        log.debug("REST request to save Students : {}", students);
        if (students.getId() != null) {
            throw new BadRequestAlertException("A new students cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (students.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(students.getUser());
        }
        Students result = studentsRepository.save(students);
        return ResponseEntity.created(new URI("/api/students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /students} : Updates an existing students.
     *
     * @param students the students to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated students,
     * or with status {@code 400 (Bad Request)} if the students is not valid,
     * or with status {@code 500 (Internal Server Error)} if the students couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/students")
    public ResponseEntity<Students> updateStudents(@Valid @RequestBody Students students) throws URISyntaxException {
        log.debug("REST request to update Students : {}", students);
        if (students.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (students.getUser() != null) {
            // Save user in case it's new and only exists in gateway
            userRepository.save(students.getUser());
        }
        Students result = studentsRepository.save(students);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, students.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /students} : get all the students.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of students in body.
     */
    @GetMapping("/students")
    public ResponseEntity<List<Students>> getAllStudents(Pageable pageable) {
        log.debug("REST request to get a page of Students");
        Page<Students> page = studentsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /students/in-class/:classId} : lấy tất cả students trong lớp "classId"
     *
     * @param classId "id" của lớp học
     * @param pageable thông tin phân trang
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of students in body.
     */
    @GetMapping("/students/in-class/{classId}")
    public ResponseEntity<List<Students>> getAllStudentsInClass(@PathVariable Long classId, Pageable pageable){
        log.debug("REST request to get a page of Students");
        Page<Students> page = studentsRepository.findByClassroom_Id(pageable, classId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     *  {@code GET /students/find-by-mssv/:id} Lấy danh sách các students có mssv tương tự "%in%"
     *
     * @param keyword keyword tìm kiếm
     * @param pageable thông tin phân trang
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of students in body.
     */
    @GetMapping("/students/find-by-mssv/{keyword}")
    public ResponseEntity<List<Students>> getStudentsByName(@PathVariable String keyword, Pageable pageable){
        log.debug("REST request to get a page of Students");
        Page<Students> page = studentsRepository.findByMssvContainingIgnoreCase(pageable, keyword);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /students/:id} : get the "id" students.
     *
     * @param id the id of the students to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the students, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/students/{id}")
    public ResponseEntity<Students> getStudents(@PathVariable Long id) {
        log.debug("REST request to get Students : {}", id);
        Optional<Students> students = studentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(students);
    }

    /**
     * {@code GET /students/myinfo} : get the current login students
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the students, or with status {@code 404 (Not Found)}
     */
    @GetMapping("/students/myinfo")
    public ResponseEntity<Students> getCurrentStudents() {
        log.debug("REST request to get student login info");
        final Optional<String> isUser = SecurityUtils.getCurrentUserLogin();
        if(!isUser.isPresent()) {
            log.error("User is not logged in");
        }

        final String user = isUser.get();

        Optional<Students> students = studentsRepository.findOneByUserLogin(user);
        return ResponseUtil.wrapOrNotFound(students);
    }

    /**
     * {@code DELETE  /students/:id} : delete the "id" students.
     *
     * @param id the id of the students to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudents(@PathVariable Long id) {
        log.debug("REST request to delete Students : {}", id);
        studentsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
