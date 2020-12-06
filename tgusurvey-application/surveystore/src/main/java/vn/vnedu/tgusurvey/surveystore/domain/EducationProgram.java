package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A EducationProgram.
 */
@Entity
@Table(name = "education_program")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EducationProgram implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 20)
    @Column(name = "msct", length = 20, nullable = false, unique = true)
    private String msct;

    @Size(min = 5, max = 30)
    @Column(name = "name", length = 30)
    private String name;

    @NotNull
    @Column(name = "year", nullable = false)
    private LocalDate year;

    @ManyToOne
    @JsonIgnoreProperties(value = "educationPrograms", allowSetters = true)
    private Specialized specialized;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsct() {
        return msct;
    }

    public EducationProgram msct(String msct) {
        this.msct = msct;
        return this;
    }

    public void setMsct(String msct) {
        this.msct = msct;
    }

    public String getName() {
        return name;
    }

    public EducationProgram name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getYear() {
        return year;
    }

    public EducationProgram year(LocalDate year) {
        this.year = year;
        return this;
    }

    public void setYear(LocalDate year) {
        this.year = year;
    }

    public Specialized getSpecialized() {
        return specialized;
    }

    public EducationProgram specialized(Specialized specialized) {
        this.specialized = specialized;
        return this;
    }

    public void setSpecialized(Specialized specialized) {
        this.specialized = specialized;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EducationProgram)) {
            return false;
        }
        return id != null && id.equals(((EducationProgram) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EducationProgram{" +
            "id=" + getId() +
            ", msct='" + getMsct() + "'" +
            ", name='" + getName() + "'" +
            ", year='" + getYear() + "'" +
            "}";
    }
}
