<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Api_model extends CI_Model
{

    function getContactsList()
    {
        $this->db->select('*');
        $this->db->from('tbl_users');

        $query = $this->db->get();
        
        return $query->result();
    }
    
    function storeContact($info)
    {
        $this->db->trans_start();
        $this->db->insert('tbl_users', $info);
        $insert_id = $this->db->insert_id();
        $this->db->trans_complete();
        
        return $insert_id;
    }

    function getContactInfo($id)
    {
        $this->db->select('*');
        $this->db->from('tbl_users');

        $this->db->where('id', $id);
        $query = $this->db->get();
        
        return $query->row();
    }

    function updateContact($info, $id)
    {
        $this->db->where('id', $id);
        $result = $this->db->update('tbl_users', $info);
        
        return $result;
    }
    
    function deleteContact($id)
    {
        $this->db->where('id', $id);
        $this->db->delete('tbl_users');
        
        return $this->db->affected_rows();
    }





}

  