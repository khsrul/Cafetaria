<?php

namespace App\Models;

use CodeIgniter\Model;

class ChartModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'invoices';
    protected $primaryKey       = 'invoice_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
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

    public function chart_data() {
        $this->select('invoices.invoice_id, invoices.invoice, tables.table_name, menus.menu_name, menus.price, orders.quantity, invoices.total, invoices.date_order');
        $this->join('orders', 'invoices.order_id = orders.order_id');
        $this->selectSUM('orders.quantity');
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_id = tables.table_id');
        $this->orderBy('orders.quantity DESC, menus.menu_name ASC');
        $this->groupBy('menus.menu_name');

        return $this->findAll();
    }

    public function show_chart($id = null) {
        $this->select('invoices.invoice_id, invoices.invoice, tables.table_name, menus.menu_name, menus.price, orders.quantity, invoices.total, invoices.date_order');
        $this->where('invoices.date_order', $id);
        $this->join('orders', 'invoices.order_id = orders.order_id');
        $this->selectSUM('orders.quantity');
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_id = tables.table_id');
        $this->orderBy('orders.quantity DESC, menus.menu_name ASC');
        $this->groupBy('menus.menu_name');

        return $this->findAll();
    }
}
