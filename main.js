//@ts-check

// 支持的语言列表
const supportLanguages = [
  ["auto", "auto"],
  ["zh-Hans", "zh-CN"],
  ["zh-Hant", "zh-TW"],
  ["en", "en"],
  ["yue", "粤语"],
  ["wyw", "古文"],
  ["ja", "ja"],
  ["ko", "ko"],
  ["fr", "fr"],
  ["de", "de"],
  ["es", "es"],
  ["it", "it"],
  ["ru", "ru"],
  ["pt", "pt"],
  ["nl", "nl"],
  ["pl", "pl"],
  ["ar", "ar"],
  ["af", "af"],
  ["am", "am"],
  ["az", "az"],
  ["be", "be"],
  ["bg", "bg"],
  ["bn", "bn"],
  ["bs", "bs"],
  ["ca", "ca"],
  ["ceb", "ceb"],
  ["co", "co"],
  ["cs", "cs"],
  ["cy", "cy"],
  ["da", "da"],
  ["el", "el"],
  ["eo", "eo"],
  ["et", "et"],
  ["eu", "eu"],
  ["fa", "fa"],
  ["fi", "fi"],
  ["fj", "fj"],
  ["fy", "fy"],
  ["ga", "ga"],
  ["gd", "gd"],
  ["gl", "gl"],
  ["gu", "gu"],
  ["ha", "ha"],
  ["haw", "haw"],
  ["he", "he"],
  ["hi", "hi"],
  ["hmn", "hmn"],
  ["hr", "hr"],
  ["ht", "ht"],
  ["hu", "hu"],
  ["hy", "hy"],
  ["id", "id"],
  ["ig", "ig"],
  ["is", "is"],
  ["jw", "jw"],
  ["ka", "ka"],
  ["kk", "kk"],
  ["km", "km"],
  ["kn", "kn"],
  ["ku", "ku"],
  ["ky", "ky"],
  ["la", "lo"],
  ["lb", "lb"],
  ["lo", "lo"],
  ["lt", "lt"],
  ["lv", "lv"],
  ["mg", "mg"],
  ["mi", "mi"],
  ["mk", "mk"],
  ["ml", "ml"],
  ["mn", "mn"],
  ["mr", "mr"],
  ["ms", "ms"],
  ["mt", "mt"],
  ["my", "my"],
  ["ne", "ne"],
  ["no", "no"],
  ["ny", "ny"],
  ["or", "or"],
  ["pa", "pa"],
  ["ps", "ps"],
  ["ro", "ro"],
  ["rw", "rw"],
  ["si", "si"],
  ["sk", "sk"],
  ["sl", "sl"],
  ["sm", "sm"],
  ["sn", "sn"],
  ["so", "so"],
  ["sq", "sq"],
  ["sr", "sr"],
  ["sr-Cyrl", "sr"],
  ["sr-Latn", "sr"],
  ["st", "st"],
  ["su", "su"],
  ["sv", "sv"],
  ["sw", "sw"],
  ["ta", "ta"],
  ["te", "te"],
  ["tg", "tg"],
  ["th", "th"],
  ["tk", "tk"],
  ["tl", "tl"],
  ["tr", "tr"],
  ["tt", "tt"],
  ["ug", "ug"],
  ["uk", "uk"],
  ["ur", "ur"],
  ["uz", "uz"],
  ["vi", "vi"],
  ["xh", "xh"],
  ["yi", "yi"],
  ["yo", "yo"],
  ["zu", "zu"],
];

const langMap = new Map(supportLanguages.map(([key, value]) => [key, value]));

// HTTP错误代码映射
const HttpErrorCodes = {
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "请求过于频繁，请慢一点。OpenAI 对您在 API 上的请求实施速率限制。或是您的 API credits 已超支，需要充值。好消息是您仍然可以使用官方的 Web 端聊天页面",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

// 工具函数
function ensureHttpsAndNoTrailingSlash(url) {
    const hasProtocol = /^[a-z]+:\/\//i.test(url);
    const modifiedUrl = hasProtocol ? url : 'https://' + url;
    return modifiedUrl.endsWith('/') ? modifiedUrl.slice(0, -1) : modifiedUrl;
}

function buildHeader(apiKey) {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };
}

function getSupportLanguages() {
    return supportLanguages.map(([standardLang]) => standardLang);
}

function tts(query, completion) {
    if (!langMap.get(query.lang)) {
        completion(
            {
                error: {
                    type: 'unsupportLanguage',
                    message: 'unsupport language',
                }
            }
        );
        return;
    }

    const {
        apiKey,
        apiUrl,
        model,
        customModel,
        voice,
        customVoice,
        prompt
    } = $option;

    if (!apiKey) {
        completion(
            {
                error: {
                    type: 'secretKey',
                    message: '配置错误 - 请确保您在插件配置中填入了正确的 API Key'
                }
            }
        );
        return;
    }

    const baseUrl = ensureHttpsAndNoTrailingSlash(apiUrl || "https://api.openai.com");
    const apiUrlPath = baseUrl.includes("gateway.ai.cloudflare.com") ? "/audio/speech" : "/v1/audio/speech";

    const header = buildHeader(apiKey);

    // 确定使用的模型
    const selectedModel = customModel || model || "tts-1";
    
    // 确定使用的声音
    const selectedVoice = customVoice || voice || "alloy";

    const body = {
        model: selectedModel,
        input: query.text,
        voice: selectedVoice
    };

    // 如果有prompt，则添加到请求体中
    if (prompt && prompt.trim()) {
        body.prompt = prompt.trim();
    }

    (async () => {
        const response = await $http.request(
            {
                method: "POST",
                url: baseUrl + apiUrlPath,
                header: header,
                body: body,
            }
        );

        if (response.error) {
            const { statusCode } = response.response;
            const reason = (statusCode >= 400 && statusCode < 500) ? "param" : "api";
            completion(
                {
                    error: {
                        type: reason,
                        message: `接口响应错误 - ${HttpErrorCodes[statusCode]}`,
                        addition: `${JSON.stringify(response)}`,
                    },
                }
            )
        } else {
            completion(
                {
                    result: {
                        type: "base64",
                        value: response.rawData.toBase64()
                    }
                }
            )
        }
    })().catch((err) => {
        if ('response' in err) {
            const { statusCode } = err.response;
            const reason = (statusCode >= 400 && statusCode < 500) ? "param" : "api";
            completion(
                {
                    error: {
                        type: reason,
                        message: `接口响应错误 - ${HttpErrorCodes[statusCode]}`,
                        addition: `${JSON.stringify(err)}`,
                    },
                }
            )
        } else {
            completion(
                {
                    error: {
                        ...err,
                        type: err.type || "unknown",
                        message: err.message || "Unknown error",
                    },
                }
            )
        }
    });
}

exports.supportLanguages = getSupportLanguages;
exports.tts = tts;
