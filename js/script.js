//Creating the main scene
var scene = new THREE.Scene();

        // Creating a render and setting the size
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff,1.0);
        document.body.appendChild(renderer.domElement);

        //Creating a camera with basic position
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.set(-30,40,30);
        camera.lookAt(scene.position);

        //Creating an ambient light
        var ambientLight = new THREE.AmbientLight(0x0c0c0c, 0.5);
        scene.add(ambientLight);

        //Creating the base plane
        var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;

        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0;
        plane.position.y=0;
        plane.position.z=0;

        scene.add(plane);

        //Creating the cube edges
        var material = new THREE.LineBasicMaterial({color: 0xffffff});
        var geometry = new THREE.Geometry();
        var createLine= function (a1, b1, c1, a2, b2, c2){
            geometry.vertices.push(
                new THREE.Vector3( a1, b1, c1 ),
                new THREE.Vector3( a2, b2, c2 ),
            );
        };
        createLine(0,0,0,0,5,0);
        createLine(5,5,0,5,0,0);
        createLine(5,0,5,5,5,5);
        createLine(0,5,5,0,0,5);
        createLine(0,0,0,5,0,0);
        createLine(5,0,5,0,0,5);
        createLine(0,5,5,0,5,0);
        createLine(5,5,0,5,5,5);

        var cube = new THREE.Line( geometry, material );

        //Creating spheres placed on its vertexes
        var targetList= [];
        var targets=[];
        for(let i=1; i<=8; i++) {
            targets["name"+i]="sphere"+i
        }

        for(var key in targets) {
            var sphereGeometry=new THREE.SphereGeometry (0.6,32,32);
            var sphereMaterial=new THREE.MeshBasicMaterial({color:  Math.random() * 0xffffff, vertexColors: THREE.FaceColors });
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            targetList.push(sphere);
            sphere.name=targets[key];
            cube.add(sphere);
        }

        var changeSpherePosition = function(nm,a,b,c) {
            cube.getObjectByName(nm).position.set(a,b,c);
        };
        changeSpherePosition("sphere1",0,0,0);
        changeSpherePosition("sphere2",5,0,0);
        changeSpherePosition("sphere3",0,5,0);
        changeSpherePosition("sphere4",0,0,5);
        changeSpherePosition("sphere5",5,5,0);
        changeSpherePosition("sphere6",0,5,5);
        changeSpherePosition("sphere7",5,0,5);
        changeSpherePosition("sphere8",5,5,5);

        //Changing cube position an adding it into the scene
        cube.position.x = -10;
        cube.position.z = 10;
        cube.position.y = 10;
        scene.add( cube );

        //Objects animating
        var animate = function () {
            requestAnimationFrame( animate );
            plane.rotation.z +=0.002
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.002;

            renderer.render( scene, camera );
        };
        animate();