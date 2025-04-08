/**
 * Prompt Module
 * This module provides a chat prompt component for AI model interactions.
 */

/**
 * Creates a chat prompt window for interacting with AI models
 * @class
 */
export class Prompt {
    /**
     * Create a new Prompt
     * @param {string} target - CSS selector for the prompt container
     */
    constructor(target) {
        this.playground = document.querySelector(target);
        this.promptWindow = this.playground.querySelector(".prompt-container");
        this.chatModel = "gpt 4o";
        this.promptList = [];

        // Bind methods
        this.answer = this.answer.bind(this);
        this.addPrompt = this.addPrompt.bind(this);
        this.setAIModel = this.setAIModel.bind(this);
    }

    /**
     * Set the AI model to use for responses
     * @param {string} model - Name of the AI model
     */
    setAIModel(model) {
        this.chatModel = model.toLowerCase();
    }

    /**
     * Add a new prompt message to the chat
     * @param {string} msg - The message text
     */
    addPrompt(msg) {
        if (this.promptList.length === 0)
            this.promptWindow.innerHTML = "";

        this.promptList.push(msg);

        const text = document.createElement("div");
        text.classList.add("tw-w-fit", "tw-ml-auto", "tw-p-2", "tw-rounded-xl", 
                            "tw-bg-gray-100", "dark:tw-bg-[#171717]");
        text.innerText = msg;

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `;

        this.promptWindow.innerHTML += promptELement;

        // Scroll to bottom of chat
        setTimeout(() => {
            this.promptWindow.scrollTop = this.promptWindow.scrollHeight;
        }, 150);

        // Generate AI response
        setTimeout(this.answer, 100);
    }

    /**
     * Generate an AI response based on the current model
     */
    answer() {
        let msg = {
            "gpt 4o": "Hello from Gpt 4o, add 3 prompts",
            "gemini": "Hello from Gemini, add 3 prompts",
            "llama 3": "Hello from Meta Llama 3, add 3 prompts",
            "claude": "Hello from Claude, add 3 prompts",
        }[this.chatModel];

        const text = document.createElement("div");
        text.classList.add("tw-w-fit", "tw-mr-auto", "tw-p-2");
        text.innerText = msg;

        const promptELement = `
            <div class="tw-w-full tw-flex tw-p-2">
                ${text.outerHTML.toString()}
            </div>
        `;
        
        this.promptWindow.innerHTML += promptELement;
    }
}