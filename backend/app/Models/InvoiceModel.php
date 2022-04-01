<?php

namespace App\Models;

use CodeIgniter\Model;

class InvoiceModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'invoices';
    protected $primaryKey       = 'invoice_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['order_id', 'total', 'date_order', 'invoices'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'date_order' => 'required|valid_date',
    ];
    protected $validationMessages   = [
        'date_order' => [
            'required' => 'Kolom tanggal tidak boleh kosong',
            'valid_date' => 'Format tanggal salah, harus DD/MM/YYYY',
        ],
    ];
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

    public function invoices_data() {
        $this->select('invoices.invoice_id, invoices.invoice, tables.table_name, menus.nama_menus, menus.harga, orders.jumlah, invoices.total, invoices.date_order');
        $this->join('orders', 'invoices.order_id = orders.order_id');
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_id = tables.table_id');
        $this->orderBy('invoices.invoice');

        return $this->findAll();
    }

    public function ordered_data($id = null) {
        $this->select('invoices.invoice_id, invoices.invoice, tables.table_name, menus.nama_menus, menus.harga, orders.jumlah, invoices.total, invoices.date_order');
        $this->where('invoices.invoice', $id);
        $this->join('orders', 'invoices.order_id = orders.order_id');
        $this->join('menus', 'orders.menu_id = menus.menu_id');
        $this->join('tables', 'orders.table_id = tables.table_id');

        return $this->findAll();
    }

    public function create_invoice($data = null) {
        $this->set($data);
        $this->insert();
        return $this->affectedRows();
    }
}
