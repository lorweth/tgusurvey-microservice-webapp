package vn.vnedu.tgusurvey.userinfo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.userinfo.web.rest.TestUtil;

public class StudentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Students.class);
        Students students1 = new Students();
        students1.setId(1L);
        Students students2 = new Students();
        students2.setId(students1.getId());
        assertThat(students1).isEqualTo(students2);
        students2.setId(2L);
        assertThat(students1).isNotEqualTo(students2);
        students1.setId(null);
        assertThat(students1).isNotEqualTo(students2);
    }
}
