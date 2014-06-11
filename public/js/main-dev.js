var cs = '/bower_components/';
serverURL = '//localhost:8070';
//serverURL = '//ghvotes.tk:8070';

$script([
    cs+'jquery/dist/jquery.js',
    serverURL+'/socket.io/socket.io.js',    //
    '/js/routes.js'
], function() {
    appModuleDependencies =
        [
            'ngRoute',
            'RPC',
            'Github'
        ];
    $script([
        '/js/angular/angular.min.js',
        cs+'bootstrap/js/modal.js',
        cs+'bootstrap/js/dropdown.js',
        cs+'bootstrap/js/tooltip.js'
    ], function() {
        $script([
            '/js/app.js',
            '/js/services/github.js',
            serverURL+'/rpc/rpc-client-angular.js',
            '/js/angular/angular-route.min.js'
        ], function() {
            $script([
                '/js/controllers/main-ctrl.js',
                '/js/controllers/log-in-ctrl.js',
                '/js/controllers/pulls-ctrl.js',
                '/js/controllers/issues-ctrl.js',
                '/js/controllers/repos-ctrl.js',
                'https://raw.github.com/jprichardson/string.js/master/lib/string.min.js'
            ], function() {
                angular.bootstrap(document, ['githubVoting']);

            });

        });
    });
});
