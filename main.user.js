// ==UserScript==
// @name	FB Cleanup
// @include	https://www.facebook.com/*
// //@run-at document-end
// @version		1.1.1
// @grant		none
// ==/UserScript==
(function FB_CleanUP () {
		var FB				=  {}
		,queue				=  {}
		,queueLast			=  {}
		,queueTimeout			=  {}
		,options = {
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
			'appSuggestions'      : false,
			'trending'            : false,
			'suggestedPages'      : false
		};

	FB.suggestedPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent == 'Suggested Post') {
					removePost(element)
				}
			});
		}
	};

	FB.sponsoredPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('a', function (element) {

				if (element.textContent == 'Sponsored') {
					removePost(element);
				}
			});
		};
	};

	FB.likedPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf('liked this') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		}
	};

	FB.commentedOnPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf('commented on') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.repliedToPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf('replied to') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.taggedInPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf(' tagged in ') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.sharedPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf(' shared ') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.viaPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf(' via ') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.wasMentionedInPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf(' was mentioned in ') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.wroteOnPosts = function () {

		this.events = ['change'];
		this.run = function () {

			filterElements('span', function (element) {

				if (element.textContent
					&& element.textContent.indexOf(' wrote on ') > -1
					&& getComputedStyle(element).color.toString() == 'rgb(145, 151, 163)'
				) {
					removePost(element);
				}
			});
		};
	};

	FB.appSuggestions = function () {

		this.run = function () {

			waitFor('#pagelet_canvas_nav_content', function (element) {
				element.remove();
				document.getElementsByClassName('fbChatSidebarBody')[0].style.height = '100%';
			});
		}
	};

	FB.trending = function () {

		this.run = function () {

			waitFor('#pagelet_trending_tags_and_topics', function (element) {

				element.remove();
			});
		};
	};

	FB.suggestedPages = function () {

		this.run = function () {

			waitFor('#pagelet_ego_pane', function (element) {

				element.remove();
			});
		};
	};

// Library
	var waitFor = function (locator, callBack) {

		if (typeof locator === 'string') {
			var check = document.querySelector(locator);

			if (check) {
				callBack(check);

			} else {
				setTimeout(function () {

					waitFor(locator, callBack);
				}, 1);
			}
		}
	};

	var removePost = function (target) {

		if (target.hasAttribute('data-cursor')) {

			if (target.style.display !== 'none') {
				target.style.display = 'none';
			}

		} else if (target.parentNode) {
			removePost(target.parentNode);
		}
	};

	var filterElements = function (element, condition) {

		if (!queue[element]) {
			queue[element] = [];
		}

		queue[element].push(condition);

		clearTimeout(queueTimeout);

		queueTimeout = setTimeout(function () {

			for (var type in queue) {
				if (queue.hasOwnProperty(type)) {
					var last;
					var contains;

					var tags = document.getElementsByTagName(type);

					if (queueLast[type]) {
						contains = tags.indexOf(queueLast[type]);
					}

					for (var func in queue[type]) {

						if (queue[type].hasOwnProperty(func)) {
							for (var i = ( ( contains > 0 ) ? contains : 0 ); i < tags.length; i++) {

								queue[type][func](tags[i]);

							}

							last = tags[i];
						}

					}

					queueLast[type] = last;
				}
			}
		}, 1);
	};

	if (window.top === window.self) {

		var active = [];
		var observer = new MutationObserver(function (mutations) {

			for (var i in active) {
				if (active.hasOwnProperty(i)) {
					active[i]();
				}
			}
		});

		observer.observe(document.body, {
			'attributes': true,
			'childList': true,
			'characterData': true
		});

		for (var func in FB) {

			if (FB.hasOwnProperty(func)) {
				if (!options[func]) {
					(function (func) {

						func.run();

						if (func.events) {

							for (var i in func.events) {

								if (func.events.hasOwnProperty(i)) {
									if (func.events[i] == 'change') {
										active.push(func.run);
									}
									//		window.addEventListener( func.events[ i ], func.run );
								}
							}
						}
					})(new FB[func]());
				}
			}
		}
	}
}());
