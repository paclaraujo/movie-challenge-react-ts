import "./ListOptions.css";

interface Props {
  options: Array<{
    value: string;
    label: string;
  }>;
  selectedOption: {
    value: string, 
    label: string
  };
  onChange: (value: string) => void;
  onClear: () => void;
}

const ListOptions = ({ options, selectedOption, onChange } : Props) => {
  return <select className="list__container" onChange={(e) => {onChange(e.target.value)}}>
    {options.map(option => 
      <option 
        key={option.value + option.label} 
        value={option.value} 
        selected={selectedOption.value === option.value}
      >
        {option.label}
      </option>
    )}
  </select>
};

export default ListOptions;