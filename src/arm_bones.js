this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Arm_bones(up_arm,lo_arm,wrist,direction){
        this.up_arm = new vj2.Animated_bone(up_arm);
        this.lo_arm = new vj2.Animated_bone(lo_arm);
        this.wrist = new vj2.Animated_bone(wrist);
        this.direction = direction;
    }

    var p = Arm_bones.prototype;

    p.update = function(dt){
        this.up_arm.update(dt);
        this.lo_arm.update(dt);
        this.wrist.update(dt);
    };

    p.update_wrist = function(roll,yaw,pitch){
        this.wrist.euler_animate_to(roll,yaw,pitch,0.1);
    };

    p.update_uparm = function(roll,yaw,pitch){
        this.up_arm.euler_animate_to(roll,yaw,pitch,0.1);
    };

    p.update_loarm = function(roll,yaw,pitch){
        this.lo_arm.euler_animate_to(roll,yaw,pitch,0.1);
    };

    vj2.Arm_bones = Arm_bones;
}());
