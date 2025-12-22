<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('layouts.app', [
        'views' => [
            'dashboard' => view('pages.dashboard')->render(),
            'learners' => view('pages.learners')->render(),
            'courses' => view('pages.courses')->render(),
            'progress' => view('pages.progress')->render(),
            'reports' => view('pages.reports')->render(),
        ]
    ]);
});
