package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A SurveyHeader.
 */
@Entity
@Table(name = "survey_header")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SurveyHeader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1)
    @Column(name = "stt")
    private Integer stt;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne
    @JsonIgnoreProperties(value = "surveyHeaders", allowSetters = true)
    private SurveyForm surveyForm;

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

    public SurveyHeader stt(Integer stt) {
        this.stt = stt;
        return this;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public String getTitle() {
        return title;
    }

    public SurveyHeader title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SurveyForm getSurveyForm() {
        return surveyForm;
    }

    public SurveyHeader surveyForm(SurveyForm surveyForm) {
        this.surveyForm = surveyForm;
        return this;
    }

    public void setSurveyForm(SurveyForm surveyForm) {
        this.surveyForm = surveyForm;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SurveyHeader)) {
            return false;
        }
        return id != null && id.equals(((SurveyHeader) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SurveyHeader{" +
            "id=" + getId() +
            ", stt=" + getStt() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
