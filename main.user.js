// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.0.3
// @grant		none
// ==/UserScript==

if ( window.top === window.self ) {
	var removeSuggestedPosts = function () {

		var spanTags   = document.getElementsByTagName( 'span' );
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

		for ( var i = 0; i < spanTags.length; i++ ) {

			if ( spanTags[ i ].textContent == searchText ) {
				loopBack( spanTags[ i ] );
			}
		}
	};

	var removeSponsoredPosts = function () {

		var spanTags   = document.getElementsByTagName( 'a' );
		var searchText = 'Sponsored';
		var probable;
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

		for ( var i = 0; i < spanTags.length; i++ ) {

			if ( spanTags[ i ].textContent == searchText ) {
				loopBack( spanTags[ i ] );
			}
		}
	};

	window.addEventListener( 'scroll', removeSuggestedPosts );
	window.addEventListener( 'scroll', removeSponsoredPosts );

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

	waitFor( '#pagelet_canvas_nav_content', function ( target ) {

		// Not sure if this will actually do anything, cause sometimes the chat window isnt shown.
		removeSuggestedPosts();
		removeSponsoredPosts();

		target.remove();
		document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
	} );
}
