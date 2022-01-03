function parseTweets(runkeeper_tweets) 
{
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) 
	{
		window.alert('No tweets returned');
		return;
	}

	//In line map use with anonymous function
	tweet_array = runkeeper_tweets.map(function(tweet) 
	{
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);

	// Tweet Dates
	var lastElem = tweet_array[0].time;
	$('#lastDate').text(lastElem.toLocaleDateString());

	var firstElem = tweet_array[tweet_array.length - 1].time;
	$('#firstDate').text(firstElem.toLocaleDateString());


	//Tweet Categories
	var completed_event = 0;
	var live_event = 0;
	var achievement = 0;
	var miscellaneous = 0;

	for (var i = 0; i < tweet_array.length; i++)
	{
		var elem = tweet_array[i];
		var str = elem.source;
		if      (str.localeCompare('completed_event') == 0) { completed_event++;}
		else if (str.localeCompare('live_event') == 0) { live_event++;}
		else if (str.localeCompare('achievement') == 0) { achievement++; }
		else if (str.localeCompare('miscellaneous') == 0) { miscellaneous++;}
	}

	var total = completed_event + live_event + achievement + miscellaneous;

	$('.completedEvents').text(completed_event);
	var completedPercentage = (completed_event * 100) / total;
	var completedFormatted = math.format(completedPercentage,  {notation: 'fixed', precision: 2});
	$('.completedEventsPct').text(completedFormatted + '%');

	$('.liveEvents').text(live_event);
	var livePercentage = (live_event * 100) / total;
	var liveFormatted = math.format(livePercentage,  {notation: 'fixed', precision: 2});
	$('.liveEventsPct').text(liveFormatted + '%');

	$('.achievements').text(achievement);
	var achievementsPercentage = (achievement * 100) / total;
	var achievementsFormatted = math.format(achievementsPercentage,  {notation: 'fixed', precision: 2});
	$('.achievementsPct').text(achievementsFormatted + '%');

	$('.miscellaneous').text(miscellaneous);
	var miscellaneousPercentage =(miscellaneous * 100) / total;
	var miscellaneousFormatted = math.format(miscellaneousPercentage,  {notation: 'fixed', precision: 2});
	$('.miscellaneousPct').text(miscellaneousFormatted + '%');


	//User-written tweets
	var userTextCount = 0;
	for (var j = 0; j < tweet_array.length; j++)
	{
		var itemText = tweet_array[j];
		if (itemText.written == true)
		{
			userTextCount++;
		}
	}

	$('.written').text(userTextCount);
	completedPercentage = (userTextCount * 100) / completed_event;
	completedFormatted = math.format(completedPercentage,  {notation: 'fixed', precision: 2});
	$('.writtenPct').text(completedFormatted + '%');
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});