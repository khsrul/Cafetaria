<?php

namespace App\Models;

use CodeIgniter\Model;

class TableModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'tables';
    protected $primaryKey       = 'table_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['table_name'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules = [
        'table_name' => 'required|alpha_numeric_space',
    ];
    protected $validationMessages = [
        'table_name' => [
            'required' => 'Kolom nama meja tidak boleh kosong',
            'alpha_numeric_space' => 'Kolom nama meja hanya boleh berisi huruf dan angka',
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

    public function tables_data() {
        return $this->findAll();
    }

    public function get_table_name($data = null) {
        return $this->where('table_name', $data)->first();
    }

    public function insert_table($data = null) {
        $this->insert($data);
        return $this->affectedRows();
    }
}
