<?php

namespace App\Http\Controllers;

use App\Events\NewCommentEvent;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;

class ApiCommentController extends Controller
{
    public function index()
    {
        return Comment::with('user.role')->orderBy('path','asc')->get();
    }

    public function show($id)
    {
        $comment = Comment::find($id);
        if (!empty($comment)) {
            return $comment;
        } else {
            return response()->json([
                'message' => 'Không tìm thấy bình luận'
            ], 404);
        }
    }

    public function update(UpdateCommentRequest $request, $id)
    {
        $comment = Comment::find($id);
        if (!empty($comment)) {
            $comment->user_id = $request->user_id;
            $comment->product_id = $request->product_id;
            $comment->comment_id = $request->comment_id;
            if ($request->hasFile('image')) {
                $path = $request->image->store("upload/comment/{$comment->id}", 'public');
                $comment->image = $path;
            }
            $comment->content = $request->content;
            $comment->path = $request->path;
            $comment->update();
            event(new NewCommentEvent());
            return $comment;
        } else {
            return response()->json([
                'messega' => 'Không tìm thấy bình luận'
            ], 404);
        }
    }

    public function store(StoreCommentRequest $request)
    {
        $comment = Comment::create(
            [
                'user_id' => $request->user_id,
                'product_id' => $request->product_id,
                'comment_id' => $request->comment_id,
                'image' => '123', 
                'content' => $request->content,
            ]
        );
        if($request->comment_id)
        {
            // return 'Comment id : '.$comment-> comment_id;
            $commentParent = Comment::find($comment-> comment_id);
            if($commentParent->path)
            {

                $comment->path = $commentParent->path .'/' .$comment->id;
                $comment->save();
            }
        }
        else
        {
            $comment->path =  $comment->id;
            $comment->save();
        }
        broadcast(new NewCommentEvent($comment));
        // if ($request->hasFile('image')) {
        //     $path = $request->image->store("upload/comment/{$comment->id}", 'public');
        //     $comment->image = $path;
        // }

        // $comment->save();
        return $comment;
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        if (!empty($comment)) {
            $comment->delete();
            return "Xóa bình luận {$comment->id} thành công!";
        } else {
            return response()->json([
                'messega' => 'Không tìm thấy bình luận'
            ], 404);
        }
    }
}
