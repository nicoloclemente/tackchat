import React from 'react';

const CountrySelector = ({ countries, onCountryClick }) => {
    return (
        <div className="fixed w-2/3 md:w-fit h-1/3 overflow-y-auto bg-gray-200 p-4 left-4 top-4 rounded-md">
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onCountryClick(country)}
                            className="block w-full text-left p-2 hover:bg-gray-300 rounded"
                        >
                            {country.countryName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountrySelector;