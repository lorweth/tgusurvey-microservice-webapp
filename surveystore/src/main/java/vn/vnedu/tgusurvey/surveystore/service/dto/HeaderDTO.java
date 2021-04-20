package vn.vnedu.tgusurvey.surveystore.service.dto;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;

import java.util.List;

public class HeaderDTO {
    private Long id;
    private Integer stt;
    private String title;
    private List<SectionDTO> sections;

    public HeaderDTO() {}

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

    public HeaderDTO stt(Integer stt) {
        this.stt = stt;
        return this;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public String getTitle() {
        return title;
    }

    public HeaderDTO title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<SectionDTO> getSections() {return this.sections; }

    public HeaderDTO sections(List<SectionDTO> sections){
        this.sections = sections;
        return this;
    }

    public void setSections(List<SectionDTO> sections) {this.sections = sections; }
}
