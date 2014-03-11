function Hand(thumb, index, middle,ring,pinky,direction){
    this.thumb = thumb;
    this.index = index;
    this.middle = middle;
    this.ring = ring;
    this.pinky = pinky;
    this.direction = direction;
    this.list_fingers = [this.thumb,this.index,this.middle,this.ring,this.pinky];
    this.animation_bones = new Animation_bones(this.list_fingers,40);
}

Hand.prototype.open = function(){
    this.list_fingers.forEach(function(finger){
        finger.open();
    });
};

Hand.prototype.close = function(){
    this.index.close(0.1,0);
    this.middle.close(0,0);
    this.ring.close(-0.1,0);
    this.pinky.close(-0.2,0);
};

Hand.prototype.rock = function(){
    var rotation_value = -3.14/2.5;
    this.index.close(0.1,rotation_value);
    this.middle.close(0,rotation_value);
    this.ring.close(-0.1,rotation_value);
    this.pinky.close(-0.2,rotation_value);
};

Hand.prototype.animation = function(){
    this.animation_bones.animation(); 
};

Hand.prototype.set_shape = function(shape){
    switch(shape)
    {
        case "MAO_FECHADA":
            this.close();
            break;
        case "MAO_ABERTA":
            this.open();
            break;
        case "PEDRA":
            this.rock();
    }
    this.animation_bones.reset_time();
};

function Finger(phalange1,phalange2,phalange3,direction){
    this.phalange1 = new Bone(phalange1);
    this.phalange2 = new Bone(phalange2);
    this.phalange3 = new Bone(phalange3);
    this.phalange_list = [this.phalange1,this.phalange2,this.phalange3];
    this.direction = direction;
}

Finger.prototype.close = function(angle,rotation){
    var rotation_value = rotation;
    var y = angle;
    if (this.direction == "RIGHT"){
        y *= -1;
        rotation_value *= -1;
    }
    this.phalange1.set_rotation(0,y,rotation_value);
    this.phalange2.set_rotation(0,0,rotation_value);
    this.phalange3.set_rotation(0,0,rotation_value);
};

Finger.prototype.open = function(){
    this.phalange_list.forEach(function(phalange){
        phalange.set_rotation(0,0,0);
    });
};

Finger.prototype.animation = function(time){
    this.phalange_list.forEach(function(phalange){
        phalange.animation(time);
    });
};
