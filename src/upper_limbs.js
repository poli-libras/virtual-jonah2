function Upper_limbs(shape,arm_bones,direction){
    this.shape = shape;
    this.arm_bones = arm_bones;
    this.direction = direction;
}

Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
};

function Arm_bones(up_arm,lo_arm,wrist,direction){
    this.up_arm = up_arm;
    this.lo_arm = lo_arm;
    this.wrist = wrist;
    this.direction = direction;
    this.json_arm_left_pose={
        ESPACO_NEUTRO:{up:{x:-1.333,y:-1.333,z:-1.333},lo:{x:0,y:-0.1333,z:0},wrist:{x:0,y:0,z:1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:-2,z:0},wrist:{x:0,y:0,z:0} }};
    this.json_arm_right_pose={
        ESPACO_NEUTRO:{up:{x:1.333,y:1.333,z:-1.333},lo:{x:0,y:0.1333,z:0},wrist:{x:0,y:0,z:-1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:2,z:0},wrist:{x:0,y:0,z:0} } };
}


Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    this.update_loc(loc);
    this.update_wrist(yaw,pitch,roll);
};

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
    this.wrist.rotation.x += yaw;
    this.wrist.rotation.y += pitch;
    this.wrist.rotation.z += roll;
};

Arm_bones.prototype.update_loc = function(loc){
    var arm;
    if(this.direction == "RIGHT"){
        arm = this.json_arm_right_pose[loc];
    }else
        if(this.direction == "LEFT")
            arm = this.json_arm_left_pose[loc];
    this.update_arm(arm.up,arm.lo,arm.wrist);
};

Arm_bones.prototype.update_arm = function(up_arm_rot,lo_arm_rot,wrist){
    this.up_arm.rotation.x = up_arm_rot.x;
    this.lo_arm.rotation.x = lo_arm_rot.x;
    this.wrist.rotation.x = wrist.x;
    
    this.up_arm.rotation.y = up_arm_rot.y;
    this.lo_arm.rotation.y = lo_arm_rot.y;
    this.wrist.rotation.y = wrist.y;

    this.up_arm.rotation.z = up_arm_rot.z;
    this.lo_arm.rotation.z = lo_arm_rot.z;
    this.wrist.rotation.z = wrist.z;
};
