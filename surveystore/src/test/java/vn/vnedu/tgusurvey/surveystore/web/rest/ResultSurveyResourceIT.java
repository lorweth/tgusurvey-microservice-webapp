package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.ResultSurvey;
import vn.vnedu.tgusurvey.surveystore.repository.UserRepository;
import vn.vnedu.tgusurvey.surveystore.repository.ResultSurveyRepository;

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

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Answer;
/**
 * Integration tests for the {@link ResultSurveyResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ResultSurveyResourceIT {

    private static final Answer DEFAULT_ANSWER = Answer.OPTION1;
    private static final Answer UPDATED_ANSWER = Answer.OPTION2;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ResultSurveyRepository resultSurveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResultSurveyMockMvc;

    private ResultSurvey resultSurvey;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResultSurvey createEntity(EntityManager em) {
        ResultSurvey resultSurvey = new ResultSurvey()
            .answer(DEFAULT_ANSWER)
            .comment(DEFAULT_COMMENT)
            .date(DEFAULT_DATE);
        return resultSurvey;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResultSurvey createUpdatedEntity(EntityManager em) {
        ResultSurvey resultSurvey = new ResultSurvey()
            .answer(UPDATED_ANSWER)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE);
        return resultSurvey;
    }

    @BeforeEach
    public void initTest() {
        resultSurvey = createEntity(em);
    }

    @Test
    @Transactional
    public void createResultSurvey() throws Exception {
        int databaseSizeBeforeCreate = resultSurveyRepository.findAll().size();
        // Create the ResultSurvey
        restResultSurveyMockMvc.perform(post("/api/result-surveys").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultSurvey)))
            .andExpect(status().isCreated());

        // Validate the ResultSurvey in the database
        List<ResultSurvey> resultSurveyList = resultSurveyRepository.findAll();
        assertThat(resultSurveyList).hasSize(databaseSizeBeforeCreate + 1);
        ResultSurvey testResultSurvey = resultSurveyList.get(resultSurveyList.size() - 1);
        assertThat(testResultSurvey.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testResultSurvey.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testResultSurvey.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createResultSurveyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resultSurveyRepository.findAll().size();

        // Create the ResultSurvey with an existing ID
        resultSurvey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResultSurveyMockMvc.perform(post("/api/result-surveys").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultSurvey)))
            .andExpect(status().isBadRequest());

        // Validate the ResultSurvey in the database
        List<ResultSurvey> resultSurveyList = resultSurveyRepository.findAll();
        assertThat(resultSurveyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllResultSurveys() throws Exception {
        // Initialize the database
        resultSurveyRepository.saveAndFlush(resultSurvey);

        // Get all the resultSurveyList
        restResultSurveyMockMvc.perform(get("/api/result-surveys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resultSurvey.getId().intValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getResultSurvey() throws Exception {
        // Initialize the database
        resultSurveyRepository.saveAndFlush(resultSurvey);

        // Get the resultSurvey
        restResultSurveyMockMvc.perform(get("/api/result-surveys/{id}", resultSurvey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resultSurvey.getId().intValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingResultSurvey() throws Exception {
        // Get the resultSurvey
        restResultSurveyMockMvc.perform(get("/api/result-surveys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResultSurvey() throws Exception {
        // Initialize the database
        resultSurveyRepository.saveAndFlush(resultSurvey);

        int databaseSizeBeforeUpdate = resultSurveyRepository.findAll().size();

        // Update the resultSurvey
        ResultSurvey updatedResultSurvey = resultSurveyRepository.findById(resultSurvey.getId()).get();
        // Disconnect from session so that the updates on updatedResultSurvey are not directly saved in db
        em.detach(updatedResultSurvey);
        updatedResultSurvey
            .answer(UPDATED_ANSWER)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE);

        restResultSurveyMockMvc.perform(put("/api/result-surveys").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResultSurvey)))
            .andExpect(status().isOk());

        // Validate the ResultSurvey in the database
        List<ResultSurvey> resultSurveyList = resultSurveyRepository.findAll();
        assertThat(resultSurveyList).hasSize(databaseSizeBeforeUpdate);
        ResultSurvey testResultSurvey = resultSurveyList.get(resultSurveyList.size() - 1);
        assertThat(testResultSurvey.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testResultSurvey.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testResultSurvey.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingResultSurvey() throws Exception {
        int databaseSizeBeforeUpdate = resultSurveyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResultSurveyMockMvc.perform(put("/api/result-surveys").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultSurvey)))
            .andExpect(status().isBadRequest());

        // Validate the ResultSurvey in the database
        List<ResultSurvey> resultSurveyList = resultSurveyRepository.findAll();
        assertThat(resultSurveyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResultSurvey() throws Exception {
        // Initialize the database
        resultSurveyRepository.saveAndFlush(resultSurvey);

        int databaseSizeBeforeDelete = resultSurveyRepository.findAll().size();

        // Delete the resultSurvey
        restResultSurveyMockMvc.perform(delete("/api/result-surveys/{id}", resultSurvey.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ResultSurvey> resultSurveyList = resultSurveyRepository.findAll();
        assertThat(resultSurveyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
