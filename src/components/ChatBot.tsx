import { h } from "../pragma";
import { Configuration, OpenAIApi } from "openai";
import { Wreact } from "../Wreact";
export function ChatBot() {
  const [apiKey, setApiKey] = Wreact.useState("");
  const [search, setSearch] = Wreact.useState("");
  const [messages, setMessages] = Wreact.useState("");
  const ref = Wreact.useRef<HTMLInputElement>();

  return (
    <div className="mt-16">
      <h1 className="text-2xl">Chat with an AI</h1>
      <h2>API Key</h2>
      <div>
        <input
          type="text"
          onChange={(e: any) => {
            setApiKey(e.target.value);
          }}
          value={apiKey}
        />
      </div>
      <div className="mt-6">
        <h2>🤖What would you like to know?</h2>
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={(event: any) => {
            setSearch(event.target.value);
          }}
        />

        <button
          onClick={async () => {
            //TODO: why is the value of 'search' frozen???
            const search = ref.current?.value;
            if (!search) {
              console.log("no search");
              return;
            }

            const openai = new OpenAIApi(new Configuration({ apiKey: apiKey }));

            const completions = await openai
              .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "assistant",
                    content:
                      "you are a funny chatbot that will only ever respond to me with jokes",
                  },
                  { role: "user", content: search },
                ],
              })
              .catch(() => {
                alert("Invalid API Key");
              });

            // @ts-ignore
            setMessages(completions.data.choices[0].message.content);
          }}
        >
          Submit
        </button>
        <div>
          <p>{messages}</p>
        </div>
      </div>
    </div>
  );
}
