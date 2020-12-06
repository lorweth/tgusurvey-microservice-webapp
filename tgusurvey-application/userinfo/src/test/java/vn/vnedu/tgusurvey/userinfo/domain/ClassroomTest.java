package vn.vnedu.tgusurvey.userinfo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.userinfo.web.rest.TestUtil;

public class ClassroomTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Classroom.class);
        Classroom classroom1 = new Classroom();
        classroom1.setId(1L);
        Classroom classroom2 = new Classroom();
        classroom2.setId(classroom1.getId());
        assertThat(classroom1).isEqualTo(classroom2);
        classroom2.setId(2L);
        assertThat(classroom1).isNotEqualTo(classroom2);
        classroom1.setId(null);
        assertThat(classroom1).isNotEqualTo(classroom2);
    }
}
