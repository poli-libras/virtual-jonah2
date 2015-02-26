this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Animated_bone(quaternion){
        this.quaternion = quaternion;
        this.quaternion_next = quaternion.clone();
        this.quaternion_prev = quaternion.clone();
        this.duration = 0;
        this.remaining_time = 0;
        this.done = true;

        // Helpers used exclusively in the legacy euler angles methods
        this.eulerHelper = new THREE.Euler(0,0,0);
        this.quaternionHelper = new THREE.Quaternion(0,0,0);
    }

    var p = Animated_bone.prototype;

    // Euler angles based animation
    // used on debug/edit mode as euler angles are more intuitive and rotation is iterative
    // [
    p.euler_animate_to = function(x,y,z,duration){
        this.eulerHelper.set(x,y,z);
        this.quaternionHelper.setFromEuler(this.eulerHelper);
        this.quaternion_next.multiply(this.quaternionHelper);

        this.duration = duration;
        this.remaining_time = this.duration;
        this.done = false;
    };
    // ]

    p.animate_to = function(x,y,z,w,duration){
        this.quaternion_prev.copy(this.quaternion);
        this.quaternion_next.set(x,y,z,w);
        this.duration = duration;
        this.remaining_time = this.duration;
        this.done = false;
    };

    p.set_quaternion = function(x,y,z,w){
        this.quaternion.set(x,y,z,w);
        this.quaternion_next.set(x,y,z,w);
        this.quaternion_prev.set(x,y,z,w);
        this.end_animation();
    };

    p.update = function(dt){
        this.interpolate(this.remaining_time/this.duration);
        this.remaining_time -= Math.min(dt, this.remaining_time);
    };

    p.interpolate = function(factor){
        THREE.Quaternion.slerp(this.quaternion_next, this.quaternion_prev,
                this.quaternion, factor);
        if(factor === 0) this.end_animation();
    };

    p.end_animation = function(){
        this.quaternion_prev.copy(this.quaternion_next);
        this.done = true;
        this.remaining_time = 0;
    };

    p.reset_animation = function(){
        this.remaining_time = this.duration;
    };

    vj2.Animated_bone = Animated_bone;
}());
