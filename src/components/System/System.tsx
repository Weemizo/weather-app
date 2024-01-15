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
        ? system
        : system === "metric"
          ? `metryczny`
          : `imperialny`}
    </button>
  );
}

export default System;
