const optionMaps = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
};

export default function FormField({ index, onChange, selectCorrectOption, correctOption }) {
    const handleCheckbox = (e) => {
        if (e.target.checked) {
            selectCorrectOption(index);
        }
    };

    return (
        <div className="flex flex-row items-center justify-between ml-10 mt-10">
            <div className="flex flex-row items-center justify-center">
                <input
                    checked={correctOption == index}
                    type="checkbox"
                    className="bg-transparent cursor-pointer w-[24px] h-[24px]"
                    onChange={(e) => handleCheckbox(e)}
                />

                <div className="bg-white border-[1px] border-white rounded-md shadow-sm flex items-center justify-center ml-4">
                    <div className="ml-[5px] mr-[5px]">{optionMaps[index]}.</div>
                    <input
                        className=" py-4 px-2 w-[250px] text-start"
                        type="text"
                        onChange={(e) => onChange(e.target.value, index)}
                    />
                </div>
            </div>
        </div>
    );
}
