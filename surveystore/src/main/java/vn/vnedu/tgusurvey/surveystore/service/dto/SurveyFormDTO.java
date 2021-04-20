package vn.vnedu.tgusurvey.surveystore.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import vn.vnedu.tgusurvey.surveystore.domain.EducationProgram;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class SurveyFormDTO {
    private Long id;
    private String name;
    private String note;
    private Instant startDate;
    private Instant endDate;
    private List<HeaderDTO> headers;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SurveyFormDTO name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public SurveyFormDTO note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public SurveyFormDTO startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public SurveyFormDTO endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public List<HeaderDTO> getHeaders() {return this.headers; };

    public SurveyFormDTO headers(List<HeaderDTO> headers) {
        this.headers = headers;
        return this;
    }

    public void setHeaders(List<HeaderDTO> headers) {this.headers = headers;};
}
