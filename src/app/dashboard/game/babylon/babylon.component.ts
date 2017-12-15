import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { NotificationsService } from 'angular2-notifications/dist';
import * as BABYLON from 'babylonjs';
import { IRequestHandler, RequestManager } from '../../../shared/request-manager';
import { UsbBadService } from '../../../shared/services/request/babylon/usbbad.service';
import { UsbListService } from '../../../shared/services/request/babylon/usblist.service';
import { UsbToggleServiceBuilder } from '../../../shared/services/request/babylon/usbtoggle-builder.service';
import { UsbToggleUnPlugServiceBuilder } from '../../../shared/services/request/babylon/usbtoggle-unplug-builder.service';
import { ScoreService } from '../../../shared/services/request/score/score.service';
import { ShopService } from '../../../shared/services/request/shop/shop.service';
import { StatService } from '../../../shared/services/request/stats/stats.service';
import { DialogLegitComponent } from './legit/legit-info.component';
import { DialogtutoComponent } from './tuto/tuto.component';

@Component({
  selector: 'app-babylon',
  templateUrl: 'babylon.component.html',
})

export class BabylonComponent implements IRequestHandler, AfterViewInit, OnDestroy {
  show3D: boolean;
  refscene: any;

  private router: Router;
  private dialog: MdDialog;
  private usbListRequest: UsbListService;
  private usbBadRequest: UsbBadService;
  private usbToggleServiceBuilder: UsbToggleServiceBuilder;
  private usbToggleUnPlugServiceBuilder: UsbToggleUnPlugServiceBuilder;
  private loadingService: TdLoadingService;
  private usbs: any[];
  private shopService: ShopService;
  private scoreService: ScoreService;

  public score: number;
  public level: number;
  private statService: StatService;

  private currentRequest: string;
  private notifications: NotificationsService;
  public notificationOptions: any;

  constructor(router: Router, dialog: MdDialog,
              usbListRequest: UsbListService,
              usbBadRequest: UsbBadService,
              loadingService: TdLoadingService,
              usbToggleServiceBuilder: UsbToggleServiceBuilder,
              usbToggleUnPlugServiceBuilder: UsbToggleUnPlugServiceBuilder,
              shopService: ShopService, scoreService: ScoreService,
              statService: StatService, notifications: NotificationsService) {
    this.notifications = notifications;
    this.currentRequest = 'USB';
    this.statService = statService;
    this.usbToggleUnPlugServiceBuilder = usbToggleUnPlugServiceBuilder;
    this.loadingService = loadingService;
    this.usbToggleServiceBuilder = usbToggleServiceBuilder;
    this.usbListRequest = usbListRequest;
    this.usbBadRequest = usbBadRequest;
    this.shopService = shopService;
    this.router = router;
    this.dialog = dialog;
    this.scoreService = scoreService;
    this.score = this.scoreService.getScore();
    this.level = 0;
    this.notificationOptions = {
      position: ['bottom', 'right'],
      timeOut: 3000,
      showProgressBar: true,
    };
  }

  ngOnDestroy(): void {
    if (this.refscene) {
      this.refscene.dispose();
      this.refscene = null;
    }
  }

  ngAfterViewInit() {
    this.show3D = true;
    const manager = new RequestManager(this.usbListRequest, this.loadingService, this);
    manager.send(null);
  }

  openLegit(): void {
    this.dialog.open(DialogLegitComponent, {
      height: '70%', // can be px or %
      width: '80%', // can be px or %
    });
  }

  onBadUsbTrigger() {
    const manager = new RequestManager(this.usbBadRequest, this.loadingService, this);
    manager.send(null);
  }

  redirectToDesktop(fadeAction, mesh) {
    window.clearInterval(fadeAction);
    if (mesh.id === 'TV') {
      this.router.navigateByUrl('/dashboard/stats');
    } else {
      this.router.navigateByUrl('/dashboard/desktop');
    }
  }

  // IRequestHandler
  public complete(response: Response): void { }
  public success(response: Response): void { }
  public error(response: Response): void { }
  public expandedEvent(): void { }
  public collapsedEvent(): void { }

