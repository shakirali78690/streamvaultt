import type { ContentRequest, IssueReport } from "./storage";

// Email addresses
const ADMIN_EMAIL = "contact@streamvault.live";
// Temporary: Use verified email until SPF records are verified in Resend
const VERIFIED_EMAIL = "yawaraquil121@gmail.com";
// Set to true once all DNS records show "Verified" in Resend dashboard
const DOMAIN_FULLY_VERIFIED = false;

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

// Email notification function using Resend
async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      // Fallback to console logging if no API key
      console.log("\n" + "=".repeat(60));
      console.log("📧 EMAIL NOTIFICATION (Console Only - No API Key)");
      console.log("=".repeat(60));
      console.log("To:", data.to);
      console.log("Subject:", data.subject);
      console.log("-".repeat(60));
      console.log(data.text);
      console.log("=".repeat(60) + "\n");
      return true;
    }

    // Use verified email until domain SPF records are verified
    const recipientEmail = DOMAIN_FULLY_VERIFIED ? data.to : VERIFIED_EMAIL;
    const fromEmail = DOMAIN_FULLY_VERIFIED 
      ? "StreamVault <noreply@streamvault.live>"
      : "StreamVault <onboarding@resend.dev>";
    
    // Send email via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject: data.subject,
        html: data.html,
        text: data.text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ Failed to send email via Resend:", error);
      
      // Log to console as fallback
      console.log("\n📧 Email (failed to send, showing content):");
      console.log("To:", data.to);
      console.log("Subject:", data.subject);
      console.log(data.text);
      return false;
    }

    const result = await response.json();
    console.log("✅ Email sent successfully via Resend");
    console.log("   From:", fromEmail);
    console.log("   To:", recipientEmail);
    if (!DOMAIN_FULLY_VERIFIED) {
      console.log("   ⚠️  Using verified email until SPF records propagate");
      console.log("   📝 Intended recipient:", data.to);
    }
    console.log("   Subject:", data.subject);
    console.log("   Email ID:", result.id);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    
    // Log to console as fallback
    console.log("\n📧 Email (error occurred, showing content):");
    console.log("To:", data.to);
    console.log("Subject:", data.subject);
    console.log(data.text);
    return false;
  }
}

export async function sendContentRequestEmail(request: ContentRequest): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Content Request</h2>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Type:</strong> ${request.contentType}</p>
        <p><strong>Title:</strong> ${request.title}</p>
        ${request.year ? `<p><strong>Year:</strong> ${request.year}</p>` : ''}
        ${request.genre ? `<p><strong>Genre:</strong> ${request.genre}</p>` : ''}
        ${request.description ? `<p><strong>Description:</strong> ${request.description}</p>` : ''}
        ${request.reason ? `<p><strong>Reason:</strong> ${request.reason}</p>` : ''}
        ${request.email ? `<p><strong>User Email:</strong> ${request.email}</p>` : ''}
        <p><strong>Request Count:</strong> ${request.requestCount}</p>
        <p><strong>Submitted:</strong> ${new Date(request.createdAt).toLocaleString()}</p>
      </div>
      
      <p style="color: #666; font-size: 14px;">
        This request has been submitted ${request.requestCount} time(s).
      </p>
    </div>
  `;

  const text = `
New Content Request

Type: ${request.contentType}
Title: ${request.title}
${request.year ? `Year: ${request.year}
` : ''}${request.genre ? `Genre: ${request.genre}
` : ''}${request.description ? `Description: ${request.description}
` : ''}${request.reason ? `Reason: ${request.reason}
` : ''}${request.email ? `User Email: ${request.email}
` : ''}Request Count: ${request.requestCount}
Submitted: ${new Date(request.createdAt).toLocaleString()}
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Content Request: ${request.title} (${request.contentType})`,
    html,
    text,
  });
}

export async function sendIssueReportEmail(report: IssueReport): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d32f2f;">New Issue Report</h2>
      
      <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800;">
        <p><strong>Issue Type:</strong> ${report.issueType}</p>
        <p><strong>Title:</strong> ${report.title}</p>
        <p><strong>Description:</strong> ${report.description}</p>
        ${report.url ? `<p><strong>Page URL:</strong> <a href="${report.url}">${report.url}</a></p>` : ''}
        ${report.email ? `<p><strong>User Email:</strong> ${report.email}</p>` : ''}
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Submitted:</strong> ${new Date(report.createdAt).toLocaleString()}</p>
      </div>
      
      <p style="color: #666; font-size: 14px;">
        Please address this issue as soon as possible.
      </p>
    </div>
  `;

  const text = `
New Issue Report

Issue Type: ${report.issueType}
Title: ${report.title}
Description: ${report.description}
${report.url ? `Page URL: ${report.url}
` : ''}${report.email ? `User Email: ${report.email}
` : ''}Status: ${report.status}
Submitted: ${new Date(report.createdAt).toLocaleString()}
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `Issue Report: ${report.issueType} - ${report.title}`,
    html,
    text,
  });
}
