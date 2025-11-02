import emailjs from "@emailjs/browser";

export const sendEmail = async (data: any) => {
  try {
    await emailjs.send("service_xxxxx", "template_xxxxx", data, "public_key_xxxxx");
    return { success: true };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false };
  }
};
