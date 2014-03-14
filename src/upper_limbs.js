function Upper_limbs(hand,arm_bones,direction){
    this.arm_bones = arm_bones;
    this.hand = hand;
    this.direction = direction;
}

Upper_limbs.prototype.set_shape = function(shape){
    this.hand.set_shape(shape);
};

Upper_limbs.prototype.update = function(yaw,pitch,roll,loc){
    this.arm_bones.update_loc(loc);
    this.arm_bones.update_wrist(yaw,pitch,roll);
};


Upper_limbs.prototype.update_wrist = function(yaw,pitch,roll){
    this.arm_bones.update_wrist(yaw,pitch,roll);
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
    this.loc = null;
    this.json_arm_left_pose={
        ESPACO_NEUTRO:{up:{x:-1.333,y:-1.333,z:-1.333},lo:{x:0,y:-0.1333,z:0},wrist:{x:0,y:0,z:1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:-2,z:0},wrist:{x:0,y:0,z:0} }};
    this.json_arm_right_pose={
        ESPACO_NEUTRO:{up:{x:1.333,y:1.333,z:-1.333},lo:{x:0,y:0.1333,z:0},wrist:{x:0,y:0,z:-1.33}},ORELHA:{up:{x:-1.33,y:0,z:0},lo:{x:0,y:2,z:0},wrist:{x:0,y:0,z:0} } };
    this.animation_bones = new Animation_bones([this.up_arm,this.lo_arm,this.wrist],40);
}

Arm_bones.prototype.animation = function(){
    this.animation_bones.animation();
};

Arm_bones.prototype.update_pose = function(yaw,pitch,roll,loc){
    this.update_loc(loc);
    this.update_wrist(yaw,pitch,roll);
};

Arm_bones.prototype.update_wrist = function(yaw,pitch,roll){
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

Arm_bones.prototype.update_loc = function(loc){
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

Arm_bones.prototype.update_arm = function(up_arm_rot,lo_arm_rot,wrist){
    this.up_arm.set_rotation(up_arm_rot.x,up_arm_rot.y,up_arm_rot.z);
    this.lo_arm.set_rotation(lo_arm_rot.x,lo_arm_rot.y,lo_arm_rot.z);
    this.wrist.set_rotation(wrist.x,wrist.y,wrist.z);
};

function Animation_bones(list_bones,animation_time){
    this.list_bones = list_bones;
    this.animation_time = animation_time;
    this.time_now = animation_time;
}

Animation_bones.prototype.animation = function(){
    var time = this.time_now/this.animation_time;
    this.map_animation(time);
    this.run_time(time);
};

Animation_bones.prototype.map_animation = function(time){
    this.list_bones.forEach(function(bone){
        bone.animation(time);
    });
};

Animation_bones.prototype.run_time = function(time){
    if(time > 0){
        this.time_now -=1;
    }else
        this.reset_time();
};

Animation_bones.prototype.reset_time = function(){
    this.time_now = this.animation_time;
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
        this.update_rotation_prev();
};

Bone.prototype.update_rotation_prev = function(){
    this.rotation_prev = this.clone_rotation(this.rotation_next);
};
