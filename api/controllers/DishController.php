<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Dish;
use yii\helpers\ArrayHelper;

class DishController extends Controller
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
		if($id == null && $cat_id == null) return Dish::find()->with('products')->all();
		if($id != null) return Dish::find()->where(['id' => $id])->with('products')->one();
		if($cat_id != null) return Dish::find()->where(['cat_id' => $cat_id])->with('products')->one();
	}
}
