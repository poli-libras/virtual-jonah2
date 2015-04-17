this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Animated_bone(model, bone_name){
        this.bone_name = bone_name;
        this.model = model;
        // Reference to the quaternion of the interest bone in the
        this.quaternion = this.model.get_bone(bone_name).quaternion;

        // Quaternions used at interpolation to hold the target
        // and the previous position
        this.quaternion_next = this.quaternion.clone();
        this.quaternion_prev = this.quaternion.clone();

        this.duration = 0;
        this.remaining_time = 0;
        this.done = true;

        // Helpers used to avoid object instantiation at the loop 
        this.euler_helper = new THREE.Euler(0,0,0);
        this.quaternion_helper = new THREE.Quaternion(0,0,0);
    }

    var p = Animated_bone.prototype;

    p.euler_increment = function(x,y,z,duration){
        this.euler_helper.set(x,y,z);
        this.quaternion_helper.setFromEuler(this.euler_helper);
        this.increment(this.quaternion_helper.x, this.quaternion_helper.y,
                this.quaternion_helper.z, this.quaternion_helper.w, duration);
    };

    p.euler_animate_to = function(x,y,z,duration){
        this.euler_helper.set(x,y,z);
        this.quaternion_helper.setFromEuler(this.euler_helper);
        this.animate_to(this.quaternion_helper.x, this.quaternion_helper.y,
                this.quaternion_helper.z, this.quaternion_helper.w, duration);
    };

    p.euler_set = function(x,y,z){
        this.euler_helper.set(x,y,z);
        this.quaternion_helper.setFromEuler(this.euler_helper);
        this.set(this.quaternion_helper.x, this.quaternion_helper.y,
                this.quaternion_helper.z, this.quaternion_helper.w);
    };

    p.increment = function(x,y,z,w,duration){
        this.quaternion_next.multiply(new THREE.Quaternion(x,y,z,w));
        this.animate_to(this.quaternion_next.x, this.quaternion_next.y,
                this.quaternion_next.z, this.quaternion_next.w, duration);
    };

    p.animate_to = function(x,y,z,w,duration){
        if(duration === undefined || duration === 0)
        {
            this.set(x,y,z,w);
        }
        else
        {
            this.quaternion_prev.copy(this.quaternion);
            this.quaternion_next.set(x,y,z,w);
            this.duration = duration;
            this.remaining_time = this.duration;
            this.done = false;
        }
    };

    p.set = function(x,y,z,w){
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
        if(!this.done)
        {
            THREE.Quaternion.slerp(this.quaternion_next, this.quaternion_prev,
                    this.quaternion, factor);
            if(factor === 0) this.end_animation();
        }
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
