import { Resend } from "resend";

/**
 * Lazy initialization of the Resend client
 * Ensures process.env variables are properly loaded from dotenv
 */
let resendClient = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ [Resend] RESEND_API_KEY is not configured in .env. Email sending will be skipped.");
      return null;
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Default sender address.
 * To remove 'onboarding@resend.dev' branding, verify your domain (e.g. boot2boot.com)
 * in Resend Dashboard -> Domains, then set RESEND_FROM_EMAIL="Boot2Boot <inquiry@boot2boot.com>"
 */
const getSenderEmail = () => {
  return process.env.RESEND_FROM_EMAIL || "Boot2Boot <inquiry@boot2boot.com>";
};

/**
 * Send notification email to the owner/admin when a contact form is submitted
 */
export async function sendContactNotification(submission) {
  const resend = getResendClient();
  if (!resend) return null;

  const recipient = process.env.OWNER_EMAIL || "boot2boot2022@gmail.com";
  const fromEmail = getSenderEmail();

  const servicesList = Array.isArray(submission.services) && submission.services.length > 0
    ? submission.services
      .map(
        (s) =>
          `<span style="display:inline-block;padding:5px 12px;margin:3px 2px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:16px;font-size:12px;font-weight:600;color:#3730a3;">${s}</span>`
      )
      .join(" ")
    : "<em style='color:#9ca3af;'>None selected</em>";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
  color: #181818;
">

  <div style="
    max-width: 540px;
    margin: 30px auto;
    background-color: #ffffff;
    border: 1px solid #dedede;
    border-radius: 16px;
    overflow: hidden;
    box-sizing: border-box;
  ">

    <!-- Header -->
    <div style="display: flex; justify-content: center; width: 100%;">
    <div style="background: linear-gradient(135deg, #09090b 0%, #18181b 100%); padding: 26px 28px; border-bottom: 3px solid #E0FE9B; text-align: center; max-width: 600px; width: 100%;">
    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 300; letter-spacing: -0.5px;">Message For Boot2Boot Team</h1>
    </div>
    </div>

    <!-- Inner Content -->
    <div style="padding: 26px 28px;">

      <!-- Inquiry Title -->
      <div style="
        padding-bottom: 20px;
        border-bottom: 1px solid #eaeaea;
      ">
        <h2 style="
          margin: 0;
          font-size: 20px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: -0.5px;
          color: #171717;
        ">
          New Client Inquiry
        </h2>

        <p style="
          margin: 6px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: #737373;
        ">
          A new message has been submitted through your website.
        </p>
      </div>

      <!-- Contact Information -->
      <div style="padding-top: 24px;">

      <h2 style="
        margin: 0 0 18px;
        font-size: 14px;
        font-weight: 600;
        color: #171717;
      ">
        Contact Information
      </h2>

      <!-- Client Name -->
      <div style="margin-bottom: 16px;">
        <p style="
          margin: 0 0 5px;
          font-size: 11px;
          font-weight: 600;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          Full Name
        </p>

        <p style="
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 500;
          color: #171717;
          overflow-wrap: anywhere;
        ">
          ${submission.name}
        </p>
      </div>

      <!-- Email -->
      <div style="margin-bottom: 16px;">
        <p style="
          margin: 0 0 5px;
          font-size: 11px;
          font-weight: 600;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          Email Address
        </p>

        <p style="
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: #171717;
          overflow-wrap: anywhere;
        ">
          <a
            href="mailto:${submission.email}"
            style="color: #171717; text-decoration: none;"
          >
            ${submission.email}
          </a>
        </p>
      </div>

      <!-- Phone -->
      <div style="margin-bottom: 16px;">
        <p style="
          margin: 0 0 5px;
          font-size: 11px;
          font-weight: 600;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          Phone Number
        </p>

        <p style="
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: #171717;
        ">
          ${submission.phone || "Not provided"}
        </p>
      </div>

      <!-- Organization -->
      <div style="margin-bottom: 22px;">
        <p style="
          margin: 0 0 5px;
          font-size: 11px;
          font-weight: 600;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          Organization
        </p>

        <p style="
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: #171717;
          overflow-wrap: anywhere;
        ">
          ${submission.organization || "Not provided"}
        </p>
      </div>

      <!-- Services -->
      <div style="
        padding-top: 20px;
        border-top: 1px solid #eaeaea;
      ">

        <h2 style="
          margin: 0 0 12px;
          font-size: 14px;
          font-weight: 600;
          color: #171717;
        ">
          Services of Interest
        </h2>

        <div style="font-size: 0; line-height: 2;">
          ${servicesList}
        </div>

      </div>

      <!-- Client Message -->
      <div style="margin-top: 24px;">

        <h2 style="
          margin: 0 0 12px;
          font-size: 14px;
          font-weight: 600;
          color: #171717;
        ">
          Message from Client
        </h2>

        <div style="
          padding: 16px;
          background-color: #f7f7f7;
          border-radius: 10px;
        ">

          <p style="
            margin: 0;
            font-size: 14px;
            line-height: 1.8;
            color: #404040;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          ">${submission.message || "No message provided."}</p>

        </div>

      </div>


      <!-- Footer -->
      <div style="
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid #eaeaea;
        text-align: center;
      ">

        <p style="
          margin: 0;
          font-size: 11px;
          line-height: 1.8;
          color: #737373;
        ">
          Submitted on ${new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  })}
        </p>

        <p style="
          margin: 4px 0 0;
          font-size: 11px;
          color: #a3a3a3;
        ">
          Sent securely via Boot2Boot
        </p>

      </div>

    </div>

    </div>

  </div>

