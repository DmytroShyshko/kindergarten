<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Dish extends ActiveRecord
{
    public static function tableName()
    {
        return 'dish';
    }
	
	public function getProducts()
    {
        return $this->hasMany(Product::className(), ['id' => 'product_id'])
            ->viaTable('dish_item', ['dish_id' => 'id']);
    }
	
	public function fields()
{
    return [
        'id',
        'name',
        'products'
    ];
}
}