import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AppContent {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  proposal: LocalProposal;
  setProposal: Dispatch<SetStateAction<LocalProposal>>;
  descriptionInput: string;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  about: string;
  setAbout: Dispatch<SetStateAction<string>>;
  questions: Array<LocalQuestion>;
  setQuestions: Dispatch<SetStateAction<Array<LocalQuestion>>>;
  isOnlyViewingProposal: boolean;
  setIsOnlyViewingProposal: Dispatch<SetStateAction<boolean>>;
}

export interface NavItem {
  id: number;
  link: string;
  name: string;
  icon: ReactNode;
}

export interface LocalProposal {
  text: string;
  answers: Array<RemoteQuestion>;
  description: string;
  about: string;
}

export interface RemoteProposal {
  text: string;
}

export interface LocalQuestion {
  id: string;
  text: string;
}

export interface RemoteQuestion {
  question: string;
  answer: string;
}
