package api;

import anotations.Secured;
import dao.ProductEntity;

import javax.annotation.security.RolesAllowed;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import java.util.List;

import static dao.ProductEntity.*;

/**
 * Created by Dmytro Shyshko on 6/27/2016.
 */
@Path("/product")
public class Product {
    @GET
    @Produces("application/json")
    public List<ProductEntity> getProducts() {
        return getAllProducts();
    }

    @Secured
    @POST
    public void addProduct(@NotNull @QueryParam("name") String name) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(name);
        productEntity.save();
    }

    @Secured
    @DELETE
    public void deleteProduct(@NotNull @QueryParam("id") int id) {
        ProductEntity productEntity = getProductByID(id);
        if(productEntity != null) productEntity.delete();
    }
}
