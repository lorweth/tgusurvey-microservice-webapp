package vn.vnedu.tgusurvey.surveystore.service.dto;

public class QuestionDTO {
    private Long id;
    private String content;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public QuestionDTO content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
