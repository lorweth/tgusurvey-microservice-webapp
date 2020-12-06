package vn.vnedu.tgusurvey.userinfo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Classroom.
 */
@Entity
@Table(name = "classroom")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Classroom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 20)
    @Column(name = "mslh", length = 20, nullable = false, unique = true)
    private String mslh;

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

    public String getMslh() {
        return mslh;
    }

    public Classroom mslh(String mslh) {
        this.mslh = mslh;
        return this;
    }

    public void setMslh(String mslh) {
        this.mslh = mslh;
    }

    public String getName() {
        return name;
    }

    public Classroom name(String name) {
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
        if (!(o instanceof Classroom)) {
            return false;
        }
        return id != null && id.equals(((Classroom) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Classroom{" +
            "id=" + getId() +
            ", mslh='" + getMslh() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
