this.vj2 = this.vj2||{};

(function () {
    "use strict";

    function Arm_bones(up_arm,lo_arm,wrist,direction){
        this.up_arm = new vj2.Bone(up_arm);
        this.lo_arm = new vj2.Bone(lo_arm);
        this.wrist = new vj2.Bone(wrist);
        this.direction = direction;
        this.loc = null;
        this.json_arm_left_pose={
            ESPACO_NEUTRO:{up:{x:-1.333,y:-1.333,z:-1.333},lo:{x:0,y:-0.1333,z:0},wrist:{x:0,y:0,z:1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:-2,z:0},wrist:{x:0,y:0,z:0} }};
        this.json_arm_right_pose={
            ESPACO_NEUTRO:{up:{x:1.333,y:1.333,z:-1.333},lo:{x:0,y:0.1333,z:0},wrist:{x:0,y:0,z:-1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:2,z:0},wrist:{x:0,y:0,z:0} } };
        this.animation_bones = new vj2.Animation_bones([this.up_arm,this.lo_arm,this.wrist],1.5);
    }

    var p = Arm_bones.prototype;

    p.animation = function(dt){
        this.animation_bones.animation(dt);
    };

    p.update_pose = function(yaw,pitch,roll,loc){
        this.update_loc(loc);
        this.update_wrist(yaw,pitch,roll);
    };

    p.update_wrist = function(yaw,pitch,roll){
        var x,y;
        var z = roll;
        if(this.loc == "ORELHA"){
            x = yaw;
            y = pitch;
        }else{
            y = yaw;
            x = -pitch;
        }
        if(this.direction == "RIGHT")
            this.wrist.update_rotation(-x,y,-z);
        else
            if(this.direction == "LEFT")
                this.wrist.update_rotation(x,y,z);
        this.animation_bones.reset_time();
    };

    p.update_loc = function(loc){
        this.loc = loc;
        var arm;
        if(this.direction == "RIGHT"){
            arm = this.json_arm_right_pose[this.loc];
        }else
            if(this.direction == "LEFT")
                arm = this.json_arm_left_pose[this.loc];
        this.update_arm(arm.up,arm.lo,arm.wrist);
        this.animation_bones.reset_time();
    };

    p.update_arm = function(up_arm_rot,lo_arm_rot,wrist){
        this.up_arm.set_rotation(up_arm_rot.x,up_arm_rot.y,up_arm_rot.z);
        this.lo_arm.set_rotation(lo_arm_rot.x,lo_arm_rot.y,lo_arm_rot.z);
        this.wrist.set_rotation(wrist.x,wrist.y,wrist.z);
    };

    vj2.Arm_bones = Arm_bones;
}());
