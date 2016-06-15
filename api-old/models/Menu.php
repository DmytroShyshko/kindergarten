<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Menu extends ActiveRecord
{
    public static function tableName()
    {
        return 'menu';
    }
	
	public function getDishItems()
    {
        return $this->hasMany(MenuItem::className(), ['menu_id' => 'id']);
    }
	
	public function fields()
{
    return [
        'id',
        'date'
    ];
}
}