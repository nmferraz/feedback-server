import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {} },
  { sendMail: async () => {} }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,ncwjcbhjdbc",
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(submitFeedback.execute({
        type: "",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,ncwjcbhjdbc",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,ncwjcbhjdbc",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(submitFeedback.execute({
        type: "BUG",
        comment: "Is this a bug?",
        screenshot: "123",
      })
    ).rejects.toThrow();
  });
});
