package vn.vnedu.tgusurvey.surveystore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Answer;

/**
 * A ResultSurvey.
 */
@Entity
@Table(name = "result_survey")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ResultSurvey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "survey_date")
    private Instant surveyDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "answer")
    private Answer answer;

    @OneToOne
    @JoinColumn(unique = true)
    private Question question;

    @ManyToOne
    @JsonIgnoreProperties(value = "resultSurveys", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getSurveyDate() {
        return surveyDate;
    }

    public ResultSurvey surveyDate(Instant surveyDate) {
        this.surveyDate = surveyDate;
        return this;
    }

    public void setSurveyDate(Instant surveyDate) {
        this.surveyDate = surveyDate;
    }

    public Answer getAnswer() {
        return answer;
    }

    public ResultSurvey answer(Answer answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Question getQuestion() {
        return question;
    }

    public ResultSurvey question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public ResultSurvey user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResultSurvey)) {
            return false;
        }
        return id != null && id.equals(((ResultSurvey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResultSurvey{" +
            "id=" + getId() +
            ", surveyDate='" + getSurveyDate() + "'" +
            ", answer='" + getAnswer() + "'" +
            "}";
    }
}
