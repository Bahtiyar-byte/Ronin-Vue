interface OpenAiPayload {}

interface IOpenAiService {
  getWidget(
    payload: OpenAiPayload,
    userId: string,
    roleId: string,
  ): Promise<string | { value: null; error: any }>;
}

export { IOpenAiService };
