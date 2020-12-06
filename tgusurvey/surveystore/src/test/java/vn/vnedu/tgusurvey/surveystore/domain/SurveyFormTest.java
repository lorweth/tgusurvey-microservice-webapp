package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class SurveyFormTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SurveyForm.class);
        SurveyForm surveyForm1 = new SurveyForm();
        surveyForm1.setId(1L);
        SurveyForm surveyForm2 = new SurveyForm();
        surveyForm2.setId(surveyForm1.getId());
        assertThat(surveyForm1).isEqualTo(surveyForm2);
        surveyForm2.setId(2L);
        assertThat(surveyForm1).isNotEqualTo(surveyForm2);
        surveyForm1.setId(null);
        assertThat(surveyForm1).isNotEqualTo(surveyForm2);
    }
}