  public afterSuccess(response: Response) {
    if (this.currentRequest === 'USB') {
      this.usbs = response.json();
      const manager = new RequestManager(this.statService, this.loadingService, this);
      this.currentRequest = 'STATS';
      manager.send(null);
    } else if (this.currentRequest === 'STATS') {
      const stats: any = response.json();
      this.scoreService.setLevel(stats.level);
      this.scoreService.setScore(stats.score);
      this.score = stats.score;
      this.level = stats.level.name;
      this.currentRequest = '';
    }
    if (!this.refscene) {
      this.initView();
    }
  }

  // FIXME : update function name. Stuff CANNOT BE a name for a function. Don't forget to divide this big function
  // into small parts with meaningful names
  initView() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      this.refscene = scene;
      const assetsManager = new BABYLON.AssetsManager(scene);
      const meshTask = assetsManager.addMeshTask('skulltask', '', 'assets/scenes/', 'desk1.babylon');
      const light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 0), scene);
      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(2, 3.5, -7), scene);
      const lamp1 = new BABYLON.PointLight('Spo', new BABYLON.Vector3(-7.07, 2.73, -2.79),  scene);
      lamp1.diffuse = new BABYLON.Color3(1, 1, 1);
      lamp1.specular = new BABYLON.Color3(1, 1, 1);
      lamp1.intensity = 0.7;
      lamp1.range = 1000;
      const lamplight = new BABYLON.PointLight('Spot0', new BABYLON.Vector3(0, 0, 0),  scene);
      lamplight.diffuse = new BABYLON.Color3(1, 1, 1);
      lamplight.specular = new BABYLON.Color3(0, 0, 0);
      lamplight.range = 3;
      lamplight.intensity = 1;

      let fadeLevel = 1.0;

      const usbKeys = [];
      const usbKeysFraud = [];
      const usbLights = [];
      const usbLightAnimation = [];

      const makeOverOut = (mesh) => {
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger,
          mesh.material, 'emissiveColor', mesh.material.emissiveColor));
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger,
          mesh.material, 'emissiveColor', BABYLON.Color3.White()));
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickDownTrigger,
          mesh.material, 'emissiveColor', BABYLON.Color3.Red()));
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPickUpTrigger,
          mesh.material, 'emissiveColor', mesh.material.emissiveColor));
      };

      const skybox = BABYLON.Mesh.CreateBox('skyBox', 300.0, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;
      skybox.infiniteDistance = true;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/scenes/' + this.shopService.getSkybox(), scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skybox.renderingGroupId = 0;

      const makeClickAddLight = (mesh) => {
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger,
          (unitMesh) => {
            if (lamplight.isEnabled()) {
              lamplight.setEnabled(false);
            } else {
              lamplight.setEnabled(true);
            }
          }),
        );
      };

      const teleport = (mesh, slot, newPosition) => {
        // (x, y, z) x -> left / right   y - > haut bas   z -> avant arriere
        if (slot === 1) {
          // if plug in
          if (mesh.position.x === 0.25) {
            mesh.position = new BABYLON.Vector3(1.5, 2.1, -4);
            mesh.rotation.y = Math.PI * 2;
            usbLights[slot - 1].setEnabled(false);
            if (usbLightAnimation[slot - 1]) {
              clearInterval(usbLightAnimation[slot - 1]);
            }
            if (newPosition) {
              const requestService = this.usbToggleUnPlugServiceBuilder.build(this.usbs[slot - 1].id);
              const manager = new RequestManager(requestService, this.loadingService, this);
              manager.send(null);
            }
          } else {
            mesh.position = new BABYLON.Vector3(0.25, 0.9, -5.1);
            mesh.rotation.y = Math.PI;
            usbLights[slot - 1].setEnabled(true);
            usbLightAnimation[slot - 1] = setInterval(toggleLightSlot0, 1000);
            if (newPosition) {
              const requestService = this.usbToggleServiceBuilder.build(this.usbs[slot - 1].id);
              const manager = new RequestManager(requestService, this.loadingService, this);
              manager.send(null);
            }
          }
        } else {
          if (slot === 2) {
            // if plug in
            if (mesh.position.x === 0.45) {
              mesh.position = new BABYLON.Vector3(1.8, 2.1, -4);
              mesh.rotation.y = Math.PI * 2;
              usbLights[slot - 1].setEnabled(false);
              if (usbLightAnimation[slot - 1]) {
                clearInterval(usbLightAnimation[slot - 1]);
              }
              if (newPosition) {
                const requestService = this.usbToggleUnPlugServiceBuilder.build(this.usbs[slot - 1].id);
                const manager = new RequestManager(requestService, this.loadingService, this);
                manager.send(null);
              }
            } else {
              mesh.position = new BABYLON.Vector3(0.45, 0.9, -5.1);
              mesh.rotation.y = Math.PI;
              usbLights[slot - 1].setEnabled(true);
              usbLightAnimation[slot - 1] = setInterval(toggleLightSlot1, 1000);
              if (newPosition) {
                const requestService = this.usbToggleServiceBuilder.build(this.usbs[slot - 1].id);
                const manager = new RequestManager(requestService, this.loadingService, this);
                manager.send(null);
              }
            }
          }
        }
      };

      const makeClickResponseUsb = (mesh, slot) => {
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger,
          (unitMesh) => {
            teleport(mesh, slot, true);
          }),
        );
      };

      const makeClickResponseUsbFraud = (mesh) => {
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger,
          (unitMesh) => {
            this.onBadUsbTrigger();
            this.notifications.error('Alert', 'Security: Do not plug unknown device !');
          }),
        );
      };

      const openLegitInfo = (mesh) => {
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger,
          (unitMesh) => {
            this.openLegit();
          }),
        );
      };

      function toggleLightSlot1() {
        usbLights[1].setEnabled(!usbLights[1].isEnabled());
      }

      function toggleLightSlot0() {
        usbLights[0].setEnabled(!usbLights[0].isEnabled());
      }

      function setup(mesh, slot) {
        // (x, y, z) x -> left / right   y - > haut bas   z -> avant arriere
        if (slot === 1) {
          mesh.position = new BABYLON.Vector3(1.5, 2.1, -4);
        } else {
          if (slot === 2) {
            mesh.position = new BABYLON.Vector3(1.8, 2.1, -4);
          }
        }
      }

      const loadUsb = (slot, plugged) => {
        BABYLON.SceneLoader.ImportMesh('', 'assets/scenes/', 'usb.babylon', scene,
          (newMeshes, particleSystems) => {
            setup(newMeshes[0], slot);
            const lamp2 = new BABYLON.PointLight('usbLight' + slot, new BABYLON.Vector3(1, 1, 1),  scene);
            lamp2.diffuse = new BABYLON.Color3(1, 0, 0);
            lamp2.intensity = 5;
            lamp2.range = 0.2;
            lamp2.parent = newMeshes[0];
            lamp2.setEnabled(false);
            const myMaterial = new BABYLON.StandardMaterial('mat' + slot, scene);
            newMeshes[0].material = myMaterial;
            usbKeys.push(newMeshes[0]);
            usbLights.push(lamp2);
            usbLightAnimation.push(null);
            if (plugged) {
              teleport(newMeshes[0], slot, false);
            }
          });
      };

      let myscreen;
      let mycomputer;
      let topsecret;
      let mywindows;
      let myLampBot;
      let myLampTop;
      let myTV;

      const makeClickResponse = (mesh) => {
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger,
          (unitMesh) => {
            camera.setTarget(mesh.position);
            const animationBox = new BABYLON.Animation('tutoAnimation', 'fov',
              50, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
              BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

            const keys = [];
            keys.push({
              frame: 0,
              value: scene.activeCamera.fov,
            });

            keys.push({
              frame: 100,
              value: 0.15,
            });

            const self = this;
            let alpha = 0;
            const fadeAction = setInterval(() => {
              processToFade();
            }, 200);
            function processToFade() {
              fadeLevel = Math.abs(Math.cos(alpha));
              alpha += 0.3;
              if (alpha > 2) {
                self.show3D = false;
                self.redirectToDesktop(fadeAction, mesh);
              }
            }

            animationBox.setKeys(keys);
            scene.activeCamera.animations.push(animationBox);

            scene.beginAnimation(scene.activeCamera, 0, 100, false);
          }),
        );
      };

      const loadComputer = () => {
        BABYLON.SceneLoader.ImportMesh('', 'assets/scenes/', 'computer2.babylon', scene, (newMeshes, particleSystems) => {
          myscreen.dispose();
          mywindows.dispose();
          const myMaterial = new BABYLON.StandardMaterial('tmp', scene);
          myMaterial.diffuseTexture = new BABYLON.Texture('assets/scenes/windows_xp.jpg', scene);
          newMeshes[0].material = myMaterial;
          newMeshes[0].position = new BABYLON.Vector3(0.5, 2.1, -4.2);
          newMeshes[0].actionManager = new BABYLON.ActionManager(scene);
          makeClickResponse(newMeshes[0]);
        });
      };

      // Start at one
      let slot = 1;
      for (let elt of this.usbs) {
        elt = elt;
        loadUsb(slot, elt.plugged);
        slot += 1;
      }

      function setupFraudUSB(mesh) {
        // (x, y, z) x -> left / right   y - > haut bas   z -> avant arriere
        const l = [new BABYLON.Vector3(1.8, 1.3, -6.4), new BABYLON.Vector3(-5.2, 2.3, -2), new BABYLON.Vector3(4.65, 0.2, 1)];
        mesh.position = l[Math.floor(Math.random() * 3)];
        /*if (slot === 0) {
          mesh.position = new BABYLON.Vector3(1.8, 1.3, -6.4);
        } else {
          if (slot === 1) {
            mesh.position = new BABYLON.Vector3(-5.2, 2.3, -2);
          } else {
            mesh.position = new BABYLON.Vector3(4.65, 0.2, 1);
          }
        }*/
      }

      const addUsbFraud = () => {
        BABYLON.SceneLoader.ImportMesh('', 'assets/scenes/', 'usb.babylon', scene,
          (newMeshes, particleSystems) => {
            setupFraudUSB(newMeshes[0]);
            const lamp2 = new BABYLON.PointLight('usbLight' + slot, new BABYLON.Vector3(1, 1, 1),  scene);
            lamp2.diffuse = new BABYLON.Color3(1, 0, 0);
            lamp2.intensity = 5;
            lamp2.range = 0.2;
            lamp2.parent = newMeshes[0];
            lamp2.setEnabled(false);
            const myMaterial = new BABYLON.StandardMaterial('mat' + slot, scene);
            newMeshes[0].material = myMaterial;
            const l = [new BABYLON.Color3(1, 0.2, 0), new BABYLON.Color3(1, 0.5, 0.1), new BABYLON.Color3(1, 0.5, 0.1)];
            myMaterial.diffuseColor = l[Math.floor(Math.random() * 3)];
            usbKeysFraud.push(newMeshes[0]);
            usbLightAnimation.push(null);
          });
      };

      addUsbFraud();

      BABYLON.Effect.ShadersStore['fadePixelShader'] =
        'precision highp float;' +
        'varying vec2 vUV;' +
        'uniform sampler2D textureSampler; ' +
        'uniform float fadeLevel; ' +
        'void main(void){' +
        'vec4 baseColor = texture2D(textureSampler, vUV) * fadeLevel;' +
        'baseColor.a = 1.0;' +
        'gl_FragColor = baseColor;' +
        '}';

      const postProcess = new BABYLON.PostProcess('Fade', 'fade', ['fadeLevel'], null, 1.0, camera);
      postProcess.onApply = (effect) => {
        effect.setFloat('fadeLevel', fadeLevel);
      };

      const myscreenMat = new BABYLON.StandardMaterial('metal', scene);
      myscreenMat.diffuseTexture = new BABYLON.Texture('assets/scenes/metal.jpg', scene);
      const mycomputerMat = new BABYLON.StandardMaterial('metal', scene);
      mycomputerMat.diffuseTexture = new BABYLON.Texture('assets/scenes/metal.jpg', scene);
      const mytopsecretMat = new BABYLON.StandardMaterial('download', scene);
      mytopsecretMat.diffuseTexture = new BABYLON.Texture('assets/scenes/download.jpg', scene);
      const mywindowsMat = new BABYLON.StandardMaterial('win', scene);
      mywindowsMat.diffuseTexture = new BABYLON.Texture('assets/scenes/win.png', scene);
      const mylampMat = new BABYLON.StandardMaterial('lamp', scene);

      const videoMat = new BABYLON.StandardMaterial('textVid', scene);
      const video1 = new BABYLON.VideoTexture('video1', ['assets/scenes/1.mp4'],
        scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
      const video2 = new BABYLON.VideoTexture('video2', ['assets/scenes/2.mp4'],
        scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
      const video3 = new BABYLON.VideoTexture('video3', ['assets/scenes/3.mp4'],
        scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
      const video4 = new BABYLON.VideoTexture('video4', ['assets/scenes/4.mp4'],
        scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
      (video1.video as HTMLVideoElement).loop = false;
      (video2.video as HTMLVideoElement).loop = false;
      (video3.video as HTMLVideoElement).loop = false;
      (video4.video as HTMLVideoElement).loop = false;
      const videos = [
        video4,
        video2,
        video3,
        video1,
      ];
      let currVideoIndex = 0;
      videoMat.diffuseTexture = videos[currVideoIndex];
      setInterval(() => {
        if ((videos[currVideoIndex].video as HTMLVideoElement).currentTime
          >= (videos[currVideoIndex].video as HTMLVideoElement).duration) {
          currVideoIndex++;
          if (currVideoIndex > videos.length - 1) {
            currVideoIndex = 0;
          }
          videoMat.diffuseTexture = videos[currVideoIndex];
          (videos[currVideoIndex].video as HTMLVideoElement).currentTime = 0;
          (videos[currVideoIndex].video as HTMLVideoElement).play();
        }
      }, 4000);

      videoMat.backFaceCulling = false;

      meshTask.onSuccess = (task: BABYLON.MeshAssetTask) => {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        for (let index = 0; index < task.loadedMeshes.length; index++) {
          if (task.loadedMeshes[index].name === 'Screen') {
            myscreen = task.loadedMeshes[index];
            myscreen.material = myscreenMat;
            if (this.shopService.getComputerName() !== 'basic') {
              loadComputer();
            }
          }
          if (task.loadedMeshes[index].name === 'Plane.003') {
            mywindows = task.loadedMeshes[index];
            mywindows.material = mywindowsMat;
          }
          if (task.loadedMeshes[index].name === 'Computer') {
            mycomputer = task.loadedMeshes[index];
            mycomputer.material = mycomputerMat;
          }
          if (task.loadedMeshes[index].name === 'topsecret') {
            topsecret = task.loadedMeshes[index];
            topsecret.material = mytopsecretMat;
          }
          if (task.loadedMeshes[index].name === 'Lamp_Body') {
            lamplight.setEnabled(false);
            lamplight.position = task.loadedMeshes[index].position;
            myLampBot = task.loadedMeshes[index];
            myLampBot.material = mylampMat;
          }
          if (task.loadedMeshes[index].name === 'Lamp_Head') {
            myLampTop = task.loadedMeshes[index];
            myLampTop.material = mylampMat;
          }
          if (task.loadedMeshes[index].name === 'TV') {
            myTV = task.loadedMeshes[index];
            myTV.material = videoMat;
          }
        }
        myscreen.actionManager = new BABYLON.ActionManager(scene);
        mycomputer.actionManager = new BABYLON.ActionManager(scene);
        topsecret.actionManager = new BABYLON.ActionManager(scene);
        mywindows.actionManager = new BABYLON.ActionManager(scene);
        myLampTop.actionManager = new BABYLON.ActionManager(scene);
        myLampBot.actionManager = new BABYLON.ActionManager(scene);
        myTV.actionManager = new BABYLON.ActionManager(scene);

        for (let i = 0; i < usbKeys.length; i++) {
          usbKeys[i].actionManager = new BABYLON.ActionManager(scene);
          makeOverOut(usbKeys[i]);
          makeClickResponseUsb(usbKeys[i], i + 1);
        }

        for (const elt of usbKeysFraud) {
          elt.actionManager = new BABYLON.ActionManager(scene);
          makeOverOut(elt);
          makeClickResponseUsbFraud(elt);
        }

        makeOverOut(myscreen);
        makeOverOut(mycomputer);
        makeOverOut(topsecret);
        makeOverOut(myTV);
        makeClickResponse(myTV);
        makeClickResponse(myscreen);
        makeClickResponse(mycomputer);
        openLegitInfo(topsecret);
        makeClickResponse(mywindows);
        makeClickAddLight(myLampTop);
        makeClickAddLight(myLampBot);
      };
      assetsManager.onFinish = (tasks) => {
        engine.runRenderLoop(() => {
          scene.render();
        });
      };
      assetsManager.load();

      // This targets the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());

      // This attaches the camera to the canvas
      camera.attachControl(canvas, false);

      scene.actionManager = new BABYLON.ActionManager(scene);

      scene.registerBeforeRender(() => {
        light.position = camera.position;
      });
      return scene;
    };
    const scene = createScene();
    engine.runRenderLoop(() => {
      scene.render();
    });
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }
}
