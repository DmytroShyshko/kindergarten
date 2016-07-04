package api;

import beens.Credentials;
import dao.UserEntity;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Map;
import java.util.Random;

/**
 * Created by Dmytro Shyshko on 7/1/2016.
 */
@Path("/authentication")
public class Authentication {

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response authenticateUser(Credentials credentials, @Context ServletContext context) {

        String username = credentials.getUsername();
        String password = credentials.getPassword();

        try {

            // Authenticate the user using the credentials provided
            UserEntity userEntity = authenticate(username, password);
            userEntity.setDate(new Date());
            Random random = new SecureRandom();
            String token = new BigInteger(130, random).toString(32);
            userEntity.setToken(token);
            Map<String, UserEntity> users = (Map<String, UserEntity>) context.getAttribute("tokens");
            users.put(userEntity.getName(), userEntity);

            // Return the token on the response
            return Response.ok(token).build();

        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    private UserEntity authenticate(String username, String password) throws Exception {
        UserEntity user = UserEntity.load(username, password);
        if (user == null) throw new Exception();
        return user;
    }

}