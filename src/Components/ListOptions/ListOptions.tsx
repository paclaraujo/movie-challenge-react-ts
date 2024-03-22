import "./ListOptions.css";

interface Props {
  options: Array<{
    value: number | string;
    label: string;
  }> | undefined;
  selectedOption: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const ListOptions = ({ options, selectedOption, onChange } : Props) => {
  console.log(options, selectedOption)
  return <div className="select">

    <select className="list__container" onChange={(e) => {onChange(e.target.value)}}>
        <option 
          value=""
        >
          Selecione
        </option>
      {options && options.map(option => 
        <option 
          key={option.value + option.label} 
          value={option.value} 
          selected={selectedOption === String(option.value) }
        >
          {option.label}
        </option>
      )}
    </select>
  </div>
};

export default ListOptions;