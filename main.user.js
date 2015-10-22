// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.0.4
// @grant		none
// ==/UserScript==

// Library
var waitFor = function ( locator, callBack ) {

	if ( typeof locator === 'string' ) {
		var check = document.querySelector( locator );

		if ( check ) {
			callBack( check );

		} else {
			setTimeout( function () {

				waitFor( locator, callBack );
			}, 1 );
		}
	}
};

if ( window.top === window.self ) {
	var FB      = {};
	var options = {
		'suggestedPosts'   : false,
		'sponsoredPosts'   : false,
		'likedPosts'       : false,
		'commentedOnPosts' : false,
		'repliedToPosts'   : false,
		'wasTaggedInPosts' : false,
		'sharedPosts'      : false,
		'viaPosts'         : false,
		'appSuggestions'   : false
	};

	FB.suggestedPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = 'Suggested Post';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed sponsored post.' );
					target.style.display = 'none';
				}

			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i = 0; i < tags.length; i++ ) {

			if ( tags[ i ].textContent == searchText ) {
				loopBack( tags[ i ] );
			}
		}
	};

	FB.sponsoredPosts = function () {

		var tags       = document.getElementsByTagName( 'a' );
		var searchText = 'Sponsored';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed sponsored post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i = 0; i < tags.length; i++ ) {

			if ( tags[ i ].textContent == searchText ) {
				loopBack( tags[ i ] );
			}
		}
	};

	FB.likedPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = 'Sponsored';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed liked post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( 'liked this' ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.commentedOnPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = 'commented on';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed commented on post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( searchText ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.repliedToPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = 'replied to';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed replied to post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( searchText ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.wasTaggedInPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = ' was tagged in ';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed was tagged in post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( searchText ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.sharedPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = ' shared ';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed shared post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( searchText ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.viaPosts = function () {

		var tags       = document.getElementsByTagName( 'span' );
		var searchText = ' via ';
		var loopBack   = function ( target ) {

			if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

				if ( target.style.display !== 'none' ) {
					console.log( 'Removed via post.' );
					target.style.display = 'none';
				}
			} else if ( target.parentNode ) {
				loopBack( target.parentNode );
			}
		};

		for ( var i in tags ) {

			if ( tags[ i ].textContent
				&& tags[ i ].textContent.indexOf( searchText ) > -1
				&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
			) {
			    loopBack( tags[ i ] );
			}
		}
	};

	FB.appSuggestions = function ( event ) {

		if ( event.type === 'load' ) {
			event.element.remove();
			document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
		}
	};

	
	for ( var func in FB ) {

		if ( !options[ func ] ) {
			window.addEventListener( 'scroll', FB[ func ].bind( null, 'scroll' ) );
		}
	}

	waitFor( '#pagelet_canvas_nav_content', function ( element ) {

		for ( var func in FB ) {

			if ( !options[ func ] ) {
				FB[ func ]( {
					'element' : element,
					'type'    : 'load'
				} );
			}
		}
	} );
}
