this.vj2 = this.vj2||{};

(function () {
    "use strict";
    function Model(geometry, material, useVertexTexture){
        THREE.SkinnedMesh.call(this, geometry, material, useVertexTexture);
    }

    var p = Model.prototype = Object.create(THREE.SkinnedMesh.prototype);
    Model.prototype.constructor = Model;

    p.get_bone = function(bone_name){
        var bones = this.skeleton.bones; 
        // TODO a documentação* fala que existe a propriedade .bones, mas ela não funcionou!
        // * http://threejs.org/docs/#Reference/Objects/SkinnedMesh
        for(var i = 0; i < bones.length; i++)
            if(bones[i].name == bone_name)
                return bones[i];
    };

    vj2.Model = Model;
}());
