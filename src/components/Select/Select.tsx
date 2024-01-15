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
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const langLabels: { [key: string]: string[] } = {
    en: ["Choose language", "English", "Polish"],
    pl: ["Wybierz język", "Angielski", "Polski"],
  };

  return (
    <select onChange={handleLang}>
      <option disabled>{langLabels[lang]?.[0]}</option>
      <option value="en">{langLabels[lang]?.[1]}</option>
      <option value="pl">{langLabels[lang]?.[2]}</option>
    </select>
  );
}

export default Select;
