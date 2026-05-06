export async function getAiResponse({ message, chatId, onContent, onChat, onComplete }) {

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            content: message, chatId
        })
    })

    const stream = res.body;

    const decoder = new TextDecoder();

    for await (const chunk of stream) {
        const response = decoder.decode(chunk)

        response.split('\n').forEach(line => {

            if (line.startsWith("data:")) {
                onContent(JSON.parse(line.replaceAll("data:", "")).text)
            }
            if (line.startsWith("title:")) {
                const chat = JSON.parse(line.replace("title: ", ""))
                onChat({
                    id: chat.chatId,
                    title: chat.title,
                    messages: []
                })
            }
        })

    }

    onComplete()
}

export async function fetchChatHistory() {
    const res = await fetch("/api/chat", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch chat history");
    }

    const data = await res.json();
    return data.chats;
}

export async function fetchChatById(id) {
    const res = await fetch(`/api/chat/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch chat");
    }

    const data = await res.json();
    return data.chat;
}

export async function deleteChatById(id) {
    const res = await fetch(`/api/chat/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to delete chat");
    }

    const data = await res.json();
    return data;
}