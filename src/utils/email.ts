import emailjs from "@emailjs/browser";

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail({ name, email, message }: EmailParams): Promise<boolean> { // ✅ Fixed type
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name, email, message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}