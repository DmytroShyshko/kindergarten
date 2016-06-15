<?php

namespace app\controllers;

use Yii;
use yii\web\NotFoundHttpException;
use yii\rest\Controller;

class SiteController extends Controller
{

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ]
        ];
    }

    public function actionIndex()
    {
        //return 1;//$this->render('index');
		//return $this->render('error', ['exception' => {sta}]);
		throw new NotFoundHttpException();
    }
}
