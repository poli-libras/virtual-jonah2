var up_arm,lo_arm,wrist;

module("module upper_limbs",{
setup: function() {
    up_arm = new THREE.Euler(0,0,0,"XYZ");
    lo_arm = new THREE.Euler(0,0,0,"XYZ");
    wrist =  new THREE.Euler(0,0,0,"XYZ");
    bone_up_arm = new vj2.Bone(up_arm);
    direction = "LEFT";
}});
