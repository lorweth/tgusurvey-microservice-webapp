package vn.vnedu.tgusurvey.surveystore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.vnedu.tgusurvey.surveystore.web.rest.TestUtil;

public class SubjectConditionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectCondition.class);
        SubjectCondition subjectCondition1 = new SubjectCondition();
        subjectCondition1.setId(1L);
        SubjectCondition subjectCondition2 = new SubjectCondition();
        subjectCondition2.setId(subjectCondition1.getId());
        assertThat(subjectCondition1).isEqualTo(subjectCondition2);
        subjectCondition2.setId(2L);
        assertThat(subjectCondition1).isNotEqualTo(subjectCondition2);
        subjectCondition1.setId(null);
        assertThat(subjectCondition1).isNotEqualTo(subjectCondition2);
    }
}
