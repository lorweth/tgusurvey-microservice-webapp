package vn.vnedu.tgusurvey.surveystore.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 20)
    @Column(name = "msmh", length = 20, nullable = false, unique = true)
    private String msmh;

    @NotNull
    @Size(min = 5, max = 30)
    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @NotNull
    @Min(value = 2)
    @Max(value = 60)
    @Column(name = "num_of_credit", nullable = false)
    private Integer numOfCredit;

    @NotNull
    @Min(value = 2)
    @Max(value = 60)
    @Column(name = "theory_lesson", nullable = false)
    private Integer theoryLesson;

    @NotNull
    @Min(value = 2)
    @Max(value = 60)
    @Column(name = "practice_lesson", nullable = false)
    private Integer practiceLesson;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsmh() {
        return msmh;
    }

    public Subject msmh(String msmh) {
        this.msmh = msmh;
        return this;
    }

    public void setMsmh(String msmh) {
        this.msmh = msmh;
    }

    public String getName() {
        return name;
    }

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumOfCredit() {
        return numOfCredit;
    }

    public Subject numOfCredit(Integer numOfCredit) {
        this.numOfCredit = numOfCredit;
        return this;
    }

    public void setNumOfCredit(Integer numOfCredit) {
        this.numOfCredit = numOfCredit;
    }

    public Integer getTheoryLesson() {
        return theoryLesson;
    }

    public Subject theoryLesson(Integer theoryLesson) {
        this.theoryLesson = theoryLesson;
        return this;
    }

    public void setTheoryLesson(Integer theoryLesson) {
        this.theoryLesson = theoryLesson;
    }

    public Integer getPracticeLesson() {
        return practiceLesson;
    }

    public Subject practiceLesson(Integer practiceLesson) {
        this.practiceLesson = practiceLesson;
        return this;
    }

    public void setPracticeLesson(Integer practiceLesson) {
        this.practiceLesson = practiceLesson;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", msmh='" + getMsmh() + "'" +
            ", name='" + getName() + "'" +
            ", numOfCredit=" + getNumOfCredit() +
            ", theoryLesson=" + getTheoryLesson() +
            ", practiceLesson=" + getPracticeLesson() +
            "}";
    }
}
