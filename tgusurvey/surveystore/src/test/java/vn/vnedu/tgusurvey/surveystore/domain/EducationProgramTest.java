package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class EducationProgramTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationProgram.class);
        EducationProgram educationProgram1 = new EducationProgram();
        educationProgram1.setId(1L);
        EducationProgram educationProgram2 = new EducationProgram();
        educationProgram2.setId(educationProgram1.getId());
        assertThat(educationProgram1).isEqualTo(educationProgram2);
        educationProgram2.setId(2L);
        assertThat(educationProgram1).isNotEqualTo(educationProgram2);
        educationProgram1.setId(null);
        assertThat(educationProgram1).isNotEqualTo(educationProgram2);
    }
}
