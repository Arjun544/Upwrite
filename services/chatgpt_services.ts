import axios, { AxiosResponse } from "axios";
import {
  LocalProposal,
  LocalQuestion,
  RemoteProposal,
  RemoteQuestion,
} from "../utils/types";

const api = axios.create();
const CHAT_GPT_APIKEY = process.env.CHAT_GPT_APIKEY;
const CHAT_GPT_URL = process.env.CHAT_GPT_URL;

export const generateProposal = async (
  proposal: string,
  about: string
): Promise<RemoteProposal> => {
  const { data }: AxiosResponse = await api.post(
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

  return { text: data.choices[0].text };
};

export const generateAnswer = async (
  question: string
): Promise<LocalQuestion> => {
  const { data }: AxiosResponse = await api.post(
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

  return { id: "", text: data.choices[0].text };
};
