package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class SpecializedTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Specialized.class);
        Specialized specialized1 = new Specialized();
        specialized1.setId(1L);
        Specialized specialized2 = new Specialized();
        specialized2.setId(specialized1.getId());
        assertThat(specialized1).isEqualTo(specialized2);
        specialized2.setId(2L);
        assertThat(specialized1).isNotEqualTo(specialized2);
        specialized1.setId(null);
        assertThat(specialized1).isNotEqualTo(specialized2);
    }
}
