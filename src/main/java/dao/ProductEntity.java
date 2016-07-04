package dao;

import utils.HibernateSessionFactory;
import org.hibernate.Session;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

import static utils.HibernateSessionFactory.*;

/**
 * Created by Dmytro Shyshko on 6/26/2016.
 */
@Entity
@Table(name = "product", schema = "menu", catalog = "")
public class ProductEntity {
    private int id;
    private String name;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductEntity that = (ProductEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public static List<ProductEntity> getAllProducts() {
        Session session = getSessionFactory().openSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<ProductEntity> criteria = builder.createQuery(ProductEntity.class);
        Root<ProductEntity> root = criteria.from( ProductEntity.class );
        criteria.select( root );
        List<ProductEntity> productEntityList = session.createQuery(criteria).getResultList();
        session.close();
        return productEntityList;
    }

    public  void save() {
        Session session = getSessionWithTransaction();
        session.save(this);
        commitAndCloseSession(session);
    }

    public  void delete() {
        Session session = getSessionWithTransaction();
        session.delete(this);
        commitAndCloseSession(session);
    }

    public static ProductEntity getProductByID(int id) {
        Session session = getSessionWithTransaction();
        ProductEntity productEntity = session.load(ProductEntity.class, id);
        commitAndCloseSession(session);
        return productEntity;
    }


}
