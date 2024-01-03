<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slideshow;
use App\Http\Requests\StoreSlideshowController;
use App\Http\Requests\UpdateSlideshowController;

class ApiSlideshowController extends Controller
{
    public function index()
    {
        return Slideshow::all();
    }

    public function show($id)
    {
        $slide = Slideshow::find($id);
        if (!empty($slide)) {
            return $slide;
        } else {
            return response()->json([
                'message' => "slide này không tồn tại"
            ], 404);
        }
    }

    public function store(StoreSlideshowController $request)
    {
        $slide = Slideshow::create([
            'image' => '123',
            'url' => $request->url,
            'order' => $request->order,
        ]);

        if ($request->hasFile('image')) {
            $path = $request->image->store('upload/slideshow/' . $slide->id, 'public');
            $slide->image = $path;
        }

        $slide->save();
        return $slide;
    }

    public function update(UpdateSlideshowController $request, $id)
    {
        $slide = Slideshow::find($id);
        if (!empty($slide)) {
            if ($request->hasFile('image')) {
                $path = $request->image->store('upload/slideshow/' . $slide->id, 'public');
                $slide->image = $path;
            }
            $slide->url = $request->url;
            $slide->order = $request->order;
            $slide->update();
            return response()->json([
                $slide,
                'message' => 'Sửa thành công',
            ], 200);
        } else {
            return response()->json([
                'message' => "slide này không tồn tại"
            ], 404);
        }
    }

    public function destroy($id)
    {
        $slide = Slideshow::find($id);
        if (!(empty($slide))) {
            $slide->delete();
            return response()->json([
                'message' => "Xóa slide {$slide->id} thành công "
            ], 200);
        } else {
            return response()->json([
                'message' => "slide này không tồn tại"
            ], 404);
        }
    }
}
