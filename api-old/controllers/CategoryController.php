<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Category;
use yii\helpers\ArrayHelper;

class CategoryController extends Controller
{
	//public $enableCsrfValidation = false;
	public function behaviors()
	{
    return ArrayHelper::merge(parent::behaviors(),[
        'verbs' => [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index'  => ['get'],
            ],
        ],
    ]);
	}

    public function actionIndex($id = null) {
		if($id == null) return Category::find()->all();
		else return Category::findOne($id);
	}
}
