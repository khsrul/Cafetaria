<?php

namespace App\Models;

use CodeIgniter\Model;

class MenuModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'menus';
    protected $primaryKey       = 'menus_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['menu_name', 'price', 'category', 'menu_pic', 'menu_status'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules = [
        'menu_name' => 'required|alpha_space',
        'price' => 'required|numeric',
        'category' => 'required|alpha_space',
        'menu_pic' => 'uploaded[menu_pic]|is_image[menu_pic]|mime_in[menu_pic,image/png,image/jpg,image/jpeg]|ext_in[menu_pic,png,jpg,jpeg]|max_size[menu_pic,5125]',
        'menu_status' => 'required|alpha_space',
    ];
    protected $validationMessages = [
        'menu_name' => [
            'required' => "Kolom nama menu tidak boleh kosong",
            'alpha_space' => "Kolom nama menu hanya boleh berisi huruf",
        ],
        'price' => [
            'required' => "Kolom harga tidak boleh kosong",
            'numeric' => "Kolom harga hanya boleh berisi angka",
        ],
        'category' => [
            'required' => "Kolom kategori tidak boleh kosong",
            'alpha_space' => "Kolom kategori hanya boleh berisi huruf",
        ],
        'menu_pic' => [
            'uploaded' => "Foto/gambar tidak sesuai",
            'is_image' => "File yang diupload harus gambar/foto",
            'ext_in' => "Tipe/ekstensi gambar/foto harus .PNG/.JPG/.JPEG",
            'max_size' => "Ukuran gambar/foto terlalu besar, maksimal 5 MB",
        ],
        'menu_status' => [
            'required' => "Kolom tidak boleh kosong",
            'alpha_space' => "Kolom hanya boleh berisi huruf",
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

    public function menus_data() {
        return $this->findAll();
    }

    public function search_menu($data = null) {
        return $this->like('menu_name', $data)->orWhere('category', $data)->orWhere('menu_status', $data)->orWhere('menus_id', $data)->findAll();
    }

    public function get_menu_name($nama = null) {
        return $this->where('menu_name', $nama)->First();
    }

    public function insert_menu($data = null) {
        $this->insert($data);
        return $this->affectedRows();
    }

    public function update_menu($id = null, $data = null) {
        $this->update($id, $data);
        return $this->affectedRows();
    }
}
