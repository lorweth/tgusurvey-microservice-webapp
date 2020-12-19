package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyFormRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SurveyFormResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class SurveyFormResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SurveyFormRepository surveyFormRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSurveyFormMockMvc;

    private SurveyForm surveyForm;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyForm createEntity(EntityManager em) {
        SurveyForm surveyForm = new SurveyForm()
            .name(DEFAULT_NAME)
            .note(DEFAULT_NOTE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return surveyForm;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyForm createUpdatedEntity(EntityManager em) {
        SurveyForm surveyForm = new SurveyForm()
            .name(UPDATED_NAME)
            .note(UPDATED_NOTE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return surveyForm;
    }

    @BeforeEach
    public void initTest() {
        surveyForm = createEntity(em);
    }

    @Test
    @Transactional
    public void createSurveyForm() throws Exception {
        int databaseSizeBeforeCreate = surveyFormRepository.findAll().size();
        // Create the SurveyForm
        restSurveyFormMockMvc.perform(post("/api/survey-forms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyForm)))
            .andExpect(status().isCreated());

        // Validate the SurveyForm in the database
        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeCreate + 1);
        SurveyForm testSurveyForm = surveyFormList.get(surveyFormList.size() - 1);
        assertThat(testSurveyForm.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSurveyForm.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testSurveyForm.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testSurveyForm.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createSurveyFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = surveyFormRepository.findAll().size();

        // Create the SurveyForm with an existing ID
        surveyForm.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSurveyFormMockMvc.perform(post("/api/survey-forms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyForm)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyForm in the database
        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = surveyFormRepository.findAll().size();
        // set the field null
        surveyForm.setName(null);

        // Create the SurveyForm, which fails.


        restSurveyFormMockMvc.perform(post("/api/survey-forms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyForm)))
            .andExpect(status().isBadRequest());

        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSurveyForms() throws Exception {
        // Initialize the database
        surveyFormRepository.saveAndFlush(surveyForm);

        // Get all the surveyFormList
        restSurveyFormMockMvc.perform(get("/api/survey-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyForm.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSurveyForm() throws Exception {
        // Initialize the database
        surveyFormRepository.saveAndFlush(surveyForm);

        // Get the surveyForm
        restSurveyFormMockMvc.perform(get("/api/survey-forms/{id}", surveyForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(surveyForm.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSurveyForm() throws Exception {
        // Get the surveyForm
        restSurveyFormMockMvc.perform(get("/api/survey-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSurveyForm() throws Exception {
        // Initialize the database
        surveyFormRepository.saveAndFlush(surveyForm);

        int databaseSizeBeforeUpdate = surveyFormRepository.findAll().size();

        // Update the surveyForm
        SurveyForm updatedSurveyForm = surveyFormRepository.findById(surveyForm.getId()).get();
        // Disconnect from session so that the updates on updatedSurveyForm are not directly saved in db
        em.detach(updatedSurveyForm);
        updatedSurveyForm
            .name(UPDATED_NAME)
            .note(UPDATED_NOTE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restSurveyFormMockMvc.perform(put("/api/survey-forms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSurveyForm)))
            .andExpect(status().isOk());

        // Validate the SurveyForm in the database
        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeUpdate);
        SurveyForm testSurveyForm = surveyFormList.get(surveyFormList.size() - 1);
        assertThat(testSurveyForm.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSurveyForm.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testSurveyForm.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testSurveyForm.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSurveyForm() throws Exception {
        int databaseSizeBeforeUpdate = surveyFormRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSurveyFormMockMvc.perform(put("/api/survey-forms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyForm)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyForm in the database
        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSurveyForm() throws Exception {
        // Initialize the database
        surveyFormRepository.saveAndFlush(surveyForm);

        int databaseSizeBeforeDelete = surveyFormRepository.findAll().size();

        // Delete the surveyForm
        restSurveyFormMockMvc.perform(delete("/api/survey-forms/{id}", surveyForm.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SurveyForm> surveyFormList = surveyFormRepository.findAll();
        assertThat(surveyFormList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
