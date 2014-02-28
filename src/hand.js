function Hand(thumb, index, middle,ring,pinky,direction){
    this.thumb = thumb;
    this.index = index;
    this.middle = middle;
    this.ring = ring;
    this.pinky = pinky;
    this.direction = direction;
    this.animation_time = 40;
    this.animation_time_now = this.animation_time;
}

Hand.prototype.open = function(){
    this.thumb.open();
    this.index.open();
    this.middle.open();
    this.ring.open();
    this.pinky.open();
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
    var time = this.animation_time_now/this.animation_time;
    this.thumb.animation(time);
    this.index.animation(time);
    this.middle.animation(time);
    this.ring.animation(time);
    this.pinky.animation(time);
    if(time === 0){
        this.animation_time_now = this.animation_time;
    }else
        this.animation_time_now -=1;
};

Hand.prototype.reset_animation = function(){
    this.animation_time_now = this.animation_time;
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
    this.reset_animation();
};

function Finger(phalange1,phalange2,phalange3,direction){
    this.phalange1 = new Bone(phalange1);
    this.phalange2 = new Bone(phalange2);
    this.phalange3 = new Bone(phalange3);
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
    this.phalange1.set_rotation(0,0,0);
    this.phalange2.set_rotation(0,0,0);
    this.phalange3.set_rotation(0,0,0);
};

Finger.prototype.animation = function(time){
    this.phalange1.animation(time);
    this.phalange2.animation(time);
    this.phalange3.animation(time);
};
