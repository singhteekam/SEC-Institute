const Student = require("../models/Student");
const sendEmail = require("../services/mailer");

exports.getProfileInfo= async (req, res) => {
  try {
    const enrollmentNumber = req.query.enrollmentNumber; // Assuming user ID is stored in req.user
    const student = await Student.findOne({
      enrollmentNumber: enrollmentNumber
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }     
}

exports.contactUs = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const receiver = process.env.EMAIL; // Assuming you want to send the email to the admin or support email
    const subject = `Contact Us Message from ${name}`;
    const html = `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Message:</strong> ${message}</p>
`;
     sendEmail(receiver, subject, html)
      .then((response) => {
        console.log(`Email sent to ${receiver}:`, response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    console.log("Contact Us Message:", { name, email, phone, message });

    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error in contact us:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
