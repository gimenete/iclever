(function( window, $ ) {
    'use strict';

    var document = window.document,
        storage = window.sessionStorage;

    $( document ).on( 'ready', function() {
        $( '#role' ).on( 'change.app', function( event ) {
            var role = $( this ).val();

            filterTools( role );

            // Save role in local storage
            if ( storage && storage.setItem ) {
                storage.setItem( 'role', role );
            }
        });

        // Get role from local storage
        if ( storage && storage.getItem && storage.getItem('role') ) {
            filterTools( storage.getItem('role') );
            $( '#role' ).val( storage.getItem('role') );
        }
        
        // Select "Development" by default, if nothing was found/selected
        if ( $('#role option:selected').length === 0 ) {
            $( '#role' ).val( 'development' );
            storage.setItem( 'role', 'development' );
        }
    });

    function filterTools( role ) {
        var $rows = $( '.row' );

        switch ( role ) {
            case 'development':
                // Hide management and project-management
                $rows.each( function() {
                    var $this = $( this ),
                        $dataType = $this.data( 'type' );

                    if ( $dataType && $dataType === 'management' ) {
                        $this.stop().slideUp( 'fast', function() {
                            $this.addClass( 'hide' );
                        });
                    } else if ( $dataType && $dataType === 'project-management' ) {
                        $this.stop().slideUp( 'fast', function() {
                            $this.addClass( 'hide' );
                        });
                    }
                });
            break;
            case 'project-management':
                // Hide management and show project-management
                $rows.each( function() {
                    var $this = $( this ),
                        $dataType = $this.data( 'type' );

                    if ( $dataType && $dataType === 'management' ) {
                        $this.stop().slideUp( 'fast', function() {
                            $this.addClass( 'hide' );
                        });
                    } else if ( $dataType && $dataType === 'project-management' ) {
                        $this.stop().hide().removeClass( 'hide' ).slideDown( 'fast' );
                    }
                });
            break;
            case 'management':
                // Show management and project-management
                $rows.each( function() {
                    var $this = $( this ),
                        $dataType = $this.data( 'type' );

                    if ( $dataType && $dataType === 'management' ) {
                        $this.stop().hide().removeClass( 'hide' ).slideDown( 'fast' );
                    } else if ( $dataType && $dataType === 'project-management' ) {
                        $this.stop().hide().removeClass( 'hide' ).slideDown( 'fast' );
                    }
                });
            break;
        }
    }

})( window, jQuery );
