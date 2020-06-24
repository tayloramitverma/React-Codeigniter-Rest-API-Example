<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require APPPATH . 'vendor/autoload.php';

use chriskacerguis\RestServer\RestController;

class Api extends RestController {

    function __construct()
    {

        parent::__construct();
        $this->load->model('api_model');

    }


    function contacts_get()
    {
        $users = $this->api_model->getContactsList();
         
        if($users)
        {
            $this->response($users, 200);
        }else {
            $this->response(NULL, 404);

        }
    }


    function contact_post()
    {

        $image = '';

        if(!empty($_FILES['image']['name']) && isset($_FILES['image']['name'])) {
            $config['upload_path'] = './assets/images/';
            $config['overwrite'] = true;
            $config['allowed_types'] = 'jpg|png|jpeg';
            $config['file_name'] = 'image-'.md5(time());

            $this->load->library('upload', $config);
            $this->upload->initialize($config);
            if ($this->upload->do_upload('image')) {
                         
                $uploadedImage = $this->upload->data();
                $image_name = $uploadedImage['file_name'];
                        
                $image = base_url().'assets/images/'.$image_name;
            }
        }

        $result = array(
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'phone' => $this->post('phone'),
            'image' => $image
        );
        
        $result = $this->api_model->storeContact($result);

         if($result){
            $this->response(array('status' =>true), 200);
         }else{
            $this->response(array('status' =>false), 200);
         }

    }

    function updatecontact_post()
    {

        $image = '';

        if(!empty($_FILES['image']['name']) && isset($_FILES['image']['name'])) {
            $config['upload_path'] = './assets/images/';
            $config['overwrite'] = true;
            $config['allowed_types'] = 'jpg|png|jpeg';
            $config['file_name'] = 'image-'.md5(time());

            $this->load->library('upload', $config);
            $this->upload->initialize($config);
            if ($this->upload->do_upload('image')) {
                         
                $uploadedImage = $this->upload->data();
                $image_name = $uploadedImage['file_name'];
                        
                $image = base_url().'assets/images/'.$image_name;
            }
        }

        $dataArr = array(
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'phone' => $this->post('phone'),
            'image' => $image
        );

        
        $id = $this->post('id');

        $result = $this->api_model->updateContact($dataArr, $id);

        if($result){
            $this->response(array('status' =>true), 200);
        }else{
            $this->response(array('status' =>false), 200);
        }

    }


    function contactdelete_post()
    {

        $id = $this->post('id');
         
        $result = $this->api_model->deleteContact($id);

         if($result){
            $this->response(array('status' =>true), 200);
         }else{
            $this->response(array('status' =>false), 200);
         }

    }
    
}