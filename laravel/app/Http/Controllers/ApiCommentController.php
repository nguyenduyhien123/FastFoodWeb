<?php

namespace App\Http\Controllers;

use App\Events\NewCommentEvent;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Contracts\Database\Query\Builder as EloquentBuilder ;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;



class ApiCommentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Comment::class, 'comment');
    }
    public function index()
    {
        return Comment::with('user.role')->whereNull('comment_id')
            ->orWhereHas('parent', function ($query) {
                $query->whereNull('deleted_at');
            })->orderByRaw("CAST(SUBSTRING_INDEX(path, '/', 1) AS UNSIGNED)")
            ->orderByRaw("CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(path, '/', 2), '/', -1) AS UNSIGNED)")
            ->orderByRaw("CAST(SUBSTRING_INDEX(path, '/', -1) AS UNSIGNED)")
            ->get();
    }

    public function show(Comment $comment)
    {
        $comment = Comment::find($comment->id);
        if (!empty($comment)) {
            return $comment;
        } else {
            return response()->json([
                'message' => 'Không tìm thấy bình luận'
            ], 404);
        }
    }

    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        if (Auth::id() === $request->user_id) {

            $comment = Comment::find($comment->id);
            if (!empty($comment)) {
                $comment->user_id = $request->user_id;
                $comment->product_id = $request->product_id;
                $comment->comment_id = $request->comment_id;
                // if ($request->hasFile('image')) {
                //     $path = $request->image->store("upload/comment/{$comment->id}", 'public');
                //     $comment->image = $path;
                // }
                $comment->content = $request->content;
                $comment->path = $request->path;
                $comment->update();
                event(new NewCommentEvent($comment));
                return $comment;
            } else {
                return response()->json([
                    'message' => 'Không tìm thấy bình luận'
                ], 404);
            }
        }
        return response()->json([
            'message' => 'Invalid ID'
        ], 403);
    }

    public function store(StoreCommentRequest $request)
    {
        if (Auth::id() === $request->user_id) {

            $comment = Comment::create(
                [
                    'user_id' => $request->user_id,
                    'product_id' => $request->product_id,
                    'comment_id' => $request->comment_id,
                    'image' => '123',
                    'content' => $request->content,
                ]
            );
            if ($request->comment_id) {
                // return 'Comment id : '.$comment-> comment_id;
                $commentParent = Comment::find($comment->comment_id);
                if ($commentParent->path) {

                    $comment->path = $commentParent->path . '/' . $comment->id;
                    $comment->save();
                }
            } else {
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
        return response()->json([
            'message' => 'Invalid ID'
        ], 403);
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
    public function getProductsAndComments(){
        // $products =  Product::withCount('comments')
        // ->get(['id', 'name', 'comments_count']);
        $products = Product::has('comments')
        ->withCount('comments')
        ->get(['id', 'name', 'comments_count']);


        return $products;
    }
    public function getCommentsByCriteria(Request $request)
    {
        if($request->filled('product_id') )
        {
            $product_id = $request->query('product_id');
            $comments = Comment::with('user.role')->where('product_id', $product_id)->get();
            return $comments;
        }
        return response()->json(['message' => 'Yêu cầu không hợp lệ']);
    }
}
