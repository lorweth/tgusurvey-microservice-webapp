package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.SubjectCondition;
import vn.vnedu.tgusurvey.surveystore.repository.SubjectConditionRepository;

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

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Constraint;
/**
 * Integration tests for the {@link SubjectConditionResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class SubjectConditionResourceIT {

    private static final Constraint DEFAULT_CONSTRAINT = Constraint.PREREQUISITE;
    private static final Constraint UPDATED_CONSTRAINT = Constraint.FIRSTSUBJECT;

    @Autowired
    private SubjectConditionRepository subjectConditionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubjectConditionMockMvc;

    private SubjectCondition subjectCondition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubjectCondition createEntity(EntityManager em) {
        SubjectCondition subjectCondition = new SubjectCondition()
            .constraint(DEFAULT_CONSTRAINT);
        return subjectCondition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubjectCondition createUpdatedEntity(EntityManager em) {
        SubjectCondition subjectCondition = new SubjectCondition()
            .constraint(UPDATED_CONSTRAINT);
        return subjectCondition;
    }

    @BeforeEach
    public void initTest() {
        subjectCondition = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubjectCondition() throws Exception {
        int databaseSizeBeforeCreate = subjectConditionRepository.findAll().size();
        // Create the SubjectCondition
        restSubjectConditionMockMvc.perform(post("/api/subject-conditions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subjectCondition)))
            .andExpect(status().isCreated());

        // Validate the SubjectCondition in the database
        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeCreate + 1);
        SubjectCondition testSubjectCondition = subjectConditionList.get(subjectConditionList.size() - 1);
        assertThat(testSubjectCondition.getConstraint()).isEqualTo(DEFAULT_CONSTRAINT);
    }

    @Test
    @Transactional
    public void createSubjectConditionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectConditionRepository.findAll().size();

        // Create the SubjectCondition with an existing ID
        subjectCondition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectConditionMockMvc.perform(post("/api/subject-conditions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subjectCondition)))
            .andExpect(status().isBadRequest());

        // Validate the SubjectCondition in the database
        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkConstraintIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectConditionRepository.findAll().size();
        // set the field null
        subjectCondition.setConstraint(null);

        // Create the SubjectCondition, which fails.


        restSubjectConditionMockMvc.perform(post("/api/subject-conditions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subjectCondition)))
            .andExpect(status().isBadRequest());

        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubjectConditions() throws Exception {
        // Initialize the database
        subjectConditionRepository.saveAndFlush(subjectCondition);

        // Get all the subjectConditionList
        restSubjectConditionMockMvc.perform(get("/api/subject-conditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subjectCondition.getId().intValue())))
            .andExpect(jsonPath("$.[*].constraint").value(hasItem(DEFAULT_CONSTRAINT.toString())));
    }
    
    @Test
    @Transactional
    public void getSubjectCondition() throws Exception {
        // Initialize the database
        subjectConditionRepository.saveAndFlush(subjectCondition);

        // Get the subjectCondition
        restSubjectConditionMockMvc.perform(get("/api/subject-conditions/{id}", subjectCondition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subjectCondition.getId().intValue()))
            .andExpect(jsonPath("$.constraint").value(DEFAULT_CONSTRAINT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubjectCondition() throws Exception {
        // Get the subjectCondition
        restSubjectConditionMockMvc.perform(get("/api/subject-conditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubjectCondition() throws Exception {
        // Initialize the database
        subjectConditionRepository.saveAndFlush(subjectCondition);

        int databaseSizeBeforeUpdate = subjectConditionRepository.findAll().size();

        // Update the subjectCondition
        SubjectCondition updatedSubjectCondition = subjectConditionRepository.findById(subjectCondition.getId()).get();
        // Disconnect from session so that the updates on updatedSubjectCondition are not directly saved in db
        em.detach(updatedSubjectCondition);
        updatedSubjectCondition
            .constraint(UPDATED_CONSTRAINT);

        restSubjectConditionMockMvc.perform(put("/api/subject-conditions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubjectCondition)))
            .andExpect(status().isOk());

        // Validate the SubjectCondition in the database
        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeUpdate);
        SubjectCondition testSubjectCondition = subjectConditionList.get(subjectConditionList.size() - 1);
        assertThat(testSubjectCondition.getConstraint()).isEqualTo(UPDATED_CONSTRAINT);
    }

    @Test
    @Transactional
    public void updateNonExistingSubjectCondition() throws Exception {
        int databaseSizeBeforeUpdate = subjectConditionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubjectConditionMockMvc.perform(put("/api/subject-conditions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subjectCondition)))
            .andExpect(status().isBadRequest());

        // Validate the SubjectCondition in the database
        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubjectCondition() throws Exception {
        // Initialize the database
        subjectConditionRepository.saveAndFlush(subjectCondition);

        int databaseSizeBeforeDelete = subjectConditionRepository.findAll().size();

        // Delete the subjectCondition
        restSubjectConditionMockMvc.perform(delete("/api/subject-conditions/{id}", subjectCondition.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubjectCondition> subjectConditionList = subjectConditionRepository.findAll();
        assertThat(subjectConditionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
