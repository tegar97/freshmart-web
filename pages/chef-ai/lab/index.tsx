import { useState } from "react";


const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "act like professional chef and know all recipe and ingredient if user ask out of context then ask user to ask in context",
};

function App() {
  const [messages, setMessages] = useState();
  const [isTyping, setIsTyping] = useState(false);


  async function submit() {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

   

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
          ...[
              {
                  role: "user",
                    content: messages,
            }
        ], // The messages from our chat with ChatGPT
      ],
      };
      console.log(apiRequestBody)

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
       
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
       
              <input placeholder="Type message here" value={messages}
                  onChange={(e) => setMessages(e.target.value)}
            />
            <button onClick={submit}  >send</button>
      </div>
    </div>
  );
}

export default App;
