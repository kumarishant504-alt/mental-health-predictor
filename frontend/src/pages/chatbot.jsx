
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    Bot,
    Send,
    User,
    Sparkles,
} from "lucide-react";

import DashboardLayout from "../layouts/dashboardlayout";
import { sendChatMessage } from "../services/api";


function Chatbot() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text:
                "Hi! I'm MindWell Assistant. Ask me anything about your latest wellness assessment, sleep, screen usage, study routine, physical activity, or daily habits.",
        },
    ]);


    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) {
            return;
        }

        const savedAssessment =
            localStorage.getItem("latestPrediction");

        const assessment = savedAssessment
            ? JSON.parse(savedAssessment)
            : null;

        console.log("ASSESSMENT BEING SENT:", assessment);

        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                text: trimmedMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const data = await sendChatMessage(
                trimmedMessage,
                assessment
            );

            console.log("CHATBOT RESPONSE:", data);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    text: data.response,
                },
            ]);
        } catch (error) {
            console.error("CHAT ERROR:", error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    text:
                        "I'm unable to connect to the AI assistant right now. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };


    return (
        <DashboardLayout>
            <div className="mx-auto flex max-w-5xl flex-col">

                <section className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                            <Sparkles size={22} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-emerald-600">
                                AI Wellness Assistant
                            </p>

                            <h1 className="text-3xl font-bold text-slate-900">
                                Ask MindWell
                            </h1>
                        </div>
                    </div>

                    <p className="mt-3 text-slate-500">
                        Get personalized guidance based on your latest
                        assessment and daily lifestyle patterns.
                    </p>
                </section>


                <div className="flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                        <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                            <Bot size={20} />
                        </div>

                        <div>
                            <p className="font-semibold text-slate-900">
                                MindWell Assistant
                            </p>

                            <p className="text-xs text-slate-500">
                                Personalized wellness guidance
                            </p>
                        </div>
                    </div>


                    <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-6">

                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 ${item.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >

                                {item.role === "assistant" && (
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <Bot size={18} />
                                    </div>
                                )}


                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user"
                                            ? "bg-emerald-600 text-white"
                                            : "bg-white text-slate-700 shadow-sm"
                                        }`}
                                >
                                    {item.role === "assistant" ? (
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ children }) => (
                                                    <h1 className="mb-3 text-lg font-bold text-slate-900">
                                                        {children}
                                                    </h1>
                                                ),

                                                h2: ({ children }) => (
                                                    <h2 className="mb-2 mt-4 text-base font-bold text-slate-900">
                                                        {children}
                                                    </h2>
                                                ),

                                                h3: ({ children }) => (
                                                    <h3 className="mb-2 mt-3 text-sm font-bold text-slate-900">
                                                        {children}
                                                    </h3>
                                                ),

                                                p: ({ children }) => (
                                                    <p className="mb-3 leading-6 last:mb-0">
                                                        {children}
                                                    </p>
                                                ),

                                                ul: ({ children }) => (
                                                    <ul className="mb-3 list-disc space-y-2 pl-5">
                                                        {children}
                                                    </ul>
                                                ),

                                                ol: ({ children }) => (
                                                    <ol className="mb-3 list-decimal space-y-2 pl-5">
                                                        {children}
                                                    </ol>
                                                ),

                                                li: ({ children }) => (
                                                    <li className="leading-6">
                                                        {children}
                                                    </li>
                                                ),

                                                strong: ({ children }) => (
                                                    <strong className="font-semibold text-slate-900">
                                                        {children}
                                                    </strong>
                                                ),
                                            }}
                                        >
                                            {item.text}
                                        </ReactMarkdown>
                                    ) : (
                                        item.text
                                    )}
                                </div>


                                {item.role === "user" && (
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                                        <User size={18} />
                                    </div>
                                )}

                            </div>
                        ))}


                        {loading && (
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <Bot size={18} />
                                </div>

                                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                                    Thinking...
                                </div>
                            </div>
                        )}

                    </div>


                    <div className="border-t border-slate-200 bg-white p-4">
                        <div className="flex items-end gap-3">

                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                rows={2}
                                placeholder="Ask about your wellness assessment..."
                                className="min-h-[48px] flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />

                            <button
                                onClick={handleSend}
                                disabled={loading || !message.trim()}
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>

                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                            MindWell provides general wellness information and
                            is not a substitute for professional medical care.
                        </p>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}


export default Chatbot;