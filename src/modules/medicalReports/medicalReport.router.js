import express from 'express'
import { protectedRoutes, allowTo } from './../../middleware/protectedRoute.js';
import {
  deleteAsheaa,
  deleteMedicin,
  deleteRoshta,
  deleteTahlil,
  editAsheaa,
  editMedicin,
  editRoshta,
  editTahlil,
  getAllAshe3a, getAllMedicin, getAllRoshta, getAllta7lil,
  getAshe3a, getMedicin, getRoshta, getTa7lil, getUserAllRoshta, uploadAshe3a,
  uploadMedicin, uploadRoshta, uploadTahlil,
  userUploadAshe3a,
  userUploadMedicin,
  userUploadRoshta,
  userUploadTahlil
} from './medicalReport.controller.js';

import { upload } from './../../utils/fileUp.js';

const reportRouter = express.Router();


reportRouter.post('/upload-roshtaaa', protectedRoutes, allowTo('admin'),
  upload.fields([{ name: 'image', maxCount: 1 }]), uploadRoshta);
reportRouter.post('/upload-tahlil', protectedRoutes, allowTo('admin'),
  upload.fields([{ name: 'image', maxCount: 1 }]), uploadTahlil);
reportRouter.post('/upload-medicin', protectedRoutes, allowTo('admin'),
  upload.fields([{ name: 'image', maxCount: 1 }]), uploadMedicin);
reportRouter.post('/upload-ashe3a', protectedRoutes, allowTo('admin'),
  upload.fields([{ name: 'image', maxCount: 1 }]), uploadAshe3a);

// edit ////////////////////////////////

reportRouter.put('/edit-roshta/:id', protectedRoutes, allowTo('admin','user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), editRoshta);
reportRouter.put('/edit-tahlil/:id', protectedRoutes, allowTo('admin','user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), editTahlil);
reportRouter.put('/edit-medicin/:id', protectedRoutes, allowTo('admin','user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), editMedicin);
reportRouter.put('/edit-ashe3a/:id', protectedRoutes, allowTo('admin','user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), editAsheaa);



// delete //////////////////////////////////////////////

reportRouter.delete('/delete-roshta/:id', protectedRoutes, allowTo('admin','user'), deleteRoshta);
reportRouter.delete('/delete-tahlil/:id', protectedRoutes, allowTo('admin','user'), deleteTahlil);
reportRouter.delete('/delete-medicin/:id', protectedRoutes, allowTo('admin','user'), deleteMedicin);
reportRouter.delete('/delete-ashe3a/:id', protectedRoutes, allowTo('admin','user'), deleteAsheaa);

//////////////////////////////////////////////////////////////////////////
reportRouter.get('/get-roshta/:id', protectedRoutes, allowTo('admin','user'), getRoshta);
reportRouter.get('/get-allRoshta', protectedRoutes, allowTo('admin'), getAllRoshta);


reportRouter.get('/get-ta7lil/:id', protectedRoutes, allowTo('admin','user'), getTa7lil);
reportRouter.get('/get-allTa7lil', protectedRoutes, allowTo('admin'), getAllta7lil);


reportRouter.get('/get-medicin/:id', protectedRoutes, allowTo('admin','user'), getMedicin);
reportRouter.get('/get-allMedicin', protectedRoutes, allowTo('admin'), getAllMedicin);


reportRouter.get('/get-asha3a/:id', protectedRoutes, allowTo('admin','user'), getAshe3a);
reportRouter.get('/get-allAshe3a', protectedRoutes, allowTo('admin'), getAllAshe3a);



//user side//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

reportRouter.post('/user-upload-roshta', protectedRoutes, allowTo('user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), userUploadRoshta);
reportRouter.post('/user-upload-tahlil', protectedRoutes, allowTo('user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), userUploadTahlil);
reportRouter.post('/user-upload-medicin', protectedRoutes, allowTo('user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), userUploadMedicin);
reportRouter.post('/user-upload-ashe3a', protectedRoutes, allowTo('user'),
  upload.fields([{ name: 'image', maxCount: 1 }]), userUploadAshe3a);

  reportRouter.get('/get-user-allRoshta', protectedRoutes, allowTo('user'), getUserAllRoshta);




export default reportRouter