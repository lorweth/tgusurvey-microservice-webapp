package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.Specialized;
import vn.vnedu.tgusurvey.surveystore.repository.SpecializedRepository;

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
 * Integration tests for the {@link SpecializedResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class SpecializedResourceIT {

    private static final String DEFAULT_MSCN = "AAAAAAAAAA";
    private static final String UPDATED_MSCN = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SpecializedRepository specializedRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpecializedMockMvc;

    private Specialized specialized;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Specialized createEntity(EntityManager em) {
        Specialized specialized = new Specialized()
            .mscn(DEFAULT_MSCN)
            .name(DEFAULT_NAME);
        return specialized;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Specialized createUpdatedEntity(EntityManager em) {
        Specialized specialized = new Specialized()
            .mscn(UPDATED_MSCN)
            .name(UPDATED_NAME);
        return specialized;
    }

    @BeforeEach
    public void initTest() {
        specialized = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpecialized() throws Exception {
        int databaseSizeBeforeCreate = specializedRepository.findAll().size();
        // Create the Specialized
        restSpecializedMockMvc.perform(post("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(specialized)))
            .andExpect(status().isCreated());

        // Validate the Specialized in the database
        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeCreate + 1);
        Specialized testSpecialized = specializedList.get(specializedList.size() - 1);
        assertThat(testSpecialized.getMscn()).isEqualTo(DEFAULT_MSCN);
        assertThat(testSpecialized.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSpecializedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = specializedRepository.findAll().size();

        // Create the Specialized with an existing ID
        specialized.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpecializedMockMvc.perform(post("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(specialized)))
            .andExpect(status().isBadRequest());

        // Validate the Specialized in the database
        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMscnIsRequired() throws Exception {
        int databaseSizeBeforeTest = specializedRepository.findAll().size();
        // set the field null
        specialized.setMscn(null);

        // Create the Specialized, which fails.


        restSpecializedMockMvc.perform(post("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(specialized)))
            .andExpect(status().isBadRequest());

        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = specializedRepository.findAll().size();
        // set the field null
        specialized.setName(null);

        // Create the Specialized, which fails.


        restSpecializedMockMvc.perform(post("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(specialized)))
            .andExpect(status().isBadRequest());

        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpecializeds() throws Exception {
        // Initialize the database
        specializedRepository.saveAndFlush(specialized);

        // Get all the specializedList
        restSpecializedMockMvc.perform(get("/api/specializeds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(specialized.getId().intValue())))
            .andExpect(jsonPath("$.[*].mscn").value(hasItem(DEFAULT_MSCN)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getSpecialized() throws Exception {
        // Initialize the database
        specializedRepository.saveAndFlush(specialized);

        // Get the specialized
        restSpecializedMockMvc.perform(get("/api/specializeds/{id}", specialized.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(specialized.getId().intValue()))
            .andExpect(jsonPath("$.mscn").value(DEFAULT_MSCN))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingSpecialized() throws Exception {
        // Get the specialized
        restSpecializedMockMvc.perform(get("/api/specializeds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpecialized() throws Exception {
        // Initialize the database
        specializedRepository.saveAndFlush(specialized);

        int databaseSizeBeforeUpdate = specializedRepository.findAll().size();

        // Update the specialized
        Specialized updatedSpecialized = specializedRepository.findById(specialized.getId()).get();
        // Disconnect from session so that the updates on updatedSpecialized are not directly saved in db
        em.detach(updatedSpecialized);
        updatedSpecialized
            .mscn(UPDATED_MSCN)
            .name(UPDATED_NAME);

        restSpecializedMockMvc.perform(put("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpecialized)))
            .andExpect(status().isOk());

        // Validate the Specialized in the database
        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeUpdate);
        Specialized testSpecialized = specializedList.get(specializedList.size() - 1);
        assertThat(testSpecialized.getMscn()).isEqualTo(UPDATED_MSCN);
        assertThat(testSpecialized.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSpecialized() throws Exception {
        int databaseSizeBeforeUpdate = specializedRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecializedMockMvc.perform(put("/api/specializeds").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(specialized)))
            .andExpect(status().isBadRequest());

        // Validate the Specialized in the database
        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpecialized() throws Exception {
        // Initialize the database
        specializedRepository.saveAndFlush(specialized);

        int databaseSizeBeforeDelete = specializedRepository.findAll().size();

        // Delete the specialized
        restSpecializedMockMvc.perform(delete("/api/specializeds/{id}", specialized.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Specialized> specializedList = specializedRepository.findAll();
        assertThat(specializedList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
