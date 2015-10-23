// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.0.8
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
		}
	};

	FB.sponsoredPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

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
	};

	FB.likedPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

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
		}
	};

	FB.commentedOnPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

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
	};

	FB.repliedToPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

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
	};

	FB.taggedInPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {
			var tags       = document.getElementsByTagName( 'span' );
			var searchText = ' tagged in ';
			var loopBack   = function ( target ) {

				if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

					if ( target.style.display !== 'none' ) {
						console.log( 'Removed tagged in post.' );
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
	};

	FB.sharedPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {

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
	};

	FB.viaPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {
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
	};

	FB.wasMentionedInPosts = function () {

		this.events = [ 'scroll' ];
		this.run    = function () {
			var tags       = document.getElementsByTagName( 'span' );
			var searchText = ' was mentioned in ';
			var loopBack   = function ( target ) {

				if ( getComputedStyle( target ).borderLeftStyle === 'solid' ) {

					if ( target.style.display !== 'none' ) {
						console.log( 'Removed was mentioned in post.' );
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
