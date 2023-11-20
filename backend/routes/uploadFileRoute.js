const router = require("express").Router();
const fs = require('fs').promises; // Use promises for asynchronous file operations
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const xlsx = require('xlsx');
const User = require('../models/userModel');
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleWare");






// router.post('/upload-excel-cheat', roleMiddleware, authMiddleware, upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const filePath = req.file.path;
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//         const updatePromises = data.map(async (user) => {
//             let updateData;
//             if (user.deg) {
//                 updateData = {
//                     $push: {
//                         comprehensiveExams: {
//                             name: user.name,
//                             sig: user.sig,
//                             deg: user.deg,
//                             date: new Date().toISOString(),
//                         },
//                     },
//                 };
//             } else {
//                 const booleanValue = user.hw.toLowerCase() === "true";
//                 updateData = {
//                     $push: {
//                         lessons: {
//                             hw: booleanValue,
//                             sig: user.sig,
//                             exam: user.exam,
//                             location: user.location,
//                             date: new Date().toISOString(),
//                             attendance: true,
//                         },
//                     },
//                 };
//             }

//             await User.findOneAndUpdate({ phoneNumber: user.phoneNumber, group: user.location }, updateData).exec();
//         });

//         const addLessonToStudentsWhichDidntIntended = await User.updateMany({ group: data[0].location }, {
//             $push: {
//                 lessons: {
//                     hw: false,
//                     sig: data[0].sig,
//                     exam: 0,
//                     location: data[0].location,
//                     date: new Date().toISOString(),
//                     attendance: false,
//                 },
//             },
//         });

//         // Wait for all updates to complete before deleting the file
//         await Promise.all([...updatePromises, addLessonToStudentsWhichDidntIntended]);

//         // Remove the file after processing
//         await fs.unlink(filePath);

//         res.status(200).json('done');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json('An error occurred');
//     }
// });


router.post('/upload-excel-cheat', roleMiddleware, authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const updatePromises = data.map(async (user) => {
            let updateData;
            console.log(user)
            if (user.deg) {
                updateData = {
                    $push: {
                        comprehensiveExams: {
                            name: user.name,
                            sig: user.sig,
                            deg: user.deg,
                            date: new Date().toISOString(),
                        },
                    },
                };
            } else {
                const booleanValue = user.hw.toLowerCase() === "true";
                updateData = {
                    $push: {
                        lessons: {
                            hw: booleanValue,
                            sig: user.sig,
                            exam: user.exam,
                            location: user.location,
                            date: new Date().toISOString(),
                            attendance: true,
                        },
                    },
                };
            }

            await User.findOneAndUpdate({ phoneNumber: user.phoneNumber }, updateData).exec();
        });

        // Find students in the same group who are not in the "data" set and add the lesson
        const studentsNotInData = await User.find({ group: data[0].location, phoneNumber: { $nin: data.map(user => user.phoneNumber) } });

        const addLessonPromises = studentsNotInData.map(async (student) => {
            return User.updateOne(
                { phoneNumber: student.phoneNumber },
                {
                    $push: {
                        lessons: {
                            hw: false,
                            sig: data[0].sig,
                            exam: 0,
                            location: data[0].location,
                            date: new Date().toISOString(),
                            attendance: false,
                        },
                    },
                }
            );
        });

        // Wait for all updates to complete before deleting the file
        await Promise.all([...updatePromises, ...addLessonPromises]);

        // Remove the file after processing
        await fs.unlink(filePath);

        res.status(200).json('done');
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred');
    }
});





module.exports = router;
