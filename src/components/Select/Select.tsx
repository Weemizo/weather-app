import "./Select.scss";

interface SelectProps {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

function Select({ lang, setLang }: SelectProps) {
  const handleLang = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLang(event.target.value);
  };

  return (
    <select onChange={handleLang}>
      <option disabled>
        {lang === "en" ? "Choose the language:" : "Wybierz język"}
      </option>
      <option value="en">{lang === "en" ? "English" : "Angielski"}</option>
      <option value="pl">{lang === "en" ? "Polish" : "Polski"}</option>
    </select>
  );
}

export default Select;
