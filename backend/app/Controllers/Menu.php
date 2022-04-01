<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\MenuModel;

class Menu extends ResourceController
{

    use ResponseTrait;

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $model = new MenuModel;
        $data = $model->menus_data();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new MenuModel;
        $data = $model->search_menu($id);
        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {

        $model = new MenuModel;

        $name = $this->request->getVar('menu_name');
        $img = $this->request->getFile('menu_pic');
        if (!$img->getClientExtension()) {
            return $this->fail('Kolom foto tidak boleh kosong');
        }
        $img_name = str_replace(' ', '_', $name) . "." . $img->getClientExtension();
        $data = [
            'menu_name' => $name,
            'price' => $this->request->getVar('price'),
            'category'  => $this->request->getVar('category'),
            'menu_pic' => $img_name,
            'menu_status' => $this->request->getVar('menu_status'),
        ];

        if ($model->get_menu_name($name)) {
            return $this->failResourceExists('Data sudah ada');
        } else if ($model->insert_menu($data) == false) {
            return $this->fail($model->errors());
        } else {
            $img->move(ROOTPATH . 'public/uploads/image/menu/', $img_name);
            $response = [
                'message' => "Data berhasil disimpan.",
            ];
            return $this->respondCreated($response);
        }
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $model = new MenuModel;

        $data = $this->request->getRawInput();

        if ($model->update_menu($id, $data) == false) {
            return $this->fail($model->errors());
        } else {
            $response = ['message' => "Data berhasil diperbarui"];
            return $this->respond($response);
        }
    }
}
