
import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ScheduleNav = ({
    terms,
    version,
    setVersion,
    currTermIndex,
    handleChangeTerm,
}: {
    terms: string[],
    version: string,
    setVersion: React.Dispatch<React.SetStateAction<string>>
    currTermIndex: number,
    handleChangeTerm: (newTermIndex: number) => void
}) => {

    const handleChangeVersion = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex justify-between w-52 items-center">
                <button
                    onClick={() => handleChangeTerm(currTermIndex - 1)}
                    disabled={currTermIndex <= 0}
                    className="hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-xl h-fit py-3 px-2"
                >
                    <MdArrowBackIosNew />
                </button>
                <h1 className="text-left text-xl">{terms[currTermIndex]}</h1>
                <button
                    onClick={() => handleChangeTerm(currTermIndex + 1)}
                    disabled={currTermIndex >= terms.length - 1}
                    className="hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-xl h-fit py-3 px-2"
                >
                    <MdArrowForwardIos />
                </button>
            </div>

            {/* <div className="flex items-center gap-x-2">
                <p>Schedule:</p>
                <FormControl sx={{ m: 1, minWidth: 120, border: "none", boxShadow: "none" }}>
                    <Select
                        value={version}
                        onChange={handleChangeVersion}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="1">Version 1</MenuItem>
                        <MenuItem value="2">Version 2</MenuItem>
                    </Select>
                </FormControl>
            </div> */}
        </div>
    )
}

export default ScheduleNav;