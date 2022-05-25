const worker_threads = require("worker_threads");
const AWS = require("aws-sdk");
const { PrismaClient } = require("@prisma/client");

const SES = new AWS.SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

async function main() {
  const params = {
    Destination: {
      ToAddresses: [worker_threads.workerData.receiver],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Friendly reminder sent by Tokei about the task you haven't completed yet. Get it done!`,
        },
      },

      Subject: {
        Charset: "UTF-8",
        Data: worker_threads.workerData.subject,
      },
    },
    Source: process.env.AWS_SES_VERIFIED_EMAIL ?? "",
  };
  // SES.sendEmail(params, (err) => {
  //   if (err) throw err;
  //   return true;
  // });
  await new PrismaClient().todo.update({
    where: {
      id: worker_threads.workerData.todoId,
    },
    data: {
      reminderScheduled: false,
    },
  });
}

main()
  .then(() => console.log("Mail sent."))
  .catch((err) => console.log("Error occured.", err));
