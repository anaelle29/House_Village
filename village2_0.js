const createScene =  () => {

    // SCENE
    const scene = new BABYLON.Scene(engine);

    // CAMERA
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    // LIGHT
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    light.intensity = 0.2

    
    
    new BABYLON.AxesViewer(scene, 5);

    const localAxes = new BABYLON.AxesViewer(scene, 1);


    
    // GROUND

    //Create Village ground
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:50});
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/valleygrass.png");
    
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", {width:300, height:300, subdivisions: 20, minHeight:0, maxHeight: 100});
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
    
    /*const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", {width:190, height:190, subdivisions: 20, minHeight:0, maxHeight: 30});
    
    largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/valleygrass.png");

    largeGround.material = largeGroundMat;*/



    // SKY



    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;




    //TREES


    const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "https://doc.babylonjs.com/img/getstarted/palmtree.png", 2000, {width: 1000, height: 1024}, scene);

    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (-30);
        tree.position.z = Math.random() * 20 + 8;
        tree.position.y = 0.5;
    }

    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (25) + 7;
        tree.position.z = Math.random() * -35  + 8;
        tree.position.y = 0.5;
    }
    



    // FOUNTAIN

    const fountainProfile = [
	new BABYLON.Vector3(0, 0, 0),
	new BABYLON.Vector3(0.5, 0, 0),
	new BABYLON.Vector3(0.5, 0.2, 0),
	new BABYLON.Vector3(0.4, 0.2, 0),
	new BABYLON.Vector3(0.4, 0.05, 0),
	new BABYLON.Vector3(0.05, 0.1, 0),
	new BABYLON.Vector3(0.05, 0.8, 0),
	new BABYLON.Vector3(0.15, 0.9, 0)
    ];

    const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    fountain.position = new BABYLON.Vector3(-4, 0, -6);


    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = new BABYLON.Vector3(-4, 0.8, -6); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.6;
    particleSystem.updateSpeed = 0.01;

    // Start the particle system
    particleSystem.start();

    let switched = false;  //on off flag

    scene.onPointerObservable.add((pointerInfo) => {      		
        switch (pointerInfo.type) {
		    case BABYLON.PointerEventTypes.POINTERDOWN:
			    if(pointerInfo.pickInfo.hit) {
                    pointerDown(pointerInfo.pickInfo.pickedMesh)
                }
		    break;
        }
    });

    
    const pointerDown = (mesh) => {
    if (mesh === fountain) { //check that the picked mesh is the fountain
        switched = !switched;  //toggle switch
        if(switched) {
            particleSystem.start();
        }
        else {
            particleSystem.stop();
        }
    }
}





    // DETACHED_HOUSE




    const detached_house = buildHouse(2);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -10;
    detached_house.position.z = 10;




    // SEMI_HOUSE




    const semi_house = buildHouse(4);
    semi_house .rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;




    // PLACES //





    const places = []; //each entry is an array [house type, rotation, x, z]
   
    places.push([2, -Math.PI / 16, 15, 10 ]);
    places.push([1, -Math.PI / 2, 20, 15 ]);
    places.push([2, -Math.PI / 16, 25, 20 ]);
    places.push([2, -Math.PI / 3, 30, 25 ]);




    places.push([2, -Math.PI / 16, -5, 0 ]);
    places.push([1, -Math.PI / 2, -10, 6 ]);
    places.push([2, -Math.PI / 16, -15, 10 ]);
    places.push([1, -Math.PI / 2, -20, 15 ]);
    places.push([2, -Math.PI / 16, -25, 20 ]);
    places.push([2, -Math.PI / 3, -30, 25 ]);



  
    places.push([2, -Math.PI / 16, 10, 0 ]);

    places.push([1, -Math.PI / 2, 10, -5 ]);
    places.push([2, -Math.PI / 16, 15, -10 ]);
    places.push([1, -Math.PI / 2, 20, -15 ]);
    places.push([2, -Math.PI / 16, 25, -20 ]);


    places.push([2, -Math.PI / 16, -5, 0 ]);
    places.push([1, -Math.PI / 2, -10, -5 ]);
    places.push([2, -Math.PI / 16, -15, -10 ]);
    places.push([1, -Math.PI / 2, -20, -15 ]);
    places.push([2, -Math.PI / 16, -25, -20 ]);
    places.push([2, -Math.PI / 3, -30, -25 ]);




    places.push([1, -Math.PI / 2, 30, 0 ]);
    places.push([2, -Math.PI / 16, 0, 30 ]);

    places.push([2, -Math.PI / 3, 25, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, 25]);
    places.push([1, 15 * Math.PI / 16, 20, 0 ]);



    places.push([1, -Math.PI / 2, 30, 0 ]);
    places.push([2, -Math.PI / 16, 0, -30 ]);

    places.push([2, -Math.PI / 3, 25, 0 ]);
    places.push([2, 15 * Math.PI / 16, 0, -25]);
    places.push([1, 15 * Math.PI / 16, 20, 0 ]);


    

    places.push([1, -Math.PI / 2, -30, 0 ]);
    places.push([2, -Math.PI / 16, 0, -30 ]);

    places.push([2, -Math.PI / 3, -25, -6 ]);
    places.push([2, 15 * Math.PI / 16, 0, -25]);
    places.push([1, 15 * Math.PI / 16, -20, 3 ]);
    places.push([2, 15 * Math.PI / 16, 0, -20 ]);
    places.push([1, 5 * Math.PI / 4, -15, 4]);
    places.push([1, Math.PI + Math.PI / 2.5, 0, -15 ]);

    

    



    // VILLAGE //



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




    

    




    /////CAR/////





    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]

    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }

    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    //back formed automatically

    //face UVs
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

    //material
    const carMat = new BABYLON.StandardMaterial("carMat");
    carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");

    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true});
    car.material = carMat;
    car.rotation.x = -Math.PI / 2;
    car.rotation.y = -Math.PI / 2;
    car.rotation.z = (-Math.PI / 2)*2;
    car.scaling.z = 1.6
    //car.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);
    car.position.y = 0.25
    car.position.x = 6;
    car.position.z = -60;



    car2 = car.clone("car2");
  
    car2.position.y = 0.25
    car2.position.x = 7;
    car2.position.z = 60;
    car2.rotation.z = (-Math.PI / 2)*4;


    /////ROUES/////




    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5); 
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    const wheelMaterial = new BABYLON.StandardMaterial("WheelMaterial");
    wheelMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");

    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV : wheelUV, wrap : true})
    wheelRB.parent = car;
  
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;
    wheelRB.material = wheelMaterial;

    wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;

    wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;

    wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;

    // car2

    const wheelRB2 = BABYLON.MeshBuilder.CreateCylinder("wheelRB2", {diameter: 0.125, height: 0.05, faceUV : wheelUV, wrap : true})
  
    wheelRB2.parent = car2;
    wheelRB2.position.z = -0.1;
    wheelRB2.position.x = -0.2;
    wheelRB2.position.y = 0.035;
    wheelRB2.material = wheelMaterial;

    wheelRF2 = wheelRB2.clone("wheelRF2");
    wheelRF2.position.x = 0.1;

    wheelLB2 = wheelRB2.clone("wheelLB2");
    wheelLB2.position.y = -0.2 - 0.035;

    wheelLF2 = wheelRF2.clone("wheelLF2");
    wheelLF2.position.y = -0.2 - 0.035;



    // ANIMATION WHEELS //




    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const wheelKeys = [];
    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
        frame: 0,
        value: 0
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
        frame: 30,
        value: 2 * Math.PI
    });

    //set the keys
    animWheel.setKeys(wheelKeys);

    //Link this animation to the right back wheel
    wheelRB.animations = [];
    wheelRB.animations.push(animWheel);

    wheelRF.animations = [];
    wheelRF.animations.push(animWheel);

    wheelLB.animations = [];
    wheelLB.animations.push(animWheel);

    wheelLF.animations = [];
    wheelLF.animations.push(animWheel);


    wheelRB2.animations = [];
    wheelRB2.animations.push(animWheel);

    wheelRF2.animations = [];
    wheelRF2.animations.push(animWheel);

    wheelLB2.animations = [];
    wheelLB2.animations.push(animWheel);

    wheelLF2.animations = [];
    wheelLF2.animations.push(animWheel);

    //Begin animation - object to animate, first frame, last frame and loop if true
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);


    scene.beginAnimation(wheelRB2, 0, 30, true);
    scene.beginAnimation(wheelRF2, 0, 30, true);
    scene.beginAnimation(wheelLB2, 0, 30, true);
    scene.beginAnimation(wheelLF2, 0, 30, true);


    // ANIMATION CAR //




    const animCar = new BABYLON.Animation("carAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const carKeys = [];
    //At the animation key 0, the value of rotation.y is 0
    carKeys.push({
        frame: -100,
        value: 60
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    carKeys.push({
        frame: 200,
        value: -40
    });


    //set the keys
    animCar.setKeys(carKeys);


    car.animations = [];
    car.animations.push(animCar);

    car2.animations = [];
    car2.animations.push(animCar);


    
    scene.beginAnimation(car, -20, 200, true);
    scene.beginAnimation(car2, -20, -50, true);

    

    


    // PERSONNAGE

    const walk = function (turn, dist){
        this.turn = turn;
        this.dist = dist;
    }

    const track = [];
    track.push(new walk(-84, 7));
    track.push(new walk(-98, 13));
    track.push(new walk(-98, 20));
    track.push(new walk(80, 7));
    track.push(new walk(0, 40));
    track.push(new walk(-72, 33.2));
    track.push(new walk(42, 37.5));
    track.push(new walk(-98, 20));
    track.push(new walk(0, 47))
    track.push(new walk(-84, 7));
    track.push(new walk(-98, 13));
    track.push(new walk(-98, 20));
    track.push(new walk(80, 7));
  


    // Dude
    BABYLON.SceneLoader.ImportMeshAsync("him", "/scenes/Dude/", "Dude.babylon", scene).then((result) => {
        var dude = result.meshes[0];

        dude2 = dude.clone("dude2")
        dude2.position.x = 0;
        dude2.position.y = 0;
        dude2.position.z = -5;
        dude2.scaling = new BABYLON.Vector3(0.006, 0.006, 0.006);


        dude3 = dude.clone("dude2")
        dude3.position.x = 23;
        dude3.position.y = 0;
        dude3.position.z = -23;
        dude3.scaling = new BABYLON.Vector3(0.006, 0.006, 0.006);
 
        dude.scaling = new BABYLON.Vector3(0.006, 0.006, 0.006);
            
        dude.position = new BABYLON.Vector3(-19, 0, -5);
        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
        const startRotation = dude.rotationQuaternion.clone();    
            
        scene.beginAnimation(result.skeletons[0], 0, 100, true, 2.0);

        let distance = 0;
        let step = 0.010;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
		    dude.movePOV(0, 0, step);
            dude2.movePOV(0, 0, step)
            dude3.movePOV(0, 0, step)
            distance += step;
              
            if (distance > track[p].dist) {
                    
                dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude.position = new BABYLON.Vector3(-6, 0, 0);
                    dude.rotationQuaternion = startRotation.clone();

                }

                dude2.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude2.position = new BABYLON.Vector3(-6, 0, 0);
                    dude2.rotationQuaternion = startRotation.clone();
                }

                dude3.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude3.position = new BABYLON.Vector3(-6, 0, 0);
                    dude3.rotationQuaternion = startRotation.clone();
                }

            }
			
        })
    });



    // LAMP //



    const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -10, 0), Math.PI, 1, scene);
    lampLight.diffuse = BABYLON.Color3.Yellow();

	//shape to extrude
	const lampShape = [];
    for(let i = 0; i < 20; i++) {
        lampShape.push(new BABYLON.Vector3(Math.cos(i * Math.PI / 10), Math.sin(i * Math.PI / 10), 0));
    }
	lampShape.push(lampShape[0]); //close shape

	//extrusion path
    const lampPath = [];
	lampPath.push(new BABYLON.Vector3(0, 0, 0));
	lampPath.push(new BABYLON.Vector3(0, 10, 0));
    for(let i = 0; i < 20; i++) {
        lampPath.push(new BABYLON.Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
    }
    lampPath.push(new BABYLON.Vector3(3, 11, 0));

    const yellowMat = new BABYLON.StandardMaterial("yellowMat");
    yellowMat.emissiveColor = BABYLON.Color3.Yellow();

	//extrude lamp
	const lamp = BABYLON.MeshBuilder.ExtrudeShape("lamp", {cap: BABYLON.Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5});
	lamp.scaling = new BABYLON.Vector3(0.13, 0.13, 0.13)
    lamp.position = new BABYLON.Vector3(4, 0 ,4)
    //add bulb
    const bulb = BABYLON.MeshBuilder.CreateSphere("bulb", {diameterX: 1.5, diameterZ: 0.8});
    
    bulb.material = yellowMat;
    bulb.parent = lamp;
    bulb.position.x = 2;
    bulb.position.y = 10.5;

    lampLight.parent = bulb;



    return scene;
}







