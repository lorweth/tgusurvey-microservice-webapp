package vn.vnedu.tgusurvey.surveystore.web.rest;

import vn.vnedu.tgusurvey.surveystore.SurveystoreApp;
import vn.vnedu.tgusurvey.surveystore.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.surveystore.domain.ProgramItem;
import vn.vnedu.tgusurvey.surveystore.repository.ProgramItemRepository;

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

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Category;
/**
 * Integration tests for the {@link ProgramItemResource} REST controller.
 */
@SpringBootTest(classes = { SurveystoreApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProgramItemResourceIT {

    private static final Category DEFAULT_CATEGORY = Category.REQUIRED;
    private static final Category UPDATED_CATEGORY = Category.OPTION;

    @Autowired
    private ProgramItemRepository programItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgramItemMockMvc;

    private ProgramItem programItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgramItem createEntity(EntityManager em) {
        ProgramItem programItem = new ProgramItem()
            .category(DEFAULT_CATEGORY);
        return programItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgramItem createUpdatedEntity(EntityManager em) {
        ProgramItem programItem = new ProgramItem()
            .category(UPDATED_CATEGORY);
        return programItem;
    }

    @BeforeEach
    public void initTest() {
        programItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramItem() throws Exception {
        int databaseSizeBeforeCreate = programItemRepository.findAll().size();
        // Create the ProgramItem
        restProgramItemMockMvc.perform(post("/api/program-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programItem)))
            .andExpect(status().isCreated());

        // Validate the ProgramItem in the database
        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProgramItem testProgramItem = programItemList.get(programItemList.size() - 1);
        assertThat(testProgramItem.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void createProgramItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programItemRepository.findAll().size();

        // Create the ProgramItem with an existing ID
        programItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramItemMockMvc.perform(post("/api/program-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramItem in the database
        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = programItemRepository.findAll().size();
        // set the field null
        programItem.setCategory(null);

        // Create the ProgramItem, which fails.


        restProgramItemMockMvc.perform(post("/api/program-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programItem)))
            .andExpect(status().isBadRequest());

        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProgramItems() throws Exception {
        // Initialize the database
        programItemRepository.saveAndFlush(programItem);

        // Get all the programItemList
        restProgramItemMockMvc.perform(get("/api/program-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }
    
    @Test
    @Transactional
    public void getProgramItem() throws Exception {
        // Initialize the database
        programItemRepository.saveAndFlush(programItem);

        // Get the programItem
        restProgramItemMockMvc.perform(get("/api/program-items/{id}", programItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(programItem.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProgramItem() throws Exception {
        // Get the programItem
        restProgramItemMockMvc.perform(get("/api/program-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramItem() throws Exception {
        // Initialize the database
        programItemRepository.saveAndFlush(programItem);

        int databaseSizeBeforeUpdate = programItemRepository.findAll().size();

        // Update the programItem
        ProgramItem updatedProgramItem = programItemRepository.findById(programItem.getId()).get();
        // Disconnect from session so that the updates on updatedProgramItem are not directly saved in db
        em.detach(updatedProgramItem);
        updatedProgramItem
            .category(UPDATED_CATEGORY);

        restProgramItemMockMvc.perform(put("/api/program-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProgramItem)))
            .andExpect(status().isOk());

        // Validate the ProgramItem in the database
        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeUpdate);
        ProgramItem testProgramItem = programItemList.get(programItemList.size() - 1);
        assertThat(testProgramItem.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramItem() throws Exception {
        int databaseSizeBeforeUpdate = programItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramItemMockMvc.perform(put("/api/program-items").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramItem in the database
        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProgramItem() throws Exception {
        // Initialize the database
        programItemRepository.saveAndFlush(programItem);

        int databaseSizeBeforeDelete = programItemRepository.findAll().size();

        // Delete the programItem
        restProgramItemMockMvc.perform(delete("/api/program-items/{id}", programItem.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProgramItem> programItemList = programItemRepository.findAll();
        assertThat(programItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
