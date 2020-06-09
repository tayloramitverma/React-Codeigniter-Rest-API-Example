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

        $result = array(
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'phone' => $this->post('phone')
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

        $result = array(
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'phone' => $this->post('phone')
        );

        $id = $this->post('contactid');

        $result = $this->api_model->updateContact($result, $id);

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