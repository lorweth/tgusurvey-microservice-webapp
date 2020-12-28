package vn.vnedu.tgusurvey.surveystore.service.dto;

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Answer;

public class dataStatisticsDTO {
    private Answer answer;
    private Long count;

    public dataStatisticsDTO(){}

    public dataStatisticsDTO(Answer answer, Long count){
        this.answer = answer;
        this.count = count;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getCount() {
        return count;
    }

    @Override
    public String toString() {
        return "dataStatisticsDTO{" +
            "answer=" + answer +
            ", count=" + count +
            '}';
    }
}
