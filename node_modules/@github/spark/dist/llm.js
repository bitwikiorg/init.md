// Earlier versions of our generation recommended models without the prefix
// that GH Models wants. For compatibility, correct those that were on the list explicitly.
const MODEL_FIXES = {
    'ai21-jamba-instruct': 'ai21-labs/ai21-jamba-instruct',
    'cohere-command-r-plus': 'cohere/cohere-command-r-plus',
    'cohere-command-r': 'cohere/cohere-command-r',
    'gpt-4o-mini': 'openai/gpt-4o-mini',
    'gpt-4o': 'openai/gpt-4o',
    'meta-llama-3.1-405b-instruct': 'meta/meta-llama-3.1-405b-instruct',
    'meta-llama-3.1-70b-instruct': 'meta/meta-llama-3.1-70b-instruct',
    'meta-llama-3.1-8b-instruct': 'meta/meta-llama-3.1-8b-instruct',
    'meta-llama-3-70b-instruct': 'meta/meta-llama-3-70b-instruct',
    'meta-llama-3-8b-instruct': 'meta/meta-llama-3-8b-instruct',
    'mistral-large-2407': 'mistral-ai/mistral-large-2407',
    'mistral-large': 'mistral-ai/mistral-large',
    'mistral-nemo': 'mistral-ai/mistral-nemo',
    'mistral-small': 'mistral-ai/mistral-small',
    'phi-3-medium-128K-instruct': 'microsoft/phi-3-medium-128K-instruct',
    'phi-3-medium-4K-instruct': 'microsoft/phi-3-medium-4K-instruct',
    'phi-3-mini-128K-instruct': 'microsoft/phi-3-mini-128K-instruct',
    'phi-3-mini-4K-instruct': 'microsoft/phi-3-mini-4K-instruct',
    'phi-3-small-128K-instruct': 'microsoft/phi-3-small-128K-instruct',
    'phi-3-small-8K-instruct': 'microsoft/phi-3-small-8K-instruct',
};
const fixModelName = (modelName) => {
    if (!modelName)
        return 'openai/gpt-4o';
    return MODEL_FIXES[modelName] || modelName;
};
async function llm(prompt, modelName, jsonMode) {
    const tidiedModelName = fixModelName(modelName);
    const response_format = { type: jsonMode ? 'json_object' : 'text' };
    const body = {
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: tidiedModelName,
        response_format,
    };
    const response = await fetch('/_spark/llm', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': `application/json`,
        },
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LLM request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const data = (await response.json());
    const content = data.choices[0].message.content;
    return content;
}
function llmPrompt(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

export { llm, llmPrompt };
//# sourceMappingURL=llm.js.map
