package vn.vnedu.tgusurvey.surveystore.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Specialized.
 */
@Entity
@Table(name = "specialized")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Specialized implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 20)
    @Column(name = "mscn", length = 20, nullable = false, unique = true)
    private String mscn;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMscn() {
        return mscn;
    }

    public Specialized mscn(String mscn) {
        this.mscn = mscn;
        return this;
    }

    public void setMscn(String mscn) {
        this.mscn = mscn;
    }

    public String getName() {
        return name;
    }

    public Specialized name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Specialized)) {
            return false;
        }
        return id != null && id.equals(((Specialized) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Specialized{" +
            "id=" + getId() +
            ", mscn='" + getMscn() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
