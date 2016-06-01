<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Product;
use yii\helpers\ArrayHelper;

class ProductController extends Controller
{
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

    public function actionIndex($id = null, $cat_id = null) {
		if($id == null && $cat_id == null) return Product::find()->all();
		if($id != null) return Product::findOne($id);
		if($cat_id != null) return Product::findAll(['cat_id' => $cat_id]);
	}
}
