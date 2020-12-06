package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Constraint;

/**
 * A SubjectCondition.
 */
@Entity
@Table(name = "subject_condition")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SubjectCondition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_constraint", nullable = false)
    private Constraint constraint;

    @ManyToOne
    @JsonIgnoreProperties(value = "subjectConditions", allowSetters = true)
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties(value = "subjectConditions", allowSetters = true)
    private Subject beforeSubject;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Constraint getConstraint() {
        return constraint;
    }

    public SubjectCondition constraint(Constraint constraint) {
        this.constraint = constraint;
        return this;
    }

    public void setConstraint(Constraint constraint) {
        this.constraint = constraint;
    }

    public Subject getSubject() {
        return subject;
    }

    public SubjectCondition subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Subject getBeforeSubject() {
        return beforeSubject;
    }

    public SubjectCondition beforeSubject(Subject subject) {
        this.beforeSubject = subject;
        return this;
    }

    public void setBeforeSubject(Subject subject) {
        this.beforeSubject = subject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubjectCondition)) {
            return false;
        }
        return id != null && id.equals(((SubjectCondition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubjectCondition{" +
            "id=" + getId() +
            ", constraint='" + getConstraint() + "'" +
            "}";
    }
}
