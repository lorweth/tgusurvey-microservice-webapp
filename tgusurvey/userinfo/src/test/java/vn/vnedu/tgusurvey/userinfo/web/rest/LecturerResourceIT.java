package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.UserinfoApp;
import vn.vnedu.tgusurvey.userinfo.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.userinfo.domain.Lecturer;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.repository.LecturerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
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
/**
 * Integration tests for the {@link LecturerResource} REST controller.
 */
@SpringBootTest(classes = { UserinfoApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class LecturerResourceIT {

    private static final String DEFAULT_MSGV = "AAAAAAAAAA";
    private static final String UPDATED_MSGV = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DAY = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_CMND = "AAAAAAAAA";
    private static final String UPDATED_CMND = "BBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLecturerMockMvc;

    private Lecturer lecturer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lecturer createEntity(EntityManager em) {
        Lecturer lecturer = new Lecturer()
            .msgv(DEFAULT_MSGV)
            .birthDay(DEFAULT_BIRTH_DAY)
            .address(DEFAULT_ADDRESS)
            .gender(DEFAULT_GENDER)
            .cmnd(DEFAULT_CMND)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return lecturer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lecturer createUpdatedEntity(EntityManager em) {
        Lecturer lecturer = new Lecturer()
            .msgv(UPDATED_MSGV)
            .birthDay(UPDATED_BIRTH_DAY)
            .address(UPDATED_ADDRESS)
            .gender(UPDATED_GENDER)
            .cmnd(UPDATED_CMND)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return lecturer;
    }

    @BeforeEach
    public void initTest() {
        lecturer = createEntity(em);
    }

    @Test
    @Transactional
    public void createLecturer() throws Exception {
        int databaseSizeBeforeCreate = lecturerRepository.findAll().size();
        // Create the Lecturer
        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isCreated());

        // Validate the Lecturer in the database
        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeCreate + 1);
        Lecturer testLecturer = lecturerList.get(lecturerList.size() - 1);
        assertThat(testLecturer.getMsgv()).isEqualTo(DEFAULT_MSGV);
        assertThat(testLecturer.getBirthDay()).isEqualTo(DEFAULT_BIRTH_DAY);
        assertThat(testLecturer.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testLecturer.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testLecturer.getCmnd()).isEqualTo(DEFAULT_CMND);
        assertThat(testLecturer.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createLecturerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lecturerRepository.findAll().size();

        // Create the Lecturer with an existing ID
        lecturer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        // Validate the Lecturer in the database
        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMsgvIsRequired() throws Exception {
        int databaseSizeBeforeTest = lecturerRepository.findAll().size();
        // set the field null
        lecturer.setMsgv(null);

        // Create the Lecturer, which fails.


        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBirthDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = lecturerRepository.findAll().size();
        // set the field null
        lecturer.setBirthDay(null);

        // Create the Lecturer, which fails.


        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = lecturerRepository.findAll().size();
        // set the field null
        lecturer.setGender(null);

        // Create the Lecturer, which fails.


        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCmndIsRequired() throws Exception {
        int databaseSizeBeforeTest = lecturerRepository.findAll().size();
        // set the field null
        lecturer.setCmnd(null);

        // Create the Lecturer, which fails.


        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = lecturerRepository.findAll().size();
        // set the field null
        lecturer.setPhoneNumber(null);

        // Create the Lecturer, which fails.


        restLecturerMockMvc.perform(post("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLecturers() throws Exception {
        // Initialize the database
        lecturerRepository.saveAndFlush(lecturer);

        // Get all the lecturerList
        restLecturerMockMvc.perform(get("/api/lecturers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lecturer.getId().intValue())))
            .andExpect(jsonPath("$.[*].msgv").value(hasItem(DEFAULT_MSGV)))
            .andExpect(jsonPath("$.[*].birthDay").value(hasItem(DEFAULT_BIRTH_DAY.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].cmnd").value(hasItem(DEFAULT_CMND)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getLecturer() throws Exception {
        // Initialize the database
        lecturerRepository.saveAndFlush(lecturer);

        // Get the lecturer
        restLecturerMockMvc.perform(get("/api/lecturers/{id}", lecturer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lecturer.getId().intValue()))
            .andExpect(jsonPath("$.msgv").value(DEFAULT_MSGV))
            .andExpect(jsonPath("$.birthDay").value(DEFAULT_BIRTH_DAY.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.cmnd").value(DEFAULT_CMND))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingLecturer() throws Exception {
        // Get the lecturer
        restLecturerMockMvc.perform(get("/api/lecturers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLecturer() throws Exception {
        // Initialize the database
        lecturerRepository.saveAndFlush(lecturer);

        int databaseSizeBeforeUpdate = lecturerRepository.findAll().size();

        // Update the lecturer
        Lecturer updatedLecturer = lecturerRepository.findById(lecturer.getId()).get();
        // Disconnect from session so that the updates on updatedLecturer are not directly saved in db
        em.detach(updatedLecturer);
        updatedLecturer
            .msgv(UPDATED_MSGV)
            .birthDay(UPDATED_BIRTH_DAY)
            .address(UPDATED_ADDRESS)
            .gender(UPDATED_GENDER)
            .cmnd(UPDATED_CMND)
            .phoneNumber(UPDATED_PHONE_NUMBER);

        restLecturerMockMvc.perform(put("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLecturer)))
            .andExpect(status().isOk());

        // Validate the Lecturer in the database
        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeUpdate);
        Lecturer testLecturer = lecturerList.get(lecturerList.size() - 1);
        assertThat(testLecturer.getMsgv()).isEqualTo(UPDATED_MSGV);
        assertThat(testLecturer.getBirthDay()).isEqualTo(UPDATED_BIRTH_DAY);
        assertThat(testLecturer.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testLecturer.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testLecturer.getCmnd()).isEqualTo(UPDATED_CMND);
        assertThat(testLecturer.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingLecturer() throws Exception {
        int databaseSizeBeforeUpdate = lecturerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLecturerMockMvc.perform(put("/api/lecturers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lecturer)))
            .andExpect(status().isBadRequest());

        // Validate the Lecturer in the database
        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLecturer() throws Exception {
        // Initialize the database
        lecturerRepository.saveAndFlush(lecturer);

        int databaseSizeBeforeDelete = lecturerRepository.findAll().size();

        // Delete the lecturer
        restLecturerMockMvc.perform(delete("/api/lecturers/{id}", lecturer.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lecturer> lecturerList = lecturerRepository.findAll();
        assertThat(lecturerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
