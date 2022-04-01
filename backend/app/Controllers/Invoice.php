<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use \App\Models\InvoiceModel;

class Invoice extends ResourceController
{

    use ResponseTrait;

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $model = new InvoiceModel();
        $data = $model->invoices_data();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new InvoiceModel();
        $data = $model->ordered_data($id);
        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $model = new InvoiceModel();
        $data = [
            'order_id' => $this->request->getVar('order_id'),
            'total' => $this->request->getVar('total'),
            'date_order' => $this->request->getVar('date_order'),
            'invoice' => $this->request->getVar('invoice'),
        ];
        $model->create_invoice($data);
        return $this->respondCreated('Data berhasil ditambahkan');
    }
}
