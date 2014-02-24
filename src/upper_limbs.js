function Upper_limbs(hand,arm_bones,direction){
    this.arm_bones = arm_bones;
    this.hand = hand;
    this.direction = direction;
}

Upper_limbs.prototype.set_shape = function(shape){
    this.hand.set_shape(shape);
};

Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
    this.arm_bones.update_pose(yaw,pitch,roll,loc);
};

Upper_limbs.prototype.animation = function(){
    this.arm_bones.animation();
    this.hand.animation();
};

function Arm_bones(up_arm,lo_arm,wrist,direction){
    this.up_arm = new Bone(up_arm);
    this.lo_arm = new Bone(lo_arm);
    this.wrist = new Bone(wrist);
    this.direction = direction;
    this.json_arm_left_pose={
        ESPACO_NEUTRO:{up:{x:-1.333,y:-1.333,z:-1.333},lo:{x:0,y:-0.1333,z:0},wrist:{x:0,y:0,z:1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:-2,z:0},wrist:{x:0,y:0,z:0} }};
    this.json_arm_right_pose={
        ESPACO_NEUTRO:{up:{x:1.333,y:1.333,z:-1.333},lo:{x:0,y:0.1333,z:0},wrist:{x:0,y:0,z:-1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:2,z:0},wrist:{x:0,y:0,z:0} } };
    this.animation_time = 40;
    this.animation_time_now = this.animation_time;
}

Arm_bones.prototype.animation = function(){
    var time = this.animation_time_now/this.animation_time;
    this.up_arm.animation(time);
    this.lo_arm.animation(time);
    this.wrist.animation(time);
    if(time === 0){
        this.animation_time_now = this.animation_time;
    }else
        this.animation_time_now -=1;
};

Arm_bones.prototype.animation_reset_time = function(){
    this.animation_time_now = this.animation_time;
};

Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    this.update_loc(loc);
    this.update_wrist(yaw,pitch,roll);
    this.animation_reset_time();
};

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
    if(this.direction == "RIGHT")
        this.wrist.update_rotation(yaw,pitch,-roll);
    else
        if(this.direction == "LEFT")
            this.wrist.update_rotation(yaw,pitch,roll);
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
    this.up_arm.set_rotation(up_arm_rot.x,up_arm_rot.y,up_arm_rot.z);
    this.lo_arm.set_rotation(lo_arm_rot.x,lo_arm_rot.y,lo_arm_rot.z);
    this.wrist.set_rotation(wrist.x,wrist.y,wrist.z);
};

function Bone(rotation){
    this.rotation = rotation;
    this.rotation_next = this.clone_rotation(rotation);
    this.rotation_prev = this.clone_rotation(rotation);
}

Bone.prototype.clone_rotation = function(rotation){
    var clone = new THREE.Euler(0,0,0,"XYZ");
    var quaternion_rotation = new THREE.Quaternion().setFromEuler(rotation);
    clone.copy(rotation);
    clone._quaternion = quaternion_rotation;
    clone._quaternion._euler = clone;
    return clone;
};

Bone.prototype.update_rotation = function(x,y,z){
    this.rotation_next.x += x;
    this.rotation_next.y += y;
    this.rotation_next.z += z;
};

Bone.prototype.set_rotation = function(x,y,z){
    this.rotation_next.x = x;
    this.rotation_next.y = y;
    this.rotation_next.z = z;
};

Bone.prototype.animation = function(time){
    THREE.Quaternion.slerp(this.rotation_next._quaternion,this.rotation_prev._quaternion,this.rotation._quaternion,time);
    if(time === 0)
        this.end_animation();
};

Bone.prototype.end_animation = function(){
    this.rotation_prev = this.clone_rotation(this.rotation_next);
};
