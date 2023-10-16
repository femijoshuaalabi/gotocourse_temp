import { v4 as uuidv4 } from 'uuid';
import Select, { components } from 'react-select';
// import { LuChevronsUpDown } from "react-icons/lu";
import { BiSolidDownArrow } from 'react-icons/bi';
import { selectStyles } from './selectStyles';
import './select.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <BiSolidDownArrow color="#000" />
        </components.DropdownIndicator>
    );
};

export default function Selects({ onChange = () => null, ...props }) {
    const placesID = uuidv4();

    return (
        <div className="w-[343px] h[50px]">
            <div style={{ height: 50, border: '1px solid #0C2191' }}>
                <div id={placesID} className="flex" style={{ width: '100%' }}>
                    <Select
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        components={{ DropdownIndicator }}
                        style={{ height: '50px', width: '100%' }}
                        // menuPortalTarget={document.getElementById(placesID)}
                        menuPortalTarget={document.body}
                        onMenuOpen={() => {
                            document.getElementById(placesID).setAttribute('style', 'z-index:999999; width: 100%');
                        }}
                        onMenuClose={() => {
                            document.getElementById(placesID).setAttribute('style', 'z-index:9999;width: 100%');
                        }}
                        onChange={(e) => {
                            if (e) {
                                onChange(e);
                            }
                        }}
                        isClearable={true}
                        styles={selectStyles}
                        cacheOptions
                        defaultOptions
                        {...props}
                    />
                </div>
            </div>
        </div>
    );
}
