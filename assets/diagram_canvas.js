const dcanvas = document.getElementById("diagram-canvas");
const dcontainer = document.querySelector(".diagram__content");
const dcontext = dcanvas.getContext("2d");
const dhash = "1EldeuKR_zW0oalo8ZDRdA";
const dframeName = "diagram-frame";
let dwrh = null;
heroPadding = 20;
dcontext.translate(0.5, 0.5);

dcanvas.width = dcontainer.offsetWidth;
// dcanvas.height = dcontainer.offsetHeight;

dcontext.fillStyle = "blue";
dcontext.fillRect(0, 0, dcanvas.width, dcanvas.height);

const dframeCount = 95;
const dcurrentFrame = (index) =>
  `https://imagedelivery.net/${dhash}/${dframeName}-${index}/public`;
 
const dimages = [];
const spray = {
  frame: 0,
};

for (let i = 0; i < dframeCount; i++) {
  const img = new Image();
  img.src = dcurrentFrame(i);
  dimages.push(img);
}

// Get first image and set canvas height using image aspect (WORKS BC ALL IMAGES ARE SAME SIZE)

dimages[0].onload = (event) => {
  // console.log("first image loaded", event.target.width, event.target.height);
  dwrh = event.target.width / event.target.height;
  // dcanvas.height = (dcanvas.width/2) / dwrh;
  initDiagramCanvas();
};

//Once the first image is loaded, set the canvas size to the image size and get the width/height ratio

function initDiagramCanvas() {
  let diagramTimeline = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: ".dtest",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      markers: true,
    },
  });

  diagramTimeline.to(spray, {
    frame: dframeCount - 1,
    snap: "frame",
    ease: "none",
    onUpdate: renderd,
  });
}

function renderd() {
  console.log("renderd");
  let curImage = dimages[spray.frame];
  dcontext.clearRect(0, 0, dcanvas.width, dcanvas.height);
  dcontext.drawImage(curImage, (dcanvas.width/2)-(curImage.width/2)+100,(dcanvas.height/2)-(curImage.height/2), dcanvas.width/2, dcanvas.width / dwrh/2);
}
