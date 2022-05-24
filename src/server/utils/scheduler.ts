import Bree from "bree";

export const EmailScheduler = (
  receiver: string,
  subject: string,
  timeout: "1h" | "2h" | "3h" | "4h"
) => {
  new Bree({
    jobs: [
      {
        name: "sendEmail",
        timeout,
        worker: {
          workerData: {
            receiver,
            subject,
          },
        },
      },
    ],
  });
};
