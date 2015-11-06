/**
 * Created by MLK on 30/10/2015.
 */

this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Movement_segment(direction, magnitude)
    {
        this.direction = direction;
        this.magnitude = magnitude;
    }

    vj2.Movement_segment = Movement_segment;
}());
