<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use \App\Models\OrderModel;
use CodeIgniter\API\ResponseTrait;

class Order extends ResourceController
{

    use ResponseTrait;

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $model = new OrderModel();
        $data = $model->orders_data();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new OrderModel();
        $data = $model->get_orders_data($id);
        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new OrderModel();
    
        $data = [
            'menu_id' => $this->request->getVar('menu_id'),
            'quantity' => $this->request->getVar('quantity'),
            'total' => $this->request->getVar('total'),
            'table_id' => $this->request->getVar('table_id'),
            'notes' => $this->request->getVar('notes'),
            'order_status' => 'Diproses',
        ];

        $model->set_order($data);
        return $this->respondCreated('Data berhasil ditambahkan');
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $model = new OrderModel();
        
        $data = $this->request->getRawInput();

        $model->update_data($id, $data);
        return $this->respondCreated("Data berhasil diubah");
    }
}
