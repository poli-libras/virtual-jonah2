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
    this.index.close(this.direction);
    this.middle.close(this.direction);
    this.ring.close(this.direction);
    this.pinky.close(this.direction);
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

Hand.prototype.set_shape = function(shape){
    if(shape == "MAO_FECHADA"){
        this.close();
    }
    else
        if(shape == "MAO_ABERTA"){
            this.open();
    }
};

function Finger(phalange1,phalange2,phalange3){
    this.phalange1 = new Bone(phalange1);
    this.phalange2 = new Bone(phalange2);
    this.phalange3 = new Bone(phalange3);
}

Finger.prototype.close = function(direction){
    var rotation_value = -3.14/2.5;
    if (direction == "RIGHT")
        rotation_value *= -1;
    this.phalange1.set_rotation(0,0,rotation_value);
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
