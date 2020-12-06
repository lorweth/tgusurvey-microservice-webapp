package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class SurveyHeaderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SurveyHeader.class);
        SurveyHeader surveyHeader1 = new SurveyHeader();
        surveyHeader1.setId(1L);
        SurveyHeader surveyHeader2 = new SurveyHeader();
        surveyHeader2.setId(surveyHeader1.getId());
        assertThat(surveyHeader1).isEqualTo(surveyHeader2);
        surveyHeader2.setId(2L);
        assertThat(surveyHeader1).isNotEqualTo(surveyHeader2);
        surveyHeader1.setId(null);
        assertThat(surveyHeader1).isNotEqualTo(surveyHeader2);
    }
}
