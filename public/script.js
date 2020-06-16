// Hello, Yes, I'm not sure., Lalala., Oh god.

let movie, melt;
let video;
let vw,
  vh,
  mw,
  mh,
  vwhr,
  vhwr,
  mwhr,
  mhwr = 0;
let loop = false;

// Instructions
let lines;
let instr, int;

// Alpha
let a = 167;
let aspeed = 0.25;

// Start
let started = false;

function preload() {
  console.log("HI");
  load();
  // Grab the vidoe element
  melt = select("video").elt;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  instr = select("#instructions");

  melt.onloadeddata = (function() {
    resizeMovie();
    melt.autoplay = false;
    movie = new p5.MediaElement(melt);
    movie.pause();

    //Set-up instructions
    // Load the text
    lines = loadStrings("instructions.txt", () => {
      let l = 0;
      int = setInterval(() => {
        instr.html(instructions);
        instructions += lines[l];
        l++;
        if (l >= lines.length) clearInterval(int);
      }, 3000);
    });
  })(movie);

  // Set-up webcam
  video = createCapture(VIDEO, () => {
    vwhr = video.width / video.height;
    vhwr = video.height / video.width;
    // Fit to screen
    resizeVideo();
  });

  video.hide();
  imageMode(CENTER);
  noCursor();
}

function draw() {
  // Flip videos
  translate(width, 0);
  scale(-1, 1);
  push();
  // Webcam video
  if (loop) {
    let abs_aspeed = (0.1 * 60) / frameRate();
    aspeed = aspeed >= 0 ? abs_aspeed : -abs_aspeed;
    a += aspeed;
    if (a < -0 || a > 167) aspeed *= -1;
  }
  tint(255, a);
  image(video, width / 2, height / 2, vw, vh);
  pop();
  if (loop) instr.html(floor(movie.duration() - movie.time()));
}

function keyPressed() {
  controls();
}
function touchStarted() {
  controls();
}

function controls() {
  loop = !loop;
  if (loop) {
    instr.html("");
    a = started ? a : 0;
    movie.loop();
    movie.elt.muted = false;
    clearInterval(int);
    started = true;
  } else {
    movie.pause();
  }
}

// Resizing video
function resizeMovie() {
  let top = 0;
  let left = 0;
  let w = width; //window.innerWidth;
  let h = height; //window.innherHeight;
  if (w > h * MWH) {
    mw = w;
    mh = w * MHW;
    top = (mh - h) / 2;
  } else {
    mh = h;
    mw = h * MWH;
    left = (mw - w) / 2;
  }
  melt.style = "width: " + mw + "px; height: " + mh + "px;";

  melt.style =
    "width: " +
    mw +
    "px; height: " +
    mh +
    "px; top: -" +
    top +
    "px; left: -" +
    left +
    "px;";
}

function resizeVideo() {
  if (width > height * vwhr) {
    vw = width;
    vh = width * vhwr;
  } else {
    vh = height;
    vw = height * vwhr;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeMovie();
  resizeVideo();
}
