function Upper_limbs(shape,arm_bones){
    this.shape = shape;
    this.arm_bones = arm_bones;
}

Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
};

function Arm_bones(up_arm,lo_arm,wrist){
    this.up_arm = up_arm;
    this.lo_arm = lo_arm;
    this.wrist = wrist;
}

Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    this.update_wrist(yaw,pitch,roll);
    this.update_loc(loc);
};

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
    this.wrist.rotation.x = yaw;
    this.wrist.rotation.y = pitch;
    this.wrist.rotation.z = roll;
};


Arm_bones.prototype.update_loc = function(loc){
    if (loc == "ORELHA"){
	var up_arm_rot = {x:1,y:0,z:0};
	var lo_arm_rot = {x:0,y:1,z:0};
	this.update_arm(up_arm_rot,lo_arm_rot);
    }
};

Arm_bones.prototype.update_arm = function(up_arm_rot,lo_arm_rot){
    this.up_arm.rotation.x = up_arm_rot.x;
    this.up_arm.rotation.y = up_arm_rot.y;
    this.up_arm.rotation.z = up_arm_rot.z;
    this.lo_arm.rotation.x = lo_arm_rot.x;
    this.lo_arm.rotation.y = lo_arm_rot.y;
    this.lo_arm.rotation.z = lo_arm_rot.z;
};
