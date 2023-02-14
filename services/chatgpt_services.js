import axios from "axios";

const api = axios.create();
const CHAT_GPT_APIKEY = process.env.NEXT_PUBLIC_CHAT_GPT_APIKEY;
const CHAT_GPT_URL = process.env.NEXT_PUBLIC_CHAT_GPT_URL;

export const generateProposal = async (proposal, about) =>
  await api.post(
    `${CHAT_GPT_URL}/completions`,
    {
      model: "text-davinci-003",
      prompt: `Write Upwork proposal for me with following job: ${proposal}.
       
       Use following data about me and my work experience: ${about}`,
      temperature: 0,
      max_tokens: 1000,
    },
    {
      headers: {
        Authorization: `Bearer ${CHAT_GPT_APIKEY}`,
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }
  );

export const generateAnswer = async (question) =>
  await api.post(
    `${CHAT_GPT_URL}/completions`,
    {
      model: "text-davinci-003",
      prompt: `Answer with following question based data provide above: ${question}`,
      temperature: 0,
      max_tokens: 1000,
    },
    {
      headers: {
        Authorization: `Bearer ${CHAT_GPT_APIKEY}`,
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }
  );
