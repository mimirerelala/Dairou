function prepareSvg(centerOfScreen, canvasWidth, canvasHeight) {
    var svgWidth = 170,
        svgHeight = 170,
        positionX = centerOfScreen + (canvasWidth / 2) - svgWidth,
        positionY = (canvasHeight / 2) - (svgHeight / 2),
        paper = Raphael(positionX, positionY, svgWidth, svgHeight);

    function createCircle(angleInDegrees) {

        var numberOfCircles = 10,
            r = 40,
            xCenterPoint = svgWidth / 2,
            yCenterPoint = svgHeight / 2,
            cx,
            cy,
            angleInDegrees,
            equalDistanceInDegrees = 360 / numberOfCircles,
            angleInRadians;


        paper.clear();

        for (var i = 0; i < numberOfCircles; i += 1) {
            angleInRadians = angleInDegrees * Math.PI / 180;
            cx = (r * Math.cos(angleInRadians)) + xCenterPoint;
            cy = (r * Math.sin(angleInRadians)) + yCenterPoint;
            angleInDegrees += equalDistanceInDegrees;

            paper.circle(cx, cy, 7);
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
