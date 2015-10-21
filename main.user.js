// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.0.2
// @grant		none
// ==/UserScript==

if ( window.top === window.self ) {
	var parents = [];

	var findParents = function ( target ) {

		if ( !target ) {
			element = document.getElementsByTagName( 'textarea' );

			if ( element ) {
				target = element[ 0 ];
			}
		}

		if ( target && target.parentNode ) {
			parents.push( target );
			findParents( target.parentNode );
		}
	};

	var removeSuggestedPosts = function () {

		var spanTags   = document.getElementsByTagName( 'span' );
		var searchText = 'Suggested Post';
		var loopBack   = function ( target ) {

			if ( target.parentNode
				&& target.parentNode.parentNode
				&& target.parentNode.parentNode.parentNode
				&& parents.indexOf( target.parentNode.parentNode.parentNode ) > -1
			) {

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
		var loopBack   = function ( target ) {

			if ( target.parentNode
				&& target.parentNode.parentNode
				&& target.parentNode.parentNode.parentNode
				&& parents.indexOf( target.parentNode.parentNode.parentNode ) > -1
			) {

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

	findParents();
/*
	window.addEventListener( 'scroll', removeSuggestedPosts );
	window.addEventListener( 'scroll', removeSponsoredPosts );
*/
	var waitFor = function ( locator, callBack ) {

		if ( typeof locator === 'string' ) {
			var check = document.querySelector( locator );

			if ( check ) {
				console.log( 'is this firing?' );
				callBack( check );

			} else {
				setTimeout( function () {

					waitFor( locator, callBack );
				}, 1 );
			}
		}
	};

	waitFor( '#pagelet_canvas_nav_content', function ( target ) {

		target.remove();
		document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
	} );
}
