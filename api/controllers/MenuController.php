<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Menu;
use yii\helpers\ArrayHelper;
use yii\filters\AccessControl;
use yii\web\UnauthorizedHttpException;

class MenuController extends Controller
{
	public function behaviors()
	{
    return ArrayHelper::merge(parent::behaviors(),[
        'verbs' => [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index'  => ['post'],
				'list'  => ['post'],
				'items'  => ['post'],
            ],
        ],
		'access' => [
                'class' => AccessControl::className(),
                'only' => ['index', 'list', 'items'],
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['index', 'list', 'items'],
                        'roles' => ['@'],
                    ],
                ],
				'denyCallback' => function ($rule, $action) {
					throw new UnauthorizedHttpException();
				}
            ],
    ]);
	}

    public function actionIndex($id = null) {
		$user = \Yii::$app->user->identity;
		if($id == null) return Menu::find()->with('dishItems')->where(['user_id' => $user->id])->all();
		if($id != null) return Menu::find()->with('dishItems')->where(['user_id' => $user->id, 'id' => $id])->one();
	}
	public function actionList() {
		$user = \Yii::$app->user->identity;
		return Menu::find()->where(['user_id' => $user->id])->all();
	}
	
	public function actionItems() {
		$id = Yii::$app->request->post()['id'];
		$menu = Menu::find()->where(['id' => $id])->one();//->getDishItems();
		return $menu->getDishItems()->all();
	}
}
