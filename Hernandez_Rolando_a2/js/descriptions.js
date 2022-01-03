function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	// Why isn't tweet_array accessible here???
	// Make my own??  Taken from activities.js

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	var filteredArray = tweet_array.filter(function (n)
	{
		if (n.written == true)
		{
			return n;
		}
	})
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	// yet another array
	// var 
	// for (i = 0; i < filteredArray.length; i++)
	// {
		
	// }
}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});