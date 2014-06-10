function prepareSvg(centerOfScreen, canvasWidth, canvasHeight) {
    var svgWidth = 170,
        svgHeight = 170,
        positionX = centerOfScreen + (canvasWidth / 2),// - svgWidth,
        positionY = (canvasHeight / 2);// - (svgHeight/2 );
       

    function createCircle(angleInDegrees) {

        var numberOfCircles = 10,
            r = 100,
            xCenterPoint = svgWidth / 2,
            yCenterPoint = svgHeight / 2,
            cx,
            cy,
            angleInDegrees,
            angleInRadians,
            letterPress = ['L', 'e', 't', 't', 'e', 'r', 'P', 'r', 'e', 's', 's'],
             equalDistanceInDegrees = 360 / letterPress.length;


       // paper.clear();


        for (var i = 0; i < letterPress.length; i += 1) {
            angleInRadians = angleInDegrees * Math.PI / 180;
            cx = (r * Math.cos(angleInRadians)) + xCenterPoint;
            cy = (r * Math.sin(angleInRadians)) + yCenterPoint;
            angleInDegrees += equalDistanceInDegrees;
            paper = Raphael(cx + positionX, cy + positionY, svgWidth, svgHeight);
            //paper.circle(cx, cy, 7);


            //var moveShadow = 'M' + cx +' '+ cy;
            //var firstLineShadow = 'L' + (cx + 15) + (cy - 5);
            //var firstQuadraticLineShadow = 'Q' + (cx + 10) + ' ' + (cy + 5) + ' ' + (cx + 30) + ' ' + (cy + 20);
            //var secondQuadraticLineShadow = 'Q' + (cx + 20) + ' ' + (cy + 10) + ' ' + (cx - 10) + ' ' + (cy + 30);
            //var secondLineShadow = 'L' + (cx + 15) + ' ' + (cy - 5);

         //   var shadow = paper.path(moveShadow, firstLineShadow, firstQuadraticLineShadow, secondQuadraticLineShadow, secondLineShadow);

           var shadow = paper.path(' M50,30 L 65,25 Q 60,35 80,50 Q 70, 40 45, 60 L  50,30 ');
            shadow.attr({
                stroke: "none",
                fill: "#333",
            }).scale(1.2, 1.2, [30], [20]).blur(2);

            var colorStick = getRandomColor();

            //var moveStick = 'M' + cx-20 + ' ' + cy-10;
            //var firstLineStick = 'L' + (cx + 15) + (cy - 10);
            //var firstQuadraticLineStick = 'Q' + (cx + 10) + ' ' + (cy + 5) + ' ' + (cx + 30) + ' ' + (cy + 20);
            //var secondQuadraticLineStick = 'Q' + (cx + 20) + ' ' + (cy + 10) + ' ' + (cx - 10) + ' ' + (cy + 30);
            //var thirdQuadraticLineStick = 'Q' + (cx - 25) + ' ' + (cy + 10) + ' '(cx - 20) + ' ' + (cy - 10);


            //var stick = paper.path(moveStick, firstLineStick, firstQuadraticLineStick, secondQuadraticLineStick, thirdQuadraticLineStick);

           var stick = paper.path(' M30,20 L 65,20 Q 60,35 80,50 Q 70, 40 40, 60 Q 25,40 30,20 ');
            stick.attr({
                stroke: 'none',
                fill: colorStick,
            }).scale(1.2, 1.2, [30], [20])
          
            var char = letterPress[i];

            var text = paper.text(40, 55, char);
            text.attr({
                fill: 'rgb(96, 96, 96)',
                'font-size': '38px',
                'font-family': 'Arial'
            }).rotate(-20, 0, 0);
         
            //var _transformedShadow = Raphael.transformPath(shadow, 'T400,0');
            //shadow.animate({ path: _transformedShadow }, 1500);

            //var _transformedPath = Raphael.transformPath(stick, 'T400,0');
            //stick.animate({ path: _transformedPath }, 1500);
        }
    }

    function drawAnimatedDivs() {
        var angle = 0;

        function frame() {
            var refreshInterval = 50;
            createCircle(angle);
            angle++;

            setTimeout(frame, refreshInterval);
            //window.requestAnimationFrame(frame);

            if (angle === 360) {
                angle = 0;
            }
        }

        frame();
    }

    drawAnimatedDivs();
}

function getRandomValue(min, max) {
    if (max === null) {
        max = min;
        min = 0;

    }
    return (Math.random() * (max - min) + min) | 0;
};

function getRandomColor() {
    var red = getRandomValue(120, 255);
    var green = getRandomValue(120, 255);
    var blue = getRandomValue(120, 255);
    //var alfa = getRandomValue(0,1);
    return "rgb(" + red + "," + green + "," + blue + ")";
};