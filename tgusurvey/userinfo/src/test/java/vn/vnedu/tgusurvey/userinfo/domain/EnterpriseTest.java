package vn.vnedu.tgusurvey.userinfo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.userinfo.web.rest.TestUtil;

public class EnterpriseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enterprise.class);
        Enterprise enterprise1 = new Enterprise();
        enterprise1.setId(1L);
        Enterprise enterprise2 = new Enterprise();
        enterprise2.setId(enterprise1.getId());
        assertThat(enterprise1).isEqualTo(enterprise2);
        enterprise2.setId(2L);
        assertThat(enterprise1).isNotEqualTo(enterprise2);
        enterprise1.setId(null);
        assertThat(enterprise1).isNotEqualTo(enterprise2);
    }
}
