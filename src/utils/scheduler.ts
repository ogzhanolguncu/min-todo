import Bree from "bree";
import path from "node:path";
import appRoot from "app-root-path";

export const BreeBase = new Bree({
  root: false, // * here
  errorHandler: (error, workerMetaData) => {
    console.log(error);
  },
});

export const EmailScheduler = (
  receiver: string,
  subject: string,
  timeout: "1H" | "2H" | "3H" | "4H",
  todoId: string
) => {
  BreeBase.add({
    name: `sendEmail-${subject.replaceAll(" ", "-")}`,
    timeout: "10s",
    path: `${appRoot.path}/jobs/sendEmail.js`,
    worker: {
      workerData: {
        receiver,
        subject,
        todoId,
      },
    },
  });
  BreeBase.start(`sendEmail-${subject.replaceAll(" ", "-")}`);
};
