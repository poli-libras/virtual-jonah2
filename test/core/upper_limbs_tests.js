var up_arm,lo_arm,wrist;

module("module upper_limbs",{
setup: function() {
    up_arm = new THREE.Euler(0,0,0,"XYZ");
    lo_arm = new THREE.Euler(0,0,0,"XYZ");
    wrist =  new THREE.Euler(0,0,0,"XYZ");
    bone_up_arm = new Bone(up_arm);
    direction = "LEFT";
}});

test("should_clone_a_rotation", function(){
    var clone = bone_up_arm.clone_rotation(up_arm);
    deepEqual(bone_up_arm.rotation_next.toArray(),clone.toArray());
});


test("should_clone_a_rotation", function(){
    var clone = bone_up_arm.clone_rotation(up_arm);
    clone.x = 1;
    deepEqual(bone_up_arm.rotation_next.toArray(),[0,0,0,"XYZ"]);
    deepEqual(clone.toArray(),[1,0,0,"XYZ"]);
});

test("should_set_rotation_bone", function(){
    bone_up_arm.set_rotation(1,1,1);
    deepEqual(bone_up_arm.rotation_next.toArray(),[1,1,1,"XYZ"]);
});


test("should_update_rotation_bone", function(){
    bone_up_arm.set_rotation(1,1,1);
    bone_up_arm.update_rotation(1,1,1);
    deepEqual(bone_up_arm.rotation_next.toArray(),[2,2,2,"XYZ"]);
});

test("should_update_wrist", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_wrist(90,90,90);
    deepEqual(arm_bones.wrist.rotation_next.toArray(),[90,90,90,"XYZ"]); 
});

test("should_update_location", function(){
    var arm_bones = new Arm_bones(up_arm,lo_arm,wrist,direction);
    arm_bones.update_loc("ORELHA");
    deepEqual(arm_bones.up_arm.rotation_next.toArray(),[-1.33,0,0,"XYZ"]); 
    deepEqual(arm_bones.lo_arm.rotation_next.toArray(),[0,-2,0,"XYZ"]); 
});
