function Hand(shape,loc,arm_bones,hand_bone){
    this.shape = shape;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.loc = loc;
    this.arm_bones = arm_bones;
}

Hand.prototype.update_pose = function(){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
};

function Arm_bones(up_arm,lo_arm,wrist){
    this.up_arm = up_arm;
    this.lo_arm = lo_arm;
    this.wrist = wrist;
}

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
    this.wrist.rot.x = yaw;
    this.wrist.rot.y = pitch;
    this.wrist.rot.z = roll;
};


Arm_bones.prototype.update_loc = function(loc){
    if (loc == "ORELHA"){
	var up_arm_rot = {x:1,y:0,z:0};
	var lo_arm_rot = {x:0,y:1,z:0};
	this.update_arm(up_arm_rot,lo_arm_rot);
    }
};

Arm_bones.prototype.update_arm = function(up_arm_rot,lo_arm_rot){
    this.up_arm.rot.x = up_arm_rot.x;
    this.up_arm.rot.y = up_arm_rot.y;
    this.up_arm.rot.z = up_arm_rot.z;
    this.lo_arm.rot.x = lo_arm_rot.x;
    this.lo_arm.rot.y = lo_arm_rot.y;
    this.lo_arm.rot.z = lo_arm_rot.z;
};

