package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class ProgramItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgramItem.class);
        ProgramItem programItem1 = new ProgramItem();
        programItem1.setId(1L);
        ProgramItem programItem2 = new ProgramItem();
        programItem2.setId(programItem1.getId());
        assertThat(programItem1).isEqualTo(programItem2);
        programItem2.setId(2L);
        assertThat(programItem1).isNotEqualTo(programItem2);
        programItem1.setId(null);
        assertThat(programItem1).isNotEqualTo(programItem2);
    }
}
