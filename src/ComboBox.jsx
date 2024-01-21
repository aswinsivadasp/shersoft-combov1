import React, { useState, useEffect ,useRef} from 'react';

import { IoIosArrowDown } from "react-icons/io";

const ComboBox = ({ options, findedValue, placeholder, onSelect, onInputChange, className, inputClassName  , onKeyDown,comboRef}) => {
    const [inputValue, setInputValue] = useState(findedValue || '');
    const [isOpen, setIsOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [filteredOptions, setFilteredOptions] = useState(options); // New state
   
    
    useEffect(() => {
        setInputValue(findedValue || ''); // Update input value when findedValue prop changes
    }, [findedValue]);



    const handleInputChange = (event) => {
        const value = event.target.value;
    
        setInputValue(value);
    
        // Filter options based on the entered value
        const filtered = options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    
        // Call the onInputChange prop with the new input value
        onInputChange && onInputChange(value);
    
        // Always open the dropdown when there is input
        setIsOpen(value !== '');
    
       
    };
    
  

   
    const handleSelectOption = (option) => {
        setInputValue(option);
        setIsOpen(false);
        onSelect && onSelect(option);
        onInputChange && onInputChange(option);
        setSelectedIndex(-1); // Reset selectedIndex to -1 after selecting an option
    };

    
    const handleKeyDown = (event) => {
        if (isOpen) {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedIndex((prevIndex) =>
                        prevIndex > 0 ? prevIndex - 1 : options.length - 1
                    );
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedIndex((prevIndex) =>
                        prevIndex < options.length - 1 ? prevIndex + 1 : 0
                    );
                    break;
                case 'Enter':
                    if (selectedIndex !== -1) {
                        handleSelectOption(filteredOptions[selectedIndex]);
                    }
                    setIsOpen(false);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        }
        // Pass the event to the parent component
        onKeyDown && onKeyDown(event);
    };
    
    // useEffect(() => {
    //     // Focus on the input field when the component mounts or findedValue changes111111
    //     comboRef.current.focus();
        
    // }, [findedValue]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const inputElement = comboRef.current;
        
            if (isOpen && inputElement && !inputElement.contains(event.target)) {
                setIsOpen(false);
            }
        };
        

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);
    // Add a state to track whether the dropdown is open or closed
    const [isArrowRotated, setIsArrowRotated] = useState(false);
    /////styles////
    const styles = {
        dropdown_option: {
            padding: '8px',
            cursor: 'pointer',
        },
        'dropdown_option:hover': {
            backgroundColor: '#f0f0f0',
        },
        combo_box_input: {
           
        },
        'combo_box_input_field': {
            padding: '8px',
            cursor: 'pointer',
          
        },
        'arrow_icon': {
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
        },
        combo_box_container: {
            position: 'relative',

        },
        combo_box_input: {
            position: 'relative',
            width:"100%",
            height:"100%"
        },
        'combo_box_input_field': {
            padding: 'right: 30px',
            display: 'flex',
            alignItems: 'center',
           
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            
        },
        'arrow_icon.rotated': {
            transform: 'translateY(-50%) rotate(180deg)',
        },
        combobox_dropdown: {
            width: '100%',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: 'white',
            position: 'relative',
            zIndex: '1000',
        },
    };

    /////////////
    return (
        <div className={`combo_box_container ${className}` } style={styles.combo_box_container}>
            <div className="combo_box_input" style={styles.combo_box_input}>
                <input
                 ref={comboRef}
                    type="text"
                    value={inputValue }
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`combo_box_input_field ${inputClassName}`}
                    style={styles.combo_box_input_field}
                    onFocus={() => setIsOpen(true)}
                   
                />

                {/* <div className={`arrow-icon ${isOpen ? 'rotated' : ''}`} onClick={handleToggleDropdown}>
                    &#9660;
                </div> */}
                <div style={styles.arrow_icon} className={`arrow_icon ${isOpen ? 'rotated' : ''}`} >
                <IoIosArrowDown />
                </div>


                {isOpen && (
                    <div style={styles.combobox_dropdown} className="combobox_dropdown">
                        {filteredOptions.map((option, index) => (
                            <div 
                                key={index}
                                style={styles.dropdown_option}
                                className={`dropdown_option ${index === selectedIndex ? 'selected' : ''
                                    }`}
                                onClick={() => handleSelectOption(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ComboBox;
