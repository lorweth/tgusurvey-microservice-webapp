package vn.vnedu.tgusurvey.userinfo.web.rest;

import vn.vnedu.tgusurvey.userinfo.UserinfoApp;
import vn.vnedu.tgusurvey.userinfo.config.TestSecurityConfiguration;
import vn.vnedu.tgusurvey.userinfo.domain.Classroom;
import vn.vnedu.tgusurvey.userinfo.repository.ClassroomRepository;

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
 * Integration tests for the {@link ClassroomResource} REST controller.
 */
@SpringBootTest(classes = { UserinfoApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class ClassroomResourceIT {

    private static final String DEFAULT_MSLH = "AAAAAAAAAA";
    private static final String UPDATED_MSLH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClassroomMockMvc;

    private Classroom classroom;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Classroom createEntity(EntityManager em) {
        Classroom classroom = new Classroom()
            .mslh(DEFAULT_MSLH)
            .name(DEFAULT_NAME);
        return classroom;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Classroom createUpdatedEntity(EntityManager em) {
        Classroom classroom = new Classroom()
            .mslh(UPDATED_MSLH)
            .name(UPDATED_NAME);
        return classroom;
    }

    @BeforeEach
    public void initTest() {
        classroom = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassroom() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();
        // Create the Classroom
        restClassroomMockMvc.perform(post("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(classroom)))
            .andExpect(status().isCreated());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate + 1);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getMslh()).isEqualTo(DEFAULT_MSLH);
        assertThat(testClassroom.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createClassroomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();

        // Create the Classroom with an existing ID
        classroom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomMockMvc.perform(post("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(classroom)))
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMslhIsRequired() throws Exception {
        int databaseSizeBeforeTest = classroomRepository.findAll().size();
        // set the field null
        classroom.setMslh(null);

        // Create the Classroom, which fails.


        restClassroomMockMvc.perform(post("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(classroom)))
            .andExpect(status().isBadRequest());

        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = classroomRepository.findAll().size();
        // set the field null
        classroom.setName(null);

        // Create the Classroom, which fails.


        restClassroomMockMvc.perform(post("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(classroom)))
            .andExpect(status().isBadRequest());

        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClassrooms() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get all the classroomList
        restClassroomMockMvc.perform(get("/api/classrooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroom.getId().intValue())))
            .andExpect(jsonPath("$.[*].mslh").value(hasItem(DEFAULT_MSLH)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", classroom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(classroom.getId().intValue()))
            .andExpect(jsonPath("$.mslh").value(DEFAULT_MSLH))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingClassroom() throws Exception {
        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // Update the classroom
        Classroom updatedClassroom = classroomRepository.findById(classroom.getId()).get();
        // Disconnect from session so that the updates on updatedClassroom are not directly saved in db
        em.detach(updatedClassroom);
        updatedClassroom
            .mslh(UPDATED_MSLH)
            .name(UPDATED_NAME);

        restClassroomMockMvc.perform(put("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClassroom)))
            .andExpect(status().isOk());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getMslh()).isEqualTo(UPDATED_MSLH);
        assertThat(testClassroom.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingClassroom() throws Exception {
        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomMockMvc.perform(put("/api/classrooms").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(classroom)))
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        int databaseSizeBeforeDelete = classroomRepository.findAll().size();

        // Delete the classroom
        restClassroomMockMvc.perform(delete("/api/classrooms/{id}", classroom.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
