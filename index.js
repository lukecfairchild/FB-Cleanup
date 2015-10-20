
var removeSuggestedPosts = function () {

	var spanTags = document.getElementsByTagName( 'span' );
	var searchText = 'Suggested Post';

	for ( var i = 0; i < spanTags.length; i++ ) {

		if ( spanTags[ i ].textContent == searchText ) {
			var target = spanTags[ i ].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

			if ( target.style.display !== 'none' ) {
				console.log( 'Removed suggested post' );
				target.style.display = 'none';
			}
		}
	}
};

var removeSponsoredPosts = function () {

	var spanTags = document.getElementsByTagName( 'a' );
	var searchText = 'Sponsored';

	for ( var i = 0; i < spanTags.length; i++ ) {

		if ( spanTags[ i ].textContent == searchText ) {
			var target = spanTags[ i ].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

			if ( target.style.display !== 'none' ) {
				console.log( 'Removed sponsored post.' );
				target.style.display = 'none';
			}
		}
	}
};

window.addEventListener( 'scroll', removeSuggestedPosts );
window.addEventListener( 'scroll', removeSponsoredPosts );
