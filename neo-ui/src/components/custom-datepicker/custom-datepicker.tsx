import React, { useState } from 'react';
import './custom-datepicker.module.scss';

interface DateSelection {
    date: Date | null;
}

interface CustomDatePickerProps {
    onSubmit?: (date: Date | null) => void;
    label?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onSubmit, label = 'Date' }) => {
    const [selection, setSelection] = useState<DateSelection>({
        date: null,
    })

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection({
            date: e.target.value ? new Date(e.target.value) : null,
        })
    }

    return (
        <div className="date-range-picker">
            <div className="date-input-group">
                <label style={{ fontSize: 12 }} htmlFor="date-input">{label}</label>
                <input
                    id="date-input"
                    type="date"
                    value={selection.date?.toISOString().split('T')[0] || ''}
                    onChange={handleDateChange}
                />
            </div>

            <div className="date-range-actions">
                <button
                    type="button"
                    className="date-submit-button"
                    onClick={() => onSubmit?.(selection.date)}
                    disabled={!selection.date}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}