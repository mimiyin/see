// const FILENAME = "https://cdn.glitch.com/06b7055d-7df2-42d7-8ef4-38de4afcbfb6%2Fcysm-day-01.mp4?v=1588386647767";
const FILENAME = "https://cysm.s3.amazonaws.com/cysm-day-2.mp4";


// Movie settings
const MOVIE_WIDTH = 1920;
const MOVIE_HEIGHT = 1080;
const MWH = MOVIE_WIDTH/MOVIE_HEIGHT;
const MHW = MOVIE_HEIGHT/MOVIE_WIDTH;

let titles = ["Can you see me?", "Hello", "Yes", "I'm not sure.", "Lalala", "The cup runneth over."];
let title = titles[0];
let instructions = '';

function load() {
  let urlParams = new URLSearchParams(window.location.search);
  let filename = urlParams.get("day") || 1;
  title = titles[filename];
  instructions = 'Day ' + filename + ': ' + title + '<br>';
  console.log("Title:", title);
  let video = document.getElementsByTagName('video')[0];
  let source = document.getElementsByTagName('source')[0];
  source.src = "https://cysm.s3.amazonaws.com/cysm-day-" + filename + ".mp4";
  video.load();
}