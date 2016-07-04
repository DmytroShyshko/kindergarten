package test;

/**
 * Created by Dmytro Shyshko on 6/26/2016.
 */


import dao.ProductEntity;
import utils.HibernateSessionFactory;
import org.hibernate.Session;



public class HibernateConnection {
    public static void main(String[] args) {

        Session session = HibernateSessionFactory.getSessionFactory().openSession();

        session.beginTransaction();

        ProductEntity productEntity = new ProductEntity();

        productEntity.setName("milk");

        session.save(productEntity);
        session.getTransaction().commit();

        session.close();
        System.out.println(2);

    }
}
