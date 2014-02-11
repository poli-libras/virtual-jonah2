function Hand(shape,loc,arm_bone,hand_bone){
    this.shape = shape;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.loc = loc;
    this.arm_bones = arm_bones;
    this.hand_bones = hand_bones;
}

Hand.prototype.update_pose = function(){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
    this.hand_bones.update_pose(shape);
};

function Arm_bones(up_arm,lo_arm,wrist){
    this.up_arm = up_arm;
    this.lo_arm = lo_arm;
    this.wrist = wrist;
}

Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    up_arm.rot._quartenion.x = 1;
    up_arm.rot._quartenion.y = 0;
    up_arm.rot._quartenion.z = 0;
};

function Hand_bones(finger1,finger2,finger3,finger4,finger5){
    this.finger1 = finger1;
    this.finger2 = finger2;
    this.finger3 = finger3;
    this.finger4 = finger4;
    this.finger5 = finger5;
}

