<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetWorkspace
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($user = $request->user()) {
            $workspace = $user->currentWorkspace();
            $request->attributes->set('workspace', $workspace);
        }

        return $next($request);
    }
}
