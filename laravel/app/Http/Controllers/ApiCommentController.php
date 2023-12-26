<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;

class ApiCommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function show($id)
    {

    }

    public function update(UpdateCommentRequest $request, $id)
    {

    }

    public function store(StoreCommentRequest $request)
    {

    }

    public function destroy($id)
    {

    }
}
