const nodemailer = require("nodemailer");
require('dotenv').config();
 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// let res=fetch(`localhost:8000/addDataToBackend/getdata/prags@gmail.com`).then(response => response.json())
//  .then(data => console.log(data));



const { UserModel } = require("../models/user.model")
const sendMailTo=(async(req,res)=>{
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
        to: "dilipsanap028@gmail.com", // list of receivers
        subject: "sendin g email regarding you booking", // Subject line
        text: "You have appointment", // plain text body
        html: `
            <div class="right-container" style="border: 1px solid grey;
height: auto;
/* display: grid; */
/* grid-template-rows: repeat(2,1fr); */
padding: 15px;
border-radius: 10px;">
        <div class="appointments-calender">
            <!-- calender details -->
            <div class="calender-details-user"style="border-radius: 
            10px;
    height: 250px;
    width: auto;
    padding: 50px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <div id="status"
                    style="width: 45%; margin-left: 6%; border-radius: 15px; text-align: center;color: #fff; display: flex; justify-content: space-evenly;padding: 5px 0px; ">
    
                </div>
                <h1>Looking forward to seeing you soon</h1>
                <p>This is a friendly reminder about your appointment on Date: At</p>
                <h3 id="day"></h3>
                <h2 id="salon"></h2>
    
            </div>
            <!-- manage apointmetns -->
            <div class="mng-apointments" style="    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px ;">
                <div id="spinner" style="margin-left: -30%;display: none;" class="spinner"></div>
                <button class="" id="apointmentsbtn" style="background: transparent;
    height: 40px;
    width: 50%;
    border: 1px solid grey;
    border-radius: 10px;
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 10px;">Manage appointments</button>
                <div id="myPopup" style="width: 400px;
    height: 370px;
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    /* background-color: #fff; */
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    background: rgba(255,255,255,0.2);
      -webkit-backdrop-filter: blur(41px);
      backdrop-filter: blur(41px);">
                    <!-- <button id="close-btn"        id="closePopup">Close</button> -->
                    <div id="close-btn" style="display: flex; justify-content: end; color: red;
                            -webkit-backdrop-filter: blur(41px);
                            backdrop-filter: blur(41px);;border: none;"><i class="fa fa-close" style="font-size:36px"></i>
                    </div>
                    <h3 style="text-align: center; color: #195aaf;">Manage Appointment</h3>
                    <div id="pop-card" style="display: flex; flex-direction:column;">
                        <p><span>Note:</span> If you want to reschedule an appointment
                            'click' on 'reschedule appointment'
                        </p>
                        <button id="pop-btn1">Reschedule appointment</button>
    
                        <p><span>Note:</span> If you want to cancel an appointment
                            'click' on 'cancel appointment'
                        </p>
                        <button id="pop-btn2">Cancel appointment</button>
                        <!--  -->
                        <!-- close up btn -->
                        <!-- <div id="myPopup1">
                            <button id="close-btn"   id="closePopup">Close</button>
                            <h3>Are You Shure you want to delete a appointment</h3>
                            <div style="display: flex; flex-direction:column;">
                                <button id="pop-btn1">Close</button>
                                <button id="pop-btn2">Cancel</button>
                            </div> 
                        </div> -->
                        <!--  -->
                        <!--  -->
                    </div>
                </div>
    
                <!--  -->
    
            </div>
        </div>
        <div class="appintments-details" style="margin-top: 13px;">
            <div class="appintments-details-main-clild" style="text-align: center;
  color: #033a80;
  padding: 5px;">
                <h3>Appointments Details</h3>
                <div id="service_detail" class="apoint-for">
                    <!-- <div class="apoint-for-child-1">
                                <p>Shave</p>
                                <p>&#8377 <span>100</span></p>
                            </div>
                            <div class="apoint-for-child-1">
                                <p>Shave</p>
                                <p>&#8377 <span>100</span></p>
                            </div> -->
                </div>
                <hr>
                <div id="total_amo" class="total-amount">
                    <!-- <div class="apoint-for-child-2">
                                <h3>total</h3>
                                <h3>&#8377 <span>100</span></h3>
                            </div> -->
                </div>
                <hr>
                <div id="ref" class="booking-ref" style="  width: 80%;
  margin: auto;
  padding: 5px 0px;">
                    <!-- <h4>Booking ref :  <span>93A6A633</span></h4> -->
                </div>
            </div>
            <div class="cancelation-policy" style="  width: 90%;
  margin: auto;
  padding: 20px 0px;">
                <h3 style="color: rgb(99, 95, 95);"><i class="material-icons"
                        style="font-size:29px;margin-right: 5px; color: red;">cancel</i>Cancelation policy</h3>
                <p>Cancel for free up to 48 hours ahead, otherwise you will be charged 50% of the service price for late
                    cancellation or 100% for not showing up.</p>
            </div>
            <hr>
            <div class="info" style=" width: 90%;
  margin: auto;
  padding: 20px 0px;">
                <h3 style="color: rgb(99, 95, 95);"><i class="fa fa-info-circle"
                        style="font-size:26px;margin-right: 5px; color: red;"></i>Important info</h3>
                <p>Please kindly aim to arrive at least 5 minutes before the start time of your appointment. </p>
            </div>
    
        </div>
    </div>

`,
      }


    transporter.sendMail(message)
    })
sendMailTo()



