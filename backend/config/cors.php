<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '/login', '/user', '/logout'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3001'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
