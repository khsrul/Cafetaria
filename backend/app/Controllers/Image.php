<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use PHPUnit\Framework\Constraint\DirectoryExists;

class ImageShow extends Controller
{
    public function menu($filename)
    {
        $filepath = ROOTPATH . 'public\uploads\image\menu/' . $filename;

        if (file_exists($filepath)) {
            $mime = mime_content_type($filepath);
            header('Content-Length: ' . filesize($filepath));
            header("Content-Type: $mime");
            header('Content-Disposition: inline; filename="' . $filepath . '";');
            readfile($filepath);
            exit();
        } else {
            echo "PAGE NOT FOUND 404";
        }
    }

    public function users($filename)
    {
        $filepath = ROOTPATH . 'public\uploads\image\users/' . $filename;

        if (file_exists($filepath)) {
            $mime = mime_content_type($filepath);
            header('Content-Length: ' . filesize($filepath));
            header("Content-Type: $mime");
            header('Content-Disposition: inline; filename="' . $filepath . '";');
            readfile($filepath);
            exit();
        } else {
            echo "PAGE NOT FOUND 404";
        }
    }
}
