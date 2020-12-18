package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Section.
 */
@Entity
@Table(name = "section")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Section implements Serializable {

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
    @JsonIgnoreProperties(value = "sections", allowSetters = true)
    private SurveyHeader header;

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

    public Section stt(Integer stt) {
        this.stt = stt;
        return this;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public String getTitle() {
        return title;
    }

    public Section title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SurveyHeader getHeader() {
        return header;
    }

    public Section header(SurveyHeader surveyHeader) {
        this.header = surveyHeader;
        return this;
    }

    public void setHeader(SurveyHeader surveyHeader) {
        this.header = surveyHeader;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Section)) {
            return false;
        }
        return id != null && id.equals(((Section) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Section{" +
            "id=" + getId() +
            ", stt=" + getStt() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
