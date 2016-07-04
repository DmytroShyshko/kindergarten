package test;

import dao.ProductEntity;

import java.util.List;

/**
 * Created by Dmytro Shyshko on 6/27/2016.
 */
public class Product {
    public static void main(String[] args) {
        List<ProductEntity> p = ProductEntity.getAllProducts();
        System.out.println(1);
    }
}
