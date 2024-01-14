import "./Select.scss";
interface SelectProps {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}

function Select({ lang, setLang, refetch }: SelectProps) {

  const handleLang = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLang(event.target.value);
    refetch();
  };

  return (
    <select onChange={handleLang}>
      <option disabled>
        {lang === "en" ? "Choose language" : "Wybierz język"}
      </option>
      <option value="en">{lang === "en" ? "English" : "Angielski"}</option>
      <option value="pl">{lang === "en" ? "Polish" : "Polski"}</option>
    </select>
  );
}

export default Select;
