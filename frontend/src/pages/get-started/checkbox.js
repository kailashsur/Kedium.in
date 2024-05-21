import React, { useState, useEffect } from 'react';

const CheckboxButton = ({ value = "", selected = false, onChange }) => {
    const [checked, setChecked] = useState(selected);

    useEffect(() => {
        setChecked(selected);
    }, [selected]);

    const handleChange = () => {
        setChecked(!checked);
        onChange(value, !checked);
    };

    return (
        <label className="inline-flex items-center space-x-2">
            <input
                name={value}
                type="checkbox"
                className="form-checkbox h-5 w-5 hidden"
                checked={checked}
                onChange={handleChange}
                value={value}
            />
            <span className={`px-4 py-2 rounded-full flex justify-center items-center text-center select-none ${checked ? ' text-green-700 border border-green-700' : 'bg-gray-100'}`}>
                {value}
                {checked ? (
                    <svg className='mx-1' width="19" height="19" viewBox="0 0 18 18" fill="#1A8917">
                        <path d="M3.72 9.85l3.7 3.7.9.91.67-1.1 5.3-8.79-1.72-1.03-5.3 8.8 1.57-.2-3.7-3.7-1.42 1.41z"></path>
                    </svg>
                ) : (
                    <svg width="19" height="19" className="mx-1 inline-block">
                        <path d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9v6z" fill={'black'} fillRule="evenodd"></path>
                    </svg>
                )}
            </span>
        </label>
    );
};

export default CheckboxButton;