/******Build Functions***********/






// LAMPS

const buildLampLight = () => {
    const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -10, 0), Math.PI, 1, scene);
    lampLight.diffuse = BABYLON.Color3.Yellow();
    return lampLight;
}



const buildLampShape = () =>{
    const lampShape = [];
    for(let i = 0; i < 20; i++) {
        lampShape.push(new BABYLON.Vector3(Math.cos(i * Math.PI / 10), Math.sin(i * Math.PI / 10), 0));
    }
	lampShape.push(lampShape[0]); //close shape

    return lampShape;
}


const buildLampPath = () => {
    const lampPath = [];
	lampPath.push(new BABYLON.Vector3(0, 0, 0));
	lampPath.push(new BABYLON.Vector3(0, 10, 0));
    for(let i = 0; i < 20; i++) {
        lampPath.push(new BABYLON.Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
    }
    lampPath.push(new BABYLON.Vector3(3, 11, 0));

    return lampPath;
}



const buildLampBulb = () => {
    const bulb = BABYLON.MeshBuilder.CreateSphere("bulb", {diameterX: 1.5, diameterZ: 0.8});
    
    const yellowMat = new BABYLON.StandardMaterial("yellowMat");
    yellowMat.emissiveColor = BABYLON.Color3.Yellow();

    bulb.material = yellowMat;
    
    bulb.position.x = 2;
    bulb.position.y = 10.5;

    

    return bulb;
}



const buildLamp = (position) => {
    const lamp = BABYLON.MeshBuilder.ExtrudeShape("lamp", {cap: BABYLON.Mesh.CAP_END, shape: buildLampShape(), path: buildLampPath(), scale: 0.5});
	lamp.scaling = new BABYLON.Vector3(0.13, 0.13, 0.13);
    lamp.position = position;
    const lampBulb = buildLampBulb();
    
    lampBulb.parent = lamp;
    lampLight.parent = bulb;
    return lamp;
}

// GROUND





const buildGround = () => {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0.8, 0.67, 0.13);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:100, height:100});
    ground.material = groundMat;
}





// HOUSE






const buildHouse = (width) => {
    const box = buildBox(width);
    const roof = buildRoof(width);

    return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}




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
