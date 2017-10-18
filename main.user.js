// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// @version		1.2.0
// @grant		none
// ==/UserScript==

( function FB_CleanUP () {

	var FB           = {};
	var util         = {};
	var queue        = {};
	var queueLast    = {};
	var queueTimeout = {};
	var options      = {
		'suggestedPosts'      : false,
		'sponsoredPosts'      : false,
		'likedPosts'          : false,
		'commentedOnPosts'    : false,
		'repliedToPosts'      : false,
		'wasTaggedInPosts'    : false,
		'sharedPosts'         : true,
		'viaPosts'            : true,
		'wasMentionedInPosts' : false,
		'wroteOnPosts'        : false,
		'gamesYouMayLike'     : false,
		'appSuggestions'      : false,
		'trending'            : false,
		'suggestedPages'      : false,
		'recommendedGames'    : false,
		'showMoreStories'     : false
	};

	FB.suggestedPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent == 'Suggested Post' ) {
					util.removePost( element );
				}
			} );
		}
	};

	FB.showMoreStories = function () {

		var lastScroll = 0;

		this.events = [ 
			'change'
		];

		this.run = function ( event ) {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent == 'More Stories' ) {
					var parent = element.parentElement;

					var elementInViewport2 = function ( el ) {

						var top    = el.offsetTop;
						var left   = el.offsetLeft;
						var width  = el.offsetWidth;
						var height = el.offsetHeight;

						while ( el.offsetParent ) {
							el    = el.offsetParent;
							top  += el.offsetTop;
							left += el.offsetLeft;
						}

						return ( top < ( window.pageYOffset + window.innerHeight )
							&& left < ( window.pageXOffset + window.innerWidth )
							&& ( top + height ) > window.pageYOffset
							&& ( left + width ) > window.pageXOffset
						);
					}

					if ( elementInViewport2( parent ) ) {

						console.log( 'IT WAS SEEN!!!!' );

						if ( parent.fireEvent ) {
							parent.fireEvent( 'onclick' );

						} else {
							var evObj = document.createEvent( 'Events' );

							evObj.initEvent( 'click', true, false );
							parent.dispatchEvent( evObj );
						}
					}
                }
            } );
		};
	};

	FB.sponsoredPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'a', function ( element ) {

				if ( element.textContent == 'Sponsored' ) {
					util.removePost( element );
				}
			} );
		};
	};

	FB.likedPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( 'liked this' ) > -1 ) {

					util.removePost( element );
				}
			} );
		}
	};

	FB.commentedOnPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( 'commented on' ) > -1 ) {

					util.removePost( element );
				}
			} );
		};
	};

	FB.repliedToPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( 'replied to' ) > -1 ) {

					element.style.backgroundColor = '000000';
					util.removePost( element );
				}
			});
		};
	};

	FB.taggedInPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( ' tagged in ' ) > -1 ) {

					util.removePost( element );
				}
			} );
		};
	};

	FB.sharedPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( ' shared ' ) > -1 ) {

					util.removePost( element );
				}
			} );
		};
	};

	FB.viaPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( ' via ' ) > -1 ) {

					util.removePost( element );
				}
			} );
		};
	};

	FB.wasMentionedInPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( ' was mentioned in ' ) > -1 ) {

					util.removePost( element );
				}
			});
		};
	};

	FB.wroteOnPosts = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'span', function ( element ) {

				if ( element.textContent
				&&   element.textContent.indexOf( ' wrote on ' ) > -1 ) {

					util.removePost( element );
				}
			} );
		};
	};

	FB.gamesYouMayLike = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.filterElements( 'div', function ( element ) {

				if ( element.textContent
					&& element.textContent.indexOf( 'See all game recommendations' ) > -1
					&& getComputedStyle( element ).color.toString() == 'rgb(145, 151, 163)'
				) {
					util.removePost( element );
				}
			} );
		};
	};

	FB.appSuggestions = function () {

		this.events = [ 'change', 'load' ];
		this.run    = function () {

			util.waitFor( '#pagelet_canvas_nav_content', function ( element ) {

				element.remove();
				document.getElementsByClassName( 'fbChatSidebarBody' )[ 0 ].style.height = '100%';
			});
		}
	};

	FB.recommendedGames = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.find( '#pagelet_canvas_nav_content', function ( element ) {

				element.remove();
			});
		}
	};

	FB.trending = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.find( '#pagelet_trending_tags_and_topics', function ( element ) {

				element.remove();
			} );
		};
	};

	FB.suggestedPages = function () {

		this.events = [ 'change' ];
		this.run    = function () {

			util.find( '#pagelet_ego_pane', function ( element ) {

				element.remove();
			} );
		};
	};

	util.waitFor = function ( locator, callBack ) {

		if ( typeof locator === 'string' ) {
			var check = document.querySelector( locator );

			if ( check ) {
				callBack( check );

			} else {
				setTimeout( function () {

					util.waitFor( locator, callBack );
				}, 1 );
			}
		}
	};

	util.find = function ( locator, callBack ) {

		if ( typeof locator === 'string' ) {
			var check = document.querySelector( locator );

			if ( check ) {
				callBack( check );

			}
		}
	};

	util.removePost = function ( target ) {

		if ( target.hasAttribute( 'data-cursor' ) ) {

			if ( target.style.display !== 'none' ) {
				target.style.display = 'none';
			}

		} else if ( target.parentNode ) {
			util.removePost( target.parentNode );
		}
	};

	util.filterElements = function ( element, callBack ) {

		if ( !queue[ element ] ) {
			queue[ element ] = [];
		}

		queue[ element ].push( callBack );

		clearTimeout( queueTimeout );

		queueTimeout = setTimeout( function () {

			for ( var type in queue ) {

				if ( queue.hasOwnProperty( type ) ) {
					var last;
					var contains;

					var tags = document.getElementsByTagName( type );

					if ( queueLast[ type ] ) {
						contains = tags.indexOf( queueLast[ type ] );
					}

					for ( var func in queue[ type ] ) {

						if ( queue[ type ].hasOwnProperty( func ) ) {

							for ( var i = ( ( contains > 0 ) ? contains : 0 ); i < tags.length; i++ ) {
								queue[ type ][ func ]( tags[ i ] );
							}

							last = tags[ i ];
						}
					}

					queueLast[ type ] = last;
				}
			}
		}, 1 );
	};

	if ( window.top === window.self ) {
		var changes = [];
		var scrolls = [];

		var lastChange = 0;
		var lastScroll = 0;

		var observer = new MutationObserver( function ( mutations ) {

			var currentTime = ( new Date() ).getTime();

			if ( lastChange + 100 < currentTime ) {

				lastChange = currentTime;

				return;
			}

			lastChange = Infinity;

			setTimeout( function () {

				lastChange = 0;

				for ( var i in changes ) {

					if ( changes.hasOwnProperty( i ) ) {
						changes[ i ]();
					}
				}
			}, 1000 );
		} );

		/* This causes way too much latency when scrolling.
		window.addEventListener( 'scroll', function () {

			var currentTime = ( new Date() ).getTime();

			if ( event
			&&   event.type === 'scroll'
			&&   lastScroll + 100 < currentTime ) {

				lastScroll = currentTime;

				return;
			}

			lastScroll = Infinity;

			setTimeout( function () {

				lastScroll = 0;

				for ( var i in scrolls ) {

					if ( scrolls.hasOwnProperty( i ) ) {
						scrolls[ i ]();
					}
				}
			}, 1000 );
		} );
		*/

		observer.observe( document.body, {
			'attributes'    : true,
			'childList'     : true,
			'characterData' : true
		} );

		for ( var func in FB ) {

			if ( FB.hasOwnProperty( func ) ) {

				if ( !options[ func ] ) {

					( function ( func ) {

						func.run();

						if ( func.events ) {

							for ( var i in func.events ) {

								if ( func.events.hasOwnProperty( i ) ) {

									if ( func.events[ i ] == 'change' ) {
										changes.push( func.run );
									}

									if ( func.events[ i ] == 'scroll' ) {
										scrolls.push( func.run );
									}
								}
							}
						}
					} )( new FB[ func ]() );
				}
			}
		}
	}
} )();
