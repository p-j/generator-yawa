require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery'<% if (compassBootstrap) { %>,
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition'<% } else if (groundworkCSS) { %>,
        jqueryPlaceholderText: '../../.tmp/scripts/plugins/jquery-placeholderText',
        jqueryResponsiveTables: '../../.tmp/scripts/plugins/jquery-responsiveTables',
        jqueryResponsiveText: '../../.tmp/scripts/plugins/jquery-responsiveText',
        jqueryTruncateLines: '../../.tmp/scripts/plugins/jquery-truncateLines',
        groundworkChecklists: '../../.tmp/scripts/components/checklists',
        groundworkDismissible: '../../.tmp/scripts/components/dismissible',
        groundworkEqualizeColumns: '../../.tmp/scripts/components/equalizeColumns',
        groundworkForms: '../../.tmp/scripts/components/forms',
        groundworkMenus: '../../.tmp/scripts/components/menus',
        groundworkNavigation: '../../.tmp/scripts/components/navigation',
        groundworkTabs: '../../.tmp/scripts/components/tabs'<% } %>
    }<% if (compassBootstrap || groundworkCSS) { %>,
    shim: {<% if (compassBootstrap) { %>
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapCollapse: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapModal:{
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapPopover: {
            deps: ['jquery', 'bootstrapTooltip']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTooltip: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }<% } else if (groundworkCSS) { %>
        jqueryPlaceholderText: {
            deps: ['jquery']
        },
        jqueryResponsiveTables: {
            deps: ['jquery']
        },
        jqueryResponsiveText: {
            deps: ['jquery']
        },
        jqueryTruncateLines: {
            deps: ['jquery']
        },
        groundworkChecklists: {
            deps: ['jquery']
        },
        groundworkDismissible: {
            deps: ['jquery']
        },
        groundworkEqualizeColumns: {
            deps: ['jquery']
        },
        groundworkForms: {
            deps: ['jquery']
        },
        groundworkMenus: {
            deps: ['jquery']
        },
        groundworkNavigation: {
            deps: ['jquery']
        },
        groundworkTabs: {
            deps: ['jquery']
        }<% } %>
    }<% } %>
});

require([
        'app',
        'jquery'<% if (groundworkCSS) { %>,
        'jqueryPlaceholderText',
        'jqueryResponsiveTables',
        'jqueryResponsiveText',
        'jqueryTruncateLines',
        'groundworkChecklists',
        'groundworkDismissible',
        'groundworkEqualizeColumns',
        'groundworkForms',
        'groundworkMenus',
        'groundworkNavigation',
        'groundworkTabs'<% } %>
    ], function (app, $) {
        'use strict';
        var DEBUG = true;
        // Prevent console call to throw errors on old browser
        // Mute console when DEBUG is set to false
        // TODO: turn DEBUG to false on grunt:build
        if (DEBUG === false || !window.console) {
            window.console = {
                assert                    : function() {},
                clear                     : function() {},
                count                     : function() {},
                debug                     : function() {},
                dir                       : function() {},
                dirxml                    : function() {},
                error                     : function() {},
                exception                 : function() {},
                group                     : function() {},
                groupCollapsed            : function() {},
                groupEnd                  : function() {},
                info                      : function() {},
                log                       : function() {},
                markTimeLine              : function() {},
                msIsIndependentlyComposed : function() {},
                profile                   : function() {},
                profileEnd                : function() {},
                table                     : function() {},
                time                      : function() {},
                timeEnd                   : function() {},
                timeStamp                 : function() {},
                trace                     : function() {},
                warn                      : function() {}
            };
        }

        // use app here
        console.log(app);
        console.log('Running jQuery %s', $().jquery);
    }
);
