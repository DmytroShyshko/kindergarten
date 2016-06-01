<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class MenuItem extends ActiveRecord
{
    public static function tableName()
    {
        return 'menu_item';
    }
	
	public function getDish()
    {
        return $this->hasOne(Dish::className(), ['id' => 'dish_id']);
    }
	
	public function fields()
	{
    return [
        'id',
        'dish',
        'eat_time'
		];
	}
}