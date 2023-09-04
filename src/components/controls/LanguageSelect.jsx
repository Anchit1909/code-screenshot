import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MagicWandIcon } from "@radix-ui/react-icons";
import useStore from "@/store/store";
import { languages } from "@/options";

function LanguageSelect() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const language = useStore((state) => state.language);
  const autoDetectLanguage = useStore((state) => state.autoDetectLanguage);

  const handleChange = (language) => {
    if (language === "auto-detect") {
      useStore.setState({ autoDetectLanguage: true, language: "plaintext" });
    } else {
      useStore.setState({ autoDetectLanguage: false, language });
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {autoDetectLanguage && <MagicWandIcon className="mr-2" />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSelect;
