package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.EducationProgram;
import vn.vnedu.tgusurvey.surveystore.repository.EducationProgramRepository;

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

/**
 * Integration tests for the {@link EducationProgramResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class EducationProgramResourceIT {

    private static final String DEFAULT_MSCT = "AAAAAAAAAA";
    private static final String UPDATED_MSCT = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_YEAR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_YEAR = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EducationProgramRepository educationProgramRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEducationProgramMockMvc;

    private EducationProgram educationProgram;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EducationProgram createEntity(EntityManager em) {
        EducationProgram educationProgram = new EducationProgram()
            .msct(DEFAULT_MSCT)
            .name(DEFAULT_NAME)
            .year(DEFAULT_YEAR);
        return educationProgram;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EducationProgram createUpdatedEntity(EntityManager em) {
        EducationProgram educationProgram = new EducationProgram()
            .msct(UPDATED_MSCT)
            .name(UPDATED_NAME)
            .year(UPDATED_YEAR);
        return educationProgram;
    }

    @BeforeEach
    public void initTest() {
        educationProgram = createEntity(em);
    }

    @Test
    @Transactional
    public void createEducationProgram() throws Exception {
        int databaseSizeBeforeCreate = educationProgramRepository.findAll().size();
        // Create the EducationProgram
        restEducationProgramMockMvc.perform(post("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(educationProgram)))
            .andExpect(status().isCreated());

        // Validate the EducationProgram in the database
        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeCreate + 1);
        EducationProgram testEducationProgram = educationProgramList.get(educationProgramList.size() - 1);
        assertThat(testEducationProgram.getMsct()).isEqualTo(DEFAULT_MSCT);
        assertThat(testEducationProgram.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEducationProgram.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createEducationProgramWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = educationProgramRepository.findAll().size();

        // Create the EducationProgram with an existing ID
        educationProgram.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEducationProgramMockMvc.perform(post("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(educationProgram)))
            .andExpect(status().isBadRequest());

        // Validate the EducationProgram in the database
        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMsctIsRequired() throws Exception {
        int databaseSizeBeforeTest = educationProgramRepository.findAll().size();
        // set the field null
        educationProgram.setMsct(null);

        // Create the EducationProgram, which fails.


        restEducationProgramMockMvc.perform(post("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(educationProgram)))
            .andExpect(status().isBadRequest());

        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = educationProgramRepository.findAll().size();
        // set the field null
        educationProgram.setYear(null);

        // Create the EducationProgram, which fails.


        restEducationProgramMockMvc.perform(post("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(educationProgram)))
            .andExpect(status().isBadRequest());

        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEducationPrograms() throws Exception {
        // Initialize the database
        educationProgramRepository.saveAndFlush(educationProgram);

        // Get all the educationProgramList
        restEducationProgramMockMvc.perform(get("/api/education-programs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(educationProgram.getId().intValue())))
            .andExpect(jsonPath("$.[*].msct").value(hasItem(DEFAULT_MSCT)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.toString())));
    }
    
    @Test
    @Transactional
    public void getEducationProgram() throws Exception {
        // Initialize the database
        educationProgramRepository.saveAndFlush(educationProgram);

        // Get the educationProgram
        restEducationProgramMockMvc.perform(get("/api/education-programs/{id}", educationProgram.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(educationProgram.getId().intValue()))
            .andExpect(jsonPath("$.msct").value(DEFAULT_MSCT))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEducationProgram() throws Exception {
        // Get the educationProgram
        restEducationProgramMockMvc.perform(get("/api/education-programs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEducationProgram() throws Exception {
        // Initialize the database
        educationProgramRepository.saveAndFlush(educationProgram);

        int databaseSizeBeforeUpdate = educationProgramRepository.findAll().size();

        // Update the educationProgram
        EducationProgram updatedEducationProgram = educationProgramRepository.findById(educationProgram.getId()).get();
        // Disconnect from session so that the updates on updatedEducationProgram are not directly saved in db
        em.detach(updatedEducationProgram);
        updatedEducationProgram
            .msct(UPDATED_MSCT)
            .name(UPDATED_NAME)
            .year(UPDATED_YEAR);

        restEducationProgramMockMvc.perform(put("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEducationProgram)))
            .andExpect(status().isOk());

        // Validate the EducationProgram in the database
        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeUpdate);
        EducationProgram testEducationProgram = educationProgramList.get(educationProgramList.size() - 1);
        assertThat(testEducationProgram.getMsct()).isEqualTo(UPDATED_MSCT);
        assertThat(testEducationProgram.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEducationProgram.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingEducationProgram() throws Exception {
        int databaseSizeBeforeUpdate = educationProgramRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEducationProgramMockMvc.perform(put("/api/education-programs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(educationProgram)))
            .andExpect(status().isBadRequest());

        // Validate the EducationProgram in the database
        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEducationProgram() throws Exception {
        // Initialize the database
        educationProgramRepository.saveAndFlush(educationProgram);

        int databaseSizeBeforeDelete = educationProgramRepository.findAll().size();

        // Delete the educationProgram
        restEducationProgramMockMvc.perform(delete("/api/education-programs/{id}", educationProgram.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EducationProgram> educationProgramList = educationProgramRepository.findAll();
        assertThat(educationProgramList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
