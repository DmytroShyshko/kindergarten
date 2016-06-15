<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class RegisterForm extends Model
{
    public $login;
    public $password;
	public $email;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['login', 'password', 'email'], 'required'],
            // rememberMe must be a boolean value
            // password is validated by validatePassword()
			['email', 'email'],
			['email', 'validateEmail'],
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    
	
	public function validateEmail($attribute, $params)
    {
        
            $user = User::findOne(['email' => $this->email]);

            if ($user != null) {
                $this->addError('error_email', 'EmailE');
            }
        
    }

    /**
     * Logs in a user using the provided username and password.
     * @return boolean whether the user is logged in successfully
     */
    public function register()
    {
        if ($this->validate()) {
			$user = new User();
			$user->email = $this->email;
			$user->password = Yii::$app->getSecurity()->generatePasswordHash($this->password);
			$user->login = $this->login;
			$user->save();
            if(Yii::$app->user->login($user, 0)) return true;
			else {
				$user->delete();
				return false;
			}
        }
        return false;
    }

}
