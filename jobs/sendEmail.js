const nodeMailer = require("nodemailer")
const { worker_threads } = require("worker_threads");

async function main() {
  const transporter = nodeMailer.createTransport({
    host: "",
    port: 587,
    auth: {
      user: "apikey",
      pass: "",
    },
  });

  await transporter.sendMail({
    from: "min-todo", //SENDER
    to: worker_threads.receiver, //MULTIPLE RECEIVERS
    subject: worker_threads.subject, //EMAIL SUBJECT
    text: `You haven't completed ${worker_threads.subject} yet.`, //EMAIL BODY IN TEXT FORMAT
  });
}

main().catch((err) => console.log(err));
