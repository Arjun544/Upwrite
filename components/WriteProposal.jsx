import React, { useContext, useState } from "react";
import uuid from "react-uuid";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { MdOutlineError } from "react-icons/md";

import { generateAnswer, generateProposal } from "@/services/chatgpt_services";
import Btn_Loader from "./Btn_Loader";
import { AppContext } from "@/pages/_app";

const WriteProposal = () => {
  const {
    setProposal,
    descriptionInput,
    setDescriptionInput,
    about,
    setAbout,
    questions,
    setQuestions,
    setCurrentStep,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReqTakingLong, setIsReqTakingLong] = useState(false);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        id: uuid(),
        text: "",
      },
    ]);
  };

  const handleRemoveQuestion = (e, id) => {
    e.preventDefault();
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateQuestion = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };

  const handleGenerate = async () => {
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
      try {
        setTimeout(() => {
          setIsReqTakingLong(true);
        }, 8000);

        setIsLoading(true);
        setHasError(false);
        const { data: proposalData } = await generateProposal(
          descriptionInput,
          about
        );

        if (questions.length > 0) {
          for (const question of questions.filter(
            (ques) => ques.text.length > 0
          )) {
            const { data: questionData } = await generateAnswer(question.text);
            console.log("question", question);
            setProposal({
              text: proposalData.choices[0].text,
              answers: [
                {
                  question: question.text,
                  answer: questionData.choices[0].text,
                },
              ],
              created: proposalData.created,
            });
          }
        } else {
          setProposal({
            text: proposalData.choices[0].text,
            answers: [],
            created: proposalData.created,
          });
        }
        setIsLoading(false);
        setCurrentStep(2);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
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
        <h1 className="text-dark text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <div className="flex items-center gap-4">
          {isReqTakingLong && (
            <div className="flex items-center gap-2 animate-pulse">
              <h1 className="text-xl">🥺</h1>
              <h1 className="tracking-wider text-xs text-gray-500">
                High server traffic causing delay ...
              </h1>
            </div>
          )}
          <button
            onClick={handleGenerate}
            className={`flex items-center justify-center gap-4 w-48 shadow-md text-sm rounded-xl py-3 px-8 ${
              hasError ? "bg-red-400" : "bg-primary"
            }`}
          >
            {isLoading ? (
              <Btn_Loader />
            ) : hasError ? (
              <>
                <MdOutlineError size={20} />
                <h1 className="tracking-wider">Try again</h1>
              </>
            ) : (
              <>
                <HiLightningBolt />
                <h1 className="tracking-wider">Generate</h1>
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
              id="proposal"
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
              id="proposal"
              name="text"
              value={about}
              className="block p-4 mt-2 mb-4 grow text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
              placeholder="Copy and paste job description here..."
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex grow flex-col bg-white">
          <h1 className="text-dark tracking-wider mb-5 text-sm">
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
            onClick={handleAddQuestion}
            disabled={questions.length === 5}
            className="bg-primary shadow-sm w-52 text-sm rounded-xl py-3 px-8 mt-6 disabled:bg-[#ECF2FF] disabled:cursor-not-allowed"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteProposal;
