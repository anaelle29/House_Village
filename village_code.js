// https://playground.babylonjs.com/

const createScene =  () => {

    // SCENE
    const scene = new BABYLON.Scene(engine);

    // CAMERA
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    // LIGHT
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    

    // GROUND
    const ground = buildGround();


    // DETACHED_HOUSE
    const detached_house = buildHouse(2);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;

    // SEMI_HOUSE
    const semi_house = buildHouse(4);
    semi_house .rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;

    // PLACES
    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, 0, 0 ]);
    places.push([2, -Math.PI / 16, 5, 0 ]);
    places.push([1, -Math.PI / 2, 10, 5 ]);
    places.push([2, -Math.PI / 16, 15, 10 ]);
    places.push([1, -Math.PI / 2, 20, 15 ]);
    places.push([2, -Math.PI / 16, 25, 20 ]);
    places.push([2, -Math.PI / 3, 30, 25 ]);
    places.push([2, 15 * Math.PI / 16, 35, 30]);
    places.push([1, 15 * Math.PI / 16, 40, 35 ]);
    places.push([2, 15 * Math.PI / 16, 45, 40 ]);

    places.push([1, -Math.PI / 16, 0, 0 ]);
    places.push([2, -Math.PI / 16, -5, 0 ]);
    places.push([1, -Math.PI / 2, -10, 5 ]);
    places.push([2, -Math.PI / 16, -15, 10 ]);
    places.push([1, -Math.PI / 2, -20, 15 ]);
    places.push([2, -Math.PI / 16, -25, 20 ]);
    places.push([2, -Math.PI / 3, -30, 25 ]);
    places.push([2, 15 * Math.PI / 16, -35, 30]);
    places.push([1, 15 * Math.PI / 16, -40, 35 ]);
    places.push([2, 15 * Math.PI / 16, -45, 40 ]);


    places.push([1, -Math.PI / 16, 0, 0 ]);
    places.push([2, -Math.PI / 16, 5, 0 ]);
    places.push([1, -Math.PI / 2, 10, -5 ]);
    places.push([2, -Math.PI / 16, 15, -10 ]);
    places.push([1, -Math.PI / 2, 20, -15 ]);
    places.push([2, -Math.PI / 16, 25, -20 ]);
    places.push([2, -Math.PI / 3, 30, -25 ]);
    places.push([2, 15 * Math.PI / 16, 35, -30]);
    places.push([1, 15 * Math.PI / 16, 40, -35 ]);
    places.push([2, 15 * Math.PI / 16, 45, -40 ]);

    places.push([1, -Math.PI / 16, 0, 0 ]);
    places.push([2, -Math.PI / 16, -5, 0 ]);
    places.push([1, -Math.PI / 2, -10, -5 ]);
    places.push([2, -Math.PI / 16, -15, -10 ]);
    places.push([1, -Math.PI / 2, -20, -15 ]);
    places.push([2, -Math.PI / 16, -25, -20 ]);
    places.push([2, -Math.PI / 3, -30, -25 ]);
    places.push([2, 15 * Math.PI / 16, -35, -30]);
    places.push([1, 15 * Math.PI / 16, -40, -35 ]);
    places.push([2, 15 * Math.PI / 16, -45, -40 ]);

    places.push([1, -Math.PI / 16, 0, 45 ]);
    places.push([2, -Math.PI / 16, 45, 0 ]);
    places.push([1, -Math.PI / 2, 30, 0 ]);
    places.push([2, -Math.PI / 16, 0, 30 ]);
    places.push([1, -Math.PI / 2, 35, 0 ]);
    places.push([2, -Math.PI / 16, 0, 35 ]);
    places.push([2, -Math.PI / 3, 25, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, 25]);
    places.push([1, 15 * Math.PI / 16, 20, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, 20 ]);
    places.push([1, 5 * Math.PI / 4, 15, 0 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0, 15 ]);

    places.push([1, -Math.PI / 16, 0, -45 ]);
    places.push([2, -Math.PI / 16, 45, 0 ]);
    places.push([1, -Math.PI / 2, 30, 0 ]);
    places.push([2, -Math.PI / 16, 0, -30 ]);
    places.push([1, -Math.PI / 2, 35, 0 ]);
    places.push([2, -Math.PI / 16, 0, -35 ]);
    places.push([2, -Math.PI / 3, 25, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, -25]);
    places.push([1, 15 * Math.PI / 16, 20, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, -20 ]);
    places.push([1, 5 * Math.PI / 4, 15, 0 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0, -15 ]);

    
    places.push([1, -Math.PI / 16, 0, -45 ]);
    places.push([2, -Math.PI / 16, -45, 0 ]);
    places.push([1, -Math.PI / 2, -30, 0 ]);
    places.push([2, -Math.PI / 16, 0, -30 ]);
    places.push([1, -Math.PI / 2, -35, 0 ]);
    places.push([2, -Math.PI / 16, 0, -35 ]);
    places.push([2, -Math.PI / 3, -25, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, -25]);
    places.push([1, 15 * Math.PI / 16, -20, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, -20 ]);
    places.push([1, 5 * Math.PI / 4, -15, 0 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0, -15 ]);

    places.push([1, 15 * Math.PI / 16, 40, 45 ]);
    places.push([2, 15 * Math.PI / 16, -40, 45 ]);
    places.push([2, 15 * Math.PI / 16, -40, -45 ]);
    places.push([2, 15 * Math.PI / 16, 40, -45 ]);

    places.push([1, 15 * Math.PI / 16, 30, 45 ]);
    places.push([2, 15 * Math.PI / 16, -30, 45 ]);
    places.push([2, 15 * Math.PI / 16, -30, -45 ]);
    places.push([2, 15 * Math.PI / 16, 30, -45 ]);
    
    // VILLAGE 
    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
            houses[i] = detached_house.createInstance("house" + i);
        }
        else {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }
    






    return scene;
}

/******Build Functions***********/

// GROUND
const buildGround = () => {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:100, height:100});
    ground.material = groundMat;
}

// HOUSE
const buildHouse = (width) => {
    const box = buildBox(width);
    const roof = buildRoof(width);

    return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}


// GROUND
const buildBox = (width) => {
    //texture
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    if (width == 2) {
       boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png") 
    }
    else {
        boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");   
    }

    //options parameter to set different images on each side
    const faceUV = [];
    if (width == 2) {
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
    }
    else {
        faceUV[0] = new BABYLON.Vector4(-0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(-0.5, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    }
    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true});
    box.material = boxMat;
    box.position.y = 0.5;

    return box;
}

// ROOF
const buildRoof = (width) => {
    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.scaling.y = width;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    return roof;
}
