<?php

namespace App\Models;

use CodeIgniter\Model;

class OrderModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'orders';
    protected $primaryKey       = 'order_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['menu_id', 'quantity', 'table_name', 'notes', 'order_status'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules = [];
    protected $validationMessages = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function orders_data()
    {
        $this->select('orders.order_id, menus.menu_name, orders.quantity, tables.table_name, orders.order_status, orders.notes');
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_name = tables.table_name');
        return $this->findAll();
    }

    public function get_orders_data($data = null)
    {
        $this->select('orders.order_id, menus.menu_name, menus.price, orders.quantity, tables.table_name, orders.order_status, orders.notes');
        $this->where('orders.order_status', $data);
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_name = tables.table_name');
        $this->orderBy('tables.table_name');
        return $this->findAll();
    }

    public function set_order($data = null)
    {
        $this->set($data);
        $this->insert();
        return $this->affectedRows();
    }

    public function update_data($id = null, $data = null) {
        $this->update($id, $data);
        return $this->affectedRows();
    }
}
