package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.Subject;
import vn.vnedu.tgusurvey.surveystore.repository.SubjectRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SubjectResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class SubjectResourceIT {

    private static final String DEFAULT_MSMH = "AAAAAAAAAA";
    private static final String UPDATED_MSMH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_OF_CREDIT = 2;
    private static final Integer UPDATED_NUM_OF_CREDIT = 3;

    private static final Integer DEFAULT_THEORY_LESSON = 2;
    private static final Integer UPDATED_THEORY_LESSON = 3;

    private static final Integer DEFAULT_PRACTICE_LESSON = 2;
    private static final Integer UPDATED_PRACTICE_LESSON = 3;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubjectMockMvc;

    private Subject subject;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subject createEntity(EntityManager em) {
        Subject subject = new Subject()
            .msmh(DEFAULT_MSMH)
            .name(DEFAULT_NAME)
            .numOfCredit(DEFAULT_NUM_OF_CREDIT)
            .theoryLesson(DEFAULT_THEORY_LESSON)
            .practiceLesson(DEFAULT_PRACTICE_LESSON);
        return subject;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subject createUpdatedEntity(EntityManager em) {
        Subject subject = new Subject()
            .msmh(UPDATED_MSMH)
            .name(UPDATED_NAME)
            .numOfCredit(UPDATED_NUM_OF_CREDIT)
            .theoryLesson(UPDATED_THEORY_LESSON)
            .practiceLesson(UPDATED_PRACTICE_LESSON);
        return subject;
    }

    @BeforeEach
    public void initTest() {
        subject = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubject() throws Exception {
        int databaseSizeBeforeCreate = subjectRepository.findAll().size();
        // Create the Subject
        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isCreated());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate + 1);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getMsmh()).isEqualTo(DEFAULT_MSMH);
        assertThat(testSubject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubject.getNumOfCredit()).isEqualTo(DEFAULT_NUM_OF_CREDIT);
        assertThat(testSubject.getTheoryLesson()).isEqualTo(DEFAULT_THEORY_LESSON);
        assertThat(testSubject.getPracticeLesson()).isEqualTo(DEFAULT_PRACTICE_LESSON);
    }

    @Test
    @Transactional
    public void createSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectRepository.findAll().size();

        // Create the Subject with an existing ID
        subject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMsmhIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().size();
        // set the field null
        subject.setMsmh(null);

        // Create the Subject, which fails.


        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().size();
        // set the field null
        subject.setName(null);

        // Create the Subject, which fails.


        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumOfCreditIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().size();
        // set the field null
        subject.setNumOfCredit(null);

        // Create the Subject, which fails.


        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTheoryLessonIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().size();
        // set the field null
        subject.setTheoryLesson(null);

        // Create the Subject, which fails.


        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPracticeLessonIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().size();
        // set the field null
        subject.setPracticeLesson(null);

        // Create the Subject, which fails.


        restSubjectMockMvc.perform(post("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubjects() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        // Get all the subjectList
        restSubjectMockMvc.perform(get("/api/subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subject.getId().intValue())))
            .andExpect(jsonPath("$.[*].msmh").value(hasItem(DEFAULT_MSMH)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].numOfCredit").value(hasItem(DEFAULT_NUM_OF_CREDIT)))
            .andExpect(jsonPath("$.[*].theoryLesson").value(hasItem(DEFAULT_THEORY_LESSON)))
            .andExpect(jsonPath("$.[*].practiceLesson").value(hasItem(DEFAULT_PRACTICE_LESSON)));
    }
    
    @Test
    @Transactional
    public void getSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        // Get the subject
        restSubjectMockMvc.perform(get("/api/subjects/{id}", subject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subject.getId().intValue()))
            .andExpect(jsonPath("$.msmh").value(DEFAULT_MSMH))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.numOfCredit").value(DEFAULT_NUM_OF_CREDIT))
            .andExpect(jsonPath("$.theoryLesson").value(DEFAULT_THEORY_LESSON))
            .andExpect(jsonPath("$.practiceLesson").value(DEFAULT_PRACTICE_LESSON));
    }
    @Test
    @Transactional
    public void getNonExistingSubject() throws Exception {
        // Get the subject
        restSubjectMockMvc.perform(get("/api/subjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        int databaseSizeBeforeUpdate = subjectRepository.findAll().size();

        // Update the subject
        Subject updatedSubject = subjectRepository.findById(subject.getId()).get();
        // Disconnect from session so that the updates on updatedSubject are not directly saved in db
        em.detach(updatedSubject);
        updatedSubject
            .msmh(UPDATED_MSMH)
            .name(UPDATED_NAME)
            .numOfCredit(UPDATED_NUM_OF_CREDIT)
            .theoryLesson(UPDATED_THEORY_LESSON)
            .practiceLesson(UPDATED_PRACTICE_LESSON);

        restSubjectMockMvc.perform(put("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubject)))
            .andExpect(status().isOk());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getMsmh()).isEqualTo(UPDATED_MSMH);
        assertThat(testSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubject.getNumOfCredit()).isEqualTo(UPDATED_NUM_OF_CREDIT);
        assertThat(testSubject.getTheoryLesson()).isEqualTo(UPDATED_THEORY_LESSON);
        assertThat(testSubject.getPracticeLesson()).isEqualTo(UPDATED_PRACTICE_LESSON);
    }

    @Test
    @Transactional
    public void updateNonExistingSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubjectMockMvc.perform(put("/api/subjects").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subject)))
            .andExpect(status().isBadRequest());

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubject() throws Exception {
        // Initialize the database
        subjectRepository.saveAndFlush(subject);

        int databaseSizeBeforeDelete = subjectRepository.findAll().size();

        // Delete the subject
        restSubjectMockMvc.perform(delete("/api/subjects/{id}", subject.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subject> subjectList = subjectRepository.findAll();
        assertThat(subjectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
