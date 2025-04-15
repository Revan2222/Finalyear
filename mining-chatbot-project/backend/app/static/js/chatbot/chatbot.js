const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const chatHistoryList = document.getElementById("chat-history");
const voiceBtn = document.getElementById("voice-btn");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Format AI response: remove *, bold, newlines, bullets
function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
    .replace(/\*(.*?)\*/g, '$1')                     // remove single asterisks
    .replace(/(?:\r\n|\r|\n)/g, '<br>')              // line breaks
    .replace(/^- (.*)$/gm, '<li>$1</li>')            // bullet points
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');      // wrap bullets in ul
}

function saveChat(prompt, response) {
  chatHistory.push({ prompt, response });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  renderChatHistory();
}

function renderChatHistory() {
  chatHistoryList.innerHTML = "";
  chatHistory.forEach((chat, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerText = chat.prompt.slice(0, 30) + "...";
    text.onclick = () => loadChat(index);

    const del = document.createElement("button");
    del.innerText = "🗑️";
    del.className = "delete-chat";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteChat(index);
    };

    li.appendChild(text);
    li.appendChild(del);
    chatHistoryList.appendChild(li);
  });
}

function loadChat(index) {
  chatBox.innerHTML = "";
  const chat = chatHistory[index];
  addMessage("user", chat.prompt);
  typeText("ai", chat.response);
}

function deleteChat(index) {
  chatHistory.splice(index, 1);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  renderChatHistory();
}

function addMessage(role, message) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.innerText = message;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function typeText(role, message) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  chatBox.appendChild(bubble);

  const formattedMessage = formatResponse(message);
  let i = 0;
  let tempText = "";

  const interval = setInterval(() => {
    if (i < formattedMessage.length) {
      tempText += formattedMessage.charAt(i);
      bubble.innerHTML = tempText;
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

async function sendMessage() {
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  inputField.value = "";

  const loadingMsg = document.createElement("div");
  loadingMsg.className = "bubble ai";
  loadingMsg.innerText = "🤖 Thinking...";
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://127.0.0.1:5000/submit-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    loadingMsg.remove();
    typeText("ai", data.response);
    saveChat(userMessage, data.response);
  } catch (err) {
    loadingMsg.innerText = "⚠️ Error: " + err.message;
  }
}

// Handle Enter Key
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Voice Input
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;

voiceBtn.onclick = () => recognition.start();
recognition.onresult = (e) => {
  inputField.value = e.results[0][0].transcript;
};

// New Chat
function startNewChat() {
  inputField.value = "";
  chatBox.innerHTML = '<p class="placeholder">Ask any mining-related question to get started.</p>';
}

renderChatHistory();
