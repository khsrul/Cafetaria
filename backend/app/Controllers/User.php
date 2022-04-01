<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use \App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class User extends ResourceController
{

    use ResponseTrait;

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function index() {
        $model = new UserModel();
        $data = $model->users_data();
        return $this->respond($data);
    }
}
