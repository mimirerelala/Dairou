function prepareSvg(centerOfScreen, canvasWidth, canvasHeight) {
    'use strict';
    var svgWidth = 300,
        svgHeight = 300,
        positionX = centerOfScreen + svgWidth,
        positionY = (canvasHeight - svgHeight + 8),
        paper = Raphael(positionX, positionY, svgWidth, svgHeight);

    function createCircle(angleInDegrees) {

        var r = 90,
            xCenterPoint = svgWidth / 2,
            yCenterPoint = svgHeight / 2,
            x,
            y,
            i,
            angleInRadians,
            letterPressWord = 'Letter Press ',
            equalDistanceInDegrees = 360 / letterPressWord.length,
            translate,
            scale,
            shadow,
            stick,
            text,
            firstIndexOfLetter = letterPressWord.indexOf('Letter'),
            lastIndexOfLetter = firstIndexOfLetter + 'Letter'.length,
            firstIndexOfPress = letterPressWord.indexOf('Press'),
            lastIndexOfPress = firstIndexOfPress + 'Press'.length,
            colorStick;

        paper.clear();

        for (i = 0; i < letterPressWord.length; i += 1) {
            angleInRadians = angleInDegrees * Math.PI / 180;
            x = (r * Math.cos(angleInRadians)) + xCenterPoint;
            y = (r * Math.sin(angleInRadians)) + yCenterPoint;
            angleInDegrees += equalDistanceInDegrees;

            translate = ' t' + (x - 50) + ' ' + (y - 30);
            scale = ' s' + 0.8 + ' ' + 0.8;

            shadow = paper.path('M 50 30 L 65,25 Q 60,35 80,50 Q 70, 40 45, 60 L  50,30');
            shadow.attr({
                stroke: "none",
                fill: "#333"
            });
            shadow.transform(translate + scale);
            shadow.scale(1.2, 1.2, [30], [20]);
            shadow.blur(2);

            //colorStick// = getRandomColor();

            if (firstIndexOfLetter <= i && i < lastIndexOfLetter) {
                colorStick = 'rgb(255, 67, 47)';
            }
            else if (firstIndexOfPress <= i && i < lastIndexOfPress) {
                colorStick = 'rgb(0, 162, 255)';
            }
            else {
                colorStick = 'rgb(225, 225, 225)';
            }

            stick = paper.path('M 30 20 L 65,20 Q 60,35 80,50 Q 70, 40 40, 60 Q 25,40 30,20');
            stick.attr({
                stroke: 'none',
                fill: colorStick
            });
            stick.transform(translate + scale);

            text = paper.text(38, 50, letterPressWord[i]);
            text.attr({
                fill: '#000',
                'font-size': '28px',
                'font-family': 'Arial'
            });
            text.transform(translate + scale);
            text.rotate(-20, 0, 0);
        }
    }

    function drawAnimatedDivs() {
        var angle = 180;

        function frame() {
            var refreshInterval = 80;
            createCircle(angle);
            angle += 1;

            setTimeout(frame, refreshInterval);
            //window.requestAnimationFrame(frame);

            if (angle === 540) {
                angle = 180;
            }
        }

        frame();
    }

    drawAnimatedDivs();
}

//function getRandomValue(min, max) {
//    'use strict';
//    if (max === null) {
//        max = min;
//        min = 0;
//    }

//    return Math.floor(Math.random() * (max - min + 1)) + min;
//}

//function getRandomColor() {
//    var red = getRandomValue(120, 255);
//    var green = getRandomValue(120, 255);
//    var blue = getRandomValue(120, 255);
//    //var alfa = getRandomValue(0,1);
//    return "rgb(" + red + "," + green + "," + blue + ")";
//};