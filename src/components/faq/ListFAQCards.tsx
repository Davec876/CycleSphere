'use client';
import { type SyntheticEvent, useState, useMemo, useEffect } from 'react';
import FAQCard from '@/components/faq/FAQCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function ListFAQCards({
    FAQS
}: {
    FAQS: { title: string, body: string }[]
}) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = useMemo(() => {
        if(searchQuery === '') {
            return FAQS;
        }
        const filtered = FAQS.filter((faq) => {
            return faq.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                faq.body.toLowerCase().includes(searchQuery.toLowerCase());
        });
        return filtered;
    }, [searchQuery]);

    function handleInputChange(
        event: SyntheticEvent<Element, Event>,
        newInputValue: string
    ) {
        setSearchQuery(newInputValue);
    }

    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                options={FAQS.map((option) => option.title)}
                open={false}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                value={searchQuery}
                onInputChange={handleInputChange}
            />
            {filteredFAQs.map((faq: { title: string, body: string }, index: number) => (
                <FAQCard key={index} title={faq.title} body={faq.body} />
            ))}
        </>
    );
}