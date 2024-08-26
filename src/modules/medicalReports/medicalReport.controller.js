import { asheaaModel } from "../../../databases/models/asheaa.js";
import { medicinModel } from "../../../databases/models/medicin.js";
import { pdfModel } from "../../../databases/models/pdf.js";
import { roshtaModel } from "../../../databases/models/roshtat.js";
import { userModel } from "../../../databases/models/user.model.js";
import { AppErr } from "../../utils/AppErr.js";
import { catchAsyncErr } from "../../utils/catcherr.js";
import { thalilModel } from './../../../databases/models/tahalil.js';


//user side ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userUploadRoshta = catchAsyncErr(async (req, res, next) => {

        const user = await userModel.findById({ _id: req.user._id });
        if (!user) { return next(new AppErr('User not found', 200)); }
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.userid = user._id
        req.body.fullName = user.fullName

        const report = new roshtaModel(req.body);
        if (!report) return next(new AppErr('Error uploade', 200));
        await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { roshta: report._id } }, { new: true });
        await report.save();
        res.status(201).json({ message: 'Roshta uploaded successfully', report });

});
export const userUploadReservRoshta = catchAsyncErr(async (req, res, next) => {
        const user = await userModel.findById({ _id: req.user._id });

        if (!user) { return next(new AppErr('User not found', 200)) }
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.userid = user._id
        req.body.fullName = user.fullName

        const report = new roshtaModel(req.body);
        if (!report) return next(new AppErr('Error uploade', 200));
        await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { roshta: report._id } }, { new: true });
        await report.save();
        res.status(201).json({ message: 'Roshta uploaded successfully', report });

});


export const userUploadTahlil = catchAsyncErr(async (req, res, next) => {

        const user = await userModel.findById({ _id: req.user._id });

        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file => file.path );

        req.body.userid = user._id
        req.body.fullName = user.fullName
        const report = new thalilModel(req.body);
        if (!report) return next(new AppErr('Error uploading ', 200));
        await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { tahalil: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'ta7lil uploaded successfully', report });

});
export const training = catchAsyncErr(async (req, res, next) => {

        req.body.pdf = req.files['pdf']?.map(file => file.path );

        const file = new pdfModel(req.body);
        await file.save();
        res.status(201).json({ message: 'file uploaded successfully', file });

});

export const userUploadMedicin = catchAsyncErr(async (req, res, next) => {

        const user = await userModel.findById({ _id: req.user._id });

        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);

        req.body.userid = user._id
        req.body.fullName = user.fullName
        const report = new medicinModel(req.body);
        if (!report) return next(new AppErr('Error uploading ', 200));

        await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { medicin: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'medicin uploaded successfully', report });

});

export const userUploadAshe3a = catchAsyncErr(async (req, res, next) => {

        const user = await userModel.findById({ _id: req.user._id });

        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file =>  file.path);
        req.body.userid = user._id
        req.body.fullName = user.fullName
        const report = new asheaaModel(req.body);
        if (!report) return next(new AppErr('Error uploading ', 200));
        await userModel.findOneAndUpdate({ fullName: user.fullName }, { $addToSet: { asheaa: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'ashe3a uploaded successfully', report });

});

export const getUserReservationRoshta = catchAsyncErr(async (req, res, next) => {
        const { reservationId } = req.body
        const roshta = await roshtaModel.find({ userid: req.user._id, reservationId })
        if (!roshta) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", roshta });

});

// admin side ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uploadRoshta = catchAsyncErr(async (req, res, next) => {

        const { id } = req.body
        const user = await userModel.findById(id);

        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);

        req.body.userid = id
        const report = new roshtaModel(req.body);
        if (!report) return next(new AppErr('Error uploade', 200));
        await userModel.findByIdAndUpdate(id, { $addToSet: { roshta: report._id } }, { new: true });
        await report.save();
        res.status(201).json({ message: 'Roshta uploaded successfully', report });

});

export const editRoshta = catchAsyncErr(async (req, res, next) => {
        const { id } = req.params;
        req.body.image = req.files['image']?.map(file => file.path);


        const roshta = await roshtaModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!roshta) return next(new AppErr('roshta not found', 200));

        res.status(200).json({ message: 'roshta updated', roshta });

});

export const getRoshta = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const roshta = await roshtaModel.findById(id).populate('userid');
        if (!roshta) return next(new AppErr('Error fetsheing ', 200));
        res.status(200).json({ message: "success", roshta });


})

export const deleteRoshta = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const roshta = await roshtaModel.findByIdAndDelete(id)
        if (!roshta) return next(new AppErr('Error deleting ', 200));
        res.status(200).json({ message: "deleted", roshta });

});

