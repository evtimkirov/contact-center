<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Center SPA</title>
        <link rel="stylesheet" href="{{ asset('bundle.css') }}">
    </head>
    <body>
        <div id="app"></div>
        @if(app()->environment('local'))
            <script src="http://localhost:3001/bundle.js"></script>
        @else
            <script src="{{ asset('bundle.js') }}"></script>
        @endif
    </body>
</html>
