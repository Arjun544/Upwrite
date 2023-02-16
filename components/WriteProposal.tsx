import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import uuid from "react-uuid";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { MdOutlineError } from "react-icons/md";

import { generateAnswer, generateProposal } from "../services/chatgpt_services";
import Btn_Loader from "./Btn_Loader";
import { AppContext } from "../pages/_app";
import { AppContent, LocalQuestion, RemoteQuestion } from "../utils/types";

interface Props {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const WriteProposal = (props: Props) => {
  const {
    setProposal,
    descriptionInput,
    setDescriptionInput,
    about,
    setAbout,
    questions,
    setQuestions,
    setCurrentStep,
  } = useContext<AppContent>(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isReqTakingLong, setIsReqTakingLong] = useState<boolean>(false);

  const handleAddQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        id: uuid(),
        text: "",
      },
    ]);
  };

  const handleRemoveQuestion = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ): void => {
    e.preventDefault();
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };

  const handleGenerate = async (): Promise<void> => {
    if (descriptionInput === "") {
      toast("Job description can't be empty", {
        icon: "🥺",
      });
    } else if (descriptionInput.length <= 10) {
      toast("Looks like dummy Job description", {
        icon: "🥺",
      });
    } else if (about === "") {
      toast("Write something about you", {
        icon: "😍",
      });
    } else if (about.length <= 10) {
      toast("Looks like a dummy information about you", {
        icon: "🥺",
      });
    } else {
      let timeout: ReturnType<typeof setTimeout>;
      try {
        timeout = setTimeout(() => {
          setIsReqTakingLong(true);
        }, 8000);

        setIsLoading(true);
        setHasError(false);
        const { text: remoteProposal } = await generateProposal(
          descriptionInput,
          about
        );
        var answers: Array<RemoteQuestion> = [];
        if (questions.length > 0) {
          for (const question of questions.filter(
            (ques) => ques.text.length > 0
          )) {
            const { question: remoteQuestion } = await generateAnswer(
              question.text
            );
            answers.push({
              question: question.text,
              answer: remoteQuestion,
            });
          }
          console.log("answers", answers);
          setProposal({
            text: remoteProposal,
            answers: answers,
            description: descriptionInput,
            about: about,
          });
        } else {
          setProposal({
            text: remoteProposal,
            answers: [],
            description: descriptionInput,
            about: about,
          });
        }
        setIsLoading(false);
        setCurrentStep(2);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
        clearTimeout(timeout);
        setIsReqTakingLong(false);
        console.log(error);
        toast("The server had an error. Please try again!", {
          icon: "🥺",
        });
      }
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark md:text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <div className="flex items-center gap-4">
          {isReqTakingLong && (
            <div className="hidden items-center gap-2 animate-pulse md:flex">
              <h1 className="text-xl">🥺</h1>
              <h1 className="tracking-wider text-xs text-gray-500">
                High server traffic causing delay ...
              </h1>
            </div>
          )}
          <button
            onClick={handleGenerate}
            className={`flex items-center justify-center gap-4 w-16 md:w-48 shadow-md text-sm rounded-xl py-3 px-0 md:px-8 ${
              hasError ? "bg-red-400" : "bg-primary"
            }`}
          >
            {isLoading ? (
              <Btn_Loader text={"Generating"} />
            ) : hasError ? (
              <>
                <MdOutlineError size={20} />
                <h1 className="tracking-wider hidden md:flex">Try again</h1>
              </>
            ) : (
              <>
                <HiLightningBolt />
                <h1 className="tracking-wider hidden md:flex">Generate</h1>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col grow lg:flex-row gap-8">
        <div className="flex flex-col grow bg-white">
          <div className="flex flex-col grow">
            <label
              htmlFor="message"
              className="text-sm tracking-wider text-dark"
            >
              Job Description
            </label>
            <textarea
              id="Job description"
              name="text"
              value={descriptionInput}
              className="block p-4 mt-2 grow text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
              placeholder="Copy and paste job description here..."
              onChange={(e) => setDescriptionInput(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col grow">
            <label
              htmlFor="message"
              className="text-sm tracking-wider text-dark mt-5"
            >
              About You
            </label>
            <textarea
              id="About"
              name="text"
              value={about}
              className="block p-4 mt-2 mb-0 md:mb-5 grow text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
              placeholder="Copy and paste job description here..."
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col w-2/5 bg-white">
          <h1 className="text-dark tracking-wider text-sm">
            Additional questions
          </h1>
          {questions.map((question, index) => (
            <div key={question.id} className="flex items-center my-2 gap-4">
              <input
                id="proposal"
                name="text"
                className="block p-4 w-full text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
                placeholder={`Question ${index + 1} here...`}
                onChange={(e) => handleUpdateQuestion(e, index)}
              ></input>
              <RiCloseCircleFill
                onClick={(e) => handleRemoveQuestion(e, question.id)}
                size={24}
                className="text-dark cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={(e) => handleAddQuestion(e)}
            disabled={questions.length === 5}
            className="bg-primary shadow-sm w-52 mb-6 md:mb-0 text-sm rounded-xl py-3 px-8 mt-6 disabled:bg-[#ECF2FF] disabled:cursor-not-allowed"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteProposal;
