<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\EntryForm;
use app\models\RegisterForm;
use app\models\User;
use yii\helpers\ArrayHelper;

class UserController extends Controller
{
	//public $enableCsrfValidation = false;
	public function behaviors()
	{
    return ArrayHelper::merge(parent::behaviors(),[
        'verbs' => [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'login'  => ['post'],
				'logout'  => ['post'],
				'register'  => ['post'],
            ],
        ],
    ]);
	}

    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            if(count(Yii::$app->request->post()) == 0) {
				return \Yii::$app->user->identity;
			}
			return false;
        }
        $model = new LoginForm();
		$model->attributes = Yii::$app->request->post();
        if ($model->login()) {
            return \Yii::$app->user->identity;
        }
        return $model->getErrors();
    }

    public function actionLogout()
    {
        return Yii::$app->user->logout();
    }

	public function actionRegister() {
		if (!\Yii::$app->user->isGuest) {
            return false;
        }
		$model = new RegisterForm();
		$model->attributes = Yii::$app->request->post();
        if ($model->register()) {
            return \Yii::$app->user->identity;
        }
        return $model->getErrors();
	}
}
