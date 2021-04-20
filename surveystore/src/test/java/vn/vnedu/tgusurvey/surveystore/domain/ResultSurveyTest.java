package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class ResultSurveyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResultSurvey.class);
        ResultSurvey resultSurvey1 = new ResultSurvey();
        resultSurvey1.setId(1L);
        ResultSurvey resultSurvey2 = new ResultSurvey();
        resultSurvey2.setId(resultSurvey1.getId());
        assertThat(resultSurvey1).isEqualTo(resultSurvey2);
        resultSurvey2.setId(2L);
        assertThat(resultSurvey1).isNotEqualTo(resultSurvey2);
        resultSurvey1.setId(null);
        assertThat(resultSurvey1).isNotEqualTo(resultSurvey2);
    }
}
