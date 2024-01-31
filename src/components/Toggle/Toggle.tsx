import "./Toggle.scss";

interface ToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

function Toggle({ darkMode, setDarkMode }: ToggleProps) {
  // const [darkMode, setDarkMode] = useState<boolean>(true);
  return (
    <div className="darkmode">
      <input
      type="checkbox"
      className="toggle" 
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
      />
    </div>
  );
}

export default Toggle;
