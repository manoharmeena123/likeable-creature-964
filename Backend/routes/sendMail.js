const nodemailer = require("nodemailer");
require('dotenv').config();
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// let res=fetch(`localhost:8000/addDataToBackend/getdata/prags@gmail.com`).then(response => response.json())
//  .then(data => console.log(data));

const { UserModel } = require("../models/user.model")
const {AppointmentModel} = require("../models/appointment.model")

const appointmentRouter = require("express").Router();

appointmentRouter.post("/appo", async (req, res)=>{
    let payload = req.body
    //console.log(payload);
    try {
        // NODE MAILER
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: 'manoharmeena245@gmail.com',
                pass: 'wwqvftbyxzotbchw'
            },
        });
        // shopdata
        let message = {
            from: 'manoharmeena245@gmail.com>', // sender address
            to: `${payload.email}`, // list of receivers
            subject: `Your appointment is confirmed , ${payload.date} at ${payload.time}`, // Subject line
            text: "appointment Booked", // plain text body
            html: `<div style="width: 70%; margin: auto; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        <h1 style="text-align: center;color: green;">Dear Customer, your appointment is confirmed!</h1>
                        <h2 style="text-align: center; color: #195aaf;">${payload.date} at ${payload.time} with ${payload.salon.name}</h2>
                        <div style="width: 40%; margin: auto;">
                            <img style="width: 100%;" src=${payload.salon.image} alt="salon">
                        </div>
                        <h3 style="text-align: center;">Location: ${payload.salon.location}</h3>
                        <h1 style="text-align: center;">Your Total amount with taxes Rs. ${payload.total}</h1>
                        <p style="text-align: center; font-size: large; color: grey;">We sent you this email because you have booked with ${payload.salon.name}, which partners with Beautygem for appointments and payments.</p>
                    </div>`,
          }
    
        transporter.sendMail(message)
        .then((info)=>{
            res.status(201).json({
                message: "Appointment has been created , Check Your Mail",
                status: true,
            });
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

module.exports = {appointmentRouter}

