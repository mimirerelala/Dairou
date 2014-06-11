
function prepareSvg(centerOfScreen, canvasWidth, canvasHeight) {
    var svgWidth = 300,
        svgHeight = 300,
        positionX = centerOfScreen + (canvasWidth / 2), // - svgWidth,
        positionY = (canvasHeight / 2), // - (svgHeight/2 );
        paper = Raphael(0, 0, svgWidth, svgHeight);

    function createCircle(angleInDegrees) {

        var r = 100,
            xCenterPoint = svgWidth / 2,
            yCenterPoint = svgHeight / 2,
            x,
            y,
            angleInDegrees,
            angleInRadians,
            letterPressWord = 'Letter Press ',
            equalDistanceInDegrees = 360 / letterPressWord.length;

        paper.clear();


        for (var i = 0; i < letterPressWord.length; i += 1) {
            angleInRadians = angleInDegrees * Math.PI / 180;
            x = (r * Math.cos(angleInRadians)) + xCenterPoint;
            y = (r * Math.sin(angleInRadians)) + yCenterPoint;
            angleInDegrees += equalDistanceInDegrees;

            paper.setStart();
            var translate = 't' + (x - 50) + ' ' + (y - 30)

            var shadow = paper.path('M 50 30 L 65,25 Q 60,35 80,50 Q 70, 40 45, 60 L  50,30');
            shadow.attr({
                stroke: "none",
                fill: "#333",
            }).scale(1.2, 1.2, [30], [20]).blur(2);
            shadow.transform(translate);

            var colorStick // = getRandomColor();
            var firstIndexOfLetter = letterPressWord.indexOf('Letter');
            var lastIndexOfLetter = firstIndexOfLetter + 'Letter'.length;
            var firstIndexOfPress = letterPressWord.indexOf('Press');
            var lastIndexOfPress = firstIndexOfPress + 'Press'.length;

            if (firstIndexOfLetter <= i && i < lastIndexOfLetter) {
                colorStick = 'rgb(255, 67, 47)';
            } else if (firstIndexOfPress <= i && i < lastIndexOfPress) {
                colorStick = 'rgb(0, 162, 255)';
            } else {
                colorStick = 'rgb(225, 225, 225)';
            }

            var stick = paper.path('M 30 20 L 65,20 Q 60,35 80,50 Q 70, 40 40, 60 Q 25,40 30,20');
            stick.attr({
                stroke: 'none',
                fill: colorStick,
            }).scale(1.2, 1.2, [30], [20])

            stick.transform(translate);

            var char = letterPressWord[i];

            var text = paper.text(48, 35, char);
            text.attr({
                fill: 'rgb(96, 96, 96)',
                'font-size': '25px',
                'font-family': 'Arial'
            }).rotate(-20, 0, 0);
            text.transform(translate);
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