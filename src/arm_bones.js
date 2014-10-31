this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Arm_bones(up_arm,lo_arm,wrist,direction){
        this.up_arm = new vj2.Animated_bone(up_arm, 0.1);
        this.lo_arm = new vj2.Animated_bone(lo_arm, 0.1);
        this.wrist = new vj2.Animated_bone(wrist, 0.1);
        this.direction = direction;
    }

    var p = Arm_bones.prototype;

    p.animation = function(dt){
        this.up_arm.update(dt);
        this.lo_arm.update(dt);
        this.wrist.update(dt);
    };

    p.update_pose = function(roll,yaw,pitch,loc){
        this.update_loc(loc);
        this.update_wrist(roll,yaw,pitch);
    };

    p.update_wrist = function(roll,yaw,pitch){
        //if(this.direction == "RIGHT")
        //    this.wrist.update_rotation(-roll,yaw,-pitch);
        //else
        //    if(this.direction == "LEFT")
                this.wrist.update_rotation(roll,yaw,pitch);
        this.up_arm.reset_animation();
        this.lo_arm.reset_animation();
        this.wrist.reset_animation();
    };

    p.update_uparm = function(roll,yaw,pitch){
        //if(this.direction == "RIGHT")
        //    this.wrist.update_rotation(-roll,yaw,-pitch);
        //else
        //    if(this.direction == "LEFT")
                this.up_arm.update_rotation(roll,yaw,pitch);
        this.up_arm.reset_animation();
        this.lo_arm.reset_animation();
        this.wrist.reset_animation();
    };

    p.update_loarm = function(roll,yaw,pitch){
        //if(this.direction == "RIGHT")
        //    this.wrist.update_rotation(-roll,yaw,-pitch);
        //else
        //    if(this.direction == "LEFT")
                this.lo_arm.update_rotation(roll,yaw,pitch);
        this.up_arm.reset_animation();
        this.lo_arm.reset_animation();
        this.wrist.reset_animation();
    };

    p.update_arm = function(up_arm_rot,lo_arm_rot,wrist){
        this.up_arm.set_rotation(up_arm_rot.x,up_arm_rot.y,up_arm_rot.z);
        this.lo_arm.set_rotation(lo_arm_rot.x,lo_arm_rot.y,lo_arm_rot.z);
        this.wrist.set_rotation(wrist.x,wrist.y,wrist.z);
    };

    vj2.Arm_bones = Arm_bones;
}());
