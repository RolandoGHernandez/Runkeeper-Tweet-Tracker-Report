function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	//Determining activity type and distance using the get functions from tweet.ts

	// Get the total number of tweets per activity type NumTweet
	// Find 3 highest activity types based on distance (not time) 
	var runTotal = 0;
	let runNumTweet = 0;

	var yogaTotal = 0;
	let yogaNumTweet = 0;

	var walkTotal = 0;
	let walkNumTweet = 0;

	var bikeTotal = 0;
	let bikeNumTweet = 0;

	var swimTotal = 0;
	let swimNumTweet = 0;

	var ellipticalTotal = 0;
	let ellipticalNumTweet = 0;

	var skiTotal = 0;
	let skiNumTweet = 0;

	let notActivity = 0;

	for (var i = 0; i < tweet_array.length; i++)
	{
		if (tweet_array[i].activityType == 'run')  { runTotal += tweet_array[i].distance; runNumTweet++; }
        else if (tweet_array[i].activityType == 'yoga') { yogaTotal += tweet_array[i].distance; yogaNumTweet++; }
        else if (tweet_array[i].activityType == 'walk') { walkTotal += tweet_array[i].distance; walkNumTweet++; }
        else if (tweet_array[i].activityType == 'bike') { bikeTotal += tweet_array[i].distance; bikeNumTweet++; }
        else if (tweet_array[i].activityType == 'swim') { swimTotal += tweet_array[i].distance; swimNumTweet++; }
        else if (tweet_array[i].activityType == 'elliptical') { ellipticalTotal += tweet_array[i].distance; ellipticalNumTweet++; }
        else if (tweet_array[i].activityType == 'ski') { skiTotal += tweet_array[i].distance; skiNumTweet++; }
        else { notActivity++; }
	}

	$('#numberActivities').text(7); // 7 different types of activities


	// BY AMOUNT OF TWEETS PER ACTIVITY LOGGED
	var numTweetArray = [runNumTweet, yogaNumTweet, walkNumTweet, bikeNumTweet, swimNumTweet, ellipticalNumTweet, skiNumTweet];
	numTweetArray.sort((a, b) => a - b);

	// BY DISTANCE
	var totalArray = [runTotal, yogaTotal, walkTotal, bikeTotal, swimTotal, ellipticalTotal, skiTotal];
	totalArray.sort((a, b) => a - b);


	// top = first, mid = second, low = third
	var top = numTweetArray[numTweetArray.length - 1];
	var mid = numTweetArray[numTweetArray.length - 2];
	var low = numTweetArray[numTweetArray.length - 3];

	/////////////////////////////////////////////////////
	// I didn't realize these span answers could be hardcoded so please ignore them even though they
	/////////////////////////////////////////////////////

	// // first span
	if (top == runNumTweet) { $('#firstMost').text('run'); }
	else if (top == yogaNumTweet) { $('#firstMost').text('yoga'); }
	else if (top == walkNumTweet) { $('#firstMost').text('walk'); }
	else if (top == bikeNumTweet) { $('#firstMost').text('bike'); }
	else if (top == swimNumTweet) { $('#firstMost').text('swim'); }
	else if (top == ellipticalNumTweet) { $('#firstMost').text('elliptical'); }
	else if (top == skiNumTweet) { $('#firstMost').text('ski'); }
	else {notActivity++;}

	// second span
	if (mid == runNumTweet) { $('#secondMost').text('run'); }
	else if (mid == yogaNumTweet) { $('#secondMost').text('yoga'); }
	else if (mid == walkNumTweet) { $('#secondMost').text('walk'); }
	else if (mid == bikeNumTweet) { $('#secondMost').text('bike'); }
	else if (mid == swimNumTweet) { $('#secondMost').text('swim'); }
	else if (mid == ellipticalNumTweet) { $('#secondMost').text('elliptical'); }
	else if (mid == skiNumTweet) { $('#secondMost').text('ski'); }
	else {notActivity++;}

	// third span
	if (low == runNumTweet) { $('#thirdMost').text('run'); }
	else if (low == yogaNumTweet) { $('#thirdMost').text('yoga'); }
	else if (low == walkNumTweet) { $('#thirdMost').text('walk'); }
	else if (low == bikeNumTweet) { $('#thirdMost').text('bike'); }
	else if (low == swimNumTweet) { $('#thirdMost').text('swim'); }
	else if (low == ellipticalNumTweet) { $('#thirdMost').text('elliptical'); }
	else if (low == skiNumTweet) { $('#thirdMost').text('ski'); }
	else {notActivity++;}



	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
		  "values": 
			[
				{"Activity Type": "run", "Amount": runNumTweet}, 
				{"Activity Type": "yoga", "Amount": yogaNumTweet},
				{"Activity Type": "walk", "Amount": walkNumTweet},
				{"Activity Type": "bike", "Amount": bikeNumTweet},
				{"Activity Type": "swim", "Amount": swimNumTweet},
				{"Activity Type": "elliptical", "Amount": ellipticalNumTweet},
				{"Activity Type": "ski", "Amount": skiNumTweet}
			]},
		"mark": "point",
		"encoding": {
			 "x": {
				  "field": "Activity Type",
				  "type": "nominal",
				  "sort": ["run", "yoga", "walk", "bike", "swim", "elliptical", "ski"]
				  },
			  "y": {
				  "field": "Amount",
				  "type": "quantitative"
			  	}
		   	}
		};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});



	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.


	// Distances by day of the week for all of the three most tweeted about activities
	// Must parse distance per day of the week for every tweet within the same day for one of the 3 top activities

	// Step 1: Create new array with things I want to pass to Vega Lite according to TA Cass

	var firstMost = document.getElementById('firstMost');
	// console.log(firstMost.textContent);
	var secondMost = document.getElementById('secondMost');
	// console.log(secondMost.textContent);
	var thirdMost = document.getElementById('thirdMost');
	// console.log(thirdMost.textContent);

	var topDistance = 0;
	var midDistance = 0;
	var lowDistance = 0;

	// Used for hardcoding weekday or weekend answer

	var weekdayCount = 0;
	var weekdayDistance = 0;

	var weekendCount = 0;
	var weekendDistance = 0;

	var vegaArray = [];
	
	for (var j = 0; (j < (tweet_array.length - 1) ); j++)
	{
		if (tweet_array[j].activityType == firstMost.textContent || tweet_array[j].activityType == secondMost.textContent || tweet_array[j].activityType == thirdMost.textContent)
		{
			var activityObject = new Object();

			activityObject = 
			{
				'dayOfWeek': tweet_array[j].time.toLocaleDateString('en-US', {'weekday': 'short'}), 
				'distance':  tweet_array[j].distance, 
				'activity': tweet_array[j].activityType
			};
			
			vegaArray.push(activityObject); // pushes Objects with 3 pairs to vegaArray 
			//console.log(activityObject);

			// Now integrate averaging the longest and shortest activities and also whether
			// the longest distance is on weekdays or weekends
		
			if (tweet_array[j].activityType == firstMost.textContent)
			{
				var specificDay = tweet_array[j].time.toLocaleDateString('en-US', {'weekday': 'short'});
				topDistance += tweet_array[j].distance;
				// now knowing this is the longest activity type:
				if (specificDay == 'Sat' || specificDay == 'Sun')
				{
					weekendCount++;
					weekendDistance += tweet_array[j].distance;
				}
				else
				{
					weekdayCount++;
					weekdayDistance += tweet_array[j].distance;
				}
			}
			if (tweet_array[j].activityType == secondMost.textContent)
			{
				midDistance += tweet_array[j].distance;
			}
			if (tweet_array[j].activityType == thirdMost.textContent)
			{
				lowDistance += tweet_array[j].distance;
			}
		}
	}

	// top is actually the top "activity" of tweets so just displays distances of all three top tweets
	var distanceArray = [topDistance, midDistance, lowDistance];
	//console.log(distanceArray);
	distanceArray.sort((a, b) => a - b);
	// where 0 is the shortest and 2 is the longest
	//console.log(distanceArray[0], distanceArray[1], distanceArray[2]);

	// upon looking at these values:
	$('#longestActivityType').text('run');
	$('#shortestActivityType').text('bike');

	// Average the longest activities and whether they are on the weekend or weekday
	// The longest activity is run so:

	// console.log(weekdayDistance/weekdayCount);
	// console.log(weekendDistance/weekendCount);
	// answer is weekend based on average
	$('#weekdayOrWeekendLonger').text('the weekend'); // inlcuded "the" for the sentence to make more sense



	// Step 2: Manipulate the encoding aspects.

	activity_vis_spec2 = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"data": {
		  "values": vegaArray,
		},
		"mark": "point",
		"encoding": {
			 "x": {
				"sort": ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"],
				 	"title": "time (day)",
					"field": "dayOfWeek",
				  	"type": "ordinal",
				  },
			  "y": {
				  	"field": "distance",
				  	"type": "quantitative"
					},
				"color":
				{
					"title": "Activity Type",
					"field": "activity",
					"type": "nominal"
				}
			}
		};
	vegaEmbed('#distanceVis', activity_vis_spec2, {actions:false});




	/////////////////////////////////////////////////////
	// Aggregating three most tweeted activities by MEAN
	// Third graph
	
	activity_vis_spec3 = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"data": {
		  "values": vegaArray,
		},
		"mark": "point",
		"encoding": {
			 "x": {
				"sort": ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"],
				 	"title": "time (day)",
					"field": "dayOfWeek",
				  	"type": "ordinal",
				  },
			  "y": {
				  	"aggregate": "mean",
				  	"field": "distance",
				  	"type": "quantitative"
					},
				"color":
				{
					"title": "Activity Type",
					"field": "activity",
					"type": "nominal"
				}
			}
		};
	vegaEmbed('#distanceVisAggregated', activity_vis_spec3, {actions:false});



}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);

	$('#distanceVisAggregated').hide();
	$('#aggregate').click(function(event)
	{
		var element = $(event.target);

		if (element.text() == 'Show means')
		{
			$('#distanceVis').hide();
			$('#distanceVisAggregated').show();
			// reset text
			element.text('Show all activities');
		}
		else
		{
			$('#distanceVis').show();
			$('#distanceVisAggregated').hide();
			//$('#distanceVis').hide();
			// reset text
			element.text('Show means');
		}
	});
});