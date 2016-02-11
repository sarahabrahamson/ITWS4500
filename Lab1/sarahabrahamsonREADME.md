Sarah Abrahamson
abrahs3
WebSci
Lab 1 Readme

I used an unordered list with 6 list items to display the tweets and hashtags.
The information I used (tweet text, username, name, profile picture url, and hashtags) 
was read into an array from the JSON. Every three seconds (using setTimeout) I updated 
the Bootstrap media list elements to be the next tweet 5 at a time so it would add only
one at a time. To create the cycling effect, I used slideDown from jQuery on the first 
element and slideUp on the sixth so it would look like there were 5 elemnts that were
moving and updating. I did the same for the list of hashtags.

The jQuery animations aren't perfect, so it appears jumpy at times or as if the list keeps
refreshing. I tried CSS animations too, but that looked even worse.