(function() {

  var canvas, context, width, height;
  var particles = [];

  function render(callback) {

  }

  function init() {
    canvas = document.getElementById('main');
    context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.globalCompositeOperation = 'lighten';

    drawCanvas();

    for (var i = 0; i < 50; i++) {
      generateParticle();
    }

    draw();
  }

  function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'hsla(228, 92%, 5%, 1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {

    drawCanvas();

    for (var i = 0; i < particles.length; i++) {

      if(particles[i].dead)
        particles.splice(i, 1);

      context.globalCompositeOperation = "lighter"
      context.beginPath();

      var gradient = context.createRadialGradient(particles[i].x, particles[i].y, 0, particles[i].x, particles[i].y, particles[i].size);
      gradient.addColorStop(1, 'transparent');
      gradient.addColorStop(0, particles[i].color);

      context.fillStyle = gradient;
      context.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      //Do gravity stuff.
      particles[i].x += particles[i].Hvelocity;
      particles[i].y += particles[i].Vvelocity;

      if(particles[i].x - particles[i].size > canvas.width || particles[i].y - particles[i].size > canvas.height)
        particles[i].dead = true;
    }

    if (particles.length < 1000)
      for (var i = 0; i < 10; i++)
        generateParticle();

    requestAnimationFrame(draw);
  }

  function generateParticle() {

    var colors = [
      'rgba(68, 101, 173, 0.3)',
      'rgba(41, 185, 133, 0.3)',
    ]

    var color = Math.floor(Math.random() * colors.length) + 0;

    var particle = {
      x: Math.floor(Math.random() * -100) + 0,
      y: Math.floor(Math.random() * -100) + 0,
      size: Math.floor(Math.random() * 150) + 30,
      color: colors[color],
      Hvelocity: Math.floor(Math.random() * 10) + 1,
      Vvelocity: Math.floor(Math.random() * 10) + 1,
      dead: false
    }

    particles.push(particle);
  }

  setTimeout(function() {
    init();
  }, 500);

})();
