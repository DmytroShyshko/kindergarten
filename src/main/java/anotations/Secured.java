package anotations;

import javax.ws.rs.NameBinding;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created by Dmytro Shyshko on 7/1/2016.
 */
@NameBinding
@Retention(RUNTIME)
@Target({ElementType.TYPE ,ElementType.METHOD})
public @interface Secured { }