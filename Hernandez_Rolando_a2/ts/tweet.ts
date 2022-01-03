class Tweet {
	private text:string;
	time:Date;
    created_at:string;

	constructor(tweet_text:string, tweet_time:string) {
        this.created_at = tweet_time
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string 
    {
        if ( this.text.includes('completed') || this.text.includes('posted') ) 
        { 
            return 'completed_event'; 
        }
        else if ( this.text.startsWith('Watch') || this.text.includes('Watch') || this.text.includes('watch') ) 
        { 
            return 'live_event'; 
        }
        else if ( this.text.startsWith("Achieved") || this.text.includes('Achieved') || this.text.includes("achieved") || this.text.includes('Achieve') || this.text.includes('achieve')) 
        { 
            return 'achievement'; 
        }
        else 
        { 
            return 'miscellaneous';
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes(' - ') == true && this.text.includes('TomTom MySports') == false)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    get writtenText():string {
        if(!this.written) 
        {
            return "";
        }
        //TODO: parse the written text from the tweet
        var str = this.text;
        
        //Gets rid of all text until first character after ' - ' which is user written text
        var regex = /[\w|.+\s+]*(- )/g;
        str = str.replace(regex, '');

        //Gets rid of https to the end
        regex = /( https)(.+|\w+|\s+)*/g;
        str = str.replace(regex, '');

        return str;
    }

    get activityType():string {
        if (this.source != 'completed_event' || this.text.includes (' km ') != true &&  this.text.includes (' mi ') != true) 
        {
            return "unknown";
        }

        //TODO: parse the activity type from the text of the tweet
        else if (this.text.includes('run ')) { return 'run'; }
        else if (this.text.includes('yoga')) { return 'yoga'; }
        else if (this.text.includes('walk')) { return 'walk'; }
        else if (this.text.includes('bike')) { return 'bike'; }
        else if (this.text.includes('swim')) { return 'swim'; }
        else if (this.text.includes('elliptical')) { return 'elliptical'; }
        else if (this.text.includes('ski ')) { return 'ski'; }
        else { return "unknown"; }
    }



    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var str = this.text;

        var isMiles = false;

        var distance = 0;

        //Determine if distance is in km or mi
        if (this.text.includes(' mi ')) { isMiles = true; }
        else { isMiles = false; }

        //Use Regex to get numerical distance value
        var regex = /(\d+)(\.)(\d+)/g;
        var matchedArray = str.match(regex);
        if (matchedArray != null)
        {
            str = matchedArray[0];
            distance = Number(str);
        }
        
        //If in km, convert distance from km to mi
        if (isMiles == false)
            {
                distance = distance / 1.609;
            }

        //return distance in mi
        return distance;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}