</body>
</html>
`;



  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipient],
      replyTo: submission.email,
      subject: `New Project Opportunity — ${submission.name} | Boot2Boot`,
      html: htmlContent,
    });

    if (error) {
      console.error("❌ [Resend] Failed to send owner notification:", error);
      throw error;
    }

    console.log(`✅ [Resend] Notification email sent to ${recipient} (Email ID: ${data?.id})`);
    return data;
  } catch (err) {
    console.error("❌ [Resend] Error in sendContactNotification:", err?.message || err);
    throw err;
  }
}

/**
 * Send an automated confirmation email to the user
 */
export async function sendUserConfirmation(submission) {
  const resend = getResendClient();
  if (!resend || !submission.email) return null;

  const fromEmail = getSenderEmail();
  const replyToEmail = process.env.RESEND_REPLY_TO || "inquiry@boot2boot.com";

  const servicesText = Array.isArray(submission.services) && submission.services.length > 0
    ? submission.services.join(", ")
    : "General Consultation";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e5e7eb;">
          <div style="background: linear-gradient(135deg, #09090b 0%, #18181b 100%); padding: 28px 30px; text-align: left; border-bottom: 3px solid #E0FE9B;">
            <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Boot2Boot</h1>
            <p style="margin: 6px 0 0 0; color: #E0FE9B; font-size: 13px; font-weight: 500;">Digital Marketing Agency</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="margin: 0 0 12px 0; color: #09090b; font-size: 19px; font-weight: 600;">
              Thank you for reaching out, ${submission.name}!
            </h2>
            <p style="color: #52525b; line-height: 1.6; font-size: 14px; margin: 0 0 20px 0;">
              We have received your project details. Our team is already reviewing your inquiry and will connect with you within 24 business hours to discuss next steps.
            </p>

            <div style="margin: 20px 0; padding: 18px; background: #fbfbfa; border-radius: 8px; border: 1px solid #f4f4f5;">
              <h4 style="margin: 0 0 10px 0; color: #18181b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                Summary of your inquiry
              </h4>
              <p style="margin: 6px 0; color: #52525b; font-size: 14px;">
                <strong style="color: #18181b;">Interested Services:</strong> ${servicesText}
              </p>
              ${submission.organization ? `<p style="margin: 6px 0; color: #52525b; font-size: 14px;"><strong style="color: #18181b;">Organization:</strong> ${submission.organization}</p>` : ""}
              ${submission.message ? `<p style="margin: 6px 0; color: #52525b; font-size: 14px;"><strong style="color: #18181b;">Your Message:</strong> "${submission.message}"</p>` : ""}
            </div>

            <p style="margin: 24px 0 0 0; color: #52525b; font-size: 14px; line-height: 1.6;">
              In the meantime, feel free to explore our case studies and latest updates at <a href="https://boot2boot.com" style="color: #18181b; font-weight: 600; text-decoration: underline;">boot2boot.com</a>.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f4f4f5;">
              <p style="margin: 0; color: #18181b; font-size: 14px; font-weight: 600;">Best regards,</p>
              <p style="margin: 2px 0 0 0; color: #71717a; font-size: 13px;">Team Boot2Boot</p>
              <p style="margin: 2px 0 0 0; color: #71717a; font-size: 13px;">
                <a href="mailto:${replyToEmail}" style="color: #71717a; text-decoration: none;">${replyToEmail}</a> &bull; <a href="https://boot2boot.com" style="color: #71717a; text-decoration: none;">boot2boot.com</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [submission.email],
      replyTo: replyToEmail,
      subject: `We received your request | Boot2Boot`,
      html: htmlContent,
    });

    if (error) {
      console.error("❌ [Resend] Failed to send user confirmation:", error);
      throw error;
    }

    console.log(`✅ [Resend] Confirmation email sent to ${submission.email} (Email ID: ${data?.id})`);
    return data;
  } catch (err) {
    console.error("❌ [Resend] Error in sendUserConfirmation:", err?.message || err);
    throw err;
  }
}

/**
 * Sends both owner notification and user confirmation concurrently
 */
export async function sendFormEmails(submission) {
  const results = await Promise.allSettled([
    sendContactNotification(submission),
    sendUserConfirmation(submission),
  ]);

  results.forEach((res, index) => {
    const type = index === 0 ? "Owner Notification" : "User Confirmation";
    if (res.status === "rejected") {
      console.error(`❌ [Resend EmailService] ${type} failed:`, res.reason?.message || res.reason);
    }
  });

  return results;
}
