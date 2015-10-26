// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.0.9
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

var removePost = function ( target ) {

	if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

		if ( target.style.display !== 'none' ) {
			target.style.display = 'none';
		}

	} else if ( target.parentNode ) {
		removePost( target.parentNode );
	}
};

var queue = {};
var queueLast;
var queueTimeout;

var filterElements = function ( element, condition ) {

	if ( !queue[ element ] ) {
		queue[ element ] = [];
	}

	queue[ element ].push( condition );

	clearTimeout( queueTimeout );

	queueTimeout = setTimeout( function () {

		for ( var type in queue ) {
			var last;

			var tags     = document.getElementsByTagName( type );
			var contains = tags.indexOf( queueLast[ type ] );

			for ( var i = ( ( contains > 0 ) ? contains : 0 ); i < tags.length; i++ ) {
				queue[ type ]( tags[ i ] );
				last = tags[ i ];
			}

			queueLast[ type ] = last;
		}
	}, 10 );
};

if ( window.top === window.self ) {
	var FB      = {};
	var options = {
		'suggestedPosts'      : false,
		'sponsoredPosts'      : false,
		'likedPosts'          : false,
		'commentedOnPosts'    : false,
		'repliedToPosts'      : false,
		'wasTaggedInPosts'    : false,
		'sharedPosts'         : true,
		'viaPosts'            : true,
		'wasMentionedInPosts' : false,
		'appSuggestions'      : false,
		'trending'            : false,
		'suggestedPages'      : false
	};

	FB.suggestedPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent == 'Suggested Post' ) {
					removePost( element )
				}
			} );
		}
	};

	FB.sponsoredPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'a', function ( element ) {

				if ( tags[ i ].textContent == 'Sponsored' ) {
					removePost( tags[ i ] );
				}
			} );
		};
	};

	FB.likedPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( 'liked this' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		}
	};

	FB.commentedOnPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& tags[ i ].textContent.indexOf( 'commented on' ) > -1
					&& getComputedStyle( tags[ i ] ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( tags[ i ] );
				}
			} );
		};
	};

	FB.repliedToPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( 'replied to' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		};
	};

	FB.taggedInPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( ' tagged in ' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		};
	};

	FB.sharedPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( ' shared ' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		};
	};

	FB.viaPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( ' via ' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		};
	};

	FB.wasMentionedInPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

			filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( ' was mentioned in ' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost( element );
				}
			} );
		};
	};

	FB.appSuggestions = function () {

		this.run    = function () {

			waitFor( '#pagelet_canvas_nav_content', function ( element ) {
				element.remove();
				document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
			} );
		}
	};

	FB.trending = function () {

		this.run    = function () {

			waitFor( '#pagelet_trending_tags_and_topics', function ( element ) {

				element.remove();
			} );
		};
	};

	FB.suggestedPages = function () {

		this.run    = function () {

			waitFor( '#pagelet_ego_pane', function ( element ) {

				element.remove();
			} );
		};
	};

	
	for ( var func in FB ) {

		if ( !options[ func ] ) {
			( function ( func ) {

				func.run();

				if ( typeof func.events === 'object' ) {

					for ( var i in func.events ) {
						window.addEventListener( func.events[ i ], func.run );
					}
				}
			} )( new FB[ func ]() );
		}
	}
}
