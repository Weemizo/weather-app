import "./Select.scss";
import { useEffect, useState } from "react";
interface SelectProps {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}

function Select({ lang, setLang, refetch }: SelectProps) {
  const [langVersion, setLangVersion] = useState(0);

  const handleLang = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLang(event.target.value);
    setLangVersion((prev) => prev + 1);
  };

  useEffect(() => {
    // Po każdej zmianie langVersion, wykonaj refetch
    refetch();
  }, [langVersion, refetch]);

  return (
    <select value={lang} onChange={handleLang}>
      <option disabled>
        {lang === "en" ? "Choose language" : "Wybierz język"}
      </option>
      <option value="en">{lang === "en" ? "English" : "Angielski"}</option>
      <option value="pl">{lang === "en" ? "Polish" : "Polski"}</option>
    </select>
  );
}

export default Select;
