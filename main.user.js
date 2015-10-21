// ==UserScript==
// @name	FB Cleanup
// @include	http://www.facebook.com/*
// @run-at document-end
// @version		1
// @grant		none
// ==/UserScript==

var parents = [];

var findParents = function ( target ) {

	if ( !target ) {
		target = document.getElementsByTagName( 'textarea' )[ 0 ];
	}

	if ( target.parentNode ) {
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

window.addEventListener( 'scroll', removeSuggestedPosts );
window.addEventListener( 'scroll', removeSponsoredPosts );

if ( document.getElementById( 'pagelet_canvas_nav_content' ) ) {
	document.getElementById( 'pagelet_canvas_nav_content' ).remove();
	document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
}
