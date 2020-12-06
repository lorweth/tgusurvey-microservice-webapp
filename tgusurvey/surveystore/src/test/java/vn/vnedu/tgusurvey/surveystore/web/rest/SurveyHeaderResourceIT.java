package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyHeaderRepository;

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
 * Integration tests for the {@link SurveyHeaderResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class SurveyHeaderResourceIT {

    private static final Integer DEFAULT_STT = 1;
    private static final Integer UPDATED_STT = 2;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private SurveyHeaderRepository surveyHeaderRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSurveyHeaderMockMvc;

    private SurveyHeader surveyHeader;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyHeader createEntity(EntityManager em) {
        SurveyHeader surveyHeader = new SurveyHeader()
            .stt(DEFAULT_STT)
            .title(DEFAULT_TITLE);
        return surveyHeader;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyHeader createUpdatedEntity(EntityManager em) {
        SurveyHeader surveyHeader = new SurveyHeader()
            .stt(UPDATED_STT)
            .title(UPDATED_TITLE);
        return surveyHeader;
    }

    @BeforeEach
    public void initTest() {
        surveyHeader = createEntity(em);
    }

    @Test
    @Transactional
    public void createSurveyHeader() throws Exception {
        int databaseSizeBeforeCreate = surveyHeaderRepository.findAll().size();
        // Create the SurveyHeader
        restSurveyHeaderMockMvc.perform(post("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyHeader)))
            .andExpect(status().isCreated());

        // Validate the SurveyHeader in the database
        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeCreate + 1);
        SurveyHeader testSurveyHeader = surveyHeaderList.get(surveyHeaderList.size() - 1);
        assertThat(testSurveyHeader.getStt()).isEqualTo(DEFAULT_STT);
        assertThat(testSurveyHeader.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createSurveyHeaderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = surveyHeaderRepository.findAll().size();

        // Create the SurveyHeader with an existing ID
        surveyHeader.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSurveyHeaderMockMvc.perform(post("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyHeader)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyHeader in the database
        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSttIsRequired() throws Exception {
        int databaseSizeBeforeTest = surveyHeaderRepository.findAll().size();
        // set the field null
        surveyHeader.setStt(null);

        // Create the SurveyHeader, which fails.


        restSurveyHeaderMockMvc.perform(post("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyHeader)))
            .andExpect(status().isBadRequest());

        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = surveyHeaderRepository.findAll().size();
        // set the field null
        surveyHeader.setTitle(null);

        // Create the SurveyHeader, which fails.


        restSurveyHeaderMockMvc.perform(post("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyHeader)))
            .andExpect(status().isBadRequest());

        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSurveyHeaders() throws Exception {
        // Initialize the database
        surveyHeaderRepository.saveAndFlush(surveyHeader);

        // Get all the surveyHeaderList
        restSurveyHeaderMockMvc.perform(get("/api/survey-headers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyHeader.getId().intValue())))
            .andExpect(jsonPath("$.[*].stt").value(hasItem(DEFAULT_STT)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)));
    }
    
    @Test
    @Transactional
    public void getSurveyHeader() throws Exception {
        // Initialize the database
        surveyHeaderRepository.saveAndFlush(surveyHeader);

        // Get the surveyHeader
        restSurveyHeaderMockMvc.perform(get("/api/survey-headers/{id}", surveyHeader.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(surveyHeader.getId().intValue()))
            .andExpect(jsonPath("$.stt").value(DEFAULT_STT))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE));
    }
    @Test
    @Transactional
    public void getNonExistingSurveyHeader() throws Exception {
        // Get the surveyHeader
        restSurveyHeaderMockMvc.perform(get("/api/survey-headers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSurveyHeader() throws Exception {
        // Initialize the database
        surveyHeaderRepository.saveAndFlush(surveyHeader);

        int databaseSizeBeforeUpdate = surveyHeaderRepository.findAll().size();

        // Update the surveyHeader
        SurveyHeader updatedSurveyHeader = surveyHeaderRepository.findById(surveyHeader.getId()).get();
        // Disconnect from session so that the updates on updatedSurveyHeader are not directly saved in db
        em.detach(updatedSurveyHeader);
        updatedSurveyHeader
            .stt(UPDATED_STT)
            .title(UPDATED_TITLE);

        restSurveyHeaderMockMvc.perform(put("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSurveyHeader)))
            .andExpect(status().isOk());

        // Validate the SurveyHeader in the database
        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeUpdate);
        SurveyHeader testSurveyHeader = surveyHeaderList.get(surveyHeaderList.size() - 1);
        assertThat(testSurveyHeader.getStt()).isEqualTo(UPDATED_STT);
        assertThat(testSurveyHeader.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingSurveyHeader() throws Exception {
        int databaseSizeBeforeUpdate = surveyHeaderRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSurveyHeaderMockMvc.perform(put("/api/survey-headers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(surveyHeader)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyHeader in the database
        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSurveyHeader() throws Exception {
        // Initialize the database
        surveyHeaderRepository.saveAndFlush(surveyHeader);

        int databaseSizeBeforeDelete = surveyHeaderRepository.findAll().size();

        // Delete the surveyHeader
        restSurveyHeaderMockMvc.perform(delete("/api/survey-headers/{id}", surveyHeader.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SurveyHeader> surveyHeaderList = surveyHeaderRepository.findAll();
        assertThat(surveyHeaderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
