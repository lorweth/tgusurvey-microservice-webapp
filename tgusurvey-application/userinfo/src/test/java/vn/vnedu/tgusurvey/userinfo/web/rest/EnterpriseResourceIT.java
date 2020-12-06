package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.UserinfoApp;
import vn.vnedu.tgusurvey.userinfo.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.userinfo.domain.Enterprise;
import vn.vnedu.tgusurvey.userinfo.repository.UserRepository;
import vn.vnedu.tgusurvey.userinfo.repository.EnterpriseRepository;

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
 * Integration tests for the {@link EnterpriseResource} REST controller.
 */
@SpringBootTest(classes = { UserinfoApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class EnterpriseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_REPRESENTATIVE = "AAAAAAAAAA";
    private static final String UPDATED_REPRESENTATIVE = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_OF_BUSSINESS = "AAAAAAAAAA";
    private static final String UPDATED_LINE_OF_BUSSINESS = "BBBBBBBBBB";

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEnterpriseMockMvc;

    private Enterprise enterprise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enterprise createEntity(EntityManager em) {
        Enterprise enterprise = new Enterprise()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .representative(DEFAULT_REPRESENTATIVE)
            .lineOfBussiness(DEFAULT_LINE_OF_BUSSINESS);
        return enterprise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enterprise createUpdatedEntity(EntityManager em) {
        Enterprise enterprise = new Enterprise()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .representative(UPDATED_REPRESENTATIVE)
            .lineOfBussiness(UPDATED_LINE_OF_BUSSINESS);
        return enterprise;
    }

    @BeforeEach
    public void initTest() {
        enterprise = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnterprise() throws Exception {
        int databaseSizeBeforeCreate = enterpriseRepository.findAll().size();
        // Create the Enterprise
        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isCreated());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeCreate + 1);
        Enterprise testEnterprise = enterpriseList.get(enterpriseList.size() - 1);
        assertThat(testEnterprise.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEnterprise.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testEnterprise.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testEnterprise.getRepresentative()).isEqualTo(DEFAULT_REPRESENTATIVE);
        assertThat(testEnterprise.getLineOfBussiness()).isEqualTo(DEFAULT_LINE_OF_BUSSINESS);
    }

    @Test
    @Transactional
    public void createEnterpriseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enterpriseRepository.findAll().size();

        // Create the Enterprise with an existing ID
        enterprise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setName(null);

        // Create the Enterprise, which fails.


        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setAddress(null);

        // Create the Enterprise, which fails.


        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setPhoneNumber(null);

        // Create the Enterprise, which fails.


        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRepresentativeIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setRepresentative(null);

        // Create the Enterprise, which fails.


        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLineOfBussinessIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setLineOfBussiness(null);

        // Create the Enterprise, which fails.


        restEnterpriseMockMvc.perform(post("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnterprises() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        // Get all the enterpriseList
        restEnterpriseMockMvc.perform(get("/api/enterprises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enterprise.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].representative").value(hasItem(DEFAULT_REPRESENTATIVE)))
            .andExpect(jsonPath("$.[*].lineOfBussiness").value(hasItem(DEFAULT_LINE_OF_BUSSINESS)));
    }
    
    @Test
    @Transactional
    public void getEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        // Get the enterprise
        restEnterpriseMockMvc.perform(get("/api/enterprises/{id}", enterprise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(enterprise.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.representative").value(DEFAULT_REPRESENTATIVE))
            .andExpect(jsonPath("$.lineOfBussiness").value(DEFAULT_LINE_OF_BUSSINESS));
    }
    @Test
    @Transactional
    public void getNonExistingEnterprise() throws Exception {
        // Get the enterprise
        restEnterpriseMockMvc.perform(get("/api/enterprises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        int databaseSizeBeforeUpdate = enterpriseRepository.findAll().size();

        // Update the enterprise
        Enterprise updatedEnterprise = enterpriseRepository.findById(enterprise.getId()).get();
        // Disconnect from session so that the updates on updatedEnterprise are not directly saved in db
        em.detach(updatedEnterprise);
        updatedEnterprise
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .representative(UPDATED_REPRESENTATIVE)
            .lineOfBussiness(UPDATED_LINE_OF_BUSSINESS);

        restEnterpriseMockMvc.perform(put("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnterprise)))
            .andExpect(status().isOk());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeUpdate);
        Enterprise testEnterprise = enterpriseList.get(enterpriseList.size() - 1);
        assertThat(testEnterprise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEnterprise.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testEnterprise.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testEnterprise.getRepresentative()).isEqualTo(UPDATED_REPRESENTATIVE);
        assertThat(testEnterprise.getLineOfBussiness()).isEqualTo(UPDATED_LINE_OF_BUSSINESS);
    }

    @Test
    @Transactional
    public void updateNonExistingEnterprise() throws Exception {
        int databaseSizeBeforeUpdate = enterpriseRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnterpriseMockMvc.perform(put("/api/enterprises").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enterprise)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        int databaseSizeBeforeDelete = enterpriseRepository.findAll().size();

        // Delete the enterprise
        restEnterpriseMockMvc.perform(delete("/api/enterprises/{id}", enterprise.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
