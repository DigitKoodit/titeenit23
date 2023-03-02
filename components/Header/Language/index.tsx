import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const LanguageSelector = () => {
  const router = useRouter();

  const { locale, locales = [] } = router;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`px-10 text-2xl`}>
      <button onClick={() => setIsOpen(!isOpen)} className="space-x-2">
        <FontAwesomeIcon icon={faGlobe} size="1x" />
        <span>{locale}</span>
      </button>
      {isOpen && (
        <div className="flex flex-col font-mono items-center pb-4 absolute ml-8">
          {locales &&
            locales
              .filter((el) => el !== locale)
              .map((language) => (
                <Link key={language} href={`/${language}`}>
                  {language}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};
