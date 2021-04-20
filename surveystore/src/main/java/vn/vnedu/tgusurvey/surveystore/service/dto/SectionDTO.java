package vn.vnedu.tgusurvey.surveystore.service.dto;

import java.util.List;

public class SectionDTO {
    private Long id;
    private Integer stt;
    private String title;
    private List<QuestionDTO> questions;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStt() {
        return stt;
    }

    public SectionDTO stt(Integer stt) {
        this.stt = stt;
        return this;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public String getTitle() {
        return title;
    }

    public SectionDTO title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setQuestions(List<QuestionDTO> questions){ this.questions = questions; }

    public List<QuestionDTO> getQuestions(){ return this.questions; }

    public SectionDTO questions(List<QuestionDTO> questions){
        this.questions = questions;
        return this;
    }
}
