import { MailAdapter } from "./../adapters/mail-adapter";
import { FeedbacksRepository } from "./../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    if(!type) {
      throw new Error("It's necessary to have a type.");
    }

    if(!comment) {
      throw new Error("It's necessary to have a comment.");
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "You just receive a new feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color; #111;">`,
        `<h1>New feedback!</h1>`,
        `<p>Type: ${type}</p>`,
        `<p>Description: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