export const getAllRoshta = catchAsyncErr(async (req, res, next) => {
        const { id } = req.body
        const roshta = await roshtaModel.find({ userid: id })
        if (!roshta) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", roshta });

});

export const uploadTahlil = catchAsyncErr(async (req, res, next) => {

        const { id } = req.body
        const user = await userModel.findById({ _id: id });
        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file => file.path);
        req.body.userid = id
        const report = new thalilModel(req.body);
        if (!report) return next(new AppErr('Error uploading ', 200));
        await userModel.findByIdAndUpdate(id, { $addToSet: { tahalil: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'ta7lil uploaded successfully', report });

});

export const editTahlil = catchAsyncErr(async (req, res, next) => {
        const { id } = req.params;
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file => file.path);


        const ta7lel = await thalilModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!ta7lel) return next(new AppErr('ta7lel not found', 200));

        res.status(200).json({ message: 'ta7lel updated', ta7lel });

});


export const getTa7lil = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Ta7lil = await thalilModel.findById(id).populate('userid');
        if (!Ta7lil) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", Ta7lil });


});

export const getAllta7lil = catchAsyncErr(async (req, res, next) => {
        const { id } = req.body

        const ta7lil = await thalilModel.find({ userid: id })
        if (!ta7lil) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", ta7lil });


});

export const deleteTahlil = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Tahlil = await thalilModel.findByIdAndDelete(id)
        if (!Tahlil) return next(new AppErr('Error deleting ', 200));
        res.status(200).json({ message: "deleted", Tahlil });

});

export const uploadMedicin = catchAsyncErr(async (req, res, next) => {

        const { id } = req.body
        const user = await userModel.findById(id)
        if (!user) {
                return next(new AppErr('User not found', 200));
        }
        req.body.image = req.files['image']?.map(file => file.path);

        req.body.userid = id
        const report = new medicinModel(req.body);
        if (!report) return next(new AppErr('Error uploading ', 200));

        await userModel.findByIdAndUpdate(id, { $addToSet: { medicin: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'medicin uploaded successfully', report });

});

export const editMedicin = catchAsyncErr(async (req, res, next) => {
        const { id } = req.params;
        req.body.image = req.files['image']?.map(file => file.path);


        const medicin = await medicinModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!medicin) return next(new AppErr('medicin not found', 200));

        res.status(200).json({ message: 'medicin updated', medicin });

});

export const getMedicin = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Medicin = await medicinModel.findById(id).populate('userid');
        if (!Medicin) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", Medicin });


});

export const getAllMedicin = catchAsyncErr(async (req, res, next) => {
        const { id } = req.body
        const Medicin = await medicinModel.find({ userid: id })
        if (!Medicin) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", Medicin });


});

export const deleteMedicin = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Medicin = await medicinModel.findByIdAndDelete(id)
        if (!Medicin) return next(new AppErr('Error deleting ', 200));
        res.status(200).json({ message: "deleted", Medicin });

});


export const uploadAshe3a = catchAsyncErr(async (req, res, next) => {
        const { id } = req.body;
        const user = await userModel.findById(id);

        if (!user) {
                return next(new AppErr('User not found', 200));
        }

        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file => file.path);

        req.body.userid = id;
        const report = new asheaaModel(req.body);
        if (!report) return next(new AppErr('Error uploading', 200));
        await userModel.findByIdAndUpdate(id, { $addToSet: { asheaa: report._id } }, { new: true });

        await report.save();
        res.status(201).json({ message: 'ashe3a uploaded successfully', report });
});

export const editAsheaa = catchAsyncErr(async (req, res, next) => {
        const { id } = req.params;
        req.body.image = req.files['image']?.map(file => file.path);
        req.body.pdf = req.files['pdf']?.map(file => file.path);


        const asheaa = await asheaaModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!asheaa) return next(new AppErr('asheaa not found', 200));

        res.status(200).json({ message: 'ashe3a updated', asheaa });

});

export const getAshe3a = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Ashe3a = await asheaaModel.findById(id).populate('userid');
        if (!Ashe3a) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", Ashe3a });


});

export const getAllAshe3a = catchAsyncErr(async (req, res, next) => {
        const { id } = req.body
        const Ashe3a = await asheaaModel.find({ userid: id })
        if (!Ashe3a) return next(new AppErr('Error fetsheing ', 200));

        res.status(200).json({ message: "success", Ashe3a });


});

export const deleteAsheaa = catchAsyncErr(async (req, res, next) => {

        const { id } = req.params;
        const Asheaa = await asheaaModel.findByIdAndDelete(id)
        if (!Asheaa) return next(new AppErr('Error deleting ', 200));
        res.status(200).json({ message: "deleted", Asheaa });

});

//////////////////////////////////////////////////////////////