// email.service.ts

import { Injectable } from '@nestjs/common';
import { toNamespacedPath } from 'node:path/posix';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'schedulease.official@gmail.com',
        pass: process.env.NODEPASS,
      },
    });
  } 

  async sendMail(
    to: string,
    subject: string,
    event: string,
    data,
    dateOptions: string[],
    timeOptions: string[],
  ) {
    const mailOptions = {
      from: 'schedulease.official@gmail.com',
      to,
      subject,
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SchedulEase Event Notification</title>
      </head>
      
      <body style="font-family: 'Proxima Nova', 'proxima-nova', Helvetica, Arial sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; height: 100%; width: 100% !important; background-color: #ffffff;">
      
        <div style="padding: 20px 0; margin: 0 auto; max-width: 600px;">
      
          <table style="width: 80%; margin: 20px auto 0; margin: 0 auto; padding-bottom: 20px; border-bottom: 1px dashed #dadada;">
            <tr>
              <td style="text-align: center;">
                <p>
                <img style="max-width: 100%; vertical-align: middle;" alt="ScheduleEase" src="/logo/logo.png" >
                </p>
              </td>
            </tr>
          </table>
      
          <!-- BODY -->
          <table style="width: 80%; margin: 20px auto 0; margin: 30px auto 0; font-size: 16px;">
            <tr>
              <td style="color: #1a1a1a; line-height: 22px;">
                <p>
                  Hey ${to},
                </p>
      
                <!-- Event Details -->
                <p>
                  A new event has been scheduled.
                </p>
                <p>
                  <strong>
                    Event Type:
                  </strong>
                  <br>
                  ${data.title}
                </p>
                <!-- Add more event details as needed -->
      
                <!-- Event Date/Time -->
                <p>
                  <strong>
                    Event Date/Time:
                  </strong>
                  <br>
                  ${dateOptions.map((date, index) => `${date}`).join('<br>')}
                  ${timeOptions.map((data, index) => `${data}`).join('<br>')}
                </p>
      
                <!-- Location -->
                <p>
                  <strong>
                    Link:
                  </strong>
                  <br>
                  Please confirm the date and time.
                  <a href="https://schedulease.cloud/confirm/${event}/${to}" style="color: #0069ff;">Confirm Now</a>
                </p>
      
                <!-- Invitee Time Zone -->
                <p>
                  <strong>
                    Invitee Time Zone:
                  </strong>
                  <br>
                  India Standard Time
                </p>
      
                <!-- Questions -->
               
      
                <!-- View Event Link -->
               
              </td>
            </tr>
          </table><!-- /BODY -->
      
          <!-- FOOTER -->
          <!-- /FOOTER -->
      
        </div>
      
      </body>
      
      </html>
      `,
    };
    const mailOptions2 = {
      from: 'schedulease.official@gmail.com',
      to,
      subject,
      html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SchedulEase Event Notification</title>
        </head>
        
        <body style="font-family: 'Proxima Nova', 'proxima-nova', Helvetica, Arial sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; height: 100%; width: 100% !important; background-color: #ffffff;">
        
          <div style="padding: 20px 0; margin: 0 auto; max-width: 600px;">
        
            <table style="width: 80%; margin: 20px auto 0; margin: 0 auto; padding-bottom: 20px; border-bottom: 1px dashed #dadada;">
              <tr>
                <td style="text-align: center;">
                  <p>
                    <img style="max-width: 100%; vertical-align: middle;" alt="ScheduleEase" src="/logo/logo.png" >
                  </p>
                </td>
              </tr>
            </table>
        
            <!-- BODY -->
            <table style="width: 80%; margin: 20px auto 0; margin: 30px auto 0; font-size: 16px;">
              <tr>
                <td style="color: #1a1a1a; line-height: 22px;">
                  <p>
                    Hey ${to},
                  </p>
        
                  <!-- Event Details -->
                  <p>
                    A new event has been scheduled.
                  </p>
                  <p>
                    <strong>
                      Event Type:
                    </strong>
                    <br>
                    ${data.title}
                  </p>
                  <!-- Add more event details as needed -->
        
                  <!-- Event Date/Time -->
                  <p>
                    <strong>
                      Event Date/Time:
                    </strong>
                    <br>
                    ${dateOptions.map((date, index) => `${date} - ${timeOptions[index]}`).join('<br>')}
  
                  </p>
        
                  <!-- Location -->
                  <p>
                    <strong>
                      Location:
                    </strong>
                    <br>
                    Please join through Schedulease Meet.
                    <a href="https://schedulease.cloud/join/${event}/${to}" style="color: #0069ff;">Join Now</a>
                  </p>
        
                  <!-- Invitee Time Zone -->
                  <p>
                    <strong>
                      Invitee Time Zone:
                    </strong>
                    <br>
                    India Standard Time
                  </p>
        
                 
                
                </td>
              </tr>
            </table><!-- /BODY -->
        
            <!-- FOOTER -->
          <!-- /FOOTER -->
        
          </div>
        
        </body>
        
        </html>
        `,
    };
    try {
      if (subject == 'New Meeting Scheduled') {
        const info = await this.transporter.sendMail(mailOptions2);
        console.log('Email sent: ', info.response);
      } else {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
      }
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}
