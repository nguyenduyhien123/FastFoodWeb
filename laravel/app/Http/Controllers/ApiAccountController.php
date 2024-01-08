<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiAccountController extends Controller
{
    public function index(Request $request){
        return $request->user;
    }
    public function update(Request $request){

    }
}
