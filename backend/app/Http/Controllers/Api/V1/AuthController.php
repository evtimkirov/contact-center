<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginValidation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    /**
     * Login
     *
     * @param LoginValidation $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginValidation $request)
    {
        if (!Auth::attempt($request->request->all())) {
            return response()->json(['message' => 'Invalid login'], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login successful',
            'user' => Auth::user(),
        ]);
    }

    /**
     * Logout
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    /**
     * Current user information
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentUser(Request $request)
    {
        return response()->json($request->user());
    }
}
