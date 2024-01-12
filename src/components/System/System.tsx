import "./System.scss";

interface SystemProps {
  system: string;
  lang: string;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
}

function System({ system, lang, setSystem }: SystemProps) {
  return (
    <button
      onClick={() =>
        system === "metric" ? setSystem("imperial") : setSystem("metric")
      }
    >
      {lang === "en"
        ? `click to change: ${system}`
        : system === "metric"
          ? `naciśnij aby zmienić: metryczny`
          : `naciśnij aby zmienić: imperialny`}
    </button>
  );
}

export default System;
