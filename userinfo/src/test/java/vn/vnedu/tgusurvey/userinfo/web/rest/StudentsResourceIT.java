package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.UserinfoApp;
import vn.vnedu.tgusurvey.userinfo.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.userinfo.domain.Students;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.repository.StudentsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import vn.vnedu.tgusurvey.userinfo.domain.enumeration.Gender;
import vn.vnedu.tgusurvey.userinfo.domain.enumeration.GraduationStatus;
/**
 * Integration tests for the {@link StudentsResource} REST controller.
 */
@SpringBootTest(classes = { UserinfoApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class StudentsResourceIT {

    private static final String DEFAULT_MSSV = "AAAAAAAAAA";
    private static final String UPDATED_MSSV = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DAY = LocalDate.now(ZoneId.systemDefault());

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_CMND = "AAAAAAAAA";
    private static final String UPDATED_CMND = "BBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final GraduationStatus DEFAULT_GRADUATION_STATUS = GraduationStatus.GRADUATED;
    private static final GraduationStatus UPDATED_GRADUATION_STATUS = GraduationStatus.PENDING;

    @Autowired
    private StudentsRepository studentsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentsMockMvc;

    private Students students;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Students createEntity(EntityManager em) {
        Students students = new Students()
            .mssv(DEFAULT_MSSV)
            .birthDay(DEFAULT_BIRTH_DAY)
            .gender(DEFAULT_GENDER)
            .cmnd(DEFAULT_CMND)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .graduationStatus(DEFAULT_GRADUATION_STATUS);
        return students;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Students createUpdatedEntity(EntityManager em) {
        Students students = new Students()
            .mssv(UPDATED_MSSV)
            .birthDay(UPDATED_BIRTH_DAY)
            .gender(UPDATED_GENDER)
            .cmnd(UPDATED_CMND)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .graduationStatus(UPDATED_GRADUATION_STATUS);
        return students;
    }

    @BeforeEach
    public void initTest() {
        students = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudents() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();
        // Create the Students
        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isCreated());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate + 1);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getMssv()).isEqualTo(DEFAULT_MSSV);
        assertThat(testStudents.getBirthDay()).isEqualTo(DEFAULT_BIRTH_DAY);
        assertThat(testStudents.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testStudents.getCmnd()).isEqualTo(DEFAULT_CMND);
        assertThat(testStudents.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testStudents.getGraduationStatus()).isEqualTo(DEFAULT_GRADUATION_STATUS);
    }

    @Test
    @Transactional
    public void createStudentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();

        // Create the Students with an existing ID
        students.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMssvIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setMssv(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBirthDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setBirthDay(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setGender(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCmndIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setCmnd(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setPhoneNumber(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGraduationStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsRepository.findAll().size();
        // set the field null
        students.setGraduationStatus(null);

        // Create the Students, which fails.


        restStudentsMockMvc.perform(post("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get all the studentsList
        restStudentsMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(students.getId().intValue())))
            .andExpect(jsonPath("$.[*].mssv").value(hasItem(DEFAULT_MSSV)))
            .andExpect(jsonPath("$.[*].birthDay").value(hasItem(DEFAULT_BIRTH_DAY.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].cmnd").value(hasItem(DEFAULT_CMND)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].graduationStatus").value(hasItem(DEFAULT_GRADUATION_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", students.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(students.getId().intValue()))
            .andExpect(jsonPath("$.mssv").value(DEFAULT_MSSV))
            .andExpect(jsonPath("$.birthDay").value(DEFAULT_BIRTH_DAY.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.cmnd").value(DEFAULT_CMND))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.graduationStatus").value(DEFAULT_GRADUATION_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStudents() throws Exception {
        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // Update the students
        Students updatedStudents = studentsRepository.findById(students.getId()).get();
        // Disconnect from session so that the updates on updatedStudents are not directly saved in db
        em.detach(updatedStudents);
        updatedStudents
            .mssv(UPDATED_MSSV)
            .birthDay(UPDATED_BIRTH_DAY)
            .gender(UPDATED_GENDER)
            .cmnd(UPDATED_CMND)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .graduationStatus(UPDATED_GRADUATION_STATUS);

        restStudentsMockMvc.perform(put("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudents)))
            .andExpect(status().isOk());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getMssv()).isEqualTo(UPDATED_MSSV);
        assertThat(testStudents.getBirthDay()).isEqualTo(UPDATED_BIRTH_DAY);
        assertThat(testStudents.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testStudents.getCmnd()).isEqualTo(UPDATED_CMND);
        assertThat(testStudents.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testStudents.getGraduationStatus()).isEqualTo(UPDATED_GRADUATION_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingStudents() throws Exception {
        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentsMockMvc.perform(put("/api/students").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeDelete = studentsRepository.findAll().size();

        // Delete the students
        restStudentsMockMvc.perform(delete("/api/students/{id}", students.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
