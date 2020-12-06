package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Category;

/**
 * A ProgramItem.
 */
@Entity
@Table(name = "program_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProgramItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "programItems", allowSetters = true)
    private EducationProgram program;

    @ManyToOne
    @JsonIgnoreProperties(value = "programItems", allowSetters = true)
    private Subject subject;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public ProgramItem category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public EducationProgram getProgram() {
        return program;
    }

    public ProgramItem program(EducationProgram educationProgram) {
        this.program = educationProgram;
        return this;
    }

    public void setProgram(EducationProgram educationProgram) {
        this.program = educationProgram;
    }

    public Subject getSubject() {
        return subject;
    }

    public ProgramItem subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProgramItem)) {
            return false;
        }
        return id != null && id.equals(((ProgramItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProgramItem{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
