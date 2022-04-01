<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use \App\Models\TableModel;

class Table extends ResourceController
{

    use ResponseTrait;

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $model = new TableModel;
        $data = $model->tables_data();
        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new TableModel();
        $data = [
            'nama_meja' => $this->request->getVar('nama_meja')
        ];

        if ($model->get_table_name($data)) {
            return $this->failResourceExists('Data sudah ada');
        } elseif ($model->insert_table($data) == false) {
            return $this->fail($model->errors());
        } else {
            $response = ['message' => 'Data berhasil ditambahkan'];
            return $this->respondCreated($response);
        }
    }
}
